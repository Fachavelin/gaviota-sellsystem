import { createSlice } from '@reduxjs/toolkit';

export const clientSlice = createSlice({
  name: 'client',
  initialState: {
    status: 'checking', // '
    client: {},
    errorMessage: undefined,
  },
  reducers: {
    onChecking: (state) => {
      state.status = 'checking';
      state.client = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.client = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.client = {};
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  clientSlice.actions;
