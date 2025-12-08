import requests
import json
from datetime import datetime
from models.database import SessionLocal
from models.schema import Vehicle

# Fetch a valid VIN
db = SessionLocal()
vehicle = db.query(Vehicle).first()
if not vehicle:
    print("No vehicles found in DB. Run data generation first.")
    exit(1)
valid_vin = vehicle.vin
db.close()

print(f"Using VIN: {valid_vin}")

url = "http://localhost:8000/api/telemetry"

payload = {
    "vehicle_id": valid_vin,
    "timestamp": datetime.utcnow().isoformat(),
    "speed": 85.5,
    "rpm": 3500,
    "engine_temp": 95.0,
    "battery_level": 88.0,
    "brake_wear": 12.5,
    "tire_pressure_fl": 32.0,
    "tire_pressure_fr": 32.0,
    "tire_pressure_rl": 32.0,
    "tire_pressure_rr": 32.0,
    "latitude": 37.7749,
    "longitude": -122.4194
}

headers = {
    "Content-Type": "application/json"
}

try:
    response = requests.post(url, json=payload, headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
