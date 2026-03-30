'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import { Code2, Palette, Brain, Globe, DollarSign, Users, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as any },
});

const roles = [
  { icon: Code2, label: 'Developers', desc: 'Full-stack, backend, mobile, DevOps — all skill levels.', color: '#818CF8' },
  { icon: Palette, label: 'Designers', desc: 'UI/UX, branding, motion, and product designers.', color: '#F472B6' },
  { icon: Brain, label: 'AI/ML Engineers', desc: 'Machine learning, NLP, computer vision specialists.', color: '#34D399' },
  { icon: Globe, label: 'Consultants', desc: 'Product, growth, and technology strategy experts.', color: '#F59E0B' },
];

const benefits = [
  { icon: DollarSign, label: 'Revenue Share', desc: 'Earn a percentage of project revenue for your contributions.' },
  { icon: Globe, label: 'Global Exposure', desc: 'Your work reaches clients across US, UK, India, and Southeast Asia.' },
  { icon: Users, label: 'Elite Network', desc: 'Collaborate with top-tier engineers and founders.' },
  { icon: Code2, label: 'Real Projects', desc: 'No toy projects — you ship production-grade software.' },
];

const steps = [
  { num: '01', title: 'Apply', desc: 'Fill in the form with your skills and portfolio.' },
  { num: '02', title: 'Review', desc: 'We review within 5 business days and schedule a call.' },
  { num: '03', title: 'Onboard', desc: 'Get matched with a project aligned to your expertise.' },
  { num: '04', title: 'Build & Earn', desc: 'Ship real work and earn your share of the revenue.' },
];

function ApplyForm() {
  const [form, setForm] = useState({ name: '', email: '', role: '', portfolio: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.role) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'talentApplications'), {
        ...form,
        submittedAt: serverTimestamp(),
        status: 'new',
      });
      setDone(true);
    } catch {
      alert('Submission failed — please email us directly at info@talentwithus.com');
    }
    setSubmitting(false);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: 14, outline: 'none',
    background: 'var(--bg-secondary)', border: '1px solid var(--border-default)',
    color: 'var(--text-primary)', fontFamily: 'var(--font-inter)',
  };

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.50)';
  };
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'var(--border-default)';
  };

  if (done) return (
    <div className="py-12 text-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(52,211,153,0.12)' }}>
        <CheckCircle size={28} style={{ color: '#34D399' }} />
      </div>
      <h3 className="text-[20px] font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>Application received!</h3>
      <p className="text-[14px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>We'll be in touch within 5 business days.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input style={inputStyle} placeholder="Full Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required onFocus={focus} onBlur={blur} />
        <input style={inputStyle} type="email" placeholder="Email *" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required onFocus={focus} onBlur={blur} />
      </div>
      <select style={{ ...inputStyle, appearance: 'none' }} value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} required onFocus={focus} onBlur={blur}>
        <option value="" disabled>Your Role *</option>
        <option>Developer</option>
        <option>Designer</option>
        <option>AI/ML Engineer</option>
        <option>Consultant</option>
        <option>Other</option>
      </select>
      <input style={inputStyle} placeholder="Portfolio or GitHub URL" value={form.portfolio} onChange={e => setForm(f => ({ ...f, portfolio: e.target.value }))} onFocus={focus} onBlur={blur} />
      <textarea style={{ ...inputStyle, resize: 'none' } as React.CSSProperties} rows={4} placeholder="Tell us about yourself and what you want to build…"
        value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} onFocus={focus} onBlur={blur} />
      <button type="submit" disabled={submitting || !form.name || !form.email || !form.role}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14.5px] font-semibold text-white disabled:opacity-50 transition-all"
        style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)' }}>
        {submitting ? <><Loader2 size={15} className="animate-spin" /> Submitting…</> : <>Apply Now <ArrowRight size={14} /></>}
      </button>
    </form>
  );
}

export default function TalentProgramClient() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div style={{ background: 'var(--bg-primary)' }}>

      {/* Hero */}
      <section className="relative py-[100px] sm:py-[130px] overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px gradient-line" />
        <div className="absolute bottom-0 inset-x-0 h-px gradient-line" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[130px] pointer-events-none" style={{ background: 'rgba(99,102,241,0.07)' }} />

        <div ref={heroRef} className="relative z-10 max-w-[900px] mx-auto px-5 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="badge badge-indigo mb-5 mx-auto inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse inline-block" />
              Partnership Program
            </div>
            <h1 className="text-[clamp(30px,5.5vw,62px)] font-extrabold leading-[1.08] mb-5"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              Build Real Products.<br />
              <span className="gradient-text">Earn Real Revenue.</span>
            </h1>
            <p className="text-[17px] leading-relaxed max-w-[580px] mx-auto mb-10"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              Join the TalentWithUs Partnership Program — co-build innovative products with us and earn a share of the revenue you generate.
            </p>
            <a href="#apply" className="btn-primary inline-flex items-center gap-2">
              Apply Now <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Who we're looking for */}
      <section className="py-[80px] sm:py-[100px]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-[clamp(22px,3.5vw,40px)] font-extrabold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              Who We're Looking For
            </h2>
            <p className="text-[15px] max-w-[460px] mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              We partner with talented individuals across every discipline.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {roles.map((r, i) => (
              <motion.div key={r.label} {...fadeUp(i * 0.07)} className="p-6 rounded-[20px] transition-all duration-300"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${r.color}30`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${r.color}15` }}>
                  <r.icon size={18} style={{ color: r.color }} />
                </div>
                <h3 className="text-[15px] font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>{r.label}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-[80px] sm:py-[100px]" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-[clamp(22px,3.5vw,40px)] font-extrabold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>What You Get</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[800px] mx-auto">
            {benefits.map((b, i) => (
              <motion.div key={b.label} {...fadeUp(i * 0.08)} className="flex gap-4 p-5 rounded-[18px]"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(99,102,241,0.12)' }}>
                  <b.icon size={17} style={{ color: '#818CF8' }} />
                </div>
                <div>
                  <h4 className="text-[14.5px] font-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>{b.label}</h4>
                  <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-[80px] sm:py-[100px]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-[clamp(22px,3.5vw,40px)] font-extrabold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>How It Works</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <motion.div key={s.num} {...fadeUp(i * 0.08)} className="p-6 rounded-[20px]" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                <div className="text-[32px] font-extrabold mb-3 gradient-text" style={{ fontFamily: 'var(--font-jakarta)' }}>{s.num}</div>
                <h4 className="text-[15px] font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>{s.title}</h4>
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply form */}
      <section id="apply" className="py-[80px] sm:py-[100px]" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-[600px] mx-auto px-5 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-10">
            <h2 className="text-[clamp(22px,3.5vw,40px)] font-extrabold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>Apply to Join</h2>
            <p className="text-[15px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>Takes 2 minutes. We'll follow up within 5 business days.</p>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="rounded-[24px] p-7 sm:p-10" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
            <ApplyForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
