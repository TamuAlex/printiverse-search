
from flask import Flask, request, jsonify
from dataclasses import dataclass
from typing import List
from thingiverse import get_models_thingiverse
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


key_thingiverse = "2f1239af02548dbf83407b8bb7c8042f"
@app.route('/get_models', methods=['POST'])
def get_models():
    data = request.get_json()
    search_query = data.get('query', '')
    filters = data.get('filters', {})
    models = get_models_thingiverse(search_query,filters,key_thingiverse)

    print(f"{len(models)} models found")
    #print(jsonify(models))
    print("Backend returning models:")
    print(json.dumps(models, indent=2))
    return jsonify(models)




if __name__ == '__main__':
    app.run(debug=True)
