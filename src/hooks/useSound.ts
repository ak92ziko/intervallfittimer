import { useEffect, useRef } from 'react';

interface Sound {
  id: string;
  url: string;
}

export default function useSound() {
  const soundsRef = useRef<Record<string, HTMLAudioElement>>({});
  
  useEffect(() => {
    const sounds: Sound[] = [
      { id: 'beep', url: '/bleep-126625.mp3' }
    ];
    
    const loadSound = async (sound: Sound) => {
      try {
        const audio = new Audio(sound.url);
        await audio.load();
        audio.volume = 0;
        await audio.play();
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 1;
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
  }, []);
  
  const playSound = async () => {
    const audio = soundsRef.current['beep'];
    if (audio) {
      try {
        audio.currentTime = 0;
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
    // 2x kurzer Ton im Abstand von 400ms
    for (let i = 0; i < 2; i++) {
      await new Promise(resolve => setTimeout(resolve, i > 0 ? 400 : 0));
      await playSound();
    }
  };

  const playPhaseChange = async () => {
    // 1x langer Ton (durch dreimaliges schnelles Abspielen)
    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, i > 0 ? 50 : 0));
      await playSound();
    }
  };
  
  return { playCountdown, playPhaseChange };
}