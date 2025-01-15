import { Calendar } from "react-big-calendar";
import { Navbar } from "../../components/Navbar";
import { Layout } from "../Layout";
import { CalendarLocalizer } from "../../helpers/CalendarLocalizer";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { EventBox } from "../../components/EventBox";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useUiStore, useCalendarStore } from "../../hooks";
import { Modal } from "../../components/Modal";
import { startOfDay, isBefore } from "date-fns";
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';

export const ClientPage = () => {
  // obteniendo datos del estado ui por medio del custom hook
  const { isDateModalOpen, handletoggleModal } = useUiStore();
  // obteniendo datos del estado calendar por medio del custom hook
  const { events, handleSetActiveEvent } = useCalendarStore();

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
      username: "",
      phone: "",
      address: "",
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
      <Modal open={isDateModalOpen} titleModal="schedule service" />
      <button className="fixed right-4 bottom-4 text-white p-2 w-fit h-fit grid place-content-center rounded-full bg-slate-500 hover:scale-105 hover:bg-slate-600 active:scale-95 group">
        <ExclamationCircleIcon className="h-6 w-6 group-hover:stroke-slate-100" />
      </button>
    </Layout>
  );
};
