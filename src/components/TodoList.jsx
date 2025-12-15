import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

const API_BASE = import.meta.env.VITE_API_URL;

function TodoList({ username, onLogout }) {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [activeTodo, setActiveTodo] = useState(null);

 const API_BASE = import.meta.env.VITE_API_URL;

useEffect(() => {
  fetch(`${API_BASE}/todos/${username}`)
    .then(res => res.json())
    .then(data => setTodos(data));
}, [username]);


  const addTodo = async () => {
    if (newTask.trim() === "") return;

    const res = await fetch(`${API_BASE}/todos/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, task: newTask })
    });
    const data = await res.json();
    setTodos([...todos, data]);
    setNewTask("");
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_BASE}/todos/delete/${id}`, { method: "DELETE" });
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const toggleComplete = async (id) => {
    const res = await fetch(`${API_BASE}/todos/toggle/${id}`, { method: "PUT" });
    const data = await res.json();
    setTodos(todos.map(todo => (todo._id === data._id ? { ...todo, isCompleted: data.isCompleted } : todo)));
  };

  return (
    <div className="paper-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <h1>{username}'s Tasks</h1>
        <button onClick={onLogout} className="btn-text">Close Book</button>
      </div>

      <div className="input-group">
        <input
          type="text"
          className="classic-input"
          placeholder="New Task..."
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' ? addTodo() : null}
        />
        <button className="btn-black" onClick={addTodo}>Add</button>
      </div>

      <div className="list-area">
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            toggleComplete={() => toggleComplete(todo._id)}
            deleteTodo={() => deleteTodo(todo._id)}
            onOpen={() => setActiveTodo(todo)}
          />
        ))}
      </div>

      {activeTodo && (
        <div className="modal-overlay" onClick={() => setActiveTodo(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">{activeTodo.task}</div>
            <div className="modal-body">
              Status: {activeTodo.isCompleted ? "Completed ✅" : "Pending ⏳"}
            </div>
            <button className="close-modal-btn" onClick={() => setActiveTodo(null)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;
