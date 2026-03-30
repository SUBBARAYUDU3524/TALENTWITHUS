import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About — TalentWithUs',
  description: 'TalentWithUs empowers businesses with intelligent, scalable AI-powered digital solutions. Learn about our mission to drive innovation globally.',
};

export default function AboutPage() {
  return <AboutClient />;
}
