import { MousePointer2, Gift, Brain, HelpCircle, Shuffle, MessageCircle, Users, Star, Sparkles, Camera, BarChart3, Fingerprint, Drama, XCircle, Clock, Award, Search, Flame, Gamepad2, CircleDot, Cookie } from 'lucide-react';
import { useMemePopup } from './MemePopup';

interface FeatureCardProps {
  emoji: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  color: string;
  onHover: () => void;
}

const FeatureCard = ({ emoji, icon, title, description, onClick, color, onHover }: FeatureCardProps) => (
  <button
    onClick={onClick}
    onMouseEnter={onHover}
    className={`group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-black bg-card shadow-brutal hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 sm:hover:translate-x-1 sm:hover:translate-y-1 transition-all duration-200 text-left w-full ${color}`}
  >
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="text-2xl sm:text-4xl group-hover:animate-bounce shrink-0">{emoji}</div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base sm:text-xl font-bold text-foreground mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2 truncate">
          <span className="shrink-0">{icon}</span>
          <span className="truncate">{title}</span>
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">{description}</p>
      </div>
    </div>
  </button>
);

interface FeatureGridProps {
  onFeatureSelect: (feature: string) => void;
}

export const FeatureGrid = ({ onFeatureSelect }: FeatureGridProps) => {
  const { triggerMeme } = useMemePopup();
  
  // Randomly trigger meme on some hovers (20% chance)
  const handleHover = () => {
    if (Math.random() < 0.2) {
      triggerMeme();
    }
  };

  const features = [
    { emoji: "🎯", icon: <MousePointer2 size={18} />, title: "Try Next Button", description: "Pakad sake toh pakad 😏", color: "hover:bg-pink-50 dark:hover:bg-pink-950/30", feature: "next-button" },
    { emoji: "🎂", icon: <Gift size={18} />, title: "Birthday Prank", description: "Gift? Haan haan... 🎁🤡", color: "hover:bg-orange-50 dark:hover:bg-orange-950/30", feature: "birthday" },
    { emoji: "🎮", icon: <Gamepad2 size={18} />, title: "Tic-Tac-Toe", description: "Fair game... trust me 🤡", color: "hover:bg-emerald-50 dark:hover:bg-emerald-950/30", feature: "tictactoe" },
    { emoji: "🎡", icon: <CircleDot size={18} />, title: "Spin the Wheel", description: "Fate decide karega! 🎰", color: "hover:bg-gradient-to-r hover:from-pink-50 hover:to-yellow-50 dark:hover:from-pink-950/30 dark:hover:to-yellow-950/30", feature: "spinwheel" },
    { emoji: "🥠", icon: <Cookie size={18} />, title: "Fortune Cookie", description: "Desi kismat ki baat 🔮", color: "hover:bg-amber-50 dark:hover:bg-amber-950/30", feature: "fortunecookie" },
    { emoji: "🎭", icon: <Flame size={18} />, title: "Truth & Dare", description: "Sach ya himmat? 😈🔥", color: "hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 dark:hover:from-blue-950/30 dark:hover:to-orange-950/30", feature: "truthdare" },
    { emoji: "⭐", icon: <Star size={18} />, title: "Rate Yourself", description: "Website judge karegi 😈", color: "hover:bg-yellow-50 dark:hover:bg-yellow-950/30", feature: "rate" },
    { emoji: "🔮", icon: <Sparkles size={18} />, title: "Future Predictor", description: "100% useless predictions 🙃", color: "hover:bg-purple-50 dark:hover:bg-purple-950/30", feature: "future" },
    { emoji: "🪞", icon: <Camera size={18} />, title: "Mirror Mode", description: "Sach sunne ki himmat? 💀", color: "hover:bg-red-50 dark:hover:bg-red-950/30", feature: "mirror" },
    { emoji: "📊", icon: <BarChart3 size={18} />, title: "Life Dashboard", description: "Fake analytics, real roast 📈", color: "hover:bg-blue-50 dark:hover:bg-blue-950/30", feature: "dashboard" },
    { emoji: "🧪", icon: <Fingerprint size={18} />, title: "Personality Test", description: "Results always wrong 🎲", color: "hover:bg-green-50 dark:hover:bg-green-950/30", feature: "personality" },
    { emoji: "🎭", icon: <Drama size={18} />, title: "Expectation vs Reality", description: "Relatable sad moments 🥲", color: "hover:bg-cyan-50 dark:hover:bg-cyan-950/30", feature: "expectation" },
    { emoji: "⚠️", icon: <XCircle size={18} />, title: "Don't Click This", description: "Seriously, mat kar ❌", color: "hover:bg-red-50 dark:hover:bg-red-950/30", feature: "dontclick" },
    { emoji: "⏱️", icon: <Clock size={18} />, title: "Time Waste Counter", description: "Track your wasted life 💀", color: "hover:bg-gray-50 dark:hover:bg-gray-950/30", feature: "timewaste" },
    { emoji: "🏆", icon: <Award size={18} />, title: "Fake Certificate", description: "Get certified for nothing 📜", color: "hover:bg-amber-50 dark:hover:bg-amber-950/30", feature: "certificate" },
    { emoji: "🔍", icon: <Search size={18} />, title: "Truth Meter", description: "Spoiler: You're lying 🤥", color: "hover:bg-indigo-50 dark:hover:bg-indigo-950/30", feature: "truth" },
    { emoji: "🤡", icon: <Brain size={18} />, title: "Funny Quiz", description: "IQ test... ya mazaak 🧠", color: "hover:bg-purple-50 dark:hover:bg-purple-950/30", feature: "quiz" },
    { emoji: "❓", icon: <HelpCircle size={18} />, title: "Funny Q&A", description: "Deep questions, desi answers 💭", color: "hover:bg-blue-50 dark:hover:bg-blue-950/30", feature: "qa" },
    { emoji: "🎁", icon: <Shuffle size={18} />, title: "Random Bakchodi", description: "Click karo, surprise lo 🎲", color: "hover:bg-green-50 dark:hover:bg-green-950/30", feature: "random" },
    { emoji: "🤖", icon: <MessageCircle size={18} />, title: "Roast Chatbot", description: "Bot hai, par attitude hai 😈", color: "hover:bg-red-50 dark:hover:bg-red-950/30", feature: "chatbot" },
    { emoji: "🌐", icon: <Users size={18} />, title: "Community Chat", description: "Sab milke bakchodi karo 🗣️", color: "hover:bg-cyan-50 dark:hover:bg-cyan-950/30", feature: "community" }
  ];

  return (
    <section className="py-8 sm:py-12 px-3 sm:px-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 text-foreground px-2">
        Kya karna hai aaj? 🤔
      </h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
        {features.map((feature) => (
          <FeatureCard 
            key={feature.feature} 
            {...feature} 
            onClick={() => onFeatureSelect(feature.feature)}
            onHover={handleHover}
          />
        ))}
      </div>
    </section>
  );
};
