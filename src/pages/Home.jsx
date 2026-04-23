import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen text-gray-800 overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/src/assets/Image_Hero_BG_2.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
        {/* Light dreamy overlay */}
        <div className="absolute inset-0 bg-white opacity-30"></div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-28 gap-8">

        {/* Badge */}
        <div className="animate-fadeInUp">
          <span className="glass-card px-6 py-2 text-xs font-bold tracking-widest uppercase text-amber-600 inline-block">
            A Dream Within A Hackathon
          </span>
        </div>

        {/* Main Title */}
        <div className="flex flex-col items-center gap-3 animate-fadeInUp-delay-1">
          <h1 className="text-7xl md:text-9xl font-black tracking-widest text-gray-800 uppercase animate-glow"
            style={{ textShadow: '0 0 30px rgba(212,175,55,0.3)' }}>
            INCEPTION
          </h1>
          <div className="flex items-center gap-4">
            <div className="h-px w-24 bg-amber-400 opacity-70"></div>
            <span className="text-amber-500 text-2xl font-bold tracking-widest">2 0 2 6</span>
            <div className="h-px w-24 bg-amber-400 opacity-70"></div>
          </div>
        </div>

        {/* Tagline */}
        <p className="animate-fadeInUp-delay-2 text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed tracking-wide">
          You mustn't be afraid to dream a little bigger. Build, innovate,
          and compete — one idea can change everything.
        </p>

        {/* Event Detail Cards */}
        <div className="animate-fadeInUp-delay-3 flex flex-wrap justify-center gap-6 mt-2">
          <div className="glass-card px-10 py-6 text-center animate-float" style={{ animationDelay: '0s' }}>
            <p className="text-xs text-amber-500 uppercase tracking-widest mb-2 font-bold">Date</p>
            <p className="text-xl font-black text-gray-800">Coming Soon</p>
          </div>
          <div className="glass-card px-10 py-6 text-center animate-float" style={{ animationDelay: '0.5s' }}>
            <p className="text-xs text-amber-500 uppercase tracking-widest mb-2 font-bold">Duration</p>
            <p className="text-xl font-black text-gray-800">20 Hours</p>
          </div>
          <div className="glass-card px-10 py-6 text-center animate-float" style={{ animationDelay: '1s' }}>
            <p className="text-xs text-amber-500 uppercase tracking-widest mb-2 font-bold">Venue</p>
            <p className="text-xl font-black text-gray-800">Our College</p>
          </div>
          <div className="glass-card px-10 py-6 text-center animate-float" style={{ animationDelay: '1.5s' }}>
            <p className="text-xs text-amber-500 uppercase tracking-widest mb-2 font-bold">Registration</p>
            <p className="text-xl font-black text-gray-800">Rs. 400 / Team</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="animate-fadeInUp-delay-4 flex flex-wrap gap-4 mt-2 justify-center">
          <a
            href="#register"
            className="bg-amber-400 hover:bg-amber-500 text-white font-black px-10 py-3 rounded-full uppercase tracking-widest text-sm transition duration-300 shadow-lg hover:shadow-amber-200 hover:shadow-xl hover:-translate-y-1"
          >
            Enter The Dream
          </a>
          <a
            href="#about"
            className="glass-card text-gray-700 hover:text-amber-600 font-bold px-10 py-3 rounded-full uppercase tracking-widest text-sm transition duration-300 hover:-translate-y-1"
          >
            Learn More
          </a>
        </div>

        {/* Bottom Quote */}
        <p className="animate-fadeInUp-delay-4 text-gray-400 text-xs tracking-widest uppercase mt-4 italic">
          "An idea is like a virus. Resilient. Highly contagious." — Dom Cobb
        </p>

      </section>
    </div>
  );
}

export default Home;
