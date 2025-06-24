import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "../types";

export const CATEGORY_GENERAL: Category = {
  id: crypto.randomUUID(),
  name: "General",
  color: "#8ec5ff",
};

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
    defaultCategory: (state) => {
      const hasGeneralCategory = state.categories.some(
        (category) =>
          category.id === CATEGORY_GENERAL.id &&
          category.name === CATEGORY_GENERAL.name &&
          category.color === CATEGORY_GENERAL.color,
      );

      if (!hasGeneralCategory) state.categories.unshift(CATEGORY_GENERAL);
    },
  },
});

export const { add, update, remove, defaultCategory } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
