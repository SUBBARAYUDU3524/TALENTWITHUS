'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Brain, Cloud, Code2, Cpu, Layout, Smartphone } from 'lucide-react';
import Link from 'next/link';

const services = [
  { icon: <Code2 size={22} />, title: 'Web Development', description: 'Modern, performant web applications built with React, Next.js, and TypeScript. Scalable from MVP to enterprise.', tags: ['React', 'Next.js', 'TypeScript', 'Node.js'], color: '#6366F1', href: '/services', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=480&q=75&fit=crop' },
  { icon: <Smartphone size={22} />, title: 'Mobile Apps', description: 'Native-quality mobile apps for iOS and Android. Smooth performance, elegant design, great UX.', tags: ['React Native', 'Flutter', 'iOS', 'Android'], color: '#06B6D4', href: '/services', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=480&q=75&fit=crop' },
  { icon: <Brain size={22} />, title: 'AI & ML Solutions', description: 'Intelligent automation, LLM integrations, and custom ML models that give your business a real edge.', tags: ['GPT-4', 'LangChain', 'TensorFlow', 'Python'], color: '#A78BFA', href: '/services', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=480&q=75&fit=crop' },
  { icon: <Cloud size={22} />, title: 'Cloud & DevOps', description: 'Scalable cloud on AWS, GCP, or Azure. CI/CD pipelines, containerization, and 99.9% uptime.', tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform'], color: '#10B981', href: '/services', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=480&q=75&fit=crop' },
  { icon: <Layout size={22} />, title: 'UI/UX Design', description: 'Human-centered design that converts. From wireframes to high-fidelity prototypes that delight users.', tags: ['Figma', 'Prototyping', 'Design Systems', 'Research'], color: '#F59E0B', href: '/services', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=480&q=75&fit=crop' },
  { icon: <Cpu size={22} />, title: 'Digital Transformation', description: 'End-to-end modernisation strategy. We migrate legacy systems and unlock new digital revenue streams.', tags: ['Strategy', 'Migration', 'Integration', 'Consulting'], color: '#F472B6', href: '/services', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=480&q=75&fit=crop' },
];

function ServiceCard({ s, index }: { s: (typeof services)[0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={s.href}>
        <div
          className="relative group h-full rounded-[20px] cursor-pointer overflow-hidden flex flex-col"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)' }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = s.color + '50';
            el.style.boxShadow = `0 20px 50px rgba(0,0,0,0.2), 0 0 0 1px ${s.color}22`;
            el.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = 'var(--border-subtle)';
            el.style.boxShadow = 'none';
            el.style.transform = 'translateY(0)';
          }}
        >
          {/* Service image thumbnail */}
          <div className="relative h-[160px] overflow-hidden flex-shrink-0">
            <Image src={s.img} alt={s.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 transition-opacity duration-300" style={{ background: `linear-gradient(to bottom, ${s.color}20, rgba(3,3,8,0.70))` }} />
            <div className="absolute bottom-4 left-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.color + '25', backdropFilter: 'blur(8px)', color: s.color, border: `1px solid ${s.color}30` }}>
                {s.icon}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-6">
            <h3 className="text-[17px] font-bold mb-3 leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>{s.title}</h3>
            <p className="text-[13.5px] leading-relaxed mb-5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{s.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {s.tags.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-medium border" style={{ background: s.color + '10', color: s.color, borderColor: s.color + '28' }}>{t}</span>
              ))}
            </div>
            <div className="mt-auto flex items-center gap-1.5 text-[13px] font-semibold transition-all duration-200 group-hover:gap-2.5" style={{ color: s.color }}>
              Learn more <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function WhatWeDo() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <section className="relative py-[100px] sm:py-[120px] overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute inset-0 dot-pattern opacity-[0.35] pointer-events-none" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-14">
          <div className="badge badge-indigo mb-5 mx-auto inline-flex"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />What We Do</div>
          <h2 className="text-[clamp(28px,5vw,52px)] font-extrabold mb-5 leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
            Services Built for <span className="gradient-text-cool">Modern Businesses</span>
          </h2>
          <p className="text-[16px] max-w-[520px] mx-auto leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
            End-to-end digital solutions that help companies grow faster, operate smarter, and stand out.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((s, i) => <ServiceCard key={s.title} s={s} index={i} />)}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-center mt-12">
          <Link href="/services"><button className="btn-outline px-8 py-3.5 text-[14.5px]">View All Services <ArrowRight size={14} /></button></Link>
        </motion.div>
      </div>
    </section>
  );
}
