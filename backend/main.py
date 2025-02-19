
from flask import Flask, request, jsonify
from dataclasses import dataclass
from typing import List
from thingiverse import get_models_thingiverse
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

@app.route('/get_models', methods=['POST'])
def get_models():
    data = request.get_json()
    search_query = data.get('query', '')
    filters = data.get('filters', {})
    
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
        # cults3d_models = get_models_cults3d(search_query, filters)
        # all_models.extend(cults3d_models)
        pass

    print(f"{len(all_models)} models found")
    print("Backend returning models:")
    print(json.dumps(all_models, indent=2))
    return jsonify(all_models)

if __name__ == '__main__':
    app.run(debug=True)
