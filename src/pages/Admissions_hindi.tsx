import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Admissions } from './Admissions';

export const Admissions_hindi: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage('hi');
  }, [i18n]);

  return <Admissions />;
};
