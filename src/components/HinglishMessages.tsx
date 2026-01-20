import { useState, useEffect } from 'react';

const randomMessages = [
  "Abe ruk na bhai 😂",
  "Itni jaldi kya hai? 🚆",
  "Button bhi panic mein hai 😵",
  "Effort full marks 🏆, result zero",
  "Aaram se bhai 😡",
  "Zinda hai kya 😴",
  "Respect 🫡",
  "Kya kar raha hai bhai 🤔",
  "Pagal hai kya? 🤪",
];

interface HinglishMessagesProps {
  attemptCount: number;
  idleTime: number;
}

export const HinglishMessages = ({ attemptCount, idleTime }: HinglishMessagesProps) => {
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    // Change message based on behavior
    if (idleTime > 5) {
      setCurrentMessage("Zinda hai kya 😴");
    } else if (attemptCount > 20) {
      setCurrentMessage("Respect 🫡 Bahut try kiya!");
    } else if (attemptCount > 10) {
      setCurrentMessage("Aaram se bhai 😡");
    } else if (attemptCount > 5) {
      setCurrentMessage("Itni jaldi kya hai? 🚆");
    } else {
      setCurrentMessage(randomMessages[Math.floor(Math.random() * randomMessages.length)]);
    }
  }, [attemptCount, idleTime]);

  if (!currentMessage) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-30">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-2xl font-bold text-lg border-4 border-black shadow-brutal animate-bounce">
        {currentMessage}
      </div>
    </div>
  );
};
