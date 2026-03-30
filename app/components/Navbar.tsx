'use client';

import { signOut, User } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, LogOut, Menu, Moon, Sun, X, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { auth } from '../../FirebaseConfig';
import { useThemeContext } from '../context/ThemeContext';
import LoginModal from './LoginModal';

const navLinks = [
  { id: '/', label: 'Home' },
  { id: '/services', label: 'Services' },
  { id: '/about', label: 'About' },
  { id: '/blogs', label: 'Blog' },
  { id: '/career', label: 'Careers' },
  { id: '/contactUs', label: 'Contact' },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();
  const isDark = theme === 'dark';

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-default)',
        color: 'var(--text-secondary)',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? <Moon size={15} /> : <Sun size={15} className="text-amber-500" />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useThemeContext();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => { setUser(u); setLoading(false); });
    return () => unsub();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
      if (pathname.includes('/dashboard')) router.push('/');
    } catch (e) { console.error(e); }
  }, [pathname, router]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  // Close on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const isActive = (id: string) =>
    id === '/' ? pathname === '/' : pathname === id || pathname.startsWith(`${id}/`);

  const isDark = theme === 'dark';

  const navBg = scrolled
    ? isDark
      ? 'rgba(3,3,8,0.92)'
      : 'rgba(247,248,252,0.92)'
    : 'transparent';

  const navBorder = scrolled
    ? isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.08)'
    : '1px solid transparent';

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-400"
        style={{
          background: navBg,
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: navBorder,
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.15)' : 'none',
        }}
        role="banner"
      >
        <div
          className="max-w-[1280px] mx-auto px-5 sm:px-6 flex items-center justify-between h-[68px]"
          ref={menuRef}
        >
          {/* Logo */}
          <Link href="/" aria-label="TalentWithUs home" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden transition-all duration-300 group-hover:ring-2 group-hover:ring-indigo-500/40" style={{ boxShadow: '0 0 0 1px var(--border-default)' }}>
              <Image src="/talent-with-us-logo copy.png" alt="TalentWithUs logo" fill className="object-cover" priority />
            </div>
            <span
              className="text-[15px] font-bold tracking-tight hidden sm:block transition-colors"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}
            >
              TalentWithUs
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {navLinks.map(({ id, label }) => (
              <Link
                key={id}
                href={id}
                className="relative px-4 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-200"
                style={{
                  color: isActive(id) ? 'var(--color-primary-l)' : 'var(--text-secondary)',
                }}
                onMouseEnter={(e) => { if (!isActive(id)) (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-primary)'; }}
                onMouseLeave={(e) => { if (!isActive(id)) (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'; }}
              >
                {label}
                {isActive(id) && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: isDark ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.20)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            <ThemeToggle />

            {!loading ? (
              user ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard"
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold hover:ring-2 hover:ring-indigo-400/50 transition-all"
                    aria-label="Dashboard"
                  >
                    {user.displayName?.charAt(0).toUpperCase() || 'U'}
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="p-2 rounded-lg transition-all duration-200"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#F87171'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.08)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                    aria-label="Sign out"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-2 text-[13.5px] font-medium transition-colors duration-200"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'; }}
                >
                  Sign in
                </button>
              )
            ) : (
              <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--text-muted)' }} />
            )}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push('/contactUs')}
              className="flex items-center gap-2 px-5 py-[9px] rounded-[9px] text-[13.5px] font-semibold text-white"
              style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)', boxShadow: '0 4px 18px rgba(99,102,241,0.38)' }}
            >
              <Zap size={13} className="fill-current" />
              Get Started
            </motion.button>
          </div>

          {/* Mobile right */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="p-2 rounded-xl transition-all duration-200"
              style={{ color: 'var(--text-secondary)', background: isOpen ? 'var(--bg-card)' : 'transparent' }}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay + Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: isDark ? 'rgba(0,0,0,0.65)' : 'rgba(0,0,0,0.25)', backdropFilter: 'blur(4px)' }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[300px] max-w-full flex flex-col lg:hidden"
              style={{
                background: 'var(--bg-secondary)',
                borderLeft: '1px solid var(--border-subtle)',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.3)',
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-5 h-[68px] flex-shrink-0"
                style={{ borderBottom: '1px solid var(--border-subtle)' }}
              >
                <span className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
                  Menu
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl transition-all duration-200"
                  style={{ color: 'var(--text-muted)', background: 'var(--bg-card)' }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
                {navLinks.map(({ id, label }, i) => (
                  <motion.button
                    key={id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    onClick={() => { router.push(id); setIsOpen(false); }}
                    className="w-full text-left flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200"
                    style={{
                      color: isActive(id) ? 'var(--color-primary-l)' : 'var(--text-secondary)',
                      background: isActive(id) ? isDark ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.08)' : 'transparent',
                      border: isActive(id) ? '1px solid rgba(99,102,241,0.20)' : '1px solid transparent',
                    }}
                  >
                    {label}
                    {isActive(id) && (
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="px-4 pb-8 space-y-3 flex-shrink-0" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                {!loading && !user && (
                  <button
                    onClick={() => { setIsOpen(false); setIsLoginModalOpen(true); }}
                    className="w-full py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200"
                    style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-default)', background: 'transparent' }}
                  >
                    Sign in
                  </button>
                )}
                {user && (
                  <button
                    onClick={() => { setIsOpen(false); handleSignOut(); }}
                    className="w-full py-3.5 rounded-xl text-[15px] font-medium text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    Sign out
                  </button>
                )}
                <button
                  onClick={() => { setIsOpen(false); router.push('/contactUs'); }}
                  className="w-full py-3.5 rounded-xl text-[15px] font-semibold text-white flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)', boxShadow: '0 4px 20px rgba(99,102,241,0.35)' }}
                >
                  <Zap size={15} className="fill-current" />
                  Get Started Free
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
