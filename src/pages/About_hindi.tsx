import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { About } from './About';

export const About_hindi: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage('hi');
  }, [i18n]);

  return <About />;
};
