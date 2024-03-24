import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TaskElement from './TaskElement';
import '@testing-library/jest-dom/extend-expect';

// Mocking the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('TaskElement component', () => {
  const task = {
    id: '1',
    title: 'Task 1',
    category: 'Category 1',
    description: 'Description for Task 1',
    priority: 100,
    active: true,
  };

  test('renders TaskElement component', () => {
    const { getByText } = render(<TaskElement task={task} />);
    const titleElement = getByText(task.title);
    const categoryElement = getByText(`Categoria: ${task.category}`);
    const descriptionElement = getByText(task.description);
    
    expect(titleElement).toBeInTheDocument();
    expect(categoryElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  test('calls onDoubleClick when task is active and double clicked', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    const { getByText } = render(<TaskElement task={task} />);
    const titleElement = getByText(task.title);
    fireEvent.doubleClick(titleElement);
    
    expect(navigate).toHaveBeenCalledWith(`/task/${task.id}`);
  });
});
