import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Talent With Us | Project Inquiry & Support',
  description:
    "Get in touch with Talent With Us for project inquiries, ideas, or support. Let's create something remarkable together. Contact us via email, phone, or our secure form.",
  openGraph: {
    title: 'Connect with Talent With Us | Contact, Project, Support',
    description:
      'Got a project, idea, or just want to say hello? We’d love to hear from you. Reach out and let’s create something remarkable together.',
    url: 'https://talentwithus.com/contact',
    type: 'website',
    images: ['https://talentwithus.com/assets/contact.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://talentwithus.com/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
