'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Settings, Sparkles } from 'lucide-react';

interface NavbarProps {
  name?: string;
}

export default function Navbar({ name = 'Sofyan' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const next = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== next ? next : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure the page always stays at the top on initial open and refresh
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, []);

  const navLinks = [
    { id: 'about', name: 'About' },
    { id: 'education', name: 'Education' },
    { id: 'experience', name: 'Experience' },
    { id: 'projects', name: 'Projects' },
    { id: 'certificates', name: 'Certificates' },
    { id: 'gallery', name: 'Gallery' },
    { id: 'contact', name: 'Contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      e.preventDefault();
      setMobileMenuOpen(false);

      // Hardware-accelerated native smooth scroll
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled
          ? 'bg-[#121212]/95 border-b border-white/10 shadow-lg shadow-black/50 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-white font-mono font-bold text-lg tracking-tight hover:opacity-90 transition-opacity"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <span className="font-mono text-sm font-extrabold">&lt;/&gt;</span>
          </div>
          <span>
            {name.split(' ')[0]}
            <span className="text-blue-500">.dev</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-[#18181b]/90 border border-white/10 rounded-full px-4 py-1.5 shadow-sm">
          {navLinks.map((link) => {
            const href = pathname === '/' ? `#${link.id}` : `/#${link.id}`;
            return (
              <a
                key={link.id}
                href={href}
                onClick={(e) => handleNavClick(e, link.id)}
                className="text-xs xl:text-sm font-medium text-gray-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            );
          })}
          <Link
            href="/about"
            className={`text-xs xl:text-sm font-medium px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
              pathname === '/about'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-blue-400 hover:text-blue-300 hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full Story</span>
          </Link>
        </nav>

        {/* Desktop CTA & Admin */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={pathname === '/' ? '#contact' : '/#contact'}
            onClick={(e) => handleNavClick(e, 'contact')}
            className="text-xs md:text-sm font-medium px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all cursor-pointer"
          >
            Hubungi Saya
          </a>

          <Link
            href="/admin"
            title="Admin Dashboard"
            className="p-2 rounded-xl border border-gray-700/80 hover:border-gray-500 text-gray-400 hover:text-white bg-[#18181b] transition-colors"
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/admin"
            title="Admin Dashboard"
            className="p-2 rounded-lg border border-gray-800 text-gray-400 hover:text-white bg-[#18181b]"
          >
            <Settings className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-gray-700 bg-[#18181b] text-gray-300 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#161618] border-b border-white/10 px-6 py-6 shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const href = pathname === '/' ? `#${link.id}` : `/#${link.id}`;
              return (
                <a
                  key={link.id}
                  href={href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="text-gray-300 hover:text-white font-medium py-2.5 px-3 rounded-lg hover:bg-white/5 text-sm transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>{link.name}</span>
                  <span className="text-gray-600 text-xs font-mono">→</span>
                </a>
              );
            })}

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-blue-400 hover:text-blue-300 font-medium py-2.5 px-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm transition-colors flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Full Story
              </span>
              <span className="text-xs font-mono">→</span>
            </Link>

            <div className="pt-3 border-t border-gray-800">
              <a
                href={pathname === '/' ? '#contact' : '/#contact'}
                onClick={(e) => handleNavClick(e, 'contact')}
                className="w-full block text-center py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm shadow-md cursor-pointer"
              >
                Hubungi Saya
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
