from interfaces.adapters.openai import OpenAIAdapter
from interfaces.models.chat_request_data import ChatRequestData
from interfaces.models.chat_response_data import ChatResponseData

class ChatUseCase:
    def __init__(self, adapter: OpenAIAdapter) -> None:
        self.adapter = adapter

    def execute(self, input_data: ChatRequestData) -> ChatResponseData:
        result = self.adapter.generate_text(input_data.text)
        print(result)
        return ChatResponseData(result=result)
