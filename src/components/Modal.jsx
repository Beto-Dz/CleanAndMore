import { useSelector } from "react-redux";
import { useUiStore } from "../hooks/useUiStore";
import { useForm } from "../hooks/useForm";
import { getAvailableHours } from "../helpers/getAvailableHours";
import {patterns} from "../utilitys/patterns.js"

export const Modal = ({ open, titleModal }) => {
  if (open === false) return null;

  // obteniendo el estado del toggle
  const { handletoggleModal } = useUiStore();

  // obteniendo el evento activo
  const { events, activeEvent } = useSelector((state) => state.calendar);

  // Obtener horarios disponibles para la fecha seleccionada
  const availableHours = getAvailableHours(new Date(activeEvent.start), events);

  // estado para formulario
  const { title, start, end, username, phone, address, startHour, endHour, comments, handleOnInputChange, formObject } = useForm({...activeEvent});

  // funcion de ayuda para ocultas / mostrar modal
  const handleToggle = (event) => {
    // si se hizo click sobre el div, cierra el modal
    if (event.target === event.currentTarget) {
      handletoggleModal();
    }
  };


  const handleOnSubmit = (e) =>{
    e.preventDefault();
    console.log(formObject)
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full grid place-content-center bg-black bg-opacity-80 z-10"
      onClick={handleToggle}>
      <dialog
        className="static flex flex-col items-stretch gap-2 p-4 rounded-lg bg-white min-w-80 sm:min-w-96 md:w-[500px]"
        open={open}>
        <header>
          <h2 className="text-2xl font-bold text-center text-slate-800">
            {titleModal}
          </h2>
        </header>
        <form id="form-event" className="flex flex-col gap-2" onSubmit={handleOnSubmit}>
          <label htmlFor="title" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500">
            Title
          </label>
          <input type="text" name="title" id="title" value={title} onChange={handleOnInputChange} placeholder="What you need?" autoFocus minLength={5} pattern={patterns.onlyLetters.html} required className="p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500 invalid:bg-red-300" />
          <fieldset className="flex flex-col gap-2">
            <input type="text" disabled value={activeEvent.formattedDate} className="text-center bg-white disabled:text-slate-500 font-semibold" />
            <legend className="text-center text-xs text-slate-700">Date and time of service</legend>
            <section className="flex gap-2 *:flex-1">
              <section className="flex flex-col gap-1">
                <label htmlFor="startHour" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500">
                  Start hour
                </label>
                <select name="startHour" id="startHour" value={startHour} onChange={handleOnInputChange} required className="p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500">
                  {availableHours.map((hour) => (
                    <option key={hour} value={hour}>
                      {`${hour}:00 hrs`}
                    </option>
                  ))}
                </select>
              </section>
              <section className="flex flex-col gap-1">
                <label htmlFor="endHour" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500">
                  End hour
                </label>
                <select name="endHour" id="endHour" value={endHour} onChange={handleOnInputChange} required className="p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500" >
                  {availableHours.map((hour) => {
                    if (hour > startHour) {
                      return (
                        <option key={hour} value={hour}>
                          {`${hour}:00 hrs`}
                        </option>
                      );
                    }
                  })}
                </select>
              </section>
            </section>
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <legend className="text-center text-xs text-slate-700">General data</legend>
            <label htmlFor="username" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500">
              Name
            </label>
            <input type="text" name="username" id="username" value={username} onChange={handleOnInputChange} minLength={3} pattern={patterns.onlyLetters.html} required placeholder="What's your name?" className="p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500 invalid:bg-red-300"
            />
            <label htmlFor="phone" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500">
              Phone number
            </label>
            <input type="tel" name="phone" id="phone" value={phone} onChange={handleOnInputChange} minLength={6} pattern={patterns.onlyNumbers.html} required placeholder="###" className="p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500 invalid:bg-red-300"/>
            <label htmlFor="address" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500">
              Address
            </label>
            <textarea name="address" id="address" value={address} onChange={handleOnInputChange} minLength={10} required placeholder="Where is the service?" className="p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500 invalid:bg-red-300">
            </textarea>
          </fieldset>
          <label htmlFor="" className="font-semibold text-slate-800">
            Comments
          </label>
          <textarea name="comments" id="comments" value={comments} onChange={handleOnInputChange} placeholder="Any special instruction?" className="p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500">
          </textarea>
        </form>
        <footer className="flex justify-center gap-2">
          <button className="bg-red-500 text-white px-2 py-1 rounded-lg hover:scale-105 active:scale-95" onClick={handletoggleModal}>
            Cancel
          </button>
          <button form="form-event" type="submit" className="bg-sky-500 text-white px-2 py-1 rounded-lg hover:scale-105 active:scale-95">
            Aceptar
          </button>
        </footer>
      </dialog>
    </div>
  );
};
