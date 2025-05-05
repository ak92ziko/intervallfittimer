import { useState, useEffect } from 'react';
import { ArrowLeft, Maximize, Minimize } from 'lucide-react';
import { useTimerContext } from '../context/TimerContext';
import { useLanguage } from '../context/LanguageContext';
import useTimer, { TimerPhase } from '../hooks/useTimer';
import useSound from '../hooks/useSound';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import WorkoutProgress from './WorkoutProgress';

interface TimerProps {
  onBack: () => void;
}

export default function Timer({ onBack }: TimerProps) {
  const { workoutTitle, workoutSets, workTime, restTime, workoutDescription } = useTimerContext();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { play } = useSound();
  const { t } = useLanguage();
  
  const timer = useTimer({
    totalSets: workoutSets,
    workTime,
    restTime,
    onComplete: () => play('workStart')
  });
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const getBackgroundColor = (phase: TimerPhase) => {
    switch(phase) {
      case 'countdown': return 'bg-yellow-600';
      case 'work': return 'bg-red-600';
      case 'rest': return 'bg-blue-600';
      case 'completed': return 'bg-green-600';
      default: return 'bg-slate-800';
    }
  };
  
  const getPhaseLabel = (phase: TimerPhase) => {
    switch(phase) {
      case 'countdown': return t('timer.getReady');
      case 'work': return t('timer.work');
      case 'rest': return t('timer.rest');
      case 'completed': return t('timer.completed');
      default: return t('timer.ready');
    }
  };
  
  return (
    <div className={`flex flex-col gap-6 h-full items-center justify-center relative phase-transition ${getBackgroundColor(timer.currentPhase)} rounded-xl p-6 ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="absolute top-4 left-4 right-4 flex justify-between">
        <button 
          onClick={onBack} 
          className="text-white/80 hover:text-white transition p-2 rounded-full hover:bg-white/10"
        >
          <ArrowLeft size={24} />
        </button>
        
        <button 
          onClick={toggleFullscreen} 
          className="text-white/80 hover:text-white transition p-2 rounded-full hover:bg-white/10"
        >
          {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
        </button>
      </div>
      
      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold">{workoutTitle}</h2>
        {timer.currentPhase === 'idle' && (
          <p className="text-white/80 mt-2 max-w-lg mx-auto">{workoutDescription}</p>
        )}
      </div>
      
      <div className="text-3xl font-bold tracking-widest mb-4">
        {getPhaseLabel(timer.currentPhase)}
      </div>
      
      <div className="relative">
        <TimerDisplay 
          timeLeft={timer.timeLeft} 
          phase={timer.currentPhase} 
          progress={timer.progress} 
        />
      </div>
      
      <TimerControls 
        isRunning={timer.isRunning}
        onStart={timer.start}
        onPause={timer.pause}
        onReset={timer.reset}
        onSkip={timer.skipToNext}
        phase={timer.currentPhase}
      />
      
      <WorkoutProgress 
        currentSet={timer.currentSet}
        totalSets={timer.totalSets}
        currentPhase={timer.currentPhase}
      />
    </div>
  );
}