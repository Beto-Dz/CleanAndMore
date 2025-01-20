import { format } from "date-fns";

export const EventBox = ({ event }) => {
  // Formatear la fecha de inicio y fin del evento
  const hourStart = format(event.start, "HH:mm");
  const hourEnd = format(event.end, "HH:mm");
  return (
    <div className="flex flex-col items-center text-xs">
      <span className="font-semibold">{`${hourStart}hrs - ${hourEnd}hrs`}</span>
      <span>{`${event.title} - ${event.user.name}`}</span>
    </div>
  );
};
