import type { Metadata } from 'next';
import BlogsClient from './BlogsClient';

export const metadata: Metadata = {
  title: 'Blog — TalentWithUs',
  description: 'Insights, tutorials, and updates on technology, software engineering, AI, and more from the TalentWithUs team.',
  openGraph: {
    title: 'Blog — TalentWithUs',
    description: 'Insights and updates from the TalentWithUs team.',
    type: 'website',
  },
};

export default function BlogsPage() {
  return <BlogsClient />;
}
