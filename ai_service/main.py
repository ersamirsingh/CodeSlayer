from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import match, chatbot
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title='kaamsetu')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(match.router)
app.include_router(chatbot.router)

@app.get("/")
def root():
    return {"message":"AI Service is running !"}

