import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { FeatureGrid } from '@/components/FeatureGrid';
import { RunningButton } from '@/components/RunningButton';
import { BirthdayWish } from '@/components/BirthdayWish';
import { FunnyQuiz } from '@/components/FunnyQuiz';
import { FunnyQA } from '@/components/FunnyQA';
import { RandomBakchodi } from '@/components/RandomBakchodi';
import { RoastChatbot, ChatbotTrigger } from '@/components/RoastChatbot';
import { CommunityChat } from '@/components/CommunityChat';
import { FloatingEmojis } from '@/components/FloatingEmojis';
import { RateYourself } from '@/components/RateYourself';
import { FuturePredictor } from '@/components/FuturePredictor';
import { MirrorMode } from '@/components/MirrorMode';
import { LifeDashboard } from '@/components/LifeDashboard';
import { PersonalityTest } from '@/components/PersonalityTest';
import { ExpectationReality } from '@/components/ExpectationReality';
import { DontClickButton } from '@/components/DontClickButton';
import { TimeWasteCounter } from '@/components/TimeWasteCounter';
import { CertificateGenerator } from '@/components/CertificateGenerator';
import { TruthMeter } from '@/components/TruthMeter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Feature = 'home' | 'next-button' | 'birthday' | 'quiz' | 'qa' | 'random' | 'chatbot' | 'community' | 'rate' | 'future' | 'mirror' | 'dashboard' | 'personality' | 'expectation' | 'dontclick' | 'timewaste' | 'certificate' | 'truth';

const Index = () => {
  const [currentFeature, setCurrentFeature] = useState<Feature>('home');
  const [attemptCount, setAttemptCount] = useState(0);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const goBack = () => setCurrentFeature('home');

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingEmojis />

      {currentFeature === 'home' && (
        <div className="animate-fade-in">
          <HeroSection />
          <FeatureGrid onFeatureSelect={(feature) => {
            if (feature === 'chatbot') setChatbotOpen(true);
            else setCurrentFeature(feature as Feature);
          }} />
        </div>
      )}

      {currentFeature === 'next-button' && (
        <div className="min-h-screen p-4 animate-fade-in">
          <Button variant="ghost" onClick={goBack} className="mb-4 flex items-center gap-2">
            <ArrowLeft size={20} /> Back
          </Button>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Bas Next button click karo 🎯</h2>
            <div className="bg-card rounded-2xl p-8 border-4 border-black shadow-brutal">
              <RunningButton onEventualSuccess={() => {}} attemptCount={attemptCount} setAttemptCount={setAttemptCount} />
            </div>
          </div>
        </div>
      )}

      {currentFeature === 'birthday' && <BirthdayWish onBack={goBack} />}
      {currentFeature === 'quiz' && <FunnyQuiz onBack={goBack} />}
      {currentFeature === 'qa' && <FunnyQA onBack={goBack} />}
      {currentFeature === 'random' && <RandomBakchodi onBack={goBack} />}
      {currentFeature === 'community' && <CommunityChat onBack={goBack} />}
      {currentFeature === 'rate' && <RateYourself onBack={goBack} />}
      {currentFeature === 'future' && <FuturePredictor onBack={goBack} />}
      {currentFeature === 'mirror' && <MirrorMode onBack={goBack} />}
      {currentFeature === 'dashboard' && <LifeDashboard onBack={goBack} />}
      {currentFeature === 'personality' && <PersonalityTest onBack={goBack} />}
      {currentFeature === 'expectation' && <ExpectationReality onBack={goBack} />}
      {currentFeature === 'dontclick' && <DontClickButton onBack={goBack} />}
      {currentFeature === 'timewaste' && <TimeWasteCounter onBack={goBack} />}
      {currentFeature === 'certificate' && <CertificateGenerator onBack={goBack} />}
      {currentFeature === 'truth' && <TruthMeter onBack={goBack} />}

      {currentFeature === 'home' && !chatbotOpen && <ChatbotTrigger onClick={() => setChatbotOpen(true)} />}
      <RoastChatbot isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
    </div>
  );
};

export default Index;
