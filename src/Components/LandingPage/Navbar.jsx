import { Link } from "react-router-dom";

function Navbar() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <nav className="sticky top-0 z-40 grid grid-cols-3 items-center bg-white px-6 py-4 shadow-sm">
      <Link to="/" onClick={scrollToTop} className="text-xl font-bold text-orange-600">
        FoodTrial
      </Link>

      <div className="flex items-center justify-center gap-6">
        <Link to="/" onClick={scrollToTop} className="text-gray-700 hover:text-orange-600">
          Home
        </Link>
        <Link to="/#menu" className="text-gray-700 hover:text-orange-600">
          Menu
        </Link>
        <Link to="/#about" className="text-gray-700 hover:text-orange-600">
          About
        </Link>
      </div>

      <Link
        to="/login"
        className="justify-self-end rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
      >
        Login
      </Link>
    </nav>
  );
}

export default Navbar;
