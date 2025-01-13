import { createSlice } from "@reduxjs/toolkit";

const colors = {
  black: "#000",
  white: "#fff",
  red: "#f00",
  green: "#0f0",
  blue: "#00f",
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [],
    activeEvent: null,
  },
  reducers: {
    setActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
  },
});

export const { setActiveEvent } = calendarSlice.actions;
