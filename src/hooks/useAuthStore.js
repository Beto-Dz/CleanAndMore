import { useDispatch, useSelector } from "react-redux";
import { onClearErrorMessage, onLogin, onLogout, setCheckingStatus } from "../store/auth/authSlice";
import { onCalendarLogout } from "../store/calendar/calendarSlice"
import backendAPI from "../api/backendAPI";

export const useAuthStore = () => {
  // obteniendo el estado de auth
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  // obteniendo funcion dispatch para despachar acciones
  const dispatch = useDispatch();

  // funcion de ayuda para el login
  const handleStartLogin = async ({ email, password }) => {
    // establece el estado en checking
    dispatch(setCheckingStatus());

    try {
      const { data } = await backendAPI.post("/auth/", { email, password });
      // guardamos el token en el localStorage
      window.localStorage.setItem("token", data.token);
      delete data.token;
      delete data.ok;
      delete data.msg;
      dispatch(onLogin(data));
    } catch (error) {
      dispatch(onLogout(error?.response?.data?.msg || "Error"));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 1000);
    }
  };

  // funcion de ayuda para registrar
  const handleStartRegister = async ({ name, email, password, phone, address }) => {
    // establece el estado en checking
    dispatch(setCheckingStatus());

    try {
      const { data } = await backendAPI.post("/auth/new", { name, email, password, phone, address });
      // guardamos el token en el localStorage
      window.localStorage.setItem("token", data.token);
      delete data.token;
      delete data.ok;
      delete data.msg;
      dispatch(onLogin(data));
    } catch (error) {
      dispatch(onLogout(error?.response?.data?.msg || "No se ha podido crear el usuario"));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 1000);
    }
  };

  // funcion para checkear el token, si no hay uno en el localStorage
  // cierra sesion pero obtiene otro
  const checkAuthToken = async () => {
    const token = window.localStorage.getItem("token");

    // si no hay un token, disparamos el cierre de sesión
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await backendAPI.get("auth/renew");
      window.localStorage.setItem("token", data.token);
      delete data.token;
      delete data.ok;
      delete data.msg;
      dispatch(onLogin(data));
    } catch (error) {
      window.localStorage.clear();
      dispatch(onLogout());
    }
  };

  // funcion de cierre de sesion
  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout())
    dispatch(onCalendarLogout())
  }

  return { status, user, errorMessage, handleStartLogin, handleStartRegister, checkAuthToken, startLogout };
};
