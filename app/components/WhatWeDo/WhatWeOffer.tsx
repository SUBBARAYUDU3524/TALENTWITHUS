// 'use client';
// import React, { useState } from 'react';
// import Image from 'next/image';

// const categories = [
//   {
//     icon: '🌐',
//     title: 'Websites',
//     description:
//       'Enterprise-grade, high-performance websites—from business portals to full-featured eCommerce—optimized for SEO, accessibility, and conversion.',
//   },
//   {
//     icon: '📱',
//     title: 'Apps',
//     description:
//       'Modern Android/iOS apps built for scale and engagement. We deliver seamless UX, robust integration, and future-ready technology.',
//   },
//   {
//     icon: '🛠',
//     title: 'Tools & SaaS',
//     description:
//       'Custom SaaS platforms, dashboards, and calculators to automate business processes and empower decision-making with actionable data.',
//   },
//   {
//     icon: '💡',
//     title: 'Digital Products',
//     description:
//       'From interactive code editors to online contest platforms, we deliver innovative digital products that empower learning, productivity, and engagement.',
//   },
//   {
//     icon: '🧾',
//     title: 'PPTs & PDFs',
//     description:
//       'Professional presentations, branded PDF brochures, and documentation—delivered with clarity, style, and impact for business, academics, or marketing.',
//   },
//   {
//     icon: '🧠',
//     title: 'AI / ML',
//     description:
//       'We create advanced AI solutions—chatbots, analytics, and recommendation engines—making next-gen intelligence accessible for your business.',
//   },
//   {
//     icon: '🎨',
//     title: 'Branding',
//     description:
//       'Distinctive branding: logos, guidelines, social kits, and UI systems—ensuring your digital presence is memorable and consistent everywhere.',
//   },
// ];

// export default function WhatWeOffer() {
//   const [openIdx, setOpenIdx] = useState<number | null>(null);
//   const [sliderIdx, setSliderIdx] = useState(0);

//   const handleOpen = (idx: number) => {
//     setOpenIdx(idx);
//     setSliderIdx(0);
//   };

//   return (
//     <section aria-labelledby="what-we-offer-heading" className="w-full">
//       <h2 id="what-we-offer-heading" className="sr-only">
//         What We Offer
//       </h2>
//       <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-7">
//         {categories.map((cat, idx) => (
//           <div key={cat.title} className="relative h-full">
//             <div
//               className={`flex flex-col items-center text-center justify-between bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] border-2 border-cyan-900 rounded-2xl p-6 shadow-lg h-full min-h-[320px] hover:scale-105 transition cursor-pointer focus:outline-none`}
//               style={{ minHeight: '320px' }}
//               onClick={() => handleOpen(idx)}
//               tabIndex={0}
//               aria-label={`Learn more about ${cat.title}`}
//             >
//               <div>
//                 <div className="text-4xl mb-2" aria-hidden="true">
//                   {cat.icon}
//                 </div>
//                 <h3 className="text-xl font-bold text-cyan-300 mb-2">
//                   {cat.title}
//                 </h3>
//                 {/* Horizontal line below title */}
//                 <div className="w-full h-[1] bg-gray-700 my-2 rounded"></div>
//                 <div className="text-gray-300 text-base">{cat.description}</div>
//               </div>
//             </div>
//             {openIdx === idx && (
//               <div
//                 className="fixed z-30 inset-0 bg-black/80 flex justify-center items-center px-3"
//                 aria-modal="true"
//                 role="dialog"
//               >
//                 <div className="bg-gradient-to-br from-[#151a22] via-[#10121a] to-[#23272f] border-1 border-cyan-400 rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fade-in flex flex-col items-center">
//                   <button
//                     onClick={() => setOpenIdx(null)}
//                     className="absolute top-4 right-5 text-2xl text-cyan-300 cursor-pointer hover:text-cyan-200 transition"
//                     aria-label="Close"
//                     tabIndex={0}
//                   >
//                     &times;
//                   </button>
//                   <div className="flex flex-col items-center mb-6">
//                     <span className="text-4xl mb-2" aria-hidden="true">
//                       {cat.icon}
//                     </span>
//                     <div className="text-xl font-bold text-cyan-300">
//                       {cat.title}
//                     </div>
//                     <div className="text-gray-300 text-center mt-2 text-sm">
//                       {cat.description}
//                     </div>
//                   </div>
//                   {/* Slider for recent items */}
//                 </div>
//                 <style jsx>{`
//                   .animate-fade-in {
//                     animation: fadeIn 0.18s;
//                   }
//                   @keyframes fadeIn {
//                     from {
//                       opacity: 0;
//                       transform: translateY(10px);
//                     }
//                     to {
//                       opacity: 1;
//                       transform: translateY(0);
//                     }
//                   }
//                 `}</style>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import React, { useState } from 'react';
import {
  FaGlobe, FaMobileAlt, FaTools, FaLightbulb,
  FaFileAlt, FaBrain, FaPalette, FaCloud
} from 'react-icons/fa';

const categories = [
  {
    icon: <FaGlobe />,
    title: 'Websites',
    description:
      'Enterprise-grade, high-performance websites—from business portals to full-featured eCommerce—optimized for SEO, accessibility, and conversion.',
  },
  {
    icon: <FaMobileAlt />,
    title: 'Apps',
    description:
      'Modern Android/iOS apps built for scale and engagement. We deliver seamless UX, robust integration, and future-ready technology.',
  },
  {
    icon: <FaTools />,
    title: 'Tools & SaaS',
    description:
      'Custom SaaS platforms, dashboards, and calculators to automate business processes and empower decision-making with actionable data.',
  },
  {
    icon: <FaLightbulb />,
    title: 'Digital Products',
    description:
      'From interactive code editors to online contest platforms, we deliver innovative digital products that empower learning, productivity, and engagement.',
  },
  {
    icon: <FaFileAlt />,
    title: 'PPTs & PDFs',
    description:
      'Professional presentations, branded PDF brochures, and documentation—delivered with clarity, style, and impact for business, academics, or marketing.',
  },
  {
    icon: <FaBrain />,
    title: 'AI / ML',
    description:
      'We create advanced AI solutions—chatbots, analytics, and recommendation engines—making next-gen intelligence accessible for your business.',
  },
  {
    icon: <FaPalette />,
    title: 'Branding',
    description:
      'Distinctive branding: logos, guidelines, social kits, and UI systems—ensuring your digital presence is memorable and consistent everywhere.',
  },
  {
    icon: <FaCloud />,
    title: 'Cloud & Integrations',
    description:
      'Powerful cloud integrations, hosting, and automation—seamlessly connecting your business to the tools and platforms you use most.',
  },
];

const iconColors = [
  'text-cyan-400',
  'text-blue-400',
  'text-indigo-400',
  'text-yellow-400',
  'text-pink-400',
  'text-cyan-300',
  'text-purple-400',
  'text-blue-300'
];

export default function WhatWeOffer() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section aria-labelledby="what-we-offer-heading" className="w-full pb-0">
      <h2
        id="what-we-offer-heading"
        className="text-3xl md:text-4xl font-extrabold text-center mb-14 bg-clip-text text-transparent bg-gradient-to-r from-[#1EB8F3] via-[#00AEEF] to-[#0059FF] tracking-tight"
      >
        Our Expertise & Offerings
      </h2>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-8">
        {categories.map((cat, idx) => (
          <div
            key={cat.title}
            className="relative h-full"
          >
            <div
              className={`flex flex-col items-center text-center justify-between bg-gradient-to-br from-blue-50 to-white border-2 border-cyan-100 rounded-2xl p-6 shadow-lg h-full min-h-[320px] transition transform hover:scale-[1.045] cursor-pointer group focus:outline-none`}
              style={{ minHeight: '340px' }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              tabIndex={0}
              aria-label={`Learn more about ${cat.title}`}
            >
              <div
                className={`flex items-center justify-center mb-3 w-16 h-16 rounded-full bg-white transition-shadow duration-300 text-4xl ${iconColors[idx]}`}
                style={{
                  boxShadow: hoveredIdx === idx
                    ? '0 0 0 8px #1EB8F340, 0 4px 24px 0 #1EB8F326'
                    : '0 2px 12px 0 #1EB8F315',
                  outline: hoveredIdx === idx ? '2px solid #1EB8F3' : 'none',
                  color: hoveredIdx === idx ? '#00AEEF' : undefined,
                  fontSize: hoveredIdx === idx ? '2.7rem' : '2.2rem'
                }}
              >
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-cyan-700 mb-2">{cat.title}</h3>
              <div className="w-8 h-1 bg-cyan-100 my-2 mx-auto rounded" />
              <div className="text-gray-700 text-base">{cat.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

