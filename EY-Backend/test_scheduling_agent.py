import requests
import json
from models.database import SessionLocal
from models.schema import Vehicle, User

# Fetch valid IDs
db = SessionLocal()
vehicle = db.query(Vehicle).first()
user = db.query(User).first()
if not vehicle or not user:
    print("No vehicles or users found in DB.")
    exit(1)
valid_vin = vehicle.vin
valid_user_id = user.id
db.close()

url = "http://localhost:8000/api/agent/chat"

payload = {
    "query": "I need to book a maintenance service for next Friday at 10 AM.",
    "context": {
        "vehicle_id": valid_vin,
        "user_id": valid_user_id,
        "query": "I need to book a maintenance service for next Friday at 10 AM."
    }
}

try:
    print(f"Sending query: {payload['query']}")
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
