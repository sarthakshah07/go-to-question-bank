import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUser, removeUser, setUser } from "@/commonServices/token.services";
import {
  addCategoriesAction,
  deleteCategoriesAction,
  getCategoriesAction,
  loginByEmailAction,
  updateCategoriesAction,
} from "./middleware";

const initialState = {
  loading: false,
  categories: [],
};

const categoriesSlice = createSlice({
  name: "Categories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategoriesAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = payload;
      })
      .addCase(getCategoriesAction.rejected, (state) => {
        state.loading = false;
        // Handle rejection or error states if needed
      })
      .addCase(addCategoriesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategoriesAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = [
          ...state.categories,
          {
            ...payload?.data,
          },
        ];
      })
      .addCase(addCategoriesAction.rejected, (state) => {
        state.loading = false;
        // Handle rejection or error states if needed
      })
      .addCase(updateCategoriesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategoriesAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = state.categories.map((category) => {
          if (category._id === payload.data?.categoryId || category.categoryId === payload.data?.categoryId) {
            return { ...payload.data };
          }
          return category;
        });
      })
      .addCase(updateCategoriesAction.rejected, (state) => {
        state.loading = false;
        // Handle rejection or error states if needed
      })
      .addCase(deleteCategoriesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategoriesAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("deleteCategoriesAction.fulfilled", payload, state.categories.filter((category) => category._id !== payload.data || category.categoryId !== payload.data));
        state.categories = state.categories.filter((category) => category.categoryId !== payload.data);
      })
      .addCase(deleteCategoriesAction.rejected, (state) => {
        state.loading = false;
        // Handle rejection or error states if needed
      })
  },
});

export const categoriesSelector = (state) => state.Categories;

export default categoriesSlice.reducer;
