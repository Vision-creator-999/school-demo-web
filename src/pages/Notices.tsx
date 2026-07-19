import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Calendar, AlertCircle, FileText } from 'lucide-react';
import { BilingualHeading } from '../components/BilingualHeading';
import { noticesData } from '../data/mockData';

export const Notices: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', labelKey: 'notices.all' },
    { value: 'academics', labelKey: 'notices.academics' },
    { value: 'events', labelKey: 'notices.events' },
    { value: 'admissions', labelKey: 'notices.admissions' },
    { value: 'general', labelKey: 'notices.general' }
  ];

  // Filtering Logic
  const filteredNotices = useMemo(() => {
    return noticesData.filter((notice) => {
      // 1. Filter by category
      const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;

      // 2. Filter by search query
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        notice.titleEn.toLowerCase().includes(query) ||
        notice.titleHi.includes(query) ||
        notice.descEn.toLowerCase().includes(query) ||
        notice.descHi.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="py-12 md:py-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12">
          <BilingualHeading
            english={t('notices.title')}
            hindi={t('notices.title')}
            level={1}
          />
          <p className={`text-slate-500 mt-3 text-sm sm:text-base ${isHindi ? 'font-devanagari text-[16px]' : ''}`}>
            {t('notices.subtitle')}
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-slate-100 mb-8">
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5 order-2 lg:order-1">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isHindi ? 'font-devanagari text-[15px]' : ''
                } ${
                  selectedCategory === cat.value
                    ? 'bg-primary text-cream shadow-sm'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                }`}
              >
                {t(cat.labelKey)}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative order-1 lg:order-2 w-full lg:max-w-xs">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('notices.searchPlaceholder')}
              className={`w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-slate-50 font-sans ${
                isHindi ? 'placeholder:font-devanagari' : ''
              }`}
            />
          </div>

        </div>

        {/* Notices Cards List */}
        {filteredNotices.length > 0 ? (
          <div className="space-y-6">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white rounded-lg shadow-sm border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row gap-6 justify-between items-start hover:shadow-md transition-shadow duration-300"
              >
                
                {/* Notice Info Container */}
                <div className="space-y-3 max-w-4xl">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 items-center text-xs font-semibold">
                    <span className={`px-2.5 py-0.5 rounded uppercase tracking-wider ${
                      notice.category === 'events' ? 'bg-emerald-100 text-emerald-800' :
                      notice.category === 'admissions' ? 'bg-accent-light text-primary' :
                      notice.category === 'academics' ? 'bg-primary/10 text-primary' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {t(`notices.${notice.category}`)}
                    </span>
                    {notice.isImportant && (
                      <span className="flex items-center gap-1 text-red-700 bg-red-50 border border-red-100 px-2 py-0.5 rounded text-[11px] animate-pulse">
                        <AlertCircle size={12} />
                        {isHindi ? 'महत्वपूर्ण' : 'Urgent'}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className={`text-xl font-bold text-primary ${
                    isHindi ? 'font-devanagari leading-snug' : 'font-serif'
                  }`}>
                    {isHindi ? notice.titleHi : notice.titleEn}
                  </h4>

                  {/* Body Text */}
                  <p className={`text-slate-600 text-sm md:text-base leading-relaxed ${
                    isHindi ? 'font-devanagari text-[16px] leading-relaxed' : ''
                  }`}>
                    {isHindi ? notice.descHi : notice.descEn}
                  </p>
                </div>

                {/* Date & Action */}
                <div className="w-full md:w-auto shrink-0 flex md:flex-col justify-between md:justify-start items-center md:items-end gap-3.5 pt-4 md:pt-0 border-t border-slate-100 md:border-none">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans">
                    <Calendar size={14} className="text-accent" />
                    <span>{notice.date}</span>
                  </div>
                  
                  {/* Mock Action */}
                  <button className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 hover:border-accent text-xs font-bold text-slate-500 hover:text-accent rounded-md transition-colors cursor-pointer bg-white">
                    <FileText size={14} />
                    <span>{isHindi ? 'डाउनलोड PDF' : 'Download PDF'}</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white text-center py-12 rounded-lg border border-slate-100 shadow-sm">
            <p className={`text-slate-400 font-medium ${isHindi ? 'font-devanagari text-[16px]' : 'text-sm'}`}>
              {t('notices.noNotices')}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
