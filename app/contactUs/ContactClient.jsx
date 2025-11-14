

'use client';

import React, { useRef, useState } from 'react';
import { FiMail, FiSend, FiPhone, FiMapPin } from 'react-icons/fi';
import Image from 'next/image';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white relative overflow-x-hidden">
      {/* Decorative glow blob */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-400/15 blur-3xl rounded-full z-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-[#1EB8F3] via-[#00AEEF] to-[#0059FF] bg-clip-text text-transparent mb-5 tracking-tight flex items-center justify-center gap-3">
            <span>Connect with Talent With Us</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Got a project, idea, or just want to say hello? <br className="hidden md:block" />
            We would love to hear from you. Reach out and let us create something remarkable together.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-20">
          {/* Left - Contact Info */}
          <section className="flex flex-col gap-10 items-center lg:items-start">
            <figure className="relative h-72 w-full rounded-3xl overflow-hidden shadow-2xl bg-white">
              <Image
                src="/assets/contact.jpg"
                alt="Contact Us"
                fill
                className="object-cover scale-105"
                priority
              />
              <figcaption className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-800/30 to-[#1a1a1a]/70" />
            </figure>

            <div className="bg-white/90 p-8 rounded-3xl shadow-lg w-full">
              <h2 className="text-2xl font-bold text-cyan-700 mb-6 flex items-center gap-2">
                <FiMail /> Contact Information
              </h2>
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <div className="bg-cyan-500/10 p-3 rounded-xl hover:bg-cyan-100 transition">
                    <FiMail className="text-cyan-400 text-2xl" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs uppercase font-semibold">
                      Email
                    </div>
                    <a
                      href="mailto:contact@talentwithus.com"
                      className="text-cyan-800 text-lg font-semibold hover:underline hover:text-cyan-500 transition"
                    >
                      contact@talentwithus.com
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-[#f472b6]/10 p-3 rounded-xl hover:bg-[#f472b6]/20 transition">
                    <FiPhone className="text-fuchsia-400 text-2xl" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs uppercase font-semibold">
                      Phone
                    </div>
                    <a
                      href="tel:+919876543210"
                      className="text-fuchsia-700 text-lg font-semibold hover:underline hover:text-cyan-500 transition"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-blue-500/10 p-3 rounded-xl hover:bg-blue-200/20 transition">
                    <FiMapPin className="text-blue-400 text-2xl" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs uppercase font-semibold">
                      Address
                    </div>
                    <address className="not-italic text-blue-800 text-lg font-semibold">
                      Tirupati, Andhra Pradesh, India
                    </address>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Right - Form */}
          <section className="bg-white/90 p-10 rounded-3xl shadow-xl h-fit sticky top-8">
            <h2 className="text-2xl text-[#1EB8F3] font-black mb-6 flex items-center gap-2">
              <FiSend /> Send Us a Message
            </h2>

            {sent ? (
              <div className="text-green-600 font-bold text-lg py-6 text-center bg-green-50 rounded-lg border border-green-200">
                ✅ Thank you for reaching out! We'll get back to you within 24 hours.
              </div>
            ) : (
              <form
                ref={formRef}
                className="space-y-6"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="company"
                  className="hidden"
                  value={form.company}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                />
                
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`w-full px-4 py-3 bg-slate-50 rounded-lg text-gray-900 border ${
                      fieldErrors.name ? 'border-red-300 focus:ring-2 focus:ring-red-300' : 'border-slate-200 focus:ring-2 focus:ring-[#1EB8F3]'
                    }`}
                    placeholder="Enter your full name"
                    onChange={handleChange}
                    value={form.name}
                    required
                  />
                  {fieldErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`w-full px-4 py-3 bg-slate-50 rounded-lg text-gray-900 border ${
                      fieldErrors.email ? 'border-red-300 focus:ring-2 focus:ring-red-300' : 'border-slate-200 focus:ring-2 focus:ring-[#1EB8F3]'
                    }`}
                    placeholder="Enter your email address"
                    onChange={handleChange}
                    value={form.email}
                    required
                  />
                  {fieldErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className={`w-full px-4 py-3 bg-slate-50 rounded-lg text-gray-900 border ${
                      fieldErrors.subject ? 'border-red-300 focus:ring-2 focus:ring-red-300' : 'border-slate-200 focus:ring-2 focus:ring-[#1EB8F3]'
                    }`}
                    placeholder="What's this about?"
                    onChange={handleChange}
                    value={form.subject}
                    required
                  />
                  {fieldErrors.subject && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.subject}</p>
                  )}
                </div>
                
                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Your Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`w-full px-4 py-3 bg-slate-50 rounded-lg text-gray-900 border ${
                      fieldErrors.message ? 'border-red-300 focus:ring-2 focus:ring-red-300' : 'border-slate-200 focus:ring-2 focus:ring-[#1EB8F3]'
                    }`}
                    placeholder="Tell us about your project, requirements, or any questions you have..."
                    onChange={handleChange}
                    value={form.message}
                    required
                  />
                  {fieldErrors.message && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.message}</p>
                  )}
                </div>
                
                {error && (
                  <div className="text-red-500 font-medium text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={sending}
                  className={`w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#1EB8F3] to-[#0052CC] text-white cursor-pointer font-bold rounded-lg hover:from-[#0052CC] hover:to-[#1EB8F3] transition-all text-lg shadow-xl ${
                    sending ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {sending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <FiSend className="ml-3" />
                    </>
                  )}
                </button>
              </form>
            )}
          </section>
        </main>
        <section className="text-center mt-20">
          <p className="text-gray-600 text-lg">
            Prefer email? Reach us directly at{' '}
            <a
              href="mailto:contact@talentwithus.com"
              className="text-cyan-700 font-semibold underline hover:text-fuchsia-500"
            >
              contact@talentwithus.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}