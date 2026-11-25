import { Route, Routes } from "react-router-dom";
import LoginView from "../views/LoginView";
import RegistrationView from "../views/RegistrationView";
import AdminView from "../views/AdminView";
import LandingView from "../views/LandingView";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegistrationView />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminView />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<LandingView />} />
    </Routes>
  );
}

export default AppRoutes;
