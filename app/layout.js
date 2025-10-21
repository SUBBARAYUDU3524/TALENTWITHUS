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

export const metadata = {
  title: {
    default: 'Talent With Us | Digital Innovation Experts',
    template: '%s | Talent With Us',
  },
  description:
    'Talent With Us connects skilled professionals and growing businesses through innovative digital solutions. We specialize in empowering talent, fostering remote opportunities, and helping organizations build exceptional teams worldwide.',
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
