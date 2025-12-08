import sys
import os
import random
from datetime import datetime, timedelta
from faker import Faker
import uuid

# Add parent directory to path to import models
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models.database import SessionLocal
from models.schema import User, Vehicle, PredictedIssue, Appointment

fake = Faker()

def generate_data():
    db = SessionLocal()
    
    # Create Users
    print("Generating Users...")
    users = []
    roles = ['CUSTOMER', 'OEM', 'MANUFACTURER']
    for _ in range(10):
        user = User(
            id=str(uuid.uuid4()),
            email=fake.email(),
            full_name=fake.name(),
            role=random.choice(roles)
        )
        users.append(user)
        db.add(user)
    db.commit()

    # Create Vehicles
    print("Generating Vehicles...")
    vehicles = []
    models = ['Model X', 'Model Y', 'Model Z']
    for i in range(20):
        owner = random.choice(users)
        vehicle = Vehicle(
            id=str(uuid.uuid4()),
            user_id=owner.id,
            model=random.choice(models),
            variant='Standard',
            year=random.randint(2020, 2024),
            registration=fake.license_plate(),
            vin=fake.vin(),
            mileage=random.randint(1000, 50000),
            last_service_date=datetime.now() - timedelta(days=random.randint(0, 365))
        )
        vehicles.append(vehicle)
        db.add(vehicle)
    db.commit()

    # Create Predicted Issues (Defects)
    print("Generating Predicted Issues...")
    components = ['BRAKE_PADS', 'BATTERY', 'ENGINE_OIL', 'TIRES', 'TRANSMISSION']
    severities = ['LOW', 'MEDIUM', 'HIGH']
    for _ in range(30):
        vehicle = random.choice(vehicles)
        issue = PredictedIssue(
            id=str(uuid.uuid4()),
            vehicle_id=vehicle.id,
            component=random.choice(components),
            failure_probability=random.uniform(0.1, 0.9),
            severity=random.choice(severities),
            time_horizon=f"{random.randint(1, 30)}_days",
            confidence=random.uniform(0.7, 0.99),
            reason=fake.sentence(),
            overall_health='AMBER'
        )
        db.add(issue)
    db.commit()

    # Create Appointments (Service Bookings)
    print("Generating Appointments...")
    statuses = ['CONFIRMED', 'COMPLETED', 'CANCELLED']
    for _ in range(15):
        vehicle = random.choice(vehicles)
        appt = Appointment(
            id=str(uuid.uuid4()),
            vehicle_id=vehicle.id,
            user_id=vehicle.user_id,
            service_center_id=f"CENTER-{random.randint(1, 5)}",
            appointment_date=datetime.now() + timedelta(days=random.randint(1, 30)),
            status=random.choice(statuses),
            confirmation_code=fake.bothify(text='APT-####')
        )
        db.add(appt)
    db.commit()

    print("Data generation complete.")
    db.close()

if __name__ == "__main__":
    generate_data()
