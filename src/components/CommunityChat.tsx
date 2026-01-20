import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, Bot } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  is_bot: boolean;
  created_at: string;
}

const botMessages = [
  "Dead chat detected ☠️ Chalo joke sunata hoon 😂",
  "Koi online hai? Ya sab so gaye? 😴",
  "Sabko hi bol deta hoon, special mat feel kar 😏",
  "Yahan itna sannata kyun hai? 🤫",
  "Mujhe lagta tha party hogi, yeh toh library hai 📚",
  "Hello? Testing 1 2 3... koi hai? 📢",
  "Main bot hoon, par akela feel ho raha hai 🤖💔",
];

const botReactions = [
  "Wah wah! 👏",
  "Yeh toh sahi tha 😂",
  "Hmm... interesting 🧐",
  "Okay... 🙃",
  "Kya baat kar raha hai 😅",
  "Arey waah! 🔥",
];

interface CommunityChatProps {
  onBack: () => void;
}

export const CommunityChat = ({ onBack }: CommunityChatProps) => {
  const [username, setUsername] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastBotMessageTime = useRef(Date.now());

  // Fetch initial messages
  useEffect(() => {
    if (hasJoined) {
      fetchMessages();
      subscribeToMessages();
      
      // Bot activity interval
      const botInterval = setInterval(() => {
        const timeSinceLastMessage = Date.now() - lastBotMessageTime.current;
        // If no messages for 30 seconds, bot says something
        if (timeSinceLastMessage > 30000) {
          sendBotMessage(botMessages[Math.floor(Math.random() * botMessages.length)]);
        }
      }, 30000);

      return () => clearInterval(botInterval);
    }
  }, [hasJoined]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('community_messages')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(100);

    if (data) {
      setMessages(data);
    }
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('community_chat')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'community_messages'
        },
        (payload) => {
          const newMsg = payload.new as ChatMessage;
          setMessages(prev => [...prev, newMsg]);
          lastBotMessageTime.current = Date.now();

          // Bot sometimes reacts to messages
          if (!newMsg.is_bot && Math.random() > 0.7) {
            setTimeout(() => {
              sendBotMessage(botReactions[Math.floor(Math.random() * botReactions.length)]);
            }, 2000);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendBotMessage = async (message: string) => {
    await supabase.from('community_messages').insert({
      username: '🤖 RoastBot',
      message,
      is_bot: true
    });
  };

  const handleJoin = () => {
    if (!username.trim()) {
      toast.error('Naam toh daal! 😤');
      return;
    }
    setHasJoined(true);
    
    // Bot welcome message
    setTimeout(() => {
      sendBotMessage(`Welcome ${username}! 🎉 Ab bakchodi shuru kar 😏`);
    }, 1000);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;

    setIsLoading(true);
    const { error } = await supabase.from('community_messages').insert({
      username,
      message: newMessage,
      is_bot: false
    });

    if (error) {
      toast.error('Message nahi gaya 😢');
    } else {
      setNewMessage('');
    }
    setIsLoading(false);
  };

  if (!hasJoined) {
    return (
      <div className="min-h-screen bg-background p-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back
        </Button>

        <div className="max-w-md mx-auto mt-20">
          <div className="bg-card border-4 border-black rounded-2xl p-8 shadow-brutal text-center">
            <h2 className="text-3xl font-bold mb-2 text-foreground">
              Community Chat 🌐
            </h2>
            <p className="text-muted-foreground mb-8">
              Sab milke bakchodi karo!
            </p>

            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Naam likh... fake bhi chalega 😌"
              className="mb-4 border-2 border-black text-center text-lg"
              onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
            />

            <Button
              onClick={handleJoin}
              className="w-full bg-primary text-primary-foreground font-bold py-4 text-lg border-4 border-black shadow-brutal"
            >
              Join Chat 🚀
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b-4 border-black p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h2 className="font-bold text-foreground">Community Chat 🌐</h2>
            <p className="text-sm text-muted-foreground">
              {messages.length} messages • 🤖 Bot always online
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.username === username ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] ${
                msg.username === username
                  ? 'bg-primary text-primary-foreground rounded-2xl rounded-br-none'
                  : msg.is_bot
                  ? 'bg-purple-100 border-2 border-purple-300 rounded-2xl rounded-bl-none'
                  : 'bg-muted text-foreground rounded-2xl rounded-bl-none'
              } p-3`}
            >
              {msg.username !== username && (
                <p className={`text-xs font-bold mb-1 ${msg.is_bot ? 'text-purple-600' : 'text-primary'}`}>
                  {msg.is_bot && <Bot size={12} className="inline mr-1" />}
                  {msg.username}
                </p>
              )}
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-card border-t-4 border-black p-4">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2"
        >
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type karo..."
            className="flex-1 border-2 border-black"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !newMessage.trim()}
            className="bg-primary text-primary-foreground border-2 border-black"
          >
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};
