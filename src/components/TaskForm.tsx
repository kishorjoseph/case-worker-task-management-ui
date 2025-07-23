import {  TaskStatus, type Task } from '../types/task';
import { useState } from 'react';
import { format, parse } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import './taskItems.css';
interface Props {
  mode: 'add' | 'edit';
  task?: Task;
  onSubmit: (task: Task) => void;
  onCancel: () => void;
}

export const TaskForm: React.FC<Props> = ({ mode, task, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<TaskStatus>(task?.status || TaskStatus.Pending);
  const [dueDate, setDueDate] = useState(() => {
    if (task?.dueDate) {
      try {
        const parsed = parse(task.dueDate, 'dd/MM/yyyy', new Date());
        return parsed.toISOString().split('T')[0];
      } catch {
        return '';
      }
    }
    return '';
  });

  const handleSubmit = () => {
    try {
      const formattedDate = format(new Date(dueDate), 'dd/MM/yyyy');
      const newTask: Task = {
        id: task?.id || uuidv4(),
        title,
        description,
        status,
        dueDate: formattedDate,
      };
      onSubmit(newTask);
    } catch {
      alert('Invalid date');
    }
  };

  return (
    <div className="task-item">
      <h3>{mode === 'edit' ? `Edit task` : 'Add task'}</h3>
      <label>Title</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} disabled={mode === 'edit'} placeholder="Title" />
      <label>Description</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} disabled={mode === 'edit'} placeholder="Description (optional)" />
      <label>Task Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
        <option value={TaskStatus.Pending}>Pending</option>
        <option value={TaskStatus.InProgress}>In Progress</option>
        <option value={TaskStatus.Completed}>Completed</option>
      </select>
      <label>Due Date</label>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}  disabled={mode === 'edit'}/>
      <div className="button-group">
      <button onClick={handleSubmit}>{mode === 'edit' ? 'Update Task' : 'Add Task'}</button>
       <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};