import { createSlice } from '@reduxjs/toolkit';

export const clientSlice = createSlice({
  name: 'client',
  initialState: {
    loading: false, // '
    client: {},
    msg: undefined,
  },
  reducers: {
    onLoading: (state) => {
      state.loading = true;
      state.client = {};
      state.msg = undefined;
    },
    onFinished: (state, { payload }) => {
      state.loading = false;
      state.client = {};
      state.msg = payload;
    },
    onAdd: (state, { payload }) => {
      state.loading = false;
      state.client = payload;
      state.msg = undefined;
    },
    clearMsg: (state) => {
      state.msg = undefined;
    },
  },
});

export const { onLoading, onFinished, clearMsg, onAdd } = clientSlice.actions;
