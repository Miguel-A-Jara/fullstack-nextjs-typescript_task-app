import { createSlice } from "@reduxjs/toolkit";

export type AuthTypes = {
  user : string | null;
  token: string | null;
};

const initialState: AuthTypes = {
  user : null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    authUser: (state, action) => {
      console.log(state)
    }
  }
});

export const {
  authUser
} = authSlice.actions;

export default authSlice.reducer;