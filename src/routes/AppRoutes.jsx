import { Route, Routes } from "react-router-dom";
import LoginView from "../views/LoginView";
import RegistrationView from "../views/RegistrationView";
import AdminView from "../views/AdminView";
import LandingView from "../views/LandingView";
import CartView from "../views/CartView";
import OrderHistoryView from "../views/OrderHistoryView";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegistrationView />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute role="customer">
            <CartView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute role="customer">
            <OrderHistoryView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminView />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<LandingView />} />
    </Routes>
  );
}

export default AppRoutes;
