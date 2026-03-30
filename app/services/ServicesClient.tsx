'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import { ArrowRight, X, CheckCircle, Brain, Globe, Smartphone, Cloud, Palette, TrendingUp, Loader2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as any },
});

const services = [
  {
    icon: Brain,
    title: 'AI & Automation',
    slug: 'ai-automation',
    color: '#818CF8',
    bg: 'rgba(99,102,241,0.10)',
    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80&fit=crop',
    summary: 'ML models, NLP pipelines, and intelligent automation that transforms how your business operates.',
    features: ['Custom ML models', 'NLP & chatbots', 'Predictive analytics', 'Computer vision', 'Workflow automation', 'Data pipelines'],
  },
  {
    icon: Globe,
    title: 'Web Development',
    slug: 'web-development',
    color: '#06B6D4',
    bg: 'rgba(6,182,212,0.10)',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80&fit=crop',
    summary: 'Fast, scalable web applications with modern stacks — React, Next.js, Node.js, and cloud-native architecture.',
    features: ['Next.js / React', 'REST & GraphQL APIs', 'SEO & performance', 'E-commerce', 'CMS integration', 'Progressive Web Apps'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    slug: 'mobile',
    color: '#34D399',
    bg: 'rgba(52,211,153,0.10)',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80&fit=crop',
    summary: 'Cross-platform iOS & Android apps built with Flutter or React Native — one codebase, native performance.',
    features: ['Flutter / React Native', 'iOS & Android', 'Offline sync', 'Push notifications', 'App Store deployment', 'Hardware APIs'],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    slug: 'cloud-devops',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.10)',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80&fit=crop',
    summary: 'Cloud-native infrastructure, CI/CD pipelines, and DevOps practices that scale with your product.',
    features: ['AWS / GCP / Azure', 'Docker & Kubernetes', 'CI/CD pipelines', 'Infrastructure as Code', 'Monitoring & alerting', 'Cost optimization'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    slug: 'design',
    color: '#EC4899',
    bg: 'rgba(236,72,153,0.10)',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80&fit=crop',
    summary: 'Product design and brand identity that converts — from wireframes to pixel-perfect interfaces.',
    features: ['Product design', 'Brand identity', 'Design systems', 'Prototyping', 'User research', 'Accessibility'],
  },
  {
    icon: TrendingUp,
    title: 'Digital Transformation',
    slug: 'digital-transformation',
    color: '#A78BFA',
    bg: 'rgba(167,139,250,0.10)',
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80&fit=crop',
    summary: 'End-to-end consulting and execution to modernize legacy systems and unlock business agility.',
    features: ['Legacy migration', 'Process automation', 'Technology audit', 'Team training', 'Data strategy', 'Change management'],
  },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

function InquiryModal({ service, onClose }: { service: typeof services[0]; onClose: () => void }) {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'serviceInquiries'), {
        ...form,
        service: service.title,
        submittedAt: serverTimestamp(),
        status: 'new',
      });
      setDone(true);
    } catch {
      toast.error('Something went wrong. Please email us directly.');
    }
    setSubmitting(false);
  };

  const inputStyle: React.CSSProperties = {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-default)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-inter)',
    width: '100%',
    padding: '12px 16px',
    borderRadius: 12,
    fontSize: 14,
    outline: 'none',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full sm:max-w-[520px] rounded-t-[28px] sm:rounded-[24px] p-6 sm:p-8 relative"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', maxHeight: '90vh', overflowY: 'auto' }}>
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
          <X size={15} />
        </button>

        {done ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(52,211,153,0.12)' }}>
              <CheckCircle size={28} style={{ color: '#34D399' }} />
            </div>
            <h3 className="text-[20px] font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              We'll be in touch!
            </h3>
            <p className="text-[14px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              Thanks for reaching out. We typically respond within 24 hours.
            </p>
            <button onClick={onClose} className="btn-primary mt-6">Close</button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: service.bg }}>
                <service.icon size={18} style={{ color: service.color }} />
              </div>
              <div>
                <h3 className="text-[17px] font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
                  {service.title}
                </h3>
                <p className="text-[12px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>Tell us about your project</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input style={inputStyle} placeholder="Full Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.50)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-default)'; }} />
                <input style={inputStyle} type="email" placeholder="Email *" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.50)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-default)'; }} />
              </div>
              <input style={inputStyle} placeholder="Phone (optional)" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.50)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-default)'; }} />
              <textarea style={{ ...inputStyle, resize: 'none' } as React.CSSProperties} rows={4} placeholder="Tell us about your project, requirements, timeline... *"
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.50)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-default)'; }} />
              <button type="submit" disabled={submitting || !form.name || !form.email || !form.message}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[14.5px] font-semibold text-white disabled:opacity-50 transition-all"
                style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)' }}>
                {submitting ? <><Loader2 size={15} className="animate-spin" /> Sending…</> : <>Send Inquiry <ArrowRight size={14} /></>}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}

function ServiceCard({ svc, i }: { svc: typeof services[0]; i: number }) {
  const [open, setOpen] = useState(false);
  const [inquire, setInquire] = useState(false);

  return (
    <>
      <motion.div {...fadeUp(i * 0.06)}
        className="rounded-[22px] overflow-hidden transition-all duration-300 cursor-pointer"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-5px)'; el.style.borderColor = `${svc.color}30`; el.style.boxShadow = `0 24px 60px rgba(0,0,0,0.18)`; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.borderColor = 'var(--border-subtle)'; el.style.boxShadow = 'none'; }}
        onClick={() => setOpen(v => !v)}>
        {/* Image thumbnail */}
        {(svc as any).img && (
          <div className="relative h-44 overflow-hidden">
            <Image src={(svc as any).img} alt={svc.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.65) 100%)` }} />
            <div className="absolute bottom-3 left-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: svc.bg, backdropFilter: 'blur(8px)' }}>
                <svc.icon size={17} style={{ color: svc.color }} />
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
        {/* Header */}
        <div className="mb-3">
            <h3 className="text-[17px] font-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>{svc.title}</h3>
            <p className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{svc.summary}</p>
        </div>

        {/* Features */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                {svc.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-[13px]" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: svc.color }} />
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5">
          <span className="text-[12.5px] font-medium" style={{ color: svc.color, fontFamily: 'var(--font-inter)' }}>
            {open ? 'Hide details' : 'View details'}
          </span>
          <button
            onClick={e => { e.stopPropagation(); setInquire(true); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12.5px] font-semibold text-white"
            style={{ background: `linear-gradient(135deg, ${svc.color}, ${svc.color}CC)` }}>
            Get Quote <ArrowRight size={12} />
          </button>
        </div>
        </div>{/* end p-6 */}
      </motion.div>

      <AnimatePresence>
        {inquire && <InquiryModal service={svc} onClose={() => setInquire(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function ServicesClient() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div style={{ background: 'var(--bg-primary)' }}>

      {/* Hero with parallax image */}
      <section className="relative h-[65vh] min-h-[440px] flex items-center overflow-hidden">
        <div className="absolute inset-0 scale-110">
          <Image src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=85&fit=crop" alt="Services" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(3,3,8,0.88) 0%, rgba(7,7,15,0.75) 60%, rgba(3,3,8,0.92) 100%)' }} />
        </div>
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
        <div ref={heroRef} className="relative z-10 max-w-[900px] mx-auto px-5 sm:px-6 text-center w-full">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="badge badge-indigo mb-5 mx-auto inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse inline-block" />
              What We Do
            </div>
            <h1 className="text-[clamp(30px,5.5vw,62px)] font-extrabold leading-[1.08] mb-6 text-white">
              Services Built for <span className="gradient-text">Scale</span>
            </h1>
            <p className="text-[17px] leading-relaxed max-w-[600px] mx-auto mb-10 text-white/70">
              From AI integrations to cloud infrastructure, we build the full stack — so you can focus on growing your business.
            </p>
            <Link href="/contactUs" className="btn-primary inline-flex items-center gap-2">
              Discuss Your Project <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-20" style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }} />
      </section>

      {/* Services Grid */}
      <section className="py-[80px] sm:py-[100px]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="text-[clamp(22px,3.5vw,40px)] font-extrabold mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              Our Core Services
            </h2>
            <p className="text-[15px] max-w-[500px] mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              Click any card to expand details, then request a quote when you're ready.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc, i) => <ServiceCard key={svc.slug} svc={svc} i={i} />)}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-[60px]" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-[22px] font-extrabold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              Not sure what you need?
            </h3>
            <p className="text-[14px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              Book a free 30-minute discovery call and we'll figure it out together.
            </p>
          </div>
          <Link href="/contactUs" className="btn-primary flex-shrink-0 inline-flex items-center gap-2">
            Book Free Consultation <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
