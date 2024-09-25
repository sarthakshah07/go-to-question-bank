import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUser, removeUser, setUser } from "@/commonServices/token.services";
import {
  addCategoriesAction,
  deleteCategoriesAction,
  getCategoriesAction,
  getQuestionsByCategoryIdAction,
  loginByEmailAction,
  updateCategoriesAction,
} from "./middleware";

const initialState = {
  loading: false,
  allQuestionData: null,

};

const questionsSlice = createSlice({
  name: "QuestionData",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionsByCategoryIdAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQuestionsByCategoryIdAction.fulfilled, (state,{payload}) => {
        state.loading = false;
        state.allQuestionData = payload.data
      })
      .addCase(getQuestionsByCategoryIdAction.rejected, (state) => {
        state.loading = false;
        // Handle rejection or error states if needed
      })
      .addCase(addCategoriesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategoriesAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = {
          ...state.categories,
          ...payload,
        };
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
        state.categories = {
          ...state.categories,
          ...payload,
        };
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
        state.categories = {
          ...state.categories,
          ...payload,
        };
      })
      .addCase(deleteCategoriesAction.rejected, (state) => {
        state.loading = false;
        // Handle rejection or error states if needed
      })
  },
});


export const questionsSelector = (state) => state.QuestionData;

export default questionsSlice.reducer;
