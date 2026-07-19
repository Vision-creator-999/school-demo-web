import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserCheck, GraduationCap, ShieldAlert } from 'lucide-react';
import { BilingualHeading } from '../components/BilingualHeading';

export const PortalSelector: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  const portals = [
    {
      id: 'student',
      to: '/portal/student',
      icon: <GraduationCap size={40} className="text-accent group-hover:scale-110 transition-transform" />,
      titleKey: 'portal.student.title',
      descKey: 'portal.student.desc',
      color: 'hover:border-primary/40 hover:shadow-primary/5'
    },
    {
      id: 'teacher',
      to: '/portal/teacher',
      icon: <UserCheck size={40} className="text-accent group-hover:scale-110 transition-transform" />,
      titleKey: 'portal.teacher.title',
      descKey: 'portal.teacher.desc',
      color: 'hover:border-primary/40 hover:shadow-primary/5'
    },
    {
      id: 'admin',
      to: '/portal/admin',
      icon: <ShieldAlert size={40} className="text-accent group-hover:scale-110 transition-transform" />,
      titleKey: 'portal.admin.title',
      descKey: 'portal.admin.desc',
      color: 'hover:border-primary/40 hover:shadow-primary/5'
    }
  ];

  return (
    <div className="py-16 md:py-24 bg-cream flex flex-col justify-center min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <BilingualHeading
            english={t('portal.title')}
            hindi={t('portal.title')}
            level={1}
            center={true}
          />
          <p className={`text-slate-500 mt-4 leading-relaxed ${isHindi ? 'font-devanagari text-[16px]' : ''}`}>
            {t('portal.subtitle')}
          </p>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {portals.map((portal) => (
            <Link
              key={portal.id}
              to={portal.to}
              className={`group bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-lg p-8 transition-all duration-300 flex flex-col items-center text-center cursor-pointer ${portal.color}`}
            >
              {/* Icon Container */}
              <div className="bg-accent-light/50 p-4 rounded-full mb-6">
                {portal.icon}
              </div>

              {/* Title */}
              <h3 className={`text-xl font-bold text-primary mb-3 ${isHindi ? 'font-devanagari leading-normal' : 'font-serif'}`}>
                {t(portal.titleKey)}
              </h3>

              {/* Description */}
              <p className={`text-slate-500 text-sm leading-relaxed mb-6 flex-grow ${isHindi ? 'font-devanagari text-[15px]' : ''}`}>
                {t(portal.descKey)}
              </p>

              {/* Status Badge */}
              <span className={`inline-flex items-center px-3 py-1 rounded bg-slate-100 text-slate-500 text-xs font-bold font-sans uppercase tracking-wider group-hover:bg-accent group-hover:text-primary-dark transition-colors`}>
                🔑 Login Portal
              </span>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};
