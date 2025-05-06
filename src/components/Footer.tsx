import { Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onShowTools: () => void;
}

export default function Footer({ onShowTools }: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer className="p-4 text-center text-slate-400 text-sm">
      <div className="flex justify-center items-center gap-4">
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
        <span>•</span>
        <button 
          onClick={onShowTools}
          className="hover:text-white transition flex items-center gap-1"
        >
          <Wrench size={14} />
          <span>{t('tools.more')}</span>
        </button>
      </div>
      <p className="mt-2">{t('app.copyright')}</p>
    </footer>
  );
}