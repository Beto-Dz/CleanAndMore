import { Route, Routes } from "react-router-dom";
import { ClientPage } from "../pages/client/ClientPage";
import { AuthPage } from "../pages/auth/AuthPage";

export const RouterApp = () => {
  const isAuthenticated = false;

  return (
    <Routes>
      <Route path="/admin/" element={<AuthPage />} />
      <Route path="/" element={<ClientPage />} />)
    </Routes>
  );
};
