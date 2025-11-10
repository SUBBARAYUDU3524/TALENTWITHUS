import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import LayoutWrapper from './components/LayoutWrapper';
import { UserProvider } from './components/context/UserContext';
import { Toaster } from 'react-hot-toast';

// ✅ Load high-quality Google Fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

// ✅ GLOBAL METADATA (Professional, AdSense-friendly, SEO optimized)
export const metadata = {
  metadataBase: new URL('https://www.talentwithus.com'),

  title: {
    default: 'TalentWithUs — Empowering Innovation Through Technology',
    template: '%s | TalentWithUs',
  },

  description:
    'TalentWithUs builds AI-driven digital solutions, connecting global talent with opportunities. We specialize in AI, automation, web & app development, cloud systems, and innovative digital products.',

  keywords: [
    'TalentWithUs',
    'AI automation',
    'Web development',
    'App development',
    'Chatbots',
    'Cloud Solutions',
    'Tech Startup',
    'Software services',
  ],

  // ✅ Canonical URL (Important for SEO)
  alternates: {
    canonical: 'https://www.talentwithus.com',
  },

  openGraph: {
    title: 'TalentWithUs — Intelligent Digital Innovation',
    description:
      'AI-powered digital solutions, scalable engineering, and global talent empowerment.',
    url: 'https://www.talentwithus.com',
    siteName: 'TalentWithUs',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.talentwithus.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TalentWithUs - AI & Digital Innovation',
      },
    ],
  },

  // ✅ Twitter SEO Metadata
  twitter: {
    card: 'summary_large_image',
    title: 'TalentWithUs — AI & Digital Innovation',
    description:
      'We help businesses build modern, intelligent, AI-driven digital products.',
    images: ['https://www.talentwithus.com/og-image.jpg'],
  },

  // ✅ Robots & Googlebot configuration
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  // ✅ Theme color based on system preference
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <UserProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </UserProvider>

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: { background: '#fff', color: '#333' },
          }}
        />
      </body>
    </html>
  );
}
