from sqlalchemy.orm import Session
from models.schema import Telemetry
from models.pydantic_models import TelemetryCreate
from datetime import datetime

class IngestionService:
    def __init__(self, db: Session):
        self.db = db

    def process_telemetry(self, data: TelemetryCreate):
        telemetry = Telemetry(
            vehicle_id=data.vehicle_id,
            timestamp=data.timestamp or datetime.utcnow(),
            speed=data.speed,
            rpm=data.rpm,
            engine_temp=data.engine_temp,
            battery_level=data.battery_level,
            brake_wear=data.brake_wear,
            tire_pressure_fl=data.tire_pressure_fl,
            tire_pressure_fr=data.tire_pressure_fr,
            tire_pressure_rl=data.tire_pressure_rl,
            tire_pressure_rr=data.tire_pressure_rr,
            latitude=data.latitude,
            longitude=data.longitude
        )
        self.db.add(telemetry)
        self.db.commit()
        self.db.refresh(telemetry)
        
        # TODO: Trigger Master Agent or Data Agent here for anomaly detection
        
        return telemetry
