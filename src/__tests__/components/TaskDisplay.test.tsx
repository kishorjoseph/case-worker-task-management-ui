import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskDisplay } from '../../components/TaskDisplay'; 
import { type Task } from '../../types/task';



enum TaskStatus {
    Pending = 'pending',
    InProgress = 'in-progress',
    Completed = 'completed'
  }

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'This is a test description.',
  dueDate: '25/12/2024', 
  status: TaskStatus.Pending
};

describe('TaskDisplay', () => {
  it('renders task details correctly', () => {

    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TaskDisplay
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

  
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('This is a test description.')).toBeInTheDocument();
  
    expect(screen.getByText('Due: 25/12/2024')).toBeInTheDocument();
  });

  it('calls onEdit when the Edit button is clicked', () => {
    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TaskDisplay
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);


    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(mockTask);
  });

  it('calls onDelete when the Delete button is clicked', () => {
    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TaskDisplay
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );


    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

   
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockTask.id);
  });

  it('does not render description if not provided', () => {
    const taskWithoutDescription: Task = {
      ...mockTask,
      description: undefined, 
    };
    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TaskDisplay
        task={taskWithoutDescription}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

   
    expect(screen.queryByText('This is a test description.')).not.toBeInTheDocument();
  });

  it('handles invalid due date gracefully', () => {
    const taskWithInvalidDate: Task = {
      ...mockTask,
      dueDate: 'invalid-date-string',
    };
    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TaskDisplay
        task={taskWithInvalidDate}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

 
    expect(screen.getByText('Due: No valid due date')).toBeInTheDocument();
  });
});
