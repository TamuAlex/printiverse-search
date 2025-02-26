
from flask import Flask, request, jsonify
from dataclasses import dataclass
from typing import List
from thingiverse import get_models_thingiverse
from cults3d import get_models_cults
from myminifactory import get_models_minifactory
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, resources={
    r"/get_models": {
        "origins": ["http://localhost:8080"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:8080')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

key_thingiverse = "2f1239af02548dbf83407b8bb7c8042f"

@app.route('/get_models', methods=['GET'])
def get_models():
    search_query = request.args.get('query', '')
    filters = {}
    for key, value in request.args.items():
        if key not in ['query', 'page', 'per_page']:
            filters[key] = value
    
    print(f"filters: {filters}")
    
    # Get repositories filter
    repositories = filters.get('repositories', [])
    all_models = []
    
    # If no repositories specified or 'thingiverse' is in the list, get Thingiverse models
    if not repositories or 'thingiverse' in repositories:
        thingiverse_models = get_models_thingiverse(search_query, filters, key_thingiverse)
        all_models.extend(thingiverse_models)
    
    # If no repositories specified or 'cults3d' is in the list, get Cults3D models
    # Note: Implement get_models_cults3d when available
    if not repositories or 'cults3d' in repositories:
        cults3d_models = get_models_cults(search_query, filters, key_cults="CVozXXLJaDy5nN3eUttDcytnB", username_cults="tamulocoormar")
        all_models.extend(cults3d_models)

    if not repositories or 'myminifactory' in repositories:
        mmf_models = get_models_minifactory("benchy", filters, "d88cc946-7634-4f69-9cc5-1e6ff3531a7c")
        all_models.extend(mmf_models)
    
    print(f"{len(all_models)} models found")
    print("Backend returning models:")
    all_models = order_models(all_models, filters["sortBy"])
    return jsonify(all_models)

def order_models(models, order):
    if order == "likes":
        return sorted(models, key=lambda x: x["like_count"], reverse=True)
    elif order == "date":
        return sorted(models, key=lambda x: x["f_added"], reverse=True)
    elif order == "download":
        return sorted(models, key=lambda x: x["collect_count"], reverse=True)
    else:
        print("Fallo al ordenar")
        return models
    

if __name__ == '__main__':
    app.run(debug=True)
