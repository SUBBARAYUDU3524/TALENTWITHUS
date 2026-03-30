import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Services — TalentWithUs',
  description: 'AI automation, web apps, mobile, cloud architecture, and digital transformation services built for startups and enterprises.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
