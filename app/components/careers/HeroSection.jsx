import React from 'react';

export default function HeroSection() {
  return (
    <section
      className="relative w-full h-[90vh] min-h-[550px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('/careers.jpg')`, // Make sure the path is correct
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 text-center">
        <h2
          className="text-[3rem] sm:text-6xl md:text-7xl font-extrabold leading-[1.05] mb-2 
          bg-clip-text text-transparent bg-gradient-to-r from-[#1EB8F3] via-[#00AEEF] to-[#0059FF]"
        >
          Careers
        </h2>
        <h1 className="text-[3rem] sm:text-6xl md:text-7xl font-extrabold leading-tight text-white mb-6">
          Join <span className="text-[#1EB8F3]">Talent With Us</span>
        </h1>

       <p className="max-w-4xl mx-auto text-lg sm:text-2xl md:text-2xl font-semibold text-white leading-relaxed md:leading-loose mt-4">
  We’re on a mission to build the next generation of digital innovation.  
  At <span className="text-[#00AEEF] font-bold">Talent With Us</span>, you’ll collaborate with brilliant minds,  
  create impactful solutions, and grow in a culture that values creativity,  
  learning, and excellence.
</p>


        {/* <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#openings"
            className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-[#00AEEF] to-[#0059FF] rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Explore Open Roles
          </a>
          <a
            href="#culture"
            className="px-8 py-3 text-lg font-semibold text-[#00AEEF] bg-white/90 backdrop-blur-md border border-[#00AEEF] rounded-full hover:bg-[#00AEEF] hover:text-white transition-all duration-300"
          >
            Our Culture
          </a>
        </div> */}
      </div>
    </section>
  );
}
