import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const WSContext = createContext();

export const WSProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    if (token) {
      const socket = new WebSocket(`ws://127.0.0.1:8000/ws?token=${token}`);
      setWs(socket);
      return () => socket.close();
    }
  }, [token]);

  return <WSContext.Provider value={{ ws }}>{children}</WSContext.Provider>;
};