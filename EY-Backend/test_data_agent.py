import requests
import json
from models.database import SessionLocal
from models.schema import Vehicle

# Fetch a valid VIN
db = SessionLocal()
vehicle = db.query(Vehicle).first()
if not vehicle:
    print("No vehicles found in DB.")
    exit(1)
valid_vin = vehicle.vin
db.close()

url = "http://localhost:8000/api/agent/chat"

payload = {
    "query": f"Check the health of vehicle {valid_vin}",
    "context": {"vehicle_id": valid_vin}
}

try:
    print(f"Sending query: {payload['query']}")
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
