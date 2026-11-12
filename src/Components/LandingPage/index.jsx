import Carousel from "./Carousel";
import Footer from "./Footer";
import MenuSection from "./MenuSection";
import Navbar from "./Navbar";

function LandingPage() {
  return (
    <>
      <Navbar />
      <Carousel />
      <MenuSection />
      <Footer />
      <a
        href="#menu"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-orange-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
      >
        Order Now
      </a>
    </>
  );
}

export default LandingPage;
