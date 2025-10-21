// 'use client';
// import React, { useEffect, useState } from 'react';
// import ScheduleCallModal from './ScheduleCallModal';

// const CompanyBanner = () => {
//   const [watermarkGrid, setWatermarkGrid] = useState<
//     { top: string; left: string; rotate: string }[]
//   >([]);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const rows = 5,
//       cols = 4,
//       grid = [];
//     for (let r = 0; r < rows; r++)
//       for (let c = 0; c < cols; c++)
//         grid.push({
//           top: `${(r * 100) / rows + 4}%`,
//           left: `${(c * 100) / cols + 4}%`,
//           rotate: `${Math.random() * 30 - 15}deg`,
//         });
//     setWatermarkGrid(grid);
//   }, []);

//   return (
//     <section className="relative overflow-hidden my-8 bg-gradient-to-b from-white to-blue-50 text-gray-900 py-24 px-6 sm:px-12 lg:px-24 rounded-3xl shadow-2xl border border-gray-300">
//       {/* Watermark Grid */}
//       <div className="absolute inset-0 pointer-events-none z-0 select-none">
//         {watermarkGrid.map((pos, i) => (
//           <span
//             key={i}
//             className="absolute text-2xl sm:text-4xl font-extrabold opacity-5 whitespace-nowrap text-gray-900"
//             style={{
//               top: pos.top,
//               left: pos.left,
//               transform: `rotate(${pos.rotate})`,
//               userSelect: 'none',
//             }}
//           >
//             Talent With Us
//           </span>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="relative z-10 max-w-4xl mx-auto text-center ">
//         <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1EB8F3] to-[#0066FF] drop-shadow-md">
//           Building Exceptional Digital Products
//         </h1>
//         <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-gray-800 leading-relaxed">
//           At <span className="font-semibold text-gray-900">Talent With Us</span>
//           , we craft high-impact websites, powerful applications, and end-to-end
//           digital systems that fuel business innovation. Our agile process and
//           deep tech expertise guarantee precise delivery at scale.
//         </p>
//         <div className="mt-12">
//           <button
//             aria-label="Schedule a call"
//             onClick={() => setShowModal(true)}
//             className="inline-block bg-gradient-to-r from-[#00AEEF] to-[#0052CC] text-white font-semibold text-lg px-10 py-3 rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:opacity-90 cursor-pointer focus:outline-none focus:ring-4 focus:ring-fuchsia-300 focus:ring-opacity-60"
//           >
//             Schedule a Call
//           </button>
//         </div>
//         {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
//             <ScheduleCallModal onClose={() => setShowModal(false)} />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default CompanyBanner;

'use client';

import React, { useEffect, useState } from 'react';
import ScheduleCallModal from './ScheduleCallModal';

const CompanyBanner = () => {
  const [watermarkGrid, setWatermarkGrid] = useState<
    { top: string; left: string; rotate: string }[]
  >([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const rows = 5,
      cols = 4,
      grid = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        grid.push({
          top: `${(r * 100) / rows + 4}%`,
          left: `${(c * 100) / cols + 4}%`,
          rotate: `${Math.random() * 30 - 15}deg`,
        });
    setWatermarkGrid(grid);
  }, []);

  return (
    <section className="relative overflow-hidden my-8 bg-gradient-to-b from-white to-blue-50 text-gray-900 py-28 px-6 sm:px-12 lg:px-24 rounded-3xl shadow-2xl border border-gray-300">
      {/* Watermark Grid */}
      <div className="absolute inset-0 pointer-events-none z-0 select-none">
        {watermarkGrid.map((pos, i) => (
          <span
            key={i}
            className="absolute text-2xl sm:text-4xl font-extrabold opacity-10 whitespace-nowrap text-gradient-blue-logo"
            style={{
              top: pos.top,
              left: pos.left,
              transform: `rotate(${pos.rotate})`,
              userSelect: 'none',
            }}
          >
            Talent With Us
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1EB8F3] via-[#00AEEF] to-[#0059FF] drop-shadow-lg">
          Building Exceptional Digital Products
        </h1>
        <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto text-gray-800 leading-relaxed">
          At <span className="font-semibold text-gray-900">Talent With Us</span>, we craft high-impact websites, powerful applications, and end-to-end digital systems that fuel business innovation. Our agile process and deep tech expertise guarantee precise delivery at scale.
        </p>
        <div className="mt-14">
          <button
            aria-label="Schedule a call"
            onClick={() => setShowModal(true)}
            className="inline-block bg-gradient-to-r from-[#00AEEF] to-[#0059FF] text-white font-semibold text-lg px-12 py-4 rounded-2xl shadow-xl transition-transform transform hover:scale-105 hover:opacity-90 cursor-pointer focus:outline-none focus:ring-4 focus:ring-fuchsia-300 focus:ring-opacity-60"
          >
            Schedule a Call
          </button>
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <ScheduleCallModal onClose={() => setShowModal(false)} />
          </div>
        )}
      </div>
      <style jsx>{`
        .text-gradient-blue-logo {
          background: linear-gradient(
            90deg,
            #1EB8F3 0%,
            #00AEEF 40%,
            #0059FF 80%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  );
};

export default CompanyBanner;
