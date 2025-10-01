from fastapi import FastAPI
from pydantic import BaseModel
import json
import datetime

app = FastAPI()

# Charger la FAQ
with open("faq.json", "r", encoding="utf-8") as f:
    FAQ = json.load(f)

class ChatRequest(BaseModel):
    message: str

def match_by_id_keyword(message, faq):
    message_lower = message.lower()
    for entry in faq:
        # Extraire le mot-clé depuis l'id (après 'faq#')
        keyword = entry["id"].split("#")[1].lower()
        if keyword in message_lower:
            return entry
    # Si aucun mot-clé ne correspond
    return {"id": "faq#none", "a": "Désolé, je n’ai pas trouvé de réponse.", "q": ""}


@app.post("/chat")
async def chat(req: ChatRequest):
    message = req.message
    result = match_by_id_keyword(message, FAQ)

    # Log minimal
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] Q: {message} → A: {result['a']}")

    return {
        "answer": result["a"],
        "sources": [result["id"]]
    }

