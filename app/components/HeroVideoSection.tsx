'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Cpu, Globe, Zap, Shield, BarChart3, Smartphone } from 'lucide-react';

const stats = [
  { value: '50+', label: 'Projects Delivered', color: '#6366F1' },
  { value: '30+', label: 'Happy Clients', color: '#06B6D4' },
  { value: '5+', label: 'Years Experience', color: '#10B981' },
  { value: '99%', label: 'Satisfaction Rate', color: '#F59E0B' },
];

const features = ['AI & Machine Learning', 'Web & Mobile Apps', 'Cloud Infrastructure', 'UI/UX Design'];

// Floating service cards — like Linear's feature showcase
const floatingCards = [
  {
    id: 1, icon: Zap, label: 'AI Integration', sub: 'GPT-4 · LangChain · TensorFlow',
    color: '#818CF8', bg: 'rgba(99,102,241,0.10)', x: '-52%', y: '8%', delay: 0,
  },
  {
    id: 2, icon: Globe, label: 'Web Development', sub: 'Next.js · React · TypeScript',
    color: '#06B6D4', bg: 'rgba(6,182,212,0.10)', x: '52%', y: '8%', delay: 0.3,
  },
  {
    id: 3, icon: Smartphone, label: 'Mobile Apps', sub: 'React Native · Flutter · iOS',
    color: '#F472B6', bg: 'rgba(244,114,182,0.10)', x: '-58%', y: '62%', delay: 0.6,
  },
  {
    id: 4, icon: BarChart3, label: 'Cloud & DevOps', sub: 'AWS · Docker · Kubernetes',
    color: '#34D399', bg: 'rgba(52,211,153,0.10)', x: '58%', y: '62%', delay: 0.9,
  },
  {
    id: 5, icon: Shield, label: 'Enterprise Security', sub: 'OWASP · ISO · Compliance',
    color: '#F59E0B', bg: 'rgba(245,158,11,0.10)', x: '-62%', y: '118%', delay: 1.2,
  },
  {
    id: 6, icon: Cpu, label: 'Digital Transform', sub: 'Strategy · Migration · Scale',
    color: '#A78BFA', bg: 'rgba(167,139,250,0.10)', x: '62%', y: '118%', delay: 1.5,
  },
];

function FloatCard({ card, visible }: { card: typeof floatingCards[0]; visible: boolean }) {
  const Icon = card.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 20 }}
      animate={visible ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay: card.delay + 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute hidden lg:flex items-center gap-3 px-4 py-3 rounded-2xl pointer-events-none select-none"
      style={{
        left: '50%', top: '50%',
        transform: `translate(${card.x}, ${card.y})`,
        background: 'rgba(7,7,15,0.85)',
        border: `1px solid ${card.color}30`,
        backdropFilter: 'blur(16px)',
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${card.color}15, inset 0 1px 0 rgba(255,255,255,0.05)`,
        minWidth: 200,
        zIndex: 10,
      }}
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: card.bg }}>
        <Icon size={15} style={{ color: card.color }} />
      </div>
      <div>
        <div className="text-[12.5px] font-semibold leading-none mb-1" style={{ color: '#F1F5F9', fontFamily: 'var(--font-jakarta)' }}>
          {card.label}
        </div>
        <div className="text-[10.5px]" style={{ color: '#64748B', fontFamily: 'var(--font-inter)' }}>
          {card.sub}
        </div>
      </div>
      {/* Pulse dot */}
      <div className="w-1.5 h-1.5 rounded-full ml-auto flex-shrink-0 animate-pulse" style={{ background: card.color }} />
    </motion.div>
  );
}

// Animated connecting lines (SVG background layer)
function GridLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.35 }}>
      <defs>
        <radialGradient id="fadeCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(99,102,241,0.15)" />
          <stop offset="70%" stopColor="rgba(99,102,241,0.04)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(99,102,241,0.08)" strokeWidth="0.5" />
        </pattern>
        <pattern id="grid" width="200" height="200" patternUnits="userSpaceOnUse">
          <rect width="200" height="200" fill="url(#smallGrid)" />
          <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(99,102,241,0.12)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <rect width="100%" height="100%" fill="url(#fadeCenter)" />
    </svg>
  );
}

// Cycling headline words
const cyclingWords = ['Remarkable.', 'Scalable.', 'Intelligent.', 'Impactful.'];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [visible, setVisible] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -70]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    setVisible(true);
    const iv = setInterval(() => setWordIdx(i => (i + 1) % cyclingWords.length), 2800);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const fade = {
    hidden: { opacity: 0, y: 28 },
    show: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#030308' }}
    >
      {/* Grid + glow background */}
      <GridLines />

      {/* Radial glow that follows mouse */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(99,102,241,0.14) 0%, transparent 70%)`,
        }}
      />

      {/* Static ambient orbs */}
      <div className="absolute pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] -top-32 -left-32"
          style={{ background: 'rgba(99,102,241,0.07)' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] -bottom-20 -right-20"
          style={{ background: 'rgba(6,182,212,0.06)' }} />
      </div>

      {/* Top + bottom edge fades */}
      <div className="absolute top-0 inset-x-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #030308, transparent)' }} />
      <div className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #030308, transparent)' }} />

      {/* Floating service cards (desktop only) */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingCards.map(card => (
          <FloatCard key={card.id} card={card} visible={visible} />
        ))}
      </div>

      {/* Center content */}
      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-[900px] mx-auto px-5 sm:px-6 pt-24 pb-20 md:pt-32 md:pb-28 text-center">

        {/* Eyebrow badge */}
        <motion.div variants={fade} initial="hidden" animate="show" custom={0} className="mb-7 inline-flex">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12.5px] font-medium"
            style={{ background: 'rgba(99,102,241,0.10)', border: '1px solid rgba(99,102,241,0.22)', color: '#A5B4FC', fontFamily: 'var(--font-inter)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse inline-block" />
            Trusted by 30+ companies across 4 continents
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={fade} initial="hidden" animate="show" custom={1}
          className="font-extrabold leading-[1.04] tracking-[-0.035em] mb-4"
          style={{ fontSize: 'clamp(40px,8vw,88px)', fontFamily: 'var(--font-jakarta)', color: '#F1F5F9' }}
        >
          We Build Digital<br />
          Products That Are{' '}
          <span className="relative inline-block">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="gradient-text inline-block"
              >
                {cyclingWords[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={fade} initial="hidden" animate="show" custom={2}
          className="max-w-[560px] mx-auto leading-relaxed mb-8"
          style={{ fontSize: 'clamp(15px,2vw,18px)', color: '#64748B', fontFamily: 'var(--font-inter)' }}
        >
          From AI-powered applications to enterprise platforms — we craft digital experiences that drive real growth and keep users coming back.
        </motion.p>

        {/* Feature pills */}
        <motion.div variants={fade} initial="hidden" animate="show" custom={3}
          className="flex flex-wrap justify-center gap-2 mb-10">
          {features.map(f => (
            <span key={f} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12.5px]"
              style={{ color: '#94A3B8', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', fontFamily: 'var(--font-inter)' }}>
              <CheckCircle2 size={11} className="text-indigo-400 flex-shrink-0" /> {f}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fade} initial="hidden" animate="show" custom={4}
          className="flex flex-col sm:flex-row gap-3.5 justify-center mb-20">
          <Link href="/contactUs">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 20px 50px rgba(99,102,241,0.50)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-[12px] text-[15px] font-semibold text-white w-full sm:w-auto"
              style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)', boxShadow: '0 8px 24px rgba(99,102,241,0.35)' }}
            >
              Start Your Project <ArrowRight size={15} />
            </motion.button>
          </Link>
          <Link href="/case-studies">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-[12px] text-[15px] font-medium w-full sm:w-auto"
              style={{ color: '#94A3B8', border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.03)' }}
            >
              View Our Work
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fade} initial="hidden" animate="show" custom={5}>
          <div className="gradient-line mb-8 opacity-50" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10">
            {stats.map(({ value, label, color }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center">
                <div className="font-extrabold leading-none mb-1.5"
                  style={{ fontSize: 'clamp(28px,5vw,44px)', color, fontFamily: 'var(--font-jakarta)' }}>
                  {value}
                </div>
                <div className="text-[12px] font-medium"
                  style={{ color: '#64748B', fontFamily: 'var(--font-inter)' }}>
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-widest uppercase" style={{ color: '#475569' }}>Scroll</span>
        <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, #475569, transparent)' }} />
      </motion.div>
    </section>
  );
}
