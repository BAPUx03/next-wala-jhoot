import { useState, useEffect } from 'react';
import { FloatingEmojis } from '@/components/FloatingEmojis';
import { RunningButton } from '@/components/RunningButton';
import { FakeProgress } from '@/components/FakeProgress';
import { PhotoUpload } from '@/components/PhotoUpload';
import { ViralTease } from '@/components/ViralTease';
import { FinalCTA } from '@/components/FinalCTA';
import { HinglishMessages } from '@/components/HinglishMessages';
import logo from '@/assets/nextwala-logo.png';

type Stage = 'intro' | 'button' | 'progress' | 'photo' | 'viral' | 'final';

const Index = () => {
  const [stage, setStage] = useState<Stage>('intro');
  const [attemptCount, setAttemptCount] = useState(0);
  const [idleTime, setIdleTime] = useState(0);
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [editedPhoto, setEditedPhoto] = useState<string | null>(null);

  // Track idle time
  useEffect(() => {
    const interval = setInterval(() => {
      setIdleTime(prev => prev + 1);
    }, 1000);

    const resetIdle = () => setIdleTime(0);
    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('click', resetIdle);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('click', resetIdle);
    };
  }, []);

  const handlePhotoProcessed = (original: string, edited: string) => {
    setOriginalPhoto(original);
    setEditedPhoto(edited);
    setTimeout(() => setStage('viral'), 3000);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <FloatingEmojis />
      
      {stage !== 'intro' && stage !== 'final' && (
        <HinglishMessages attemptCount={attemptCount} idleTime={idleTime} />
      )}

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Intro Stage */}
        {stage === 'intro' && (
          <div className="flex flex-col items-center justify-center min-h-screen space-y-8 text-center">
            <img src={logo} alt="NextWala Jhoot" className="w-72 md:w-96 animate-bounce" />
            <p className="text-2xl text-foreground/90 font-bold">
              Ek simple task hai... bas "Next" button click karna hai 😊
            </p>
            <button
              onClick={() => setStage('button')}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-12 py-6 rounded-3xl text-2xl font-bold border-4 border-black shadow-brutal hover:scale-105 transition-transform animate-pulse"
            >
              Shuru Karte Hai! 🚀
            </button>
            <p className="text-muted-foreground text-sm">
              (Spoiler: Itna easy nahi hai 😈)
            </p>
          </div>
        )}

        {/* Running Button Stage */}
        {stage === 'button' && (
          <div className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
              Bas Next button click karo 🎯
            </h2>
            <div className="w-full max-w-2xl bg-yellow-50 rounded-3xl p-8 border-4 border-black shadow-brutal">
              <RunningButton
                onEventualSuccess={() => setStage('progress')}
                attemptCount={attemptCount}
                setAttemptCount={setAttemptCount}
              />
            </div>
          </div>
        )}

        {/* Fake Progress Stage */}
        {stage === 'progress' && (
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="w-full max-w-xl bg-white/90 backdrop-blur-sm rounded-3xl border-4 border-black shadow-brutal">
              <FakeProgress
                onComplete={() => setStage('photo')}
                clickCount={attemptCount}
              />
            </div>
          </div>
        )}

        {/* Photo Upload Stage */}
        {stage === 'photo' && (
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="w-full max-w-xl bg-white/90 backdrop-blur-sm rounded-3xl border-4 border-black shadow-brutal">
              <PhotoUpload onPhotoProcessed={handlePhotoProcessed} />
            </div>
          </div>
        )}

        {/* Viral Tease Stage */}
        {stage === 'viral' && (
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="w-full max-w-xl bg-white/90 backdrop-blur-sm rounded-3xl border-4 border-black shadow-brutal">
              <ViralTease onComplete={() => setStage('final')} />
            </div>
          </div>
        )}

        {/* Final CTA Stage */}
        {stage === 'final' && (
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="w-full max-w-xl bg-white/90 backdrop-blur-sm rounded-3xl border-4 border-black shadow-brutal">
              <FinalCTA
                originalPhoto={originalPhoto}
                editedPhoto={editedPhoto}
                attemptCount={attemptCount}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
