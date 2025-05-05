import { useState } from 'react';
import { Dumbbell, Clock, Plus, Minus } from 'lucide-react';
import { useTimerContext } from '../context/TimerContext';
import { useLanguage } from '../context/LanguageContext';
import workoutPresets from '../utils/workoutPresets';
import { formatTime } from '../utils/formatTime';

interface WorkoutSelectorProps {
  onSelectWorkout: () => void;
}

export default function WorkoutSelector({ onSelectWorkout }: WorkoutSelectorProps) {
  const { 
    workoutSets, setWorkoutSets,
    workTime, setWorkTime,
    restTime, setRestTime,
    applyPreset
  } = useTimerContext();
  
  const { t, language } = useLanguage();
  
  // Helper for number input adjustments
  const adjustValue = (
    setter: (value: number) => void,
    currentValue: number,
    amount: number,
    min: number,
    max: number
  ) => {
    const newValue = currentValue + amount;
    if (newValue >= min && newValue <= max) {
      setter(newValue);
    }
  };
  
  // Calculate total workout time
  const calculateTotalTime = (sets: number, work: number, rest: number) => {
    const totalSeconds = sets * work + (sets - 1) * rest;
    return formatTime(totalSeconds);
  };
  
  return (
    <div className="max-w-3xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-center mb-6">{t('workout.configure')}</h2>
      
      {/* Custom Workout Form */}
      <div className="bg-slate-700 rounded-lg p-6 shadow-lg mb-8">
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          {/* Number of Sets */}
          <div className="bg-slate-800 rounded-lg p-4">
            <label className="block text-sm text-slate-300 mb-2">
              {t('workout.sets')}
            </label>
            <div className="flex items-center">
              <button
                onClick={() => adjustValue(setWorkoutSets, workoutSets, -1, 1, 30)}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-l-lg"
              >
                <Minus size={16} />
              </button>
              <div className="px-4 py-2 bg-slate-900 text-center font-mono">
                {workoutSets}
              </div>
              <button
                onClick={() => adjustValue(setWorkoutSets, workoutSets, 1, 1, 30)}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-r-lg"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          {/* Work Time */}
          <div className="bg-slate-800 rounded-lg p-4">
            <label className="block text-sm text-slate-300 mb-2">
              {t('workout.workTime')}
            </label>
            <div className="flex items-center">
              <button
                onClick={() => adjustValue(setWorkTime, workTime, -5, 5, 300)}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-l-lg"
              >
                <Minus size={16} />
              </button>
              <div className="px-4 py-2 bg-slate-900 text-center font-mono">
                {workTime}
              </div>
              <button
                onClick={() => adjustValue(setWorkTime, workTime, 5, 5, 300)}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-r-lg"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          {/* Rest Time */}
          <div className="bg-slate-800 rounded-lg p-4">
            <label className="block text-sm text-slate-300 mb-2">
              {t('workout.restTime')}
            </label>
            <div className="flex items-center">
              <button
                onClick={() => adjustValue(setRestTime, restTime, -5, 5, 300)}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-l-lg"
              >
                <Minus size={16} />
              </button>
              <div className="px-4 py-2 bg-slate-900 text-center font-mono">
                {restTime}
              </div>
              <button
                onClick={() => adjustValue(setRestTime, restTime, 5, 5, 300)}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-r-lg"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center text-slate-300 mb-6">
          <p className="text-sm">
            {t('workout.total')}: {calculateTotalTime(workoutSets, workTime, restTime)}
          </p>
        </div>
        
        <div className="flex justify-center">
          <button
            className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition font-semibold"
            onClick={onSelectWorkout}
          >
            {t('workout.start')}
          </button>
        </div>
      </div>
      
      {/* Preset Workouts */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">{t('workout.presets')}</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workoutPresets.map((preset) => (
            <div 
              key={preset.id}
              className="bg-slate-700 hover:bg-slate-600 rounded-lg p-4 cursor-pointer transition shadow-md"
              onClick={() => {
                applyPreset(preset);
                onSelectWorkout();
              }}
            >
              <div className="flex gap-2 items-center mb-2">
                <Dumbbell className="h-5 w-5 text-red-400" />
                <h3 className="text-lg font-semibold">
                  {language === 'de' ? preset.titleDe : preset.title}
                </h3>
              </div>
              
              <p className="text-slate-300 text-sm mb-3">
                {language === 'de' ? preset.descriptionDe : preset.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>
                  <Clock className="h-4 w-4 inline mr-1" />
                  {calculateTotalTime(preset.sets, preset.workTime, preset.restTime)}
                </span>
                <span>{preset.sets} {t('workout.rounds')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}