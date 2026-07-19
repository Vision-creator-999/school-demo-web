import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Clock, School } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  const quickLinks = [
    { to: '/', labelKey: 'nav.home' },
    { to: '/about', labelKey: 'nav.about' },
    { to: '/notices', labelKey: 'nav.notices' },
    { to: '/admissions', labelKey: 'nav.admissions' },
    { to: '/gallery', labelKey: 'nav.gallery' },
    { to: '/contact', labelKey: 'nav.contact' }
  ];

  return (
    <footer className="bg-primary text-cream border-t-4 border-accent font-sans">
      {/* Top Footer Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Col 1: School Identity */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-accent text-primary p-2 rounded-lg shadow-inner">
                <School size={22} className="stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-devanagari text-accent font-bold text-base leading-tight">
                  {t('school.nameHindi')}
                </span>
                <span className="font-sans text-white font-extrabold text-xs tracking-wider uppercase leading-tight mt-0.5">
                  {t('school.name')}
                </span>
              </div>
            </div>
            
            <p className={`text-sm text-cream-dark/70 leading-relaxed ${isHindi ? 'font-devanagari text-[15px]' : ''}`}>
              {t('home.heroSubtitle').slice(0, 140)}...
            </p>
            
            <div className="border border-accent/20 bg-primary-dark/40 rounded p-3">
              <span className={`text-[10px] text-accent uppercase tracking-wider font-bold block ${isHindi ? 'font-devanagari' : ''}`}>
                Board Affiliation
              </span>
              <span className="text-xs text-cream-dark/80 block mt-1">
                Uttar Pradesh Board of High School and Intermediate Education. Affiliation Code: UP-VNS-95042.
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className={`text-lg font-bold border-b border-accent/20 pb-2 text-accent ${isHindi ? 'font-devanagari text-xl' : 'font-serif'}`}>
              {isHindi ? 'त्वरित लिंक्स' : 'Quick Links'}
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`hover:text-accent transition-colors duration-200 block py-1 cursor-pointer ${
                      isHindi ? 'font-devanagari text-[15px]' : ''
                    }`}
                  >
                    👉 {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Grid */}
          <div className="flex flex-col space-y-4 text-sm text-cream-dark/95">
            <h3 className={`text-lg font-bold border-b border-accent/20 pb-2 text-accent ${isHindi ? 'font-devanagari text-xl' : 'font-serif'}`}>
              {t('contact.title')}
            </h3>
            
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <span className={isHindi ? 'font-devanagari' : ''}>
                  Salarpur, Varanasi, Uttar Pradesh, 221007
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={18} className="text-accent shrink-0" />
                <span>+91 94501 23456, +91 542 2580123</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={18} className="text-accent shrink-0" />
                <span className="hover:text-accent select-all">info@vidyaviharvaranasi.org</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={18} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <span className={`block font-bold text-accent ${isHindi ? 'font-devanagari' : ''}`}>
                    {t('contact.hoursTitle')}
                  </span>
                  <span className={`text-xs text-cream-dark/70 block mt-0.5 ${isHindi ? 'font-devanagari' : ''}`}>
                    {t('contact.hoursWeekdays')}
                  </span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="bg-primary-dark py-4 text-center text-xs text-cream-dark/40 border-t border-white/5 font-sans">
        <p>© {new Date().getFullYear()} {t('school.name')}, Salarpur, Varanasi. All Rights Reserved.</p>
        <p className="mt-1 text-[10px] opacity-60">Designed & Maintained for Stage 1 Evaluation.</p>
      </div>
    </footer>
  );
};
