export interface WorkoutPreset {
  id: string;
  title: string;
  titleDe: string;
  sets: number;
  workTime: number;
  restTime: number;
  description: string;
  descriptionDe: string;
}

const workoutPresets: WorkoutPreset[] = [
  {
    id: 'tabata',
    title: 'Tabata (4 Minutes)',
    titleDe: 'Tabata (4 Minuten)',
    sets: 8,
    workTime: 20,
    restTime: 10,
    description: 'Ideal for maximum intensity in a short time. 8 rounds of 20s work with 10s rest.',
    descriptionDe: 'Ideal für maximale Intensität in kurzer Zeit. 8 Runden mit 20s Training und 10s Pause.',
  },
  {
    id: 'hiit-1-1',
    title: 'Standard HIIT 1:1 (10 Minutes)',
    titleDe: 'Standard HIIT 1:1 (10 Minuten)',
    sets: 10,
    workTime: 30,
    restTime: 30,
    description: 'Classic interval training for fitness, endurance & fat burning. 10 rounds with equal work/rest periods.',
    descriptionDe: 'Klassisches Intervalltraining für Fitness, Ausdauer & Fettverbrennung. 10 Runden mit gleichen Trainings-/Pausenzeiten.',
  },
  {
    id: 'hiit-2-1',
    title: 'HIIT 2:1 (8 Rounds)',
    titleDe: 'HIIT 2:1 (8 Runden)',
    sets: 8,
    workTime: 40,
    restTime: 20,
    description: 'Higher work-to-rest ratio, suitable for advanced athletes. 8 rounds with 40s work, 20s rest.',
    descriptionDe: 'Höheres Trainings-Pausen-Verhältnis, geeignet für fortgeschrittene Athleten. 8 Runden mit 40s Training, 20s Pause.',
  },
  {
    id: 'sprint',
    title: 'Sprint-Interval (20 Minutes)',
    titleDe: 'Sprint-Intervall (20 Minuten)',
    sets: 6,
    workTime: 30,
    restTime: 180,
    description: 'Maximum power & VO2max training. Very intense with 6 rounds of 30s sprints followed by 3 min recovery.',
    descriptionDe: 'Maximale Kraft & VO2max Training. Sehr intensiv mit 6 Runden 30s Sprints gefolgt von 3 min Erholung.',
  },
  {
    id: 'emom',
    title: 'EMOM (12 Minutes)',
    titleDe: 'EMOM (12 Minuten)',
    sets: 12,
    workTime: 60,
    restTime: 0,
    description: 'Every Minute On the Minute. Complete the exercise within 60 seconds, rest with remaining time.',
    descriptionDe: 'Every Minute On the Minute. Übung innerhalb von 60 Sekunden ausführen, Restzeit zur Erholung.',
  },
];

export default workoutPresets