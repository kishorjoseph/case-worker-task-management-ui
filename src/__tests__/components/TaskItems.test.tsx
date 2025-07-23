import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskItems } from "../../components/TaskItems"
import { TaskStatus, type Task } from '../../types/task'; 
import React from 'react';

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Pending Task 1',
    description: 'First pending task',
    dueDate: '01/01/2025',
    status: TaskStatus.Pending,
  },
  {
    id: '2',
    title: 'In Progress Task 1',
    description: 'First in progress task',
    dueDate: '02/02/2025',
    status: TaskStatus.InProgress,
  },
  {
    id: '3',
    title: 'Completed Task 1',
    description: 'First completed task',
    dueDate: '03/03/2025',
    status: TaskStatus.Completed,
  },
  {
    id: '4',
    title: 'Pending Task 2',
    description: 'Second pending task',
    dueDate: '04/04/2025',
    status: TaskStatus.Pending,
  },
];

describe('TaskItems', () => {
  it('renders tasks into their correct status columns', () => {
    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TaskItems
        tasks={mockTasks}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );


    const pendingColumn = screen.getByRole('heading', { name: /pending tasks/i }).closest('.task-column');
    expect(pendingColumn).toBeInTheDocument();
    expect(screen.getByText('Pending Task 1', { selector: '.task-column h3' })).toBeInTheDocument();
    expect(screen.getByText('Pending Task 2', { selector: '.task-column h3' })).toBeInTheDocument();
    expect(pendingColumn?.querySelectorAll('.task-item').length).toBe(2); // Verify count


    const inProgressColumn = screen.getByRole('heading', { name: /in progress tasks/i }).closest('.task-column');
    expect(inProgressColumn).toBeInTheDocument();
    expect(screen.getByText('In Progress Task 1', { selector: '.task-column h3' })).toBeInTheDocument();
    expect(inProgressColumn?.querySelectorAll('.task-item').length).toBe(1); // Verify count

  
    const completedColumn = screen.getByRole('heading', { name: /completed tasks/i }).closest('.task-column');
    expect(completedColumn).toBeInTheDocument();
    expect(screen.getByText('Completed Task 1', { selector: '.task-column h3' })).toBeInTheDocument();
    expect(completedColumn?.querySelectorAll('.task-item').length).toBe(1); // Verify count
  });

  it('renders no tasks when the tasks array is empty', () => {
    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TaskItems
        tasks={[]} // Empty array
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.queryByText('Pending Task 1')).not.toBeInTheDocument();
    expect(screen.queryByText('In Progress Task 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Completed Task 1')).not.toBeInTheDocument();

  
    expect(screen.getByRole('heading', { name: /pending tasks/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /in progress tasks/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /completed tasks/i })).toBeInTheDocument();
  });
});
