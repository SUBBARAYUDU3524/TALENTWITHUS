'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';

import {
  Globe,
  Smartphone,
  Bot,
  FileText,
  Workflow,
  BarChart3,
  Palette,
  Zap
} from 'lucide-react';

// ✅ Clean, minimal gradients
const SERVICE_CATEGORIES = [
  {
    value: 'web-development',
    label: 'Web Development',
    icon: Globe,
    gradient: 'from-blue-500 to-cyan-500',
    services: [
      'Corporate Websites',
      'E-commerce Platforms',
      'Web Applications',
      'Progressive Web Apps (PWA)',
      'Single Page Applications (SPA)',
      'CMS Development',
      'API Development',
      'Web Portals'
    ]
  },
  {
    value: 'mobile-apps',
    label: 'Mobile Applications',
    icon: Smartphone,
    gradient: 'from-green-500 to-emerald-500',
    services: [
      'iOS Native Apps',
      'Android Native Apps',
      'Cross-Platform Apps',
      'React Native Apps',
      'Flutter Applications',
      'Mobile Games',
      'Enterprise Mobile Solutions',
      'App Store Optimization'
    ]
  },
  {
    value: 'ai-ml',
    label: 'AI & Machine Learning',
    icon: Bot,
    gradient: 'from-purple-500 to-pink-500',
    services: [
      'Custom AI Models',
      'Chatbots & Virtual Assistants',
      'Computer Vision',
      'Natural Language Processing',
      'Predictive Analytics',
      'Recommendation Engines',
      'AI-powered Automation',
      'Machine Learning APIs'
    ]
  },
  {
    value: 'automation',
    label: 'Automation & Workflows',
    icon: Workflow,
    gradient: 'from-orange-500 to-red-500',
    services: [
      'Business Process Automation',
      'N8N Workflows',
      'Zapier Integrations',
      'RPA Automation',
      'CRM Automation',
      'Marketing Automation',
      'Data Processing Automation',
      'Custom Automation Tools'
    ]
  },
  {
    value: 'document-services',
    label: 'Document Services',
    icon: FileText,
    gradient: 'from-yellow-500 to-amber-500',
    services: [
      'PDF Automation',
      'OCR Systems',
      'Document Workflows',
      'E-Signature Solutions',
      'Document Management',
      'Form Processing',
      'Doc Generation',
      'Compliance Systems'
    ]
  },
  {
    value: 'business-tools',
    label: 'Business Tools',
    icon: BarChart3,
    gradient: 'from-cyan-500 to-blue-500',
    services: [
      'Salesforce Apps',
      'CRM Customization',
      'ERP Solutions',
      'BI Dashboards',
      'Project Management Tools',
      'SaaS Products',
      'Inventory Management',
      'HR Systems'
    ]
  },
  {
    value: 'creative-services',
    label: 'Creative Services',
    icon: Palette,
    gradient: 'from-pink-500 to-rose-500',
    services: [
      'UI/UX Design',
      'Branding',
      'Marketing Assets',
      'Animations',
      'Presentations',
      'Video Production',
      'Interactive Demos',
      'Prototypes'
    ]
  },
  {
    value: 'emerging-tech',
    label: 'Emerging Technologies',
    icon: Zap,
    gradient: 'from-indigo-500 to-purple-500',
    services: [
      'Blockchain',
      'IoT Applications',
      'AR/VR',
      'Voice Tech',
      'Cloud Native',
      'Microservices',
      'Serverless Apps',
      'Edge Computing'
    ]
  }
];

// ✅ FORM COMPONENT STARTS
export default function CreationRequestForm() {
  const [selectedCategory, setSelectedCategory] = useState(SERVICE_CATEGORIES[0].value);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    budget: '',
    timeline: '',
    description: '',
    requirements: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (selectedServices.length === 0) {
      setError('Please select at least one service.');
      return;
    }

    try {
      const payload = {
        category: selectedCategory,
        services: selectedServices,
        ...form,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'creationRequests'), payload);
      setSubmitted(true);
      setSelectedServices([]);
      setForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        budget: '',
        timeline: '',
        description: '',
        requirements: ''
      });
    } catch {
      setError('Something went wrong. Try again.');
    }
  };

  const currentCat = SERVICE_CATEGORIES.find(c => c.value === selectedCategory)!;

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-slate-900 py-16 px-4 flex justify-center">
      
      {/* ✅ MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl mx-auto bg-gray-800/40 border border-gray-700/40 backdrop-blur-md rounded-3xl shadow-2xl relative z-10 p-8"
      >
        {/* ✅ HEADER */}
        {!submitted && (
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Start Your Digital Journey
            </h2>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Tell us what you want to build — we create powerful digital products
            </p>
          </div>
        )}

        {/* ✅ SUCCESS MESSAGE */}
        {submitted && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-12 bg-green-500/20 border border-green-500/30 rounded-2xl text-center text-white shadow-xl"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Request Submitted!</h3>
            <p className="text-gray-200">
              Our team will contact you within 24 hours.
            </p>
          </motion.div>
        )}

        {!submitted && (
          <div className="space-y-10">

            {/* ✅ CATEGORY SELECTION */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Choose Service Category
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SERVICE_CATEGORIES.map(cat => {
                  const Icon = cat.icon;
                  const active = selectedCategory === cat.value;

                  return (
                    <motion.button
                      key={cat.value}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`p-5 rounded-2xl border transition-all duration-300 ${
                        active
                          ? `bg-gradient-to-br ${cat.gradient} border-transparent text-white shadow-xl`
                          : 'bg-gray-700/40 border-gray-600 text-gray-300 hover:border-cyan-500/50'
                      }`}
                    >
                      <Icon className="w-8 h-8 mb-3" />
                      <span className="font-semibold text-sm">{cat.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* ✅ FORM BODY */}
            <div className="grid lg:grid-cols-2 gap-10">

              {/* ✅ SERVICES LIST */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Select Services
                </h3>

                <div className="space-y-3 max-h-96 overflow-y-auto custom-scroll">
                  {currentCat.services.map(service => {
                    const checked = selectedServices.includes(service);

                    return (
                      <motion.label
                        key={service}
                        whileHover={{ scale: 1.01, backgroundColor: "rgba(6,182,212,0.06)" }}
                        className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${
                          checked
                            ? 'bg-cyan-500/15 border-cyan-500 text-cyan-400'
                            : 'bg-gray-700/20 border-gray-600 text-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleService(service)}
                          className="mr-3 accent-cyan-500"
                        />
                        {service}
                      </motion.label>
                    );
                  })}
                </div>
              </div>

              {/* ✅ PROJECT DETAILS */}
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* INPUT ROW 1 */}
                <div className="grid md:grid-cols-2 gap-4">
                  <TextInput label="Project Name *" name="name" value={form.name} onChange={handleChange} required />
                  <TextInput label="Company / Organization" name="company" value={form.company} onChange={handleChange} />
                </div>

                {/* INPUT ROW 2 */}
                <div className="grid md:grid-cols-2 gap-4">
                  <TextInput label="Email Address *" name="email" type="email" required value={form.email} onChange={handleChange} />
                  <TextInput label="Phone Number *" name="phone" required value={form.phone} onChange={handleChange} />
                </div>

                {/* SELECT ROW */}
                <div className="grid md:grid-cols-2 gap-4">
                  <SelectInput label="Estimated Budget" name="budget" value={form.budget} onChange={handleChange} options={[
                    "1k-5k",
                    "5k-15k",
                    "15k-50k",
                    "50k+",
                    "Custom Quote"
                  ]} />

                  <SelectInput label="Timeline" name="timeline" value={form.timeline} onChange={handleChange} options={[
                    "1-2 months",
                    "3-6 months",
                    "6-12 months",
                    "12+ months",
                    "Flexible"
                  ]} />
                </div>

                {/* DESCRIPTION */}
                <TextArea
                  label="Project Description *"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={3}
                />

                <TextArea
                  label="Specific Requirements"
                  name="requirements"
                  value={form.requirements}
                  onChange={handleChange}
                  rows={2}
                />

                {/* ERROR */}
                {error && (
                  <p className="text-red-400 text-center p-3 bg-red-400/10 rounded-xl border border-red-400/20">
                    {error}
                  </p>
                )}

                {/* SUBMIT */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-xl shadow-xl"
                >
                  Submit Request
                </motion.button>

              </form>
            </div>

          </div>
        )}
      </motion.div>

      {/* ✅ Scroll Styles */}
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(6,182,212,0.4);
          border-radius: 100px;
        }
      `}</style>

    </section>
  );
}

/* ✅ REUSABLE INPUT COMPONENTS — ultra-light */
function TextInput({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-gray-300 mb-1">{label}</label>
      <input
        {...props}
        className="w-full bg-gray-700/30 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 outline-none"
      />
    </div>
  );
}

function SelectInput({ label, name, value, onChange, options }: any) {
  return (
    <div>
      <label className="block text-gray-300 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-gray-700/30 border border-gray-600 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-cyan-500"
      >
        <option value="">Select</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function TextArea({ label, rows = 3, ...props }: any) {
  return (
    <div>
      <label className="block text-gray-300 mb-1">{label}</label>
      <textarea
        rows={rows}
        {...props}
        className="w-full bg-gray-700/30 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-cyan-500 outline-none"
      />
    </div>
  );
}
