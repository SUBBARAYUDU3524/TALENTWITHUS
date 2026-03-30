'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

const testimonials = [
  { quote: "TalentWithUs transformed our outdated platform into a modern AI-powered product in just 3 months. The quality of code and attention to detail was unlike anything we'd experienced before.", name: 'Rajesh Kumar', role: 'CTO', company: 'FinanceHub India', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', grad: 'from-indigo-500 to-purple-600' },
  { quote: "From zero to 50,000 users in 6 months. The team didn't just build what we asked for — they challenged our thinking and helped us build something far better than our original vision.", name: 'Sarah Chen', role: 'Founder & CEO', company: 'GrowthOS', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', grad: 'from-cyan-500 to-blue-600' },
  { quote: "Their AI integration work was exceptional. What would have taken our in-house team a year, they delivered in 8 weeks with rock-solid quality. Highly recommended.", name: 'Mohammed Al-Hassan', role: 'VP Engineering', company: 'TechCore MENA', avatar: 'https://randomuser.me/api/portraits/men/75.jpg', grad: 'from-emerald-500 to-teal-600' },
  { quote: "Communication was flawless, deadlines always met, and the final product exceeded expectations. They genuinely care about your outcomes, not just writing code.", name: 'Priya Sharma', role: 'Product Director', company: 'ShopFast', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', grad: 'from-amber-500 to-orange-600' },
  { quote: "The mobile app they built has a 4.9-star rating on the App Store. Users love it. The UX attention, performance optimisation, and smooth animations — all top-tier.", name: 'James Wilson', role: 'COO', company: 'WealthTrack', avatar: 'https://randomuser.me/api/portraits/men/56.jpg', grad: 'from-violet-500 to-pink-600' },
  { quote: "We interviewed 8 agencies before choosing TalentWithUs. Best decision we made. Their technical depth, honest timelines, and execution quality are simply outstanding.", name: 'Ananya Patel', role: 'CEO', company: 'MediConnect', avatar: 'https://randomuser.me/api/portraits/women/12.jpg', grad: 'from-rose-500 to-red-600' },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ t, i }: { t: (typeof testimonials)[0]; i: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative p-6 sm:p-7 rounded-[20px] flex flex-col gap-4 h-full"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', transition: 'all 0.3s ease' }}
      onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = 'rgba(99,102,241,0.30)'; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 20px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(99,102,241,0.10)'; }}
      onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = 'var(--border-subtle)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
    >
      <div className="flex items-start justify-between">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(99,102,241,0.12)', color: '#818CF8' }}>
          <Quote size={16} />
        </div>
        <Stars />
      </div>
      <blockquote className="text-[14px] leading-relaxed flex-1" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
          <Image src={t.avatar} alt={t.name} fill className="object-cover" />
        </div>
        <div>
          <div className="text-[13.5px] font-semibold leading-none mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>{t.name}</div>
          <div className="text-[11.5px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{t.role} · {t.company}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonial() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <section className="relative py-[100px] sm:py-[120px] overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute inset-0 grid-pattern opacity-35 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px gradient-line" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-indigo-600/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-14">
          <div className="badge badge-indigo mb-5 mx-auto inline-flex"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />Client Stories</div>
          <h2 className="text-[clamp(28px,5vw,52px)] font-extrabold mb-5 leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
            What Our Clients <span className="gradient-text">Say About Us</span>
          </h2>
          <p className="text-[16px] max-w-[460px] mx-auto leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
            Don't take our word for it — hear directly from the teams we've worked with.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((t, i) => <Card key={t.name} t={t} i={i} />)}
        </div>
      </div>
    </section>
  );
}
