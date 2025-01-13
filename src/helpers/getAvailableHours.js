export const getAvailableHours = (date, events) => {
  // Filtrar eventos para la fecha seleccionada
  const sameDayEvents = events.filter((event) => {
    return (
      event.start.getFullYear() === date.getFullYear() &&
      event.start.getMonth() === date.getMonth() &&
      event.start.getDate() === date.getDate()
    );
  });

  // Crear un array con las horas ocupadas
  const occupiedIntervals = sameDayEvents.map((event) => ({
    start: event.start.getHours(),
    end: event.end.getHours(),
  }));

  // Rango de horas del día (0 - 24)
  const allHours = Array.from({ length: 24 }, (_, i) => i);

  // Calcular horas disponibles
  const availableHours = allHours.filter((hour) => {
    return !occupiedIntervals.some(
      (interval) => hour >= interval.start && hour < interval.end
    );
  });

  return availableHours;
};
6