import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Download, RefreshCw } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const certificates = [
  { title: "Certified Overthinker 🧠", desc: "For thinking about thinking about thinking" },
  { title: "Professional Procrastinator 🦥", desc: "Will finish this certificate later" },
  { title: "Chief Netflix Officer 📺", desc: "Binge-watching with excellence" },
  { title: "Sleep Deprivation Expert 😴", desc: "3 AM is just early morning" },
  { title: "Master of Doing Nothing 🧘", desc: "Laziness level: Legendary" },
  { title: "WhatsApp Blue Tick Ignorer 📱", desc: "Seen at 2:30, replied never" },
  { title: "Monday Hater Premium 😤", desc: "Weekend lover, weekday survivor" },
  { title: "Chronic Reply Later-er 💬", desc: "Will respond... eventually" },
  { title: "Certified Chai Addict ☕", desc: "Running on caffeine and chaos" },
  { title: "Gym Membership Waster 💪", desc: "Paid for gains, got remains" },
  { title: "Expert Excuse Maker 🎭", desc: "Creative reasoning specialist" },
  { title: "Serial Alarm Snoozer ⏰", desc: "5 more minutes × infinity" },
];

interface CertificateGeneratorProps {
  onBack: () => void;
}

export const CertificateGenerator = ({ onBack }: CertificateGeneratorProps) => {
  const [name, setName] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificate, setCertificate] = useState(certificates[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { playSound } = useSoundEffects();
  const certificateRef = useRef<HTMLDivElement>(null);

  const generateCertificate = () => {
    if (!name.trim()) return;
    
    playSound('drumroll');
    setIsGenerating(true);

    setTimeout(() => {
      setCertificate(certificates[Math.floor(Math.random() * certificates.length)]);
      setShowCertificate(true);
      setIsGenerating(false);
      playSound('cheer');
    }, 2000);
  };

  const downloadCertificate = () => {
    playSound('tada');
    // Create a simple text-based "download" experience
    const certText = `
🏆 CERTIFICATE OF ACHIEVEMENT 🏆
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This certifies that

✨ ${name.toUpperCase()} ✨

is hereby awarded the title of

🎖️ ${certificate.title} 🎖️

"${certificate.desc}"

Issued by: NextWalaJhoot
Date: ${new Date().toLocaleDateString()}
Validity: Lifetime (unfortunately)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;
    
    const blob = new Blob([certText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate_${name.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setShowCertificate(false);
    playSound('boing');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Button variant="ghost" onClick={onBack} className="mb-4 flex items-center gap-2">
        <ArrowLeft size={20} /> Back
      </Button>

      <div className="max-w-md mx-auto">
        {!showCertificate && !isGenerating ? (
          <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-brutal animate-fade-in">
            <div className="text-center mb-6">
              <span className="text-6xl">🏆</span>
              <h2 className="text-2xl font-bold text-foreground mt-4">
                Fake Certificate Generator
              </h2>
              <p className="text-muted-foreground mt-2">
                Get certified for your real skills 🤡
              </p>
            </div>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Apna naam daal..."
              className="border-4 border-black text-lg py-5 mb-4"
            />

            <Button
              onClick={generateCertificate}
              disabled={!name.trim()}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-xl border-4 border-black shadow-brutal"
            >
              Generate Certificate 📜
            </Button>
          </div>
        ) : isGenerating ? (
          <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-brutal animate-fade-in text-center">
            <div className="text-6xl animate-bounce mb-4">📜</div>
            <h2 className="text-xl font-bold text-foreground mb-4">
              Certificate ban raha hai...
            </h2>
            <p className="text-muted-foreground animate-pulse">
              Analyzing your life choices... 🔍
            </p>
          </div>
        ) : (
          <div ref={certificateRef} className="bg-gradient-to-b from-primary/10 to-primary/5 border-4 border-primary rounded-3xl p-8 shadow-brutal animate-fade-in">
            <div className="text-center border-4 border-dashed border-primary/50 rounded-2xl p-6 bg-card">
              <div className="text-4xl mb-2">🏆</div>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">
                Certificate of Achievement
              </p>
              
              <div className="my-6">
                <p className="text-sm text-muted-foreground">This certifies that</p>
                <h2 className="text-2xl font-bold text-foreground my-2">
                  {name}
                </h2>
                <p className="text-sm text-muted-foreground">is hereby awarded</p>
              </div>

              <div className="bg-primary/20 rounded-xl p-4 mb-4 border-2 border-primary">
                <h3 className="text-xl font-bold text-foreground">
                  {certificate.title}
                </h3>
                <p className="text-sm text-muted-foreground italic mt-2">
                  "{certificate.desc}"
                </p>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Issued by: <strong>NextWalaJhoot</strong></p>
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p className="mt-2 text-xs">*Valid for lifetime (unfortunately)</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button
                onClick={downloadCertificate}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-4 border-4 border-black shadow-brutal"
              >
                <Download className="mr-2" size={18} />
                Download
              </Button>
              <Button
                onClick={reset}
                variant="outline"
                className="border-4 border-black font-bold py-4"
              >
                <RefreshCw className="mr-2" size={18} />
                New One
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
