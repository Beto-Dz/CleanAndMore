import { Route, Routes } from "react-router-dom";
import { AdminPage } from "../pages/administrator/AdminPage";
import { ClientPage } from "../pages/client/ClientPage";

export const RouterApp = () => {
  const isAuthenticated = false;

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path="/admin/" element={<AdminPage />} />
      ) : (
        <Route path="/" element={<ClientPage />} />
      )}
    </Routes>
  );
};
