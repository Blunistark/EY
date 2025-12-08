import google.generativeai as genai
from sqlalchemy.orm import Session
from models.schema import Telemetry, Vehicle
from datetime import datetime, timedelta
import json
import os

class DataAnalysisAgent:
    def __init__(self, db: Session):
        self.db = db
        self.model = genai.GenerativeModel('gemini-2.0-flash')

    def analyze_vehicle_health(self, vehicle_id: str):
        """
        Analyzes the latest telemetry data for a vehicle.
        Returns a health status and any detected anomalies.
        """
        # 1. Fetch latest telemetry
        telemetry = self.db.query(Telemetry).filter(
            Telemetry.vehicle_id == vehicle_id
        ).order_by(Telemetry.timestamp.desc()).first()

        if not telemetry:
            return {"status": "unknown", "message": "No telemetry data found."}

        # 2. Rule-based Analysis (Fast & Cheap)
        anomalies = []
        if telemetry.engine_temp > 105:
            anomalies.append(f"High Engine Temperature: {telemetry.engine_temp}°C")
        if telemetry.battery_level < 20:
            anomalies.append(f"Low Battery Level: {telemetry.battery_level}%")
        if telemetry.brake_wear > 80:
            anomalies.append(f"Critical Brake Wear: {telemetry.brake_wear}%")
        if telemetry.tire_pressure_fl < 30 or telemetry.tire_pressure_fr < 30:
            anomalies.append("Low Tire Pressure (Front)")

        # 3. LLM Analysis (Deep Dive) - Only if anomalies found or requested
        llm_insight = "No complex analysis required."
        if anomalies:
            prompt = f"""
            You are a Data Analysis Agent for a vehicle maintenance system.
            Analyze the following telemetry snapshot and the detected anomalies.
            Provide a brief technical assessment of the vehicle's condition.
            
            Telemetry:
            - Speed: {telemetry.speed} km/h
            - RPM: {telemetry.rpm}
            - Engine Temp: {telemetry.engine_temp} C
            - Battery: {telemetry.battery_level} %
            - Brake Wear: {telemetry.brake_wear} %
            
            Detected Anomalies: {anomalies}
            
            Output a JSON object with:
            - "severity": "low", "medium", or "high"
            - "assessment": A one-sentence technical summary.
            """
            try:
                response = self.model.generate_content(prompt)
                text = response.text.replace('```json', '').replace('```', '').strip()
                llm_result = json.loads(text)
                llm_insight = llm_result.get("assessment", "Analysis failed")
                severity = llm_result.get("severity", "medium")
            except Exception as e:
                print(f"LLM Error: {e}")
                llm_insight = "LLM analysis unavailable."
                severity = "medium"
        else:
            severity = "low"

        return {
            "vehicle_id": vehicle_id,
            "timestamp": telemetry.timestamp.isoformat(),
            "status": "critical" if severity == "high" else "warning" if severity == "medium" else "healthy",
            "anomalies": anomalies,
            "ai_assessment": llm_insight
        }
