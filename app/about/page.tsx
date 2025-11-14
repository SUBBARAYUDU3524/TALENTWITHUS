// app/about/page.tsx
'use client';

import React, { useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import Head from 'next/head';

/* -------------------- SEO METADATA -------------------- */
const SEO = () => (
  <Head>
    <title>About TalentWithUs | Empowering Talent & Innovation</title>
    <meta
      name="description"
      content="TalentWithUs empowers businesses and creators with intelligent, scalable, and AI-powered digital solutions. Learn about our mission to drive innovation globally."
    />
    <meta
      name="keywords"
      content="TalentWithUs, AI, software development, digital innovation, web development, cloud computing, automation, tech startup, AI company"
    />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="TalentWithUs Team" />
    <meta property="og:title" content="About TalentWithUs | Empowering Talent & Innovation" />
    <meta
      property="og:description"
      content="We connect talent and technology to shape the future of digital innovation through AI, design, and engineering."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.talentwithus.com/about" />
    <meta property="og:image" content="https://www.talentwithus.com/og-about.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="About TalentWithUs" />
    <meta
      name="twitter:description"
      content="Explore how TalentWithUs combines AI, engineering, and creativity to deliver transformative digital products."
    />
    <meta name="twitter:image" content="https://www.talentwithus.com/og-about.jpg" />
    <link rel="canonical" href="https://www.talentwithus.com/about" />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'TalentWithUs',
          url: 'https://www.talentwithus.com',
          logo: 'https://www.talentwithus.com/logo.png',
          sameAs: [
            'https://www.linkedin.com/company/talentwithus',
            'https://twitter.com/talentwithus',
            'https://www.instagram.com/talentwithus',
          ],
          description:
            'TalentWithUs is a global innovation hub empowering talent and enterprises with cutting-edge AI and digital engineering.',
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'info@talentwithus.com',
            contactType: 'Customer Support',
          },
        }),
      }}
    />
  </Head>
);

/* -------------------- HERO SECTION (Improved 3D background) -------------------- */
const HeroSection = ({ onScrollTo }: { onScrollTo: (id: string) => void }) => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const nodesRef = useRef<THREE.Points | null>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (!canvasRef.current || canvasRef.current.children.length > 0) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    canvasRef.current.appendChild(renderer.domElement);

    // Create particles with improved distribution
    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Spherical distribution for more interesting movement
      const radius = 4 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
      
      // Color variation
      colors[i] = 0.2 + Math.random() * 0.3; // R
      colors[i + 1] = 0.6 + Math.random() * 0.4; // G
      colors[i + 2] = 0.8 + Math.random() * 0.2; // B
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    nodesRef.current = particles;

    // Create connecting lines with dynamic behavior
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 3);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4488ff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
    linesRef.current = lines;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    // Add directional light for depth
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const target = new THREE.Vector2();
    const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX - windowHalf.x) / windowHalf.x;
      mouse.y = (event.clientY - windowHalf.y) / windowHalf.y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop with smooth rotations and interactions
    const clock = new THREE.Clock();

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      const delta = clock.getDelta();
      
      if (particles) {
        // Smooth rotation with mouse interaction
        target.x = mouse.x * 0.0005;
        target.y = mouse.y * 0.0005;
        
        particles.rotation.x += (target.y - particles.rotation.x) * 0.05;
        particles.rotation.y += (target.x - particles.rotation.y) * 0.05;
        
        // Additional subtle floating animation
        particles.rotation.z = Math.sin(time * 0.3) * 0.02;
      }

      if (lines) {
        lines.rotation.copy(particles.rotation);
        
        // Update line connections dynamically
        const positions = particlesGeometry.attributes.position.array as Float32Array;
        const linePositions = lineGeometry.attributes.position.array as Float32Array;
        
        let lineIndex = 0;
        const connectionDistance = 3.5;
        
        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const i3 = i * 3;
            const j3 = j * 3;
            
            const dx = positions[i3] - positions[j3];
            const dy = positions[i3 + 1] - positions[j3 + 1];
            const dz = positions[i3 + 2] - positions[j3 + 2];
            const dist = dx * dx + dy * dy + dz * dz;
            
            if (dist < connectionDistance) {
              // Add some dynamic movement to connections
              const pulse = Math.sin(time * 2 + i + j) * 0.1 + 0.9;
              
              linePositions[lineIndex] = positions[i3] * pulse;
              linePositions[lineIndex + 1] = positions[i3 + 1] * pulse;
              linePositions[lineIndex + 2] = positions[i3 + 2] * pulse;
              linePositions[lineIndex + 3] = positions[j3] * pulse;
              linePositions[lineIndex + 4] = positions[j3 + 1] * pulse;
              linePositions[lineIndex + 5] = positions[j3 + 2] * pulse;
              
              lineIndex += 6;
            }
          }
        }
        
        lineGeometry.setDrawRange(0, lineIndex / 3);
        lineGeometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (renderer && canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-black to-blue-950"
      role="region"
      aria-label="About TalentWithUs"
    >
      <div ref={canvasRef} className="absolute inset-0 z-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-10" />

      <div className="relative z-20 flex h-full items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            About TalentWithUs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-200 leading-relaxed mb-10"
          >
            We merge design, engineering, and AI to build intelligent, scalable, and human-centered
            technology solutions — connecting global talent with endless possibilities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center gap-4"
          >
            <button
              onClick={() => onScrollTo('who-we-are')}
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 text-white font-semibold shadow-lg hover:brightness-110 transition transform hover:scale-105"
            >
              Discover Our Vision
            </button>
            <button
              onClick={() => onScrollTo('what-we-do')}
              className="rounded-2xl border border-white/30 px-8 py-3 text-white font-semibold hover:bg-white/10 transition transform hover:scale-105"
            >
              Explore Services
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* -------------------- WHO WE ARE -------------------- */
const WhoWeAreSection = () => {
  const items = [
    {
      icon: '🚀',
      title: 'Who We Are',
      desc: 'A global collective of engineers, designers, and product builders driving purposeful digital innovation.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: '🎯',
      title: 'Our Mission',
      desc: 'To connect untapped talent with meaningful projects and equip teams with AI-first, scalable solutions.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '🌍',
      title: 'Our Vision',
      desc: 'To be the platform where creators and enterprises collaborate to shape the next wave of digital experiences.',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section id="who-we-are" className="py-20 px-6 bg-gradient-to-br from-slate-900 to-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          Innovating Beyond Boundaries
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((it, index) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gray-800/50 backdrop-blur rounded-3xl p-8 border border-gray-700 hover:shadow-2xl transition cursor-pointer"
            >
              <div className={`text-4xl mb-4 bg-clip-text text-transparent bg-gradient-to-br ${it.gradient}`}>
                {it.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">{it.title}</h3>
              <p className="text-gray-300 leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------- WHAT WE DO -------------------- */
const WhatWeDoSection = () => {
  const services = [
    { icon: '🤖', title: 'AI & Automation', desc: 'Custom AI models and automation pipelines.', tags: ['AI Models', 'Chatbots', 'Automation'] },
    { icon: '💻', title: 'Web & App Engineering', desc: 'Scalable full-stack apps and mobile experiences.', tags: ['Next.js', 'React', 'Flutter'] },
    { icon: '☁️', title: 'Cloud & DevOps', desc: 'Secure cloud architecture and CI/CD pipelines.', tags: ['AWS', 'CI/CD', 'Serverless'] },
    { icon: '🎨', title: 'Design & Branding', desc: 'Purposeful design systems and motion branding.', tags: ['UI/UX', 'Branding', 'Motion'] },
    { icon: '📈', title: 'Digital Transformation', desc: 'Analytics, ERP, and business automation.', tags: ['Analytics', 'ERP', 'Automation'] },
    { icon: '🤝', title: 'Talent Collaboration', desc: 'Partner programs and incubation for creators.', tags: ['Partnership', 'Mentorship', 'Incubation'] },
  ];

  return (
    <section id="what-we-do" className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
        >
          What We Do
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, index) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:shadow-2xl transition cursor-pointer"
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------- CONTACT SECTION -------------------- */
const ContactSection = () => (
  <section id="contact" className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black">
    <div className="max-w-6xl mx-auto text-center">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
      >
        Let's Build the Future Together
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-gray-300 mb-12"
      >
        Have an idea or project? Partner with TalentWithUs to design, build, and scale transformative products.
      </motion.p>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col md:flex-row justify-center gap-6 mb-12"
      >
        <a href="mailto:info@talentwithus.com" className="text-gray-300 hover:text-cyan-400 transition">📧 info@talentwithus.com</a>
        <a href="tel:+919812345678" className="text-gray-300 hover:text-cyan-400 transition">📞 +91 98123 45678</a>
        <a href="https://www.talentwithus.com" className="text-gray-300 hover:text-cyan-400 transition">🌐 talentwithus.com</a>
      </motion.div>
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => (window.location.href = '/contact')}
        className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-3 text-white font-semibold shadow-lg hover:brightness-110 transition"
      >
        Start Your Project
      </motion.button>
    </div>
  </section>
);

/* -------------------- PAGE WRAPPER -------------------- */
export default function AboutUsPage() {
  const smoothScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEO />
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-x-hidden">
        <HeroSection onScrollTo={smoothScroll} />
        <WhoWeAreSection />
        <WhatWeDoSection />
        <ContactSection />
      </main>
    </>
  );
}