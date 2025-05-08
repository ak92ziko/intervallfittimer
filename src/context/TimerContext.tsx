import { createContext, useContext, useState, ReactNode } from 'react';
import { WorkoutPreset } from '../utils/workoutPresets';

interface TimerContextType {
  workoutTitle: string;
  setWorkoutTitle: (title: string) => void;
  workoutSets: number;
  setWorkoutSets: (sets: number) => void;
  workTime: number;
  setWorkTime: (time: number) => void;
  restTime: number;
  setRestTime: (time: number) => void;
  workoutDescription: string;
  setWorkoutDescription: (desc: string) => void;
  volume: number;
  setVolume: (volume: number) => void;
  applyPreset: (preset: WorkoutPreset) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [workoutTitle, setWorkoutTitle] = useState('Custom Workout');
  const [workoutSets, setWorkoutSets] = useState(8);
  const [workTime, setWorkTime] = useState(30);
  const [restTime, setRestTime] = useState(30);
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [volume, setVolume] = useState(1); // Default Lautstärke ist 1 (100%)

  const applyPreset = (preset: WorkoutPreset) => {
    setWorkoutTitle(preset.title);
    setWorkoutSets(preset.sets);
    setWorkTime(preset.workTime);
    setRestTime(preset.restTime);
    setWorkoutDescription(preset.description);
  };

  return (
    <TimerContext.Provider
      value={{
        workoutTitle,
        setWorkoutTitle,
        workoutSets,
        setWorkoutSets,
        workTime,
        setWorkTime,
        restTime,
        setRestTime,
        workoutDescription,
        setWorkoutDescription,
        volume,
        setVolume,
        applyPreset,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimerContext() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
}