import requests
import json

url = "http://localhost:8000/api/agent/chat"

# Test 1: Diagnosis Request
payload_diagnosis = {
    "query": "The brake light is flashing and I hear a grinding noise.",
    "context": {"vehicle_id": "VIN123", "user_id": 1}
}

# Test 2: Scheduling Request
payload_scheduling = {
    "query": "I need to book a service for next Tuesday.",
    "context": {"vehicle_id": "VIN123", "user_id": 1}
}

def test_agent(payload):
    try:
        print(f"Sending query: {payload['query']}")
        response = requests.post(url, json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        print("-" * 50)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_agent(payload_diagnosis)
    test_agent(payload_scheduling)
