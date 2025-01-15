import { useSelector } from "react-redux";
import { useUiStore } from "../hooks/useUiStore";
import { useForm } from "../hooks/useForm";
import { getAvailableHours } from "../helpers/getAvailableHours";
import { patterns } from "../utilitys/patterns.js";
import { useMemo, useState } from "react";
import { useCalendarStore } from "../hooks/useCalendarStore.js";

const formValidations = {
  title: (value) => ( value.length > 5 && patterns.onlyLetters.js.test(value) ),
  username: (value) => ( value.length > 3 && patterns.onlyLetters.js.test(value) ),
  phone: (value) => ( value.length > 6 && patterns.onlyNumbers.js.test(value) ),
  address: (value) => ( value.length > 10 ),
  startHour: (value) => (!!value),
  endHour: (value) => (!!value)
}

export const Modal = ({ open, titleModal }) => {
  if (open === false) return null;

  // obteniendo el estado del toggle
  const { handletoggleModal } = useUiStore();

  // obteniendo las funciones del custom hook para manejar el estado
  const { handleSetActiveEvent, handleAddEvent, handleUpdateEvent, handleDeleteEvent } = useCalendarStore();

  // obteniendo el evento activo
  const { events, activeEvent } = useSelector((state) => state.calendar);

  // Obtener horarios disponibles para la fecha seleccionada
  const availableHours = useMemo(() => getAvailableHours(new Date(activeEvent.start), events),[activeEvent])

  // estado para formulario
  const { title, start, end, username, phone, address, startHour, endHour, comments, titleValid, usernameValid, phoneValid, addressValid, handleOnInputChange, formObject, isValidForm } = useForm(activeEvent, formValidations);
  
  // estado para manejar cuando se hace submit y mostrar errores del formulario
  const [formSubmitted, setFormSubmitted] = useState(false)

  // funcion de ayuda para ocultas / mostrar modal
  const handleToggle = (event) => {
    // si se hizo click sobre el div, cierra el modal
    if (event.target === event.currentTarget) {
      handletoggleModal();
      setFormSubmitted(false)
    }
  };

  const handleDrop = () => {
    handleDeleteEvent(activeEvent)
    handletoggleModal()
    handleSetActiveEvent(null)
  }


  // funcion de ayuda para manejar el envio del formulario
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if(!isValidForm) return;

    // Convierte las cadenas de fecha a objetos Date
    const startDate = new Date(formObject.start);
    const endDate = new Date(formObject.end);
  
    // agregando las horas a las fechas
    startDate.setHours(parseInt(formObject.startHour, 10), 0, 0, 0);
    endDate.setHours(parseInt(formObject.endHour, 10), 0, 0, 0);

    // verificando si las fechas son válidad
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error("Invalid start or end date");
      return;
    }

    if (activeEvent.id){
      handleUpdateEvent(formObject);
      // Enviar el evento al estado global
      handleSetActiveEvent(formObject);
    } else{
      // creando el event
      const event = {
        ...formObject,
        start: startDate,
        end: endDate,
        id: new Date().getTime()
      };
    
      handleAddEvent(event);
      // Enviar el evento al estado global
      handleSetActiveEvent(event);
    }
  
    // cerrar el modal
    handletoggleModal();
  };
  
  

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

          <div className="flex flex-col gap-px">
            <label htmlFor="title" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500" >
              Title
            </label>
            <input type="text" name="title" id="title" value={title} onChange={handleOnInputChange} placeholder="What you need?" autoFocus minLength={5} pattern={patterns.onlyLetters.html} required className={`p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500 ${(!titleValid && formSubmitted) ? 'invalid:ring-red-500' : ''} peer/title`} />
            <span className={`text-slate-500 text-xs ${ (!titleValid && formSubmitted) ? 'peer-invalid/title:text-red-500' : '' }`}>Only write words and with more than 5 characters</span>
          </div>

          <fieldset className="flex flex-col gap-2">
            <input type="text" disabled value={activeEvent.formattedDate} className="text-center bg-white disabled:text-slate-500 font-semibold" />
            <legend className="text-center text-xs text-slate-700">Date and time of service</legend>
            <section className="flex gap-2 *:flex-1">
              <section className="flex flex-col gap-1">
                <label htmlFor="startHour" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500">
                  Start hour
                </label>
                <select name="startHour" id="startHour" value={startHour} onChange={handleOnInputChange} required className="p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500">
                  <option value="null">-</option>
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
                  <option value="null">-</option>
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
            <legend className="text-center text-xs text-slate-700">Contact data</legend>
            <div className="flex flex-col gap-px">
              <label htmlFor="username" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500">
                Name
              </label>
              <input type="text" name="username" id="username" value={username} onChange={handleOnInputChange} minLength={3} pattern={patterns.onlyLetters.html} required placeholder="What's your name?" className={`p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500 ${(!usernameValid && formSubmitted) ? 'invalid:ring-red-500' : ''} peer/username`}/>
              <span className={`text-slate-500 text-xs ${ (!usernameValid && formSubmitted) ? 'peer-invalid/username:text-red-500' : '' }`}>Only write words and with more than 3 characters</span>
            </div>
            <div className="flex flex-col gap-px">
              <label htmlFor="phone" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500">
                Phone number
              </label>
              <input type="tel" name="phone" id="phone" value={phone} onChange={handleOnInputChange} minLength={6} pattern={patterns.onlyNumbers.html} required placeholder="######" className={`p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500 ${(!phoneValid && formSubmitted) ? 'invalid:ring-red-500' : ''} peer/phone`}/>
              <span className={`text-slate-500 text-xs ${ (!phoneValid && formSubmitted) ? 'peer-invalid/phone:text-red-500' : '' }`}>Just enter numbers</span>
            </div>
            <div className="flex flex-col gap-px">
              <label htmlFor="address" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500">
                Address
              </label>
              <textarea name="address" id="address" value={address} onChange={handleOnInputChange} minLength={10} required placeholder="Where is the service?" className={`p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500 ${(!addressValid && formSubmitted) ? 'invalid:ring-red-500' : ''} peer/address`}>
              </textarea>
              <span className={`text-slate-500 text-xs ${ (!addressValid && formSubmitted) ? 'peer-invalid/address:text-red-500' : '' }`}>Add an address longer than 10 characters</span>
            </div>
          </fieldset>

          <div className="flex flex-col gap-px">
            <label htmlFor="" className="font-semibold text-slate-800">
              Comments
            </label>
            <textarea name="comments" id="comments" value={comments} onChange={handleOnInputChange} placeholder="Any special instruction?" className="p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500">
            </textarea>
          </div>
        </form>

        <footer className="flex justify-center gap-2">
          <button className="bg-red-500 text-white px-2 py-1 rounded-lg hover:scale-105 active:scale-95" onClick={handleToggle}>
            Cancel
          </button>
          {
            activeEvent.id
            && 
            (<button className="bg-red-500 text-white px-2 py-1 rounded-lg hover:scale-105 active:scale-95" onClick={handleDrop}>
                Drop
              </button>
            )
          }
          <button form="form-event" type="submit" className="bg-sky-500 text-white px-2 py-1 rounded-lg hover:scale-105 active:scale-95 font-semibold disabled:bg-sky-100">
            Accept
          </button>
        </footer>
      </dialog>
    </div>
  );
};
