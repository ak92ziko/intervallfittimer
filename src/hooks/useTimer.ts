import { useState, useEffect, useRef } from 'react';
import useSound from './useSound';

export type TimerPhase = 'work' | 'rest' | 'idle' | 'completed' | 'countdown';

interface UseTimerProps {
  totalSets: number;
  workTime: number; // in seconds
  restTime: number; // in seconds
  onComplete?: () => void;
}

export default function useTimer({ totalSets, workTime, restTime, onComplete }: UseTimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [currentPhase, setCurrentPhase] = useState<TimerPhase>('idle');
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [progress, setProgress] = useState(0);
  
  const lastTickTime = useRef<number | null>(null);
  const { playCountdown, playPhaseChange } = useSound();
  
  const start = () => {
    if (currentPhase === 'completed') {
      reset();
    }
    
    if (currentPhase === 'idle') {
      setCurrentPhase('countdown');
      setTimeLeft(5); // Auf 5 Sekunden erhöht
      playCountdown().catch(console.warn);
    }
    
    setIsRunning(true);
    lastTickTime.current = Date.now();
  };
  
  const pause = () => {
    setIsRunning(false);
  };
  
  const reset = () => {
    setIsRunning(false);
    setCurrentSet(1);
    setCurrentPhase('idle');
    setTimeLeft(workTime);
    setProgress(0);
  };
  
  const skipToNext = async () => {
    if (currentPhase === 'countdown') {
      setCurrentPhase('work');
      setTimeLeft(workTime);
      await playPhaseChange();
    } else if (currentPhase === 'work') {
      if (currentSet < totalSets) {
        setCurrentPhase('rest');
        setTimeLeft(restTime);
        await playPhaseChange();
      } else {
        setCurrentPhase('completed');
        setIsRunning(false);
        if (onComplete) onComplete();
      }
    } else if (currentPhase === 'rest') {
      setCurrentSet(prev => prev + 1);
      setCurrentPhase('work');
      setTimeLeft(workTime);
      await playPhaseChange();
    }
  };
  
  useEffect(() => {
    if (currentPhase === 'countdown') {
      setProgress((5 - timeLeft) / 5 * 100); // Angepasst für 5-Sekunden-Countdown
    } else if (currentPhase === 'work') {
      setProgress((workTime - timeLeft) / workTime * 100);
    } else if (currentPhase === 'rest') {
      setProgress((restTime - timeLeft) / restTime * 100);
    }
  }, [timeLeft, workTime, restTime, currentPhase]);
  
  useEffect(() => {
    if (!isRunning) return;
    
    const updateTimer = () => {
      if (!isRunning || !lastTickTime.current) return;
      
      const now = Date.now();
      const delta = (now - lastTickTime.current) / 1000;
      lastTickTime.current = now;
      
      setTimeLeft(prev => {
        const newTime = Math.max(0, prev - delta);
        
        // Spiele den Phasenwechsel-Sound 4 Sekunden vor Ende
        if ((currentPhase === 'work' || currentPhase === 'rest') && 
            Math.ceil(prev) > 4 && Math.ceil(newTime) <= 4) {
          playCountdown().catch(console.warn);
        }
        
        if (newTime <= 0) {
          // Spiele den Phasenende-Sound beim Wechsel
          playPhaseChange().catch(console.warn);
          skipToNext().catch(console.warn);
          return 0;
        }
        
        return newTime;
      });
    };
    
    const timerId = setInterval(updateTimer, 50);
    
    return () => clearInterval(timerId);
  }, [isRunning, currentPhase, currentSet, totalSets, workTime, restTime]);
  
  return {
    isRunning,
    currentSet,
    currentPhase,
    timeLeft,
    progress,
    totalSets,
    start,
    pause,
    reset,
    skipToNext,
  };
}