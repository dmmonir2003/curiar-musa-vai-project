import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  user: {},
  userType: null,
  isAuthenticated: false,
  accessToken: null,
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.userType = action.payload.userType;
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
    },
    clearUser: (state) => {
      state.user = {};
      state.isAuthenticated = false;
      state.accessToken = null;
      state.userType = null;
    },
    resetUser: () => initialState,
  },
});

// Export the actions and reducer
export const { setUser, clearUser , resetUser } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectAccessToken = (state) => state.user.accessToken;
export const selectUserType = (state) => state.user.userType;

// Export the reducer
export default userSlice.reducer;
