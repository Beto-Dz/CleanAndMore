import { createSlice } from "@reduxjs/toolkit";

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
    onAddEvent: (state, { payload }) => {
      state.events.push(payload);
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state, { payload }) => {
      state.events = state.events.filter((event) => event.id !== payload.id);
    },
  },
});

export const { setActiveEvent, onAddEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;
