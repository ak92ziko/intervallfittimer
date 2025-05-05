import { useState } from 'react';
import { Wrench } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Modal from './Modal';

interface FooterProps {
  onShowTools: () => void;
}

export default function Footer({ onShowTools }: FooterProps) {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showImprint, setShowImprint] = useState(false);
  const { t } = useLanguage();

  return (
    <footer className="p-4 text-center text-slate-400 text-sm">
      <div className="flex justify-center items-center gap-4">
        <button 
          onClick={() => setShowPrivacy(true)}
          className="hover:text-white transition"
        >
          {t('footer.privacy')}
        </button>
        <span>•</span>
        <button 
          onClick={() => setShowImprint(true)}
          className="hover:text-white transition"
        >
          {t('footer.imprint')}
        </button>
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

      <Modal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title={t('privacy.title')}
      >
        <div className="prose prose-invert max-w-none">
          <h2>{t('privacy.data.title')}</h2>
          <p>{t('privacy.data.content')}</p>
          
          <h2>{t('privacy.cookies.title')}</h2>
          <p>{t('privacy.cookies.content')}</p>
          
          <h2>{t('privacy.thirdParty.title')}</h2>
          <p>{t('privacy.thirdParty.content')}</p>
          
          <h2>{t('privacy.storage.title')}</h2>
          <p>{t('privacy.storage.content')}</p>
          
          <h2>{t('privacy.contact.title')}</h2>
          <p>{t('privacy.contact.content')}</p>
        </div>
      </Modal>

      <Modal
        isOpen={showImprint}
        onClose={() => setShowImprint(false)}
        title={t('imprint.title')}
      >
        <div className="prose prose-invert max-w-none whitespace-pre-line">
          {t('imprint.content')}
        </div>
      </Modal>
    </footer>
  );
}