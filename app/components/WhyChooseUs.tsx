// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import {
//   Globe,
//   Shield,
//   BarChart2,
//   Cpu,
//   Zap,
//   Users,
//   Code,
//   Cloud,
// } from 'lucide-react';
// import { useInView } from 'react-intersection-observer'; // ✅ Correct import!
// import { Card, CardContent, CardHeader, CardTitle } from './card';

// const features = [
//   {
//     icon: <Globe className="h-8 w-8 text-blue-500" />,
//     title: 'Pan-India Delivery',
//     description:
//       'Our technical teams deliver scalable solutions for clients in every major city, with deep understanding of local and global business needs.',
//   },
//   {
//     icon: <Shield className="h-8 w-8 text-green-500" />,
//     title: 'Data Security First',
//     description:
//       'We implement advanced encryption, compliance (ISO 27001), and secure development practices to keep your IP and customer data safe.',
//   },
//   {
//     icon: <BarChart2 className="h-8 w-8 text-purple-500" />,
//     title: 'Business Insights',
//     description:
//       'Custom dashboards and analytics empower you with actionable insights, driving smarter decisions and higher ROI for your business.',
//   },
//   {
//     icon: <Cpu className="h-8 w-8 text-orange-500" />,
//     title: 'Modern Tech Stack',
//     description:
//       'We deliver solutions using React, Node.js, Python, AWS, Azure, and the latest cloud-native and AI technologies for superior performance.',
//   },
//   {
//     icon: <Zap className="h-8 w-8 text-yellow-500" />,
//     title: 'Rapid Deployment',
//     description:
//       'Our agile teams launch MVPs in weeks and scale products in record time, ensuring you lead the market.',
//   },
//   {
//     icon: <Users className="h-8 w-8 text-cyan-500" />,
//     title: 'Expert-Led Support',
//     description:
//       'Direct access to certified engineers and solution architects—no call center runarounds, just direct, expert help.',
//   },
//   {
//     icon: <Code className="h-8 w-8 text-pink-500" />,
//     title: 'Developer Focus',
//     description:
//       'We provide robust APIs, technical documentation, and CI/CD pipelines for seamless integration and faster innovation.',
//   },
//   {
//     icon: <Cloud className="h-8 w-8 text-indigo-500" />,
//     title: 'Flexible Cloud Options',
//     description:
//       'Choose the right deployment for you: on-premise, cloud, or hybrid, with cost optimization and automated scaling built-in.',
//   },
// ];

// const stats = [
//   {
//     value: 50,
//     display: '50+',
//     label: 'Enterprise Projects Delivered',
//     duration: 3,
//   },
//   { value: 15, display: '15', label: 'Years in Business', duration: 1.2 },
//   {
//     value: 99.98,
//     display: '99.98%',
//     label: 'Uptime Across Deployments',
//     duration: 1.5,
//     decimals: 2,
//     suffix: '%',
//   },
//   { value: 24, display: '24/7', label: 'On-Demand Support', isStatic: true },
// ];

// function AnimatedNumber({
//   value,
//   display,
//   duration = 1,
//   decimals = 0,
//   suffix = '',
//   inView,
// }: {
//   value: number;
//   display?: string;
//   duration?: number;
//   decimals?: number;
//   suffix?: string;
//   inView: boolean;
// }) {
//   const [currentValue, setCurrentValue] = useState(0);

//   useEffect(() => {
//     if (!inView) {
//       setCurrentValue(0);
//       return;
//     }
//     if (display && !/^\d+(\.\d+)?$/.test(display.replace(/[+%/]/g, ''))) {
//       return; // for "24/7" or "500+"
//     }
//     let frame: number;
//     const start = 0;
//     const end = value;
//     const startTime = performance.now();
//     function animate(now: number) {
//       const elapsed = (now - startTime) / 1000;
//       if (elapsed < duration) {
//         const progress = elapsed / duration;
//         let nextValue = start + (end - start) * progress;
//         if (decimals > 0) {
//           nextValue = parseFloat(nextValue.toFixed(decimals));
//         } else {
//           nextValue = Math.round(nextValue);
//         }
//         setCurrentValue(nextValue);
//         frame = requestAnimationFrame(animate);
//       } else {
//         setCurrentValue(end);
//       }
//     }
//     frame = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(frame);
//   }, [inView, value, duration, decimals, display]);

//   if (display && !/^\d+(\.\d+)?$/.test(display.replace(/[+%/]/g, ''))) {
//     // For 24/7 or 500+ etc., just show as text
//     return <span>{display}</span>;
//   }
//   return (
//     <span>
//       {decimals > 0 ? currentValue.toFixed(decimals) : Math.round(currentValue)}
//       {suffix}
//     </span>
//   );
// }

// function WhyChooseUs() {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   return (
//     <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
//       <div className="absolute inset-0 opacity-10 dark:opacity-5">
//         <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:100px_100px]"></div>
//       </div>
//       <div className="container px-4 mx-auto relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold text-blue-500 bg-blue-100 rounded-full">
//             PARTNER FOR GROWTH
//           </span>
//           <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
//             Why Leading Businesses Trust Us
//           </h2>
//           <p className="text-lg font-medium text-gray-700 max-w-3xl mx-auto">
//             We help businesses across India and beyond accelerate their digital
//             journey with secure, scalable, and innovative tech
//             solutions—customized for your success.
//           </p>
//         </motion.div>

//         {/* Animated Statistics */}
//         <div
//           ref={ref}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
//         >
//           {Array.isArray(stats) &&
//             stats.map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={inView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="bg-white text-center md:text-left rounded-xl shadow-lg p-6 border border-gray-100"
//               >
//                 <p className="text-3xl font-bold bg-gradient-to-r from-[#00AEEF] to-[#0052CC] bg-clip-text text-transparent mb-2">
//                   <AnimatedNumber
//                     value={stat.value}
//                     display={stat.display}
//                     duration={stat.duration}
//                     decimals={stat.decimals}
//                     suffix={stat.suffix}
//                     inView={inView}
//                   />
//                 </p>
//                 <p className="text-gray-500 dark:text-gray-500">{stat.label}</p>
//               </motion.div>
//             ))}
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {Array.isArray(features) &&
//             features.map((feature, index) => (
//               <motion.div
//                 key={feature.title}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={inView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
//                 whileHover={{ y: -5 }}
//               >
//                 <Card className="h-full text-center md:text-left transition-all hover:shadow-lg hover:border-blue-500/20 ">
//                   <CardHeader>
//                     <div className="flex items-center mx-auto md:mx-0 justify-center w-12 h-12 mb-4 rounded-lg bg-blue-50">
//                       {feature.icon}
//                     </div>
//                     <CardTitle className="text-xl font-semibold text-gray-900 ">
//                       {feature.title}
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-gray-500">{feature.description}</p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={inView ? { opacity: 1 } : {}}
//           transition={{ delay: 1.2 }}
//           className="mt-20 text-center"
//         >
//           <div className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-[#00AEEF] to-[#0052CC] rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
//             Request Consultation
//             <svg
//               className="ml-2 w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M14 5l7 7m0 0l-7 7m7-7H3"
//               ></path>
//             </svg>
//           </div>
//           <p className="mt-4 text-sm text-gray-500 ">
//             Our consultants are available 24/7 to help you plan your next big
//             move.
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// export default WhyChooseUs;

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Shield,
  BarChart2,
  Cpu,
  Zap,
  Users,
  Code,
  Cloud,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from './card';

const features = [
  {
    icon: <Globe className="h-8 w-8 text-blue-500" />,
    title: 'Pan-India Delivery',
    description:
      'Our technical teams deliver scalable solutions for clients in every major city, with deep understanding of local and global business needs.',
  },
  {
    icon: <Shield className="h-8 w-8 text-green-500" />,
    title: 'Data Security First',
    description:
      'We implement advanced encryption, compliance (ISO 27001), and secure development practices to keep your IP and customer data safe.',
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-purple-500" />,
    title: 'Business Insights',
    description:
      'Custom dashboards and analytics empower you with actionable insights, driving smarter decisions and higher ROI for your business.',
  },
  {
    icon: <Cpu className="h-8 w-8 text-orange-500" />,
    title: 'Modern Tech Stack',
    description:
      'We deliver solutions using React, Node.js, Python, AWS, Azure, and the latest cloud-native and AI technologies for superior performance.',
  },
  {
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    title: 'Rapid Deployment',
    description:
      'Our agile teams launch MVPs in weeks and scale products in record time, ensuring you lead the market.',
  },
  {
    icon: <Users className="h-8 w-8 text-cyan-500" />,
    title: 'Expert-Led Support',
    description:
      'Direct access to certified engineers and solution architects—no call center runarounds, just direct, expert help.',
  },
  {
    icon: <Code className="h-8 w-8 text-pink-500" />,
    title: 'Developer Focus',
    description:
      'We provide robust APIs, technical documentation, and CI/CD pipelines for seamless integration and faster innovation.',
  },
  {
    icon: <Cloud className="h-8 w-8 text-indigo-500" />,
    title: 'Flexible Cloud Options',
    description:
      'Choose the right deployment for you: on-premise, cloud, or hybrid, with cost optimization and automated scaling built-in.',
  },
];

const stats = [
  {
    value: 50,
    display: '50+',
    label: 'Enterprise Projects Delivered',
    duration: 3,
  },
  { value: 15, display: '15', label: 'Years in Business', duration: 1.2 },
  {
    value: 99.98,
    display: '99.98%',
    label: 'Uptime Across Deployments',
    duration: 1.5,
    decimals: 2,
    suffix: '%',
  },
  { value: 24, display: '24/7', label: 'On-Demand Support', isStatic: true },
];

function AnimatedNumber({
  value,
  display,
  duration = 1,
  decimals = 0,
  suffix = '',
  inView,
}: {
  value: number;
  display?: string;
  duration?: number;
  decimals?: number;
  suffix?: string;
  inView: boolean;
}) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCurrentValue(0);
      return;
    }
    if (display && !/^\d+(\.\d+)?$/.test(display.replace(/[+%/]/g, ''))) {
      return; // for "24/7" or "500+"
    }
    let frame: number;
    const start = 0;
    const end = value;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = (now - startTime) / 1000;
      if (elapsed < duration) {
        const progress = elapsed / duration;
        let nextValue = start + (end - start) * progress;
        if (decimals > 0) {
          nextValue = parseFloat(nextValue.toFixed(decimals));
        } else {
          nextValue = Math.round(nextValue);
        }
        setCurrentValue(nextValue);
        frame = requestAnimationFrame(animate);
      } else {
        setCurrentValue(end);
      }
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, decimals, display]);

  if (display && !/^\d+(\.\d+)?$/.test(display.replace(/[+%/]/g, ''))) {
    // For 24/7 or 500+ etc., just show as text
    return <span>{display}</span>;
  }
  return (
    <span>
      {decimals > 0 ? currentValue.toFixed(decimals) : Math.round(currentValue)}
      {suffix}
    </span>
  );
}

function WhyChooseUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative  pb-10 overflow-hidden bg-gradient-to-b from-white to-blue-50">
      <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:100px_100px]"></div>
      </div>
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold text-blue-500 bg-blue-100 rounded-full">
            PARTNER FOR GROWTH
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1EB8F3] via-[#00AEEF] to-[#0059FF] text-center">
            Why Leading Businesses Trust Us
          </h2>
          <p className="text-lg font-medium text-gray-700 max-w-3xl mx-auto text-center">
            We help businesses across India and beyond accelerate their digital journey with secure, scalable, and innovative tech solutions—customized for your success.
          </p>
        </motion.div>

        {/* Animated Statistics */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {Array.isArray(stats) &&
            stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white text-center rounded-xl shadow-lg p-6 border border-gray-100"
              >
                <p className="text-3xl font-bold bg-gradient-to-r from-[#1EB8F3] to-[#0059FF] bg-clip-text text-transparent mb-2">
                  <AnimatedNumber
                    value={stat.value}
                    display={stat.display}
                    duration={stat.duration}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                </p>
                <p className="text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 + 0.4 }}
              whileHover={{
                y: -8,
                boxShadow: "0 8px 36px 0 rgba(30,184,243,0.13)",
              }}
              className="transition-all"
            >
              <Card
                className={`h-full flex flex-col items-center justify-center text-center px-7 pt-8 pb-6 transition-all border border-gray-100 shadow-lg rounded-xl ${
                  hoveredIdx === index ? 'hover:shadow-2xl hover:border-blue-400' : ''
                }`}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <CardHeader>
                  <motion.div
                    className="flex items-center justify-center mx-auto w-16 h-16 mb-4 rounded-full bg-blue-50 transition-all"
                    animate={{
                      scale: hoveredIdx === index ? 1.13 : 1,
                      boxShadow:
                        hoveredIdx === index
                          ? "0 2px 16px 0 #1EB8F344"
                          : "0 1px 6px 0 rgba(0,0,0,0.04)",
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  <CardTitle className="text-lg font-semibold text-gray-900 text-center mb-1">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-[#1EB8F3] to-[#0059FF] rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            Request Consultation
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </div>
          <p className="mt-4 text-sm text-gray-500 ">
            Our consultants are available 24/7 to help you plan your next big move.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
