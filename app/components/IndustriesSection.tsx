'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Activity, Building2, GraduationCap, Heart, Package, ShoppingCart, Truck, Wifi,
} from 'lucide-react';

const industries = [
  {
    icon: <ShoppingCart size={20} />,
    name: 'E-Commerce',
    desc: 'Scalable storefronts, multi-vendor platforms, payment integrations, and personalised shopping.',
    color: '#6366F1',
    points: ['Payment gateways', 'Inventory systems', 'Product recommendation AI'],
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=70&fit=crop',
  },
  {
    icon: <Activity size={20} />,
    name: 'FinTech',
    desc: 'Secure digital banking, lending platforms, investment apps, and regulatory-compliant solutions.',
    color: '#10B981',
    points: ['KYC/AML compliance', 'Real-time transactions', 'Risk analytics'],
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=70&fit=crop',
  },
  {
    icon: <Heart size={20} />,
    name: 'Healthcare',
    desc: 'HIPAA-compliant patient portals, telemedicine, health records, and AI diagnostics.',
    color: '#F472B6',
    points: ['EHR / EMR systems', 'Telemedicine platforms', 'AI diagnostics'],
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=70&fit=crop',
  },
  {
    icon: <GraduationCap size={20} />,
    name: 'EdTech',
    desc: 'LMS platforms, interactive e-learning, virtual classrooms, and assessment tools.',
    color: '#F59E0B',
    points: ['LMS & e-learning', 'Live virtual classes', 'Progress tracking'],
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=70&fit=crop',
  },
  {
    icon: <Building2 size={20} />,
    name: 'Enterprise SaaS',
    desc: 'Internal tools, workflow automation, multi-tenant SaaS, and legacy system migration.',
    color: '#A78BFA',
    points: ['Multi-tenant architecture', 'Role-based access', 'API integrations'],
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=70&fit=crop',
  },
  {
    icon: <Truck size={20} />,
    name: 'Logistics',
    desc: 'Fleet management, route optimisation, real-time tracking, and warehouse management.',
    color: '#06B6D4',
    points: ['GPS fleet tracking', 'Route optimisation', 'Warehouse automation'],
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=70&fit=crop',
  },
  {
    icon: <Package size={20} />,
    name: 'Real Estate',
    desc: 'Property listing platforms, virtual tours, agent CRMs, and rent/buy marketplaces.',
    color: '#34D399',
    points: ['Property portals', 'Virtual tours / 3D', 'CRM & lead tools'],
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=70&fit=crop',
  },
  {
    icon: <Wifi size={20} />,
    name: 'Media & SaaS',
    desc: 'Streaming platforms, content management, subscription billing, and audience analytics.',
    color: '#FB7185',
    points: ['Video streaming', 'CMS platforms', 'Subscription billing'],
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=70&fit=crop',
  },
];

function IndustryCard({ ind, i }: { ind: (typeof industries)[0]; i: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.07, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-[20px] overflow-hidden flex flex-col"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)' }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = ind.color + '45';
        el.style.transform = 'translateY(-4px)';
        el.style.boxShadow = `0 20px 50px rgba(0,0,0,0.18), 0 0 0 1px ${ind.color}20`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--border-subtle)';
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Industry image */}
      <div className="relative h-[130px] overflow-hidden flex-shrink-0">
        <Image src={ind.img} alt={ind.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${ind.color}18, rgba(3,3,8,0.65))` }} />
        <div className="absolute bottom-3 left-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: ind.color + '25', backdropFilter: 'blur(8px)', color: ind.color, border: `1px solid ${ind.color}30` }}>
            {ind.icon}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-[15.5px] font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
          {ind.name}
        </h3>
        <p className="text-[12.5px] leading-relaxed mb-3" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
          {ind.desc}
        </p>

        {/* Key capabilities */}
        <ul className="space-y-1.5 mt-auto">
          {ind.points.map((p) => (
            <li key={p} className="flex items-center gap-2 text-[11.5px]" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ind.color }} />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function IndustriesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section className="relative py-[100px] sm:py-[120px] overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px gradient-line" />
      <div className="absolute bottom-0 inset-x-0 h-px gradient-line" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-violet-600/[0.04] rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-14">
          <div className="badge badge-cyan mb-5 mx-auto inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
            Industries We Serve
          </div>
          <h2 className="text-[clamp(28px,5vw,52px)] font-extrabold mb-5 leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
            Deep Expertise Across <span className="gradient-text">Every Vertical</span>
          </h2>
          <p className="text-[16px] max-w-[520px] mx-auto leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
            We understand the unique challenges of each industry and build solutions tailored to those realities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {industries.map((ind, i) => <IndustryCard key={ind.name} ind={ind} i={i} />)}
        </div>
      </div>
    </section>
  );
}
