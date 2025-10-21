// import { memo, useMemo } from 'react';
// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import {
//   CodeBracketIcon,
//   DevicePhoneMobileIcon,
//   ArrowPathIcon,
//   CpuChipIcon,
//   ServerIcon,
//   RocketLaunchIcon,
//   ShieldCheckIcon,
//   GlobeAltIcon,
// } from '@heroicons/react/24/outline';

// // Static data memoized for performance
// const SERVICES = [
//   {
//     title: 'Web Development',
//     description: 'High-performance websites with modern tech stacks.',
//     icon: CodeBracketIcon,
//   },
//   {
//     title: 'Mobile Applications',
//     description: 'iOS & Android apps with flawless UX.',
//     icon: DevicePhoneMobileIcon,
//   },
//   {
//     title: 'Automation Tools',
//     description: 'Smart solutions to streamline your workflows.',
//     icon: ArrowPathIcon,
//   },
//   {
//     title: 'Digital Products',
//     description: 'Custom software for your specific needs.',
//     icon: CpuChipIcon,
//   },
//   {
//     title: 'Cloud Solutions',
//     description: 'Scalable infrastructure for your applications.',
//     icon: ServerIcon,
//   },
//   {
//     title: 'UI/UX Design',
//     description: 'Beautiful interfaces with intuitive experiences.',
//     icon: RocketLaunchIcon,
//   },
//   {
//     title: 'Maintenance & Support',
//     description: 'Reliable ongoing support for your digital assets.',
//     icon: ShieldCheckIcon,
//   },
//   {
//     title: 'Consulting',
//     description: 'Expert guidance for your digital strategy.',
//     icon: GlobeAltIcon,
//   },
// ] as const;

// const CARD_ANIMATION_VARIANTS = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.15,
//       type: 'spring',
//       stiffness: 100,
//       damping: 18,
//     },
//   }),
// };

// const SECTION_ANIMATION = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
// };

// function WhatWeDoComponent() {
//   // Intersection observer with triggerOnce controls animation play once
//   const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

//   const services = useMemo(() => SERVICES, []);

//   return (
//     <section
//       id="services"
//       ref={ref}
//       aria-label="Our Digital Services"
//       className="py-20 relative bg-gradient-to-b from-white to-blue-50"
//     >
//       <div className="container mx-auto px-6 md:px-12">
//         <motion.div
//           initial="hidden"
//           animate={inView ? 'visible' : 'hidden'}
//           variants={SECTION_ANIMATION}
//           className="text-center mb-16 max-w-4xl mx-auto"
//         >
//           <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 drop-shadow-sm">
//             Our Digital Services
//           </h2>
//           <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Comprehensive solutions tailored to your unique business needs.
//           </p>
//           <div className="mt-6 h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-[#1EB8F3] to-[#0059FF]" />
//         </motion.div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
//           {services.map((service, idx) => {
//             const Icon = service.icon;
//             return (
//               <motion.article
//                 key={service.title}
//                 initial="hidden"
//                 animate={inView ? 'visible' : 'hidden'}
//                 variants={CARD_ANIMATION_VARIANTS}
//                 custom={idx}
//                 tabIndex={0}
//                 aria-label={`${service.title} service`}
//                 className="bg-white/95 shadow-lg rounded-xl p-7 border border-gray-200 hover:border-blue-500 focus-within:border-blue-500 transition-transform transform hover:-translate-y-2 focus-within:-translate-y-2 outline-none"
//               >
//                 <div
//                   className="p-4 rounded-full ml-25 md:ml-0 bg-gradient-to-r from-[#1EB8F3] to-[#0059FF] text-white inline-flex mb-5 shadow-md"
//                   aria-hidden="true"
//                 >
//                   <Icon className="h-9 w-9" />
//                 </div>
//                 <h3 className="text-xl text-center md:text-left font-semibold text-gray-900 mb-3 leading-tight">
//                   {service.title}
//                 </h3>
//                 <p className="text-gray-600 text-center md:text-left leading-relaxed">
//                   {service.description}
//                 </p>
//               </motion.article>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default memo(WhatWeDoComponent);

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ArrowPathIcon,
  CpuChipIcon,
  ServerIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const SERVICES = [
  {
    title: 'Web Development',
    description: 'High-performance websites with modern tech stacks.',
    icon: CodeBracketIcon,
  },
  {
    title: 'Mobile Applications',
    description: 'iOS & Android apps with flawless UX.',
    icon: DevicePhoneMobileIcon,
  },
  {
    title: 'Automation Tools',
    description: 'Smart solutions to streamline your workflows.',
    icon: ArrowPathIcon,
  },
  {
    title: 'Digital Products',
    description: 'Custom software for your specific needs.',
    icon: CpuChipIcon,
  },
  {
    title: 'Cloud Solutions',
    description: 'Scalable infrastructure for your applications.',
    icon: ServerIcon,
  },
  {
    title: 'UI/UX Design',
    description: 'Beautiful interfaces with intuitive experiences.',
    icon: RocketLaunchIcon,
  },
  {
    title: 'Maintenance & Support',
    description: 'Reliable ongoing support for your digital assets.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Consulting',
    description: 'Expert guidance for your digital strategy.',
    icon: GlobeAltIcon,
  },
] as const;

const CARD_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      type: 'spring',
      stiffness: 100,
      damping: 18,
    },
  }),
};

const SECTION_ANIMATION = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

function WhatWeDoComponent() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const services = useMemo(() => SERVICES, []);

  return (
    <section
      id="services"
      ref={ref}
      aria-label="Our Digital Services"
      className="py-15 relative bg-gradient-to-b from-white to-blue-50"
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={SECTION_ANIMATION}
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#1EB8F3] to-[#0059FF] drop-shadow">
            Our Digital Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed ">
            Comprehensive solutions tailored to your unique business needs.
          </p>
          <div className="mt-6 h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-[#1EB8F3] to-[#0059FF]" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={CARD_ANIMATION_VARIANTS}
                custom={idx}
                tabIndex={0}
                aria-label={`${service.title} service`}
                className="bg-white/95 shadow-lg rounded-xl p-7 border border-gray-200 flex flex-col items-center justify-center transition-all duration-300 hover:border-blue-500 focus-within:border-blue-500 hover:shadow-[0_8px_32px_0_rgba(30,184,243,0.18),0_1.5px_16px_0_rgba(0,89,255,0.12)] focus-within:shadow-[0_8px_32px_0_rgba(30,184,243,0.18),0_1.5px_16px_0_rgba(0,89,255,0.12)] outline-none"
              >
                <div
                  className="p-4 rounded-full bg-gradient-to-r from-[#1EB8F3] to-[#0059FF] text-white inline-flex mb-5 shadow-md transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_#1EB8F3] focus-within:scale-110 focus-within:drop-shadow-[0_0_12px_#1EB8F3]"
                  aria-hidden="true"
                >
                  <Icon className="h-9 w-9" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {service.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(WhatWeDoComponent);
