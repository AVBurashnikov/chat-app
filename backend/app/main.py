from fastapi import FastAPI

from app.api.routes import auth
from app.api.ws import chat

application = FastAPI()

application.include_router(auth.router)
application.include_router(chat.router)