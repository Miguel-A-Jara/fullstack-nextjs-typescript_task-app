import { createSlice } from "@reduxjs/toolkit";

type User = {
  email   : string;
  password: string;
  username: string;
}

export type AuthTypes = {
  user : User | null;
  token: string | null;
};

type AuthPayload = {
  type   : string;
  payload: AuthTypes;
}

const initialState: AuthTypes = {
  user : null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    authenticateUser: (state, action: AuthPayload) => {

      if(!action.payload.token || !action.payload.user) return;

      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },

    removeAuthentication: (state) => {

      state.user = null;
      state.token = null;
    }
  }
});

export const {
  authenticateUser,
  removeAuthentication
} = authSlice.actions;

export default authSlice.reducer;