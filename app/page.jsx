'use client';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Navbar from './components/Navbar';
const HeroVideoSection = lazy(() => import('./components/HeroVideoSection'));
const WhatWeDo = dynamic(() => import('./components/WhatWeDo'), { ssr: false });
const TechStackShowcase = dynamic(() => import('./components/TechStackShowcase'), { ssr: false });
const WhyChooseUs = dynamic(() => import('./components/WhyChooseUs'), { ssr: false });
const OurRecentCreations = dynamic(() => import('./components/OurRecentCreations'), { ssr: false });
const CompanyBanner = dynamic(() => import('./components/CompanyBanner'), { ssr: false });
const Testimonial = dynamic(() => import('./components/Testimonial'), { ssr: false });

// Enhanced SEO Component
const SEO = () => (
  <Head>
    <title>
      Talent With Us | Enterprise-Grade Digital Solutions | AI & Cloud Technology
    </title>
    <meta
      name="description"
      content="Talent With Us delivers cutting-edge digital transformation with enterprise-grade web applications, AI solutions, cloud infrastructure, and scalable mobile platforms."
    />
    <meta
      property="og:title"
      content="Talent With Us | Next-Generation Technology Solutions"
    />
    <meta
      property="og:description"
      content="Transform your business with our full-stack development, AI integration, and cloud-native solutions. Trusted by innovative companies worldwide."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://talentwithus.com/" />
    <meta
      property="og:image"
      content="https://talentwithus.com/assets/og-image-v2.jpg"
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@talentwithus" />
    <meta
      name="keywords"
      content="web development, AI solutions, cloud computing, mobile apps, digital transformation, enterprise software"
    />
    <meta
      name="robots"
      content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    />
    <link rel="canonical" href="https://talentwithus.com/" />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Talent With Us",
          "url": "https://talentwithus.com/",
          "logo": "https://talentwithus.com/logo.png",
          "description": "Enterprise-grade digital solutions and technology consulting",
          "sameAs": [
            "https://www.linkedin.com/company/talentwithus",
            "https://twitter.com/talentwithus"
          ]
        })
      }}
    />
  </Head>
);

const Page = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <SEO />
      <div className="min-h-screen text-gray-900 antialiased">
        <Navbar />
        <Suspense fallback={
          <div className="h-screen flex items-center justify-center">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-blue-600 h-12 w-12"></div>
            </div>
          </div>
        }>
          <HeroVideoSection />
          <WhatWeDo />
          <TechStackShowcase />
          <WhyChooseUs />
          <OurRecentCreations />
          <CompanyBanner />
          <Testimonial />
        </Suspense>
      </div>
    </>
  );
};

export default Page;