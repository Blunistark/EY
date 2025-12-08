from models.database import engine, Base
from models.schema import User, Vehicle, Telemetry, ServiceBooking, Defect

def init_db():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully!")

if __name__ == "__main__":
    init_db()
