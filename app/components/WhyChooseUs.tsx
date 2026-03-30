'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HeartHandshake, Shield, Target, TrendingUp, Users, Zap, CheckCircle } from 'lucide-react';

const benefits = [
  { icon: <Zap size={20} />, title: 'Fast Delivery', description: 'We ship production-ready code quickly. Agile sprints mean you see results in days, not months.', color: '#F59E0B' },
  { icon: <Shield size={20} />, title: 'Enterprise Security', description: 'Security-first architecture. OWASP standards, ISO compliance, and best practices baked in from day one.', color: '#6366F1' },
  { icon: <TrendingUp size={20} />, title: 'Scalable Architecture', description: 'Built to grow with you. Our systems handle millions of users without performance degradation.', color: '#10B981' },
  { icon: <HeartHandshake size={20} />, title: 'Dedicated Partnership', description: 'We become an extension of your team — fully committed to your success, not just deliverables.', color: '#F472B6' },
  { icon: <Users size={20} />, title: 'Expert Team', description: 'Senior engineers, designers, and strategists with 5+ years of real-world cross-industry experience.', color: '#06B6D4' },
  { icon: <Target size={20} />, title: 'Results-Driven', description: 'We measure success by your KPIs — conversion rates, revenue growth, and user retention.', color: '#A78BFA' },
];

const steps = [
  { step: '01', title: 'Discovery', desc: 'We deep-dive into your business goals and technical requirements.' },
  { step: '02', title: 'Design', desc: 'Wireframes, prototypes, and architecture blueprints before any code is written.' },
  { step: '03', title: 'Build', desc: 'Agile sprints with weekly demos so you see progress every step of the way.' },
  { step: '04', title: 'Launch', desc: 'Thorough QA, smooth deployment, and ongoing support after launch.' },
];

function Card({ b, i }: { b: (typeof benefits)[0]; i: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="p-6 rounded-[18px]" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', transition: 'all 0.3s ease' }}
      onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = b.color + '40'; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = `0 16px 40px rgba(0,0,0,0.15), 0 0 0 1px ${b.color}18`; }}
      onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = 'var(--border-subtle)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: b.color + '18', color: b.color }}>{b.icon}</div>
      <h3 className="text-[16px] font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>{b.title}</h3>
      <p className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{b.description}</p>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const [hRef, hInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [pRef, pInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section className="relative py-[100px] sm:py-[120px] overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px gradient-line" />
      <div className="absolute bottom-0 inset-x-0 h-px gradient-line" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-600/[0.045] rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-6">
        <motion.div ref={hRef} initial={{ opacity: 0, y: 30 }} animate={hInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-14">
          <div className="badge badge-cyan mb-5 mx-auto inline-flex"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />Why Choose Us</div>
          <h2 className="text-[clamp(28px,5vw,52px)] font-extrabold mb-5 leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
            Built Different. <span className="gradient-text">Delivered Better.</span>
          </h2>
          <p className="text-[16px] max-w-[500px] mx-auto leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
            We don't just build software — we build long-term partnerships that drive measurable outcomes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-20">
          {benefits.map((b, i) => <Card key={b.title} b={b} i={i} />)}
        </div>

        {/* Featured image + stats strip */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20">
          <div className="relative h-[320px] sm:h-[380px] rounded-[24px] overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=85&fit=crop" alt="Our team at work" fill className="object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.20), rgba(3,3,8,0.55))' }} />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap gap-2">
                {['Agile delivery', 'Senior engineers', 'Transparent process', '24/7 support'].map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-white backdrop-blur-sm"
                    style={{ background: 'rgba(99,102,241,0.30)', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <CheckCircle size={10} className="text-indigo-300 flex-shrink-0" /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <h3 className="text-[clamp(22px,3vw,34px)] font-extrabold leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              A Team That Treats Your Product Like Their Own
            </h3>
            <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              We don't just execute tickets — we think strategically about your product, challenge assumptions, and bring initiative to every sprint.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[{ v: '50+', l: 'Projects shipped' }, { v: '30+', l: 'Happy clients' }, { v: '5+', l: 'Years of expertise' }, { v: '99%', l: 'Satisfaction rate' }].map(s => (
                <div key={s.l} className="p-4 rounded-[14px]" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                  <div className="text-[24px] font-extrabold gradient-text mb-0.5" style={{ fontFamily: 'var(--font-jakarta)' }}>{s.v}</div>
                  <div className="text-[12px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div ref={pRef} initial={{ opacity: 0, y: 30 }} animate={pInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="text-center mb-12">
            <h3 className="text-[clamp(22px,3vw,34px)] font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>Our Proven Process</h3>
            <p className="text-[14.5px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>From idea to launch — quality at every stage.</p>
          </div>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px" style={{ background: 'var(--border-default)' }} />
            {steps.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} animate={pInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }} className="text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[18px] font-extrabold mx-auto mb-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', color: '#6366F1', fontFamily: 'var(--font-jakarta)', boxShadow: '0 0 24px rgba(99,102,241,0.10)' }}>{s.step}</div>
                <h4 className="text-[15px] font-bold mb-1.5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>{s.title}</h4>
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
