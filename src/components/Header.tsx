import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, School, Phone, Mail } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHindi = i18n.language === 'hi';

  const navItems = [
    { to: '/', labelKey: 'nav.home' },
    { to: '/about', labelKey: 'nav.about' },
    { to: '/#teachers', labelKey: 'nav.teachers', isHash: true },
    { to: '/notices', labelKey: 'nav.notices' },
    { to: '/admissions', labelKey: 'nav.admissions' },
    { to: '/gallery', labelKey: 'nav.gallery' },
    { to: '/contact', labelKey: 'nav.contact' },
    { to: '/portal', labelKey: 'nav.portals' },
  ];

  const handleNavItemClick = (item: { to: string; isHash?: boolean }) => {
    setIsOpen(false);
    if (item.isHash) {
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation before scrolling
        setTimeout(() => {
          const element = document.getElementById('teachers');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const element = document.getElementById('teachers');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const utilityLinks = [
    { labelKey: 'utility.events', href: '#' },
    { labelKey: 'utility.blogs', href: '#' },
    { labelKey: 'utility.testimonials', href: '#' },
    { labelKey: 'utility.announcements', href: '/notices' },
    { labelKey: 'utility.library', href: '#' },
    { labelKey: 'utility.schoolId', href: '/portal' },
  ];

  return (
    <header className="w-full z-50">
      
      {/* 1. UTILITY TOP BAR (Lime-green strip) */}
      <div className="bg-accent text-primary-dark font-sans py-2 px-4 sm:px-6 lg:px-8 border-b border-primary/5 flex flex-col md:flex-row justify-between items-center gap-3">
        {/* Quick Links Left */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-bold uppercase tracking-wider">
          {utilityLinks.map((link) => (
            <Link
              key={link.labelKey}
              to={link.href}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </div>

        {/* Contacts & Switcher Right */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <a href="tel:+919450123456" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Phone size={12} />
            <span>+91 94501 23456</span>
          </a>
          <span className="opacity-20">|</span>
          <a href="mailto:info@vidyaviharvaranasi.org" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Mail size={12} />
            <span className="hidden sm:inline">info@vidyaviharvaranasi.org</span>
          </a>
          <span className="opacity-20">|</span>
          <LanguageToggle />
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR (White background) */}
      <div className="bg-white text-slate-800 border-b border-cream-dark shadow-xs py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo & School Name */}
          <Link to="/" className="flex items-center gap-3 select-none shrink-0">
            <div className="bg-primary text-accent p-2 rounded-lg shadow-sm border border-accent/20">
              <School size={26} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-devanagari text-primary font-black text-base sm:text-lg leading-none">
                विद्या विहार इंटर कॉलेज
              </span>
              <span className="font-sans text-primary-dark font-extrabold text-[11px] sm:text-xs tracking-wider uppercase mt-1 leading-none">
                Vidya Vihar Inter College
              </span>
              <span className="text-[9px] text-slate-400 font-bold tracking-widest uppercase mt-0.5">
                Salarpur, Varanasi • Estd. 1995
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5">
            {navItems.map((item) => (
              item.isHash ? (
                <button
                  key={item.labelKey}
                  onClick={() => handleNavItemClick(item)}
                  className={`px-3 py-2 rounded-md text-sm font-bold text-slate-600 hover:text-primary hover:bg-slate-50 transition-all cursor-pointer ${
                    isHindi ? 'font-devanagari text-[15px]' : 'font-sans'
                  }`}
                >
                  {t(item.labelKey)}
                </button>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-bold transition-all cursor-pointer ${
                      isHindi ? 'font-devanagari text-[15px]' : 'font-sans'
                    } ${
                      isActive
                        ? 'text-primary bg-accent-light'
                        : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                    }`
                  }
                >
                  {t(item.labelKey)}
                </NavLink>
              )
            ))}
            
            {/* Apply Now Forest Green Button */}
            <Link
              to="/admissions"
              className={`ml-2 px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider bg-primary text-cream hover:bg-primary-dark transition-all duration-300 shadow-sm cursor-pointer ${
                isHindi ? 'font-devanagari text-[14px]' : 'font-sans'
              }`}
            >
              🚀 {t('nav.applyNow')}
            </Link>
          </nav>

          {/* Mobile Menu Hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-slate-100 text-slate-700 focus:outline-none cursor-pointer border border-slate-200"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 transition-all duration-300 shadow-inner">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              item.isHash ? (
                <button
                  key={item.labelKey}
                  onClick={() => handleNavItemClick(item)}
                  className={`block w-full px-4 py-2.5 rounded-md text-base font-bold text-slate-600 hover:text-primary hover:bg-slate-50 transition-all text-left cursor-pointer ${
                    isHindi ? 'font-devanagari text-right' : 'font-sans'
                  }`}
                >
                  {t(item.labelKey)}
                </button>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-md text-base font-bold cursor-pointer ${
                      isHindi ? 'font-devanagari text-right' : 'font-sans text-left'
                    } ${
                      isActive
                        ? 'text-primary bg-accent-light border-l-4 border-primary'
                        : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                    }`
                  }
                >
                  {t(item.labelKey)}
                </NavLink>
              )
            ))}
            <Link
              to="/admissions"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-md text-base font-extrabold text-center bg-primary text-cream hover:bg-primary-dark transition-colors ${
                isHindi ? 'font-devanagari' : 'font-sans'
              }`}
            >
              🚀 {t('nav.applyNow')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
