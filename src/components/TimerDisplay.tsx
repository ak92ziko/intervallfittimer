import { formatTimeWithHundredths } from '../utils/formatTime';
import { TimerPhase } from '../hooks/useTimer';
import { useLanguage } from '../context/LanguageContext';

interface TimerDisplayProps {
  timeLeft: number;
  phase: TimerPhase;
  progress: number;
}

export default function TimerDisplay({ timeLeft, phase, progress }: TimerDisplayProps) {
  const { t } = useLanguage();
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  const getStrokeColor = (phase: TimerPhase) => {
    switch(phase) {
      case 'work': return '#ef4444';
      case 'rest': return '#3b82f6';
      case 'completed': return '#22c55e';
      default: return '#94a3b8';
    }
  };
  
  return (
    <div className="relative flex items-center justify-center w-[280px] h-[280px]">
      <svg
        width="280"
        height="280"
        viewBox="0 0 280 280"
        className="progress-ring absolute"
      >
        <circle
          cx="140"
          cy="140"
          r="120"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="20"
        />
        
        <circle
          cx="140"
          cy="140"
          r="120"
          fill="none"
          stroke={getStrokeColor(phase)}
          strokeWidth="20"
          strokeDasharray={circumference}
          strokeDashoffset={phase === 'idle' ? circumference : strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-200 ease-linear"
        />
      </svg>
      
      <div className={`text-white timer-display font-bold z-10 ${phase !== 'idle' && phase !== 'completed' ? 'animate-pulse-slow' : ''}`}>
        {phase === 'completed' ? t('timer.done') : formatTimeWithHundredths(timeLeft)}
      </div>
    </div>
  );
}