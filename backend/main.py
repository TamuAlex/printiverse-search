
from flask import Flask, request, jsonify
from dataclasses import dataclass
from typing import List
from thingiverse import ThingiverseModel
from curl_cffi import requests
from flask_cors import CORS
import json


app = Flask(__name__)
CORS(app, resources={
    r"/get_models": {
        "origins": ["http://localhost:8080"],  # Update this to match your frontend port
        "methods": ["POST", "OPTIONS"],  # Include OPTIONS for preflight requests
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True  # Add this if you need to use credentials
    }
})

# You might also want to add this before your route to ensure CORS headers
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:8080')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response
#@dataclass
#class Model:
#    id: int
#    name: str
#    thumbnail: str
#    public_url: str
#    creator_name: str
#    creator_url: str
#    f_added: str
#    like_count: int
#    collect_count: int

#    comment_count: int
#    is_nsfw: bool
#    tags: List[str]
#    creator_thumbnail: str
#    price: str = "free"
#    description: str = ""
key_thingiverse = "2f1239af02548dbf83407b8bb7c8042f"
@app.route('/get_models', methods=['POST'])
def get_models():
    data = request.get_json()
    search_query = data.get('query', '')
    filters = data.get('filters', {})
    models = get_models_thingiverse(search_query,filters)

    print(f"{len(models)} models found")
    #print(jsonify(models))
    print("Backend returning models:")
    print(json.dumps(models, indent=2))
    return jsonify(models)

def get_models_thingiverse(search_query, parameters={}):
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
                "description": hit.get("description", "")
            }
            list_models.append(model)
        
        return list_models
    except Exception as e:
        print(f"Error in get_models_thingiverse: {str(e)}")
        import traceback
        traceback.print_exc()
        return []
    


def format_parameters_thingiverse(parameters):
    if "sort" not in parameters:
        parameters["sort"] = "popular"
    
    parameters["type"] = "things"
    parameters["per_page"] = "50"
    #parameters["page"] = 1
    return parameters

if __name__ == '__main__':
    app.run(debug=True)
