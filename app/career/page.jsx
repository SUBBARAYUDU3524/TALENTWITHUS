import CareersClient from './CareersClient';

export const metadata = {
  title: 'Careers at Talent With Us',
  description:
    'Join Talent With Us! Explore our company culture and open tech positions. Grow with an innovative, diverse team. Apply now for Frontend, Backend, and UI/UX roles.',
  openGraph: {
    title: 'Careers at Talent With Us',
    description:
      'Build impactful digital solutions with Talent With Us. See open jobs and company values.',
    url: 'https://talentwithus.in/careers',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function CareersPage() {
  // This is a Server Component — no hooks allowed here
  return <CareersClient />;
}
