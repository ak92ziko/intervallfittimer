import { ArrowLeft, Calculator, Clock, Scale, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ToolsProps {
  onBack: () => void;
}

export default function Tools({ onBack }: ToolsProps) {
  const { t } = useLanguage();

  const tools = [
    {
      id: 'calculator',
      title: t('tools.bmi.title'),
      description: t('tools.bmi.description'),
      icon: Calculator,
      comingSoon: true
    },
    {
      id: 'heart-rate',
      title: t('tools.heartRate.title'),
      description: t('tools.heartRate.description'),
      icon: Heart,
      comingSoon: true
    },
    {
      id: 'pace',
      title: t('tools.pace.title'),
      description: t('tools.pace.description'),
      icon: Clock,
      comingSoon: true
    },
    {
      id: 'weight',
      title: t('tools.weight.title'),
      description: t('tools.weight.description'),
      icon: Scale,
      comingSoon: true
    }
  ];

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="text-white/80 hover:text-white transition p-2 rounded-full hover:bg-white/10"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold">{t('tools.title')}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {tools.map((tool) => (
          <div 
            key={tool.id}
            className="bg-slate-700 rounded-lg p-6 relative overflow-hidden group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-600 rounded-lg">
                <tool.icon className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
                <p className="text-slate-300">{tool.description}</p>
              </div>
            </div>
            {tool.comingSoon && (
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
                <span className="text-sm font-semibold bg-red-500 px-3 py-1 rounded-full">
                  {t('tools.comingSoon')}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}