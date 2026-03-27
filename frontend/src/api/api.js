export const login = async (username, password) => {
  const res = await fetch("http://127.0.0.1:8000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return await res.json();
};

export const register = async (username, password) => {
  const res = await fetch("http://127.0.0.1:8000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return await res.json();
};

export const getChats = async (token) => {
  const res = await fetch("http://127.0.0.1:8000/chats", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};

export const getMessages = async (token, chat) => {
  const res = await fetch(`http://127.0.0.1:8000/messages/${chat}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
};