import google.generativeai as genai
from sqlalchemy.orm import Session
from sqlalchemy import func
from models.schema import Defect, Vehicle
import json

class ManufacturingInsightAgent:
    def __init__(self, db: Session):
        self.db = db
        self.model = genai.GenerativeModel('gemini-2.0-flash')

    def generate_insight(self, model_name: str = None):
        """
        Aggregates defect data and generates insights for manufacturing improvements.
        """
        # 1. Aggregate Defect Data
        query = self.db.query(
            Defect.component,
            func.count(Defect.id).label('count')
        ).group_by(Defect.component)
        
        if model_name:
            query = query.join(Vehicle).filter(Vehicle.model_name == model_name)
            
        defect_stats = query.all()
        stats_dict = {component: count for component, count in defect_stats}
        
        if not stats_dict:
            return {"status": "no_data", "message": "No defect data available for analysis."}

        # 2. Generate Insight using LLM
        prompt = f"""
        You are a Manufacturing Insight Agent.
        Analyze the following defect statistics for vehicle model: {model_name or "All Models"}.
        
        Defect Stats: {stats_dict}
        
        Task:
        1. Identify the most problematic components.
        2. Hypothesize potential manufacturing or design flaws.
        3. Recommend quality control improvements.
        
        Output a JSON object with:
        - "top_defects": list of strings
        - "root_cause_hypothesis": string
        - "recommendations": list of strings
        """
        
        try:
            response = self.model.generate_content(prompt)
            text = response.text.replace('```json', '').replace('```', '').strip()
            insight = json.loads(text)
            return insight
        except Exception as e:
            print(f"Manufacturing Agent Error: {e}")
            return {
                "top_defects": [],
                "root_cause_hypothesis": "Analysis failed.",
                "recommendations": []
            }
