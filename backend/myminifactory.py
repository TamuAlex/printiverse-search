from curl_cffi import requests


def get_models_minifactory(search_query, parameters={}, key=""):
    list_models = []
    
    url_api = "www.myminifactory.com/api/v2/search/"
    print(f"TV parameters: {parameters}")
    parameters = format_parameters_minifactory(parameters, search_query, key)
    try:
        response = requests.get(url_api, impersonate="chrome", params=parameters)
        if response.status_code != 200:
            print(f"Error: {response.status_code}")
            print(response.text)
            return []
    
        # Obtener los resultados en formato JSON
        json_respuesta = response.json()
        
        # Lista para almacenar los modelos transformados
        list_models = []
        
        # Iterar sobre los items de la respuesta
        for hit in json_respuesta.get("items", []):
            # Procesar tags
            tags = []
            if "tags" in hit and hit["tags"]:
                for tag in hit["tags"]:
                    if isinstance(tag, dict) and "name" in tag:
                        tags.append(tag)
                    else:
                        tags.append({"name": str(tag)})
            
            # Obtener la URL de la imagen principal si existe
            thumbnail = ""
            if "images" in hit and hit["images"] and len(hit["images"]) > 0:
                for image in hit["images"]:
                    if image.get("is_primary", False) and "thumbnail" in image and "url" in image["thumbnail"]:
                        thumbnail = image["thumbnail"]["url"]
                        break
                # Si no hay imagen principal, usar la primera disponible
                if not thumbnail and "thumbnail" in hit["images"][0] and "url" in hit["images"][0]["thumbnail"]:
                    thumbnail = hit["images"][0]["thumbnail"]["url"]
            
            # Crear el diccionario del modelo
            model = {
                "id": hit.get("id", ""),
                "name": hit.get("name", ""),
                "thumbnail": thumbnail,
                "public_url": hit.get("url", ""),
                "creator_name": hit.get("designer", {}).get("name", ""),
                "creator_url": hit.get("designer", {}).get("profile_url", ""),
                "f_added": hit.get("published_at", ""),
                "like_count": hit.get("likes", 0),
                "collect_count": 0,  # No parece haber un equivalente directo en la API de MyMiniFactory
                "comment_count": 0,  # No parece haber un equivalente directo en la API de MyMiniFactory
                "is_nsfw": False,    # No parece haber un equivalente directo en la API de MyMiniFactory
                "tags": tags,
                "creator_thumbnail": hit.get("designer", {}).get("avatar_thumbnail_url", ""),
                "price": "free",     # Asumiendo que todos son gratuitos, ajustar si es necesario
                "description": hit.get("description", ""),
                "repo": "MyMiniFactory"
            }
            
            list_models.append(model)
        
        return list_models
        
    except Exception as e:
        print(f"Error in get_models_myminifactory: {str(e)}")
        import traceback
        traceback.print_exc()
        return []
    


def format_parameters_minifactory(parameters, search_query, key):
    sort_dict = {
        "likes": "popularity",
        "date": "date",
        "downloads": "visits"
    }

    category_dict = {
        "Toys": "60",
        "Home": "57",
        "Gadgets": "59",
        "Art": "166",
        "Tools":"59",
    }
    
    params = {
    'key': key,
    'search': search_query,
    'page': 1,
    'per_page': 50,
    "sort": sort_dict[parameters["sortBy"]],
}
    if parameters["category"] != "All":
        params["cat"] = category_dict[parameters["category"]]
    
    return params



