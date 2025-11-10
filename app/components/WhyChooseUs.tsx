'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import {
  Globe,
  Shield,
  BarChart2,
  Cpu,
  Zap,
  Users,
  Code,
  Cloud,
} from 'lucide-react';

// ✅ balanced, light-weight gradients + features
const features = [
  {
    icon: Globe,
    title: 'Pan-India Delivery',
    description:
      'Our technical teams deliver scalable solutions for clients in every major city, with deep understanding of local and global business needs.',
    gradient: 'from-blue-500 to-cyan-500',
    delay: 0,
  },
  {
    icon: Shield,
    title: 'Data Security First',
    description:
      'We implement advanced encryption, compliance (ISO 27001), and secure development practices to keep your IP and customer data safe.',
    gradient: 'from-green-500 to-emerald-500',
    delay: 0.1,
  },
  {
    icon: BarChart2,
    title: 'Business Insights',
    description:
      'Custom dashboards and analytics empower you with actionable insights, driving smarter decisions and higher ROI.',
    gradient: 'from-purple-500 to-pink-500',
    delay: 0.2,
  },
  {
    icon: Cpu,
    title: 'Modern Tech Stack',
    description:
      'We deliver solutions using React, Node.js, Python, AWS, and cloud-native & AI technologies.',
    gradient: 'from-orange-500 to-red-500',
    delay: 0.3,
  },
  {
    icon: Zap,
    title: 'Rapid Deployment',
    description:
      'Our agile teams launch MVPs in weeks and scale products fast to keep you ahead.',
    gradient: 'from-yellow-500 to-amber-500',
    delay: 0.4,
  },
  {
    icon: Users,
    title: 'Expert-Led Support',
    description:
      'Direct access to certified engineers & architects — no call center runarounds.',
    gradient: 'from-cyan-500 to-blue-500',
    delay: 0.5,
  },
  {
    icon: Code,
    title: 'Developer Focus',
    description:
      'Robust APIs, documentation, CI/CD pipelines — all built for dev efficiency.',
    gradient: 'from-pink-500 to-rose-500',
    delay: 0.6,
  },
  {
    icon: Cloud,
    title: 'Flexible Cloud Options',
    description:
      'On-premise, cloud, or hybrid deployment options with automated scaling.',
    gradient: 'from-indigo-500 to-purple-500',
    delay: 0.7,
  },
];

// ✅ cleaned and optimized stats animations
const stats = [
  { value: 50, label: 'Enterprise Projects Delivered', duration: 2, suffix: '+' },
  { value: 5, label: 'Years in Business', duration: 1.2, suffix: '+' },
  { value: 99.98, label: 'Uptime Across Deployments', decimals: 2, duration: 1.5, suffix: '%' },
  { value: 24, label: 'On-Demand Support', display: '24/7', isStatic: true },
];

// ✅ very light counter animation
function AnimatedNumber({ value, duration, decimals = 0, suffix = '', inView, display }: any) {
  const [num, setNum] = useState(0);

useEffect(() => {
  if (!inView || display) return;

  let start = performance.now();
  const animate = (now: number) => {
    const progress = Math.min((now - start) / (duration * 1000), 1);
    const next = decimals
      ? (value * progress).toFixed(decimals)
      : Math.round(value * progress);
    setNum(Number(next));
    if (progress < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}, [inView, value, duration, decimals, display]);


  return <span>{display || num}{suffix}</span>;
}

export default function WhyChooseUs() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [mouse, setMouse] = useState({ x: -500, y: -500 });

  // ✅ throttled mouse glow
  useEffect(() => {
    let timer: any;
    const handler = (e: MouseEvent) => {
      clearTimeout(timer);
      timer = setTimeout(() => setMouse({ x: e.clientX, y: e.clientY }), 20);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-slate-900">
      
      {/* ✅ Background glow shapes (GPU-only, zero CPU) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-48 -right-40 w-96 h-96 bg-purple-500/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-48 -left-40 w-96 h-96 bg-cyan-500/10 blur-3xl animate-pulse delay-500" />
      </div>

      {/* ✅ Grid texture (super light) */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 
            `linear-gradient(#ffffff22 1px, transparent 1px),
             linear-gradient(90deg, #ffffff22 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }}
      />

      {/* ✅ Soft mouse glow (throttled) */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"
        animate={{ x: mouse.x - 150, y: mouse.y - 150 }}
        transition={{ duration: 0.25 }}
      />

      <div className="relative z-10 container mx-auto px-6">

        {/* ✅ Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block py-2 px-4 mb-6 text-sm font-semibold text-cyan-400 bg-cyan-400/10 rounded-full border border-cyan-400/20">
            PARTNER FOR GROWTH
          </span>

          <h2 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-6">
            Why Leading Businesses Trust Us
          </h2>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Helping businesses across India accelerate digital growth with secure, scalable & innovative solutions.
          </p>
        </motion.div>

        {/* ✅ Stats (lightweight) */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { duration: 0.25 }
              }}
              className="relative text-center bg-gray-800/40 rounded-2xl p-8 border border-gray-700/40 hover:border-cyan-500/30 shadow-xl"
            >
              <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                <AnimatedNumber {...stat} inView={inView} />
              </p>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ✅ Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const IconComponent = f.icon;

            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: f.delay, duration: 0.7 }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 200, damping: 20 }
                }}
                className="relative bg-gray-800/40 rounded-2xl p-8 border border-gray-700/40 hover:border-cyan-500/30 shadow-xl text-center group"
              >
                {/* ✅ Subtle gradient glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />

                <div className={`relative z-10 w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white shadow-xl`}>
                  <IconComponent className="w-10 h-10" />
                </div>

                <h3 className="text-xl font-bold text-white mb-4">{f.title}</h3>

                <p className="text-gray-300">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ✅ CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="text-center mt-20"
        >
          <motion.a
            href="/contactUs"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(6, 182, 212, 0.3)',
            }}
            className="inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            Request Consultation
          </motion.a>

          <p className="text-gray-400 text-sm mt-4">
            Our consultants are available 24/7 to help you plan your next big move.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
