from datetime import datetime, timedelta
from jose import jwt
from app.core.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from app.core.security import hash_password, verify_password
from app.db.fake_db import users_db


def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def register_user(username: str, password: str):
    if username in users_db:
        return None

    users_db[username] = {
        "username": username,
        "password": hash_password(password)
    }
    return users_db[username]


def authenticate_user(username: str, password: str):
    user = users_db.get(username)
    if not user:
        return None

    if not verify_password(password, user["password"]):
        return None

    return user