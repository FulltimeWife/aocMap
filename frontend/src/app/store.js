import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import markerReducer from "../features/mapMarkers/markerSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    marker: markerReducer
  },
});
