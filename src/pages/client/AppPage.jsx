import { Calendar } from "react-big-calendar";
import { Navbar, EventBox, Modal } from "../../components";
import { Layout } from "../";
import { CalendarLocalizer } from "../../helpers";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";
import { startOfDay, isBefore } from "date-fns";
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import { useEffect } from "react";

export const AppPage = () => {
  // obteniendo datos del estado ui por medio del custom hook
  const { isDateModalOpen, handletoggleModal } = useUiStore();
  // obteniendo datos del estado calendar por medio del custom hook
  const { events, handleSetActiveEvent, startLoadingEvents } = useCalendarStore();
  //obteniendo los datos del usuario actual de la sesion
  const { user } = useAuthStore()

  // funcion de ayuda para obtener el slot seleccionado
  const onSelectSlot = ({ slots, start }) => {
    // si se han seleccionado más de un slot
    if (slots.length > 1) return;

    // si el slot correponde a una fecha anterior a la actual
    if(isBefore(start, startOfDay(new Date()))) {
      return toast('Events cannot be scheduled for earlier dates', {duration: 3000, className: 'text-white bg-red-400 rounded-full py-2 px-4'});
    };
    
    // definiendo un nuevo evento
    const event = {
      title: "",
      start: startOfDay(start),
      end: startOfDay(start),
      user,
      formattedDate: start.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      startHour: null,
      endHour: null,
      comments: "",
    };

    // despachando al estado un nuevo evento activo
    handleSetActiveEvent(event);

    // Abrir el modal
    handletoggleModal();
  };

  // funcion de ayuda para obtener el evento seleccionado
  const onSelectEvent = (event) => {
    handleSetActiveEvent(event);
  };

  const onDoubleClick = (event) => {
    handleSetActiveEvent(event);
    handletoggleModal();
  };

  // funcion de ayuda para obtener los estilos de los eventos
  const eventStyles = () => {
    return {
      style: {
        backgroundColor: '#000',
        color: "white",
      },
    };
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <Layout>
      <Navbar />
      <section className="overflow-scroll p-1">
        <Calendar
          localizer={CalendarLocalizer}
          events={events}
          selectable
          onSelectSlot={onSelectSlot}
          onSelectEvent={onSelectEvent}
          onDoubleClickEvent={onDoubleClick}
          eventPropGetter={eventStyles}
          components={{
            event: EventBox,
          }}
        />
      </section>
      {
        isDateModalOpen && (<Modal open={isDateModalOpen} titleModal="schedule service" />)
      }
    </Layout>
  );
};
