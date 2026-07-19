import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Gallery } from './Gallery';

export const Gallery_hindi: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage('hi');
  }, [i18n]);

  return <Gallery />;
};
