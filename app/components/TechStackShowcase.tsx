"use client";

import { memo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

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
} from "react-icons/fa";
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
} from "react-icons/si";

// ✅ Clean, curated color map for glow effects
const iconColorMap = {
  React: "#61DAFB",
  "Next.js": "#ffffff",
  "Tailwind CSS": "#38BDF8",
  "Node.js": "#339933",
  "Express.js": "#ffffff",
  MongoDB: "#47A248",
  Redux: "#764ABC",
  TypeScript: "#3178C6",
  Git: "#F05032",
  GitHub: "#ffffff",
  Java: "#007396",
  Python: "#3776AB",
  HTML5: "#E34F26",
  CSS3: "#1572B6",
  GraphQL: "#E10098",
  Firebase: "#FFCA28",
  MySQL: "#4479A1",
  PostgreSQL: "#4169E1",
  AWS: "#FF9900",
  Docker: "#2496ED",
};

const techIconsRowOne = [
  { icon: FaReact, label: "React" },
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiTailwindcss, label: "Tailwind CSS" },
  { icon: FaNodeJs, label: "Node.js" },
  { icon: SiExpress, label: "Express.js" },
  { icon: SiMongodb, label: "MongoDB" },
  { icon: SiRedux, label: "Redux" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: FaGitAlt, label: "Git" },
  { icon: FaGithub, label: "GitHub" },
];

const techIconsRowTwo = [
  { icon: FaJava, label: "Java" },
  { icon: FaPython, label: "Python" },
  { icon: FaHtml5, label: "HTML5" },
  { icon: FaCss3Alt, label: "CSS3" },
  { icon: SiGraphql, label: "GraphQL" },
  { icon: SiFirebase, label: "Firebase" },
  { icon: SiMysql, label: "MySQL" },
  { icon: SiPostgresql, label: "PostgreSQL" },
  { icon: FaAws, label: "AWS" },
  { icon: FaDocker, label: "Docker" },
];

// ✅ Super-light marquee (only 1 transform animation)
const MarqueeRow = ({ icons, reverse }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewRef, inView] = useInView({ threshold: 0.2 });

  return (
    <div
      ref={inViewRef}
      className="relative overflow-hidden py-4 select-none"
    >
      {/* Soft fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-900 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-900 to-transparent z-10" />

      <motion.div
        className={`flex gap-12 whitespace-nowrap ${reverse ? "flex-row-reverse" : ""}`}
        animate={inView ? { x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] } : {}}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...icons, ...icons].map(({ icon: Icon, label }, i) => {
          const color = iconColorMap[label];
          return (
            <motion.div
              key={i}
              className="relative flex flex-col items-center"
              whileHover={{
                scale: 1.25,
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
            >
              <div
                className="p-4 rounded-2xl bg-gray-800/40 border border-gray-700/40 backdrop-blur-sm"
                style={{
                  color,
                  boxShadow: `0 0 15px ${color}40`,
                }}
              >
                <Icon className="text-5xl" />
              </div>

              <motion.span
                className="absolute top-full mt-2 text-white text-sm px-2 py-1 rounded bg-gray-900/80 border border-gray-700"
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
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
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // ✅ Lightweight mouse glow (only updates 20 times/sec)
  useEffect(() => {
    let timeout: any;
    const handler = (e: MouseEvent) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setMouse({ x: e.clientX, y: e.clientY });
      }, 16);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-br from-gray-900 via-black to-slate-900 py-24 px-6 overflow-hidden"
    >
      {/* ✅ Soft animated BG glows (GPU-only) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 blur-3xl animate-pulse delay-500" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#fff1 1px, transparent 1px),linear-gradient(90deg,#fff1 1px,transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* ✅ Mouse glow */}
      <motion.div
        className="pointer-events-none absolute w-80 h-80 rounded-full bg-cyan-500/10 blur-2xl"
        animate={{ x: mouse.x - 150, y: mouse.y - 150 }}
        transition={{ type: "tween", duration: 0.3 }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ✅ Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            Technologies We Master
          </h2>

          <p className="text-lg text-gray-300 mt-6 max-w-2xl mx-auto">
            Building next-generation digital experiences using state-of-the-art
            technologies.
          </p>
        </motion.div>

        {/* ✅ Marquee Rows */}
        <MarqueeRow icons={techIconsRowOne} />
        <MarqueeRow icons={techIconsRowTwo} reverse />

        {/* ✅ CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <Link href="/whatwedo">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(6,182,212,0.25)",
              }}
              className="px-12 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-xl"
            >
              Explore Full Repository
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(TechStackShowcase);
