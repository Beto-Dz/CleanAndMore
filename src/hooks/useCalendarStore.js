import { useDispatch, useSelector } from "react-redux";
import { setActiveEvent, setAvailableHours, onAddEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store";
import backendAPI from "../api/backendAPI";
import { convertDateToISO } from "../helpers";

export const useCalendarStore = () => {
  // funcion para despachar acciones al store
  const dispatch = useDispatch();

  // obteniendo los atributos del estado calendar
  const { events, activeEvent, availableHours } = useSelector((state) => state.calendar);

  // funcion de ayuda para setear un evento al estado
  const handleSetActiveEvent = (evetCalendar) => {
    dispatch(setActiveEvent(evetCalendar));
  };

  // funcion de ayuda para obtener las horas disponibles
  const handleGetAvailableHours = async(date = {}) => {
    try {
      const { data } = await backendAPI.post('/events/getAvailableHours', date);
      dispatch(setAvailableHours(data.availableHours))
    } catch (error) {
      console.log(error)
    }
  }

  // funcion de ayuda para agregar evento al store
  const handleAddEvent = async(event = {}) => {
    try {
      // envio a la base de datos
      const { data } = await backendAPI.post('/events/new', event)
      const resultEvent = {...event, id: data.event.id };
      // Enviar el evento al estado global el evento
      dispatch(onAddEvent(resultEvent));
      handleSetActiveEvent(resultEvent);
    } catch (error) {
      console.log(error)
    }
  };

  // funcion de ayuda para actualizar evento al store
  const handleUpdateEvent = async(event) => {
    try {
      const { data } = await backendAPI.put(`/events/${event.id}`, event);
      dispatch(onUpdateEvent(event));
      handleSetActiveEvent(event);
    } catch (error) {
      console.log(error)
    }
  };

  // funcion de ayuda para eliminar evento al store
  const handleDeleteEvent = async (event) => {
    dispatch(onDeleteEvent(event));

    try {
      await backendAPI.delete(`/events/${event.id}`)
      handleSetActiveEvent(null)
    } catch (error) {
      console.log(error)
    }
  };

  // funcion de ayuda para obtener todos los eventos de la base de datos
  const startLoadingEvents = async () => {
    try {
      // peticion al endpoint de obtencion de eventos 
      const { data } = await backendAPI.get('/events/');
      // parseando las fechas de inicio y fin de los eventos a fechas de react big calendar
      const eventsParsed = convertDateToISO(data.eventos)
      // despachando la accion de carga del evento del estado
      dispatch(onLoadEvents(eventsParsed))
    } catch (error) {
      console.log(error)
    }
  }

  return {
    events,
    activeEvent,
    availableHours,
    handleSetActiveEvent,
    handleGetAvailableHours,
    handleAddEvent,
    handleUpdateEvent,
    handleDeleteEvent,
    startLoadingEvents
  };
};
