import { configureStore } from '@reduxjs/toolkit';
import { clientSlice } from './slices/clientSlice';
import { reserveSlice } from './slices/reserveSlice';

export const store = configureStore({
  reducer: {
    client: clientSlice.reducer,
    reserve: reserveSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});
