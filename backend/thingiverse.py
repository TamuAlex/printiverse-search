from curl_cffi import requests


def get_models_thingiverse(search_query, parameters={}, key_thingiverse=""):
    list_models = []
    headers = {"Authorization": f"Bearer {key_thingiverse}", "media-type": "application/json"}
    
    url_api = "https://api.thingiverse.com/search/" + search_query
    parameters = format_parameters_thingiverse(parameters)
    
    try:
        response = requests.get(url_api, impersonate="chrome", headers=headers, params=parameters)
        json_respuesta = response.json()
        
        for hit in json_respuesta["hits"]:
            # Process tags to ensure they're in the correct format
            tags = []
            if hit["tags"]:
                for tag in hit["tags"]:
                    if isinstance(tag, dict):
                        tags.append(tag)
                    else:
                        tags.append({"name": str(tag)})

            model = {
                "id": hit["id"],
                "name": hit["name"],
                "thumbnail": hit["preview_image"],
                "public_url": hit["public_url"],
                "creator_name": hit["creator"]["name"],
                "creator_url": hit["creator"]["public_url"],
                "f_added": hit["created_at"],
                "like_count": hit["like_count"],
                "collect_count": hit["collect_count"],
                "comment_count": hit["comment_count"],
                "is_nsfw": hit["is_nsfw"],
                "tags": tags,  # Using processed tags
                "creator_thumbnail": hit["creator"]["thumbnail"],
                "price": "free",
                "description": hit.get("description", ""),
                "repo": "Thingiverse"
            }
            list_models.append(model)
        
        return list_models
    except Exception as e:
        print(f"Error in get_models_thingiverse: {str(e)}")
        import traceback
        traceback.print_exc()
        return []
    


def format_parameters_thingiverse(parameters):
    parameters_thingiverse = {}
    sort_dict = {
        "likes": "popular",
        "date": "newest",
        "downloads": "relevant"
    }

    filter_dict = {
        "toys": "72",
        "Home": "67",
        "Gadgets": "65",
        "Art": "63",
        "Tools":"71",
    }
    
    if "sort" not in parameters:
        parameters_thingiverse["sort"] = "popular"
    else:
        parameters_thingiverse["sort"] = sort_dict[parameters["sort"]]
    
    if "filter" in parameters:
        parameters_thingiverse["category_id"] = filter_dict[parameters["filter"]]
    
    parameters_thingiverse["type"] = "things"
    parameters_thingiverse["per_page"] = "50"
    #parameters["page"] = 1
    return parameters_thingiverse

