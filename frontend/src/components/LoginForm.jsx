import { useState, useContext } from "react";
import { login as loginApi } from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import RegisterForm from "./RegisterForm.jsx";

export default function LoginForm() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const { setToken, setUsername } = useContext(AuthContext);

  const handleLogin = async () => {
    const data = await loginApi(usernameInput, passwordInput);
    setToken(data.access_token);
    setUsername(usernameInput);
  };

  if (showRegister) {
    return <RegisterForm goBack={() => setShowRegister(false)} />;
  }

  return (
      <div style={{padding: 20}}>
          <h2>Login</h2>
          <input placeholder="username" onChange={e => setUsernameInput(e.target.value)}/>
          <br/>
          <input type="password" placeholder="password" onChange={e => setPasswordInput(e.target.value)}/>
          <br/>
          <button onClick={handleLogin}>Login</button>
          <br/>
          <p>
            Don't have an account?{' '}
            <span
                style={{color: 'blue', cursor: 'pointer', textDecoration: 'underline'}}
                onClick={() => setShowRegister(true)}
            >
                Register here
            </span>
          </p>
      </div>
  );
}