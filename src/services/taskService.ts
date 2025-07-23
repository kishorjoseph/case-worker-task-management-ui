import type { Task } from "../types/task";


const API_URL = '/api/task';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await fetch(`${API_URL}/${task.id}/status`, {
    body: JSON.stringify(task),
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
};

export const deleteTask = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
