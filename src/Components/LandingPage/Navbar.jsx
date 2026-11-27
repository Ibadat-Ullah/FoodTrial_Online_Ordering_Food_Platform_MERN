import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useCart } from "../../context/useCart";

function Navbar() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { count } = useCart();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <nav className="sticky top-0 z-40 bg-white px-4 py-3 shadow-sm sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <Link to="/" onClick={scrollToTop} className="text-xl font-bold text-orange-600">
          FoodTrial
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-3 text-sm sm:gap-5">
          <Link to="/" onClick={scrollToTop} className="text-gray-700 hover:text-orange-600">
            Home
          </Link>
          <Link to="/#menu" className="text-gray-700 hover:text-orange-600">
            Menu
          </Link>
          <Link to="/#about" className="hidden text-gray-700 hover:text-orange-600 sm:inline">
            About
          </Link>
          {user?.role !== "admin" && (
            <Link to="/cart" className="font-medium text-orange-700 hover:text-orange-800">
              Cart ({count})
            </Link>
          )}
          {user?.role === "admin" ? (
            <Link to="/admin" className="text-gray-700 hover:text-orange-600">
              Dashboard
            </Link>
          ) : user ? (
            <Link to="/orders" className="text-gray-700 hover:text-orange-600">
              My orders
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-orange-600">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-orange-600 px-3 py-2 text-white hover:bg-orange-700"
              >
                Register
              </Link>
            </>
          )}
          {user && (
            <button
              type="button"
              onClick={() => {
                signOut();
                navigate("/");
              }}
              className="text-gray-700 hover:text-orange-600"
            >
              Sign out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
