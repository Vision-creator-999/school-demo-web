import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, BookOpen, Award, Users, ShieldCheck, ChevronLeft, ChevronRight, AlertCircle, CheckCircle, GraduationCap } from 'lucide-react';
import { BilingualHeading } from '../components/BilingualHeading';
import { programsData, activitiesData, teachersData, upcomingEventsData } from '../data/mockData';

export const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  const [isPageLoading, setIsPageLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Carousel Mock Navigation
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselImages = [
    { src: '/school_campus.png', captionEn: 'Vidya Vihar Main Campus Building', captionHi: 'विद्या विहार मुख्य परिसर भवन' },
    { src: '/students_activities.png', captionEn: 'State-of-the-Art Laboratory Sessions', captionHi: 'अत्याधुनिक प्रयोगशाला सत्र' }
  ];

  // Auto-slide carousel effect
  React.useEffect(() => {
    const slideInterval = setInterval(() => {
      setCarouselIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(slideInterval);
  }, [carouselImages.length]);


  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const handleNextCarousel = () => {
    setCarouselIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  // Newsletter State
  const [emailInput, setEmailInput] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.trim()) {
      setNewsletterError(t('home.newsletter.error'));
      setNewsletterSuccess(false);
    } else if (!emailRegex.test(emailInput)) {
      setNewsletterError(t('home.newsletter.error'));
      setNewsletterSuccess(false);
    } else {
      setNewsletterError('');
      setNewsletterSuccess(true);
      setEmailInput('');
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };


  // Feature Strip Icons
  const getFeatureIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Award size={32} className="text-white" />;
      case 1:
        return <ShieldCheck size={32} className="text-white" />;
      case 2:
        return <BookOpen size={32} className="text-white" />;
      case 3:
        return <Users size={32} className="text-white" />;
      default:
        return <Award size={32} className="text-white" />;
    }
  };

  // Teacher Background Circle Color Map Helper
  const getTeacherBg = (colorName: string) => {
    switch (colorName) {
      case 'bg-yellow-100 text-yellow-700':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'bg-blue-100 text-blue-700':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'bg-gray-100 text-gray-700':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'bg-purple-100 text-purple-700':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'bg-orange-100 text-orange-700':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-emerald-100 text-primary border-emerald-200';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      {/* Dynamic page entrance loader animation overlay */}
      {isPageLoading && (
        <div className="fixed inset-0 bg-[#F7F5E8] z-50 flex flex-col justify-center items-center font-sans">
          <div className="relative flex flex-col items-center">
            {/* Pulsing graduation cap */}
            <div className="bg-primary text-cream p-5 rounded-full border-4 border-white shadow-xl animate-bounce mb-6">
              <GraduationCap size={44} className="text-accent" />
            </div>
            {/* Pulsing Text */}
            <h2 className="text-2xl font-bold text-primary animate-pulse">Vidya Vihar Inter College</h2>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">Salarpur, Varanasi</span>
            
            {/* Glowing progress line */}
            <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden mt-6 relative">
              <div className="absolute top-0 left-0 h-full bg-accent animate-loading-bar rounded-full" />
            </div>
          </div>
        </div>
      )}
      
      {/* 1. HERO SECTION (Cream background) */}
      <section className="py-16 md:py-20 text-center px-4 max-w-5xl mx-auto w-full flex flex-col items-center">
        
        {/* Supporting tag */}
        <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-primary mb-4 block font-sans">
          📍 {t('school.location')}
        </span>

        {/* Big Bold Headline */}
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-black text-secondary leading-tight max-w-4xl tracking-tight mb-5 ${
          isHindi ? 'font-devanagari leading-snug' : 'font-sans'
        }`}>
          {isHindi 
            ? 'उज्जवल भविष्य के लिए युवा मस्तिष्क को सशक्त बनाना'
            : 'Empowering Young Minds for a Brighter Future'}
        </h1>

        {/* Supporting paragraph in green text */}
        <p className={`text-slate-body font-medium text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed mb-8 ${
          isHindi ? 'font-devanagari text-[17px]' : 'font-sans text-primary/80'
        }`}>
          {t('home.heroSubtitle')}
        </p>

        {/* Apply Now Pill Button */}
        <Link
          to="/admissions"
          className={`px-8 py-3.5 bg-primary text-cream hover:bg-primary-dark font-extrabold rounded-full transition-all duration-300 shadow-md hover:shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer mb-12 ${
            isHindi ? 'font-devanagari text-[16px]' : 'font-sans text-xs uppercase tracking-wider'
          }`}
        >
          🚀 {t('home.applyCTA')}
          <ArrowRight size={16} />
        </Link>

        {/* Large photo of school building/campus with Prev/Next Carousel arrows */}
        <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white select-none">
          
          <div className="relative aspect-video w-full overflow-hidden">
            {carouselImages.map((img, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  idx === carouselIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={img.src}
                  alt="School Campus"
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                />
                {/* Absolute caption strip */}
                <div className="absolute bottom-0 inset-x-0 bg-primary-dark/85 backdrop-blur-xs py-3 px-6 text-cream text-center text-xs sm:text-sm font-semibold border-t border-white/5 z-20">
                  {isHindi ? img.captionHi : img.captionEn}
                </div>
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={handlePrevCarousel}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2.5 rounded-full shadow-md transition-all hover:scale-105 cursor-pointer z-20 border border-slate-200"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNextCarousel}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2.5 rounded-full shadow-md transition-all hover:scale-105 cursor-pointer z-20 border border-slate-200"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>

        </div>
      </section>

      {/* 2. FEATURE STRIP (Directly below hero image, solid deep forest green cards) */}
      <section className="bg-primary text-white py-12 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['academic', 'holistic', 'innovative', 'supportive'].map((featureKey, idx) => (
              <div
                key={featureKey}
                className="bg-primary-dark/40 border border-white/10 hover:border-accent/40 rounded-xl p-6 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="mb-4 bg-white/10 p-3 rounded-full group-hover:bg-accent group-hover:text-primary transition-colors">
                  {getFeatureIcon(idx)}
                </div>
                <h4 className={`text-base font-bold text-white mb-2 uppercase tracking-wide ${isHindi ? 'font-devanagari text-[15px]' : 'font-sans'}`}>
                  {t(`home.features.${featureKey}.title`)}
                </h4>
                <p className={`text-xs text-cream-dark/75 leading-relaxed ${isHindi ? 'font-devanagari text-[13.5px] leading-relaxed' : 'font-sans'}`}>
                  {t(`home.features.${featureKey}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK ACCESS PORTAL OPTIONS */}
      <section className="py-16 bg-cream border-b border-slate-200/50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <BilingualHeading
              english="Academic & Administrative Portals"
              hindi="अकादमिक एवं प्रशासनिक पोर्टल"
              level={2}
              center={true}
            />
            <p className={`text-slate-body/80 mt-3 text-sm max-w-2xl mx-auto ${isHindi ? 'font-devanagari text-[16px]' : 'font-sans'}`}>
              {isHindi 
                ? 'छात्रों, शिक्षकों और प्रशासनिक कर्मचारियों के लिए हमारे समर्पित डिजिटल प्रवेश द्वार।' 
                : 'Our dedicated digital gateways for students, educators, and administrative staff members.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto font-sans">
            {/* Student Portal Card */}
            <Link
              to="/portal/student"
              className="bg-white hover:border-primary border border-slate-200 p-8 rounded-xl shadow-xs transition-all duration-300 group hover:-translate-y-1 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="bg-primary/10 text-primary p-4 rounded-full mb-4 group-hover:bg-primary group-hover:text-cream transition-colors">
                <Users size={32} />
              </div>
              <h4 className="text-base font-extrabold text-secondary mb-2 uppercase tracking-wide group-hover:text-primary transition-colors">
                {isHindi ? 'छात्र पोर्टल' : 'Student Portal'}
              </h4>
              <p className="text-xs text-slate-body leading-relaxed mb-6">
                {isHindi 
                  ? 'समय सारणी, गृहकार्य असाइनमेंट, परीक्षा परिणाम और दैनिक व्याख्यान विवरण देखें।' 
                  : 'Access time tables, assignments, exam result sheets, and daily scheduled lectures.'}
              </p>
              <span className="text-xs font-bold text-primary group-hover:underline flex items-center gap-1.5 mt-auto">
                {isHindi ? 'पोर्टल खोलें' : 'Enter Portal'} <ArrowRight size={13} />
              </span>
            </Link>

            {/* Teacher Portal Card */}
            <Link
              to="/portal/teacher"
              className="bg-white hover:border-primary border border-slate-200 p-8 rounded-xl shadow-xs transition-all duration-300 group hover:-translate-y-1 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="bg-primary/10 text-primary p-4 rounded-full mb-4 group-hover:bg-primary group-hover:text-cream transition-colors">
                <BookOpen size={32} />
              </div>
              <h4 className="text-base font-extrabold text-secondary mb-2 uppercase tracking-wide group-hover:text-primary transition-colors">
                {isHindi ? 'शिक्षक पोर्टल' : 'Teacher Portal'}
              </h4>
              <p className="text-xs text-slate-body leading-relaxed mb-6">
                {isHindi 
                  ? 'कक्षावार छात्र उपस्थिति अंकित करें, दैनिक लॉग दर्ज करें और अंक अपलोड करें।' 
                  : 'Log student attendance registers, track academic logs, and upload exam scores.'}
              </p>
              <span className="text-xs font-bold text-primary group-hover:underline flex items-center gap-1.5 mt-auto">
                {isHindi ? 'पोर्टल खोलें' : 'Enter Portal'} <ArrowRight size={13} />
              </span>
            </Link>

            {/* Admin Portal Card */}
            <Link
              to="/portal/admin"
              className="bg-white hover:border-primary border border-slate-200 p-8 rounded-xl shadow-xs transition-all duration-300 group hover:-translate-y-1 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="bg-primary/10 text-primary p-4 rounded-full mb-4 group-hover:bg-primary group-hover:text-cream transition-colors">
                <ShieldCheck size={32} />
              </div>
              <h4 className="text-base font-extrabold text-secondary mb-2 uppercase tracking-wide group-hover:text-primary transition-colors">
                {isHindi ? 'प्रशासक पोर्टल' : 'Admin Portal'}
              </h4>
              <p className="text-xs text-slate-body leading-relaxed mb-6">
                {isHindi 
                  ? 'छात्र-शिक्षक ऑनबोर्डिंग, डेटाबेस बैकअप और थोक एक्सेल शीट आयात का प्रबंधन करें।' 
                  : 'Manage database backups, student onboarding records, and upload Excel files.'}
              </p>
              <span className="text-xs font-bold text-primary group-hover:underline flex items-center gap-1.5 mt-auto">
                {isHindi ? 'पोर्टल खोलें' : 'Enter Portal'} <ArrowRight size={13} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. OUR PROGRAMS SECTION */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-cream">
        <div className="mb-12 text-center">
          <BilingualHeading
            english={t('home.programsTitle')}
            hindi={t('home.programsTitle')}
            level={2}
            center={true}
          />
          <p className={`text-slate-body/80 mt-3 text-sm ${isHindi ? 'font-devanagari text-[16px]' : 'font-sans'}`}>
            {t('home.programsSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programsData.map((prog) => (
            <div
              key={prog.id}
              className={`rounded-xl border p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300 bg-white ${prog.bgClass}`}
            >
              <div>
                <span className="text-4xl mb-4 block" role="presentation">{prog.emoji}</span>
                <h4 className={`text-lg font-bold text-primary mb-3 ${isHindi ? 'font-devanagari' : 'font-sans'}`}>
                  {isHindi ? prog.titleHi : prog.titleEn}
                </h4>
                <p className={`text-xs text-slate-body/85 leading-relaxed mb-6 ${isHindi ? 'font-devanagari text-[14px] leading-relaxed' : 'font-sans'}`}>
                  {isHindi ? prog.descHi : prog.descEn}
                </p>
              </div>
              
              <Link
                to="/admissions"
                className={`flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors w-fit font-sans`}
              >
                <span>{isHindi ? 'विवरण देखें' : 'View Admission'}</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          ))}
        </div>
      </section>


      {/* 4. OUR BEST ACTIVITIES SECTION (Cream background, bottom overlay white strip) */}
      <section className="py-16 md:py-24 bg-cream-dark border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 text-center">
            <BilingualHeading
              english={t('home.activitiesTitle')}
              hindi={t('home.activitiesTitle')}
              level={2}
              center={true}
            />
            <p className={`text-slate-body/85 mt-3 text-sm ${isHindi ? 'font-devanagari text-[16px]' : 'font-sans'}`}>
              {t('home.activitiesSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {activitiesData.map((act) => (
              <div
                key={act.id}
                className="group rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 border border-slate-200/50 bg-white flex flex-col justify-between"
              >
                {/* Visual Color Block */}
                <div className={`h-40 ${act.bgClass} flex items-center justify-center relative select-none overflow-hidden border-b border-slate-100`}>
                  {/* Decorative background grid */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
                  <span className="text-6xl transform group-hover:scale-115 group-hover:rotate-3 transition-transform duration-300 z-10" role="presentation">
                    {act.emoji}
                  </span>
                </div>

                {/* Bottom Overlay strip with italic dark-green text */}
                <div className="bg-white py-4 px-5 border-t border-slate-50 text-center">
                  <span className={`text-sm font-bold text-primary italic block tracking-wide ${isHindi ? 'font-devanagari not-italic' : 'font-sans'}`}>
                    {isHindi ? act.titleHi : act.titleEn}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. DARK-GREEN FULL-WIDTH CTA BANNER (Newsletter prompt, email input, classroom photo) */}
      <section className="bg-primary text-cream py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left panel: Prompt + email input */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className={`text-2xl sm:text-3xl font-bold text-accent ${isHindi ? 'font-devanagari leading-normal' : 'font-serif'}`}>
              {t('home.newsletter.title')}
            </h3>
            
            <p className={`text-sm sm:text-base text-cream-dark/85 leading-relaxed max-w-2xl ${isHindi ? 'font-devanagari text-[16px]' : 'font-sans'}`}>
              {t('home.newsletter.desc')}
            </p>

            {/* Newsletter form with interactive state */}
            {!newsletterSuccess ? (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md font-sans">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      if (newsletterError) setNewsletterError('');
                    }}
                    placeholder={t('home.newsletter.placeholder')}
                    className="w-full px-4 py-3 bg-primary-dark border border-white/20 text-cream rounded-md text-sm focus:outline-none focus:border-accent text-left"
                  />
                  {newsletterError && (
                    <div className="absolute top-[48px] left-0 flex items-center gap-1 text-accent text-xs font-bold mt-1.5 animate-pulse bg-primary py-0.5 rounded">
                      <AlertCircle size={12} />
                      <span>{newsletterError}</span>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-accent text-primary-dark font-extrabold rounded-md hover:bg-lime-400 text-xs sm:text-sm tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
                >
                  {t('home.newsletter.button')}
                </button>
              </form>
            ) : (
              <div className="inline-flex items-center gap-2 bg-primary-dark/40 border border-accent/20 px-4 py-3.5 rounded-lg text-accent text-sm font-semibold animate-fade-in font-sans">
                <CheckCircle size={16} />
                <span>{t('home.newsletter.success')}</span>
              </div>
            )}
          </div>

          {/* Right panel: Classroom photo */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-accent rounded-xl transform rotate-3 scale-102 opacity-25 blur-xs pointer-events-none" />
            <div className="relative border-4 border-white/90 rounded-xl overflow-hidden shadow-lg select-none bg-primary-dark">
              <img
                src="/students_activities.png"
                alt="Classroom at Vidya Vihar"
                className="w-full h-auto object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 6. TEACHERS OF OUR SCHOOL SECTION (Cream background, circular colored avatars) */}
      <section id="teachers" className="py-16 md:py-24 bg-cream w-full border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="mb-16">
            <BilingualHeading
              english={t('home.teachersTitle')}
              hindi={t('home.teachersTitle')}
              level={2}
              center={true}
            />
            <p className={`text-slate-body/80 mt-3 text-sm max-w-2xl mx-auto ${isHindi ? 'font-devanagari text-[16px]' : 'font-sans'}`}>
              {t('home.teachersSub')}
            </p>
          </div>

          {/* Avatar Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 max-w-5xl mx-auto mb-14 justify-center">
            {teachersData.map((teach) => (
              <div
                key={teach.id}
                className="flex flex-col items-center p-4 bg-white rounded-xl border border-slate-200/40 shadow-2xs hover:shadow-sm transition-shadow duration-300"
              >
                {/* Circular Avatar inside designated background color */}
                <div className={`h-20 w-20 rounded-full border-2 flex items-center justify-center text-xl font-extrabold shadow-inner mb-4 select-none font-sans ${getTeacherBg(teach.circleColor)}`}>
                  {teach.initials}
                </div>
                
                <h4 className={`text-sm font-bold text-secondary mb-1 ${isHindi ? 'font-devanagari' : 'font-sans'}`}>
                  {isHindi ? teach.nameHi : teach.nameEn}
                </h4>
                
                <span className={`text-[10px] text-slate-400 font-bold uppercase tracking-wider ${isHindi ? 'font-devanagari' : ''}`}>
                  {isHindi ? teach.roleHi : teach.roleEn}
                </span>
              </div>
            ))}
          </div>

          {/* Meet All Teachers Button */}
          <Link
            to="/about"
            className={`inline-flex items-center gap-1.5 px-6 py-2.5 bg-primary text-cream hover:bg-primary-dark font-extrabold rounded-full transition-colors text-xs uppercase tracking-wider cursor-pointer font-sans shadow-sm`}
          >
            📋 {t('home.meetTeachers')}
          </Link>

        </div>
      </section>

      {/* 7. UPCOMING EVENTS SECTION */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-cream">
        <div className="mb-16 text-center">
          <BilingualHeading
            english={t('home.upcomingEventsTitle')}
            hindi={t('home.upcomingEventsTitle')}
            level={2}
            center={true}
          />
          <p className={`text-slate-body/85 mt-3 text-sm ${isHindi ? 'font-devanagari text-[16px]' : 'font-sans'}`}>
            {t('home.upcomingEventsSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Highlight Left Panel: Event Photo/Card */}
          <div className="lg:col-span-5 relative flex flex-col justify-between bg-primary text-cream p-8 rounded-xl border border-white/5 shadow-md overflow-hidden">
            {/* Background watermarks */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,225,87,0.08),transparent_50%)] pointer-events-none" />
            
            <div>
              <span className="text-[10px] text-accent font-extrabold uppercase tracking-widest font-sans">
                ⭐ Featured Event
              </span>
              <h4 className={`text-2xl font-black mt-2 leading-tight ${isHindi ? 'font-devanagari text-xl' : 'font-serif'}`}>
                {isHindi ? 'वार्षिक खेलकूद एवं एथलेटिक्स मीट' : 'Annual Sports & Athletic Meet'}
              </h4>
              <p className={`text-xs text-cream-dark/75 mt-3 leading-relaxed ${isHindi ? 'font-devanagari text-[13.5px] leading-relaxed' : 'font-sans'}`}>
                {isHindi
                  ? 'छात्रों में खेल भावना और शारीरिक तंदुरुस्ती को बढ़ावा देने के लिए एक सप्ताह चलने वाला खेल उत्सव, जिसमें विभिन्न हाउस प्रतियोगिताएं होंगी।'
                  : 'A week-long athletic festival fostering sportsmanship, physical competence, and house competitions across track, field, and team sports.'}
              </p>
            </div>

            <div className="mt-8 border-t border-white/10 pt-4 flex justify-between items-center text-xs font-bold font-sans">
              <span className="text-accent">📍 Varanasi Main Stadium</span>
              <span className="text-white">📅 Nov 2026</span>
            </div>
          </div>

          {/* List Right Panel: Upcoming Event Items */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
            {upcomingEventsData.map((evt) => (
              <div
                key={evt.id}
                className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200/50 shadow-2xs hover:shadow-xs transition-shadow duration-300 flex items-center gap-5"
              >
                
                {/* Date Badge: small dark green */}
                <div className="bg-primary text-cream h-16 w-16 rounded-lg flex flex-col items-center justify-center shrink-0 border border-accent/20 select-none shadow-sm">
                  <span className="text-xl sm:text-2xl font-extrabold leading-none tracking-tight font-sans">
                    {evt.day}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-sans font-bold text-accent/90 mt-0.5">
                    {isHindi ? evt.monthHi : evt.monthEn}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-grow min-w-0">
                  <span className="text-[10px] text-accent-light bg-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-sans inline-block">
                    {isHindi ? evt.categoryHi : evt.categoryEn}
                  </span>
                  <h4 className={`text-sm sm:text-base font-bold text-primary mt-1.5 truncate ${isHindi ? 'font-devanagari text-base' : 'font-sans'}`}>
                    {isHindi ? evt.titleHi : evt.titleEn}
                  </h4>
                  <div className="flex gap-4 text-xs text-slate-400 mt-1 font-sans">
                    <span>🕒 {isHindi ? evt.timeHi : evt.timeEn}</span>
                    <span>📍 School Grounds</span>
                  </div>
                </div>

                {/* Read More Link */}
                <Link
                  to="/notices"
                  className="text-xs font-bold text-slate-400 hover:text-accent transition-colors shrink-0 font-sans"
                >
                  {t('home.readMore')} →
                </Link>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
