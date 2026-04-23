function Navbar() {
  return (
    <nav className="glass-nav w-full px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-1">
        <span className="text-2xl font-extrabold tracking-widest text-gray-800">
          IN<span className="text-amber-500">CEPTION</span>
          <span className="text-amber-400 text-lg font-bold"> 26</span>
        </span>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
        <a href="#about" className="hover:text-amber-500 transition duration-300 tracking-widest uppercase text-xs">About</a>
        <a href="#timeline" className="hover:text-amber-500 transition duration-300 tracking-widest uppercase text-xs">Timeline</a>
        <a href="#prizes" className="hover:text-amber-500 transition duration-300 tracking-widest uppercase text-xs">Prizes</a>
        <a href="#faq" className="hover:text-amber-500 transition duration-300 tracking-widest uppercase text-xs">FAQ</a>
      </div>

      {/* Register Button */}
      <a
        href="#register"
        className="bg-amber-400 hover:bg-amber-500 text-white text-xs font-bold px-6 py-2 rounded-full tracking-widest uppercase transition duration-300 shadow-md hover:shadow-lg"
      >
        Register Now
      </a>
    </nav>
  );
}

export default Navbar;
