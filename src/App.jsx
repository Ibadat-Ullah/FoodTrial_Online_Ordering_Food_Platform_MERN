import { useEffect, useState } from "react";
import Login from "./Components/Authentication/Login";
import Registration from "./Components/Authentication/Registration";
import AdminMain from "./Components/AdminDashboard/adminMain";
import LandingPage from "./Components/LandingPage";

const pages = { login: Login, register: Registration, admin: AdminMain };

function App() {
  const [page, setPage] = useState(() => window.location.hash.slice(1));

  useEffect(() => {
    const updatePage = () => setPage(window.location.hash.slice(1));
    window.addEventListener("hashchange", updatePage);
    return () => window.removeEventListener("hashchange", updatePage);
  }, []);

  const Page = pages[page] || LandingPage;
  return <Page />;
}

export default App;
