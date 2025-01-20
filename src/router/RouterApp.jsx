import { Navigate, Route, Routes } from "react-router-dom";
import { AppPage, AuthPage, Welcome, RegisterPage, } from "../pages";
import { useAuthStore } from "../hooks";
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
          <Route path="/app" element={<AppPage />} />)
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
