from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
from agents.master_agent import MasterAgent

router = APIRouter()
master_agent = MasterAgent()

class AgentRequest(BaseModel):
    query: str
    context: Optional[Dict[str, Any]] = None

@router.post("/agent/chat")
async def chat_with_agent(request: AgentRequest):
    try:
        response = await master_agent.process_request(request.query, request.context)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
