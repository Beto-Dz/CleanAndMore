import { useMemo, useState } from "react";
import { useForm, useAuthStore } from "../../hooks";
import { patterns } from "../../utilitys/patterns";
import { Link } from "react-router-dom";
import { LayoutAuth } from "./LayoutAuth";

const formValidations = {
  name: (value) => value.length >= 8 && patterns.onlyLetters.js.test(value),
  email: (value) => ( value.length >= 10 && patterns.email.js.test(value) ),
  password: (value) => value.length >= 5,
  phone: (value) => value.length >= 6 && patterns.onlyNumbers.js.test(value),
  address: (value) => value.length >= 10,
};

export const RegisterPage = () => {

  // custom hook para interactuar con el estado
  const { handleStartRegister } = useAuthStore()

  // estado para formulario
  const { name, email, password, phone, address, nameValid, emailValid, passwordValid, phoneValid, addressValid, handleOnInputChange, formObject, isValidForm } 
    = useForm({ name: "", email: "", password: "", phone: "", address: "" },formValidations);

  // estado para manejar cuando se hace submit y mostrar errores del formulario
  const [formSubmitted, setFormSubmitted] = useState(false);

  // evaluando si se deshabilitara el botón de login
  const isChecking = useMemo(() => status === 'checking', [status])

  // funcion de ayuda para el envio del formulario
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!isValidForm) return;

    handleStartRegister(formObject);
  };

  return (
    <LayoutAuth>
      <h1 className="text-2xl font-bold text-center text-secondary mb-2">Register page</h1>
      <form className="flex flex-col gap-1" onSubmit={handleOnSubmit}>
        <div className="flex flex-col gap-px">
          <label htmlFor="name" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500">
            Name
          </label>
          <input type="text" name="name" id="name" value={name} onChange={handleOnInputChange} minLength={8} autoComplete="on" pattern={patterns.onlyLetters.html} required placeholder="What's your name?"
            className={`p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500 ${!nameValid && formSubmitted ? "invalid:ring-red-500" : ""} peer/name`}
          />
          <span className={`text-slate-500 text-xs ${!nameValid && formSubmitted ? "peer-invalid/name:text-red-500": ""}`}>
            Write your name. (only letters and more than 8 characters)
          </span>
        </div>
        <div className="flex flex-col gap-px">
          <label htmlFor="phone" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500">
            Phone number
          </label>
          <input type="tel" name="phone" id="phone" value={phone} onChange={handleOnInputChange} minLength={6} autoComplete="on" pattern={patterns.onlyNumbers.html} required placeholder="######"
            className={`p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500 ${!phoneValid && formSubmitted ? "invalid:ring-red-500" : ""} peer/phone`}
          />
          <span className={`text-slate-500 text-xs ${ !phoneValid && formSubmitted ? "peer-invalid/phone:text-red-500" : ""}`}>
            Write your phone number. (only numbers and more than 6 characters)
          </span>
        </div>
        <div className="flex flex-col gap-px">
          <label htmlFor="email" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500">
            Email
          </label>
          <input type="email" name="email" id="email" value={email} onChange={handleOnInputChange} minLength={10} autoComplete="on" required pattern={patterns.email.html} placeholder="example@00.com"
            className={`p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500 peer/email ${!emailValid && formSubmitted ? "invalid:ring-red-400" : ""}`}
          />
          <span className={`text-slate-500 text-xs ${!emailValid && formSubmitted ? "peer-invalid/email:text-red-500" : ""} `}>
            Type your email. (more than 9 characters)
          </span>
        </div>
        <div className="flex flex-col gap-px">
          <label htmlFor="password" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500">
            Password
          </label>
          <input type="password" name="password" id="password" value={password} onChange={handleOnInputChange} minLength={5} autoComplete="on" required placeholder="*******"
            className={`p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500 peer/password ${!passwordValid && formSubmitted ? "invalid:ring-red-400" : ""}`}
          />
          <span className={`text-slate-500 text-xs ${!passwordValid && formSubmitted ? "peer-invalid/password:text-red-500" : "" } `}>
            Type your password. (more than 4 characters)
          </span>
        </div>
        <div className="flex flex-col gap-px">
          <label htmlFor="address" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500">
            Address
          </label>
          <textarea name="address" id="address" value={address} onChange={handleOnInputChange} minLength={10} required placeholder="Where is the service?"
            className={`p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500 ${!addressValid && formSubmitted ? "invalid:ring-red-500" : ""} peer/address`}
          ></textarea>
          <span className={`text-slate-500 text-xs ${!addressValid && formSubmitted? "peer-invalid/address:text-red-500" : ""}`}>
            Write your address, detailed and longer than 10 characters.
          </span>
        </div>
        <Link to="/auth/" className="text-sm text-sky-500">
          Already have an account, register here.
        </Link>
        <button type="submit" disabled={isChecking} className="bg-secondary text-white px-2 py-1 w-fit self-center rounded-lg hover:scale-105 active:scale-95 font-semibold disabled:bg-sky-100" >
          Register
        </button>
      </form>
    </LayoutAuth>
  );
};
