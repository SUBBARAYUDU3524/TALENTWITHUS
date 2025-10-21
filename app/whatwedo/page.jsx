// app/digital-lab/page.jsx

import WhatWeDoClient from "./WhatWeDoClient";

export const metadata = {
  title: 'Digital Lab',
  description:
    'Discover Talent With Us Digital Lab — where we transform creative concepts into cutting-edge digital experiences using React, Next.js, and Tailwind CSS.',
  openGraph: {
    title: 'Digital Lab | Talent With Us',
    description:
      'Explore our digital innovation lab that blends design, technology, and strategy to craft impactful web experiences.',
    url: 'https://talentwithus.com/digital-lab',
    type: 'website',
    images: [
      {
        url: 'https://talentwithus.com/assets/projects.jpg',
        width: 1200,
        height: 630,
        alt: 'Talent With Us Digital Lab',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Talent With Us — Digital Lab',
    description:
      'Pushing boundaries in design and technology to create immersive digital solutions.',
    images: ['https://talentwithus.com/assets/projects.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://talentwithus.com/digital-lab' },
};

export default function DigitalLabPage() {
  return <WhatWeDoClient />;
}
