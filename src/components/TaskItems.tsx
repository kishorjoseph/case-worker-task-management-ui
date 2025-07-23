import { TaskStatus, type Task } from "../types/task";
import { TaskDisplay } from "./TaskDisplay";
import "./taskItems.css";

interface TaskItemsProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}
export const TaskItems = ({ tasks, onEdit, onDelete }: TaskItemsProps) => {
  const completedTasks = tasks.filter(
    (task: Task) => task.status === TaskStatus.Completed
  );
  const inProgressTasks = tasks.filter(
    (task: Task) => task.status === TaskStatus.InProgress
  );
  const pendingTasks = tasks.filter(
    (task: Task) => task.status === TaskStatus.Pending
  );
  return (
    <div className="task-columns">
      <div className="task-column">
        <h2>Pending Tasks</h2>
        {pendingTasks.map((task) => (
          <TaskDisplay
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <div className="task-column">
        <h2>In progress Tasks</h2>
        {inProgressTasks.map((task) => (
          <TaskDisplay
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <div className="task-column">
        <h2>Completed Tasks</h2>
        {completedTasks.map((task) => (
          <TaskDisplay
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
