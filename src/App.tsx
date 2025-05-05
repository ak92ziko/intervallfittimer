import { useState } from 'react';
import { Dumbbell } from 'lucide-react';
import Timer from './components/Timer';
import WorkoutSelector from './components/WorkoutSelector';
import Tools from './components/Tools';
import Footer from './components/Footer';
import LanguageSelector from './components/LanguageSelector';
import { TimerProvider } from './context/TimerContext';
import { LanguageProvider } from './context/LanguageContext';
import { useLanguage } from './context/LanguageContext';
import './App.css';

function AppContent() {
  const [showTimer, setShowTimer] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const { t } = useLanguage();

  const renderContent = () => {
    if (showTools) {
      return <Tools onBack={() => setShowTools(false)} />;
    }
    if (showTimer) {
      return <Timer onBack={() => setShowTimer(false)} />;
    }
    return <WorkoutSelector onSelectWorkout={() => setShowTimer(true)} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col">
      <header className="p-4 flex items-center justify-between">
        <div className="flex-1" /> {/* Spacer */}
        <div className="flex items-center gap-2">
          <Dumbbell className="h-8 w-8 text-red-500" />
          <h1 className="text-2xl font-bold">{t('app.title')}</h1>
        </div>
        <div className="flex-1 flex justify-end">
          <LanguageSelector />
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col">
        {renderContent()}
      </main>
      
      <Footer onShowTools={() => setShowTools(true)} />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <TimerProvider>
        <AppContent />
      </TimerProvider>
    </LanguageProvider>
  );
}

export default App;