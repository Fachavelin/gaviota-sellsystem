import { createSlice } from '@reduxjs/toolkit';

export const reserveSlice = createSlice({
  name: 'reserve',
  initialState: {
    loading: false, // '
    reserve: {},
    msg: undefined,
  },
  reducers: {
    onLoading: (state) => {
      state.loading = true;
      state.reserve = {};
      state.msg = undefined;
    },
    onFinished: (state, { payload }) => {
      state.loading = false;
      state.reserve = {};
      state.msg = payload;
    },
    onEdit: (state, { payload }) => {
      state.loading = false;
      state.reserve = payload;
      state.msg = undefined;
    },
    clearMsg: (state) => {
      state.msg = undefined;
    },
  },
});

export const { onLoading, onFinished, clearMsg, onEdit } = reserveSlice.actions;
