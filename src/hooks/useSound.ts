import { useEffect, useRef } from 'react';

interface Sound {
  id: string;
  url: string;
}

export default function useSound() {
  const soundsRef = useRef<Record<string, HTMLAudioElement>>({});
  
  useEffect(() => {
    // Definiere Sounds mit lokaler beep.mp3
    const sounds: Sound[] = [
      { id: 'countdown', url: '/beep.mp3' },
      { id: 'phaseChange', url: '/beep.mp3' }
    ];
    
    // Sounds vorladen
    sounds.forEach(sound => {
      try {
        const audio = new Audio();
        audio.onerror = (e) => {
          console.warn(`Fehler beim Laden des Sounds ${sound.id}:`, e);
        };
        
        audio.addEventListener('canplaythrough', () => {
          soundsRef.current[sound.id] = audio;
        });
        
        audio.preload = 'auto';
        audio.src = sound.url;
      } catch (err) {
        console.warn(`Fehler bei der Sound-Initialisierung ${sound.id}:`, err);
      }
    });
    
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
  
  const playCountdown = () => {
    const audio = soundsRef.current['countdown'];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(err => {
        console.warn('Fehler beim Abspielen des Countdown-Sounds:', err);
      });
    }
  };

  const playPhaseChange = () => {
    const audio = soundsRef.current['phaseChange'];
    if (audio) {
      // Doppelpiep durch schnelle Wiederholung
      audio.currentTime = 0;
      audio.play()
        .then(() => {
          setTimeout(() => {
            audio.currentTime = 0;
            audio.play().catch(console.warn);
          }, 200);
        })
        .catch(err => {
          console.warn('Fehler beim Abspielen des Phasenwechsel-Sounds:', err);
        });
    }
  };
  
  return { playCountdown, playPhaseChange };
}