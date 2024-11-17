import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ThemeMode = "dark" | "light" | "auto";

interface ThemeState {
  activeTheme: ThemeMode;
}

const initialState: ThemeState = {
  activeTheme: "auto",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setActiveTheme(state, action: PayloadAction<ThemeMode>) {
      state.activeTheme = action.payload;
    },
  },
});

export const { setActiveTheme } = themeSlice.actions;
export default themeSlice.reducer;