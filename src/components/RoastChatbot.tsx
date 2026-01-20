import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, MessageCircle, Skull, Laugh, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const quickButtons = [
  { label: 'Roast me 😈', message: 'Roast me' },
  { label: 'Joke sunao 😂', message: 'Ek joke sunao' },
  { label: 'Life advice 🤡', message: 'Life advice do' },
];

interface RoastChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoastChatbot = ({ isOpen, onClose }: RoastChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Bol bhai, kya problem hai? 😏' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('roast-chat', {
        body: { message: messageText }
      });

      if (error) throw error;

      const assistantMessage: Message = { 
        role: 'assistant', 
        content: data?.response || 'Kuch technical problem hai yaar 😅' 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      // Fallback responses if API fails
      const fallbackResponses = [
        "Kaam bol 😏",
        "Yeh toh mujhe bhi nahi pata 🤷",
        "Phone side mein rakh, kuch productive kar 📵",
        "Tu serious hai ya mazak? 🤡",
        "Hmm... interesting... but I don't care 💅",
      ];
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 md:w-96 h-[500px] bg-card border-4 border-black rounded-2xl shadow-brutal flex flex-col z-50 animate-fade-in">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle size={24} />
          <div>
            <h3 className="font-bold">Roast Bot 🤖</h3>
            <span className="text-xs opacity-80">Always Online 🟢</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-primary-foreground hover:bg-primary/80">
          <X size={20} />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-muted text-foreground rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground p-3 rounded-2xl rounded-bl-none">
              <span className="animate-pulse">Soch raha hoon... 🤔</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Buttons */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto">
        {quickButtons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => sendMessage(btn.message)}
            disabled={isLoading}
            className="flex-shrink-0 px-3 py-1 bg-muted rounded-full text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-black"
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t-2 border-black">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type karo..."
            className="flex-1 border-2 border-black"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={isLoading || !input.trim()}
            className="bg-primary text-primary-foreground border-2 border-black"
          >
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};

// Floating button to open chatbot
export const ChatbotTrigger = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="fixed bottom-4 right-4 w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full border-4 border-black shadow-brutal flex items-center justify-center text-white hover:scale-110 transition-transform z-40"
  >
    <MessageCircle size={28} />
  </button>
);
