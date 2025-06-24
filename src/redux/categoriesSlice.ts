import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "../types";

const initialState: { categories: Category[] } = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    update: (state, action: PayloadAction<Category>) => {
      const category = state.categories.find(
        (category) => category.id === action.payload.id,
      );
      if (category) {
        category.name = action.payload.name;
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      const category = state.categories.find(
        (task) => task.id === action.payload,
      );
      if (category) {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload,
        );
      }
    },
  },
});

export const { add, update, remove } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
