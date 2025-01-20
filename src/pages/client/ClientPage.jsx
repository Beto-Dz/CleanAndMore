import { Calendar } from "react-big-calendar";
import { Navbar } from "../../components/Navbar";
import { Layout } from "../Layout";
import { CalendarLocalizer } from "../../helpers/CalendarLocalizer";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { EventBox } from "../../components/EventBox";
import { useUiStore, useCalendarStore } from "../../hooks";
import { Modal } from "../../components/Modal";
import { startOfDay, isBefore } from "date-fns";
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import { useEffect } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";

export const ClientPage = () => {
  // obteniendo datos del estado ui por medio del custom hook
  const { isDateModalOpen, handletoggleModal } = useUiStore();
  // obteniendo datos del estado calendar por medio del custom hook
  const { events, handleSetActiveEvent, startLoadingEvents } = useCalendarStore();
  //obteniendo los datos del usuario actual de la sesion
  const { user } = useAuthStore()

  // funcion de ayuda para obtener el slot seleccionado
  const onSelectSlot = ({ slots, start }) => {
    if (slots.length > 1) return;

    if(isBefore(start, startOfDay(new Date()))) {
      return toast('Events cannot be scheduled for earlier dates', {duration: 3000, className: 'text-white bg-red-400 rounded-full py-2 px-4'});
    };
    
    const event = {
      title: "",
      start: startOfDay(start),
      end: startOfDay(start),
      user,
      formattedDate: start.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      startHour: null,
      endHour: null,
      comments: "",
    };

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
      <section className="overflow-scroll">
        <Calendar
          localizer={CalendarLocalizer}
          className="bg-zinc-50"
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
