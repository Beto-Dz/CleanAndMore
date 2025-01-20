import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [],
    activeEvent: null,
    availableHours: [],
  },
  reducers: {
    setActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    setAvailableHours: (state, { payload }) => {
      state.availableHours = payload;
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
    onLoadEvents: (state, { payload = [] }) => {
      state.events = payload;
    },
  },
});

export const { setActiveEvent, setAvailableHours, onAddEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } =
  calendarSlice.actions;
