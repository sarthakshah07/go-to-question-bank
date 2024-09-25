import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUser, removeUser, setUser } from "@/commonServices/token.services";
import { continueWithGoogleAction, loginByEmailAction, signUpAction } from "./middleware";

const initialState = {
  loading: false,
  currentUser:null,
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
  },
});

export const { signOutAction ,getUserDetails } = authSlice.actions;

export const authSelector = (state) => state.Auth;

export default authSlice.reducer;