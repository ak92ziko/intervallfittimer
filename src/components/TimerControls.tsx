import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { TimerPhase } from '../hooks/useTimer';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
  phase: TimerPhase;
}

export default function TimerControls({ 
  isRunning, 
  onStart, 
  onPause, 
  onReset, 
  onSkip,
  phase 
}: TimerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Reset button */}
      <button
        onClick={onReset}
        className="p-3 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
        aria-label="Reset timer"
      >
        <RotateCcw size={28} />
      </button>
      
      {/* Play/Pause button */}
      <button
        onClick={isRunning ? onPause : onStart}
        className={`p-4 rounded-full bg-white/20 hover:bg-white/30 transition text-white ${phase === 'completed' ? 'bg-green-500 hover:bg-green-600' : ''}`}
        aria-label={isRunning ? 'Pause timer' : 'Start timer'}
      >
        {isRunning ? <Pause size={36} /> : <Play size={36} />}
      </button>
      
      {/* Skip button - only show when timer is running and not completed */}
      {phase !== 'completed' && phase !== 'idle' && (
        <button
          onClick={onSkip}
          className="p-3 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
          aria-label="Skip to next phase"
        >
          <SkipForward size={28} />
        </button>
      )}
    </div>
  );
}