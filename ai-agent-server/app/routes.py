import json
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from models.agent import CreateAgentRequestData, CreateMessageRequestData, CreateMemoryRequestData
from controllers.agent import AgentController

router = APIRouter()
agent_controller = AgentController()

# ルーティング
@router.get('/health')
async def health():
    return {"status": "OK"}

@router.post('/agents', status_code=201)
async def create_agent(input: CreateAgentRequestData):
    agent = agent_controller.create_agent(input)
    return agent.get_summary()

@router.get('/agents', status_code=200)
async def get_agents():
    agents = agent_controller.get_agents()
    return JSONResponse(content=agents)

@router.get('/agents/{id}', status_code=200)
async def get_agent_detail(id:int):
    agent = agent_controller.get_agent_detail(id)
    return JSONResponse(content=agent)

@router.post('/agents/{id}/memories', status_code=201)
async def create_memory(id:int, data: CreateMemoryRequestData):
    print("Router: Create Memory")
    agent_controller.create_memory(id, data.memory)
    return

@router.post('/agents/{id}/messages', status_code=201)
async def create_message(id:int, data: CreateMessageRequestData):
    res = agent_controller.create_message(id, data.message)
    return JSONResponse(content=res)
