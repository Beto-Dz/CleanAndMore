import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { calendarSlice } from "./calendar/calendarSlice";
import { authSlice } from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
    auth: authSlice.reducer,
  },
  // sedhabilitando serializacion para evitar error por id Date en consola
  middleware: (getDefaulMiddleware) =>
    getDefaulMiddleware({
      serializableCheck: false,
    }),
});
