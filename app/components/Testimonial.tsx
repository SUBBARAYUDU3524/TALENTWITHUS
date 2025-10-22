
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from "next/image";
const TESTIMONIALS = [
  {
    name: 'Samantha Lee',
    title: 'Senior Product Manager, Google',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    companyLogo:
      'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    quote:
      'Working with this team was transformative. Their technical depth and proactive approach made our project a true success.',
    rating: 5,
    highlight: 'Matched Google’s engineering excellence.',
  },
  {
    name: 'David Chen',
    title: 'Principal Engineer, Microsoft',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    companyLogo:
      'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    quote:
      'The code quality, documentation, and delivery cadence rival the best at Microsoft. Their attention to scalability and security brought peace of mind at every step.',
    rating: 5,
    highlight: 'Enterprise-ready, world-class delivery.',
  },
  {
    name: 'Ava Patel',
    title: 'CTO, IBM',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    companyLogo:
      'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
    quote:
      'Their team thinks strategically, executes flawlessly, and communicates transparently. We achieved our goals faster than ever.',
    rating: 5,
    highlight: 'Strategic, seamless partnership.',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-40 w-[400px] h-[400px] bg-cyan-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-40 w-[400px] h-[400px] bg-fuchsia-300/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1EB8F3] via-[#00AEEF] to-[#0059FF]">
          What Industry Leaders Say
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Trusted by top engineers and executives from the world’s most innovative companies.
        </p>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4">
        {/* Avatars */}
        <div className="flex md:flex-col gap-6 md:gap-10 items-center">
          {TESTIMONIALS.map((t, idx) => (
            <motion.button
              key={t.name}
              onClick={() => setActive(idx)}
              whileHover={{ scale: 1.1 }}
              className={`relative transition-all duration-500 ${
                idx === active ? 'scale-110' : 'opacity-60 grayscale'
              }`}
              aria-label={`Select testimonial of ${t.name}`}
            >
              <div
                className={`relative rounded-full p-[3px] ${
                  idx === active
                    ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 shadow-lg shadow-blue-300/40'
                    : 'bg-gray-300/40'
                }`}
              >
             

<Image
  src={t.avatar}
  alt={t.name || "User Avatar"}
  width={80}  // corresponds roughly to w-20
  height={80} // corresponds roughly to h-20
  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
/>

               <Image
  src={t.companyLogo}
  alt={t.title || "Company Logo"}
  width={32}   // corresponds to w-8
  height={32}  // corresponds to h-8
  className="absolute -bottom-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-white rounded-full border border-gray-200 shadow"
/>
              </div>
              <span
                className={`block mt-2 text-sm font-semibold ${
                  idx === active ? 'text-blue-700' : 'text-gray-500'
                }`}
              >
                {t.name.split(' ')[0]}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Testimonial Card */}
        <div className="flex-1 min-h-[300px] px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative bg-white/70 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-lg px-10 py-12 text-center cursor-default hover:shadow-blue-500/30 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Floating glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-400/10 via-cyan-200/10 to-fuchsia-300/10 blur-2xl -z-10" />

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(TESTIMONIALS[active].rating)].map((_, i) => (
                  <StarIcon key={i} className="h-6 w-6 text-amber-400" />
                ))}
              </div>

              {/* Highlight */}
              <span className="inline-block text-xs tracking-wider uppercase font-semibold px-4 py-1 mb-4 rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-500 text-white">
                {TESTIMONIALS[active].highlight}
              </span>

              {/* Quote */}
              <blockquote className="text-lg md:text-2xl text-gray-900 font-medium italic leading-relaxed mb-6">
                “{TESTIMONIALS[active].quote}”
              </blockquote>

              {/* Name + Title */}
              <div>
                <p className="font-bold text-lg text-blue-700">
                  {TESTIMONIALS[active].name}
                </p>
                <p className="text-gray-700 text-sm">{TESTIMONIALS[active].title}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dots (mobile) */}
      <div className="flex justify-center mt-10 md:hidden">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            className={`mx-1 w-3 h-3 rounded-full transition-all duration-300 ${
              i === active
                ? 'bg-fuchsia-500 scale-110'
                : 'bg-gray-400 opacity-60'
            }`}
            onClick={() => setActive(i)}
            aria-label={`Select testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
