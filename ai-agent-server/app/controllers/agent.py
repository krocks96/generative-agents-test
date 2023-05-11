from models.agent import CreateAgentRequestData, Agent

id = 0
agents = {}

class AgentController:
    def create_agent(self, data: CreateAgentRequestData):
        global id
        id += 1
        agent = Agent(id, data)
        agents[agent.id] = agent
        return agent
    
    def get_agents(self):
        res = {}
        list = []
        for agent in agents.values():
            dict = {}
            dict["id"] = agent.id
            dict["name"] = agent.agent.name
            dict["age"] = agent.agent.age
            dict["traits"] = agent.agent.traits
            dict["status"] = agent.agent.status
            list.append(dict)
        res["agentList"] = list
        return res
        
    def get_agent_detail(self, id):
        res = {}
        if id in agents:
            agent = agents[id]
            summary = agent.get_summary()
            res["id"] = agent.id
            res["name"] = agent.agent.name
            res["age"] = agent.agent.age
            res["traits"] = agent.agent.traits
            res["status"] = agent.agent.status
            res["summary"] = summary
        return res

    def create_memory(self, id, memory):
        if id in agents:
            agent = agents[id]
            agent.add_memory(memory)
        return

    def create_message(self, id, message):
        res = {}
        reply = ""
        if id in agents:
            agent = agents[id]
            reply = agent.interview_agent(message)
        res["reply"] = reply
        return res