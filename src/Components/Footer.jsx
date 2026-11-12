function Footer() {
  return (
    <footer className="outline outline-2 outline-[#ff4500] bg-gradient-to-br from-orange-600 via-orange-700 to-red-700 px-6 py-12 text-orange-50 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href="/" className="text-2xl font-bold text-white">
            FoodTrial
          </a>
          <p className="mt-4 max-w-sm leading-6 text-orange-100">
            Find your next favorite meal and enjoy a simple way to order food.
          </p>
        </div>

        <div>
          <h2 id="about" className="font-semibold text-white">
            About Us
          </h2>
          <p className="mt-4 leading-6 text-orange-100">
            FoodTrial brings tasty food options together to make discovering
            and ordering your next meal easy.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-white">Explore</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a href="/" className="transition-colors hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#menu" className="transition-colors hover:text-white">
                Menu
              </a>
            </li>
            <li>
              <a href="/login" className="transition-colors hover:text-white">
                Login
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-white">Contact</h2>
          <p className="mt-4 text-orange-100">Questions or feedback? Email us:</p>
          <a
            href="mailto:ibadatkhanafridi7@gmail.co"
            className="mt-2 inline-block break-all transition-colors hover:text-white"
          >
            ibadatkhanafridi7@gmail.co
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-orange-300/40 pt-6 text-sm text-orange-100">
        <p>© {new Date().getFullYear()} FoodTrial. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
