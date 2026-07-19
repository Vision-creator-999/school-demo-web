import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const MainLayout: React.FC = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isHindi = i18n.language === 'hi';

  if (location.pathname === '/') {
    return <Outlet />;
  }

  return (
    <div className={`min-h-screen bg-accent py-0 sm:py-6 px-0 sm:px-4 md:px-8 ${isHindi ? 'lang-hi font-devanagari' : 'lang-en font-sans'}`}>
      {/* Framed Core Content Card */}
      <div className="max-w-[1440px] mx-auto bg-cream shadow-2xl rounded-none sm:rounded-2xl overflow-hidden border-0 sm:border-4 border-white flex flex-col min-h-[calc(100vh-3rem)]">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
