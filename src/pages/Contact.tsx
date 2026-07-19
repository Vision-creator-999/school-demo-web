import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { BilingualHeading } from '../components/BilingualHeading';

export const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  const contactCards = [
    {
      id: 'address',
      icon: <MapPin size={28} className="text-accent" />,
      titleKey: 'contact.addressTitle',
      content: 'Salarpur, Varanasi, Uttar Pradesh, PIN-221007, India',
      link: 'https://maps.google.com/?q=Salarpur,Varanasi,Uttar+Pradesh',
      linkText: isHindi ? 'गूगल मैप पर खोलें' : 'Open in Google Maps'
    },
    {
      id: 'phone',
      icon: <Phone size={28} className="text-accent" />,
      titleKey: 'contact.phoneTitle',
      content: '+91 94501 23456\n+91 542 2580123 (Reception)',
      link: 'tel:+919450123456',
      linkText: isHindi ? 'कॉल करें' : 'Make a Call'
    },
    {
      id: 'email',
      icon: <Mail size={28} className="text-accent" />,
      titleKey: 'contact.emailTitle',
      content: 'info@vidyaviharvaranasi.org\nadmissions@vidyaviharvaranasi.org',
      link: 'mailto:info@vidyaviharvaranasi.org',
      linkText: isHindi ? 'ईमेल भेजें' : 'Send an Email'
    },
    {
      id: 'hours',
      icon: <Clock size={28} className="text-accent" />,
      titleKey: 'contact.hoursTitle',
      content: `${t('contact.hoursWeekdays')}\n${t('contact.hoursSunday')}`,
      link: null
    }
  ];

  return (
    <div className="py-12 md:py-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12">
          <BilingualHeading
            english={t('contact.title')}
            hindi={t('contact.title')}
            level={1}
          />
          <p className={`text-slate-500 mt-3 text-sm sm:text-base ${isHindi ? 'font-devanagari text-[16px]' : ''}`}>
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-sm border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div className="space-y-4">
                <div className="bg-accent-light/50 p-3 rounded-lg w-fit">
                  {card.icon}
                </div>
                <h4 className={`text-lg font-bold text-primary ${isHindi ? 'font-devanagari leading-normal' : 'font-serif'}`}>
                  {t(card.titleKey)}
                </h4>
                <p className={`text-slate-500 text-sm whitespace-pre-line leading-relaxed ${isHindi ? 'font-devanagari text-[15px]' : ''}`}>
                  {card.content}
                </p>
              </div>

              {card.link && (
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center gap-1.5 text-xs font-bold text-accent hover:text-primary transition-colors w-fit font-sans"
                >
                  <span>{card.linkText}</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-lg border border-accent/15 p-4 sm:p-6 shadow-md flex flex-col lg:flex-row gap-6 items-stretch">
          
          {/* Map details panel */}
          <div className="lg:w-1/3 flex flex-col justify-between p-4 bg-primary-dark text-cream rounded-lg">
            <div>
              <span className="text-[10px] text-accent font-bold tracking-widest uppercase font-sans">
                Location Coordinates
              </span>
              <h4 className="font-serif text-xl font-bold text-white mt-1">Vidya Vihar Campus</h4>
              <p className={`text-cream-dark/70 text-xs mt-3 leading-relaxed ${isHindi ? 'font-devanagari text-[13px] leading-relaxed' : ''}`}>
                Located in Salarpur near the Varanasi Ring Road, the campus is easily accessible from any part of Varanasi city.
              </p>
            </div>
            
            <div className="mt-8 border-t border-white/10 pt-4 text-xs space-y-1.5">
              <div>📍 Latitude: 25.3582° N</div>
              <div>📍 Longitude: 82.9734° E</div>
              <div className="text-[10px] text-accent/80 font-bold mt-2">📍 Varanasi, Uttar Pradesh, 221007</div>
            </div>
          </div>

          {/* Map Mock Graphic */}
          <div className="lg:w-2/3 min-h-[300px] bg-[#F1F3E9] rounded-lg flex flex-col items-center justify-center p-6 border border-slate-200/60 text-center relative overflow-hidden select-none">
            {/* Grid Pattern resembling map */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ECEAD9_1px,transparent_1px),linear-gradient(to_bottom,#ECEAD9_1px,transparent_1px)] [background-size:24px_24px]" />
            
            {/* Simulated River Ganges */}
            <div className="absolute bottom-0 right-0 w-1/2 h-2/3 bg-blue-100/60 rounded-tl-full blur-xs border-l-4 border-blue-200 pointer-events-none" />

            {/* Varanasi Ring Road Marker */}
            <div className="absolute top-1/3 left-0 w-full h-2 bg-slate-300 transform -rotate-12 pointer-events-none" />

            {/* School Pointer marker */}
            <div className="relative z-10 flex flex-col items-center group">
              <div className="absolute -top-10 bg-primary-dark text-cream px-3 py-1 rounded text-xs font-bold whitespace-nowrap shadow-md border border-accent/20">
                🏫 Vidya Vihar Inter College
                <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary-dark rotate-45" />
              </div>
              <div className="bg-accent text-primary-dark p-3 rounded-full border-4 border-white shadow-lg animate-bounce">
                <MapPin size={24} className="fill-accent" />
              </div>
              <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-3">
                {isHindi ? 'सलारपुर, वाराणसी' : 'Salarpur, Varanasi'}
              </span>
            </div>

            {/* Bottom Legend */}
            <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded border border-slate-200 text-[10px] text-slate-500 font-sans shadow-xs relative z-10">
              🗺️ Map View Placeholder (Stage 1)
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
