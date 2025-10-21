import React, { useState } from "react";
import { FaCode, FaHandsHelping, FaFileAlt, FaBoxes, FaTerminal, FaRobot } from "react-icons/fa";

const FEATURES = [
  {
    icon: <FaCode />,
    title: "Websites & App Development",
    desc: "Custom, high-performance websites and mobile apps tailored for your business goals."
  },
  {
    icon: <FaHandsHelping />,
    title: "Project Support & Consultancy",
    desc: "Expert guidance and hands-on support for your ongoing or upcoming projects. We help you succeed at every step."
  },
  {
    icon: <FaFileAlt />,
    title: "PPTs, PDFs & Documentation",
    desc: "Professional presentations, detailed PDFs, and accurate documentation for your business, academics, or training needs."
  },
  {
    icon: <FaBoxes />,
    title: "End-to-End Digital Solutions",
    desc: "From ideation to deployment – we cover all your digital needs, including e-commerce, UI/UX, DevOps, AI, and more."
  },
  {
    icon: <FaTerminal />,
    title: "Contests & Code Editors",
    desc: "Participate in live coding contests and sharpen your skills with our in-browser code editors and interactive tools."
  },
  {
    icon: <FaRobot />,
    title: "AI, Data & Automation",
    desc: "Leverage smart tools, automation, and analytics to unlock new business opportunities and drive efficiency."
  }
];

export default function WhatWeDoSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="pt-5 max-w-8xl mx-auto px-4 md:px-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-[#1EB8F3] via-[#00AEEF] to-[#0059FF] tracking-tight drop-shadow-lg">
        What We Do
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, idx) => (
          <div
            key={feature.title}
            className={`relative transition-all duration-300 rounded-2xl border-2 border-transparent bg-white/95 p-9 shadow-md flex flex-col items-center text-center 
              hover:shadow-xl hover:border-[#1EB8F3]`}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            style={{ minHeight: 320 }}
          >
            <div
              className={`mb-6 flex items-center justify-center transition-all duration-300 rounded-full border-2 
                ${hovered === idx
                  ? "bg-gradient-to-br from-[#1EB8F3]/80 to-[#0059FF] border-[#1EB8F3] scale-105"
                  : "bg-gradient-to-br from-sky-50 to-white border-transparent"
                }`}
              style={{
                width: 68,
                height: 68,
                boxShadow: hovered === idx ? "0 6px 36px 0 #1EB8F322" : "0 1px 8px 0 #1EB8F311",
                color: hovered === idx ? "#fff" : "#1EB8F3",
                fontSize: 32
              }}
            >
              {feature.icon}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-cyan-800 mb-3">{feature.title}</h3>
            <p className="text-gray-700 leading-relaxed text-justify">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
