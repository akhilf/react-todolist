import { render, screen, fireEvent  } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';  // Path to the App component

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders App component correctly', () => {
    render(<App />);

    // Check for elements rendered on initial load
    expect(screen.getByText('Clear List')).toBeInTheDocument();
    expect(screen.getByText('Sort by Priority')).toBeInTheDocument();
  });
  // test('adds a new todo item', () => {
  //   render(<App />);

  //   // Simulate typing into the add todo input
  //   const input = screen.getByPlaceholderText('New todo item');
  //   fireEvent.change(input, { target: { value: 'Test Todo' } });

  //   // Simulate adding the new todo
  //   const addButton = screen.getByText('Add');
  //   fireEvent.click(addButton);

  //   // Check if the todo is added
  //   expect(screen.getByText('Test Todo')).toBeInTheDocument();
  // });
});