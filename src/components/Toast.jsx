import { useState } from "react";

export const Toast = ({ type, time = 2000, children }) => {
  const [show, setShow] = useState(false);

  // funcion de ayuda para mostrar modal
  const showToast = () => {
    setShow(true);

    setTimeout(() => {
      setShow(false);
    }, time);
  };

  return (
    <div
      className={`fixed bottom-2 left-0 right-0 mx-auto w-fit p-2 rounded-md ${
        show ? "visible" : "invisible"
      } ${type === "error" ? "bg-red-400" : "bg-sky-300"}`}
      onClick={showToast}
    >
      {children}
    </div>
  );
};
