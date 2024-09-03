import React, { useState } from 'react';

const AddTodo = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    if (title || !title.trim() === '') {
      setErrorMessage('');
      addTodo({ title, priority });
      setTitle('');
      setPriority(1);
    } else{
        setErrorMessage('Task field cannot be empty.');
    }
  };

  return (
    <div className='add-form'>
      <div className='form-control'>
        <label htmlFor="taskTitle">Task</label>
        <input
          id="taskTitle"
          data-testid="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add todo item"
          aria-required="true"
          aria-invalid={!!errorMessage}
        />
      </div>
      
      {errorMessage && (
        <p 
          style={{ color: 'red', fontSize: '14px' }}
          role="alert" 
          aria-live="assertive"
        >
          {errorMessage}
        </p>
      )}

      <div className='form-control'>
        <label htmlFor="taskPriority">Priority (1-5)</label>
        <input
          id="taskPriority"
          type="number"
          data-testid="task-priority"
          placeholder="Priority (1-5)"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          aria-required="true"
        />
      </div>

      <button className="btn" onClick={handleSubmit} aria-label="Add new task">
        Add
      </button>
    </div>
  );
};

export default AddTodo