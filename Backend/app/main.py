from fastapi import FastAPI
from app import auth, upload, agent, chat, retrain, admin

app = FastAPI(title="AI Agent Builder")

app.include_router(auth.router)
app.include_router(upload.router)
app.include_router(agent.router)
app.include_router(chat.router)
app.include_router(retrain.router)
app.include_router(admin.router)
