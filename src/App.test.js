import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';  // Path to the App component

describe('App Component', () => {
  beforeEach(() => {
  });

  test('renders App component correctly', () => {
    render(<App />);

    // Check for elements rendered on initial load
    expect(screen.getByText('Clear List')).toBeInTheDocument();
    expect(screen.getByText('Sort by Priority')).toBeInTheDocument();
  });
  test('adds a new todo item', async () => {
    render(<App />);

    const input = screen.getByTestId('task-title');
    fireEvent.change(input, { target: { value: 'Test Todo' } });
  
    // Simulate adding the new todo
    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);
    
    // Check if the todo is added
    await waitFor(() => {
      expect(screen.getByText((content, element) => content.includes('Test Todo'))).toBeInTheDocument();
    });
  });
  test('clears the entire todo list', async () => {
    render(<App />);

    // Add a couple of todos
    const input = screen.getByTestId('task-title');
    fireEvent.change(input, { target: { value: 'First Todo' } });
    fireEvent.click(screen.getByText('Add'));
    
    fireEvent.change(input, { target: { value: 'Second Todo' } });
    fireEvent.click(screen.getByText('Add'));
  
    await waitFor(() => {
      expect(screen.getByText((content, element) => content.includes('First Todo'))).toBeInTheDocument();
      expect(screen.getByText((content, element) => content.includes('Second Todo'))).toBeInTheDocument();
    });
  
    // Clear the list
    const clearButton = screen.getByText('Clear List');
    fireEvent.click(clearButton);
  
    // Wait for the list to be cleared and check that no todos exist anymore
    await waitFor(() => {
      expect(screen.queryByText('First Todo')).not.toBeInTheDocument();
      expect(screen.queryByText('Second Todo')).not.toBeInTheDocument();
    });
  });
});