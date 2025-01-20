import { useDispatch, useSelector } from "react-redux";
import { setActiveEvent, onAddEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store/calendar/calendarSlice";
import backendAPI from "../api/backendAPI";
import { convertDateToISO } from "../helpers/convertDateToISO";

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
  const handleAddEvent = async(event = {}) => {

    try {
      const { data } = await backendAPI.post('/events/new', event)
      console.log(data)
    } catch (error) {
      console.log(error)
    }

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

  // funcion de ayuda para obtener todos los eventos de la base de datos
  const startLoadingEvents = async () => {
    try {
      // peticion al endpoint de obtencion de eventos 
      const { data } = await backendAPI.get('/events/');
      // parseando las fechas de inicio y fin de los eventos a fechas de react big calendar
      const eventsParsed = convertDateToISO(data.eventos)
      console.log(eventsParsed)
      // despachando la accion de carga del evento del estado
      dispatch(onLoadEvents(eventsParsed))
    } catch (error) {
      console.log(error)
    }
  }

  return {
    events,
    handleSetActiveEvent,
    handleAddEvent,
    handleUpdateEvent,
    handleDeleteEvent,
    startLoadingEvents
  };
};
