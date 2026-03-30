'use client';
import Link from 'next/link';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

const NAV = [
  { heading: 'Company', links: [{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about' }, { label: 'Blog', href: '/blogs' }, { label: 'Careers', href: '/career' }] },
  { heading: 'Solutions', links: [{ label: 'Services', href: '/services' }, { label: 'Case Studies', href: '/case-studies' }, { label: 'Talent Program', href: '/talentprogram' }] },
  { heading: 'Legal', links: [{ label: 'Privacy Policy', href: '/privacy-policy' }, { label: 'Terms of Service', href: '/terms-of-service' }, { label: 'Security', href: '/security' }, { label: 'Compliance', href: '/compliance' }] },
];

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/talentwithus', svg: <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11.75 20h-3v-9h3v9zm-1.5-10.216c-.966 0-1.75-.784-1.75-1.75 0-.965.784-1.75 1.75-1.75s1.75.785 1.75 1.75c0 .966-.784 1.75-1.75 1.75zm15.25 10.216h-3v-4.604c0-1.098-.02-2.513-1.529-2.513-1.53 0-1.764 1.195-1.764 2.428v4.689h-3v-9h2.884v1.232h.041c.401-.757 1.379-1.557 2.841-1.557 3.042 0 3.604 2.002 3.604 4.604v4.721z"/></svg> },
  { label: 'X / Twitter', href: 'https://twitter.com/talentwithus', svg: <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: 'GitHub', href: 'https://github.com/talentwithus', svg: <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.85 10.89.57.1.78-.25.78-.55v-2.15c-3.19.7-3.86-1.54-3.86-1.54-.51-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1 .1 1.62.76 1.84 1.08.12-.68.4-1.15.73-1.42-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.44-2.29 1.15-3.1-.12-.29-.5-1.48.11-3.08 0 0 .94-.3 3.09 1.18A10.67 10.67 0 0 1 12 6.82c.95.01 1.9.13 2.79.38 2.15-1.48 3.09-1.18 3.09-1.18.61 1.6.23 2.79.11 3.08.71.81 1.15 1.84 1.15 3.1 0 4.43-2.68 5.41-5.23 5.69.41.36.76 1.08.76 2.18v3.24c0 .3.21.65.79.54C20.72 21.38 24 17.08 24 12c0-6.35-5.15-11.5-12-11.5z"/></svg> },
  { label: 'Instagram', href: 'https://instagram.com/talentwithus', svg: <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="absolute inset-0 grid-pattern opacity-[0.22] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-6">
        {/* Main grid */}
        <div className="pt-14 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-8 h-8 rounded-xl overflow-hidden transition-all duration-300 group-hover:ring-2 group-hover:ring-indigo-500/40" style={{ boxShadow: '0 0 0 1px var(--border-default)' }}>
                <img src="/talent-with-us-logo copy.png" alt="TalentWithUs" className="w-full h-full object-cover" />
              </div>
              <span className="text-[15px] font-bold transition-colors" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>TalentWithUs</span>
            </Link>
            <p className="text-[13.5px] leading-relaxed mb-6 max-w-[280px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              We build world-class digital products. From AI to mobile to cloud — we deliver excellence.
            </p>
            <div className="space-y-2.5 mb-6">
              {[
                { icon: <Mail size={13} />, text: 'info@talentwithus.com', href: 'mailto:info@talentwithus.com' },
                { icon: <Phone size={13} />, text: '+91 77994 70104', href: 'tel:+917799470104' },
                { icon: <MapPin size={13} />, text: 'Badvel, Kadapa, AP', href: '#' },
              ].map(({ icon, text, href }) => (
                <a key={text} href={href} className="flex items-center gap-2.5 text-[13px] transition-colors duration-200" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                >
                  <span className="text-indigo-400 flex-shrink-0">{icon}</span>{text}
                </a>
              ))}
            </div>
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = 'rgba(99,102,241,0.12)'; el.style.borderColor = 'rgba(99,102,241,0.35)'; el.style.color = '#818CF8'; el.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = 'var(--bg-card)'; el.style.borderColor = 'var(--border-subtle)'; el.style.color = 'var(--text-muted)'; el.style.transform = 'translateY(0)'; }}
                >{s.svg}</a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[11.5px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>{col.heading}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[13.5px] transition-colors duration-200" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                    >{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="py-7 px-6 sm:px-8 rounded-2xl mb-10 flex flex-col sm:flex-row items-center justify-between gap-5" style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.14)' }}>
          <div>
            <h5 className="text-[15px] font-semibold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>Stay in the loop</h5>
            <p className="text-[12.5px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>Tech insights and company updates. No spam.</p>
          </div>
          <div className="flex gap-2.5 flex-shrink-0 w-full sm:w-auto">
            <input type="email" placeholder="Your email" className="px-4 py-2.5 rounded-xl text-[13.5px] outline-none flex-1 sm:w-48" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', fontFamily: 'var(--font-inter)' }} />
            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13.5px] font-semibold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)' }}>
              Subscribe <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px]" style={{ borderTop: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
          <p>© {new Date().getFullYear()} TalentWithUs. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-[var(--text-secondary)] transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-[var(--text-secondary)] transition-colors">Terms</Link>
            <Link href="/security" className="hover:text-[var(--text-secondary)] transition-colors">Security</Link>
          </div>
          <p>Built with <span style={{ color: '#6366F1' }}>♥</span> in India</p>
        </div>
      </div>
    </footer>
  );
}
