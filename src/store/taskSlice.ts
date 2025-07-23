import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import type { Task } from '../types/task';

interface TaskState {
  tasks: Task[];
  loading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
};

export const getTasks = createAsyncThunk('tasks/get', fetchTasks);
export const addTask = createAsyncThunk('tasks/add', createTask);
export const editTask = createAsyncThunk('tasks/edit', updateTask);
export const removeTask = createAsyncThunk('tasks/remove', deleteTask);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(t => t.id !== action.meta.arg);
      });
  },
});

export default taskSlice.reducer;