import React from 'react';

export default function HeroSection() {
  return (
    <section
      className="relative w-full h-[90vh] min-h-[550px] flex flex-col justify-center items-center text-center overflow-hidden"
      style={{
        backgroundImage: "url('projects.jpg')", // Point to correct image location
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/70 z-0" />
      <div className="relative z-10 max-w-4xl mx-auto px-5">
        <h2 className="text-5xl sm:text-6xl md:text-6xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#1EB8F3] via-[#00AEEF] to-[#0059FF] drop-shadow-lg leading-tight">
          What We Do
        </h2>
        <h1 className="text-[2.55rem] sm:text-6xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-xl leading-tight">
          Building Visionary <span className="text-cyan-300">Digital Solutions</span>
        </h1>
        <p className="max-w-3xl mx-auto text-white text-lg md:text-2xl font-medium leading-snug mb-9">
          From custom websites to advanced apps, AI and automation—explore how we transform ideas into exceptional results for your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href="#contact"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#1EB8F3] to-[#0052CC] text-white font-bold shadow-lg hover:from-[#0052CC] hover:to-[#1EB8F3] transition"
          >
            Start Your Project
          </a>
          <a
            href="#work"
            className="px-8 py-3 rounded-full border-2 border-cyan-200 text-cyan-100 font-bold hover:bg-cyan-700 hover:text-white transition"
          >
            See Our Work
          </a>
        </div>
      </div>
    </section>
  );
}
