import React, { useState } from "react";
import { FaRocket, FaBullseye, FaGlobeAmericas } from "react-icons/fa";

const BOXES = [
  {
    icon: <FaRocket />,
    title: "Who We Are",
    desc: "Talent With Us is a passionate collective of developers, designers, strategists, and technologists. We drive digital transformation for businesses of all sizes, prioritizing innovation, reliability, and client success above all.",
    accent: "from-[#09c6f9] to-[#045de9]",
    ring: "ring-cyan-300"
  },
  {
    icon: <FaBullseye />,
    title: "Our Mission",
    desc: "To deliver transformative digital solutions, foster growth, and create lasting value through innovative products, seamless integrations, and dedicated project support.",
    accent: "from-[#1EB8F3] to-[#0059FF]",
    ring: "ring-blue-400"
  },
  {
    icon: <FaGlobeAmericas />,
    title: "Our Vision",
    desc: "To be a global leader in digital innovation, empowering our clients to set new standards in their industries and inspiring progress through technology.",
    accent: "from-[#51e8f6] to-[#348AC7]",
    ring: "ring-blue-400"
  },
];

export default function WhoWeAreSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="max-w-8xl mx-auto px-5 md:px-12 flex flex-col py-0">
      <div className="grid gap-10 md:grid-cols-3">
        {BOXES.map((box, idx) => (
          <div
            key={box.title}
            className={`transition-all duration-300 rounded-2xl border-2 border-transparent bg-white/95 p-8 shadow-md flex flex-col items-center text-center
            hover:shadow-xl hover:border-cyan-400 w-full md:min-w-[340px] md:max-w-[380px] mx-auto`}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            style={{ minHeight: 340 }}
          >
            <div
              className={`mb-5 mt-2 flex items-center justify-center rounded-full h-20 w-20 text-4xl transition-all duration-300 border-4
                ${hovered === idx
                  ? "scale-110 shadow-xl border-transparent bg-gradient-to-br " + box.accent + " text-white"
                  : "bg-gradient-to-br from-sky-50 to-white text-cyan-600 border-cyan-100"
                }`}
              style={{ boxShadow: hovered === idx ? "0 4px 36px 0 #1EB8F322" : undefined }}
            >
              {box.icon}
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-cyan-700 mb-4 flex items-center justify-center gap-2">
              <span>{box.title}</span>
            </h3>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg text-justify">
  {box.desc}
</p>

          </div>
        ))}
      </div>
    </div>
  );
}
