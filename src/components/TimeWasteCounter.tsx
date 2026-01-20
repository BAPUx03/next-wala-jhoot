import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const milestones = [
  { seconds: 10, message: "10 seconds waste... acha start hai 🙃" },
  { seconds: 30, message: "30 seconds! Koi kaam nahi hai kya? 😏" },
  { seconds: 60, message: "1 minute! Productive human specimen 🤡" },
  { seconds: 120, message: "2 minutes! Still here? Respect 🫡" },
  { seconds: 180, message: "3 minutes! Tera boss kya sochega? 👔" },
  { seconds: 300, message: "5 minutes! Ab toh lunch break bhi khatam 🍱" },
  { seconds: 600, message: "10 minutes! Legend status unlocked 🏆" },
];

const refreshMessages = [
  "Still here? Respect 🫡",
  "Wapas aa gaya? Miss kiya? 🥹",
  "Refresh karke kya mila? Same website 🙃",
  "Time waste ka CEO ban gaya tu 👔",
  "Dedication dekho iska 💪",
  "Koi aur hobby dhundh le bhai 🎸",
];

interface TimeWasteCounterProps {
  onBack: () => void;
}

export const TimeWasteCounter = ({ onBack }: TimeWasteCounterProps) => {
  const [seconds, setSeconds] = useState(0);
  const [currentMilestone, setCurrentMilestone] = useState<string | null>(null);
  const [totalVisits, setTotalVisits] = useState(1);
  const { playSound } = useSoundEffects();

  useEffect(() => {
    // Check if user has visited before
    const visits = localStorage.getItem('wasteVisits');
    if (visits) {
      setTotalVisits(parseInt(visits) + 1);
      localStorage.setItem('wasteVisits', String(parseInt(visits) + 1));
      playSound('hehe');
    } else {
      localStorage.setItem('wasteVisits', '1');
    }

    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const milestone = milestones.find(m => m.seconds === seconds);
    if (milestone) {
      setCurrentMilestone(milestone.message);
      playSound('tada');
    }
  }, [seconds]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Button variant="ghost" onClick={onBack} className="mb-4 flex items-center gap-2">
        <ArrowLeft size={20} /> Back
      </Button>

      <div className="max-w-md mx-auto">
        <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-brutal animate-fade-in text-center">
          <Clock className="mx-auto text-primary mb-4" size={64} />
          
          <h2 className="text-xl font-bold text-muted-foreground mb-2">
            You have wasted
          </h2>
          
          <div className="text-6xl font-bold text-foreground mb-4 font-mono">
            {formatTime(seconds)}
          </div>
          
          <p className="text-xl text-primary mb-6">
            on this page ⏱️
          </p>

          {currentMilestone && (
            <div className="bg-primary/20 rounded-2xl p-4 mb-6 border-2 border-black animate-fade-in">
              <p className="text-lg font-bold text-foreground">
                🎉 {currentMilestone}
              </p>
            </div>
          )}

          {totalVisits > 1 && (
            <div className="bg-secondary/20 rounded-xl p-4 mb-6 border-2 border-black">
              <p className="text-sm text-foreground">
                Visit #{totalVisits} 👀
                <br />
                <span className="text-muted-foreground">
                  {refreshMessages[Math.floor(Math.random() * refreshMessages.length)]}
                </span>
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-muted rounded-xl p-4 border-2 border-black">
              <p className="text-2xl font-bold">{totalVisits}</p>
              <p className="text-sm text-muted-foreground">Total Visits</p>
            </div>
            <div className="bg-muted rounded-xl p-4 border-2 border-black">
              <p className="text-2xl font-bold">{Math.floor(seconds / 60)}</p>
              <p className="text-sm text-muted-foreground">Minutes Wasted</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            *This time will never come back 💀
          </p>
        </div>
      </div>
    </div>
  );
};
