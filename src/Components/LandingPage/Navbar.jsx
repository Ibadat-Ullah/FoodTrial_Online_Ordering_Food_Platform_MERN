function Navbar() {
  return (
    <nav className="sticky top-0 z-40 grid grid-cols-3 items-center bg-white px-6 py-4 shadow-sm">
      <a href="#home" className="text-xl font-bold text-orange-600">
        FoodTrial
      </a>

      <div className="flex items-center justify-center gap-6">
        <a href="#home" className="text-gray-700 hover:text-orange-600">
          Home
        </a>
        <a href="#menu" className="text-gray-700 hover:text-orange-600">
          Menu
        </a>
        <a href="#about" className="text-gray-700 hover:text-orange-600">
          About
        </a>
      </div>

      <a
        href="#login"
        className="justify-self-end rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
      >
        Login
      </a>
    </nav>
  );
}

export default Navbar;
