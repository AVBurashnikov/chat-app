import { useState } from "react";
import { register as registerApi } from "../api/api";
import LoginForm from "./LoginForm.jsx";

export default function RegisterForm() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const handleRegister = async () => {
    const data = await registerApi(usernameInput, passwordInput);
    setShowLogin(true);
  };

  if (showLogin)
      return <LoginForm />

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>
      <input placeholder="username" onChange={e => setUsernameInput(e.target.value)} />
      <br />
      <input type="password" placeholder="password" onChange={e => setPasswordInput(e.target.value)} />
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}