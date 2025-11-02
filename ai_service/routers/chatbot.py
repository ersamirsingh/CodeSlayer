from fastapi import APIRouter, Body
from utils.groq_client import groq_chat
from prompts import BOT_SYSTEM_PROMPT
import json, os,traceback

router = APIRouter(prefix="/chatbot", tags=["Chatbot"])

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "faqs.json")
with open(DATA_PATH, "r") as f:
    FAQS = json.load(f)

@router.post("/")
def chatbot(query: str = Body(...)):
    query = query.strip().lower()
    for faq in FAQS:
        if faq["question"] in query:
            return {"success": True, "source": "faq", "answer": faq["answer"]}

    messages = [
        {"role": "system", "content": BOT_SYSTEM_PROMPT},
        {"role": "user", "content": query}
    ]
    try:
        answer, _ = groq_chat(messages, temperature=0.5, max_tokens=250)
        return {"success": True, "source": "groq", "answer": answer}
    except Exception:
        # return {"success": False, "answer": "Assistant unavailable."}
        print("---- ERROR TRACE ----")
        traceback.print_exc()
        print("---------------------")
        return {"success": False, "answer": f"Error: {str(e)}"}
