import { useEffect, useRef } from 'react';

interface Sound {
  id: string;
  url: string;
}

export default function useSound() {
  const soundsRef = useRef<Record<string, HTMLAudioElement>>({});
  
  useEffect(() => {
    // Define sounds with reliable URLs
    const sounds: Sound[] = [
      // Phase transition sounds (double beep)
      { id: 'workStart', url: 'https://cdn.freesound.org/previews/263/263133_2064400-lq.mp3' },
      { id: 'restStart', url: 'https://cdn.freesound.org/previews/263/263134_2064400-lq.mp3' },
      // Countdown warning sound (single beep)
      { id: 'countdown', url: 'https://cdn.freesound.org/previews/263/263132_2064400-lq.mp3' }
    ];
    
    // Preload sounds with error handling
    sounds.forEach(sound => {
      try {
        const audio = new Audio();
        
        // Add error handling for loading
        audio.onerror = (e) => {
          console.warn(`Error loading sound ${sound.id}:`, e);
        };
        
        // Add load event listener
        audio.addEventListener('canplaythrough', () => {
          soundsRef.current[sound.id] = audio;
        });
        
        audio.preload = 'auto';
        audio.src = sound.url;
      } catch (err) {
        console.warn(`Failed to initialize sound ${sound.id}:`, err);
      }
    });
    
    // Cleanup on unmount
    return () => {
      Object.values(soundsRef.current).forEach(audio => {
        try {
          audio.pause();
          audio.src = '';
        } catch (err) {
          console.warn('Error cleaning up audio:', err);
        }
      });
      soundsRef.current = {};
    };
  }, []);
  
  const play = (soundId: string) => {
    const audio = soundsRef.current[soundId];
    if (audio) {
      // Reset and play with error handling
      try {
        audio.currentTime = 0;
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.warn(`Error playing sound ${soundId}:`, err);
          });
        }
      } catch (err) {
        console.warn(`Error playing sound ${soundId}:`, err);
      }
    }
  };
  
  return { play };
}