import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  continueWithGoogleAsync,
  getUsersListAsync,
  loginByEmailAsync,
  otpVerifyAsync,
  resendOtpAsync,
  signUpAsync,
  updateUserStatusAsync,
} from "./services";

export const loginByEmailAction = createAsyncThunk(
  "/loginByEmailAction",
  async (request, { dispatch, rejectWithValue }) => {
    try {
      const response = await loginByEmailAsync(request);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
    }
  }
);

export const continueWithGoogleAction = createAsyncThunk(
  "/continueWithGoogleAction",
  async (request, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      const response = await continueWithGoogleAsync(request);
      // dispatch(hideLoading());
      return response;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      // dispatch(hideLoading());
    }
  }
);



export const signUpAction = createAsyncThunk(
  "/signUpAction",
  async (request, { dispatch, rejectWithValue }) => {
    try {
      // dispatch(showLoading());
      const response = await signUpAsync(request);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      // dispatch(hideLoading());
    }
  }
);

export const getUsersListAction = createAsyncThunk(
  "/getUsersListAction",
  async (request, { dispatch, rejectWithValue }) => {
    try {
      // dispatch(showLoading());
      const response = await getUsersListAsync(request);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      // dispatch(hideLoading());
    }
  }
);


export const updateUserStatusAction = createAsyncThunk(
  "/updateUserStatusAction",
  async (request, { dispatch, rejectWithValue }) => {
    try {
      // dispatch(showLoading());
      const response = await updateUserStatusAsync(request);
      console.log("response", response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      // dispatch(hideLoading()); 
    }
  });
