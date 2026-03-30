import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import LayoutWrapper from './components/LayoutWrapper';
import { UserProvider } from './components/context/UserContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  metadataBase: new URL('https://www.talentwithus.com'),
  title: {
    default: 'TalentWithUs — Enterprise Digital Solutions & AI Technology',
    template: '%s | TalentWithUs',
  },
  description:
    'TalentWithUs builds world-class digital products — AI automation, web & app development, cloud infrastructure, and scalable platforms for modern businesses.',
  keywords: ['TalentWithUs', 'AI automation', 'Web development', 'App development', 'Cloud Solutions', 'Tech Startup', 'Software services', 'Digital transformation'],
  alternates: { canonical: 'https://www.talentwithus.com' },
  openGraph: {
    title: 'TalentWithUs — Enterprise Digital Solutions',
    description: 'AI-powered digital solutions, scalable engineering, and global talent empowerment.',
    url: 'https://www.talentwithus.com',
    siteName: 'TalentWithUs',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://www.talentwithus.com/og-image.jpg', width: 1200, height: 630, alt: 'TalentWithUs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TalentWithUs — Enterprise Digital Solutions',
    description: 'We help businesses build modern, intelligent digital products.',
    images: ['https://www.talentwithus.com/og-image.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export const viewport = {
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#030308' }, { media: '(prefers-color-scheme: light)', color: '#030308' }],
};

// Inline script runs before any CSS/JS — prevents flash of wrong theme
const themeInitScript = `(function(){try{var t=localStorage.getItem('twu-theme');if(t==='light'){document.documentElement.classList.add('light');document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');}}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.variable} ${jakarta.variable} antialiased`}>
        <UserProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </UserProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3500,
            style: {
              background: 'var(--bg-card, #0C0C18)',
              color: 'var(--text-primary, #F1F5F9)',
              border: '1px solid var(--border-default, rgba(99,102,241,0.3))',
              borderRadius: '10px',
              fontSize: '14px',
              fontFamily: 'var(--font-inter)',
            },
          }}
        />
      </body>
    </html>
  );
}
