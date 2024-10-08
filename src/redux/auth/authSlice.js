import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUser, removeUser, setUser } from "@/commonServices/token.services";
import { continueWithGoogleAction, getUsersListAction, loginByEmailAction, signUpAction, updateUserStatusAction } from "./middleware";

const initialState = {
  loading: false,
  currentUser:null,
  userList :[]
};

const authSlice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    signOutAction: (state) => {
      removeUser();
      state.currentUser = null;
    },
    getUserDetails: (state) => {
      state.currentUser = getUser();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByEmailAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginByEmailAction.fulfilled, (state ,{payload}) => {
        setUser(payload?.data);
        state.currentUser = payload?.data;
      })
      .addCase(loginByEmailAction.rejected, (state) => {
        state.loading = false;
        // Handle rejection or error states if needed
      })
      .addCase(
        continueWithGoogleAction.fulfilled,
        (state, { payload }) => {
          if (payload.status === 200 || payload.status === 201) {
            const user = payload?.data;
            if (user) {
              setUser(user);
            }
          }
          return {
            ...state,
            loading: false,
            currentUser: payload?.data,
          };
        }
      )
      .addCase(signUpAction.fulfilled, (state, { payload }) => {
        if (payload.status === 200 || payload.status === 201) {
          const user = payload?.data;
          if (user) {
            setUser(user);
          }
        }
        return {
          ...state,
          loading: false,
          currentUser: payload?.data,
        };
      })
      .addCase(getUsersListAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersListAction.rejected, (state) => {
        state.loading = false;
        // Handle rejection or error states if needed
      })
      .addCase(getUsersListAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userList = payload?.data;
      })
      .addCase(updateUserStatusAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserStatusAction.rejected, (state) => {
        state.loading = false;
        // Handle rejection or error states if needed
      })
      .addCase(updateUserStatusAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userList = [...state.userList.map((user) => {
          if (user._id === payload?.data?._id) {
            return payload?.data;
          }
          return user;
        })];
        // state.currentUser = payload?.data;
      });
  },
});

export const { signOutAction ,getUserDetails } = authSlice.actions;

export const authSelector = (state) => state.Auth;

export default authSlice.reducer;