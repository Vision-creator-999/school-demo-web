import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Image as ImageIcon } from 'lucide-react';
import { BilingualHeading } from '../components/BilingualHeading';
import { galleryData } from '../data/mockData';

export const Gallery: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterTabs = [
    { value: 'all', labelKey: 'gallery.all' },
    { value: 'events', labelKey: 'gallery.events' },
    { value: 'sports', labelKey: 'gallery.sports' },
    { value: 'academic', labelKey: 'gallery.academic' }
  ];

  // Filtering Logic
  const filteredGallery = useMemo(() => {
    return galleryData.filter((item) => {
      return activeFilter === 'all' || item.category === activeFilter;
    });
  }, [activeFilter]);

  return (
    <div className="py-12 md:py-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12">
          <BilingualHeading
            english={t('gallery.title')}
            hindi={t('gallery.title')}
            level={1}
          />
          <p className={`text-slate-500 mt-3 text-sm sm:text-base ${isHindi ? 'font-devanagari text-[16px]' : ''}`}>
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-start border-b border-slate-200 pb-6 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-4 py-2 border rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isHindi ? 'font-devanagari text-[15px]' : ''
              } ${
                activeFilter === tab.value
                  ? 'bg-accent border-accent text-primary-dark shadow-sm font-bold'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-accent hover:text-accent'
              }`}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-lg overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
            >
              
              {/* Photo Card */}
              <div className="relative h-60 w-full overflow-hidden select-none">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className={`relative h-full w-full ${item.colorClass} flex flex-col items-center justify-center p-6 text-center overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] group-hover:scale-110 transition-transform duration-500" />
                    
                    {/* Styled Emoji Emblem */}
                    <div className="text-6xl transform group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300 mb-4 drop-shadow-md">
                      {item.emoji}
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-cream/70 font-sans mt-2">
                      <ImageIcon size={12} />
                      <span>Photo Placeholder</span>
                    </div>
                  </div>
                )}
                {/* Floating Category Tag */}
                <span className="absolute top-4 left-4 bg-primary-dark/80 text-cream px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs font-sans z-10">
                  {item.category}
                </span>
              </div>

              {/* Caption and Date */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className={`text-base font-bold text-primary group-hover:text-accent transition-colors ${
                    isHindi ? 'font-devanagari text-lg leading-snug' : 'font-serif'
                  }`}>
                    {isHindi ? item.titleHi : item.titleEn}
                  </h4>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans mt-4 pt-3 border-t border-slate-50">
                  <Calendar size={13} className="text-accent shrink-0" />
                  <span>{item.date}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
