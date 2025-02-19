from curl_cffi import requests


def get_models_thingiverse(search_query, parameters={}, key_cults="", username_cults=""):
    """
    Fetch models from Cults3D using GraphQL query
    """
    url = "https://cults3d.com/graphql"
    parameters = format_parameters_cults(parameters)
    
    # Define the GraphQL query
    query = f"""
    {{
      creationsSearchBatch(query:"{search_query}", limit: {parameters["limit"]}, sort: {parameters["sort"]}) {{
        total
        results {{
          identifier
          shortUrl
          illustrations {{
            imageUrl
          }}
          updatedAt
          name(locale: EN)
          url(locale: EN)
          price(currency: EUR) {{
            cents
          }}
          creator {{
            nick
            shortUrl
          }}
          likesCount
          usages
          description
          comments {{
            text
          }}
          tags
        }}
      }}
    }}
    """
    
    # Make the GraphQL request
    response = requests.post(
        url,
        auth=(username_cults, key_cults),
        json={"query": query}
    )
    
    if response.status_code != 200:
        raise Exception(f"Query failed with status code {response.status_code}")
    
    # Extract and process the results
    data = response.json()
    if "errors" in data:
        raise Exception(f"GraphQL errors: {data['errors']}")
    
    results = data["data"]["creationsSearchBatch"]["results"]
    list_models = []
    
    for hit in results:
        # Extract the thumbnail image from illustrations
        thumbnail = hit["illustrations"][0]["imageUrl"] if hit["illustrations"] else ""
        
        # Get comments text
        comments = [comment["text"] for comment in hit["comments"]] if hit["comments"] else []
        
        # Handle price (convert from cents if needed)
        price_cents = hit["price"]["cents"] if hit["price"] and "cents" in hit["price"] else 0
        price = "free" if price_cents == 0 else f"€{price_cents/100:.2f}"
        tags = []
        if hit["tags"]:
          for tag in hit["tags"]:
            if isinstance(tag, dict):
              tags.append(tag)
            else:
              tags.append({"name": str(tag)})
        
        model = {
            "id": hit["identifier"],
            "name": hit["name"],
            "thumbnail": thumbnail,
            "public_url": hit["url"],
            "creator_name": hit["creator"]["nick"],
            "creator_url": hit["creator"]["shortUrl"],
            "f_added": hit["updatedAt"],
            "like_count": hit["likesCount"],
            "collect_count": hit.get("usages", 0),  # Using usages as collect_count equivalent
            "comment_count": len(comments),
            "is_nsfw": False,  # This field isn't in the GraphQL response, defaulting to False
            "tags": tags,
            "creator_thumbnail": "",  # This field isn't available in the GraphQL response
            "price": price,
            "description": hit.get("description", ""),
            "repo": "Cults3D",
            "comments": comments  # Adding comments as an extra field
        }
        list_models.append(model)
        return list_models
    
    return {
        
    }
    


def format_parameters_cults(parameters):
    if "sort" not in parameters:
        parameters["sort"] = "BY_LIKES"
    
    
    parameters["limit"] = "50"
    #parameters["page"] = 1
    return parameters

