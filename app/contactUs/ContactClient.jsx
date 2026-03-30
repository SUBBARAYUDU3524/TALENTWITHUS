'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Send, Phone, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
  company: '', // Honeypot field
};

export default function ContactClient() {
  const formRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!form.name.trim()) {
      errors.name = 'Full name is required';
    } else if (form.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }

    // Email validation
    if (!form.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!form.subject.trim()) {
      errors.subject = 'Subject is required';
    } else if (form.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters long';
    }

    // Message validation
    if (!form.message.trim()) {
      errors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Honeypot validation
    if (form.company.length > 0) {
      setError('Submission failed. Please try again.');
      return;
    }

    // Form validation
    if (!validateForm()) {
      setError('Please review your entries and try again.');
      return;
    }

    setSending(true);

    try {
      // Save to Firebase Firestore
      await addDoc(collection(db, 'contactSubmissions'), {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        submittedAt: serverTimestamp(),
        status: 'new',
        source: 'website_contact_form'
      });

      // Success
      setSent(true);
      setForm(initialForm);
      setFieldErrors({});
      if (formRef.current) formRef.current.reset();
      
    } catch (error) {
      console.error('Error saving contact form:', error);
      setError('Something went wrong while sending your message. Please try again or email us directly.');
    } finally {
      setSending(false);
    }
  };

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const inputClass = (hasError) => ({
    width: '100%',
    padding: '12px 16px',
    borderRadius: 12,
    fontSize: 14,
    outline: 'none',
    background: 'var(--bg-secondary)',
    border: `1px solid ${hasError ? '#EF4444' : 'var(--border-default)'}`,
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-inter)',
    transition: 'border-color 0.2s',
  });

  const contactItems = [
    { icon: Mail, label: 'Email', value: 'info@talentwithus.com', href: 'mailto:info@talentwithus.com', color: '#818CF8' },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210', color: '#34D399' },
    { icon: MapPin, label: 'Location', value: 'Bengaluru, Karnataka, India', href: null, color: '#F59E0B' },
  ];

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* Hero */}
      <section className="relative h-[62vh] min-h-[420px] flex items-center overflow-hidden">
        <div className="absolute inset-0 scale-110">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85&fit=crop"
            alt="Contact TalentWithUs"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(3,3,8,0.88) 0%, rgba(7,7,15,0.72) 55%, rgba(3,3,8,0.92) 100%)' }} />
        </div>
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
        <div ref={heroRef} className="relative z-10 max-w-[800px] mx-auto px-5 sm:px-6 text-center w-full">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="badge badge-indigo mb-5 mx-auto inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse inline-block" />
              Get in Touch
            </div>
            <h1 className="text-[clamp(28px,5vw,58px)] font-extrabold leading-[1.08] mb-5 text-white">
              Let's Build Something <span className="gradient-text">Remarkable</span>
            </h1>
            <p className="text-[16px] leading-relaxed max-w-[520px] mx-auto text-white/70">
              Got a project, idea, or just want to say hello? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-20" style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }} />
      </section>

      {/* Body */}
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 xl:gap-16">

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <div className="rounded-[24px] p-7 sm:p-10" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
            <h2 className="text-[20px] font-bold mb-6 flex items-center gap-2"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              <Send size={18} style={{ color: '#818CF8' }} /> Send Us a Message
            </h2>

            {sent ? (
              <div className="py-10 text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(52,211,153,0.12)' }}>
                  <CheckCircle size={28} style={{ color: '#34D399' }} />
                </div>
                <h3 className="text-[18px] font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>Message sent!</h3>
                <p className="text-[14px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* honeypot */}
                <input type="text" name="company" className="hidden" value={form.company} onChange={handleChange} tabIndex="-1" autoComplete="off" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-[13px] font-medium mb-1.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
                      Full Name <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input id="name" name="name" type="text" placeholder="John Smith" value={form.name} onChange={handleChange} required
                      style={inputClass(fieldErrors.name)}
                      onFocus={e => { if (!fieldErrors.name) e.currentTarget.style.borderColor = 'rgba(99,102,241,0.50)'; }}
                      onBlur={e => { if (!fieldErrors.name) e.currentTarget.style.borderColor = 'var(--border-default)'; }} />
                    {fieldErrors.name && <p className="text-[12px] mt-1" style={{ color: '#EF4444', fontFamily: 'var(--font-inter)' }}>{fieldErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[13px] font-medium mb-1.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
                      Email Address <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input id="email" name="email" type="email" placeholder="john@company.com" value={form.email} onChange={handleChange} required
                      style={inputClass(fieldErrors.email)}
                      onFocus={e => { if (!fieldErrors.email) e.currentTarget.style.borderColor = 'rgba(99,102,241,0.50)'; }}
                      onBlur={e => { if (!fieldErrors.email) e.currentTarget.style.borderColor = 'var(--border-default)'; }} />
                    {fieldErrors.email && <p className="text-[12px] mt-1" style={{ color: '#EF4444', fontFamily: 'var(--font-inter)' }}>{fieldErrors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[13px] font-medium mb-1.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
                    Subject <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input id="subject" name="subject" type="text" placeholder="What's this about?" value={form.subject} onChange={handleChange} required
                    style={inputClass(fieldErrors.subject)}
                    onFocus={e => { if (!fieldErrors.subject) e.currentTarget.style.borderColor = 'rgba(99,102,241,0.50)'; }}
                    onBlur={e => { if (!fieldErrors.subject) e.currentTarget.style.borderColor = 'var(--border-default)'; }} />
                  {fieldErrors.subject && <p className="text-[12px] mt-1" style={{ color: '#EF4444', fontFamily: 'var(--font-inter)' }}>{fieldErrors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-[13px] font-medium mb-1.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
                    Message <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <textarea id="message" name="message" rows={5} placeholder="Tell us about your project, requirements, or questions…" value={form.message} onChange={handleChange} required
                    style={{ ...inputClass(fieldErrors.message), resize: 'none' }}
                    onFocus={e => { if (!fieldErrors.message) e.currentTarget.style.borderColor = 'rgba(99,102,241,0.50)'; }}
                    onBlur={e => { if (!fieldErrors.message) e.currentTarget.style.borderColor = 'var(--border-default)'; }} />
                  {fieldErrors.message && <p className="text-[12px] mt-1" style={{ color: '#EF4444', fontFamily: 'var(--font-inter)' }}>{fieldErrors.message}</p>}
                </div>

                {error && (
                  <div className="text-[13px] px-4 py-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.20)', color: '#FCA5A5', fontFamily: 'var(--font-inter)' }}>
                    {error}
                  </div>
                )}

                <button type="submit" disabled={sending}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14.5px] font-semibold text-white disabled:opacity-60 transition-all"
                  style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)' }}>
                  {sending ? <><Loader2 size={15} className="animate-spin" /> Sending…</> : <><Send size={14} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Contact info sidebar */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-5">
          <div className="rounded-[24px] p-7" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
            <h2 className="text-[17px] font-bold mb-6 flex items-center gap-2"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              <Mail size={16} style={{ color: '#818CF8' }} /> Contact Info
            </h2>
            <ul className="space-y-5">
              {contactItems.map(({ icon: Icon, label, value, href, color }) => (
                <li key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                    <Icon size={17} style={{ color }} />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{label}</div>
                    {href ? (
                      <a href={href} className="text-[14px] font-medium transition-colors" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
                        onMouseEnter={e => { e.currentTarget.style.color = color; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                        {value}
                      </a>
                    ) : (
                      <span className="text-[14px] font-medium" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>{value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[24px] p-7" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(79,70,229,0.08))', border: '1px solid rgba(99,102,241,0.20)' }}>
            <h3 className="text-[15px] font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>Response Time</h3>
            <p className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              We typically respond within <span className="font-semibold text-indigo-400">24 hours</span> on business days. For urgent matters, email us directly.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}