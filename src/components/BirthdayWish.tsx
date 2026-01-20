import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Gift, Share2, Copy, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const relations = [
  { id: 'friend', label: 'Friend 🤝', emoji: '🤝' },
  { id: 'bestie', label: 'Bestie 💕', emoji: '💕' },
  { id: 'bhai', label: 'Bhai/Behen 👊', emoji: '👊' },
  { id: 'crush', label: 'Crush 😍', emoji: '😍' },
];

const birthdayMessages: Record<string, string[]> = {
  friend: [
    "Janamdin mubarak! Ab treat de 🍕",
    "Ek saal aur buddha ho gaya 🧓",
    "Aaj toh party banti hai... teri taraf se 😏",
  ],
  bestie: [
    "Happy Birthday mere yaar! 🥳 Ab tera card balance mera hai",
    "Tu meri jaan hai... aur jaan ka birthday hai 💕",
    "Tera birthday, meri party! 🎉",
  ],
  bhai: [
    "Bhai/Behen, janamdin ki hardik shubhkamnayein 🙏",
    "Aaj toh ghar ki chai free milegi 🍵",
    "Ek saal aur bada, ek saal aur mature... nahi hua 😂",
  ],
  crush: [
    "Happy Birthday! 😍 Ab toh reply kar de...",
    "Tera din special hai... like tu 💕",
    "Meri dua hai tujhe best mile... I mean, main mil jaun 😏",
  ],
};

interface BirthdayWishProps {
  onBack: () => void;
  linkId?: string;
}

export const BirthdayWish = ({ onBack, linkId }: BirthdayWishProps) => {
  const [step, setStep] = useState<'form' | 'gift' | 'reveal' | 'share'>(linkId ? 'gift' : 'form');
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [senderName, setSenderName] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [linkData, setLinkData] = useState<{ recipient_name: string; relation: string; sender_name?: string } | null>(null);

  // Fetch link data if linkId provided
  useEffect(() => {
    if (linkId) {
      fetchLinkData();
    }
  }, [linkId]);

  const fetchLinkData = async () => {
    const { data, error } = await supabase
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

  const handleSubmit = async () => {
    if (!name || !relation) {
      toast.error('Naam aur relation dono chahiye! 😤');
      return;
    }

    // Create link in database
    const { data, error } = await supabase
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

    setStep('gift');
  };

  const handleGiftClick = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setStep('reveal');
    }, 1500);
  };

  const handleShare = () => {
    setStep('share');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    toast.success('Link copy ho gaya! 📋');
    setTimeout(() => setCopied(false), 2000);
  };

  const getMessage = () => {
    const messages = birthdayMessages[relation] || birthdayMessages.friend;
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {!linkId && (
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back
        </Button>
      )}

      <div className="max-w-lg mx-auto">
        {/* Form Step */}
        {step === 'form' && (
          <div className="bg-card border-4 border-black rounded-2xl p-8 shadow-brutal animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-6 text-foreground">
              Kiska Birthday Hai? 🎂
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-foreground">Naam</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Birthday person ka naam..."
                  className="border-2 border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-foreground">Relation</label>
                <div className="grid grid-cols-2 gap-3">
                  {relations.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRelation(r.id)}
                      className={`p-3 rounded-xl border-2 border-black font-bold transition-all ${
                        relation === r.id
                          ? 'bg-primary text-primary-foreground shadow-brutal'
                          : 'bg-card hover:bg-muted'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-foreground">Tera Naam (optional)</label>
                <Input
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Apna naam daal..."
                  className="border-2 border-black"
                />
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-xl border-4 border-black shadow-brutal"
              >
                Create Birthday Wish 🎁
              </Button>
            </div>
          </div>
        )}

        {/* Gift Step */}
        {step === 'gift' && (
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              {linkData ? `Hey ${name}!` : `${name} ke liye`}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Special Gift Unlock Ho Gaya 🎁
            </p>

            <button
              onClick={handleGiftClick}
              className={`relative bg-gradient-to-r from-yellow-400 to-orange-500 p-12 rounded-3xl border-4 border-black shadow-brutal hover:scale-105 transition-transform ${
                showConfetti ? 'animate-shake' : 'animate-bounce'
              }`}
            >
              <Gift size={80} className="text-white" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-3 py-1 text-sm font-bold animate-pulse">
                Click me!
              </span>
            </button>

            {showConfetti && (
              <div className="fixed inset-0 pointer-events-none">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-4xl animate-float-up"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 1}s`,
                    }}
                  >
                    {['🎉', '🎊', '🎁', '🎂', '🥳', '✨'][Math.floor(Math.random() * 6)]}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reveal Step */}
        {step === 'reveal' && (
          <div className="text-center animate-fade-in">
            <div className="bg-card border-4 border-black rounded-2xl p-8 shadow-brutal">
              <h2 className="text-5xl mb-4">LOL 😂</h2>
              <p className="text-2xl font-bold text-foreground mb-4">
                Gift nahi hai...
              </p>
              <p className="text-3xl font-bold text-primary mb-6">
                Bas tu hi gift hai 🤡
              </p>

              <div className="bg-primary/20 rounded-xl p-6 mb-6">
                <p className="text-xl text-foreground italic">
                  {getMessage()}
                </p>
                {linkData?.sender_name && (
                  <p className="text-muted-foreground mt-2">
                    - {linkData.sender_name}
                  </p>
                )}
              </div>

              {!linkId && (
                <Button
                  onClick={handleShare}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 text-lg border-4 border-black shadow-brutal"
                >
                  <Share2 className="mr-2" size={20} />
                  Share with {name} 🔗
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Share Step */}
        {step === 'share' && (
          <div className="text-center animate-fade-in">
            <div className="bg-card border-4 border-black rounded-2xl p-8 shadow-brutal">
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                {name} ko prank karo! 😈
              </h2>
              <p className="text-muted-foreground mb-6">
                Yeh link bhej do, woh bhi fass jayega 🤭
              </p>

              <div className="bg-muted rounded-xl p-4 mb-6 flex items-center gap-2">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 bg-transparent text-sm"
                />
                <Button
                  onClick={copyLink}
                  variant="outline"
                  size="sm"
                  className="border-2 border-black"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => window.open(`https://wa.me/?text=Birthday%20Gift%20tere%20liye%20🎁%20${encodeURIComponent(shareLink)}`, '_blank')}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white border-2 border-black"
                >
                  WhatsApp 📱
                </Button>
                <Button
                  onClick={onBack}
                  variant="outline"
                  className="flex-1 border-2 border-black"
                >
                  Done ✅
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
