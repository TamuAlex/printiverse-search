
from flask import Flask, request, jsonify
from dataclasses import dataclass
from typing import List
from thingiverse import ThingiverseModel
from curl_cffi import requests


app = Flask(__name__)

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
    
    
    return jsonify(models)

def get_models_thingiverse(search_query,parameters={}):

    list_models = []
    headers = {"Authorization": f"Bearer {key_thingiverse}", "media-type": "application/json"}

    url_api = "https://api.thingiverse.com/search/" + search_query
    parameters = format_parameters_thingiverse(parameters)
    response = requests.get(url_api, impersonate="chrome", headers=headers, params=parameters)
    json_respuesta = response.json()
    i =0
    for hit in json_respuesta["hits"]:
        print(hit)
        list_models.append(ThingiverseModel(hit["id"],hit["name"],hit["preview_image"],hit["public_url"],hit["creator"]["name"],hit["creator"]["public_url"],hit["created_at"],hit["like_count"],hit["collect_count"],hit["comment_count"],hit["is_nsfw"],hit["tags"],hit["creator"]["thumbnail"]))
        i += 1

    return list_models

def format_parameters_thingiverse(parameters):
    if "sort" not in parameters:
        parameters["sort"] = "popular"
    
    parameters["type"] = "things"
    parameters["per_page"] = "10"
    #parameters["page"] = 1
    return parameters

if __name__ == '__main__':
    app.run(debug=True)
