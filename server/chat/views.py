from rest_framework.decorators import api_view
from rest_framework.response import Response
from ollama import chat



@api_view(["POST"])
def chat_view(request):

    message = request.data.get("message", "")

    response = chat(
        model="qwen3:8b",
        messages = [{"role": "user","content": message}],
        think = False
    )

    return Response({"reply": response.message.content})