// import { memo, useState } from 'react';
// import { motion } from 'framer-motion';
// import {
//   FaReact,
//   FaNodeJs,
//   FaPython,
//   FaJava,
//   FaHtml5,
//   FaCss3Alt,
//   FaGitAlt,
//   FaGithub,
//   FaAws,
//   FaDocker,
// } from 'react-icons/fa';
// import {
//   SiNextdotjs,
//   SiTailwindcss,
//   SiMongodb,
//   SiExpress,
//   SiRedux,
//   SiTypescript,
//   SiGraphql,
//   SiFirebase,
//   SiMysql,
//   SiPostgresql,
// } from 'react-icons/si';

// const techIconsRowOne = [
//   { icon: FaReact, label: 'React' },
//   { icon: SiNextdotjs, label: 'Next.js' },
//   { icon: SiTailwindcss, label: 'Tailwind CSS' },
//   { icon: FaNodeJs, label: 'Node.js' },
//   { icon: SiExpress, label: 'Express.js' },
//   { icon: SiMongodb, label: 'MongoDB' },
//   { icon: SiRedux, label: 'Redux' },
//   { icon: SiTypescript, label: 'TypeScript' },
//   { icon: FaGitAlt, label: 'Git' },
//   { icon: FaGithub, label: 'GitHub' },
// ];

// const techIconsRowTwo = [
//   { icon: FaJava, label: 'Java' },
//   { icon: FaPython, label: 'Python' },
//   { icon: FaHtml5, label: 'HTML5' },
//   { icon: FaCss3Alt, label: 'CSS3' },
//   { icon: SiGraphql, label: 'GraphQL' },
//   { icon: SiFirebase, label: 'Firebase' },
//   { icon: SiMysql, label: 'MySQL' },
//   { icon: SiPostgresql, label: 'PostgreSQL' },
//   { icon: FaAws, label: 'AWS' },
//   { icon: FaDocker, label: 'Docker' },
// ];

// const MarqueeRow = ({
//   icons,
//   colorClass,
//   isAlt,
// }: {
//   icons: { icon: any; label: string }[];
//   colorClass: string;
//   isAlt?: boolean;
// }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className="overflow-hidden relative mb-12 cursor-pointer"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <motion.div
//         className={`flex w-[200%] space-x-14 ${
//           isAlt ? 'flex-row-reverse' : 'flex-row'
//         }`}
//         animate={{
//           x: isHovered ? 0 : ['0%', '-50%'],
//         }}
//         transition={{
//           x: {
//             repeat: isHovered ? 0 : Infinity,
//             repeatType: 'loop',
//             duration: 40,
//             ease: 'linear',
//           },
//         }}
//       >
//         {[...icons, ...icons].map(({ icon: Icon, label }, idx) => (
//           <motion.div
//             key={idx}
//             className={`text-7xl sm:text-8xl md:text-9xl ${colorClass} transition-transform duration-300 flex flex-col items-center justify-center`}
//             whileHover={{ scale: 1.2, color: colorClass.replace('300', '600') }}
//             aria-label={label}
//             title={label}
//           >
//             <Icon />
//             <span className="mt-2 text-xl font-semibold text-gray-800 dark:text-gray-100 select-none pointer-events-none">
//               {label}
//             </span>
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// const TechStackShowcase = () => {
//   return (
//     <section
//       className="bg-gradient-to-br from-[#e6f0ff] via-[#edf4ff] to-[#f7faff] py-14 sm:py-20 px-6 sm:px-10 md:px-16 lg:px-28"
//       aria-labelledby="tech-stack-heading"
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: 'easeOut' }}
//         className="max-w-7xl mx-auto text-center mb-16"
//       >
//         <h2
//           id="tech-stack-heading"
//           className="text-3xl md:text-4xl font-extrabold leading-tight bg-gradient-to-r from-[#1EB8F3] to-[#0066FF] bg-clip-text text-transparent"
//         >
//           Technologies We Master
//         </h2>
//         <p className="mt-4 max-w-xl mx-auto text-gray-700 text-lg sm:text-xl font-medium">
//           At <span className="font-bold text-gray-900">Talent With Us</span>, we
//           use a cutting-edge tech stack to build scalable, secure, and
//           high-performance digital solutions. From frontend to backend, we
//           ensure quality and innovation.
//         </p>
//       </motion.div>

//       <MarqueeRow
//         icons={techIconsRowOne}
//         colorClass="text-cyan-400 hover:text-cyan-600"
//       />
//       <MarqueeRow
//         icons={techIconsRowTwo}
//         colorClass="text-orange-400 hover:text-orange-600"
//         isAlt
//       />

//       <div className="text-center mt-12 mb-10">
//         <motion.button
//           whileHover={{
//             scale: 1.05,
//             boxShadow: '0px 0px 15px rgba(0,174,239,0.6)',
//           }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-gradient-to-r from-[#00AEEF] cursor-pointer to-[#0052CC] text-white px-10 py-4 rounded-full shadow-lg font-semibold text-lg transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
//           aria-label="Explore our full repository"
//         >
//           Explore Our Full Repository
//         </motion.button>
//       </div>
//     </section>
//   );
// };

// export default memo(TechStackShowcase);

import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaAws,
  FaDocker,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiRedux,
  SiTypescript,
  SiGraphql,
  SiFirebase,
  SiMysql,
  SiPostgresql,
} from 'react-icons/si';
import Link from 'next/link';

// Professional color mapping for icons
const iconColorMap = {
  React: '#61DAFB',
  'Next.js': '#000000',
  'Tailwind CSS': '#38BDF8',
  'Node.js': '#339933',
  'Express.js': '#000000',
  MongoDB: '#47A248',
  Redux: '#764ABC',
  TypeScript: '#3178C6',
  Git: '#F05032',
  GitHub: '#181717',
  Java: '#007396',
  Python: '#3776AB',
  HTML5: '#E34F26',
  CSS3: '#1572B6',
  GraphQL: '#E10098',
  Firebase: '#FFCA28',
  MySQL: '#4479A1',
  PostgreSQL: '#4169E1',
  AWS: '#FF9900',
  Docker: '#2496ED',
};

const techIconsRowOne = [
  { icon: FaReact, label: 'React' },
  { icon: SiNextdotjs, label: 'Next.js' },
  { icon: SiTailwindcss, label: 'Tailwind CSS' },
  { icon: FaNodeJs, label: 'Node.js' },
  { icon: SiExpress, label: 'Express.js' },
  { icon: SiMongodb, label: 'MongoDB' },
  { icon: SiRedux, label: 'Redux' },
  { icon: SiTypescript, label: 'TypeScript' },
  { icon: FaGitAlt, label: 'Git' },
  { icon: FaGithub, label: 'GitHub' },
];

const techIconsRowTwo = [
  { icon: FaJava, label: 'Java' },
  { icon: FaPython, label: 'Python' },
  { icon: FaHtml5, label: 'HTML5' },
  { icon: FaCss3Alt, label: 'CSS3' },
  { icon: SiGraphql, label: 'GraphQL' },
  { icon: SiFirebase, label: 'Firebase' },
  { icon: SiMysql, label: 'MySQL' },
  { icon: SiPostgresql, label: 'PostgreSQL' },
  { icon: FaAws, label: 'AWS' },
  { icon: FaDocker, label: 'Docker' },
];

const MarqueeRow = ({
  icons,
  isAlt,
}: {
  icons: { icon: any; label: string }[];
  isAlt?: boolean;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="overflow-hidden relative mb-12 cursor-pointer"
    >
      <motion.div
        className={`flex w-[200%] space-x-16 ${isAlt ? 'flex-row-reverse' : 'flex-row'}`}
        animate={{
          x: hoveredIndex !== null ? 0 : ['0%', isAlt ? '50%' : '-50%'],
        }}
        transition={{
          x: {
            repeat: hoveredIndex !== null ? 0 : Infinity,
            repeatType: 'loop',
            duration: 38,
            ease: 'linear',
          },
        }}
        style={{ willChange: 'transform' }}
      >
        {[...icons, ...icons].map(({ icon: Icon, label }, idx) => {
          const isHovered = hoveredIndex === idx;
          return (
            <motion.div
              key={idx}
              className="flex flex-col items-center justify-center relative"
              style={{ color: iconColorMap[label], minWidth: '7rem' }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{
                scale: 1.2,
                backgroundColor: `${iconColorMap[label]}22`, // subtle tinted circle background
                borderRadius: '50%',
                padding: '1rem',
                boxShadow: `0 0 15px ${iconColorMap[label]}66`,
                zIndex: 2,
              }}
              tabIndex={-1}
              aria-label={label}
              title={label}
            >
              <Icon className="text-6xl md:text-8xl transition-all duration-300" />
              <motion.span
                initial={{ opacity: 0, y: 5, pointerEvents: 'none' }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 5,
                }}
                transition={{ duration: 0.3 }}
                className="mt-2 text-xl font-semibold text-[#111827] dark:text-gray-100 select-none absolute top-full left-1/2 transform -translate-x-1/2 whitespace-nowrap"
              >
                {label}
              </motion.span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

const TechStackShowcase = () => {
  return (
    <section
      className="bg-gradient-to-b from-blue-50 to-white py-14 sm:py-20 px-6 sm:px-10 md:px-16 lg:px-28"
      aria-labelledby="tech-stack-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto text-center mb-16"
      >
        <h2
          id="tech-stack-heading"
          className="text-3xl md:text-4xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1EB8F3] to-[#0059FF] drop-shadow"
        >
          Technologies We Master
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-gray-700 text-lg sm:text-xl font-medium">
          At <span className="font-bold text-gray-900">Talent With Us</span>, we use a future-proof tech stack to deliver scalable, secure, high-performance digital products. Our approach ensures innovation from frontend to backend—every time.
        </p>
      </motion.div>

      <MarqueeRow icons={techIconsRowOne} />
      <MarqueeRow icons={techIconsRowTwo} isAlt />

      <div className="text-center mt-12 mb-10">
        <Link href="/whatwedo" passHref>
        <motion.button
          whileHover={{
            scale: 1.06,
            boxShadow: '0px 0px 15px 0px rgba(30,184,243,0.36)',
          }}
          whileTap={{ scale: 0.96 }}
          className="bg-gradient-to-r from-[#1EB8F3] to-[#0059FF] cursor-pointer text-white px-10 py-4 rounded-full shadow-xl font-semibold text-lg transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Explore our full repository"
        >
          Explore Our Full Repository
        </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default memo(TechStackShowcase);
