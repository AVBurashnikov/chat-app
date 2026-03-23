from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, WebSocket] = {}

    async def connect(self, user: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user] = websocket

    def disconnect(self, user: str):
        if user in self.active_connections:
            del self.active_connections[user]

    async def send_personal_message(self, message: str, to_user: str):
        if to_user in self.active_connections:
            await self.active_connections[to_user].send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections.values():
            await connection.send_text(message)


manager = ConnectionManager()