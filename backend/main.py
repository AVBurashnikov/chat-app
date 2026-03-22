from fastapi import FastAPI, WebSocket, WebSocketDisconnect

app = FastAPI()

# храним активные подключения
connections = {}

@app.websocket("/ws/{user}")
async def websocket_endpoint(websocket: WebSocket, user: str):
    await websocket.accept()
    connections[user] = websocket

    try:
        while True:
            data = await websocket.receive_text()

            # формат: "to:message"
            to_user, message = data.split(":", 1)

            if to_user in connections:
                await connections[to_user].send_text(f"{user}: {message}")

    except WebSocketDisconnect:
        del connections[user]