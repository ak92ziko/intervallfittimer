import { Globe } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 transition text-sm"
      aria-label="Toggle language"
    >
      <Globe size={16} />
      <span>{language.toUpperCase()}</span>
    </button>
  );
}