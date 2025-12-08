import requests
import json

url = "http://localhost:8000/api/agent/chat"

payload = {
    "query": "Give me manufacturing insights for Model 3.",
    "context": {
        "model_name": "Model 3"
    }
}

try:
    print(f"Sending query: {payload['query']}")
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
