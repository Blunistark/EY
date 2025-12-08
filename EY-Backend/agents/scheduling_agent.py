import google.generativeai as genai
from sqlalchemy.orm import Session
from models.schema import ServiceBooking
from datetime import datetime, timedelta
import json
import dateparser

class SchedulingAgent:
    def __init__(self, db: Session):
        self.db = db
        self.model = genai.GenerativeModel('gemini-2.0-flash')

    def schedule_service(self, user_query: str, vehicle_id: str, user_id: int):
        """
        Parses the user's scheduling request and books a slot.
        """
        # 1. Parse Date/Time using LLM (or dateparser as fallback)
        prompt = f"""
        Extract the desired date and time for a service appointment from the following query.
        Query: "{user_query}"
        Current Time: {datetime.now().isoformat()}
        
        Output a JSON object with:
        - "target_date": ISO 8601 string (YYYY-MM-DDTHH:MM:SS)
        - "service_type": "maintenance", "repair", or "inspection"
        """
        
        try:
            response = self.model.generate_content(prompt)
            text = response.text.replace('```json', '').replace('```', '').strip()
            parsed = json.loads(text)
            target_date_str = parsed.get("target_date")
            service_type = parsed.get("service_type", "maintenance")
        except Exception as e:
            print(f"Scheduling Agent LLM Error: {e}")
            # Fallback to dateparser
            dt = dateparser.parse(user_query)
            if dt:
                target_date_str = dt.isoformat()
                service_type = "maintenance"
            else:
                return {
                    "status": "error",
                    "message": "Could not understand the date. Please specify a date and time."
                }

        target_date = datetime.fromisoformat(target_date_str)

        # 2. Check Availability (Mock logic: assume all slots are open for now)
        # In a real app, we'd query the DB for overlapping bookings
        
        # 3. Create Booking
        booking = ServiceBooking(
            vehicle_id=vehicle_id,
            service_date=target_date,
            service_type=service_type,
            status="confirmed",
            notes=f"Booked via AI Agent. Query: {user_query}"
        )
        self.db.add(booking)
        self.db.commit()
        self.db.refresh(booking)
        
        return {
            "status": "confirmed",
            "booking_id": booking.id,
            "date": target_date.strftime("%Y-%m-%d %H:%M"),
            "service_type": service_type,
            "message": f"Appointment confirmed for {target_date.strftime('%A, %B %d at %I:%M %p')}."
        }
