from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.core.security import get_user_from_token
from app.db.deps import get_db
from app.services.message_service import get_chat_history
from app.schemas.message import MessageOut
from typing import List

router = APIRouter()


@router.get("/messages/{username}", response_model=List[MessageOut])
def get_messages(
    username: str,
    request: Request,
    db: Session = Depends(get_db)
):
    token = request.headers.get("Authorization").replace("Bearer ", "")
    current_user = get_user_from_token(token)

    return get_chat_history(db, current_user, username)