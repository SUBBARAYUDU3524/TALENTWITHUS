'use client';

import React, { useEffect, useRef,useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import Head from 'next/head';
import ApplyModal from '../components/ApplyModel';


/* -------------------- SEO METADATA -------------------- */
const SEO = () => (
  <Head>
    <title>Talent Partnership Program | TalentWithUs - Co-create, Collaborate, and Grow</title>
    <meta
      name="description"
      content="Join TalentWithUs Talent Partnership Program. Developers, designers, and creators can co-build innovative products, share revenue, and gain global exposure."
    />
    <meta
      name="keywords"
      content="talent partnership, co-creation program, startup collaboration, developer program, designer partnership, TalentWithUs program"
    />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="Talent Partnership Program | TalentWithUs" />
    <meta
      property="og:description"
      content="Partner with TalentWithUs and build real-world AI, web, and mobile projects. Earn, learn, and grow globally."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://talentwithus.com/talent-program" />
    <meta property="og:image" content="https://talentwithus.com/og-talent.jpg" />
    <link rel="canonical" href="https://talentwithus.com/talent-program" />
  </Head>
);

/* -------------------- BACKGROUND -------------------- */
const FloatingNetworkBackground = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    ref.current.appendChild(renderer.domElement);

    const particlesCount = 300;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) positions[i] = (Math.random() - 0.5) * 20;
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.03,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const animate = () => {
      particles.rotation.y += 0.0015;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={ref} className="fixed inset-0 z-0" />;
};

/* -------------------- HERO SECTION -------------------- */
const HeroSection = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-center">
    <FloatingNetworkBackground />
    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-10" />
    <div className="relative z-20 max-w-5xl mx-auto px-6">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
      >
        Talent Partnership Program
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg md:text-2xl text-gray-300 leading-relaxed mb-10"
      >
        Collaborate with <span className="text-cyan-400 font-semibold">TalentWithUs</span> to build next-gen AI, Web, and Cloud projects.  
        Learn, innovate, and grow with real-world exposure.
      </motion.p>
      <motion.a
        href="/contact"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg px-8 py-4 rounded-2xl shadow-xl"
      >
        Join the Program
      </motion.a>
    </div>
  </section>
);

/* -------------------- WHY JOIN -------------------- */
const WhyJoinSection = () => {
  const reasons = [
    {
      icon: '🌍',
      title: 'Global Collaboration',
      text: 'Work with international teams and real business clients across industries.',
    },
    {
      icon: '💰',
      title: 'Revenue Sharing',
      text: 'Earn while you contribute — transparent, project-based earning models.',
    },
    {
      icon: '🚀',
      title: 'Skill Growth',
      text: 'Upskill yourself through hands-on experience with emerging technologies.',
    },
    {
      icon: '🤝',
      title: 'Mentorship & Guidance',
      text: 'Learn directly from our senior AI, cloud, and design experts.',
    },
  ];

  return (
    <section className="relative z-10 py-20 px-6 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
        >
          Why Join TalentWithUs Program?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-800/40 border border-gray-700/40 rounded-3xl p-6 text-center backdrop-blur-sm hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-3">{r.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{r.title}</h3>
              <p className="text-gray-300">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------- OPPORTUNITIES -------------------- */
const Opportunities = () => {
  const roles = [
    {
      icon: '💻',
      title: 'Developers',
      desc: 'Contribute to AI, web, and mobile app development projects using modern frameworks.',
    },
    {
      icon: '🎨',
      title: 'Designers',
      desc: 'Craft exceptional UI/UX, product design, and branding for global products.',
    },
    {
      icon: '🧠',
      title: 'AI Enthusiasts',
      desc: 'Collaborate on real-world machine learning and AI model integrations.',
    },
    {
      icon: '🎓',
      title: 'Students',
      desc: 'Gain hands-on experience through mentorship, internships, and live projects.',
    },
    {
      icon: '🏢',
      title: 'Agencies',
      desc: 'Partner with us to co-develop or white-label technology solutions for clients.',
    },
  ];

  return (
    <section className="relative z-10 py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-blue-950">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600"
        >
          Partnership Opportunities
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {roles.map((role) => (
            <motion.div
              key={role.title}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 border border-gray-700/50 rounded-3xl p-8 text-left hover:border-cyan-400/50 transition-all"
            >
              <div className="text-4xl mb-3">{role.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{role.title}</h3>
              <p className="text-gray-300">{role.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------- WORKFLOW -------------------- */
const Workflow = () => {
  const steps = [
    { step: '1️⃣', title: 'Apply Online', text: 'Submit your profile and interests through our form.' },
    { step: '2️⃣', title: 'Screening', text: 'Our team evaluates your portfolio or GitHub contributions.' },
    { step: '3️⃣', title: 'Onboarding', text: 'You’ll get access to our collaboration dashboard.' },
    { step: '4️⃣', title: 'Collaborate & Earn', text: 'Contribute to projects, gain credits, and share profits.' },
  ];

  return (
    <section className="relative z-10 py-20 px-6 bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {steps.map((s) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-800/40 border border-gray-700/40 rounded-3xl p-6 text-left backdrop-blur-sm hover:border-cyan-400/50"
            >
              <div className="text-3xl mb-2">{s.step}</div>
              <h3 className="text-xl font-semibold text-white mb-1">{s.title}</h3>
              <p className="text-gray-300">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------- CTA -------------------- */
const CTA = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <section className="relative z-10 py-20 text-center bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Partner with TalentWithUs?
          </h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
            Join our global community of innovators and shape the future.
          </p>

          <motion.button
            whileHover={{ scale: 1.06 }}
            onClick={() => setOpenForm(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold"
          >
            Apply Now
          </motion.button>
        </div>
      </section>

      <ApplyModal open={openForm} onClose={() => setOpenForm(false)} />
    </>
  );
};

/* -------------------- MAIN PAGE -------------------- */
export default function TalentProgramPage() {
  return (
    <>
      <SEO />
      <main className="min-h-screen bg-black text-white overflow-hidden">
        <HeroSection />
        <WhyJoinSection />
        <Opportunities />
        <Workflow />
        <CTA />
      </main>
    </>
  );
}
