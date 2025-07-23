import React from 'react';
import { type Task } from '../types/task';
import { format, parse, isValid } from 'date-fns';

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void
}

export const TaskDisplay: React.FC<Props> = ({ task, onEdit, onDelete }) => {
  const parsedDate = parse(task.dueDate, 'dd/MM/yyyy', new Date());
  const formattedDate = isValid(parsedDate) ? format(parsedDate, 'dd/MM/yyyy') : 'No valid due date';

  return (
    <div className="task-item" key={task.id}>
       <div className="task-item-header">
        <h3>{task.title}</h3>
      </div>
      {task.description && <p>{task.description}</p>}
      <p>Due: {formattedDate}</p>
      <div className="button-group">
        <button onClick={()=> {onEdit(task)}}>Edit</button>
        <button onClick={()=>onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};