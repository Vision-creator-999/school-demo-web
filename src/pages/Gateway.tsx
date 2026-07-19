import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { School, ArrowRight, Globe, Award } from 'lucide-react';

export const Gateway: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleSelectMedium = (medium: 'en' | 'hi') => {
    i18n.changeLanguage(medium);
    if (medium === 'en') {
      navigate('/home');
    } else {
      navigate('/home_hindi');
    }
  };

  const bgImages = [
    "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWk1vrMTJ4NSsgKuZ73cSERWvmCK38kK183ICtzH5DW5WtJXxA9-geECwVZJO7xkaoIYx5sYWfs2TVvSvS7ewAqc-KwhKx69yMyNRIhtfBiKmURKG6fo2kjaNyEIb4wmmCCU7ko=s1360-w1360-h1020-rw",
    "/school_campus.png"
  ];

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bgImages.length]);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center bg-slate-950 text-white overflow-hidden font-sans select-none">
      {/* Background Image Carousel with Smooth Crossfade Animation */}
      {bgImages.map((src, index) => (
        <img
          key={src}
          src={src}
          alt="Vidya Vihar Campus"
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ease-in-out scale-105 ${
            index === bgIndex ? 'opacity-70 z-0' : 'opacity-0 -z-10'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/45 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(15,139,141,0.25),transparent_60%)] pointer-events-none z-0" />

      {/* Top Bar Branding */}
      <header className="relative z-10 w-full pt-8 px-6 sm:px-12 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-primary/90 text-accent p-2.5 rounded-xl shadow-lg border border-white/20 backdrop-blur-md">
            <School size={28} className="stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-devanagari text-white font-extrabold text-lg sm:text-xl leading-none">
              विद्या विहार इंटर कॉलेज
            </h1>
            <p className="text-[10px] sm:text-xs font-bold text-teal-300 uppercase tracking-widest mt-0.5">
              Vidya Vihar Inter College • Salarpur, Varanasi
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-slate-200">
          <Globe size={14} className="text-teal-400" />
          <span>Select Learning Pathway</span>
        </div>
      </header>

      {/* Center Content / Dual Pathway Cards */}
      <main className="relative z-10 w-full max-w-5xl px-4 py-12 flex flex-col items-center text-center my-auto">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-3xl mb-4 font-serif">
          Choose Your Preferred Medium
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mb-12 font-medium leading-relaxed">
          Select your academic stream to enter the customized digital campus experience.
        </p>

        {/* Dual Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-4xl">
          
          {/* Card 1: English Medium (CBSE) */}
          <div
            onClick={() => handleSelectMedium('en')}
            className="group relative bg-slate-900/90 hover:bg-slate-900 border border-white/15 hover:border-teal-400/60 rounded-2xl p-8 transition-all duration-500 flex flex-col justify-between items-start text-left cursor-pointer shadow-2xl hover:shadow-teal-500/10 backdrop-blur-xl hover:-translate-y-1.5 overflow-hidden"
          >
            {/* Card Background Image */}
            <img
              src="https://www.entrepreneurindia.com/img/1600x940/uploads/content/edu/art/5bb1d555195d0.jpeg"
              alt="CBSE Students"
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-slate-950/60 pointer-events-none" />

            <div className="relative z-10 w-full">
              <div className="inline-flex items-center gap-1.5 bg-teal-400/20 border border-teal-400/40 backdrop-blur-md px-3 py-1 rounded-md text-teal-300 text-[11px] font-extrabold uppercase tracking-wider mb-5">
                <Award size={13} />
                <span>CBSE Pattern</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 group-hover:text-teal-300 transition-colors">
                English Medium
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-8">
                Curated English-medium curriculum focusing on standardized Science (PCM/PCB), Commerce, Humanities, and digital literacy.
              </p>
            </div>

            <button className="relative z-10 w-full py-3.5 px-6 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 font-extrabold text-sm rounded-xl transition-all duration-300 shadow-lg flex items-center justify-between group-hover:shadow-teal-500/25">
              <span>Enter English Portal</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 2: Hindi Medium (UP Board) */}
          <div
            onClick={() => handleSelectMedium('hi')}
            className="group relative bg-slate-900/90 hover:bg-slate-900 border border-white/15 hover:border-amber-400/60 rounded-2xl p-8 transition-all duration-500 flex flex-col justify-between items-start text-left cursor-pointer shadow-2xl hover:shadow-amber-500/10 backdrop-blur-xl hover:-translate-y-1.5 overflow-hidden"
          >
            {/* Card Background Image */}
            <img
              src="https://akm-img-a-in.tosshub.com/aajtak/images/story/202203/students_44_1-sixteen_nine_0.jpg?size=948:533"
              alt="UP Board Students"
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-slate-950/60 pointer-events-none" />

            <div className="relative z-10 w-full">
              <div className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/40 backdrop-blur-md px-3 py-1 rounded-md text-amber-300 text-[11px] font-extrabold uppercase tracking-wider mb-5">
                <Award size={13} />
                <span>यूपी बोर्ड माध्यम</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 font-devanagari group-hover:text-amber-300 transition-colors">
                हिंदी माध्यम (UP Board)
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-8 font-devanagari">
                उत्तर प्रदेश माध्यमिक शिक्षा परिषद द्वारा मान्यता प्राप्त संपूर्ण हिंदी माध्यम संकाय, साहित्य एवं प्राविधिक शिक्षा।
              </p>
            </div>

            <button className="relative z-10 w-full py-3.5 px-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all duration-300 shadow-lg flex items-center justify-between group-hover:shadow-amber-500/25">
              <span className="font-devanagari">हिंदी पोर्टल में प्रवेश करें</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 w-full py-6 text-center text-xs text-slate-400 font-medium border-t border-white/10 bg-slate-950/80 backdrop-blur-md">
        © {new Date().getFullYear()} Vidya Vihar Inter College, Salarpur, Varanasi. All Rights Reserved.
      </footer>
    </div>
  );
};
