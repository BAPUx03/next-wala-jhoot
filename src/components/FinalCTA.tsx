import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface FinalCTAProps {
  originalPhoto: string | null;
  editedPhoto: string | null;
  attemptCount: number;
}

export const FinalCTA = ({ originalPhoto, editedPhoto, attemptCount }: FinalCTAProps) => {
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSendPhoto = async () => {
    if (!privacyAccepted || !originalPhoto) return;
    
    setIsSending(true);
    
    // Simulate sending (backend integration would go here)
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      console.log('Photo would be sent with consent:', {
        attemptCount,
        timestamp: new Date().toISOString(),
      });
    }, 2000);
  };

  return (
    <div className="text-center space-y-8 p-8">
      <div className="text-6xl animate-wave">👋</div>
      
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Chal… ab nikle bhi 😌
        </h2>
        <p className="text-xl text-muted-foreground">
          Instagram pe follow kar de jaa 👇
        </p>
      </div>
      
      <a
        href="https://www.instagram.com/pruthvirajsinh__makwana/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-8 py-4 rounded-2xl text-xl font-bold border-4 border-black shadow-brutal hover:scale-105 transition-transform animate-bounce"
      >
        @pruthvirajsinh__makwana 📸
      </a>
      
      <div className="space-y-2">
        <p className="text-lg text-muted-foreground">
          Aur haan… website yaad rakhna 😎
        </p>
        <a
          href="https://pruthvirajsinh.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl text-lg font-bold border-4 border-black shadow-brutal hover:scale-105 transition-transform"
        >
          pruthvirajsinh.in 🌐
        </a>
      </div>

      {/* Privacy consent section */}
      {originalPhoto && !sent && (
        <div className="mt-8 p-6 bg-muted/50 rounded-2xl border-4 border-black space-y-4">
          <p className="text-lg font-bold text-foreground">
            Photo share karna hai? 📤
          </p>
          
          <div className="flex items-center justify-center gap-3">
            <Checkbox
              id="privacy"
              checked={privacyAccepted}
              onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
              className="h-6 w-6"
            />
            <label htmlFor="privacy" className="text-sm text-muted-foreground cursor-pointer">
              Main agree karta/karti hoon{' '}
              <button
                onClick={() => setShowPrivacyPolicy(true)}
                className="text-primary underline font-bold"
              >
                Privacy Policy
              </button>{' '}
              se 📜
            </label>
          </div>
          
          <Button
            onClick={handleSendPhoto}
            disabled={!privacyAccepted || isSending}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-bold border-4 border-black shadow-brutal hover:scale-105 transition-transform disabled:opacity-50"
          >
            {isSending ? 'Bhej raha hoon... 📤' : 'Haan, bhej do! 🚀'}
          </Button>
        </div>
      )}

      {sent && (
        <div className="p-4 bg-green-500/20 rounded-xl border-4 border-green-500">
          <p className="text-xl font-bold text-green-600">
            Photo bhej diya! 🎉 Thanks for playing!
          </p>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-background p-6 rounded-2xl border-4 border-black max-w-md space-y-4">
            <h3 className="text-2xl font-bold">Privacy Policy 📜</h3>
            <div className="text-left text-sm space-y-2 text-muted-foreground">
              <p>• Photo sirf masti ke liye hai 🎭</p>
              <p>• Tumhari photo safe hai, koi galat use nahi hoga ✅</p>
              <p>• Ye website entertainment ke liye hai 🎪</p>
              <p>• Photo share karne se pehle tumhari permission li jaati hai 🤝</p>
              <p>• Koi personal data store nahi hota (sirf photo agar consent do) 🔒</p>
            </div>
            <Button
              onClick={() => setShowPrivacyPolicy(false)}
              className="w-full bg-primary text-primary-foreground font-bold"
            >
              Samajh gaya! 👍
            </Button>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-8">
        Photo sirf masti ke liye hai 🎭
      </p>
      
      <div className="text-muted-foreground text-sm">
        Total attempts: {attemptCount} 🏆
      </div>
    </div>
  );
};
