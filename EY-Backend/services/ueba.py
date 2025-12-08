from sqlalchemy.orm import Session
from models.schema import UEBALog
from datetime import datetime
import json

class UEBAService:
    def __init__(self, db: Session):
        self.db = db

    def log_action(self, agent_name: str, action: str, resource: str, parameters: dict, result: str = "ALLOWED", reason: str = None, risk_level: str = "LOW"):
        """
        Logs an agent action to the UEBA logs.
        """
        log_entry = UEBALog(
            agent_name=agent_name,
            action=action,
            resource=resource,
            parameters=parameters, # SQLAlchemy JSONB handles dict
            result=result,
            reason=reason,
            risk_level=risk_level,
            timestamp=datetime.utcnow()
        )
        self.db.add(log_entry)
        self.db.commit()
        return log_entry

    def check_permission(self, agent_name: str, resource: str, action: str) -> bool:
        """
        Simple rule-based permission check (Baseline Enforcement).
        """
        # Define allowed actions per agent (Baseline)
        permissions = {
            "master_agent": ["*"],
            "data_analysis_agent": ["read_telematics", "read_vehicle", "write_cleaned_data"],
            "diagnosis_agent": ["read_cleaned_data", "read_history", "write_predicted_issues"],
            "scheduling_agent": ["read_predicted_issues", "read_schedule", "write_appointment"],
            "customer_engagement_agent": ["read_vehicle_health", "read_appointments"],
            "feedback_agent": ["read_service_record", "write_rca_capa"],
            "manufacturing_insight_agent": ["read_rca_capa", "read_defects"],
        }
        
        allowed_resources = permissions.get(agent_name, [])
        if "*" in allowed_resources:
            return True
        
        # Check if resource is allowed
        # Simple string matching for now, can be more granular
        for allowed in allowed_resources:
            if allowed in resource or resource in allowed:
                return True
                
        return False

    def monitor_and_log(self, agent_name: str, action: str, resource: str, parameters: dict):
        """
        Wrapper to check permission and log result.
        Returns True if allowed, False if blocked.
        """
        is_allowed = self.check_permission(agent_name, resource, action)
        
        result = "ALLOWED" if is_allowed else "BLOCKED"
        risk_level = "LOW" if is_allowed else "HIGH"
        reason = None if is_allowed else "Access not permitted for this agent"
        
        self.log_action(
            agent_name=agent_name,
            action=action,
            resource=resource,
            parameters=parameters,
            result=result,
            reason=reason,
            risk_level=risk_level
        )
        
        return is_allowed
