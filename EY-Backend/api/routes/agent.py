from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
import httpx
import os

router = APIRouter()

# N8N Webhook URL (Internal Docker Network)
N8N_WEBHOOK_URL = os.getenv("N8N_WEBHOOK_URL", "http://n8n:5678/webhook/agent/chat")

class AgentRequest(BaseModel):
    query: str
    context: Optional[Dict[str, Any]] = None

@router.post("/agent/chat")
async def chat_with_agent(request: AgentRequest):
    """
    Forwards the chat request to the n8n Master Agent workflow.
    """
    try:
        async with httpx.AsyncClient() as client:
            # Forward the request to n8n
            response = await client.post(
                N8N_WEBHOOK_URL,
                json=request.dict(),
                timeout=30.0 # n8n might take some time
            )
            
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail=f"n8n Error: {response.text}")
            
            # Return the JSON response from n8n
            return response.json()
            
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Failed to connect to n8n: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
