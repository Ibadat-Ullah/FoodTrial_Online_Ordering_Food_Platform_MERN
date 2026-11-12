import { Route, Routes } from "react-router-dom";
import Login from "./Components/Authentication/Login";
import Registration from "./Components/Authentication/Registration";
import AdminMain from "./Components/AdminDashboard/adminMain";
import LandingPage from "./Components/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/admin" element={<AdminMain />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
