'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients' },
  { value: '5+', label: 'Years Experience' },
  { value: '99%', label: 'Satisfaction Rate' },
];

const cyclingWords = ['Remarkable', 'Scalable', 'Intelligent', 'Impactful'];

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 700], [0, 120]);
  const contentY = useTransform(scrollY, [0, 600], [0, -60]);
  const fadeOut = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const iv = setInterval(() => setWordIdx(i => (i + 1) % cyclingWords.length), 2800);
    return () => clearInterval(iv);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#030308' }}>

      {/* ── Parallax background image ── */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=90&fit=crop"
          alt=""
          fill
          priority
          quality={90}
          className="object-cover object-center"
        />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(3,3,8,0.97) 0%, rgba(3,3,8,0.80) 50%, rgba(3,3,8,0.70) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(3,3,8,1) 0%, transparent 40%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
      </motion.div>

      {/* ── Subtle grid overlay ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.25 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hgrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hgrid)" />
        </svg>
      </div>

      {/* ── Content ── */}
      <motion.div
        style={{ y: contentY, opacity: fadeOut }}
        className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-24"
      >
        <div className="max-w-[720px]">


          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold leading-[1.06] tracking-[-0.04em] mb-6"
            style={{ fontSize: 'clamp(42px,6.5vw,82px)', fontFamily: 'var(--font-jakarta)', color: '#F1F5F9' }}
          >
            We Build Digital<br />Products That Are<br />
            <span className="relative inline-block h-[1.1em] overflow-hidden align-bottom" style={{ minWidth: '6ch' }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIdx}
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: '-100%' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="gradient-text absolute left-0 whitespace-nowrap"
                >
                  {cyclingWords[wordIdx]}.
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 leading-relaxed max-w-[520px]"
            style={{ fontSize: 'clamp(15px,1.8vw,17px)', color: '#64748B', fontFamily: 'var(--font-inter)' }}
          >
            From AI-powered applications to enterprise platforms — we craft digital experiences that drive real growth.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link href="/contactUs">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 20px 50px rgba(99,102,241,0.55)' }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-7 py-4 rounded-[12px] text-[14.5px] font-semibold text-white"
                style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)', boxShadow: '0 8px 28px rgba(99,102,241,0.40)' }}
              >
                Start Your Project <ArrowRight size={15} />
              </motion.button>
            </Link>
            <Link href="/case-studies">
              <motion.button
                whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.20)' }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-4 rounded-[12px] text-[14.5px] font-medium"
                style={{ color: '#94A3B8', border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.04)' }}
              >
                View Case Studies <ArrowUpRight size={14} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-px mb-8" style={{ background: 'linear-gradient(to right, rgba(99,102,241,0.4), rgba(6,182,212,0.3), transparent)' }} />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-8">
              {stats.map(({ value, label }, i) => (
                <motion.div key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.56 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="font-extrabold leading-none mb-1 gradient-text"
                    style={{ fontSize: 'clamp(26px,4vw,40px)', fontFamily: 'var(--font-jakarta)' }}>
                    {value}
                  </div>
                  <div className="text-[12px] font-medium" style={{ color: '#475569', fontFamily: 'var(--font-inter)' }}>
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Right side image accent (desktop) ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-0 bottom-0 hidden xl:block w-[44%] pointer-events-none"
      >
        {/* Floating metric card */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[22%] right-16 rounded-2xl px-5 py-4"
          style={{
            background: 'rgba(7,7,15,0.80)',
            border: '1px solid rgba(99,102,241,0.20)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#6366F1' }}>Project Success Rate</div>
          <div className="flex items-end gap-2">
            <span className="text-[36px] font-extrabold" style={{ color: '#F1F5F9', fontFamily: 'var(--font-jakarta)', lineHeight: 1 }}>99%</span>
            <span className="text-[12px] mb-1" style={{ color: '#34D399' }}>↑ on-time delivery</span>
          </div>
          <div className="mt-3 flex gap-1">
            {[85, 100, 92, 100, 97, 100, 99].map((v, i) => (
              <div key={i} className="w-4 rounded-sm" style={{ height: `${v * 0.28}px`, background: i === 5 ? '#6366F1' : 'rgba(99,102,241,0.25)' }} />
            ))}
          </div>
        </motion.div>

        {/* Floating tech card */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[28%] right-24 rounded-2xl px-5 py-4"
          style={{
            background: 'rgba(7,7,15,0.80)',
            border: '1px solid rgba(6,182,212,0.18)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <div className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: '#06B6D4' }}>Tech Stack</div>
          <div className="flex flex-wrap gap-2">
            {['Next.js', 'React', 'AI/ML', 'AWS', 'Flutter'].map(t => (
              <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-medium"
                style={{ background: 'rgba(6,182,212,0.10)', color: '#67E8F9', border: '1px solid rgba(6,182,212,0.15)' }}>
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
          <motion.div
            animate={{ y: [0, 10, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1.5 rounded-full" style={{ background: '#6366F1' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
