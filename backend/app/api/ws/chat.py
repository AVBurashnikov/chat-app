from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.services.connection_manager import manager
from app.core.security import get_user_from_token

router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    # получаем токен из query
    token = websocket.query_params.get("token")

    if not token:
        await websocket.close(code=1008)
        return

    try:
        username = get_user_from_token(token)
    except:
        await websocket.close(code=1008)
        return

    await manager.connect(username, websocket)

    try:
        while True:
            data = await websocket.receive_text()

            to_user, message = data.split(":", 1)

            await manager.send_personal_message(
                f"{username}: {message}",
                to_user
            )

    except WebSocketDisconnect:
        manager.disconnect(username)