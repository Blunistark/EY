import google.generativeai as genai
from sqlalchemy.orm import Session
from models.schema import ServiceBooking
import json

class FeedbackAgent:
    def __init__(self, db: Session):
        self.db = db
        self.model = genai.GenerativeModel('gemini-2.0-flash')

    def analyze_feedback(self, feedback_text: str, booking_id: int):
        """
        Analyzes customer feedback to extract sentiment and key issues.
        """
        prompt = f"""
        Analyze the following customer feedback for a vehicle service.
        Feedback: "{feedback_text}"
        
        Task:
        1. Determine the sentiment (Positive, Neutral, Negative).
        2. Extract key issues or praise points.
        3. Suggest follow-up actions.
        
        Output a JSON object with:
        - "sentiment": string
        - "key_points": list of strings
        - "follow_up_action": string
        """
        
        try:
            response = self.model.generate_content(prompt)
            text = response.text.replace('```json', '').replace('```', '').strip()
            analysis = json.loads(text)
            
            # TODO: Store analysis in DB (e.g., update booking with feedback score)
            
            return analysis
        except Exception as e:
            print(f"Feedback Agent Error: {e}")
            return {
                "sentiment": "Unknown",
                "key_points": [],
                "follow_up_action": "Manual review required."
            }
