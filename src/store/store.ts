import { configureStore } from '@reduxjs/toolkit';
import { moviesApi } from './movies/moviesAPISlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['user/setUser'],
        ignoredPaths: ['user.currentUser'],
      },
    }).concat(moviesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
