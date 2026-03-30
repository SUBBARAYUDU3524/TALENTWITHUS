import type { Metadata } from 'next';
import TalentProgramClient from './TalentProgramClient';

export const metadata: Metadata = {
  title: 'Talent Partnership Program — TalentWithUs',
  description: 'Partner with TalentWithUs: co-build innovative AI, web and mobile products, share revenue, and gain global exposure.',
};

export default function TalentProgramPage() {
  return <TalentProgramClient />;
}
