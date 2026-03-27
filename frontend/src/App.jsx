import { useState, useContext } from "react";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { WSProvider } from "./contexts/WebSocketContext";
import LoginForm from "./components/LoginForm";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";

function AppContent() {
  const { token } = useContext(AuthContext);
  const [currentChat, setCurrentChat] = useState("");

  if (!token) return <LoginForm />;

  return (
    <WSProvider>
      <div style={{ display: "flex", height: "100vh" }}>
        <ChatList currentChat={currentChat} setCurrentChat={setCurrentChat} />
        <ChatWindow currentChat={currentChat} />
      </div>
    </WSProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}