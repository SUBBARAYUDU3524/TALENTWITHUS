// 'use client';

// import React from 'react';
// import OpenPositions from '../components/OpenPositions';
// import { useAuth } from '../context/AuthContext';
// import Link from 'next/link';

// const culturePoints = [
//   {
//     icon: '🤝',
//     title: 'Collaboration',
//     desc: 'We believe the best solutions come from working together.',
//   },
//   {
//     icon: '🚀',
//     title: 'Innovation',
//     desc: 'We encourage bold ideas and continuous improvement.',
//   },
//   {
//     icon: '🧑‍🎓',
//     title: 'Growth Mindset',
//     desc: 'Personal and professional development is part of every role.',
//   },
//   {
//     icon: '🌐',
//     title: 'Diversity & Inclusion',
//     desc: 'We welcome team members from all backgrounds and experiences.',
//   },
// ];

// export default function CareersClient() {
//   const { user, loading } = useAuth();

//   return (
//     <section className="py-14 px-4 min-h-screen bg-gradient-to-br from-[#E3F1F5] via-[#DDEFF2] to-[#C8E7EE] text-white">
//       <div className="max-w-6xl mx-auto space-y-16">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-5xl font-bold mb-4 text-cyan-600 drop-shadow-lg">
//             Careers at Talent With Us
//           </h1>
//           <p className="text-lg text-gray-800 max-w-2xl mx-auto">
//             Join our mission to build impactful digital solutions and grow with
//             a passionate, innovative team.
//           </p>
//         </div>

//         {/* Culture Cards */}
//         <div>
//           <h2 className="text-4xl font-bold text-center mb-7 text-black">
//             🌟 Company Culture & Values
//           </h2>
//           <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
//             {culturePoints.map((point) => (
//               <div
//                 key={point.title}
//                 className="bg-[#DEEAF3] rounded-xl p-7 border-2 border-cyan-400 shadow-lg flex flex-col items-center text-center hover:scale-[1.03] transition"
//               >
//                 <span className="text-3xl mb-3">{point.icon}</span>
//                 <h3 className="text-xl font-semibold mb-1 text-cyan-700">
//                   {point.title}
//                 </h3>
//                 <p className="text-gray-800 text-base">{point.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Open Positions Section */}
//         <div className="w-full py-16 bg-gradient-to-tr from-cyan-100 via-white to-blue-100 relative overflow-hidden">
//           <div className="max-w-3xl mx-auto relative z-10 bg-white/50 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.18)] border border-cyan-300 p-10 md:p-16">
//             <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-center mb-8 text-cyan-700 flex items-center justify-center gap-3 drop-shadow-lg">
//               <span className="w-7 h-7 md:w-14 md:h-14 bg-cyan-500/30 text-xl md:text-3xl lg:text-4xl flex items-center justify-center rounded-full shadow-lg">
//                 💼
//               </span>
//               Open Positions
//             </h2>

//             {!loading && !user && (
//               <div className="mb-8 flex justify-center">
//                 <div className="bg-white/80 backdrop-blur-md border border-cyan-100 px-7 py-5 rounded-2xl shadow-lg flex items-center gap-3 animate-fade-in">
//                   <span className="w-10 h-10 bg-cyan-200 text-cyan-700 rounded-full flex items-center justify-center text-2xl shadow">
//                     🔒
//                   </span>
//                   <p className="text-cyan-700 font-medium text-lg">
//                     You must{' '}
//                     <Link
//                       href="/login"
//                       className="underline text-cyan-700 hover:text-cyan-900 font-semibold transition drop-shadow"
//                     >
//                       log in
//                     </Link>{' '}
//                     to apply for jobs.
//                   </p>
//                 </div>
//               </div>
//             )}

//             <OpenPositions user={user} />
//           </div>
//         </div>

//         {/* Easy Apply Card */}
//         <div className="flex justify-center py-12 bg-gradient-to-br from-[#1e2a44] to-[#17213b] relative">
//           {/* Blurred Accent for Depth */}
//           <div className="absolute left-1/2 top-0 -translate-x-1/2 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl z-0"></div>
//           <div className="absolute right-0 bottom-0 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl z-0"></div>
//           {/* Glass Card */}
//           <div className="relative z-10 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-700 p-10 w-full max-w-2xl flex flex-col items-center text-center">
//             <span className="w-14 h-14 flex items-center justify-center rounded-full bg-cyan-700/30 text-3xl mb-6 shadow-xl animate-bounce-slow">
//               📩
//             </span>
//             <h2 className="text-2xl font-bold mb-4 text-cyan-300 drop-shadow-lg tracking-tight">
//               Quick Apply
//             </h2>
//             <p className="text-gray-200 mb-6 text-lg px-4 leading-relaxed">
//               Interested in joining us but don’t see a matching position? Send
//               your resume and short intro to our team — we love meeting talented
//               people!
//             </p>
//             <a
//               href="mailto:careers@brightmindsoft.com?subject=Open Application"
//               className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-700 hover:to-blue-700 text-white text-lg font-semibold rounded-full transition drop-shadow-lg shadow-md animate-pulse-fast"
//             >
//               Apply Now
//             </a>
//             <div className="mt-6 text-sm text-cyan-100">
//               Or email us at{' '}
//               <a
//                 href="mailto:careers@talentwithus.com"
//                 className="underline hover:text-cyan-400 transition"
//               >
//                 careers@talentwithus.com
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import React from 'react';
import OpenPositions from '../components/OpenPositions';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { FaHandsHelping, FaRocket, FaUserGraduate, FaGlobeAmericas } from 'react-icons/fa';
import HeroSection from '../components/careers/HeroSection';

const culturePoints = [
  {
    icon: <FaHandsHelping className="text-cyan-600 w-10 h-10" />,
    title: 'Collaboration',
    desc: 'We believe the best solutions come from working together.',
  },
  {
    icon: <FaRocket className="text-cyan-600 w-10 h-10" />,
    title: 'Innovation',
    desc: 'We encourage bold ideas and continuous improvement.',
  },
  {
    icon: <FaUserGraduate className="text-cyan-600 w-10 h-10" />,
    title: 'Growth Mindset',
    desc: 'Personal and professional development is part of every role.',
  },
  {
    icon: <FaGlobeAmericas className="text-cyan-600 w-10 h-10" />,
    title: 'Diversity & Inclusion',
    desc: 'We welcome team members from all backgrounds and experiences.',
  },
];

export default function CareersClient() {
  const { user, loading } = useAuth();

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white min-h-screen text-gray-900">
      {/* Render Hero Section */}
      <HeroSection />

      {/* Culture Cards */}
      <div className="max-w-7xl mx-auto space-y-16 px-4 sm:px-6 lg:px-0 py-10">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-cyan-700">
          🌟 Company Culture & Values
        </h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {culturePoints.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-[#DEEAF3] rounded-xl p-7 border-2 border-cyan-400 shadow-lg flex flex-col items-center text-center hover:scale-[1.03] transition"
              tabIndex={0}
              role="region"
              aria-label={title}
            >
              {icon}
              <h3 className="text-xl font-semibold mt-4 text-cyan-600">{title}</h3>
              <p className="text-gray-800 mt-2">{desc}</p>
            </div>
          ))}
        </div>

        {/* Open Positions Section */}
        <div className="w-full py-16 bg-gradient-to-tr from-cyan-100 via-white to-blue-100 relative overflow-hidden rounded-3xl mt-16">
          <div className="max-w-3xl mx-auto relative z-10 bg-white/50 backdrop-blur-xl rounded-3xl shadow-lg border border-cyan-300 p-10 md:p-16">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-center mb-8 text-cyan-700 flex items-center justify-center gap-3 drop-shadow-lg">
              <span className="w-7 h-7 md:w-14 md:h-14 bg-cyan-500/30 text-xl md:text-3xl lg:text-4xl flex items-center justify-center rounded-full shadow-lg">💼</span>
              Open Positions
            </h2>

            {!loading && !user && (
              <div className="mb-8 flex justify-center">
                <div className="bg-white/80 backdrop-blur-md border border-cyan-100 px-7 py-5 rounded-2xl shadow-lg flex items-center gap-3 animate-fade-in">
                  <span className="w-10 h-10 bg-cyan-200 text-cyan-700 rounded-full flex items-center justify-center text-2xl shadow">🔒</span>
                  <p className="text-cyan-700 font-medium text-lg">
                    You must{' '}
                    <Link href="/login" className="underline text-cyan-700 hover:text-cyan-900 font-semibold transition drop-shadow">
                      log in
                    </Link>{' '}
                    to apply for jobs.
                  </p>
                </div>
              </div>
            )}

            <OpenPositions user={user} />
          </div>
        </div>

        {/* Easy Apply Card */}
 <div className="flex justify-center py-16 bg-gradient-to-b from-[#F0FBFF] via-[#E8F5FF] to-white relative rounded-3xl overflow-hidden">
  {/* Soft Gradient Glows */}
  <div className="absolute left-10 top-20 w-72 h-72 bg-[#1EB8F3]/20 rounded-full blur-3xl"></div>
  <div className="absolute right-10 bottom-10 w-64 h-64 bg-[#0059FF]/20 rounded-full blur-3xl"></div>

  {/* Card Content */}
  <div className="relative z-10 bg-white/80 backdrop-blur-lg rounded-3xl border border-cyan-100 shadow-2xl p-10 md:p-14 w-full max-w-2xl flex flex-col items-center text-center transition-transform duration-500 hover:scale-[1.02]">
    {/* Icon */}
    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-[#1EB8F3]/20 to-[#0059FF]/20 text-4xl text-[#00AEEF] shadow-lg mb-6">
      📩
    </div>

    {/* Title */}
    <h2 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#1EB8F3] via-[#00AEEF] to-[#0059FF] drop-shadow-sm">
      Quick Apply
    </h2>

    {/* Description */}
    <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 px-4">
      Can’t find a role that fits you? Don’t worry — we’re always open to meeting 
      passionate, talented individuals who want to make a difference. 
      Send us your resume and let’s explore opportunities together!
    </p>

    {/* Button */}
    <a
      href="mailto:careers@talentwithus.com?subject=Open Application"
      className="px-10 py-4 text-lg font-semibold text-white rounded-full shadow-lg bg-gradient-to-r from-[#00AEEF] to-[#0059FF] hover:shadow-2xl hover:scale-105 transition-transform duration-300"
    >
      Apply Now
    </a>

    {/* Email Text */}
    <div className="mt-6 text-sm text-cyan-700 font-medium">
      Or email us directly at{' '}
      <a
        href="mailto:careers@talentwithus.com"
        className="underline hover:text-[#00AEEF] transition-colors duration-300"
      >
        careers@talentwithus.com
      </a>
    </div>
  </div>
</div>

      </div>
    </section>
  );
}
