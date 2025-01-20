import axios from "axios";
import { getEnvVariables } from "../helpers";

// obteniendo base url de las variables de entorno
const { VITE_BASE_URL } = getEnvVariables();

// creacion de instancia de axios con la configuracion
// de base url
const backendAPI = axios.create({
  baseURL: VITE_BASE_URL,
});

// interceptando las peticiones para adjuntarle el token
backendAPI.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": window.localStorage.getItem("token"),
  };

  return config;
});

export default backendAPI;
