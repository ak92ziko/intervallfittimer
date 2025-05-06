import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import Timer from './components/Timer';
import WorkoutSelector from './components/WorkoutSelector';
import Footer from './components/Footer';
import Privacy from './components/pages/Privacy';
import Imprint from './components/pages/Imprint';
import LanguageSelector from './components/LanguageSelector';
import { TimerProvider } from './context/TimerContext';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';

function MainContent() {
  const [showTimer, setShowTimer] = useState(false);

  const renderContent = () => {
    if (showTimer) {
      return <Timer onBack={() => setShowTimer(false)} />;
    }
    return <WorkoutSelector onSelectWorkout={() => setShowTimer(true)} />;
  };

  return (
    <>
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col">
        {renderContent()}
      </main>
      <Footer />
    </>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col" style={{
      paddingTop: 'max(env(safe-area-inset-top, 0px), 2rem)',
      paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 2rem)'
    }}>
      <header className="py-6 px-4 flex items-center justify-between sticky top-0 bg-slate-900/75 backdrop-blur-sm z-10 mb-4">
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <Dumbbell className="h-8 w-8 text-red-500" />
          <h1 className="text-2xl font-bold">IntervalFit Timer</h1>
        </div>
        <div className="flex-1 flex justify-end">
          <LanguageSelector />
        </div>
      </header>
      <div className="flex-1 flex flex-col" style={{ minHeight: '0' }}>
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <TimerProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/imprint" element={<Imprint />} />
            </Routes>
          </Layout>
        </Router>
      </TimerProvider>
    </LanguageProvider>
  );
}

export default App;