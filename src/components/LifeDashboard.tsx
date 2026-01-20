import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, TrendingDown, TrendingUp, AlertTriangle, Zap } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface Metric {
  label: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  emoji: string;
  color: string;
}

const generateMetrics = (): Metric[] => [
  { label: "Motivation", value: Math.floor(Math.random() * 20) + 5, trend: 'down', emoji: '😴', color: 'bg-destructive' },
  { label: "Overthinking", value: Math.floor(Math.random() * 15) + 85, trend: 'up', emoji: '🧠', color: 'bg-primary' },
  { label: "Productivity", value: Math.floor(Math.random() * 10) + 3, trend: 'down', emoji: '📉', color: 'bg-destructive' },
  { label: "Procrastination", value: Math.floor(Math.random() * 10) + 90, trend: 'up', emoji: '🦥', color: 'bg-primary' },
  { label: "Sleep Quality", value: Math.floor(Math.random() * 20), trend: 'down', emoji: '😵', color: 'bg-destructive' },
  { label: "Screen Time", value: Math.floor(Math.random() * 5) + 95, trend: 'up', emoji: '📱', color: 'bg-primary' },
  { label: "Life Decisions", value: Math.floor(Math.random() * 10), trend: 'stable', emoji: '🤷', color: 'bg-muted' },
  { label: "Weekend Plans", value: 0, trend: 'stable', emoji: '🛋️', color: 'bg-muted' },
];

interface LifeDashboardProps {
  onBack: () => void;
}

export const LifeDashboard = ({ onBack }: LifeDashboardProps) => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { playSound } = useSoundEffects();

  useEffect(() => {
    playSound('suspense');
    setTimeout(() => {
      setMetrics(generateMetrics());
      setIsLoading(false);
      playSound('fail');
    }, 2000);
  }, []);

  const refresh = () => {
    setIsLoading(true);
    playSound('drumroll');
    setTimeout(() => {
      setMetrics(generateMetrics());
      setIsLoading(false);
      playSound('hehe');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Button variant="ghost" onClick={onBack} className="mb-4 flex items-center gap-2">
        <ArrowLeft size={20} /> Back
      </Button>

      <div className="max-w-2xl mx-auto">
        <div className="bg-card border-4 border-black rounded-3xl p-6 shadow-brutal animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">📊</span>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Life Dashboard</h2>
                <p className="text-sm text-muted-foreground">Real-time tracking (100% fake)</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-destructive/20 px-3 py-1 rounded-full border-2 border-black">
              <AlertTriangle size={16} className="text-destructive" />
              <span className="text-sm font-bold">CRITICAL</span>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="text-6xl animate-bounce mb-4">📈</div>
              <p className="text-xl font-bold text-foreground animate-pulse">
                Analyzing your life choices...
              </p>
              <p className="text-muted-foreground mt-2">
                (Spoiler: They're not great 😬)
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 mb-6">
                {metrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    className="bg-muted rounded-xl p-4 border-2 border-black animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{metric.emoji}</span>
                        <span className="font-bold text-foreground">{metric.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">
                          {metric.label === "Weekend Plans" ? "None" : `${metric.value}%`}
                        </span>
                        {metric.trend === 'up' && <TrendingUp className="text-destructive" size={20} />}
                        {metric.trend === 'down' && <TrendingDown className="text-destructive" size={20} />}
                      </div>
                    </div>
                    <Progress value={metric.value} className={`h-3 ${metric.color}`} />
                  </div>
                ))}
              </div>

              <div className="bg-primary/20 rounded-xl p-4 border-2 border-black mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="text-primary" size={20} />
                  <span className="font-bold text-foreground">Summary:</span>
                </div>
                <p className="text-foreground">
                  Bhai, chart dekh ke lagta hai tera Netflix subscription hi teri best investment hai 🍿
                </p>
              </div>

              <Button
                onClick={refresh}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-4 border-4 border-black shadow-brutal"
              >
                Refresh Analytics 🔄
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
