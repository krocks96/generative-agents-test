import os
import math
import faiss
from typing import List
from pydantic import BaseModel
from langchain.chat_models import ChatOpenAI
from langchain.docstore import InMemoryDocstore
from langchain.embeddings import OpenAIEmbeddings
from langchain.retrievers import TimeWeightedVectorStoreRetriever
from langchain.vectorstores import FAISS
from models.generative_agent import GenerativeAgent
from models.memory import GenerativeAgentMemory
# from langchain.experimental.generative_agents import GenerativeAgent, GenerativeAgentMemory

API_KEY=os.environ["OPENAI_API_KEY"]
LLM = ChatOpenAI(max_tokens=1500, openai_api_key=API_KEY)

class CreateAgentRequestData(BaseModel):
    name: str
    age: int
    traits: str
    status: str
    memory: str

class CreateMemoryRequestData(BaseModel):
    memory: str

class CreateMessageRequestData(BaseModel):
    message: str

class Agent:
    def __init__(self, id, data: CreateAgentRequestData):
        self.id = id
        # 記憶の生成
        memory = GenerativeAgentMemory(
            llm=LLM,
            memory_retriever=create_new_memory_retriever(),
            verbose=True,
            reflection_threshold=8
        )
        # エージェント生成
        self.agent = GenerativeAgent(
                    name=data.name, 
                    age=data.age,
                    traits=data.traits, # You can add more persistent traits here 
                    status=data.status, # When connected to a virtual world, we can have the characters update their status
                    llm=LLM,
                    memory=memory
                )
        # 初期記憶
        if data.memory != "":
            self.add_memory(data.memory)
            
    def get_summary(self):
        return self.agent.get_summary(force_refresh=True)

    def add_memory(self, memory):
        self.agent.memory.add_memory(memory)

    def interview_agent(self, message):
        return interview_agent(self.agent, message)

def relevance_score_fn(score: float) -> float:
    """Return a similarity score on a scale [0, 1]."""
    # This will differ depending on a few things:
    # - the distance / similarity metric used by the VectorStore
    # - the scale of your embeddings (OpenAI's are unit norm. Many others are not!)
    # This function converts the euclidean norm of normalized embeddings
    # (0 is most similar, sqrt(2) most dissimilar)
    # to a similarity function (0 to 1)
    return 1.0 - score / math.sqrt(2)

def create_new_memory_retriever():
    """Create a new vector store retriever unique to the agent."""
    # Define your embedding model
    embeddings_model = OpenAIEmbeddings()
    # Initialize the vectorstore as empty
    embedding_size = 1536
    index = faiss.IndexFlatL2(embedding_size)
    vectorstore = FAISS(embeddings_model.embed_query, index, InMemoryDocstore({}), {}, relevance_score_fn=relevance_score_fn)
    return TimeWeightedVectorStoreRetriever(vectorstore=vectorstore, other_score_keys=["importance"], k=15)    

def interview_agent(agent: GenerativeAgent, message: str) -> str:
    """Help the notebook user interact with the agent."""
    return agent.generate_dialogue_response(message)[1]