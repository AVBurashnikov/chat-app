from fastapi import FastAPI

from app.api.routes import auth, messages
from app.api.ws import chat
from app.db.database import Base, engine


Base.metadata.create_all(bind=engine)

application = FastAPI()

application.include_router(messages.router)
application.include_router(auth.router)
application.include_router(chat.router)