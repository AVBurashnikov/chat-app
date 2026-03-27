import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { WSContext } from "../contexts/WebSocketContext";
import { getMessages } from "../api/api";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ currentChat }) {
  const { token, username } = useContext(AuthContext);
  const { ws } = useContext(WSContext);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Загружаем историю сообщений при смене чата
  const loadHistory = async () => {
    if (!currentChat) return;
    const data = await getMessages(token, currentChat);
    setMessages(
      data.map((m) => ({
        text: m.text,
        isMine: m.sender === username,
        time: new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }))
    );
  };

  useEffect(() => {
    loadHistory();
  }, [currentChat]);

  // WebSocket onmessage глобально
  useEffect(() => {
    if (!ws) return;

    const handleMessage = (e) => {
      const [sender, text] = e.data.split(":", 2);
      const isMine = sender === username;
      setMessages((prev) => [
        ...prev,
        {
          text: text.trim(),
          isMine,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    };

    ws.addEventListener("message", handleMessage);
    return () => ws.removeEventListener("message", handleMessage);
  }, [ws]);

  // Отправка сообщения
  const sendMessage = () => {
    if (!input || !ws || !currentChat) return;

    setMessages((prev) => [
      ...prev,
      {
        text: input,
        isMine: true,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);

    ws.send(`${currentChat}:${input}`);
    setInput("");
  };

  // Авто-скролл вниз
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!currentChat) return <div style={{ flex: 1 }}>Выберите чат</div>;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: 10, borderBottom: "1px solid #ddd" }}>Чат с {currentChat}</div>

      <div style={{ flex: 1, padding: 10, overflowY: "auto", background: "#f5f5f5", display: "flex", flexDirection: "column" }}>
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m.text} isMine={m.isMine} time={m.time} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: "flex", padding: 10, borderTop: "1px solid #ddd" }}>
        <input
          style={{ flex: 1, padding: 8 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Сообщение..."
          onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
        />
        <button style={{ marginLeft: 8 }} onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  );
}