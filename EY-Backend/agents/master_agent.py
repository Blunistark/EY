import os
import google.generativeai as genai
from dotenv import load_dotenv
import json

load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

class MasterAgent:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-2.0-flash')
        self.chat = self.model.start_chat(history=[])
        
        # Define available agents and their capabilities
        self.agents = {
            "data_analysis": "Analyzes telemetry data, detects anomalies, and assesses component health.",
            "diagnosis": "Identifies fault codes, determines severity, and recommends technical actions.",
            "scheduling": "Checks workshop availability, books appointments, and manages service schedules.",
            "customer_engagement": "Interacts with customers, explains issues, and handles bookings via chat.",
            "feedback": "Collects and analyzes post-service feedback.",
            "manufacturing_insight": "Aggregates defect patterns for OEM/Manufacturing teams."
        }

    async def process_request(self, user_input: str, context: dict = None):
        """
        Analyzes the user request and delegates to the appropriate agent.
        """
        
        # 1. Intent Classification & Delegation
        prompt = f"""
        You are the Master Agent of a predictive maintenance platform.
        Your goal is to route the following user request to the most appropriate specialized agent.
        
        User Request: "{user_input}"
        Context: {context}
        
        Available Agents:
        {json.dumps(self.agents, indent=2)}
        
        Return a JSON object with:
        - "target_agent": The key of the agent to handle this request.
        - "reasoning": Why you chose this agent.
        - "parameters": Any relevant parameters extracted from the request to pass to the agent.
        
        If the request is general or unclear, default to "customer_engagement".
        """
        
        try:
            response = self.model.generate_content(prompt)
            # Clean up response to ensure valid JSON
            text = response.text.replace('```json', '').replace('```', '').strip()
            decision = json.loads(text)
            
            target_agent = decision.get("target_agent")
            print(f"Master Agent delegating to: {target_agent}")
            
            # 2. Delegation (Stubbed for now)
            result = await self.delegate_to_agent(target_agent, decision.get("parameters"), context)
            
            return {
                "master_decision": decision,
                "agent_result": result
            }
            
        except Exception as e:
            print(f"Error in Master Agent: {e}")
            return {"error": str(e)}

    async def delegate_to_agent(self, agent_name: str, parameters: dict, context: dict):
        """
        Routes the call to the specific agent class.
        """
        # This will be replaced by actual agent calls as we implement them
        if agent_name == "data_analysis":
            from agents.data_analysis_agent import DataAnalysisAgent
            from models.database import SessionLocal
            db = SessionLocal()
            try:
                agent = DataAnalysisAgent(db)
                # Extract vehicle_id from parameters or context
                vehicle_id = parameters.get("vehicle_id") or context.get("vehicle_id")
                if vehicle_id:
                    return agent.analyze_vehicle_health(vehicle_id)
                else:
                    return {"status": "error", "message": "Vehicle ID required for analysis."}
            finally:
                db.close()
        elif agent_name == "diagnosis":
            from agents.diagnosis_agent import DiagnosisAgent
            agent = DiagnosisAgent()
            
            # Extract parameters
            anomalies = parameters.get("anomalies", [])
            vehicle_model = parameters.get("vehicle_model", "Unknown")
            
            # If anomalies are not provided, try to infer from context or previous data analysis
            if not anomalies and context.get("last_analysis"):
                 anomalies = context["last_analysis"].get("anomalies", [])
            
            return agent.diagnose_issue(anomalies, vehicle_model)
        elif agent_name == "scheduling":
            from agents.scheduling_agent import SchedulingAgent
            from models.database import SessionLocal
            db = SessionLocal()
            try:
                agent = SchedulingAgent(db)
                vehicle_id = parameters.get("vehicle_id") or context.get("vehicle_id")
                user_id = parameters.get("user_id") or context.get("user_id")
                query = parameters.get("query") or context.get("query") # Master agent might pass original query
                
                # If query is not in parameters, use the original user input if available (need to pass it)
                # For now, let's assume parameters has it or we use a default
                if not query:
                     return {"status": "error", "message": "Query required for scheduling."}

                if vehicle_id and user_id:
                    return agent.schedule_service(query, vehicle_id, user_id)
                else:
                    return {"status": "error", "message": "Vehicle ID and User ID required."}
            finally:
                db.close()
        elif agent_name == "customer_engagement":
            from agents.customer_engagement_agent import CustomerEngagementAgent
            from models.database import SessionLocal
            db = SessionLocal()
            try:
                agent = CustomerEngagementAgent(db)
                user_id = parameters.get("user_id") or context.get("user_id")
                query = parameters.get("query") or context.get("query")
                
                if not query:
                     return {"status": "error", "message": "Query required."}
                
                if user_id:
                    return agent.handle_query(query, user_id, context)
                else:
                    return {"status": "error", "message": "User ID required."}
            finally:
                db.close()
        elif agent_name == "feedback":
            from agents.feedback_agent import FeedbackAgent
            from models.database import SessionLocal
            db = SessionLocal()
            try:
                agent = FeedbackAgent(db)
                feedback_text = parameters.get("feedback_text") or context.get("feedback_text")
                booking_id = parameters.get("booking_id") or context.get("booking_id")
                
                if feedback_text:
                    return agent.analyze_feedback(feedback_text, booking_id)
                else:
                    return {"status": "error", "message": "Feedback text required."}
            finally:
                db.close()
        elif agent_name == "manufacturing_insight":
            from agents.manufacturing_insight_agent import ManufacturingInsightAgent
            from models.database import SessionLocal
            db = SessionLocal()
            try:
                agent = ManufacturingInsightAgent(db)
                model_name = parameters.get("model_name") or context.get("model_name")
                return agent.generate_insight(model_name)
            finally:
                db.close()
        else:
            return {"status": "error", "message": f"Unknown agent: {agent_name}"}
