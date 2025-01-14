import { useDispatch, useSelector } from "react-redux";
import { setActiveEvent, onAddEvent, onUpdateEvent, onDeleteEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  // funcion para despachar acciones al store
  const dispatch = useDispatch();

  // obteniendo los atributos del estado calendar
  const { events } = useSelector((state) => state.calendar);

  // funcion de ayuda para setear un evento al estado
  const handleSetActiveEvent = (evetCalendar) => {
    dispatch(setActiveEvent(evetCalendar));
  };

  // funcion de ayuda para agregar evento al store
  const handleAddEvent = (event) => {
    dispatch(onAddEvent(event));
  };

  // funcion de ayuda para actualizar evento al store
  const handleUpdateEvent = (event) => {
    dispatch(onUpdateEvent(event));
  };

  // funcion de ayuda para eliminar evento al store
  const handleDeleteEvent = (event) => {
    dispatch(onDeleteEvent(event));
  };

  return {
    events,
    handleSetActiveEvent,
    handleAddEvent,
    handleUpdateEvent,
    handleDeleteEvent
  };
};
