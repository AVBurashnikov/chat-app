from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.schemas.user import UserCreate, UserLogin
from app.services.auth_service import register_user, authenticate_user, create_token
from app.db.deps import get_db
router = APIRouter()

@router.post("/register")
def register(data: UserCreate, db: Session = Depends(get_db)):
    user = register_user(db, data.username, data.password)

    if not user:
        raise HTTPException(status_code=400, detail="User exists")

    return {"message": "User created"}


@router.post("/login")
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = authenticate_user(db, data.username, data.password)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({"sub": user["username"]})

    return {"access_token": token, "token_type": "bearer"}