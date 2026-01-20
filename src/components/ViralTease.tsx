import { useState, useEffect } from 'react';

interface ViralTeaseProps {
  onComplete: () => void;
}

export const ViralTease = ({ onComplete }: ViralTeaseProps) => {
  const [showSecondLine, setShowSecondLine] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowSecondLine(true), 2000);
    const timer2 = setTimeout(() => onComplete(), 5000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="text-center space-y-6 p-8">
      <div className="text-6xl animate-bounce">📱</div>
      
      <h2 className="text-3xl font-bold text-foreground animate-pulse">
        Ruk… ye masterpiece Instagram pe viral karta hoon 😎
      </h2>
      
      {showSecondLine && (
        <p className="text-2xl font-bold text-foreground animate-fade-in">
          Sabko bhej deta hoon 🔥
        </p>
      )}
      
      <div className="flex justify-center gap-4 text-4xl">
        <span className="animate-bounce delay-0">📤</span>
        <span className="animate-bounce delay-100">📤</span>
        <span className="animate-bounce delay-200">📤</span>
      </div>
    </div>
  );
};
