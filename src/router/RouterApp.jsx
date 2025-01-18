import { Route, Routes } from "react-router-dom";
import { ClientPage } from "../pages/client/ClientPage";
import { AuthPage } from "../pages/auth/AuthPage";
import { Welcome } from "../pages/Welcome";
import { RegisterPage } from "../pages/auth/RegisterPage";

export const RouterApp = () => {
  const isAuthenticated = false;

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />)
      <Route path="/app" element={<ClientPage />} />)
      <Route path="/auth/" element={<AuthPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
    </Routes>
  );
};
