'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Zap, Globe, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';

const values = [
  { icon: Target, label: 'Mission-Driven', desc: 'Every line of code serves a purpose — delivering real business impact.', color: '#6366F1' },
  { icon: Zap, label: 'Move Fast', desc: 'Agile by nature, we ship quality products at speed without cutting corners.', color: '#06B6D4' },
  { icon: Globe, label: 'Global Mindset', desc: 'We build products that scale across markets, cultures, and time zones.', color: '#34D399' },
  { icon: Users, label: 'People First', desc: 'Great software starts with great teams — we invest in both.', color: '#F59E0B' },
  { icon: Award, label: 'Excellence', desc: 'We hold ourselves to the highest standard in engineering and design.', color: '#EC4899' },
];

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Clients Worldwide' },
  { value: '5+', label: 'Years in Tech' },
  { value: '99%', label: 'Satisfaction Rate' },
];

const timeline = [
  { year: '2019', title: 'Founded', desc: 'Started as a small dev shop with a big vision: make enterprise-grade tech accessible to startups.', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=480&q=80&fit=crop' },
  { year: '2021', title: 'Scaled Up', desc: 'Grew to a cross-functional team across web, mobile, cloud, and AI disciplines.', img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=480&q=80&fit=crop' },
  { year: '2023', title: 'AI Focus', desc: 'Pivoted into AI integration services — helping clients embed intelligent automation into their products.', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=480&q=80&fit=crop' },
  { year: '2024', title: 'Global Reach', desc: 'Serving clients across India, US, UK, and Southeast Asia with distributed delivery teams.', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=480&q=80&fit=crop' },
];

const highlights = [
  'Custom software for startups & enterprises',
  'AI & ML integration specialists',
  'Mobile-first design philosophy',
  'Cloud-native architecture',
  'Dedicated project management',
  '24/7 post-launch support',
];

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function AboutClient() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 140]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div style={{ background: 'var(--bg-primary)' }}>

      {/* ── Hero with parallax image ── */}
      <section className="relative h-[70vh] min-h-[480px] flex items-center overflow-hidden">
        {/* Parallax BG */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=85&fit=crop"
            alt="TalentWithUs team"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(3,3,8,0.85) 0%, rgba(7,7,15,0.72) 60%, rgba(3,3,8,0.90) 100%)' }} />
        </motion.div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-[1000px] mx-auto px-5 sm:px-6 text-center w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="badge badge-indigo mb-5 mx-auto inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse inline-block" />
              Our Story
            </div>
            <h1 className="text-[clamp(32px,6vw,68px)] font-extrabold leading-[1.08] mb-6 text-white">
              We Build Tech That <span className="gradient-text">Matters</span>
            </h1>
            <p className="text-[17px] sm:text-[18px] leading-relaxed max-w-[640px] mx-auto text-white/70">
              TalentWithUs is a tech services studio specializing in scalable web & mobile products, AI integrations, and cloud infrastructure.
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 inset-x-0 h-24" style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }} />
      </section>

      {/* ── Stats ── */}
      <section className="py-16" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.07} className="text-center">
                <div className="text-[clamp(32px,5vw,52px)] font-extrabold gradient-text mb-1" style={{ fontFamily: 'var(--font-jakarta)' }}>{s.value}</div>
                <div className="text-[13.5px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{s.label}</div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission — two-col with image ── */}
      <section className="py-[80px] sm:py-[110px]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <FadeUp>
            <div className="badge badge-indigo mb-5 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse inline-block" />
              What We Stand For
            </div>
            <h2 className="text-[clamp(26px,4vw,44px)] font-extrabold leading-tight mb-5"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              Our Mission & Vision
            </h2>
            <p className="text-[15.5px] leading-[1.85] mb-5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
              We exist to democratize access to world-class software engineering. Whether you're a seed-stage startup or an enterprise migrating to the cloud, we bring the same dedication: thoughtful architecture, clean code, and tangible results.
            </p>
            <p className="text-[15.5px] leading-[1.85] mb-8" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
              Our vision: every business — regardless of size — can harness the power of AI and modern software to grow and lead.
            </p>
            <ul className="space-y-2.5 mb-8">
              {highlights.map(h => (
                <li key={h} className="flex items-center gap-2.5 text-[14px]" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
                  <CheckCircle size={15} style={{ color: '#34D399', flexShrink: 0 }} /> {h}
                </li>
              ))}
            </ul>
            <Link href="/contactUs" className="btn-primary inline-flex items-center gap-2">
              Work With Us <ArrowRight size={15} />
            </Link>
          </FadeUp>

          {/* Image grid */}
          <FadeUp delay={0.12}>
            <div className="grid grid-cols-2 gap-3 h-[460px]">
              <div className="relative rounded-[20px] overflow-hidden row-span-2">
                <Image src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=85&fit=crop" alt="Team working" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="relative rounded-[20px] overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80&fit=crop" alt="AI development" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="relative rounded-[20px] overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80&fit=crop" alt="Collaboration" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Values grid ── */}
      <section className="py-[80px] sm:py-[100px]" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6">
          <FadeUp className="text-center mb-12">
            <h2 className="text-[clamp(22px,3.5vw,40px)] font-extrabold mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              Our Core Values
            </h2>
            <p className="text-[15px] max-w-[440px] mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              The principles that guide every decision we make.
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <FadeUp key={v.label} delay={i * 0.06}>
                <div className="glass-card-hover p-6 rounded-[20px] h-full" style={{ border: '1px solid var(--border-subtle)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${v.color}30`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)'; }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${v.color}18` }}>
                    <v.icon size={20} style={{ color: v.color }} />
                  </div>
                  <h4 className="text-[15px] font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>{v.label}</h4>
                  <p className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline with images ── */}
      <section className="py-[80px] sm:py-[110px]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6">
          <FadeUp className="text-center mb-14">
            <div className="badge badge-indigo mb-4 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse inline-block" />
              Our Journey
            </div>
            <h2 className="text-[clamp(24px,4vw,42px)] font-extrabold"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              How We Got Here
            </h2>
          </FadeUp>

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <FadeUp key={item.year} delay={i * 0.08}>
                <div className={`flex flex-col lg:flex-row ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''} gap-8 items-center`}>
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold mb-3"
                      style={{ background: 'rgba(99,102,241,0.12)', color: '#818CF8', fontFamily: 'var(--font-jakarta)' }}>
                      {item.year}
                    </div>
                    <h4 className="text-[clamp(18px,2.5vw,26px)] font-extrabold mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
                      {item.title}
                    </h4>
                    <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{item.desc}</p>
                  </div>
                  <div className="relative w-full lg:w-[45%] h-[200px] sm:h-[240px] rounded-[20px] overflow-hidden flex-shrink-0">
                    <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), transparent)' }} />
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA with background image ── */}
      <section className="relative py-[80px] sm:py-[100px] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80&fit=crop" alt="Office" fill className="object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(3,3,8,0.92), rgba(7,7,15,0.88))' }} />
        </div>
        <div className="relative z-10 max-w-[700px] mx-auto px-5 sm:px-6 text-center">
          <FadeUp>
            <h2 className="text-[clamp(24px,4vw,42px)] font-extrabold mb-5 text-white"
              style={{ fontFamily: 'var(--font-jakarta)' }}>
              Ready to Build Something?
            </h2>
            <p className="text-[16px] mb-8 text-white/65" style={{ fontFamily: 'var(--font-inter)' }}>
              Tell us about your project and let's see how we can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contactUs" className="btn-primary inline-flex items-center gap-2 justify-center">
                Start a Project <ArrowRight size={15} />
              </Link>
              <Link href="/career" className="btn-outline inline-flex items-center gap-2 justify-center">
                Join the Team
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
