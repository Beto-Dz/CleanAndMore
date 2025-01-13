import { useDispatch, useSelector } from "react-redux";
import { setActiveEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  // funcion para despachar acciones al store
  const dispatch = useDispatch();

  // obteniendo los atributos del estado calendar
  const { events } = useSelector((state) => state.calendar);

  // funcion de ayuda para setear un evento al estado
  const handleSetActiveEvent = (evetCalendar) => {
    dispatch(setActiveEvent(evetCalendar));
  };

  return {
    events,
    handleSetActiveEvent,
  };
};
