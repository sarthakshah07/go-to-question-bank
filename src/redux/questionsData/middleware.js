import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCategoriesAsync,
  continueWithGoogleAsync,
  deleteQuestionAsync,
  getCategoriesAsync,
  getQuestionsByCategoryIdAsync,
  loginByEmailAsync,
  otpVerifyAsync,
  resendOtpAsync,
  signUpAsync,
  updateCategoriesAsync,
  updateQuestionAsync,
} from "./services";

export const getQuestionsByCategoryIdAction = createAsyncThunk(
  "/getQuestionsByCategoryIdAction",
  async (request, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      const response = await getQuestionsByCategoryIdAsync(request);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(hideLoading());
    }
  }
);
export const addQuestionAction = createAsyncThunk(
  "/addQuestionAction",
  async (request, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      const response = await addQuestionAsync(request);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(hideLoading());
    }
  }
);
export const updateQuestionAction = createAsyncThunk(
  "/updateQuestionAction",
  async (request, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      const response = await updateQuestionAsync(request);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(hideLoading());
    }
  }
);
export const deleteQuestionAction = createAsyncThunk(
  "/deleteQuestionAction",
  async (request, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      const response = await deleteQuestionAsync(request);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(hideLoading());
    }
  }
);
