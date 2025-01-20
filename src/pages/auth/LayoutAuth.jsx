import { useEffect } from "react";
import { useAuthStore } from "../../hooks";
import toast from "react-simple-toasts";

export const LayoutAuth = ({ children }) => {
  // obteniendo el error de mensaje
  const { errorMessage } = useAuthStore();

  useEffect(() => {
    if (errorMessage && errorMessage.length > 0) {
      toast(errorMessage, {
        duration: 2000,
        className: "text-white bg-red-400 rounded-full py-2 px-4",
      });
    }
  }, [errorMessage]);

  return (
    <section className="w-full h-dvh grid place-content-center bg-primary">
      <div className="px-4 py-2 min-w-80 sm:min-w-96 md:w-[400px] rounded-lg bg-white animate-blurred-fade-in animate-duration-fast ">
        {children}
      </div>
    </section>
  );
};
