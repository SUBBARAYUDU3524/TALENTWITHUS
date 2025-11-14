
'use client';

import React from 'react';
import OpenPositions from '../components/OpenPositions';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { 
  FaHandsHelping, 
  FaRocket, 
  FaUserGraduate, 
  FaGlobeAmericas,
  FaBriefcase,
  FaLock
} from 'react-icons/fa';
import HeroSection from '../components/careers/HeroSection';

const culturePoints = [
  {
    icon: <FaHandsHelping className="text-blue-600 w-8 h-8" />,
    title: 'Collaboration',
    desc: 'We believe the best solutions come from working together.',
  },
  {
    icon: <FaRocket className="text-blue-600 w-8 h-8" />,
    title: 'Innovation',
    desc: 'We encourage bold ideas and continuous improvement.',
  },
  {
    icon: <FaUserGraduate className="text-blue-600 w-8 h-8" />,
    title: 'Growth Mindset',
    desc: 'Personal and professional development is part of every role.',
  },
  {
    icon: <FaGlobeAmericas className="text-blue-600 w-8 h-8" />,
    title: 'Diversity & Inclusion',
    desc: 'We welcome team members from all backgrounds and experiences.',
  },
];

export default function CareersClient() {
  const { user, loading } = useAuth();

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Culture & Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Culture & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We foster an environment where innovation thrives and every team member can grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {culturePoints.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-blue-300 group"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-4 group-hover:bg-blue-100 transition-colors">
                  {icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <FaBriefcase className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Open Positions
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore current opportunities and find your perfect role in our growing team.
            </p>
          </div>


          {/* Open Positions Component */}
          <div className="max-w-6xl mx-auto">
            <OpenPositions />
          </div>
        </div>
      </section>

      {/* Quick Apply Section */}
      <section className="py-16 bg-gradient-to-br">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl text-white">📩</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Don't See the Perfect Role?
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for innovation. 
              Send us your resume and tell us how you can contribute to our team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:careers@talentwithus.com?subject=Open Application&body=Hi Team, I'm interested in exploring opportunities with Talent With Us. Here's a brief about myself..."
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Send Open Application
              </a>
              
              <div className="text-sm text-gray-500">
                or email directly to{' '}
                <a
                  href="mailto:info@talentwithus.com"
                  className="text-blue-600 hover:text-blue-700 font-medium underline"
                >
                  info@talentwithus.com
                </a>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              We typically respond within 1-2 business days
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}