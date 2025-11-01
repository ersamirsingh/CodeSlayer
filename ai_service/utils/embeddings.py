from langchain_community.embeddings import HuggingFaceEmbeddings
import os
from dotenv import load_dotenv

load_dotenv()
MODEL = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")

hf = HuggingFaceEmbeddings(model_name=MODEL)

def embed_text(text: str):
    """Generate embedding vector for text."""
    return hf.embed_query(text)
