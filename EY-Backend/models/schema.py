from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    role = Column(String) # 'customer', 'advisor', 'manufacturer'
    vehicles = relationship("Vehicle", back_populates="owner")

class Vehicle(Base):
    __tablename__ = "vehicles"
    vin = Column(String, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    model_name = Column(String)
    year = Column(Integer)
    license_plate = Column(String)
    owner = relationship("User", back_populates="vehicles")
    telemetry = relationship("Telemetry", back_populates="vehicle")
    bookings = relationship("ServiceBooking", back_populates="vehicle")

class Telemetry(Base):
    __tablename__ = "telemetry"
    id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(String, ForeignKey("vehicles.vin"))
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Metrics
    speed = Column(Float)
    rpm = Column(Float)
    engine_temp = Column(Float)
    battery_level = Column(Float)
    brake_wear = Column(Float) # 0-100%
    tire_pressure_fl = Column(Float)
    tire_pressure_fr = Column(Float)
    tire_pressure_rl = Column(Float)
    tire_pressure_rr = Column(Float)
    
    # GPS
    latitude = Column(Float)
    longitude = Column(Float)
    
    vehicle = relationship("Vehicle", back_populates="telemetry")

class ServiceBooking(Base):
    __tablename__ = "service_bookings"
    id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(String, ForeignKey("vehicles.vin"))
    booking_date = Column(DateTime)
    status = Column(String) # 'pending', 'confirmed', 'completed', 'cancelled'
    service_type = Column(String)
    notes = Column(Text)
    vehicle = relationship("Vehicle", back_populates="bookings")

class Defect(Base):
    __tablename__ = "defects"
    id = Column(Integer, primary_key=True, index=True)
    vehicle_model = Column(String, index=True)
    defect_type = Column(String)
    description = Column(Text)
    severity = Column(String) # 'low', 'medium', 'high', 'critical'
    status = Column(String) # 'open', 'investigating', 'resolved'
    detected_at = Column(DateTime, default=datetime.utcnow)
    rca_notes = Column(Text)
    capa_actions = Column(Text)
