import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Privacy() {
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
          <h1 className="text-3xl font-bold">{t('privacy.title')}</h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2>{t('privacy.data.title')}</h2>
            <p>{t('privacy.data.content')}</p>
          </section>

          <section className="mb-8">
            <h2>{t('privacy.cookies.title')}</h2>
            <p>{t('privacy.cookies.content')}</p>
          </section>

          <section className="mb-8">
            <h2>{t('privacy.thirdParty.title')}</h2>
            <p>{t('privacy.thirdParty.content')}</p>
          </section>

          <section className="mb-8">
            <h2>{t('privacy.storage.title')}</h2>
            <p>{t('privacy.storage.content')}</p>
          </section>

          <section className="mb-8">
            <h2>{t('privacy.contact.title')}</h2>
            <p>{t('privacy.contact.content')}</p>
          </section>
        </div>
      </div>
    </div>
  );
}