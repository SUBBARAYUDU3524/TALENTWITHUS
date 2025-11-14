'use client';

import React, { useEffect, useRef, useState, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import toast, { Toaster } from 'react-hot-toast';

/* -------------------- SEO Metadata -------------------- */
const SEO = () => (
  <Head>
    <title>Digital Excellence Services | TalentWithUs - AI, Web, Mobile & Cloud Innovation</title>
    <meta
      name="description"
      content="Cutting-edge digital services: AI automation, progressive web apps, cloud-native solutions, intelligent chatbots, and transformative digital experiences."
    />
    <meta
      name="keywords"
      content="AI innovation, web development, mobile applications, cloud architecture, intelligent automation, UX design, digital transformation"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#000000" />
    <meta property="og:title" content="Digital Innovation Services | TalentWithUs" />
    <meta
      property="og:description"
      content="From AI-powered automation to immersive digital experiences - we craft solutions that redefine business boundaries."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://talentwithus.com/services" />
    <meta property="og:image" content="https://talentwithus.com/og-services-innovative.jpg" />
    <link rel="canonical" href="https://talentwithus.com/services" />
  </Head>
);

/* -------------------- Types & Interfaces -------------------- */
interface ServiceRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
  serviceName: string;
  createdAt: any;
}

interface Service {
  id: number;
  title: string;
  icon: string;
  gradient: string;
  accentColor: string;
  description: string;
  shortDescription: string;
  features: string[];
  benefits: string[];
  industries: string[];
  process: string[];
  timeline: string;
  startingPrice: string;
  techStack: string[];
}

/* -------------------- Custom Hooks -------------------- */
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceName, setServiceName] = useState('');

  const open = useCallback((name: string) => {
    setServiceName(name);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setServiceName('');
    document.body.style.overflow = 'unset';
  }, []);

  return { isOpen, serviceName, open, close };
};

/* -------------------- 3D Innovation Background -------------------- */
const Dynamic3DInnovationBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null); 
  
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // Smooth Lighting
    const light = new THREE.PointLight(0x00eaff, 2, 15);
    light.position.set(0, 0, 4);
    scene.add(light);

    /* -------------------------------
       3D GRID MESH (Tech Innovation Grid)
    -------------------------------- */
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x0fffff,
      transparent: true,
      opacity: 0.25,
    });

    const gridGeometry = new THREE.BufferGeometry();
    const gridVertices = [];

    const size = 20;
    const divisions = 20;

    for (let i = -size; i <= size; i += size / divisions) {
      gridVertices.push(-size, i, 0, size, i, 0);
      gridVertices.push(i, -size, 0, i, size, 0);
    }

    gridGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(gridVertices, 3)
    );

    const gridLines = new THREE.LineSegments(gridGeometry, gridMaterial);
    gridLines.position.z = -5;
    scene.add(gridLines);

    /* -------------------------------
       FLOATING PARTICLES (Smooth, Lightweight)
    -------------------------------- */
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 400;

    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 12;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00eaff,
      size: 0.03,
      transparent: true,
      opacity: 0.9,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    /* -------------------------------
       Animation Loop
    -------------------------------- */
    const animate = () => {
      gridLines.rotation.x -= 0.0005;
      gridLines.rotation.y += 0.0005;

      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0003;

      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    animate();

    /* -------------------------------
       Resize Handling
    -------------------------------- */
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(requestRef.current!);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 w-full h-full pointer-events-none" />;
};

const DynamicBackground = dynamic(() => Promise.resolve(Dynamic3DInnovationBackground), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 via-black to-blue-900" />
});

/* -------------------- Service Form Component -------------------- */
const ServiceForm = React.forwardRef<HTMLFormElement, { 
  serviceName: string; 
  onSuccess?: () => void;
  accentColor?: string;
}>(({ serviceName, onSuccess, accentColor = 'cyan' }, ref) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loadingToast = toast.loading("Crafting your digital solution...");

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.dismiss(loadingToast);
    toast.success("Brilliant! Your innovation journey begins now.", { 
      duration: 5000,
      icon: '🚀'
    });
    
    setForm({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
    onSuccess?.();
  };

  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-600 border-cyan-400',
    purple: 'from-purple-500 to-pink-600 border-purple-400',
    green: 'from-green-500 to-emerald-600 border-green-400',
    orange: 'from-orange-500 to-red-600 border-orange-400',
    indigo: 'from-indigo-500 to-purple-600 border-indigo-400'
  };

  const currentColor = colorClasses[accentColor as keyof typeof colorClasses] || colorClasses.cyan;

  return (
    <form ref={ref} onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-2">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
          <span className="text-2xl">🚀</span>
        </div>
        <h3 className="text-2xl font-bold text-white">
          Start Your <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{serviceName}</span>
        </h3>
        <p className="text-gray-400 mt-2">Let's build something extraordinary together</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <input
            name="name"
            required
            placeholder="Your Name *"
            value={form.name}
            onChange={handleChange}
            className="w-full p-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-all duration-300"
          />
        </div>
        <div>
          <input
            name="email"
            type="email"
            required
            placeholder="Email Address *"
            value={form.email}
            onChange={handleChange}
            className="w-full p-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-all duration-300"
          />
        </div>
      </div>

      <input
        name="phone"
        required
        placeholder="Phone Number *"
        value={form.phone}
        onChange={handleChange}
        className="w-full p-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-all duration-300"
      />

      <textarea
        name="message"
        rows={4}
        placeholder="Tell us about your vision, challenges, and goals..."
        value={form.message}
        onChange={handleChange}
        className="w-full p-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-all duration-300 resize-none"
      />

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full bg-gradient-to-r ${currentColor} text-white font-bold py-4 rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
            />
            Crafting Your Future...
          </span>
        ) : (
          "Begin Innovation Journey"
        )}
      </motion.button>
    </form>
  );
});
ServiceForm.displayName = 'ServiceForm';

/* -------------------- Complete Service Data -------------------- */
const services: Service[] = [
  {
    id: 1,
    title: "AI & Intelligent Automation",
    icon: "🧠",
    gradient: "from-purple-500 to-pink-500",
    accentColor: "purple",
    description: "Transform your business with cutting-edge AI solutions that learn, adapt, and automate complex processes.",
    shortDescription: "Intelligent systems that evolve with your business",
    features: [
      "Machine Learning models tailored to your data",
      "Natural Language Processing for customer interactions",
      "Predictive analytics for strategic decision-making",
      "Computer vision for image and video analysis",
      "Automated workflow optimization",
      "AI-powered customer behavior analysis"
    ],
    benefits: [
      "85% reduction in manual processes",
      "Real-time insights from your data",
      "24/7 intelligent customer service",
      "Scalable AI infrastructure",
      "Enhanced decision-making capabilities"
    ],
    industries: ["Healthcare", "Finance", "E-commerce", "Manufacturing", "Logistics", "Customer Service"],
    process: ["Discovery", "Data Analysis", "Model Development", "Integration", "Training", "Optimization"],
    timeline: "4-12 weeks based on complexity",
    startingPrice: "Custom AI solutions from $15,000",
    techStack: ["TensorFlow", "PyTorch", "Python", "AWS SageMaker", "Google AI", "OpenAI"]
  },
  {
    id: 2,
    title: "Progressive Web Applications",
    icon: "💻",
    gradient: "from-blue-500 to-cyan-500",
    accentColor: "cyan",
    description: "Lightning-fast, app-like web experiences that work offline and engage users like never before.",
    shortDescription: "Native-like web experiences that defy limitations",
    features: [
      "Offline functionality with service workers",
      "Push notifications for user engagement",
      "App-like navigation and interactions",
      "Cross-platform compatibility",
      "SEO-optimized architecture",
      "Fast loading with code splitting"
    ],
    benefits: [
      "300% faster load times",
      "85% higher user engagement",
      "Works on any device, any network",
      "No app store approvals needed",
      "Lower development costs"
    ],
    industries: ["E-commerce", "Media", "SaaS", "Education", "Healthcare", "Banking"],
    process: ["Strategy", "Design", "Development", "Testing", "Deployment", "Analytics"],
    timeline: "6-10 weeks",
    startingPrice: "Enterprise PWAs from $12,000",
    techStack: ["React", "Next.js", "TypeScript", "Workbox", "Web APIs", "PWA"]
  },
  {
    id: 3,
    title: "Cross-Platform Mobile",
    icon: "📱",
    gradient: "from-green-500 to-emerald-500",
    accentColor: "green",
    description: "Beautiful, performant mobile applications that deliver native experiences on iOS and Android simultaneously.",
    shortDescription: "One codebase, infinite possibilities across platforms",
    features: [
      "Single codebase for iOS and Android",
      "Native performance with Flutter/React Native",
      "Offline data synchronization",
      "Hardware API integration",
      "App store deployment support",
      "Real-time updates and notifications"
    ],
    benefits: [
      "60% faster development time",
      "Consistent user experience",
      "Lower maintenance costs",
      "Faster time to market",
      "Easy updates and iterations"
    ],
    industries: ["Startups", "Enterprise", "Healthcare", "Finance", "Social", "E-commerce"],
    process: ["Prototyping", "UI/UX Design", "Development", "QA Testing", "Store Deployment", "Updates"],
    timeline: "8-14 weeks",
    startingPrice: "Cross-platform apps from $18,000",
    techStack: ["Flutter", "React Native", "Dart", "TypeScript", "Firebase", "Redux"]
  },
  {
    id: 4,
    title: "Cloud-Native Architecture",
    icon: "☁️",
    gradient: "from-orange-500 to-red-500",
    accentColor: "orange",
    description: "Scalable, resilient cloud infrastructure that grows with your business and ensures 99.99% uptime.",
    shortDescription: "Future-proof infrastructure that scales infinitely",
    features: [
      "Microservices architecture",
      "Container orchestration with Kubernetes",
      "Serverless computing",
      "Auto-scaling and load balancing",
      "Multi-region deployment",
      "Disaster recovery solutions"
    ],
    benefits: [
      "99.99% guaranteed uptime",
      "Auto-scaling during traffic spikes",
      "70% cost optimization",
      "Enterprise-grade security",
      "Global performance optimization"
    ],
    industries: ["SaaS", "E-commerce", "FinTech", "Healthcare", "IoT", "Gaming"],
    process: ["Assessment", "Architecture", "Migration", "Optimization", "Monitoring", "Support"],
    timeline: "4-16 weeks",
    startingPrice: "Cloud solutions from $8,000",
    techStack: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Docker", "Terraform"]
  },
  {
    id: 5,
    title: "Intelligent Chatbots",
    icon: "🤖",
    gradient: "from-yellow-500 to-amber-500",
    accentColor: "orange",
    description: "AI-powered conversational agents that provide 24/7 customer support and automate business processes.",
    shortDescription: "Conversational AI that understands and helps",
    features: [
      "Natural language understanding",
      "Multi-platform integration",
      "Sentiment analysis",
      "Human handoff capabilities",
      "Continuous learning from interactions",
      "Voice and text support"
    ],
    benefits: [
      "80% reduction in support costs",
      "Instant 24/7 customer service",
      "Lead generation automation",
      "Improved customer satisfaction",
      "Scalable support operations"
    ],
    industries: ["Customer Service", "E-commerce", "Healthcare", "Banking", "Real Estate", "Education"],
    process: ["Use Case Analysis", "Conversation Design", "AI Training", "Integration", "Testing", "Launch"],
    timeline: "4-8 weeks",
    startingPrice: "AI chatbots from $7,500",
    techStack: ["Dialogflow", "Rasa", "AWS Lex", "Python", "Node.js", "Webhooks"]
  },
  {
    id: 6,
    title: "UI/UX Design Innovation",
    icon: "🎨",
    gradient: "from-indigo-500 to-purple-500",
    accentColor: "purple",
    description: "Award-winning user experiences that combine beautiful design with intuitive functionality.",
    shortDescription: "Designs that users love and remember",
    features: [
      "User research and persona development",
      "Interactive prototypes and wireframes",
      "Usability testing and optimization",
      "Design system creation",
      "Accessibility compliance",
      "Motion design and micro-interactions"
    ],
    benefits: [
      "Increased user engagement",
      "Higher conversion rates",
      "Reduced bounce rates",
      "Strong brand identity",
      "Competitive market advantage"
    ],
    industries: ["Startups", "Enterprise", "SaaS", "E-commerce", "FinTech", "Healthcare"],
    process: ["Research", "Wireframing", "Visual Design", "Prototyping", "Testing", "Handoff"],
    timeline: "3-8 weeks",
    startingPrice: "UI/UX design from $9,000",
    techStack: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle", "Webflow"]
  },
  {
    id: 7,
    title: "Digital Transformation",
    icon: "🔄",
    gradient: "from-cyan-500 to-blue-500",
    accentColor: "cyan",
    description: "Comprehensive digital overhaul that modernizes your business processes and technology stack.",
    shortDescription: "Future-proof your entire business operations",
    features: [
      "Legacy system modernization",
      "Process automation",
      "Digital workflow implementation",
      "Change management strategy",
      "Performance analytics",
      "Continuous improvement framework"
    ],
    benefits: [
      "Increased operational efficiency",
      "Reduced manual errors",
      "Better data-driven decisions",
      "Future-ready infrastructure",
      "Competitive market positioning"
    ],
    industries: ["Manufacturing", "Healthcare", "Finance", "Retail", "Logistics", "Education"],
    process: ["Assessment", "Strategy", "Implementation", "Training", "Optimization", "Support"],
    timeline: "12-24 weeks",
    startingPrice: "Transformation from $25,000",
    techStack: ["ERP Systems", "CRM", "Automation Tools", "Analytics", "Cloud Platforms"]
  },
  {
    id: 8,
    title: "Support & Maintenance",
    icon: "⚙️",
    gradient: "from-pink-500 to-rose-500",
    accentColor: "pink",
    description: "Proactive monitoring, support, and continuous improvement for your digital products.",
    shortDescription: "Keep your digital assets running flawlessly",
    features: [
      "24/7 technical support",
      "Regular security updates",
      "Performance optimization",
      "Bug fixes and troubleshooting",
      "Feature enhancements",
      "Backup and disaster recovery"
    ],
    benefits: [
      "99.9% system availability",
      "Proactive issue resolution",
      "Continuous performance improvement",
      "Security compliance",
      "Peace of mind"
    ],
    industries: ["All Industries", "SaaS", "E-commerce", "Enterprise", "Startups"],
    process: ["Monitoring", "Regular Updates", "Security Patches", "Performance Checks", "User Support", "Reporting"],
    timeline: "Ongoing",
    startingPrice: "Support plans from $1,500/month",
    techStack: ["Monitoring Tools", "CI/CD", "Security Scanners", "Analytics", "Cloud Management"]
  }
];

/* -------------------- Service Card Component -------------------- */
const ServiceCard = React.memo(({ 
  service, 
  isActive, 
  onClick,
  index 
}: { 
  service: Service; 
  isActive: boolean; 
  onClick: () => void;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ 
      scale: 1.05, 
      y: -8,
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`relative cursor-pointer p-6 rounded-2xl border-2 transition-all duration-500 group overflow-hidden ${
      isActive
        ? `bg-gradient-to-br ${service.gradient} border-transparent text-white shadow-2xl`
        : 'bg-gray-800/40 backdrop-blur-sm border-gray-700/40 text-gray-300 hover:border-cyan-500/60'
    }`}
  >
    {/* Animated background effect */}
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
      isActive ? 'opacity-20' : ''
    } bg-gradient-to-br ${service.gradient}`} />
    
    <div className="relative z-10">
      <div className={`text-4xl mb-4 transform transition-transform duration-300 ${
        isActive ? 'scale-110' : 'group-hover:scale-110'
      }`}>
        {service.icon}
      </div>
      <h3 className="text-xl font-bold mb-3 leading-tight">{service.title}</h3>
      <p className="text-sm opacity-90 leading-relaxed">{service.shortDescription}</p>
      
      {/* Hover indicator */}
      <motion.div 
        className={`absolute bottom-4 left-6 right-6 h-0.5 bg-current opacity-0 ${
          isActive ? 'opacity-100' : 'group-hover:opacity-100'
        }`}
        initial={false}
        animate={{ width: isActive ? '100%' : '0%' }}
        transition={{ duration: 0.3 }}
      />
    </div>
  </motion.div>
));
ServiceCard.displayName = 'ServiceCard';

/* -------------------- Service Detail Component -------------------- */
const ServiceDetail = ({ service }: { service: Service }) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-gray-800/30 backdrop-blur-md rounded-3xl border border-gray-700/50 p-8 shadow-2xl"
    >
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <div className={`text-5xl w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
              {service.icon}
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white mb-3 leading-tight">{service.title}</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{service.description}</p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
              <span className="text-3xl">⚡</span> Core Capabilities
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30"
                >
                  <span className="text-cyan-400 mt-1 flex-shrink-0 text-lg">✓</span>
                  <span className="text-gray-300 leading-relaxed">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-3">
              <span className="text-3xl">📈</span> Business Impact
            </h3>
            <div className="grid gap-3">
              {service.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <span className="text-green-400 text-lg">🎯</span>
                  {benefit}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Tech Stack */}
          <div className="bg-gray-900/60 rounded-2xl p-6 border border-gray-800/50">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🛠️</span> Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-2 bg-cyan-500/10 text-cyan-300 rounded-lg text-sm font-medium border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-gray-900/60 rounded-2xl p-6 border border-gray-800/50">
            <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-3">
              Project Specifications
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Timeline</span>
                <span className="text-white font-bold">{service.timeline}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Investment</span>
                <span className="text-green-400 font-bold text-lg">{service.startingPrice}</span>
              </div>
            </div>
          </div>

          {/* Process */}
          <div className="bg-gray-900/60 rounded-2xl p-6 border border-gray-800/50">
            <h3 className="text-xl font-semibold text-white mb-4">Development Process</h3>
            <div className="space-y-3">
              {service.process.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-gray-300">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* -------------------- Hero Section Component -------------------- */
const HeroSection = ({ onStartClick }: { onStartClick?: () => void }) => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/80 z-10" />

    <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          Our Services
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-10"
        >
          From AI-powered automation to stunning web applications — we build complete digital
          solutions that help businesses <strong>grow, innovate, and succeed</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={onStartClick}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(34, 211, 238, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow-2xl min-w-[220px]"
          >
            Start Your Project
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-cyan-400 text-cyan-300 font-bold text-lg px-10 py-4 rounded-full hover:bg-cyan-400/10 transition-all min-w-[220px]"
          >
            View Our Work
          </motion.button>
        </motion.div>
      </motion.div>
    </div>

    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
    >
      <div className="w-8 h-12 border-2 border-cyan-400/70 rounded-full flex justify-center p-1.5">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1.5 h-3 bg-cyan-400 rounded-full"
        />
      </div>
    </motion.div>
  </section>
);

/* -------------------- Main Page Component -------------------- */
export default function InnovativeServicesPage() {
  const [activeService, setActiveService] = useState(0);
  const modal = useModal();

  const handleServiceClick = useCallback((index: number) => {
    setActiveService(index);
  }, []);

  const handleStartProject = useCallback((serviceName: string) => {
    modal.open(serviceName);
  }, [modal]);

  const handleHeroClick = useCallback(() => {
    modal.open(services[activeService].title);
  }, [activeService, modal]);

  return (
    <>
      <SEO />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 5000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
            borderRadius: '16px',
            padding: '18px',
            fontSize: '15px',
            backdropFilter: 'blur(10px)',
          },
          success: { 
            iconTheme: { primary: '#10b981', secondary: '#fff' },
            style: {
              background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
            }
          },
          loading: { 
            iconTheme: { primary: '#06b6d4', secondary: '#fff' } 
          },
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white overflow-x-hidden">
        {/* 3D Background applied to entire page */}
        <DynamicBackground />
        
        <HeroSection onStartClick={handleHeroClick} />

        {/* Services Section */}
        <section className="relative z-20 py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-20"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-black mb-8"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  SERVICES
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                We don't just build solutions—we craft <strong>digital experiences</strong> that 
                push boundaries and create <strong>transformative impact</strong>.
              </motion.p>
            </motion.div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isActive={activeService === index}
                  onClick={() => handleServiceClick(index)}
                  index={index}
                />
              ))}
            </div>

            {/* Service Details */}
            <ServiceDetail service={services[activeService]} />

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-24 p-12 bg-gray-900/40 backdrop-blur-md rounded-3xl border border-gray-700/50 relative overflow-hidden"
            >
              {/* Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-30" />
              
              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-black mb-6">
                  Ready to <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Redefine</span> Your Industry?
                </h3>
                <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                  Let's collaborate to build something that doesn't just follow trends—it sets them.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.button
                    onClick={() => handleStartProject(services[activeService].title)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg px-12 py-5 rounded-2xl shadow-2xl min-w-[280px]"
                  >
                    Start Your Project
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-cyan-400 text-cyan-300 font-bold text-lg px-12 py-5 rounded-2xl hover:bg-cyan-400/10 min-w-[280px] backdrop-blur-sm"
                  >
                    Book Strategy Call
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Modal */}
        <AnimatePresence>
          {modal.isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={modal.close}
              />
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                className="relative bg-gray-900/95 backdrop-blur-xl rounded-3xl border border-gray-700/70 shadow-2xl w-full max-w-2xl mx-auto p-8"
              >
                <button
                  onClick={modal.close}
                  className="absolute right-6 top-6 text-gray-400 hover:text-white text-3xl transition-colors z-10 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-800/50"
                  aria-label="Close"
                >
                  ×
                </button>
                
                <ServiceForm 
                  serviceName={modal.serviceName} 
                  onSuccess={modal.close}
                  accentColor={services.find(s => s.title === modal.serviceName)?.accentColor}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}