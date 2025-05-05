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
  
  // Start the timer
  const start = () => {
    if (currentPhase === 'completed') {
      // Reset if completed
      reset();
    }
    
    if (currentPhase === 'idle') {
      setCurrentPhase('countdown');
      setTimeLeft(3); // 3-Sekunden-Countdown
      playCountdown().catch(console.warn);
    }
    
    setIsRunning(true);
    lastTickTime.current = Date.now();
  };
  
  // Pause the timer
  const pause = () => {
    setIsRunning(false);
  };
  
  // Reset the timer
  const reset = () => {
    setIsRunning(false);
    setCurrentSet(1);
    setCurrentPhase('idle');
    setTimeLeft(workTime);
    setProgress(0);
  };
  
  // Skip to next phase or set
  const skipToNext = async () => {
    if (currentPhase === 'countdown') {
      setCurrentPhase('work');
      setTimeLeft(workTime);
      await playPhaseChange();
    } else if (currentPhase === 'work') {
      await playPhaseChange();
      setCurrentPhase('rest');
      setTimeLeft(restTime);
    } else if (currentPhase === 'rest') {
      if (currentSet < totalSets) {
        setCurrentSet(prev => prev + 1);
        setCurrentPhase('countdown');
        setTimeLeft(3); // 3-Sekunden-Countdown für nächste Workphase
        await playCountdown();
      } else {
        setCurrentPhase('completed');
        setIsRunning(false);
        if (onComplete) onComplete();
      }
    }
  };
  
  // Calculate progress
  useEffect(() => {
    if (currentPhase === 'countdown') {
      setProgress((3 - timeLeft) / 3 * 100);
    } else if (currentPhase === 'work') {
      setProgress((workTime - timeLeft) / workTime * 100);
    } else if (currentPhase === 'rest') {
      setProgress((restTime - timeLeft) / restTime * 100);
    }
  }, [timeLeft, workTime, restTime, currentPhase]);
  
  // Timer logic
  useEffect(() => {
    if (!isRunning) return;
    
    const updateTimer = () => {
      if (!isRunning || !lastTickTime.current) return;
      
      const now = Date.now();
      const delta = (now - lastTickTime.current) / 1000; // Convert to seconds
      lastTickTime.current = now;
      
      setTimeLeft(prev => {
        const newTime = Math.max(0, prev - delta);
        
        // Countdown-Pieptöne während der Countdown-Phase
        if (currentPhase === 'countdown' && Math.ceil(newTime) !== Math.ceil(prev)) {
          playCountdown().catch(console.warn);
        }
        
        // If timer reaches zero, move to next phase
        if (newTime <= 0) {
          skipToNext().catch(console.warn);
          return 0;
        }
        
        return newTime;
      });
    };
    
    const timerId = setInterval(updateTimer, 50); // Update more frequently for smoother countdown
    
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