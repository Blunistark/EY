import requests
import json
from models.database import SessionLocal
from models.schema import User

# Fetch valid User ID
db = SessionLocal()
user = db.query(User).first()
if not user:
    print("No users found in DB.")
    exit(1)
valid_user_id = user.id
db.close()

url = "http://localhost:8000/api/agent/chat"

payload = {
    "query": "How is my car doing today?",
    "context": {
        "user_id": valid_user_id,
        "query": "How is my car doing today?"
    }
}

try:
    print(f"Sending query: {payload['query']}")
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
