import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./tasksSlice";
import { loadState, saveState } from "../utils/localStorage";
import { categoriesReducer, defaultCategory } from "./categoriesSlice";

const localStorageState = loadState("todo-redux");

export const store = configureStore({
  reducer: { tasks: tasksReducer, categories: categoriesReducer },
  preloadedState: localStorageState,
});

store.dispatch(defaultCategory());

store.subscribe(() => saveState("todo-redux", store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
