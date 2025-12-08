import requests
import json
from models.database import SessionLocal
from models.schema import ServiceBooking, Vehicle, User
from datetime import datetime

# Setup: Ensure a booking exists to attach feedback to
db = SessionLocal()
# Find a vehicle and user
vehicle = db.query(Vehicle).first()
user = db.query(User).first()

if not vehicle or not user:
    print("No vehicle or user found. Cannot create mock booking.")
    exit(1)

# Create a mock booking if one doesn't exist
booking = db.query(ServiceBooking).first()
if not booking:
    booking = ServiceBooking(
        vehicle_id=vehicle.vin,
        booking_date=datetime.now(),
        service_type="maintenance",
        status="completed",
        notes="Mock booking for feedback test"
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)

booking_id = booking.id
db.close()

url = "http://localhost:8000/api/agent/chat"

payload = {
    "query": "The service was great, but the waiting room was a bit cold.",
    "context": {
        "feedback_text": "The service was great, but the waiting room was a bit cold.",
        "booking_id": booking_id,
        "agent_type": "feedback" # Explicitly hinting the agent type for the test, though Master Agent should infer it
    }
}

try:
    print(f"Sending feedback for Booking ID {booking_id}: {payload['query']}")
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
