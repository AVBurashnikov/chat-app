from sqlalchemy.orm import Session
from app.models.message import Message
from sqlalchemy import or_, and_

def get_chat_history(db: Session, user1: str, user2: str):
    return db.query(Message).filter(
        or_(
            and_(Message.sender == user1, Message.receiver == user2),
            and_(Message.sender == user2, Message.receiver == user1)
        )
    ).order_by(Message.id.asc()).all()