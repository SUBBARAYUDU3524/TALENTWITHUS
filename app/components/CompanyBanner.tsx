"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScheduleCallModal from "./ScheduleCallModal";

export default function CompanyBanner() {
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState("");
  const [stats, setStats] = useState({ projects: 0, clients: 0, satisfaction: 0 });

  // ✅ Lightweight clock update (optimized)
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Smooth stats animation – no heavy loops
  useEffect(() => {
    const duration = 1000;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);

      setStats({
        projects: Math.round(progress * 50),
        clients: Math.round(progress * 35),
        satisfaction: Math.round(progress * 99.8),
      });

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <section className="relative my-16 bg-black text-white py-24 px-6 sm:px-12 lg:px-20 rounded-3xl border border-white/10 overflow-hidden">

      {/* ✅ Soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-transparent to-purple-600/10" />

      {/* ✅ Lightweight patterned grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ✅ CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 max-w-6xl mx-auto text-center"
      >

        {/* ✅ LIVE CLOCK */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-mono text-cyan-300 text-sm">{time}</span>
          </div>

          <span className="px-3 py-1 bg-green-600/20 text-green-300 border border-green-600/30 text-xs rounded-full font-semibold">
            LIVE
          </span>
        </div>

        {/* ✅ TITLE */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Building Exceptional Digital Products
        </h1>

        {/* ✅ SUBTEXT */}
        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          We design and develop powerful websites, next-gen applications, and intelligent digital systems that scale with your business.
        </p>

        {/* ✅ STATS (ultra-light animation) */}
        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto my-12">
          {[
            { label: "Projects", value: stats.projects, color: "text-cyan-400" },
            { label: "Clients", value: stats.clients, color: "text-blue-400" },
            { label: "Satisfaction", value: `${stats.satisfaction}%`, color: "text-green-400" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="text-center p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"
            >
              <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
              <div className="text-sm text-gray-400">{item.label}</div>
            </motion.div>
          ))}
        </div>

        {/* ✅ CTA */}
        <motion.button
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-gradient-to-r from-cyan-500 to-blue-600 px-12 py-4 rounded-2xl text-lg font-bold shadow-xl"
        >
          Schedule a Call
        </motion.button>
      </motion.div>

      {/* ✅ MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ScheduleCallModal onClose={() => setShowModal(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
