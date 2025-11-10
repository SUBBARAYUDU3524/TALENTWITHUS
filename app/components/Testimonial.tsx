"use client";

import { motion } from "framer-motion";
import React from "react";

const testimonials = [
  {
    name: "Harika K",
    role: "B.Tech CSE • Sri Venkateswara University",
    text: "Talent With Us transformed the way we learn. The AI-powered quizzes and clean UI helped our entire class understand concepts faster.",
  },
  {
    name: "Lakshmamma R",
    role: "Owner • Lakshmi Kirana Store, Kadapa",
    text: "Our kirana shop went online with a smooth and beautiful app. Daily orders increased, and customers loved the simple design!",
  },
  {
    name: "Ritika Jain",
    role: "Co-Founder • UrbanStyle Fashion Store, Bengaluru",
    text: "Their team delivered a world-class platform with modern 3D visuals and perfect performance. It helped us stand out and look premium.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 overflow-hidden bg-black">
      {/* Soft glowing background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(circle at center, #0ea5e9 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-4xl md:text-5xl font-extrabold text-white mb-16"
        >
          What People Say About Us
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-900/30 to-cyan-900/20 
                        border border-cyan-500/30 backdrop-blur-xl shadow-2xl"
              style={{
                boxShadow:
                  "0 0 30px rgba(56, 189, 248, 0.15), inset 0 0 20px rgba(59, 130, 246, 0.10)",
              }}
            >
              {/* Glow orb floating inside card */}
              <motion.div
                animate={{
                  x: [0, 10, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-3 right-4 w-3 h-3 rounded-full bg-cyan-400 blur-[2px]"
              />

              <p className="text-gray-200 text-lg leading-relaxed mb-6">
                “{item.text}”
              </p>

              <div>
                <p className="font-semibold text-cyan-400 text-lg">
                  {item.name}
                </p>
                <p className="text-gray-400 text-sm">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
