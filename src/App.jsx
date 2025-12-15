import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("user") || "");

  const handleLogin = (name) => {
    localStorage.setItem("user", name);
    setUsername(name);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUsername("");
  };

  return (
    <div className="app-wrapper">
      {!username ? (
        <Login onLogin={handleLogin} />
      ) : (
        <TodoList username={username} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;