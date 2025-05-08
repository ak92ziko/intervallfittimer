import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import { useTimerContext } from '../context/TimerContext';
import { useLanguage } from '../context/LanguageContext';

const VolumeIcon = ({ volume }: { volume: number }) => {
  if (volume === 0) return <VolumeX size={20} />;
  if (volume < 0.3) return <Volume size={20} />;
  if (volume < 0.7) return <Volume1 size={20} />;
  return <Volume2 size={20} />;
};

export default function VolumeControl() {
  const { volume, setVolume } = useTimerContext();
  const { t } = useLanguage();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const toggleMute = () => {
    setVolume(volume === 0 ? 1 : 0);
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <label className="block text-sm text-slate-300 mb-2 text-center">
        {t('volume.label')}
      </label>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="p-2 hover:bg-slate-700 rounded transition"
        >
          <VolumeIcon volume={volume} />
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
}
