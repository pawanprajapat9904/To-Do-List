import React from "react";

function TodoItem({ todo, toggleComplete, deleteTodo, onOpen }) {
  return (
    <div className={`todo-row ${todo.isCompleted ? 'completed' : ''}`}>
      <div className="todo-content" onClick={onOpen}>{todo.task}</div>
      <div className="actions">
        <span className="check-btn" onClick={toggleComplete}>✔</span>
        <span className="delete-x" onClick={deleteTodo}>✖</span>
      </div>
    </div>
  );
}

export default TodoItem;
