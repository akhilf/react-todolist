// App.js
import React, { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Header from './components/Header.js';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [showAddTask, setshowAddTask] = useState(false);

  // Read todos from localstorage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    if(todos.length > 0){
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  // Add a new todo item
  const addTodo = (newTodo) => {
    setTodos([...todos, { ...newTodo, id: Date.now() }]);
  };

  // Remove a todo by id
  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Clear the entire list
  const clearList = () => {
    setTodos([]);
    localStorage.removeItem('todos');
  };

  // Edit an existing todo
  const editTodo = (id, editedTodo) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, ...editedTodo } : todo
    );
    setTodos(updatedTodos);
  };

  // Sort by priority (ascending)
  const sortByPriority = () => {
    const sortedTodos = [...todos].sort((a, b) => a.priority - b.priority);
    setTodos(sortedTodos);
  };

  return (
    <main className='container' aria-label="To-do Application">
      <Header />

      {/* Accessible button with aria-label for better description */}
      <AddTodo addTodo={addTodo} />

      {/* Accessible button */}
      <button
        className="btn"
        onClick={clearList}
        aria-label="Clear all tasks"
      >
        Clear List
      </button>

      <button
        className="btn"
        onClick={sortByPriority}
        aria-label="Sort tasks by priority"
      >
        Sort by Priority
      </button>

      {/* Make todo list navigation-friendly */}
      <section aria-live="polite">
        <TodoList todos={todos} removeTodo={removeTodo} editTodo={editTodo} />
      </section>
    </main>
  );
};

export default App;