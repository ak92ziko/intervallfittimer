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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col">
      <header className="sticky top-0 z-10" style={{ paddingTop: 'var(--safe-area-top)' }}>
        <div className="p-4 flex items-center justify-between bg-slate-900/75 backdrop-blur-sm">
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold">IntervalFit Timer</h1>
          </div>
          <div className="flex-1 flex justify-end">
            <LanguageSelector />
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col" style={{
        minHeight: 'calc(100vh - var(--safe-area-top) - var(--safe-area-bottom))'
      }}>
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