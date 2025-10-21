// 'use client';
// import React from 'react';
// import OurWorks from '../components/OurWorks';
// import WhatWeOffer from '../components/WhatWeOffer';
// import Testimonial from '../components/Testimonial';
// import hero from '../../public/assets/projects.jpg';
// import Image from 'next/image';
// import {
//   FaReact,
//   FaNodeJs,
//   FaPython,
//   FaWordpress,
//   FaSearch,
// } from 'react-icons/fa';
// import {
//   SiNextdotjs,
//   SiTailwindcss,
//   SiMongodb,
//   SiFirebase,
// } from 'react-icons/si';
// import ContactSection from '../components/ContactSection';

// const workflow = [
//   {
//     icon: '📝',
//     title: 'Requirement Gathering',
//     desc: 'We listen, analyze, and document your needs.',
//   },
//   {
//     icon: '🎨',
//     title: 'Planning & Design',
//     desc: 'Wireframes, UI/UX, and clear milestones.',
//   },
//   {
//     icon: '💻',
//     title: 'Development',
//     desc: 'Agile coding, regular updates, and transparency.',
//   },
//   {
//     icon: '🧪',
//     title: 'Testing',
//     desc: 'Manual and automated QA for a flawless experience.',
//   },
//   {
//     icon: '🚀',
//     title: 'Launch & Support',
//     desc: 'Go-live, monitor, and support post-delivery.',
//   },
// ];

// const techStack = [
//   { icon: <FaReact className="text-cyan-400" />, name: 'React' },
//   { icon: <SiNextdotjs className="text-gray-50" />, name: 'Next.js' },
//   { icon: <FaNodeJs className="text-green-500" />, name: 'Node.js' },
//   { icon: <SiTailwindcss className="text-cyan-300" />, name: 'Tailwind CSS' },
//   { icon: <SiMongodb className="text-green-400" />, name: 'MongoDB' },
//   { icon: <SiFirebase className="text-yellow-400" />, name: 'Firebase' },
//   { icon: <FaPython className="text-yellow-300" />, name: 'Python' },
//   { icon: <FaWordpress className="text-blue-400" />, name: 'WordPress' },
//   { icon: <FaSearch className="text-pink-400" />, name: 'SEO Tools' },
// ];

// export default function WhatWeDoClient() {
//   return (
//     <main className="bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] min-h-screen">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-r from-[#0a183d] via-[#202e4d] to-[#191c24] text-white py-20 px-4">
//         <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 z-10 relative">
//           <div className="flex-1 text-center md:text-left">
//             <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
//               Welcome to the <span className="text-cyan-300">Digital Lab</span>
//               <br />
//               Where <span className="text-blue-300">Ideas</span> Meet{' '}
//               <span className="text-indigo-200">Innovation</span>
//             </h1>
//             <p className="text-lg mb-8 text-cyan-100">
//               Explore our digital solutions crafted for impact — from powerful
//               web apps to SEO-optimized websites.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//               <a
//                 href="#contact"
//                 className="px-6 py-3 rounded-full bg-cyan-500 text-white font-semibold shadow hover:bg-cyan-600 transition"
//               >
//                 Start Your Project
//               </a>
//               <a
//                 href="#work"
//                 className="px-6 py-3 rounded-full border border-cyan-300 text-cyan-200 font-semibold hover:bg-cyan-800 transition"
//               >
//                 See Our Work
//               </a>
//             </div>
//           </div>
//           <div className="flex-1 flex justify-center">
//             <Image
//               src={hero}
//               alt="Digital Solutions"
//               width={520}
//               className="drop-shadow-xl max-w-full h-auto rounded-2xl border-[3px] hover:opacity-80 transition-all"
//             />
//           </div>
//         </div>

//         {/* Decorative gradient shapes */}
//         <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
//           <div className="absolute w-72 h-72 bg-cyan-400 opacity-10 rounded-full blur-3xl -top-24 -left-24"></div>
//           <div className="absolute w-96 h-96 bg-pink-400 opacity-10 rounded-full blur-3xl -bottom-24 -right-24"></div>
//         </div>
//       </section>

//       {/* What We Offer */}
//       <section
//         className="bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] py-16 px-4"
//         id="services"
//       >
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-cyan-300">
//             What We Offer
//           </h2>
//           <WhatWeOffer />
//         </div>
//       </section>

//       {/* Our Work Showcase */}
//       <section
//         className="bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] py-16 px-4"
//         id="work"
//       >
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-cyan-200">
//             We Support You Across Technologies
//           </h2>
//           <OurWorks />
//         </div>
//       </section>

//       {/* Workflow Process */}
//       <section className="bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] py-16 px-4">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-cyan-300 tracking-wide">
//             How We Work
//           </h2>
//           <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-6 relative">
//             {workflow.map((step, idx) => (
//               <div
//                 key={step.title}
//                 className="relative flex flex-col items-center text-center flex-1 min-w-[140px] sm:min-w-[180px] max-w-xs"
//               >
//                 <div className="bg-[#151a26] rounded-3xl shadow-lg border border-cyan-900 px-6 py-10 flex flex-col items-center w-full hover:shadow-cyan-400 transition-shadow duration-300">
//                   <div className="text-xs font-semibold uppercase text-cyan-400 mb-2">
//                     Step {idx + 1}
//                   </div>
//                   <div className="text-5xl sm:text-6xl mb-3 text-cyan-400">
//                     {step.icon}
//                   </div>
//                   <div className="font-bold text-cyan-200 mb-1 text-lg sm:text-xl">
//                     {step.title}
//                   </div>
//                   <div className="text-gray-400 text-sm sm:text-base">
//                     {step.desc}
//                   </div>
//                 </div>
//                 {idx < workflow.length - 1 && (
//                   <div className="hidden md:block absolute right-[-34px] top-1/2 -translate-y-1/2 z-10">
//                     <svg
//                       width="44"
//                       height="24"
//                       viewBox="0 0 44 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M2 12H40M40 12L31 3M40 12L31 21"
//                         stroke="#22d3ee"
//                         strokeWidth="2.5"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact / Inquiry Form */}
//       <section id="contact">
//         <ContactSection />
//       </section>

//       {/* Testimonials */}
//       <Testimonial />

//       {/* Sticky Mobile CTA */}
//       <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs px-4 block md:hidden">
//         <div className="bg-gradient-to-r from-cyan-600 to-blue-800 rounded-full shadow-lg flex items-center justify-between px-4 py-2">
//           <span className="text-white font-semibold">
//             Let's talk about your project!
//           </span>
//           <a
//             href="#contact"
//             className="ml-4 px-4 py-2 bg-white text-cyan-700 rounded-full font-bold text-sm"
//           >
//             Contact
//           </a>
//         </div>
//       </div>
//     </main>
//   );
// }

'use client';
import React from 'react';
import OurWorks from '../components/WhatWeDo/OurWorks';
import WhatWeOffer from '../components/WhatWeDo/WhatWeOffer';
import Testimonial from '../components/Testimonial';
import HeroSection from '../components/WhatWeDo/HeroSection';
import ContactSection from '../components/WhatWeDo/ContactSection';

export default function WhatWeDoClient() {
  return (
<main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
  {/* Hero Section */}
  <HeroSection />

  {/* What We Offer */}
  <section id="services" className="py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0">
    
      <WhatWeOffer />
    </div>
  </section>

  {/* Our Work Showcase */}
  <section id="work" className="py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0">
      <OurWorks />
    </div>
  </section>

  {/* Contact Section */}
  <section id="contact">
    <ContactSection />
  </section>
</main>

  );
}
