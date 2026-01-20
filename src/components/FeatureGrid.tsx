import { MousePointer2, Gift, Brain, HelpCircle, Shuffle, MessageCircle, Users } from 'lucide-react';

interface FeatureCardProps {
  emoji: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  color: string;
}

const FeatureCard = ({ emoji, icon, title, description, onClick, color }: FeatureCardProps) => (
  <button
    onClick={onClick}
    className={`group relative p-6 rounded-2xl border-4 border-black bg-card shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 text-left w-full ${color}`}
  >
    <div className="flex items-start gap-4">
      <div className="text-4xl group-hover:animate-bounce">{emoji}</div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  </button>
);

interface FeatureGridProps {
  onFeatureSelect: (feature: string) => void;
}

export const FeatureGrid = ({ onFeatureSelect }: FeatureGridProps) => {
  const features = [
    {
      emoji: "🎯",
      icon: <MousePointer2 size={20} />,
      title: "Try Next Button",
      description: "Pakad sake toh pakad 😏",
      color: "hover:bg-pink-50",
      feature: "next-button"
    },
    {
      emoji: "🎂",
      icon: <Gift size={20} />,
      title: "Funny Birthday Wish",
      description: "Gift? Haan haan... 🎁🤡",
      color: "hover:bg-orange-50",
      feature: "birthday"
    },
    {
      emoji: "🤡",
      icon: <Brain size={20} />,
      title: "Funny Quiz",
      description: "IQ test... ya EQ ka mazaak 🧠",
      color: "hover:bg-purple-50",
      feature: "quiz"
    },
    {
      emoji: "❓",
      icon: <HelpCircle size={20} />,
      title: "Funny Q&A",
      description: "Deep questions, desi answers 💭",
      color: "hover:bg-blue-50",
      feature: "qa"
    },
    {
      emoji: "🎁",
      icon: <Shuffle size={20} />,
      title: "Random Bakchodi",
      description: "Click karo, surprise lo 🎲",
      color: "hover:bg-green-50",
      feature: "random"
    },
    {
      emoji: "🤖",
      icon: <MessageCircle size={20} />,
      title: "Roast Chatbot",
      description: "Bot hai, par attitude hai 😈",
      color: "hover:bg-red-50",
      feature: "chatbot"
    },
    {
      emoji: "🌐",
      icon: <Users size={20} />,
      title: "Community Chat",
      description: "Sab milke bakchodi karo 🗣️",
      color: "hover:bg-cyan-50",
      feature: "community"
    }
  ];

  return (
    <section className="py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
        Kya karna hai aaj? 🤔
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature) => (
          <FeatureCard
            key={feature.feature}
            {...feature}
            onClick={() => onFeatureSelect(feature.feature)}
          />
        ))}
      </div>
    </section>
  );
};
