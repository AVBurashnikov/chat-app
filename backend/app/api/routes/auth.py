from fastapi import APIRouter, HTTPException

from app.schemas.user import UserCreate, UserLogin
from app.services.auth_service import register_user, authenticate_user, create_token

router = APIRouter()

@router.post("/register")
def register(data: UserCreate):
    user = register_user(data.username, data.password)

    if not user:
        raise HTTPException(status_code=400, detail="User exists")

    return {"message": "User created"}


@router.post("/login")
def login(data: UserLogin):
    user = authenticate_user(data.username, data.password)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({"sub": user["username"]})

    return {"access_token": token, "token_type": "bearer"}