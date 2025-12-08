import google.generativeai as genai
import json

class DiagnosisAgent:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-2.0-flash')

    def diagnose_issue(self, anomalies: list, vehicle_model: str):
        """
        Diagnoses the root cause of the reported anomalies.
        """
        prompt = f"""
        You are a Diagnosis Agent for a vehicle maintenance system.
        
        Vehicle Model: {vehicle_model}
        Reported Anomalies: {anomalies}
        
        Task:
        1. Identify the most likely root cause.
        2. Assign a standard OBD-II fault code (or a plausible custom code).
        3. Estimate the severity (Low, Medium, High, Critical).
        4. Recommend immediate actions for the driver.
        5. Recommend parts that might need replacement.
        
        Output a JSON object with keys:
        - "root_cause": string
        - "fault_code": string
        - "severity": string
        - "action_for_driver": string
        - "recommended_parts": list of strings
        """
        
        try:
            response = self.model.generate_content(prompt)
            text = response.text.replace('```json', '').replace('```', '').strip()
            diagnosis = json.loads(text)
            return diagnosis
        except Exception as e:
            print(f"Diagnosis Agent Error: {e}")
            return {
                "root_cause": "AI Diagnosis Unavailable",
                "fault_code": "ERR-001",
                "severity": "Unknown",
                "action_for_driver": "Contact service center immediately.",
                "recommended_parts": []
            }
