import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import LayoutWrapper from './components/LayoutWrapper';
// import { ThemeProvider } from './context/ThemeContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// export const metadata = {
//   title: {
//     default: 'Talent With Us | Digital Innovation Experts',
//     template: '%s | Talent With Us',
//   },
//   description:
//     'Talent With Us connects skilled professionals and growing businesses through innovative digital solutions. We specialize in empowering talent, fostering remote opportunities, and helping organizations build exceptional teams worldwide.',
// };

export const metadata = {
  // metadataBase is crucial! It sets the base URL for all relative URLs,
  // like the one for your 'og:image'.
  metadataBase: new URL('https://www.talentwithus.com'),

  title: {
    default: 'Talent With Us | Connecting Talent with Opportunity', // Default title for homepage
    template: '%s | Talent With Us', // Template for all other pages (e.g., "About Us | TALENTWITHUS")
  },
  description:
    'Talent With Us connects skilled professionals and growing businesses through innovative digital solutions. We specialize in empowering talent, fostering remote opportunities, and helping organizations build exceptional teams worldwide..',

  // Open Graph (for Facebook, LinkedIn, etc.)
  openGraph: {
    title: 'Talent With Us',
    description:
      'Talent With Us connects skilled professionals and growing businesses through innovative digital solutions. We specialize in empowering talent, fostering remote opportunities, and helping organizations build exceptional teams worldwide..',
    url: 'https://www.talentwithus.com', // <-- !! REPLACE with your domain
    siteName: 'Talent With Us',
    // images: [
    //   {
    //     url: '/og-image.png', // Place this image in your 'public' folder
    //     width: 1200,
    //     height: 630,
    //     alt: 'TALENTWITHUS Logo and Slogan',
    //   },
    // ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter Card
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'TALENTWITHUS',
  //   description: 'Your default site description...',
  //   images: ['/og-image.png'], // Place this image in your 'public' folder
  // },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'maximum-video-preview': -1,
      'maximum-image-preview': 'large',
      'maximum-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1530889983435568"
            crossOrigin="anonymous"
          ></Script> */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9174140322510860"
          crossOrigin="anonymous"
        ></Script>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
