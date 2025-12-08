import requests
import json

url = "http://localhost:8000/api/agent/chat"

payload = {
    "query": "Diagnose the issue with my car. It has high engine temperature and low battery.",
    "context": {
        "vehicle_id": "VIN123",
        "vehicle_model": "Tesla Model 3",
        "last_analysis": {
            "anomalies": ["High Engine Temperature: 110C", "Low Battery Level: 15%"]
        }
    }
}

try:
    print(f"Sending query: {payload['query']}")
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
