from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TelemetryCreate(BaseModel):
    vehicle_id: str
    timestamp: Optional[datetime] = None
    speed: float
    rpm: float
    engine_temp: float
    battery_level: float
    brake_wear: float
    tire_pressure_fl: float
    tire_pressure_fr: float
    tire_pressure_rl: float
    tire_pressure_rr: float
    latitude: float
    longitude: float

    class Config:
        from_attributes = True
