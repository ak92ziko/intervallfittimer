import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Imprint() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="text-white/80 hover:text-white transition p-2 rounded-full hover:bg-white/10"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold">{t('imprint.title')}</h1>
        </div>

        <div className="prose prose-invert max-w-none whitespace-pre-line">
          {t('imprint.content')}
        </div>
      </div>
    </div>
  );
}