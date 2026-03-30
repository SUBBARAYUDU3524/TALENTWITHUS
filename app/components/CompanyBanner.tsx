'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Calendar, MessageSquare, Zap } from 'lucide-react';
import Link from 'next/link';
import ScheduleCallModal from './ScheduleCallModal';

const highlights = [
  { icon: <Zap size={14} className="text-indigo-400" />, text: 'Free consultation' },
  { icon: <Calendar size={14} className="text-cyan-400" />, text: 'Quick turnaround' },
  { icon: <MessageSquare size={14} className="text-emerald-400" />, text: 'Dedicated support' },
];

export default function CompanyBanner() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <section className="relative py-[90px] sm:py-[110px] overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
        <div className="absolute top-0 inset-x-0 h-px gradient-line" />
        <div className="absolute bottom-0 inset-x-0 h-px gradient-line" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/[0.055] rounded-full blur-[120px]" />
        </div>
        <div className="absolute inset-0 dot-pattern opacity-[0.22] pointer-events-none" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-6">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden p-8 sm:p-12 md:p-16 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(6,182,212,0.05) 50%, rgba(16,185,129,0.05) 100%)',
              border: '1px solid rgba(99,102,241,0.18)',
              boxShadow: '0 0 80px rgba(99,102,241,0.06), inset 0 0 40px rgba(99,102,241,0.03)',
            }}
          >
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-indigo-500/25 rounded-tl-[28px]" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-cyan-500/25 rounded-br-[28px]" />

            <div className="badge badge-indigo mb-6 mx-auto inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse inline-block" />
              Ready to Start?
            </div>

            <h2 className="text-[clamp(28px,5vw,54px)] font-extrabold leading-tight mb-5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              Let&apos;s Build Something{' '}
              <span className="gradient-text">Remarkable Together</span>
            </h2>

            <p className="text-[16px] max-w-[520px] mx-auto leading-relaxed mb-9" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              Tell us about your project and we'll respond within 24 hours with a tailored proposal.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-9">
              {highlights.map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ border: '1px solid var(--border-default)', background: 'var(--bg-card)' }}>
                  {icon}
                  <span className="text-[12.5px] font-medium" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
              <Link href="/contactUs">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 20px 50px rgba(99,102,241,0.50)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-[12px] text-[15px] font-semibold text-white w-full sm:w-auto"
                  style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)', boxShadow: '0 8px 28px rgba(99,102,241,0.40)' }}
                >
                  Start a Project <ArrowRight size={15} />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setModalOpen(true)}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-[12px] text-[15px] font-medium transition-colors w-full sm:w-auto"
                style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-default)', background: 'var(--bg-card)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'; }}
              >
                <Calendar size={15} /> Book a Call
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {modalOpen && <ScheduleCallModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
