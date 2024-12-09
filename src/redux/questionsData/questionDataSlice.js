import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUser, removeUser, setUser } from "@/commonServices/token.services";
import {
  getQuestionsByCategoryIdAction,
  updateQuestionAction,
} from "./middleware";

const initialState = {
  loading: false,
  allQuestionData: [],

};

const questionsDataSlice = createSlice({
  name: "QuestionData",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionsByCategoryIdAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQuestionsByCategoryIdAction.fulfilled, (state,{payload}) => {
        console.log("payload.....",payload.data)
        state.loading = false;
        state.allQuestionData = payload.data
      })
      .addCase(getQuestionsByCategoryIdAction.rejected, (state) => {
        state.loading = false;
        // Handle rejection or error states if needed
      })
      .addCase(updateQuestionAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQuestionAction.fulfilled, (state,{payload}) => {
        state.loading = false;
        state.allQuestionData = state.allQuestionData.map((question) => {
          console.log("question,",question,payload)
          if (question._id === payload._id) {
            return action.payload;
          }
          return question;
        })
      })
      .addCase(updateQuestionAction.rejected, (state) => {
        state.loading = false;
        // Handle rejection or error states if needed
      });
  },
});


export const questionsSelector = (state) => state.QuestionData;

export default questionsDataSlice.reducer;
