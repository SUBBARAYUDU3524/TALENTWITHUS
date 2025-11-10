"use client";

import { memo, useMemo, } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ArrowPathIcon,
  CpuChipIcon,
  ServerIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

// ✅ Pure static data (never re-renders)
const SERVICES = [
  {
    title: "Web Development",
    description:
      "High-performance websites with modern tech stacks and cutting-edge 3D animations.",
    icon: CodeBracketIcon,
    gradient: "from-purple-500 to-cyan-500",
  },
  {
    title: "Mobile Applications",
    description: "iOS & Android apps with flawless UX and native performance.",
    icon: DevicePhoneMobileIcon,
    gradient: "from-blue-500 to-emerald-500",
  },
  {
    title: "Automation Tools",
    description: "AI-powered solutions to streamline and optimize workflows.",
    icon: ArrowPathIcon,
    gradient: "from-green-500 to-teal-500",
  },
  {
    title: "AI Models",
    description:
      "Custom machine learning models tailored to your business needs.",
    icon: CpuChipIcon,
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure with enterprise-grade security.",
    icon: ServerIcon,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "UI/UX Design",
    description:
      "Immersive interfaces with intuitive experiences and micro-interactions.",
    icon: RocketLaunchIcon,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Security & Support",
    description: "24/7 monitoring and protection for your digital assets.",
    icon: ShieldCheckIcon,
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    title: "Consulting",
    description:
      "Strategic guidance for your digital transformation journey.",
    icon: GlobeAltIcon,
    gradient: "from-cyan-500 to-sky-500",
  },
];

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
  hover: {
    y: -6,
    scale: 1.03,
    rotateX: 2,
    rotateY: -2,
    transition: { duration: 0.25 },
  },
};

const SECTION_VARIANTS = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

function WhatWeDoComponent() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const services = useMemo(() => SERVICES, []);

  return (
    <section
      id="services"
      ref={ref}
      className="py-20 relative bg-gradient-to-br from-gray-900 via-black to-slate-900 overflow-hidden"
    >
      {/* ✅ Lightweight animated backdrop (GPU-friendly) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.13]">
        <div className="absolute top-10 left-1/3 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-purple-500/10 blur-3xl animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          variants={SECTION_VARIANTS}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            Our Digital Services
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mt-4 max-w-3xl mx-auto">
            Transformative solutions powered by cutting-edge technology &
            exceptional design.
          </p>

          <div className="flex justify-center mt-6 space-x-3">
            <div className="h-1 w-20 bg-cyan-500 rounded-full" />
            <div className="h-1 w-6 bg-blue-500 rounded-full" />
            <div className="h-1 w-20 bg-purple-500 rounded-full" />
          </div>
        </motion.div>

        {/* ✅ Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                custom={index}
                variants={CARD_VARIANTS}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                className="group relative p-7 rounded-2xl bg-gray-800/40 backdrop-blur-md border border-gray-700/40 hover:border-cyan-400/40 transition-all duration-300"
              >
                {/* ✅ Light Glow (very optimized) */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-15 bg-gradient-to-br ${service.gradient} transition-opacity duration-300`}
                />

                {/* ✅ Icon */}
                <div
                  className={`p-4 inline-flex rounded-xl bg-gradient-to-br ${service.gradient} text-white shadow-lg mb-6`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                {/* ✅ Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-all">
                  {service.title}
                </h3>

                {/* ✅ Description */}
                <p className="text-gray-400 group-hover:text-gray-300 transition-all leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ✅ CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            className="px-10 py-4 text-lg rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-xl hover:shadow-cyan-500/30 transition-all"
          >
            Start Your Project Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(WhatWeDoComponent);
