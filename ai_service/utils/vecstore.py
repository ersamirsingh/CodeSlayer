import os
from langchain_community.vectorstores import FAISS
from langchain.docstore.document import Document
from utils.embeddings import hf
from dotenv import load_dotenv

load_dotenv()
VECTORSTORE_PATH = os.getenv("VECTORSTORE_PATH", "./faiss_index")

def build_index_from_laborers(laborer_docs):
    docs = [
        Document(
            page_content=ld["content"],
            metadata={"laborer_id": ld["id"], **ld.get("meta", {})},
        )
        for ld in laborer_docs
    ]
    vectorstore = FAISS.from_documents(docs, hf)
    vectorstore.save_local(VECTORSTORE_PATH)
    return vectorstore

def load_index():
    if not os.path.exists(VECTORSTORE_PATH):
        return None
    return FAISS.load_local(VECTORSTORE_PATH, hf)
