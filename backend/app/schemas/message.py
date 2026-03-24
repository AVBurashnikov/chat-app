from pydantic import BaseModel

class MessageOut(BaseModel):
    sender: str
    receiver: str
    text: str

    class Config:
        from_attributes = True