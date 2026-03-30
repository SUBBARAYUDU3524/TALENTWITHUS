'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Zap, BookOpen, Globe, Briefcase, ArrowRight } from 'lucide-react';
import OpenPositions from '../components/OpenPositions';

const values = [
  { icon: Users, label: 'Collaboration', desc: 'The best solutions come from working together across disciplines.' },
  { icon: Zap, label: 'Innovation', desc: 'We encourage bold ideas and continuous improvement every day.' },
  { icon: BookOpen, label: 'Growth Mindset', desc: 'Personal and professional development is core to every role here.' },
  { icon: Globe, label: 'Diversity & Inclusion', desc: 'We welcome talent from all backgrounds, cultures, and experiences.' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function CareersClient() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* Hero with image */}
      <section className="relative h-[68vh] min-h-[460px] flex items-center overflow-hidden">
        <div className="absolute inset-0 scale-110">
          <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=85&fit=crop" alt="Join TalentWithUs" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(3,3,8,0.85) 0%, rgba(7,7,15,0.70) 55%, rgba(3,3,8,0.92) 100%)' }} />
        </div>
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
        <div ref={heroRef} className="relative z-10 max-w-[900px] mx-auto px-5 sm:px-6 text-center w-full">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="badge badge-indigo mb-5 mx-auto inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse inline-block" />
              We're Hiring
            </div>
            <h1 className="text-[clamp(30px,5.5vw,62px)] font-extrabold leading-[1.08] mb-5 text-white">
              Join <span className="gradient-text">TalentWithUs</span>
            </h1>
            <p className="text-[17px] leading-relaxed max-w-[600px] mx-auto text-white/70">
              We're on a mission to build the next generation of digital products. Collaborate with brilliant minds, ship things you're proud of, and grow fast.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-20" style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }} />
      </section>

      {/* Values */}
      <section className="py-[80px] sm:py-[100px]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-[clamp(22px,3.5vw,40px)] font-extrabold mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              Our Culture & Values
            </h2>
            <p className="text-[15px] max-w-[480px] mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              We foster an environment where innovation thrives and every person can grow.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.label} {...fadeUp(i * 0.07)}
                className="p-6 rounded-[20px] transition-all duration-300"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.30)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(99,102,241,0.12)' }}>
                  <v.icon size={18} style={{ color: '#818CF8' }} />
                </div>
                <h3 className="text-[15px] font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>{v.label}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-[80px] sm:py-[100px]" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <div className="badge badge-indigo mb-4 mx-auto inline-flex">
              <Briefcase size={12} /> Open Roles
            </div>
            <h2 className="text-[clamp(22px,3.5vw,40px)] font-extrabold mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              Open Positions
            </h2>
            <p className="text-[15px] max-w-[480px] mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              Explore current opportunities and find the role where you'll do your best work.
            </p>
          </motion.div>
          <OpenPositions />
        </div>
      </section>

      {/* Open application CTA */}
      <section className="py-[80px] sm:py-[100px]">
        <div className="max-w-[760px] mx-auto px-5 sm:px-6">
          <motion.div {...fadeUp()} className="rounded-[28px] p-8 sm:p-12 text-center"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(99,102,241,0.12)' }}>
              <ArrowRight size={22} style={{ color: '#818CF8' }} />
            </div>
            <h2 className="text-[clamp(20px,3vw,32px)] font-extrabold mb-3"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              Don't see the right role?
            </h2>
            <p className="text-[15px] leading-relaxed mb-8 max-w-[460px] mx-auto"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              We're always looking for talented people. Send your resume and tell us how you can contribute.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:careers@talentwithus.com?subject=Open Application" className="btn-primary inline-flex items-center justify-center gap-2">
                Send Open Application <ArrowRight size={14} />
              </a>
              <span className="text-[13px] flex items-center justify-center" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                or email{' '}
                <a href="mailto:info@talentwithus.com" className="ml-1 text-indigo-400 hover:text-indigo-300 transition-colors">
                  info@talentwithus.com
                </a>
              </span>
            </div>
            <p className="text-[12px] mt-5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              We respond within 1–2 business days.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}