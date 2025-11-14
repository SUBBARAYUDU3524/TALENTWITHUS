import React from 'react';

export default function HeroSection({ onScrollTo }) {
  return (
    <section
      className="relative h-[90vh] min-h-[550px] w-full bg-cover bg-center flex items-center justify-center overflow-hidden "
      style={{ backgroundImage: "url('/about.jpg')" }}
      aria-label="About Us Hero"
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
        <h1 className="text-center font-black leading-tight mb-6 text-5xl md:text-7xl tracking-tight">
          <span className="block text-[2.8rem] sm:text-5xl md:text-6xl lg:text-7xl mb-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1EB8F3] via-[#00AEEF] to-[#0059FF] drop-shadow-lg">
            About Us
          </span>
          <span className="block text-white text-[2.5rem] sm:text-[3.5rem] md:text-6xl lg:text-7xl mb-2 font-black drop-shadow-lg">
            Talent With Us
          </span>
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-white max-w-3xl mb-12 leading-relaxed text-center shadow-lg">
          Empowering businesses and individuals with intelligent, scalable, and user-centric digital solutions — from custom web &amp; mobile apps to project support, documentation, and next-gen digital experiences.
        </p>
      </div>
    </section>
  );
}
