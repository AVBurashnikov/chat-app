import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getChats } from "../api/api";

export default function ChatList({ currentChat, setCurrentChat }) {
  const { token } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState("");

  const loadChats = async () => {
    const data = await getChats(token);
    setChats(data);
    if (!currentChat && data.length) setCurrentChat(data[0]);
  };

  useEffect(() => {
    loadChats();
  }, []);

  return (
    <div style={{ width: 250, borderRight: "1px solid #ddd", padding: 10 }}>
      <h3>Chats</h3>

      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="username"
          value={newChat}
          onChange={(e) => setNewChat(e.target.value)}
        />
        <button
          onClick={() => {
            if (!newChat) return;
            setCurrentChat(newChat);
            setNewChat("");
          }}
        >
          +
        </button>
      </div>

      {chats.map((chat) => (
        <div
          key={chat}
          onClick={() => setCurrentChat(chat)}
          style={{
            padding: 10,
            cursor: "pointer",
            background: currentChat === chat ? "#eee" : "transparent",
          }}
        >
          {chat}
        </div>
      ))}
    </div>
  );
}