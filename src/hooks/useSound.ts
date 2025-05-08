import { useEffect, useRef } from 'react';
import { useTimerContext } from '../context/TimerContext';

interface Sound {
  id: string;
  url: string;
}

export default function useSound() {
  const soundsRef = useRef<Record<string, HTMLAudioElement>>({});
  const { volume } = useTimerContext();
  
  useEffect(() => {
    const sounds: Sound[] = [
      { id: 'phaseEnd', url: '/bleep-126625.mp3' },
      { id: 'phaseChange', url: '/microwave-finished-82491.mp3' }
    ];
    
    const loadSound = async (sound: Sound) => {
      try {
        const audio = new Audio(sound.url);
        await audio.load();
        audio.volume = 0;
        await audio.play();
        audio.pause();
        audio.currentTime = 0;
        audio.volume = volume;
        soundsRef.current[sound.id] = audio;
      } catch (err) {
        console.warn(`Fehler beim Laden des Sounds ${sound.id}:`, err);
      }
    };
    
    sounds.forEach(loadSound);
    
    return () => {
      Object.values(soundsRef.current).forEach(audio => {
        try {
          audio.pause();
          audio.src = '';
        } catch (err) {
          console.warn('Fehler beim Bereinigen des Audios:', err);
        }
      });
      soundsRef.current = {};
    };
  }, [volume]);
  
  // Update Lautstärke wenn sie sich ändert
  useEffect(() => {
    Object.values(soundsRef.current).forEach(audio => {
      audio.volume = volume;
    });
  }, [volume]);
  
  const playSound = async (soundId: string) => {
    const audio = soundsRef.current[soundId];
    if (audio) {
      try {
        audio.currentTime = 0;
        audio.volume = volume;
        await audio.play();
        return true;
      } catch (err) {
        console.warn('Fehler beim Abspielen des Sounds:', err);
        return false;
      }
    }
    return false;
  };

  const playCountdown = async () => {
    // Spielt den Phasenwechsel-Sound (Mikrowelle)
    await playSound('phaseChange');
  };

  const playPhaseChange = async () => {
    // Spielt den Phasenende-Sound (Bleep)
    await playSound('phaseEnd');
  };
  
  return { playCountdown, playPhaseChange };
}