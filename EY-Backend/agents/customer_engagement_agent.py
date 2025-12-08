import google.generativeai as genai
from sqlalchemy.orm import Session
from models.schema import User, Vehicle
import json

class CustomerEngagementAgent:
    def __init__(self, db: Session):
        self.db = db
        self.model = genai.GenerativeModel('gemini-2.0-flash')

    def handle_query(self, query: str, user_id: int, context: dict = None):
        """
        Handles general customer queries, FAQs, and provides personalized responses.
        """
        # Fetch user context
        user = self.db.query(User).filter(User.id == user_id).first()
        user_name = user.full_name if user else "Customer"
        
        # Construct prompt
        prompt = f"""
        You are a helpful Customer Service Agent for a vehicle maintenance platform.
        User Name: {user_name}
        User Query: "{query}"
        Context: {context}
        
        Task:
        Provide a friendly, helpful, and concise response to the user.
        If the user asks about their vehicle status, use the context provided.
        If the user asks for a booking, guide them to use the booking feature (or say you can help schedule it).
        
        Output a JSON object with:
        - "response": The text response to show to the user.
        - "suggested_actions": List of buttons/actions (e.g., ["Book Service", "View Vehicle Health"]).
        """
        
        try:
            response = self.model.generate_content(prompt)
            text = response.text.replace('```json', '').replace('```', '').strip()
            result = json.loads(text)
            return result
        except Exception as e:
            print(f"Customer Agent Error: {e}")
            return {
                "response": "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
                "suggested_actions": []
            }
