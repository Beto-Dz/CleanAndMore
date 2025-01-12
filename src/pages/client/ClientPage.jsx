import { Calendar } from "react-big-calendar";
import { Navbar } from "../../components/Navbar";
import { Layout } from "../Layout";
import { CalendarLocalizer } from "../../helpers/CalendarLocalizer";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { EventBox } from "../../components/EventBox";
import { AddEventModal } from "../../components/AddEventModal";
import { useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";


const colors = {
  black: "#000",
  white: "#fff",
  red: "#f00",
  green: "#0f0",
  blue: "#00f",
}

const events = [
  {
    title: "Reunión de equipo", // Título del evento
    start: new Date(2025, 0, 15, 10, 0), // Fecha de inicio (15 de enero, 10:00 AM)
    end: new Date(2025, 0, 15, 12, 0), // Fecha de fin (15 de enero, 12:00 PM)
    user: {
      name: "Juan Pérez",
      email: "juaka@gmail.com",
      phone: "1234567890",
    },
    bgColor: colors.black,
  },
];

export const ClientPage = () => {
  // estado para controlar si el modal está abierto o cerrado
  const [openModal, setOpenModal] = useState(false);

  // funcion de ayuda para obtener el slot seleccionado
  const onSelectSlot = (slotInfo) => {
    const { slots } = slotInfo;

    // Imprimir el primer slot seleccionado
    console.log(slots[0]);

    // Abrir el modal
    setOpenModal(true);
  };

  // funcion de ayuda para obtener el evento seleccionado
  const onSelectEvent = (event) => {
    console.log(event);
  };

  // funcion de ayuda para obtener los estilos de los eventos
  const eventStyles = (event) => {
    return {
      style: {
        backgroundColor: event.bgColor,
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
          min={new Date(2025, 0, 15, 8, 0)} // Hora de inicio
          max={new Date(2025, 0, 15, 20, 0)} // Hora de fin
          selectable
          onSelectSlot={onSelectSlot}
          onSelectEvent={onSelectEvent}
          eventPropGetter={eventStyles}
          components={{
            event: EventBox,
          }}
        />
      </section>
      <AddEventModal open={openModal} />
      <button className="fixed right-4 bottom-4 text-white p-2 w-fit h-fit grid place-content-center rounded-full bg-slate-500 hover:scale-105 hover:bg-slate-600 active:scale-95 group">
        <ExclamationCircleIcon className="h-6 w-6 group-hover:stroke-slate-100" />
      </button>
    </Layout>
  );
};
