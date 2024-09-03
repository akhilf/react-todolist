// TodoItem.js
import React, { useState } from 'react';

const TodoItem = ({ todo, removeTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newPriority, setNewPriority] = useState(todo.priority);

  const handleEdit = () => {
    editTodo(todo.id, { title: newTitle, priority: newPriority });
    setIsEditing(false);
  };

  return (
    <li  className='task'>
      {isEditing ? (
         <div className="flex-container">
          <div className="left-item">
            <input
                type="text"
                value={newTitle}
                 aria-label="Edit Task Title"
                onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
                type="number"
                value={newPriority}
                 aria-label="Edit Task Priority"
                onChange={(e) => setNewPriority(Number(e.target.value))}
            />
          </div>
          <div className="right-item">
            <button className="btn" onClick={handleEdit} aria-label="Save edited task">Save</button>
          </div>
        </div>
      ) : (   
          <div className="flex-container">
            <div className="left-item">{todo.title} (Priority: {todo.priority})</div>
            <div className="right-item">
                <button  data-testid="edit-task" onClick={() => setIsEditing(true)} className="btn"  aria-label="Edit task">Edit</button>
                <button  data-testid="remove-task" onClick={() => removeTodo(todo.id)} className="btn" aria-label={`Remove task ${todo.title}`}>Remove</button>
            </div>
          </div>
      )}
    </li>
  );
};

export default TodoItem;