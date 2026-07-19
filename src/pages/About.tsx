import React from 'react';
import { useTranslation } from 'react-i18next';
import { Flag, Heart } from 'lucide-react';
import { BilingualHeading } from '../components/BilingualHeading';
import { timelineData } from '../data/mockData';

export const About: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  return (
    <div className="py-12 md:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="mb-12 md:mb-16">
          <BilingualHeading
            english={t('about.title')}
            hindi={t('about.title')}
            level={1}
          />
        </div>

        {/* History and Image Placeholder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Main Story Content */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className={`text-2xl font-bold text-primary ${isHindi ? 'font-devanagari leading-normal' : 'font-serif'}`}>
              {t('about.historyTitle')}
            </h3>
            
            <p className={`text-slate-600 leading-relaxed ${isHindi ? 'font-devanagari text-[16px] leading-relaxed' : ''}`}>
              {t('about.historyDesc1')}
            </p>
            
            <p className={`text-slate-600 leading-relaxed ${isHindi ? 'font-devanagari text-[16px] leading-relaxed' : ''}`}>
              {t('about.historyDesc2')}
            </p>

            <div className="bg-accent-light/50 border-l-4 border-accent p-4 rounded-r-md">
              <p className={`text-primary font-semibold text-sm ${isHindi ? 'font-devanagari text-[15px]' : ''}`}>
                ✨ {t('about.affiliation')}
              </p>
            </div>
          </div>

          {/* Side Panel: Founder Quote & Stats */}
          <div className="lg:col-span-4 bg-white p-6 rounded-lg border border-accent/15 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4 text-center">
              <div className="h-16 w-16 bg-primary text-accent rounded-full flex items-center justify-center text-2xl font-serif font-bold mx-auto mb-3">
                RKP
              </div>
              <h4 className="font-bold text-primary font-serif">Shri R. K. Pandey</h4>
              <span className="text-xs text-slate-400">Founder & Chairman</span>
            </div>

            <blockquote className="relative">
              <span className="absolute top-[-10px] left-[-5px] text-5xl text-accent/20 font-serif leading-none">“</span>
              <p className={`text-slate-500 text-sm italic relative z-10 leading-relaxed px-4 ${isHindi ? 'font-devanagari text-[15px]' : ''}`}>
                {t('about.founderDesc').replace(/[\"\']/g, '')}
              </p>
            </blockquote>

            <p className={`text-xs font-bold text-primary text-right pr-4 ${isHindi ? 'font-devanagari text-[13px]' : ''}`}>
              {t('about.founderName')}
            </p>
          </div>

        </div>

        {/* Vision & Mission Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 flex gap-4">
            <div className="bg-accent-light text-primary p-3 rounded-lg self-start">
              <Flag size={26} />
            </div>
            <div>
              <h4 className={`text-lg font-bold text-primary mb-2 ${isHindi ? 'font-devanagari' : 'font-serif'}`}>
                {isHindi ? 'हमारा दृष्टिकोण (Vision)' : 'Our Vision'}
              </h4>
              <p className={`text-slate-500 text-sm leading-relaxed ${isHindi ? 'font-devanagari text-[15px]' : ''}`}>
                {isHindi 
                  ? 'वाराणसी में एक ऐसी संस्था बनना जो पारंपरिक भारतीय संस्कारों के साथ वैज्ञानिक सोच को जोड़कर समाज को राष्ट्रभक्त और कुशल नागरिक प्रदान करे।'
                  : 'To be a premier institution in Varanasi combining traditional Indian values with a scientific temper, nurturing patriotic and skilled global citizens.'}
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 flex gap-4">
            <div className="bg-accent-light text-primary p-3 rounded-lg self-start">
              <Heart size={26} />
            </div>
            <div>
              <h4 className={`text-lg font-bold text-primary mb-2 ${isHindi ? 'font-devanagari' : 'font-serif'}`}>
                {isHindi ? 'हमारा उद्देश्य (Mission)' : 'Our Mission'}
              </h4>
              <p className={`text-slate-500 text-sm leading-relaxed ${isHindi ? 'font-devanagari text-[15px]' : ''}`}>
                {isHindi
                  ? 'प्रत्येक छात्र को सुरक्षित, अनुशासित और ज्ञानवर्धक परिवेश प्रदान करना जिससे वे शैक्षणिक, शारीरिक और नैतिक रूप से परिपक्व हो सकें।'
                  : 'To provide a safe, disciplined, and enriching learning environment enabling every student to mature academically, physically, and morally.'}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Timeline section */}
        <div className="border-t border-slate-200 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <BilingualHeading
              english={t('about.timelineTitle')}
              hindi={t('about.timelineTitle')}
              level={2}
              center={true}
            />
          </div>

          {/* Vertical Timeline container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-accent/35" />

            <div className="space-y-12">
              {timelineData.map((event, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={event.year} className="relative flex flex-col md:flex-row items-start md:items-center">
                    
                    {/* Circle Pin */}
                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 bg-accent text-primary-dark w-8 h-8 rounded-full border-4 border-cream flex items-center justify-center font-bold text-xs shadow z-10 font-sans">
                      {event.year.slice(2)}
                    </div>

                    {/* Left block or spacing */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 md:text-right ${isEven ? 'md:order-1' : 'md:order-2 md:pl-12'}`}>
                      {isEven && (
                        <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                          <span className="inline-block px-3 py-1 bg-primary text-accent text-xs font-bold rounded-full mb-2 font-sans">
                            {event.year}
                          </span>
                          <h5 className={`text-base font-bold text-primary mb-1.5 ${isHindi ? 'font-devanagari' : 'font-serif'}`}>
                            {isHindi ? event.titleHi : event.titleEn}
                          </h5>
                          <p className={`text-xs text-slate-500 leading-relaxed ${isHindi ? 'font-devanagari text-[13.5px] leading-relaxed' : ''}`}>
                            {isHindi ? event.descHi : event.descEn}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Right block or spacing */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-12 ${!isEven ? 'md:order-1 md:text-right md:pr-12 md:pl-0' : 'md:order-2'}`}>
                      {!isEven && (
                        <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                          <span className="inline-block px-3 py-1 bg-primary text-accent text-xs font-bold rounded-full mb-2 font-sans">
                            {event.year}
                          </span>
                          <h5 className={`text-base font-bold text-primary mb-1.5 ${isHindi ? 'font-devanagari' : 'font-serif'}`}>
                            {isHindi ? event.titleHi : event.titleEn}
                          </h5>
                          <p className={`text-xs text-slate-500 leading-relaxed ${isHindi ? 'font-devanagari text-[13.5px] leading-relaxed' : ''}`}>
                            {isHindi ? event.descHi : event.descEn}
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
