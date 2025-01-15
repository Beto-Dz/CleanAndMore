import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { patterns } from "../../utilitys/patterns";

const formValidations = {
  email: (value) => ( value.lenght > 5 && patterns.email.js.test(value) ),
  password: (value) => ( value.lenght > 5 )
}

export const AuthPage = () => {

  // estado para formulario
  const { email, password, emailValid, passwordValid, handleOnInputChange, formObject, isValidForm } = useForm({email: '', password: ''}, formValidations);

  // estado para manejar cuando se hace submit y mostrar errores del formulario
  const [formSubmitted, setFormSubmitted] = useState(false)
  
  // funcion de ayuda para el envio del formulario
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if(!isValidForm) return;

    console.log(formObject)
  };

  return (
    <section className="w-full h-dvh grid place-content-center bg-cyan-300">
      <div className="px-4 py-2 min-w-80 sm:min-w-96 md:w-[400px] rounded-lg bg-white">
        <form className="flex flex-col gap-1" onSubmit={handleOnSubmit}>
          <div className="flex flex-col gap-px">
            <label htmlFor="email" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500" >
              Email
            </label>
            <input type="email" name="email" id="email" value={email} onChange={handleOnInputChange} minLength={5} required pattern={patterns.email.html} placeholder="example@00.com" 
              className={`p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500 peer/email ${(!emailValid && formSubmitted) ? 'invalid:ring-red-400' : ''}`} />
            <span className={`text-slate-500 text-xs ${(!emailValid && formSubmitted) ? 'peer-invalid/email:text-red-500' : ''} `}>
              Write a valid email
            </span>
          </div>
          <div className="flex flex-col gap-px">
            <label htmlFor="password" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500" >
              Password
            </label>
            <input type="password" name="password" id="password" value={password} onChange={handleOnInputChange} minLength={5} required placeholder="*******" 
              className={`p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500 peer/password ${(!passwordValid && formSubmitted) ? 'invalid:ring-red-400' : ''}`} />
            <span className={`text-slate-500 text-xs ${(!passwordValid && formSubmitted) ? 'peer-invalid/password:text-red-500' : ''} `}>
              Write your password
            </span>
          </div>
          <button type="submit" className="bg-sky-500 text-white px-2 py-1 w-fit self-center rounded-lg hover:scale-105 active:scale-95 font-semibold disabled:bg-sky-100">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};
