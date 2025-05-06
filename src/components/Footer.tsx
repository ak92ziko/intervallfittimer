import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="text-center text-slate-400 text-sm">
      <div className="flex justify-center items-center gap-4 pt-0">
        <Link 
          to="/privacy"
          className="hover:text-white transition"
        >
          {t('footer.privacy')}
        </Link>
        <span>•</span>
        <Link 
          to="/imprint"
          className="hover:text-white transition"
        >
          {t('footer.imprint')}
        </Link>
      </div>
      <p className="mt-1">{t('app.copyright')}</p>
      <div className="h-16"></div>
    </footer>
  );
}