import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    if (!username || !password) {
      setMsg("Username & Password required");
      return;
    }

    const res = await fetch("import.meta.env.VITE_API_URL/auth/login-or-register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg(data.message);
    } else {
      onLogin(username); 
    }
  };

  return (
    <div className="paper-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Daily Task Journal</h1>

      <input
        className="classic-input"
        placeholder="Username"
        value={username}
        style={{ marginTop: "70px", padding: "15px 150px 15px 30px", flex: "none"  }}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="classic-input"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ marginTop: "30px", padding: "15px 150px 15px 30px", flex: "none" }}
        onKeyDown={e => e.key === "Enter" ? handleSubmit() : null}
      />

      {msg && <p style={{ color: "red" }}>{msg}</p>}

      <button className="btn-black"  style={{ marginTop: "30px", fontSize:"2rem", padding: "5px 70px" }} onClick={handleSubmit}>
        Open Book
      </button>
    </div>
  );
}

export default Login;
