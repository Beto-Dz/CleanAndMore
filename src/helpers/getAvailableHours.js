export const getAvailableHours = (date, events) => {
  // Filtrar eventos para la fecha seleccionada
  const sameDayEvents = events.filter((event) => {
    return (
      event.start.getFullYear() === date.getFullYear() &&
      event.start.getMonth() === date.getMonth() &&
      event.start.getDate() === date.getDate()
    );
  });

  // Crear un array con las horas ocupadas (horas completas)
  const occupiedIntervals = sameDayEvents.map((event) => ({
    start: event.start.getHours(),
    end: event.end.getHours(),
  }));

  // Rango de horas del día (0 - 23)
  const allHours = Array.from({ length: 24 }, (_, i) => i);

  // Calcular horas disponibles, asegurando que no se solapen con los intervalos ocupados
  // Si la fecha es el día de hoy, no permitir horas pasadas
  const currentHour = new Date().getHours();
  const availableHours = allHours.filter((hour) => {
    const isPastHour =
      date.toDateString() === new Date().toDateString() && hour < currentHour;
    return (
      !occupiedIntervals.some(
        (interval) => hour >= interval.start && hour < interval.end
      ) && !isPastHour
    );
  });

  return availableHours;
};
