import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../types";

const initialState: { tasks: Task[] } = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    toggle: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.complete = !task.complete;
    },
    update: (state, action: PayloadAction<Task>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.description = action.payload.description;
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      }
    },
  },
});

export const { add, toggle, update, remove } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
