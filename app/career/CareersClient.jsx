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
import { 
  FaHandsHelping, 
  FaRocket, 
  FaUserGraduate, 
  FaGlobeAmericas,
  FaBriefcase,
  FaLock
} from 'react-icons/fa';
import HeroSection from '../components/careers/HeroSection';

const culturePoints = [
  {
    icon: <FaHandsHelping className="text-blue-600 w-8 h-8" />,
    title: 'Collaboration',
    desc: 'We believe the best solutions come from working together.',
  },
  {
    icon: <FaRocket className="text-blue-600 w-8 h-8" />,
    title: 'Innovation',
    desc: 'We encourage bold ideas and continuous improvement.',
  },
  {
    icon: <FaUserGraduate className="text-blue-600 w-8 h-8" />,
    title: 'Growth Mindset',
    desc: 'Personal and professional development is part of every role.',
  },
  {
    icon: <FaGlobeAmericas className="text-blue-600 w-8 h-8" />,
    title: 'Diversity & Inclusion',
    desc: 'We welcome team members from all backgrounds and experiences.',
  },
];

export default function CareersClient() {
  const { user, loading } = useAuth();

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Culture & Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Culture & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We foster an environment where innovation thrives and every team member can grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {culturePoints.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-blue-300 group"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-4 group-hover:bg-blue-100 transition-colors">
                  {icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <FaBriefcase className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Open Positions
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore current opportunities and find your perfect role in our growing team.
            </p>
          </div>

          {/* Login Prompt */}
          {/* {!loading &&  (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                  <FaLock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-blue-800 font-medium">
                    You need to{' '}
                    <Link
                      href="/login"
                      className="underline hover:text-blue-900 font-semibold transition-colors"
                    >
                      sign in
                    </Link>{' '}
                    to apply for positions.
                  </p>
                </div>
              </div>
            </div>
          )} */}

          {/* Open Positions Component */}
          <div className="max-w-6xl mx-auto">
            <OpenPositions />
          </div>
        </div>
      </section>

      {/* Quick Apply Section */}
      <section className="py-16 bg-gradient-to-br">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl text-white">📩</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Don't See the Perfect Role?
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for innovation. 
              Send us your resume and tell us how you can contribute to our team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:careers@talentwithus.com?subject=Open Application&body=Hi Team, I'm interested in exploring opportunities with Talent With Us. Here's a brief about myself..."
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Send Open Application
              </a>
              
              <div className="text-sm text-gray-500">
                or email directly to{' '}
                <a
                  href="mailto:careers@talentwithus.com"
                  className="text-blue-600 hover:text-blue-700 font-medium underline"
                >
                  careers@talentwithus.com
                </a>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              We typically respond within 2-3 business days
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}