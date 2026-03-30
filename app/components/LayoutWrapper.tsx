'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import Footer from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Always show navbar — blogs get it too for a consistent experience
  const isAdmin = pathname.startsWith('/admin');
  const mainClass = 'pt-[68px] min-h-screen';

  return (
    <ThemeProvider>
      <AuthProvider>
        {!isAdmin && <Navbar />}
        <main className={mainClass}>{children}</main>
        {!isAdmin && <Footer />}
      </AuthProvider>
    </ThemeProvider>
  );
}
