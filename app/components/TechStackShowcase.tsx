'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const row1 = [
  { name: 'React', color: '#61DAFB' }, { name: 'Next.js', color: '#FFFFFF' }, { name: 'TypeScript', color: '#3178C6' },
  { name: 'Node.js', color: '#339933' }, { name: 'Python', color: '#3776AB' }, { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'MongoDB', color: '#47A248' }, { name: 'Redis', color: '#DC382D' }, { name: 'GraphQL', color: '#E10098' },
  { name: 'TailwindCSS', color: '#06B6D4' }, { name: 'Prisma', color: '#5A67D8' }, { name: 'Supabase', color: '#3ECF8E' },
];
const row2 = [
  { name: 'AWS', color: '#FF9900' }, { name: 'Docker', color: '#2496ED' }, { name: 'Kubernetes', color: '#326CE5' },
  { name: 'Firebase', color: '#FFCA28' }, { name: 'OpenAI', color: '#74AA9C' }, { name: 'LangChain', color: '#A1C4FD' },
  { name: 'Vercel', color: '#888888' }, { name: 'GitHub', color: '#888888' }, { name: 'Figma', color: '#F24E1E' },
  { name: 'Stripe', color: '#635BFF' }, { name: 'Terraform', color: '#7B42BC' }, { name: 'Flutter', color: '#54C5F8' },
];

function TechBadge({ name, color }: { name: string; color: string }) {
  return (
    <div
      className="tech-badge flex items-center gap-2.5 px-5 py-3 rounded-xl mx-2 whitespace-nowrap select-none flex-shrink-0 cursor-default group"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', transition: 'all 0.25s ease' }}
      onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = 'var(--border-default)'; el.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = 'var(--border-subtle)'; el.style.transform = 'translateY(0)'; }}
    >
      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform duration-200 group-hover:scale-125" style={{ background: color, boxShadow: `0 0 6px ${color}70` }} />
      <span className="text-[13.5px] font-medium" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>{name}</span>
    </div>
  );
}

function Row({ items, reverse = false }: { items: typeof row1; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="group flex overflow-hidden">
      <div className={`flex ${reverse ? 'marquee-reverse' : 'marquee'} pause-on-hover`}>
        {doubled.map((item, i) => <TechBadge key={`${item.name}-${i}`} name={item.name} color={item.color} />)}
      </div>
    </div>
  );
}

export default function TechStackShowcase() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section className="relative py-[90px] sm:py-[110px] overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute top-0 inset-x-0 h-px gradient-line" />
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, var(--bg-primary), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none" style={{ background: 'linear-gradient(-90deg, var(--bg-primary), transparent)' }} />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-12">
          <div className="badge badge-emerald mb-5 mx-auto inline-flex"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />Tech Stack</div>
          <h2 className="text-[clamp(26px,4vw,44px)] font-extrabold mb-4 leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>The Tools We Master</h2>
          <p className="text-[15.5px] max-w-[420px] mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>We work with the best modern technologies to build future-proof products.</p>
        </motion.div>
      </div>

      <div className="space-y-3.5">
        <Row items={row1} />
        <Row items={row2} reverse />
      </div>
    </section>
  );
}
