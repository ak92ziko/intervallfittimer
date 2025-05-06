import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto py-8 px-4">
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
      </div>
      <p className="mt-2">{t('app.copyright')}</p>
    </footer>
  );
};

export default Footer;