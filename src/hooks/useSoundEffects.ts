import { useCallback } from 'react';

export const useSoundEffects = () => {
  const playSound = useCallback((type: 'boing' | 'hehe' | 'cheer' | 'fail') => {
    // Sound effects can be added later - for now just console log
    console.log(`Playing sound: ${type}`);
  }, []);

  return { playSound };
};
