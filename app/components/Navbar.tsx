'use client';

import { signOut, User } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, LogOut, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { auth } from '../../FirebaseConfig';
import LoginModal from './LoginModal';

const navLinks = [
  { id: '/', label: 'Home' },
  { id: '/blogs', label: 'Blogs' },
  { id: '/services', label: 'Services' },
  { id: '/about', label: 'About Us' },
  { id: '/career', label: 'Careers' },
{ id: '/talentprogram', label: 'Talent Program' },
  { id: '/contactUs', label: 'Contact Us' },
 
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Manage auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // console.log(user,"current user")

  // Shadow on scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Route change loader animation
  useEffect(() => {
    setIsNavigating(true);
    const id = setTimeout(() => setIsNavigating(false), 400);
    return () => clearTimeout(id);
  }, [pathname]);

  // Sign out handler
  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
      if (pathname.includes('/dashboard')) router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [pathname, router]);

  // Close menu on outside click
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // Close menu on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [isOpen]);

  const linkClass = (linkId: string) =>
    `px-3 py-2 rounded-md transition-all text-sm font-medium flex items-center ${
      pathname === linkId || pathname.startsWith(`${linkId}/`)
        ? 'text-[#039fe3]'
        : 'text-black hover:text-[#039fe3]'
    }`;

  return (
    <>
      {/* Navigation progress bar */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
            exit={{ width: '100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#0056D2] via-[#007BFF] to-[#00A8FF] z-[100]"
            aria-label="Page loading indicator"
            role="status"
          />
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 inset-x-0 z-50 bg-white/60 backdrop-blur transition-shadow ${
          scrolled ? 'shadow-xl' : 'border-transparent'
        }`}
        style={{ willChange: 'transform, opacity' }}
        role="banner"
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
          ref={menuRef}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Go to home page"
            className="flex items-center ml-10 rounded-md"
          >
            <Image
              src="/talent-with-us-logo copy.png"
              alt="Talent With Us Logo"
              width={48}
              height={48}
              className="object-cover"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center space-x-2 lg:space-x-4"
            aria-label="Main navigation"
          >
            {navLinks.map(({ id, label }) => (
              <Link
                key={id}
                href={id}
                className={linkClass(id)}
                aria-current={pathname === id ? 'page' : undefined}
                tabIndex={0}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Buttons */}
          <div className="hidden md:flex items-center space-x-3 mr-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 bg-gradient-to-r from-[#00AEEF] to-[#0052CC] text-white rounded-md font-medium text-sm shadow-lg transition-all cursor-pointer"
              onClick={() => router.push('/contactUs')}
            >
              Book Consultation
            </motion.button>

            {!loading ? (
              user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/dashboard"
                    aria-label="Go to dashboard"
                    className="flex items-center space-x-2 rounded-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="h-8 w-8 rounded-full hover:scale-110 transition-all bg-gradient-to-r from-[#00AEEF] to-[#0052CC] flex items-center justify-center text-white font-bold text-sm cursor-pointer select-none">
                      {user.displayName?.charAt(0) || 'U'}
                    </div>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    aria-label="Sign out"
                    className="p-2 rounded-full hover:bg-red-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <LogOut className="h-5 w-5 text-red-600 hover:text-red-700 cursor-pointer transition-colors" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-2 border border-primary text-primary rounded-md font-medium text-sm hover:bg-accent/50 transition-colors"
                >
                  Sign In
                </button>
              )
            ) : (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center space-x-3 mr-4">
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="p-2 rounded-full hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <X className="h-5 w-5 cursor-pointer" />
              ) : (
                <Menu className="h-5 w-5 cursor-pointer" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden fixed inset-x-0 top-16 z-60 text-center bg-white/90 backdrop-blur-lg pt-8 pb-4 px-6 overflow-y-auto"
              role="dialog"
              aria-modal="true"
              ref={menuRef}
            >
              <nav
                className="flex flex-col space-y-1"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      setIsOpen(false);
                      router.push(link.id);
                    }}
                    className={`w-full cursor-pointer rounded-md py-3 px-4 text-base font-medium transition hover:text-gray-700 focus:outline-none ${
                      pathname === link.id
                        ? 'bg-accent text-primary'
                        : 'text-foreground'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="pt-4 mt-2 border-t border-border/50">
                  {!loading ? (
                    user ? (
                      <>
                        <Link
                          href="/dashboard"
                          onClick={() => setIsOpen(false)}
                          className="block rounded-md px-4 py-3 text-base font-medium text-foreground transition hover:text-gray-700 hover:bg-accent"
                        >
                          My Account
                        </Link>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            handleSignOut();
                          }}
                          className="w-full cursor-pointer rounded-md px-4 py-3 text-base font-medium text-red-600 hover:text-red-400 transition"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          setIsLoginModalOpen(true);
                        }}
                        className="w-full rounded-md px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-accent transition"
                        aria-label="Sign in"
                      >
                        Sign In
                      </button>
                    )
                  ) : (
                    <div className="flex justify-center px-4 py-3">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  )}
                </div>
              </nav>
              <div className="mt-8">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-md bg-gradient-to-r from-[#00AEEF] to-[#0052CC] py-3 px-6 text-white font-medium shadow-lg hover:shadow-primary/30 transition"
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/contactUs');
                  }}
                >
                  Book Free Consultation
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
