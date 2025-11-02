import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Groq API setup
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "mixtral-8x7b")  # Default fallback model

# Groq endpoint (correct one!)
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"


def groq_chat(messages, temperature=0.5, max_tokens=250):
    """
    Send chat completion request to Groq API.
    messages: list of dicts like [{"role": "system", "content": "..."}, {"role": "user", "content": "..."}]
    """
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": GROQ_MODEL,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
    }

    try:
        response = requests.post(GROQ_API_URL, headers=headers, json=payload)
        response.raise_for_status()  # Raise exception if status != 200

        data = response.json()
        # Return the text + full raw response for debugging
        return data["choices"][0]["message"]["content"], data

    except requests.exceptions.HTTPError as e:
        print(f"[Groq Error] HTTP {response.status_code}: {response.text}")
        return f"Groq API HTTP Error ({response.status_code})", None

    except requests.exceptions.RequestException as e:
        print(f"[Groq Connection Error] {e}")
        return "Groq API Connection Error", None

    except Exception as e:
        print(f"[Groq Unknown Error] {e}")
        return "Groq API Unexpected Error", None
