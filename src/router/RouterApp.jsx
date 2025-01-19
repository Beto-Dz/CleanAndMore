import { Navigate, Route, Routes } from "react-router-dom";
import { ClientPage } from "../pages/client/ClientPage";
import { AuthPage } from "../pages/auth/AuthPage";
import { Welcome } from "../pages/Welcome";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { useAuthStore } from "../hooks/useAuthStore";
import { useEffect } from "react";

export const RouterApp = () => {
  const { status, checkAuthToken } = useAuthStore();

  // cuando se carga el router
  useEffect(() => {
    // checkea el token
    checkAuthToken();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />)
      {status === "authenticated" ? (
        <>
          <Route path="/app" element={<ClientPage />} />)
          <Route path="/*" element={<Navigate to="/app" />} />)
        </>
      ) : (
        <>
          <Route path="/auth/" element={<AuthPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/*" element={<Navigate to="/auth/" />} />)
        </>
      )}
    </Routes>
  );
};
