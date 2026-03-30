'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowRight, BarChart3, Clock, CreditCard, Heart, Lock,
  ShoppingCart, Cloud, TrendingUp, Smartphone, ChevronDown, ChevronUp,
} from 'lucide-react';

const caseStudies = [
  {
    id: 1,
    title: 'Digital Transformation for Financial Services',
    client: 'Global Finance Corp',
    industry: 'Banking & Finance',
    duration: '6 Months',
    results: '40% increase in digital engagement',
    challenge: 'Legacy systems hindering customer experience and operational efficiency in a competitive digital banking landscape.',
    solution: 'Implemented a modern microservices architecture with React frontend and cloud-native backend, enabling seamless digital banking experiences.',
    outcome: 'Enhanced customer satisfaction by 35% and reduced operational costs by 25% while improving system scalability.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80&fit=crop',
    tags: ['Digital Transformation', 'Cloud Migration', 'React', 'Microservices'],
    metrics: [{ value: '40%', label: 'Digital Engagement' }, { value: '35%', label: 'Client Satisfaction' }, { value: '25%', label: 'Cost Reduction' }],
    icon: CreditCard,
    color: '#6366F1',
  },
  {
    id: 2,
    title: 'E-commerce Platform Scaling Solution',
    client: 'StyleRetail Inc',
    industry: 'Retail & E-commerce',
    duration: '4 Months',
    results: '300% traffic handling capacity',
    challenge: 'Existing platform unable to handle seasonal traffic spikes, leading to downtime during peak sales periods.',
    solution: 'Developed a scalable cloud infrastructure with load balancing, CDN integration, and optimised database architecture.',
    outcome: 'Achieved zero downtime during Black Friday sales while handling 3× more concurrent users than the previous year.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&fit=crop',
    tags: ['Scalability', 'Cloud Infrastructure', 'Performance', 'E-commerce'],
    metrics: [{ value: '300%', label: 'Traffic Capacity' }, { value: '0', label: 'Downtime Hours' }, { value: '60%', label: 'Faster Load Time' }],
    icon: ShoppingCart,
    color: '#10B981',
  },
  {
    id: 3,
    title: 'Healthcare Data Management System',
    client: 'MediCare Solutions',
    industry: 'Healthcare',
    duration: '8 Months',
    results: 'HIPAA-compliant data handling',
    challenge: 'Need for secure, compliant patient data management while improving accessibility for healthcare providers.',
    solution: 'Built a secure healthcare platform with end-to-end encryption, audit trails, and HIPAA-compliant data storage.',
    outcome: 'Streamlined patient data access for providers while maintaining highest security standards and regulatory compliance.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&fit=crop',
    tags: ['Healthcare', 'Security', 'Compliance', 'Data Management'],
    metrics: [{ value: '100%', label: 'HIPAA Compliance' }, { value: '50%', label: 'Faster Data Access' }, { value: '99.9%', label: 'System Uptime' }],
    icon: Heart,
    color: '#F472B6',
  },
  {
    id: 4,
    title: 'Mobile-First Retail Experience',
    client: 'UrbanStyle Brands',
    industry: 'Fashion Retail',
    duration: '5 Months',
    results: '200% mobile conversion growth',
    challenge: 'Declining mobile sales due to poor user experience and slow performance on mobile devices.',
    solution: 'Created a Progressive Web App (PWA) with optimised mobile experience, offline capabilities, and push notifications.',
    outcome: 'Significantly improved mobile conversion rates and customer retention while reducing bounce rates.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&fit=crop',
    tags: ['Mobile First', 'PWA', 'User Experience', 'Retail'],
    metrics: [{ value: '200%', label: 'Mobile Conversion' }, { value: '45%', label: 'Lower Bounce Rate' }, { value: '3.5×', label: 'Faster Load' }],
    icon: Smartphone,
    color: '#F59E0B',
  },
  {
    id: 5,
    title: 'Enterprise Cloud Migration',
    client: 'TechInnovate Solutions',
    industry: 'Technology',
    duration: '7 Months',
    results: '60% infrastructure cost savings',
    challenge: 'On-premise infrastructure causing high maintenance costs and limited scalability for growing tech company.',
    solution: 'Migrated entire infrastructure to cloud with containerisation, auto-scaling, and DevOps implementation.',
    outcome: 'Achieved significant cost savings while improving deployment speed and system reliability.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&fit=crop',
    tags: ['Cloud Migration', 'DevOps', 'Containerisation', 'Infrastructure'],
    metrics: [{ value: '60%', label: 'Cost Savings' }, { value: '80%', label: 'Faster Deploy' }, { value: '99.95%', label: 'Uptime' }],
    icon: Cloud,
    color: '#06B6D4',
  },
  {
    id: 6,
    title: 'Cybersecurity Platform Implementation',
    client: 'SecureNet Systems',
    industry: 'Security',
    duration: '5 Months',
    results: 'Zero security breaches',
    challenge: 'Increasing cybersecurity threats requiring robust protection systems for sensitive enterprise data.',
    solution: 'Implemented a comprehensive security platform with real-time monitoring, threat detection, and automated response systems.',
    outcome: 'Maintained a perfect security record while improving threat detection and response times significantly.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80&fit=crop',
    tags: ['Cybersecurity', 'Threat Detection', 'Monitoring', 'Compliance'],
    metrics: [{ value: '0', label: 'Security Breaches' }, { value: '90%', label: 'Faster Detection' }, { value: '100%', label: 'Compliance' }],
    icon: Lock,
    color: '#EF4444',
  },
];

const stats = [
  { value: '50+', label: 'Projects Completed', color: '#6366F1' },
  { value: '95%', label: 'Client Satisfaction', color: '#10B981' },
  { value: '40%', label: 'Average Growth', color: '#F59E0B' },
  { value: '30+', label: 'Enterprise Clients', color: '#F472B6' },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

function CaseStudyCard({ study, index }) {
  const [expanded, setExpanded] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });
  const Icon = study.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[28px] overflow-hidden"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

        {/* Image side */}
        <div className="relative w-full lg:w-[42%] h-[240px] sm:h-[300px] lg:h-auto min-h-[280px] flex-shrink-0 overflow-hidden">
          <Image
            src={study.image}
            alt={study.title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${study.color}30, rgba(3,3,8,0.60))` }} />
          {/* Client badge */}
          <div className="absolute top-5 left-5 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl backdrop-blur-sm"
            style={{ background: 'rgba(3,3,8,0.65)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: study.color + '30' }}>
              <Icon size={14} style={{ color: study.color }} />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-white leading-none">{study.client}</div>
              <div className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{study.industry}</div>
            </div>
          </div>
          {/* Duration badge */}
          <div className="absolute bottom-5 left-5 flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-sm"
            style={{ background: 'rgba(3,3,8,0.65)', border: '1px solid rgba(255,255,255,0.10)' }}>
            <Clock size={11} style={{ color: study.color }} />
            <span className="text-[11px] font-medium text-white/80">{study.duration}</span>
          </div>
        </div>

        {/* Content side */}
        <div className="flex-1 p-7 sm:p-9 flex flex-col">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {study.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded-md text-[11px] font-medium"
                style={{ background: study.color + '12', color: study.color, border: `1px solid ${study.color}25` }}>
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-[clamp(18px,2.2vw,24px)] font-extrabold leading-tight mb-3"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
            {study.title}
          </h3>
          <p className="text-[13.5px] leading-relaxed mb-5 flex items-center gap-1.5 font-medium"
            style={{ color: study.color, fontFamily: 'var(--font-inter)' }}>
            <TrendingUp size={13} /> {study.results}
          </p>

          {/* Metrics row */}
          <div className="grid grid-cols-3 gap-3 mb-5 p-4 rounded-[16px]" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            {study.metrics.map(m => (
              <div key={m.label} className="text-center">
                <div className="text-[clamp(18px,2vw,24px)] font-extrabold" style={{ color: study.color, fontFamily: 'var(--font-jakarta)' }}>{m.value}</div>
                <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Expandable detail */}
          <div className="flex-1">
            <motion.div
              initial={false}
              animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="space-y-4 mb-5">
                {[
                  { dot: '#EF4444', label: 'The Challenge', text: study.challenge },
                  { dot: '#6366F1', label: 'Our Solution', text: study.solution },
                  { dot: '#10B981', label: 'Business Outcome', text: study.outcome },
                ].map(item => (
                  <div key={item.label}>
                    <h4 className="text-[13px] font-bold mb-1.5 flex items-center gap-2"
                      style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.dot }} />
                      {item.label}
                    </h4>
                    <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <button
              onClick={() => setExpanded(e => !e)}
              className="flex items-center gap-1.5 text-[13px] font-semibold transition-colors"
              style={{ color: study.color, fontFamily: 'var(--font-inter)' }}
            >
              {expanded ? <><ChevronUp size={14} /> Hide details</> : <><ChevronDown size={14} /> Read full story</>}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudiesPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* Hero */}
      <section className="relative h-[65vh] min-h-[440px] flex items-center overflow-hidden">
        <div className="absolute inset-0 scale-110">
          <Image
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=85&fit=crop"
            alt="Case Studies"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(3,3,8,0.88) 0%, rgba(7,7,15,0.72) 55%, rgba(3,3,8,0.92) 100%)' }} />
        </div>
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
        <div ref={heroRef} className="relative z-10 max-w-[900px] mx-auto px-5 sm:px-6 text-center w-full">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="badge badge-indigo mb-5 mx-auto inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse inline-block" />
              Client Success Stories
            </div>
            <h1 className="text-[clamp(30px,5.5vw,62px)] font-extrabold leading-[1.08] mb-5 text-white">
              Real Results for <span className="gradient-text">Real Businesses</span>
            </h1>
            <p className="text-[17px] leading-relaxed max-w-[600px] mx-auto text-white/70">
              Discover how we've helped companies across industries achieve measurable digital transformation and significant business growth.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-20" style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }} />
      </section>

      {/* Stats */}
      <section className="py-16" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={s.label} {...fadeUp(i * 0.08)} className="text-center">
                <div className="text-[clamp(32px,5vw,50px)] font-extrabold mb-1" style={{ color: s.color, fontFamily: 'var(--font-jakarta)' }}>{s.value}</div>
                <div className="text-[13.5px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-[80px] sm:py-[100px]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <div className="badge badge-indigo mb-4 mx-auto inline-flex">
              <BarChart3 size={12} /> Case Studies
            </div>
            <h2 className="text-[clamp(22px,3.5vw,40px)] font-extrabold mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              Featured Success Stories
            </h2>
            <p className="text-[15px] max-w-[480px] mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              Real-world solutions delivering measurable business impact across industries.
            </p>
          </motion.div>

          <div className="space-y-6">
            {caseStudies.map((study, i) => (
              <CaseStudyCard key={study.id} study={study} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-[80px] sm:py-[100px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80&fit=crop"
            alt="Start your project"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(3,3,8,0.92), rgba(7,7,15,0.88))' }} />
        </div>
        <div className="relative z-10 max-w-[700px] mx-auto px-5 sm:px-6 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-[clamp(24px,4vw,42px)] font-extrabold mb-5 text-white" style={{ fontFamily: 'var(--font-jakarta)' }}>
              Ready to Write Your Success Story?
            </h2>
            <p className="text-[16px] mb-8 text-white/65" style={{ fontFamily: 'var(--font-inter)' }}>
              Let's discuss your project and see how we can deliver results like these for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contactUs" className="btn-primary inline-flex items-center gap-2 justify-center">
                Start Your Project <ArrowRight size={15} />
              </Link>
              <Link href="/services" className="btn-outline inline-flex items-center gap-2 justify-center">
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
