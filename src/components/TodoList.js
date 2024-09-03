import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, removeTodo, editTodo }) => {
  return (
    <div>
      {/* Use a ul element with role="list" for assistive technologies */}
      <ul role="list" aria-labelledby="todo-list-heading">
        {todos.length > 0 ? (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              editTodo={editTodo}
            />
          ))
        ) : (
          <li role="listitem" aria-label="No tasks available">No tasks available</li> 
          // Accessible message when there are no tasks
        )}
      </ul>
    </div>
  );
};

export default TodoList;    