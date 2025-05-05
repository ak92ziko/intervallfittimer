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
    const loadSound = async (sound: Sound) => {
      try {
        const audio = new Audio(sound.url);
        
        // Aktives Laden des Sounds
        await audio.load();
        
        // Test-Play (stumm) um Autoplay-Restrictions zu umgehen
        audio.volume = 0;
        await audio.play();
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 1;
        
        soundsRef.current[sound.id] = audio;
        console.log(`Sound ${sound.id} erfolgreich geladen`);
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
  
  const playSound = async (soundId: string) => {
    const audio = soundsRef.current[soundId];
    if (audio) {
      try {
        audio.currentTime = 0;
        await audio.play();
        return true;
      } catch (err) {
        console.warn(`Fehler beim Abspielen des Sounds ${soundId}:`, err);
        return false;
      }
    }
    return false;
  };

  const playCountdown = async () => {
    await playSound('countdown');
  };

  const playPhaseChange = async () => {
    const success = await playSound('phaseChange');
    if (success) {
      // Zweiter Piep nach kurzer Verzögerung
      setTimeout(async () => {
        await playSound('phaseChange');
      }, 200);
    }
  };
  
  return { playCountdown, playPhaseChange };
}