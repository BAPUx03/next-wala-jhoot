import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Gift, Share2, Copy, Check, Sparkles, Heart, PartyPopper } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { BirthdayConfetti } from '@/components/BirthdayConfetti';
import { GiftLoadingBar } from '@/components/GiftLoadingBar';

const relations = [
  { id: 'friend', label: 'Friend 🤝', emoji: '🤝' },
  { id: 'bestie', label: 'Bestie 💕', emoji: '💕' },
  { id: 'bhai', label: 'Bhai/Behen 👊', emoji: '👊' },
  { id: 'crush', label: 'Crush 😍', emoji: '😍' },
  { id: 'enemy', label: 'Ex/Enemy 💀', emoji: '💀' },
];

const birthdayMessages: Record<string, string[]> = {
  friend: [
    "Janamdin mubarak! Ab treat de 🍕",
    "Ek saal aur buddha ho gaya 🧓",
    "Aaj toh party banti hai... teri taraf se 😏",
    "Tere birthday pe main khush, kyunki treat milegi 🤤",
  ],
  bestie: [
    "Happy Birthday mere yaar! 🥳 Ab tera card balance mera hai",
    "Tu meri jaan hai... aur jaan ka birthday hai 💕",
    "Tera birthday, meri party! 🎉",
    "Bestie matlab jo apna ATM share kare 💳",
  ],
  bhai: [
    "Bhai/Behen, janamdin ki hardik shubhkamnayein 🙏",
    "Aaj toh ghar ki chai free milegi 🍵",
    "Ek saal aur bada, ek saal aur mature... nahi hua 😂",
    "Room ab bhi share karna padega 🛏️",
  ],
  crush: [
    "Happy Birthday! 😍 Ab toh reply kar de...",
    "Tera din special hai... like tu 💕",
    "Meri dua hai tujhe best mile... I mean, main mil jaun 😏",
    "Birthday wish ke badle ek coffee date? ☕",
  ],
  enemy: [
    "Happy Birthday! 💀 Abhi bhi same age lag raha hai... OLD 🧓",
    "Tera birthday yaad hai mujhe... sadly 😈",
    "Wish kar raha hoon... majboori mein 🙄",
    "Ek saal aur survive kar liya tune 💀",
  ],
};

const prankReveals = [
  { emoji: "🤡", text: "Gift nahi hai...", subtext: "Bas tu hi gift hai!" },
  { emoji: "😂", text: "LOL!", subtext: "Tera gift toh bhool gaya main..." },
  { emoji: "💀", text: "Plot twist!", subtext: "Gift budget mein nahi tha 😅" },
  { emoji: "🎭", text: "Surprise!", subtext: "Asli gift teri dosti hai 🤗" },
  { emoji: "🙃", text: "Oops!", subtext: "Gift delivery mein 84 saal lagenge" },
];

interface BirthdayWishProps {
  onBack: () => void;
  linkId?: string;
}

type Step = 'intro' | 'name' | 'relation' | 'sender' | 'loading' | 'gift' | 'unwrap' | 'reveal' | 'share';

export const BirthdayWish = ({ onBack, linkId }: BirthdayWishProps) => {
  const [step, setStep] = useState<Step>(linkId ? 'gift' : 'intro');
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [senderName, setSenderName] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [linkData, setLinkData] = useState<{ recipient_name: string; relation: string; sender_name?: string | null } | null>(null);
  const [unwrapStage, setUnwrapStage] = useState(0);
  const [prankReveal, setPrankReveal] = useState(prankReveals[0]);
  const { playSound } = useSoundEffects();

  useEffect(() => {
    if (linkId) {
      fetchLinkData();
    }
  }, [linkId]);

  useEffect(() => {
    setPrankReveal(prankReveals[Math.floor(Math.random() * prankReveals.length)]);
  }, []);

  const fetchLinkData = async () => {
    const { data } = await supabase
      .from('birthday_links')
      .select('*')
      .eq('id', linkId)
      .single();

    if (data) {
      setLinkData(data);
      setName(data.recipient_name);
      setRelation(data.relation);
    }
  };

  const handleStartClick = () => {
    playSound('pop');
    setStep('name');
  };

  const handleNameSubmit = () => {
    if (!name.trim()) {
      toast.error('Naam toh daal! 😤');
      playSound('fail');
      return;
    }
    playSound('boing');
    setStep('relation');
  };

  const handleRelationSelect = (r: string) => {
    playSound('pop');
    setRelation(r);
    setStep('sender');
  };

  const handleSenderSubmit = async () => {
    playSound('drumroll');
    setStep('loading');
  };

  const handleLoadingComplete = async () => {
    // Create link in database
    const { data } = await supabase
      .from('birthday_links')
      .insert({
        recipient_name: name,
        relation: relation,
        sender_name: senderName || null
      })
      .select()
      .single();

    if (data) {
      const link = `${window.location.origin}/birthday/${data.id}`;
      setShareLink(link);
    }

    playSound('tada');
    setStep('gift');
  };

  const handleGiftClick = () => {
    playSound('suspense');
    setStep('unwrap');
    
    // Animate unwrap stages
    const stages = [1, 2, 3];
    stages.forEach((stage, i) => {
      setTimeout(() => {
        setUnwrapStage(stage);
        playSound('pop');
      }, (i + 1) * 800);
    });

    setTimeout(() => {
      setShowConfetti(true);
      playSound('tada');
      setTimeout(() => {
        playSound('fail');
        setStep('reveal');
      }, 1500);
    }, 3000);
  };

  const handleShare = () => {
    playSound('cheer');
    setStep('share');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    playSound('pop');
    toast.success('Link copy ho gaya! 📋');
    setTimeout(() => setCopied(false), 2000);
  };

  const getMessage = () => {
    const messages = birthdayMessages[relation] || birthdayMessages.friend;
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-primary/5 p-4">
      {!linkId && step !== 'intro' && (
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 flex items-center gap-2 hover:bg-primary/20"
        >
          <ArrowLeft size={20} />
          Back
        </Button>
      )}

      <div className="max-w-lg mx-auto pt-8">
        
        {/* Step 1: Intro */}
        {step === 'intro' && (
          <div className="text-center animate-fade-in space-y-8">
            <div className="text-8xl animate-bounce">🎂</div>
            <h1 className="text-4xl font-bold text-foreground">
              Birthday Prank Time! 🎉
            </h1>
            <p className="text-xl text-muted-foreground">
              Apne dost ko ek "special gift" bhejo... 😈
            </p>
            <Button
              onClick={handleStartClick}
              className="bg-gradient-to-r from-accent to-primary text-primary-foreground text-2xl py-8 px-12 rounded-2xl border-4 border-black shadow-brutal hover:scale-105 transition-transform"
            >
              <PartyPopper className="mr-3" size={28} />
              Shuru Karo!
            </Button>
            <p className="text-sm text-muted-foreground">
              (100% safe, 100% funny, 0% actual gift 🤡)
            </p>
          </div>
        )}

        {/* Step 2: Name Input */}
        {step === 'name' && (
          <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-brutal animate-fade-in">
            <div className="text-center mb-6">
              <span className="text-6xl">🎈</span>
              <h2 className="text-3xl font-bold text-foreground mt-4">
                Kiska Birthday Hai?
              </h2>
              <p className="text-muted-foreground mt-2">
                (Jo bechara prank ka shikar banega 😈)
              </p>
            </div>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Naam likh yaar..."
              className="border-4 border-black text-xl py-6 text-center rounded-xl"
              onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
            />

            <Button
              onClick={handleNameSubmit}
              className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-xl border-4 border-black shadow-brutal"
            >
              Aage Badho →
            </Button>
          </div>
        )}

        {/* Step 3: Relation Selection */}
        {step === 'relation' && (
          <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-brutal animate-fade-in">
            <div className="text-center mb-6">
              <span className="text-6xl">🤔</span>
              <h2 className="text-2xl font-bold text-foreground mt-4">
                {name} tera kya lagta hai?
              </h2>
              <p className="text-muted-foreground mt-2">
                (Sahi batana, roast accordingly hoga 😏)
              </p>
            </div>

            <div className="grid gap-3">
              {relations.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleRelationSelect(r.id)}
                  className="p-4 rounded-xl border-4 border-black font-bold text-lg transition-all bg-card hover:bg-primary hover:text-primary-foreground hover:shadow-brutal hover:-translate-y-1"
                >
                  <span className="text-2xl mr-3">{r.emoji}</span>
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Sender Name */}
        {step === 'sender' && (
          <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-brutal animate-fade-in">
            <div className="text-center mb-6">
              <span className="text-6xl">✍️</span>
              <h2 className="text-2xl font-bold text-foreground mt-4">
                Tera naam kya hai prankster?
              </h2>
              <p className="text-muted-foreground mt-2">
                (Optional hai, anonymous bhi reh sakta hai 🥷)
              </p>
            </div>

            <Input
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Apna naam (ya fake naam 😜)"
              className="border-4 border-black text-xl py-6 text-center rounded-xl"
            />

            <Button
              onClick={handleSenderSubmit}
              className="w-full mt-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-6 text-xl border-4 border-black shadow-brutal"
            >
              <Sparkles className="mr-2" />
              Gift Ready Karo! 🎁
            </Button>

            <button
              onClick={handleSenderSubmit}
              className="w-full mt-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip (Anonymous rahenge 🥷)
            </button>
          </div>
        )}

        {/* Step 5: Fake Loading */}
        {step === 'loading' && (
          <GiftLoadingBar onComplete={handleLoadingComplete} loadDuration={4000} />
        )}

        {/* Step 6: Gift Box */}
        {step === 'gift' && (
          <div className="text-center animate-fade-in space-y-6">
            <div className="text-6xl animate-wave inline-block">👋</div>
            <h2 className="text-3xl font-bold text-foreground">
              {linkData ? `Hey ${name}!` : `${name} ke liye...`}
            </h2>
            <p className="text-xl text-muted-foreground">
              {linkData?.sender_name 
                ? `${linkData.sender_name} ne tujhe kuch bheja hai! 🎁` 
                : 'Tera special birthday gift aa gaya! 🎁'}
            </p>

            <div className="relative inline-block mt-4">
              <button
                onClick={handleGiftClick}
                className="relative bg-gradient-to-br from-destructive via-accent to-primary p-16 rounded-3xl border-4 border-black shadow-brutal hover:scale-110 transition-all animate-pulse"
              >
                <Gift size={100} className="text-primary-foreground" />
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full px-4 py-2 font-bold animate-bounce border-2 border-black">
                  TAP ME! 👆
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-1 rounded-full text-sm">
                  🔓 Unlock Gift
                </div>
              </button>
              
              {/* Sparkles around gift */}
              <Sparkles className="absolute top-0 left-0 text-primary animate-ping" size={24} />
              <Sparkles className="absolute top-0 right-0 text-primary animate-ping" size={24} />
              <Sparkles className="absolute bottom-0 left-0 text-primary animate-ping" size={24} />
              <Sparkles className="absolute bottom-0 right-0 text-primary animate-ping" size={24} />
            </div>

            <p className="text-muted-foreground animate-pulse">
              Click karke dekh kya hai andar! 🤩
            </p>
          </div>
        )}

        {/* Step 7: Unwrap Animation */}
        {step === 'unwrap' && (
          <div className="text-center animate-fade-in space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              Gift khul raha hai... 🎁
            </h2>
            
            <div className="relative">
              <div className={`transition-all duration-500 ${unwrapStage >= 1 ? 'opacity-50 rotate-12' : ''}`}>
                <div className={`text-8xl ${unwrapStage >= 2 ? 'animate-shake' : 'animate-bounce'}`}>
                  🎁
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <p className={`font-bold transition-all ${unwrapStage >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                  {unwrapStage >= 1 ? '✅' : '⏳'} Ribbon khol rahe hain...
                </p>
                <p className={`font-bold transition-all ${unwrapStage >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                  {unwrapStage >= 2 ? '✅' : '⏳'} Wrapper hata rahe hain...
                </p>
                <p className={`font-bold transition-all ${unwrapStage >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                  {unwrapStage >= 3 ? '✅' : '⏳'} Box khol rahe hain...
                </p>
              </div>
            </div>

            {showConfetti && (
              <BirthdayConfetti emojiList={['🎉', '🎊', '🎁', '🎂', '🥳', '✨', '💫', '🎈']} count={40} />
            )}
          </div>
        )}

        {/* Step 8: Prank Reveal */}
        {step === 'reveal' && (
          <div className="text-center animate-fade-in">
            <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-brutal">
              <div className="text-8xl mb-4 animate-bounce">{prankReveal.emoji}</div>
              <h2 className="text-4xl font-bold text-foreground mb-2">
                {prankReveal.text}
              </h2>
              <p className="text-2xl font-bold text-primary mb-6">
                {prankReveal.subtext}
              </p>

              <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-6 mb-6 border-2 border-black">
                <Heart className="inline-block text-destructive mb-2" size={32} />
                <p className="text-xl text-foreground italic">
                  "{getMessage()}"
                </p>
                {(linkData?.sender_name || senderName) && (
                  <p className="text-muted-foreground mt-3 font-bold">
                    — {linkData?.sender_name || senderName} 💝
                  </p>
                )}
              </div>

              <div className="space-y-3">
                {!linkId && (
                  <Button
                    onClick={handleShare}
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-5 text-lg border-4 border-black shadow-brutal"
                  >
                    <Share2 className="mr-2" size={24} />
                    {name} ko bhi prank karo! 📱
                  </Button>
                )}
                
                <Button
                  onClick={onBack}
                  variant="outline"
                  className="w-full border-4 border-black font-bold py-5"
                >
                  Wapas Home 🏠
                </Button>
              </div>
            </div>
            
            <BirthdayConfetti emojiList={['😂', '🤣', '🤡', '💀', '😭']} count={20} />
          </div>
        )}

        {/* Step 9: Share */}
        {step === 'share' && (
          <div className="text-center animate-fade-in">
            <div className="bg-card border-4 border-black rounded-3xl p-8 shadow-brutal">
              <div className="text-6xl mb-4">😈</div>
              <h2 className="text-2xl font-bold mb-2 text-foreground">
                Ab {name} ki baari!
              </h2>
              <p className="text-muted-foreground mb-6">
                Yeh link bhej, woh bhi hassi ka patra banega 🤭
              </p>

              <div className="bg-muted rounded-xl p-4 mb-6 flex items-center gap-2 border-2 border-black">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 bg-transparent text-sm truncate"
                />
                <Button
                  onClick={copyLink}
                  variant="outline"
                  size="sm"
                  className="border-2 border-black shrink-0"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => window.open(`https://wa.me/?text=🎁%20Tera%20Birthday%20Gift%20Ready%20Hai!%20%0A%0AClick%20karke%20dekh:%20${encodeURIComponent(shareLink)}`, '_blank')}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground border-4 border-black shadow-brutal py-4"
                >
                  WhatsApp 💬
                </Button>
                <Button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=🎂%20Birthday%20surprise%20for%20someone%20special!%20${encodeURIComponent(shareLink)}`, '_blank')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground border-4 border-black shadow-brutal py-4"
                >
                  Twitter 🐦
                </Button>
              </div>

              <Button
                onClick={onBack}
                variant="ghost"
                className="w-full mt-4 text-muted-foreground"
              >
                Done! Back to Home 🏠
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
