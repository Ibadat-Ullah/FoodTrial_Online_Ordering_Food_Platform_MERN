import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Carousel from "../Components/LandingPage/Carousel";
import Footer from "../Components/LandingPage/Footer";
import MenuSection from "../Components/LandingPage/MenuSection";
import Navbar from "../Components/LandingPage/Navbar";

function LandingPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({
      behavior: "smooth",
    });
  }, [hash]);

  return (
    <>
      <Navbar />
      <Carousel />
      <MenuSection />
      <Footer />
      <Link
        to="/#menu"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-orange-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
      >
        Order Now
      </Link>
    </>
  );
}

export default LandingPage;
