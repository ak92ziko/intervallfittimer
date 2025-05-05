import { TimerPhase } from '../hooks/useTimer';

interface WorkoutProgressProps {
  currentSet: number;
  totalSets: number;
  currentPhase: TimerPhase;
}

export default function WorkoutProgress({ 
  currentSet, 
  totalSets,
  currentPhase 
}: WorkoutProgressProps) {
  // Only show progress if not idle or completed
  if (currentPhase === 'idle' || currentPhase === 'completed') {
    return null;
  }
  
  // Generate array of set indicators
  const setIndicators = Array.from({ length: totalSets }, (_, i) => {
    const isCurrent = i + 1 === currentSet;
    const isPast = i + 1 < currentSet;
    
    let bgClass = 'bg-white/20';
    if (isCurrent) bgClass = currentPhase === 'work' ? 'bg-red-500' : 'bg-blue-500';
    if (isPast) bgClass = 'bg-white/60';
    
    return (
      <div 
        key={i} 
        className={`h-2 rounded-full transition-all duration-300 ${bgClass}`}
        style={{ 
          width: `${Math.min(100 / totalSets, 12)}%`,
          minWidth: '8px',
          maxWidth: '24px'
        }}
      />
    );
  });
  
  return (
    <div className="w-full max-w-md mt-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white/80">Set {currentSet} of {totalSets}</span>
        <span className="text-sm text-white/80">
          {currentPhase === 'work' ? 'Working' : 'Resting'}
        </span>
      </div>
      
      <div className="flex gap-1 justify-between w-full">
        {setIndicators}
      </div>
    </div>
  );
}