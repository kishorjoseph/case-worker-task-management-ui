import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getTasks, addTask, editTask, removeTask } from "../store/taskSlice";
import { type Task } from "../types/task";
import { TaskForm } from "../components/TaskForm";
import "./addTaskForm.css";

import { TaskItems } from "../components/TaskItems";
export const TaskScreen = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading } = useAppSelector((state) => state.tasks);
  const [mode, setMode] = useState<"list" | "add" | "edit">("list");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleAdd = (task: Task) => {
    const newTask = {
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
    };
    dispatch(addTask(newTask));
    setMode("list");
  };

  const handleEdit = (task: Task) => {
    const updatedTask = { ...task, title: task.title + " (updated)" };
    dispatch(editTask(updatedTask));
    setMode("list");
  };

  const handleDelete = (id: string) => {
    dispatch(removeTask(id));
  };

  return (
    <main>
      <h1 className="title">Case worker task management system</h1>
      {mode === "add" && (
        <section className="add-form">
          <TaskForm
            mode="add"
            onSubmit={handleAdd}
            onCancel={() => setMode("list")}
          />
        </section>
      )}

      {mode === "edit" && editingTask && (
        <TaskForm
          mode="edit"
          task={editingTask}
          onSubmit={handleEdit}
          onCancel={() => setMode("list")}
        />
      )}

      {mode === "list" && (
        <section className="display-details">
          <div className="task-header">
          <p>Case worker have the ability to add new tasks to the system with Pending, In progress or Completed status</p>
          <button className="add-task-btn" onClick={() => setMode("add")}>
          <span className="add-icon">＋</span>
            Add New Task</button>
          </div>
          <TaskItems
              tasks={tasks}
              onEdit={(task) => {
                setEditingTask(task);
                setMode("edit");
              }}
              onDelete={handleDelete}
            />
    
        </section>
      )}
    </main>
  );
};
