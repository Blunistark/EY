import random
from datetime import datetime, timedelta
from faker import Faker
from sqlalchemy.orm import Session
from models.database import SessionLocal, engine
from models.schema import User, Vehicle, Telemetry, ServiceBooking, Defect
import time

fake = Faker()

def create_users(db: Session, num_users=5):
    users = []
    print(f"Creating {num_users} users...")
    for _ in range(num_users):
        user = User(
            email=fake.email(),
            full_name=fake.name(),
            role='customer'
        )
        db.add(user)
        users.append(user)
    db.commit()
    return users

def create_vehicles(db: Session, users):
    vehicles = []
    models = ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck']
    print(f"Creating vehicles for users...")
    for user in users:
        vehicle = Vehicle(
            vin=fake.vin(),
            owner_id=user.id,
            model_name=random.choice(models),
            year=random.randint(2018, 2024),
            license_plate=fake.license_plate()
        )
        db.add(vehicle)
        vehicles.append(vehicle)
    db.commit()
    return vehicles

def create_telemetry(db: Session, vehicles, num_points=50):
    print(f"Generating telemetry data...")
    for vehicle in vehicles:
        base_time = datetime.utcnow() - timedelta(days=1)
        for i in range(num_points):
            # Simulate some issues
            brake_wear = random.uniform(0, 10)
            if random.random() < 0.1: # 10% chance of high brake wear
                brake_wear = random.uniform(80, 100)
            
            telemetry = Telemetry(
                vehicle_id=vehicle.vin,
                timestamp=base_time + timedelta(minutes=i*15),
                speed=random.uniform(0, 120),
                rpm=random.uniform(1000, 5000),
                engine_temp=random.uniform(80, 110),
                battery_level=random.uniform(20, 100),
                brake_wear=brake_wear,
                tire_pressure_fl=random.uniform(30, 35),
                tire_pressure_fr=random.uniform(30, 35),
                tire_pressure_rl=random.uniform(30, 35),
                tire_pressure_rr=random.uniform(30, 35),
                latitude=float(fake.latitude()),
                longitude=float(fake.longitude())
            )
            db.add(telemetry)
    db.commit()

def main():
    db = SessionLocal()
    try:
        users = create_users(db)
        vehicles = create_vehicles(db, users)
        create_telemetry(db, vehicles)
        print("Data generation complete!")
    finally:
        db.close()

if __name__ == "__main__":
    main()
