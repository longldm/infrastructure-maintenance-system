import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import themeSlice from '../components/theme/themeSlice';
import authSlice from '../components/auth/authSlice';


export const store = configureStore({
  reducer: {
    theme: themeSlice,
    auth: authSlice,
  },
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;