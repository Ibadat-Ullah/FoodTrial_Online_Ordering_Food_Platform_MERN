import { Route, Routes } from "react-router-dom";
import LoginView from "../views/LoginView";
import RegistrationView from "../views/RegistrationView";
import AdminView from "../views/AdminView";
import LandingView from "../views/LandingView";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegistrationView />} />
      <Route path="/admin" element={<AdminView />} />
      <Route path="*" element={<LandingView />} />
    </Routes>
  );
}

export default AppRoutes;
