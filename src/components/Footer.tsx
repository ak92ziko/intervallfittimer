import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-2 text-center text-slate-400 text-sm">
      <div className="flex justify-center items-center gap-4">
        <Link 
          to="/privacy"
          className="hover:text-white transition"
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
      <p className="mt-2">{t('app.copyright')}</p>
    </footer>
  );
}