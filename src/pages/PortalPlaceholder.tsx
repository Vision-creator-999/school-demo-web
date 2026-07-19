import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Lock, ArrowLeft, KeyRound, AlertCircle, CheckCircle } from 'lucide-react';

export const PortalPlaceholder: React.FC = () => {
  const { portalType } = useParams<{ portalType: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  const validPortals = ['student', 'teacher', 'admin'];
  const activePortal = validPortals.includes(portalType || '') ? (portalType as string) : 'student';

  // Student Medium choice
  const [studentMedium, setStudentMedium] = useState<'english' | 'hindi'>('english');

  // Login Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect straight to dashboard
  useEffect(() => {
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      const user = JSON.parse(cachedUser);
      if (user.role === activePortal) {
        navigate(`/portal/${activePortal}/dashboard`);
      }
    }
  }, [activePortal, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError(isHindi ? 'कृपया ईमेल और पासवर्ड दोनों दर्ज करें।' : 'Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API Login validation
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      
      // Save Mock Session
      let mockUser: any = {
        email: email.toLowerCase().trim(),
        role: activePortal,
        schoolId: 1,
        name: activePortal === 'admin' ? 'Administrator' : activePortal === 'teacher' ? 'Dr. Sunita Rao' : 'Aarav Pandey',
        medium: 'english',
        classSegment: 'senior',
        className: 'Class 11 A (Science)',
        roll: '26-PCM-01'
      };

      if (activePortal === 'student') {
        const isHindiUser = email.toLowerCase().includes('.hi') || studentMedium === 'hindi';
        if (isHindiUser) {
          mockUser.name = 'Rahul Sharma';
          mockUser.medium = 'hindi';
          mockUser.classSegment = 'middle';
          mockUser.className = 'कक्षा 8 बी (सामान्य)';
          mockUser.roll = '26-MID-08';
        } else {
          mockUser.name = 'Aarav Pandey';
          mockUser.medium = 'english';
          mockUser.classSegment = 'senior';
          mockUser.className = 'Class 11 A (Science)';
          mockUser.roll = '26-PCM-01';
        }
      }
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Redirect to portal dashboard
      setTimeout(() => {
        navigate(`/portal/${activePortal}/dashboard`);
      }, 800);
    }, 1000);
  };

  const handleDemoBypass = () => {
    if (activePortal === 'student') {
      setEmail(`student.${studentMedium === 'english' ? 'en' : 'hi'}@vidyavihar.org`);
    } else {
      setEmail(`${activePortal}@vidyavihar.org`);
    }
    setPassword('demoPassword123');
    setError('');
  };

  const getPortalLabel = () => {
    return t(`portal.${activePortal}.title`);
  };

  return (
    <div className="py-20 md:py-32 bg-cream flex flex-col justify-center items-center min-h-[calc(100vh-200px)] px-4">
      
      <div className="max-w-md w-full bg-white rounded-xl border border-accent/20 shadow-xl p-8 flex flex-col items-center">
        
        {/* Animated Badge */}
        <div className="bg-accent-light text-primary p-4 rounded-full mb-6 border border-accent/20">
          <Lock size={36} className="stroke-[2.5]" />
        </div>

        {/* Portal Title */}
        <h3 className={`text-2xl font-bold text-primary mb-1 text-center font-sans`}>
          {getPortalLabel()}
        </h3>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-6 font-sans">
          Bilingual Portal Gate
        </span>

        {/* English Medium vs Hindi Medium Student Login Path selector */}
        {activePortal === 'student' && (
          <div className="w-full mb-6 font-sans text-xs font-bold text-center">
            <span className="block text-slate-400 uppercase tracking-wider mb-2">
              Select Medium / माध्यम चुनें
            </span>
            <div className="grid grid-cols-2 gap-2 border border-slate-100 rounded-lg p-1 bg-slate-50">
              <button
                type="button"
                onClick={() => { setStudentMedium('english'); i18n.changeLanguage('en'); }}
                className={`py-2 rounded-md transition-all cursor-pointer ${
                  studentMedium === 'english'
                    ? 'bg-primary text-cream shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                English Medium
              </button>
              <button
                type="button"
                onClick={() => { setStudentMedium('hindi'); i18n.changeLanguage('hi'); }}
                className={`py-2 rounded-md transition-all cursor-pointer ${
                  studentMedium === 'hindi'
                    ? 'bg-primary text-cream shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                हिंदी माध्यम (Hindi)
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-xs font-semibold flex items-center gap-2 animate-fade-in font-sans">
            <AlertCircle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="w-full mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-xs font-semibold flex items-center gap-2 animate-fade-in font-sans">
            <CheckCircle size={14} className="shrink-0" />
            <span>{isHindi ? 'लॉगिन सफल! डैशबोर्ड पर रीडायरेक्ट किया जा रहा है...' : 'Login Successful! Redirecting to dashboard...'}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4 font-sans text-left">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isHindi ? 'ईमेल पता' : 'Email Address'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. user@school.org"
              className="w-full px-4 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-accent text-left bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isHindi ? 'पासवर्ड' : 'Password'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-accent text-left bg-slate-50/50"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={isLoading || success}
              className={`w-full py-2.5 px-4 bg-primary text-cream hover:bg-primary-dark font-extrabold rounded-md transition-colors text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <KeyRound size={14} />
              {isLoading ? (isHindi ? 'लॉगिन किया जा रहा है...' : 'Authenticating...') : (isHindi ? 'लॉगिन करें' : 'Sign In')}
            </button>

            {/* Demo helper credentials bypass button */}
            <button
              type="button"
              onClick={handleDemoBypass}
              className="w-full py-2 px-4 border border-dashed border-accent text-primary hover:bg-accent-light/40 font-bold rounded-md transition-all text-xs tracking-wide cursor-pointer text-center"
            >
              🧪 Fill Demo Credentials ({activePortal === 'student' ? `${studentMedium} student` : activePortal})
            </button>
          </div>

        </form>

        <div className="w-full border-t border-slate-100 mt-6 pt-4 flex justify-between text-xs font-bold font-sans">
          <Link to="/portal" className="text-slate-400 hover:text-primary flex items-center gap-1.5">
            <ArrowLeft size={13} />
            <span>{isHindi ? 'पोर्टल सूची' : 'Portals List'}</span>
          </Link>
          <Link to="/" className="text-slate-400 hover:text-primary">
            {t('portal.backHome')}
          </Link>
        </div>

      </div>

    </div>
  );
};
