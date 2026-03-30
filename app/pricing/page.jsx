'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, X, Zap, Users, Crown, Lock, Clock, Shield, Headphones, ChevronDown, ChevronUp } from 'lucide-react';

const plans = [
  {
    name: 'Starter', desc: 'Perfect for small businesses and startups', price: '$4,999',
    duration: 'project based', icon: Zap, color: '#6366F1',
    features: [
      { name: 'Responsive Website', ok: true }, { name: 'Up to 5 Pages', ok: true },
      { name: 'Basic SEO Setup', ok: true }, { name: 'Contact Form', ok: true },
      { name: '1 Month Support', ok: true }, { name: 'E-commerce Functionality', ok: false },
      { name: 'Custom Web Application', ok: false }, { name: 'Dedicated Project Manager', ok: false },
    ],
  },
  {
    name: 'Professional', desc: 'Ideal for growing businesses with advanced needs', price: '$12,999',
    duration: 'project based', icon: Users, color: '#A78BFA', popular: true,
    features: [
      { name: 'Custom Web Application', ok: true }, { name: 'Up to 15 Pages', ok: true },
      { name: 'Advanced SEO Setup', ok: true }, { name: 'E-commerce Functionality', ok: true },
      { name: '3 Months Support', ok: true }, { name: 'Dedicated Project Manager', ok: true },
      { name: 'API Integration', ok: true }, { name: 'Mobile App (Additional)', ok: false },
    ],
  },
  {
    name: 'Enterprise', desc: 'Complete solutions for large organisations', price: 'Custom',
    duration: 'tailored to needs', icon: Crown, color: '#F59E0B',
    features: [
      { name: 'Complex Web Applications', ok: true }, { name: 'Unlimited Pages', ok: true },
      { name: 'Enterprise SEO Strategy', ok: true }, { name: 'Advanced E-commerce', ok: true },
      { name: '6 Months Support', ok: true }, { name: 'Dedicated Project Team', ok: true },
      { name: 'Mobile App Development', ok: true }, { name: 'Enterprise-grade Security', ok: true },
    ],
  },
];

const faqs = [
  { q: "What's included in the project price?", a: "Design, development, testing, deployment, and the specified support period. We provide detailed breakdowns in our proposals." },
  { q: "Do you offer ongoing maintenance?", a: "Yes — flexible maintenance plans starting at $299/month for updates, security patches, and technical support." },
  { q: "How long does a typical project take?", a: "Starter: 4–6 weeks · Professional: 8–12 weeks · Enterprise: 12+ weeks. We provide detailed timelines in proposals." },
  { q: "Can we start with a smaller package and upgrade later?", a: "Absolutely. We design for scalability. Many clients start with Starter and expand as their business grows." },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

function FAQ({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-[16px] overflow-hidden" style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}>
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        style={{ color: 'var(--text-primary)' }}>
        <span className="text-[14.5px] font-semibold" style={{ fontFamily: 'var(--font-jakarta)' }}>{item.q}</span>
        {open ? <ChevronUp size={16} style={{ color: '#818CF8', flexShrink: 0 }} /> : <ChevronDown size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
      </button>
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
        <p className="px-6 pb-5 text-[13.5px] leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{item.a}</p>
      </motion.div>
    </div>
  );
}

export default function PricingPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 scale-110">
          <Image src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=85&fit=crop"
            alt="Pricing" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(3,3,8,0.90) 0%, rgba(7,7,15,0.75) 55%, rgba(3,3,8,0.93) 100%)' }} />
        </div>
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
        <div ref={heroRef} className="relative z-10 max-w-[800px] mx-auto px-5 sm:px-6 text-center w-full">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="badge badge-indigo mb-5 mx-auto inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse inline-block" /> Transparent Pricing
            </div>
            <h1 className="text-[clamp(28px,5vw,58px)] font-extrabold leading-[1.08] mb-5 text-white">
              Clear Pricing. <span className="gradient-text">No Surprises.</span>
            </h1>
            <p className="text-[16px] leading-relaxed max-w-[520px] mx-auto text-white/70">
              Fixed-price projects with clear deliverables. You know exactly what you're paying for.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-20" style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }} />
      </section>

      {/* Plans */}
      <section className="py-[80px] sm:py-[100px]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="text-[clamp(22px,3.5vw,40px)] font-extrabold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              Project-Based Pricing
            </h2>
            <p className="text-[15px] max-w-[460px] mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              Fixed prices with clear deliverables. Perfect for predictable budgets.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <motion.div key={plan.name} {...fadeUp(i * 0.08)}
                  className={`relative rounded-[24px] flex flex-col overflow-hidden ${plan.popular ? 'ring-2' : ''}`}
                  style={{
                    background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                    ...(plan.popular ? { ringColor: plan.color, boxShadow: `0 0 40px ${plan.color}20` } : {}),
                  }}>
                  {plan.popular && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-bold text-white"
                      style={{ background: plan.color }}>Most Popular</div>
                  )}
                  {/* Card header */}
                  <div className="p-7 pb-6" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ background: plan.color + '18' }}>
                      <Icon size={20} style={{ color: plan.color }} />
                    </div>
                    <h3 className="text-[18px] font-extrabold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>{plan.name}</h3>
                    <p className="text-[13px] mb-5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{plan.desc}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[clamp(28px,4vw,38px)] font-extrabold" style={{ color: plan.color, fontFamily: 'var(--font-jakarta)' }}>{plan.price}</span>
                      <span className="text-[12px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>/{plan.duration}</span>
                    </div>
                  </div>
                  {/* Features */}
                  <div className="p-7 flex flex-col flex-1">
                    <ul className="space-y-3 mb-7 flex-1">
                      {plan.features.map(f => (
                        <li key={f.name} className="flex items-center gap-3 text-[13px]" style={{ fontFamily: 'var(--font-inter)' }}>
                          {f.ok
                            ? <Check size={14} style={{ color: '#34D399', flexShrink: 0 }} />
                            : <X size={14} style={{ color: 'var(--text-muted)', flexShrink: 0, opacity: 0.4 }} />}
                          <span style={{ color: f.ok ? 'var(--text-secondary)' : 'var(--text-muted)', opacity: f.ok ? 1 : 0.5 }}>{f.name}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contactUs"
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-semibold transition-all"
                      style={plan.popular
                        ? { background: `linear-gradient(135deg, ${plan.color}, #4F46E5)`, color: 'white' }
                        : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)' }}>
                      {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'} <ArrowRight size={13} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why section */}
      <section className="py-[80px] sm:py-[100px]" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-[clamp(22px,3.5vw,40px)] font-extrabold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              Why Our Pricing Model
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Lock, color: '#6366F1', title: 'Fixed Pricing', desc: 'No surprise costs. You know exactly what you\'re paying upfront.' },
              { icon: Clock, color: '#10B981', title: 'Clear Timelines', desc: 'Realistic timelines with regular progress updates throughout.' },
              { icon: Shield, color: '#A78BFA', title: 'Quality Guarantee', desc: 'Comprehensive testing and support — we stand behind our work.' },
              { icon: Headphones, color: '#F59E0B', title: 'Dedicated Support', desc: 'Ongoing support and maintenance after delivery.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} {...fadeUp(i * 0.07)}
                  className="p-6 rounded-[20px]" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: item.color + '18' }}>
                    <Icon size={18} style={{ color: item.color }} />
                  </div>
                  <h3 className="text-[15px] font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>{item.title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[80px] sm:py-[100px]">
        <div className="max-w-[760px] mx-auto px-5 sm:px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-[clamp(22px,3.5vw,40px)] font-extrabold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              Frequently Asked Questions
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} {...fadeUp(i * 0.06)}>
                <FAQ item={faq} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-[80px] sm:py-[100px] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80&fit=crop" alt="" fill className="object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(3,3,8,0.92), rgba(7,7,15,0.88))' }} />
        </div>
        <div className="relative z-10 max-w-[700px] mx-auto px-5 sm:px-6 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-[clamp(24px,4vw,42px)] font-extrabold mb-5 text-white" style={{ fontFamily: 'var(--font-jakarta)' }}>
              Ready to Get a Quote?
            </h2>
            <p className="text-[16px] mb-8 text-white/65" style={{ fontFamily: 'var(--font-inter)' }}>
              Tell us about your project and we'll provide a detailed, no-obligation proposal.
            </p>
            <Link href="/contactUs" className="btn-primary inline-flex items-center gap-2 justify-center">
              Get Free Quote <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
