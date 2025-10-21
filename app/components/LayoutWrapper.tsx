'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import { AuthProvider } from '../context/AuthContext';
import Footer from "../components/Footer"

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide navbar for /blogs and all /blogs/* routes
  const hideNavbar = pathname.startsWith('/blogs');
  const mainClassName = `${!hideNavbar ? 'pt-16 md:pt-20' : ''} min-h-screen`;

  return (
    <AuthProvider>
      {!hideNavbar && <Navbar />}
      <main className={mainClassName}>{children}</main>
      <Footer />
    </AuthProvider>
  );
}
