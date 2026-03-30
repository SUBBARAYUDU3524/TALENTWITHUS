'use client';

import React, { Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';

// Eagerly load the above-the-fold hero
import HeroVideoSection from './components/HeroVideoSection';

// Lazy load below-the-fold sections for performance
const WhatWeDo           = dynamic(() => import('./components/WhatWeDo'),           { ssr: false });
const WhyChooseUs        = dynamic(() => import('./components/WhyChooseUs'),        { ssr: false });
const TechStackShowcase  = dynamic(() => import('./components/TechStackShowcase'),  { ssr: false });
const IndustriesSection  = dynamic(() => import('./components/IndustriesSection'),  { ssr: false });
const Testimonial        = dynamic(() => import('./components/Testimonial'),        { ssr: false });
const CompanyBanner      = dynamic(() => import('./components/CompanyBanner'),      { ssr: false });

// Section loading skeleton
const SectionSkeleton = () => (
  <div className="py-[120px]" style={{ background: 'var(--bg-primary)' }}>
    <div className="max-w-[1280px] mx-auto px-6">
      <div className="h-8 w-48 rounded-xl mx-auto mb-4 shimmer" />
      <div className="h-12 w-96 rounded-xl mx-auto mb-8 shimmer" />
      <div className="grid grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-64 rounded-[20px] shimmer" />
        ))}
      </div>
    </div>
  </div>
);

export default function Page() {
  return (
    <div style={{ background: 'var(--bg-primary)' }}>
      {/* Hero is always SSR-ready */}
      <HeroVideoSection />

      {/* Lazy sections with graceful skeletons */}
      <Suspense fallback={<SectionSkeleton />}>
        <WhatWeDo />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <WhyChooseUs />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <TechStackShowcase />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <IndustriesSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Testimonial />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <CompanyBanner />
      </Suspense>
    </div>
  );
}
