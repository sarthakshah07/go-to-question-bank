import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCategoriesAsync,
  continueWithGoogleAsync,
  deleteCategoriesAsync,
  getCategoriesAsync,
  loginByEmailAsync,
  otpVerifyAsync,
  resendOtpAsync,
  signUpAsync,
  updateCategoriesAsync,
} from "./services";

export const getCategoriesAction = createAsyncThunk(
  "/getCategoriesAction",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log("getCategoriesAction");
      const response = await getCategoriesAsync();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
    }
  }
);

export const addCategoriesAction = createAsyncThunk(
  "/addCategoriesAction",
  async (request, { dispatch, rejectWithValue }) => {
    try {
      const response = await addCategoriesAsync(request);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
    }
  }
);

export const updateCategoriesAction = createAsyncThunk(
  "/updateCategoriesAction",
  async (request, { dispatch, rejectWithValue }) => {
    try {
      const response = await updateCategoriesAsync(request);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
    }
  }
)

export const deleteCategoriesAction = createAsyncThunk(
  "/deleteCategoriesAction",
  async ({ id }, { dispatch, rejectWithValue }) => {
    try {
      const response = await deleteCategoriesAsync({ id });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
    }
  }
)