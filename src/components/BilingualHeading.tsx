import React from 'react';
import { useTranslation } from 'react-i18next';

interface BilingualHeadingProps {
  english: string;
  hindi: string;
  level?: 1 | 2 | 3;
  className?: string;
  center?: boolean;
  accentLine?: boolean;
}

export const BilingualHeading: React.FC<BilingualHeadingProps> = ({
  english,
  hindi,
  level = 2,
  className = '',
  center = false,
  accentLine = true
}) => {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  const primaryText = isHindi ? hindi : english;
  const secondaryText = isHindi ? english : hindi;

  const sizeClasses = {
    1: 'text-3xl sm:text-4xl md:text-5xl font-extrabold',
    2: 'text-2xl sm:text-3xl md:text-4xl font-bold',
    3: 'text-xl sm:text-2xl md:text-3xl font-semibold',
  };

  const Tag = `h${level}` as any;

  return (
    <div className={`flex flex-col ${center ? 'items-center text-center' : 'items-start text-left'} ${className}`}>
      {/* Primary Language */}
      <Tag
        className={`font-sans text-primary tracking-tight ${sizeClasses[level]} ${
          isHindi ? 'font-devanagari leading-normal' : 'leading-tight'
        }`}
      >
        {primaryText}
      </Tag>
      
      {/* Secondary Language Subtext */}
      <span
        className={`mt-1 text-sm sm:text-base font-medium text-accent ${
          !isHindi ? 'font-devanagari' : 'font-sans italic opacity-80'
        }`}
      >
        {secondaryText}
      </span>

      {accentLine && (
        <div className={`h-[3px] w-14 bg-accent mt-3.5 rounded-full ${center ? 'mx-auto' : ''}`} />
      )}
    </div>
  );
};
