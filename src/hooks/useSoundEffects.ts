import { useCallback, useRef } from 'react';

type SoundType = 'boing' | 'hehe' | 'cheer' | 'fail' | 'drumroll' | 'tada' | 'honk' | 'pop' | 'suspense' | 'sad';

// Web Audio API based sound effects
const createOscillatorSound = (
  audioContext: AudioContext,
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume: number = 0.3
) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

const playBoingSound = (audioContext: AudioContext) => {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  
  osc.frequency.setValueAtTime(150, audioContext.currentTime);
  osc.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
  osc.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2);
  
  gain.gain.setValueAtTime(0.4, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.3);
};

const playHeheSound = (audioContext: AudioContext) => {
  [0, 0.1, 0.2].forEach((delay, i) => {
    setTimeout(() => {
      createOscillatorSound(audioContext, 800 + i * 100, 0.1, 'sine', 0.2);
    }, delay * 1000);
  });
};

const playCheerSound = (audioContext: AudioContext) => {
  // Multiple frequencies for a celebratory sound
  [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
    setTimeout(() => {
      createOscillatorSound(audioContext, freq, 0.3, 'sine', 0.2);
    }, i * 100);
  });
};

const playFailSound = (audioContext: AudioContext) => {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  
  osc.frequency.setValueAtTime(400, audioContext.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
  osc.type = 'sawtooth';
  
  gain.gain.setValueAtTime(0.3, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
  
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.5);
};

const playDrumrollSound = (audioContext: AudioContext) => {
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      createOscillatorSound(audioContext, 100 + Math.random() * 50, 0.05, 'triangle', 0.15);
    }, i * 50);
  }
};

const playTadaSound = (audioContext: AudioContext) => {
  // Fanfare-like sound
  [392, 523.25, 659.25, 783.99].forEach((freq, i) => {
    setTimeout(() => {
      createOscillatorSound(audioContext, freq, 0.4, 'sine', 0.25);
    }, i * 150);
  });
};

const playHonkSound = (audioContext: AudioContext) => {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  
  osc.frequency.setValueAtTime(200, audioContext.currentTime);
  osc.type = 'square';
  
  gain.gain.setValueAtTime(0.3, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.3);
};

const playPopSound = (audioContext: AudioContext) => {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  
  osc.frequency.setValueAtTime(400, audioContext.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.05);
  
  gain.gain.setValueAtTime(0.5, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.1);
};

const playSuspenseSound = (audioContext: AudioContext) => {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  
  osc.frequency.setValueAtTime(100, audioContext.currentTime);
  osc.frequency.linearRampToValueAtTime(200, audioContext.currentTime + 1.5);
  osc.type = 'sine';
  
  gain.gain.setValueAtTime(0.1, audioContext.currentTime);
  gain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 1.5);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.6);
  
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 1.6);
};

const playSadSound = (audioContext: AudioContext) => {
  const notes = [392, 349.23, 329.63, 293.66];
  notes.forEach((freq, i) => {
    setTimeout(() => {
      createOscillatorSound(audioContext, freq, 0.4, 'sine', 0.2);
    }, i * 300);
  });
};

export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback((type: SoundType) => {
    try {
      const audioContext = getAudioContext();
      
      // Resume context if suspended (due to autoplay policies)
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      switch (type) {
        case 'boing':
          playBoingSound(audioContext);
          break;
        case 'hehe':
          playHeheSound(audioContext);
          break;
        case 'cheer':
          playCheerSound(audioContext);
          break;
        case 'fail':
          playFailSound(audioContext);
          break;
        case 'drumroll':
          playDrumrollSound(audioContext);
          break;
        case 'tada':
          playTadaSound(audioContext);
          break;
        case 'honk':
          playHonkSound(audioContext);
          break;
        case 'pop':
          playPopSound(audioContext);
          break;
        case 'suspense':
          playSuspenseSound(audioContext);
          break;
        case 'sad':
          playSadSound(audioContext);
          break;
      }
    } catch (error) {
      console.log(`Sound effect ${type} failed:`, error);
    }
  }, [getAudioContext]);

  return { playSound };
};
