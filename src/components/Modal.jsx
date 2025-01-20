import { useUiStore, useForm, useCalendarStore } from "../hooks";
import { patterns } from "../utilitys/patterns.js";
import { useMemo, useState } from "react";
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import { useAuthStore } from "../hooks/useAuthStore.js";
import { useEffect } from "react";

const formValidations = {
  title: (value) => ( value.length > 5 && patterns.onlyLetters.js.test(value) ),
  startHour: (value) => (!!value),
  endHour: (value) => (!!value),
  address: (value) => value.length >= 10,
}

export const Modal = ({ open, titleModal }) => {
  // obteniendo el estado del toggle
  const { handletoggleModal } = useUiStore();

  // obteniendo el usuario de la sesion actual
  const { user } = useAuthStore();
  
  // obteniendo las funciones del custom hook para manejar el estado
  const { activeEvent, availableHours, handleSetActiveEvent, handleGetAvailableHours, handleAddEvent, handleUpdateEvent, handleDeleteEvent } = useCalendarStore();

  // verificando si es el evento del usuario de la sesion actual
  const itsSameUser = ( activeEvent.user._id || activeEvent.user.uuid ) === user.uuid;

  // si el evento activo tiene un id, significa que es actualizacion por lo que ya viene con address, si no, entonces seteo address con la direccion del usuario
  // memorizamos para evitar estar evaluando esto siempre
  const activeEventWithAddress = useMemo(() => { 
    return activeEvent.id ? activeEvent : {...activeEvent, address: activeEvent.user.address};
  }, [activeEvent]);

  // evaluando el numero a mostrar
  const phoneShow = activeEvent.user.phone;
  // evaluando el numero a mostrar
  const emailShow = activeEvent.user.email;

  // estado para formulario
  const { title, start, end, startHour, endHour, address, comments, titleValid, addressValid, handleOnInputChange, formObject, isValidForm } = 
    useForm(activeEventWithAddress, formValidations);

  // cuando cambie el evento activo, se hace una petición al endpoint que obtiene las horas, enviandole la fecha del evento
  useEffect(() => {
    handleGetAvailableHours({date: start});
  }, [activeEvent])
  
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
    return toast("Event eliminated", {duration: 2000, className: 'text-white bg-red-400 rounded-full py-2 px-4'});
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

    let toastMessage = 'Event successfully added'

    if (activeEvent.id){
      handleUpdateEvent(formObject);
      toastMessage = 'Event successfully updated';
    } else{
      // creando el event
      const event = {
        ...formObject,
        start: startDate,
        end: endDate,
      };
      // ejecucion de funcion que agrega el evento
      handleAddEvent(event);
    }
    
    // cerrar el modal
    handletoggleModal();
    return toast(toastMessage, {duration: 2000, className: 'text-white bg-sky-400 rounded-full py-2 px-4'});
  };
  
  

  return (
    <div
      className="fixed top-0 left-0 w-full h-full grid place-content-center bg-black bg-opacity-80 z-10"
      onClick={handleToggle}>
      <dialog className="static flex flex-col items-stretch gap-2 p-4 rounded-lg bg-white min-w-80 sm:min-w-96 md:w-[500px]" open={open}>
        <header>
          <h2 className="text-2xl font-bold text-center text-slate-800"> {titleModal} </h2>
        </header>
        <form id="form-event" className="flex flex-col gap-2" onSubmit={handleOnSubmit}>

          <div className="flex flex-col gap-px">
            <label htmlFor="title" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500" >
              Title
            </label>
            <input type="text" name="title" id="title" value={title} onChange={handleOnInputChange} placeholder="What you need?" autoFocus minLength={6} pattern={patterns.onlyLetters.html} required disabled={!itsSameUser}
              className={`p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500 ${(!titleValid && formSubmitted) ? 'invalid:ring-red-500' : ''} peer/title`} 
            />
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
                <select name="startHour" id="startHour" value={startHour || "null"} onChange={handleOnInputChange} required disabled={!itsSameUser}
                  className="p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500"
                >
                  <option value="null">-</option>
                  {
                    !!startHour && (<option key={startHour} value={startHour}>{`${startHour}:00 hrs`}</option>)
                  }
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
                <select name="endHour" id="endHour" value={endHour || "null"} onChange={handleOnInputChange} required disabled={!itsSameUser}
                  className="p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500" 
                >
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

          <div className="flex flex-col items-center justify-between gap-2 font-semibold text-secondary">
              <a href={`tel:${phoneShow}`}>Phone Number:{phoneShow}</a>
              <a href={`mailto:${emailShow}?subject=Cleaning and more: service&body=Hi! `}>Email: {emailShow}</a>
          </div>
          

          <div className="flex flex-col gap-px">
            <label htmlFor="address" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500">
              Address
            </label>
            <textarea name="address" id="address" value={address} onChange={handleOnInputChange} minLength={10} required placeholder="Where is the service?" disabled={!itsSameUser}
              className={`p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500 ${!addressValid && formSubmitted ? "invalid:ring-red-500" : ""} peer/address`}
            ></textarea>
            <span className={`text-slate-500 text-xs ${!addressValid && formSubmitted? "peer-invalid/address:text-red-500" : ""}`}>
              Write your address, detailed and longer than 10 characters.
            </span>
          </div>

          <div className="flex flex-col gap-px">
            <label htmlFor="" className="font-semibold text-slate-800">
              Comments
            </label>
            <textarea name="comments" id="comments" value={comments} onChange={handleOnInputChange} placeholder="Any special instruction?" disabled={!itsSameUser}
              className="p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500"
            >
            </textarea>
          </div>
        </form>

        <footer className="flex justify-center gap-2">
          <button className="bg-red-500 text-white px-2 py-1 rounded-lg hover:scale-105 active:scale-95" onClick={handleToggle}>
            Cancel
          </button>
          {activeEvent.id
            && 
            (<button className="bg-red-500 text-white px-2 py-1 rounded-lg hover:scale-105 active:scale-95" onClick={handleDrop}>
                Drop
             </button>
            )
          }
          {itsSameUser
            &&
            (<button form="form-event" type="submit" className="bg-sky-500 text-white px-2 py-1 rounded-lg hover:scale-105 active:scale-95 font-semibold disabled:bg-sky-100">
              Accept
             </button>
            )
          }
        </footer>
      </dialog>
    </div>
  );
};
