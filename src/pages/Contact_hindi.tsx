import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Contact } from './Contact';

export const Contact_hindi: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage('hi');
  }, [i18n]);

  return <Contact />;
};
