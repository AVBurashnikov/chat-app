from datetime import datetime, timedelta
from jose import jwt
from sqlalchemy.orm import Session

from app.core.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from app.core.security import hash_password, verify_password
from app.db.fake_db import users_db
from app.models.user import User


def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def register_user(db: Session, username: str, password: str):
    existing = db.query(User).filter(User.username == username).first()
    if existing:
        return None

    user = User(
        username=username,
        password=hash_password(password)
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()

    if not user:
        return None

    if not verify_password(password, user.password):
        return None

    return user