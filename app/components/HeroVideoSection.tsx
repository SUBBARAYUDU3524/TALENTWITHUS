// 'use client';
// import { useCallback, useEffect, useMemo, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Head from 'next/head';
// import Image from 'next/image';

// const FEATURES = [
//   {
//     title: 'Web Development',
//     description: 'Enterprise-grade websites and platforms built to scale.',
//     image: '/web.png',
//   },
//   {
//     title: 'Mobile Apps',
//     description: 'High-performance native and cross-platform mobile solutions.',
//     image: '/app.png',
//   },
//   {
//     title: 'Automation Tools',
//     description: 'Streamline operations with custom intelligent automation.',
//     image: '/automation.png',
//   },
//   {
//     title: 'Digital Products',
//     description:
//       'Bespoke digital experiences that solve real business challenges.',
//     image: '/digital.png',
//   },
// ] as const;

// const AUTO_ADVANCE_INTERVAL = 4000;

// export default function HeroVideoSection() {
//   const [index, setIndex] = useState(0);

//   // Memoized theme colors and classes for performance -- blue-only gradients
//   const {
//     textColor,
//     subTextColor,
//     buttonPrimary,
//     buttonSecondary,
//     cardBg,
//     dotActive,
//     dotInactive,
//     headlineGradient,
//     sectionBg,
//     shadowStrong,
//   } = useMemo(
//     () => ({
//       textColor: 'text-gray-900',
//       subTextColor: 'text-gray-700',
//       buttonPrimary: 'bg-gradient-to-r from-[#1EB8F3] to-[#0059FF] text-white',
//       buttonSecondary:
//         'bg-gray-900 text-white border-2 border-gray-800 hover:border-blue-400 transition-colors',
//       cardBg: 'bg-white/90 backdrop-blur',
//       dotActive: 'bg-blue-600 shadow-lg shadow-blue-300/40 scale-110',
//       dotInactive: 'bg-gray-400 opacity-90',
//       headlineGradient:
//         'bg-clip-text text-transparent bg-gradient-to-r from-[#1EB8F3] to-[#0059FF]',
//       sectionBg:
//         'bg-gradient-to-br from-gray-50 via-white to-blue-50 transition-colors duration-700',
//       shadowStrong: 'shadow-2xl shadow-blue-200/30',
//     }),
//     []
//   );

//   // Auto-advance logic robust against unmount/mount
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % FEATURES.length);
//     }, AUTO_ADVANCE_INTERVAL);
//     return () => clearInterval(interval);
//   }, []);

//   // Keyboard accessibility for carousel dots
//   const handleDotKeyDown = useCallback(
//     (i: number, e: React.KeyboardEvent<HTMLButtonElement>) => {
//       if (e.key === 'Enter' || e.key === ' ') {
//         setIndex(i);
//       }
//     },
//     []
//   );

//   // Prefetch images for smooth transitions
//   useEffect(() => {
//     const nextIdx = (index + 1) % FEATURES.length;
//     const img = new window.Image();
//     img.src = FEATURES[nextIdx].image;
//   }, [index]);

//   // SEO meta tags
//   const seoTitle = 'Talent With Us | Digital Innovation Experts';
//   const seoDesc =
//     'We build world-class digital solutions: websites, mobile apps, automation tools, and AI-driven platforms for enterprises.';

//   return (
//     <section
//       className={`relative min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-20 ${sectionBg} ${textColor} overflow-hidden transition-colors duration-500`}
//       aria-label="Hero Banner: Digital Innovation Experts"
//     >
//       <Head>
//         <title>{seoTitle}</title>
//         <meta name="description" content={seoDesc} />
//         <meta property="og:title" content={seoTitle} />
//         <meta property="og:description" content={seoDesc} />
//         <meta property="og:image" content={FEATURES[index].image} />
//         <meta property="og:type" content="website" />
//         <meta name="twitter:title" content={seoTitle} />
//         <meta name="twitter:description" content={seoDesc} />
//         <meta name="twitter:card" content="summary_large_image" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       {/* Animated blurred background bubbles */}
//       <div className="absolute inset-0 pointer-events-none z-0">
//         {[...Array(8)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full bg-blue-400/15 blur-3xl"
//             initial={{
//               x: Math.random() * 1400 - 200,
//               y: Math.random() * 800 - 200,
//               width: Math.random() * 300 + 180,
//               height: Math.random() * 300 + 180,
//               opacity: 0.15,
//               rotate: Math.random() * 360,
//               scale: Math.random() * 0.6 + 0.4,
//             }}
//             animate={{
//               x: Math.random() * 800 + 100 * i,
//               y: Math.random() * 300 + 100 * i,
//               opacity: [0.16, 0.19, 0.16],
//               rotate: Math.random() * 360,
//             }}
//             transition={{
//               duration: Math.random() * 16 + 10,
//               repeat: Infinity,
//               repeatType: 'mirror',
//             }}
//             style={{
//               zIndex: 0,
//               left: i % 2 === 0 ? `${8 * i}px` : undefined,
//               right: i % 2 === 1 ? `${8 * i}px` : undefined,
//               top: `${12 * i}px`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Left: Text */}
//       <motion.div
//         className="lg:w-1/2 z-10"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: 'easeOut' }}
//       >
//         <h1
//           className={`text-4xl text-center md:text-left md:text-6xl font-bold leading-tight mb-8`}
//         >
//           <span className={headlineGradient}>Digital Innovation</span>
//           <br />
//           <span className="text-black">That Moves Enterprises Forward</span>
//         </h1>
//         <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto md:mx-0 text-gray-800">
//           From concept to launch, we build performant, scalable, and stunning
//           digital products tailored for enterprise impact.
//         </p>
//         <nav
//           aria-label="Hero Call to Action"
//           className="flex flex-col sm:flex-row gap-4"
//         >
//           <motion.a
//             href="/contactUs"
//             whileHover={{ scale: 1.07, boxShadow: '0 0 32px #1EB8F3' }}
//             whileTap={{ scale: 0.98 }}
//             className={`px-8 py-3 rounded-full text-center text-lg font-semibold shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 ${buttonPrimary} transition-colors`}
//             tabIndex={0}
//             aria-label="Start Your Project"
//           >
//             Start Your Project
//           </motion.a>
//           <motion.a
//             href="/work"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.97 }}
//             className={`px-8 py-3 rounded-full text-center text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${buttonSecondary}`}
//             tabIndex={0}
//             aria-label="Explore Our Work"
//           >
//             Explore Our Work
//           </motion.a>
//         </nav>
//       </motion.div>

//       {/* Right: Optimized Image Carousel */}
//       <div className="lg:w-1/2 w-full relative mt-14 lg:mt-0 z-10">
//         <div
//           className={`relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 ${shadowStrong}`}
//         >
//           <AnimatePresence mode="wait" initial={false}>
//             <motion.div
//               key={FEATURES[index].image}
//               initial={{ opacity: 0, x: 60 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -60 }}
//               transition={{ duration: 0.5, ease: 'easeInOut' }}
//               className="absolute inset-0"
//               style={{ willChange: 'opacity, transform' }}
//             >
//               <Image
//                 src={FEATURES[index].image}
//                 alt={FEATURES[index].title}
//                 fill
//                 priority={index === 0}
//                 sizes="(max-width: 1024px) 100vw, 50vw"
//                 className="object-cover w-full h-full rounded-2xl select-none"
//                 loading={index === 0 ? 'eager' : 'lazy'}
//                 draggable={false}
//               />
//               <div
//                 className={`absolute bottom-0 left-0 right-0 px-6 py-5 ${cardBg} rounded-b-2xl backdrop-blur-xl`}
//               >
//                 <h3 className="text-2xl font-semibold">
//                   {FEATURES[index].title}
//                 </h3>
//                 <p className={`text-base mt-1 ${subTextColor}`}>
//                   {FEATURES[index].description}
//                 </p>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//         {/* Carousel Dots */}
//         <nav
//           className="flex justify-center mt-8 space-x-3"
//           aria-label="Slide navigation"
//         >
//           {FEATURES.map((feat, i) => (
//             <button
//               key={feat.title}
//               onClick={() => setIndex(i)}
//               onKeyDown={(e) => handleDotKeyDown(i, e)}
//               className={`w-4 h-4 rounded-full cursor-pointer transition-all outline-none focus:ring-2 focus:ring-blue-400 ${
//                 i === index ? dotActive : dotInactive
//               }`}
//               aria-label={`Show ${feat.title} slide`}
//               aria-current={i === index}
//               tabIndex={0}
//               type="button"
//             />
//           ))}
//         </nav>
//       </div>
//     </section>
//   );
// }

'use client';
import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';

export default function HeroVideoSection() {
  const seoTitle = 'Talent With Us | Digital Innovation Experts';
  const seoDesc =
    'We build world-class digital solutions: websites, mobile apps, automation tools, and AI-driven platforms for enterprises.';

  // Optimized colors/styles for your keyboard background
  const {
    headlineGradient,
    headlineShadow,
    subTextColor,
    buttonPrimary,
    buttonSecondary,
    sectionOverlay,
    shadowStrong,
  } = useMemo(
    () => ({
      headlineGradient:
        'bg-clip-text text-transparent bg-gradient-to-r from-[#1EB8F3] to-[#0059FF]', // logo color
      headlineShadow: 'drop-shadow-lg',
      subTextColor: 'text-white drop-shadow', // for subtext
      buttonPrimary:
        'bg-gradient-to-r from-[#1EB8F3] to-[#0059FF] text-white font-semibold shadow-lg hover:from-blue-500 hover:to-blue-700',
      buttonSecondary:
        'bg-black text-white font-semibold shadow-md hover:bg-gray-900 border border-white/10',
      sectionOverlay:
        'absolute inset-0 bg-black/50', // makes text sharper and buttons pop
      shadowStrong: 'shadow-xl shadow-blue-400/40',
    }),
    []
  );

  useEffect(() => {
    const img = new window.Image();
    img.src = '/image.jpg'; // prefetch
  }, []);

  return (
    <section
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden`}
      aria-label="Hero Banner: Digital Innovation Experts"
    >
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:image" content="/image.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="Background"
          fill
          priority
          className="object-cover w-full h-full"
        />
        <div className={sectionOverlay} />
      </div>

      {/* Center Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-8 md:px-16 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className={`text-4xl md:text-6xl font-bold leading-tight mb-6 ${headlineShadow}`}>
          <span className={headlineGradient}>Digital Innovation</span>
          <br />
          <span className="text-white drop-shadow-xl">That Moves Enterprises Forward</span>
        </h1>
        <p className={`text-lg md:text-xl mb-10 ${subTextColor}`}>
          From concept to launch, we build performant, scalable, and stunning
          digital products tailored for enterprise impact.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.a
            href="/contactUs"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className={`px-8 py-3 rounded-full text-center text-lg ${buttonPrimary}`}
          >
            Start Your Project
          </motion.a>
          <motion.a
            href="/work"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className={`px-8 py-3 rounded-full text-center text-lg ${buttonSecondary}`}
          >
            Explore Our Work
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

