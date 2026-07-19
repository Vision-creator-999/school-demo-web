import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Notices } from './Notices';

export const Notices_hindi: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage('hi');
  }, [i18n]);

  return <Notices />;
};
