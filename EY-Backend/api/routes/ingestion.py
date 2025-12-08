from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from models.database import get_db
from models.pydantic_models import TelemetryCreate
from services.ingestion import IngestionService
import json

router = APIRouter()

@router.post("/telemetry")
def ingest_telemetry(data: TelemetryCreate, db: Session = Depends(get_db)):
    service = IngestionService(db)
    return service.process_telemetry(data)

@router.websocket("/ws/telemetry")
async def websocket_endpoint(websocket: WebSocket, db: Session = Depends(get_db)):
    await websocket.accept()
    service = IngestionService(db)
    try:
        while True:
            data = await websocket.receive_text()
            try:
                json_data = json.loads(data)
                # Basic validation
                telemetry_data = TelemetryCreate(**json_data)
                service.process_telemetry(telemetry_data)
                await websocket.send_text(f"Processed telemetry for {telemetry_data.vehicle_id}")
            except Exception as e:
                await websocket.send_text(f"Error processing data: {str(e)}")
    except WebSocketDisconnect:
        print("Client disconnected")
