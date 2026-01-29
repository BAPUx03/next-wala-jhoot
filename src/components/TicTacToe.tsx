import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { ShareButtons } from './ShareButtons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface TicTacToeProps {
  onBack: () => void;
}

type CellValue = '❌' | '⭕' | null;
type GameState = 'playing' | 'ended';

const botWinMessages = [
  { title: "BOT WIN 🏆", message: "Tu haar gaya 😌\nTry next time." },
  { title: "Rules update ho gaye 🤡", message: "Bot jeet gaya.\nSorry not sorry." },
  { title: "Mere game mein 😎", message: "Main kisi ko bhi jita deta hoon." },
  { title: "System Error 404 🤖", message: "Player win not found." },
  { title: "Plot twist! 🎬", message: "Director ne script badal di." },
  { title: "Technical issue 🔧", message: "Player ki jeet delete ho gayi." },
];

const playerLoseMessages = [
  { title: "Expected tha 😏", message: "Bot is just built different." },
  { title: "Kya tha ye? 🤡", message: "Mujhe laga competition milega." },
  { title: "GG EZ 😎", message: "Practice kar ke aana." },
  { title: "Too easy 💀", message: "Aur koi hai kya?" },
];

const botTaunts = [
  "Soch ke move kar 😏",
  "Galat jagah ❌",
  "Predictable tha 🤡",
  "Ye wali galti expected thi 😌",
  "Mujhe surprise kar na 🥱",
  "Tera plan samajh gaya 🧠",
  "Basic move hai ye toh 😴",
  "Better luck next move 🍀",
];

const drawMessages = [
  { title: "Draw? Nahi nahi 🤡", message: "Bot still wins. Rules hai rules." },
  { title: "Tie game? LOL 😂", message: "Bot ka naam pehle aata hai." },
];

export const TicTacToe = ({ onBack }: TicTacToeProps) => {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: '', message: '' });
  const [currentTaunt, setCurrentTaunt] = useState<string | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showEmojiRain, setShowEmojiRain] = useState(false);
  const { playSound } = useSoundEffects();

  const playGameSound = useCallback((type: 'pop' | 'boing' | 'tada' | 'fail' | 'honk') => {
    if (!isMuted) {
      playSound(type);
    }
  }, [isMuted, playSound]);

  const checkWinner = (squares: CellValue[]): CellValue | 'draw' | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    if (squares.every(cell => cell !== null)) {
      return 'draw';
    }

    return null;
  };

  const isPlayerAboutToWin = (squares: CellValue[]): boolean => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      const cells = [squares[a], squares[b], squares[c]];
      const xCount = cells.filter(c => c === '❌').length;
      const nullCount = cells.filter(c => c === null).length;
      if (xCount === 2 && nullCount === 1) {
        return true;
      }
    }
    return false;
  };

  const getBotMove = (squares: CellValue[]): number => {
    const emptyIndices = squares.map((cell, i) => cell === null ? i : -1).filter(i => i !== -1);
    
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      const cells = [squares[a], squares[b], squares[c]];
      const oCount = cells.filter(c => c === '⭕').length;
      const nullCount = cells.filter(c => c === null).length;
      if (oCount === 2 && nullCount === 1) {
        const emptyIndex = [a, b, c].find(i => squares[i] === null);
        if (emptyIndex !== undefined) return emptyIndex;
      }
    }

    for (const [a, b, c] of lines) {
      const cells = [squares[a], squares[b], squares[c]];
      const xCount = cells.filter(c => c === '❌').length;
      const nullCount = cells.filter(c => c === null).length;
      if (xCount === 2 && nullCount === 1) {
        const emptyIndex = [a, b, c].find(i => squares[i] === null);
        if (emptyIndex !== undefined) return emptyIndex;
      }
    }

    if (squares[4] === null) return 4;

    const corners = [0, 2, 6, 8].filter(i => squares[i] === null);
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };

  const handleCellClick = (index: number) => {
    if (board[index] || !isPlayerTurn || gameState === 'ended') return;

    const newBoard = [...board];
    newBoard[index] = '❌';
    setBoard(newBoard);
    setIsPlayerTurn(false);
    setMoveCount(prev => prev + 1);
    playGameSound('pop');

    if (isPlayerAboutToWin(newBoard)) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }

    const winner = checkWinner(newBoard);
    if (winner) {
      handleGameEnd(winner, newBoard);
      return;
    }

    setTimeout(() => {
      makeBotMove(newBoard);
    }, 800);
  };

  const makeBotMove = (currentBoard: CellValue[]) => {
    const botIndex = getBotMove(currentBoard);
    if (botIndex === -1) return;

    const newBoard = [...currentBoard];
    newBoard[botIndex] = '⭕';
    setBoard(newBoard);
    playGameSound('boing');

    if (moveCount > 0 && moveCount % 2 === 0 && Math.random() > 0.5) {
      const randomTaunt = botTaunts[Math.floor(Math.random() * botTaunts.length)];
      setCurrentTaunt(randomTaunt);
      setTimeout(() => setCurrentTaunt(null), 2000);
    }

    const winner = checkWinner(newBoard);
    if (winner) {
      handleGameEnd(winner, newBoard);
    } else {
      setIsPlayerTurn(true);
    }
  };

  const handleGameEnd = (winner: CellValue | 'draw', finalBoard: CellValue[]) => {
    setGameState('ended');
    setGamesPlayed(prev => prev + 1);
    playGameSound('honk');

    setTimeout(() => {
      if (winner === '❌') {
        const msg = botWinMessages[Math.floor(Math.random() * botWinMessages.length)];
        setPopupContent(msg);
      } else if (winner === '⭕') {
        const msg = playerLoseMessages[Math.floor(Math.random() * playerLoseMessages.length)];
        setPopupContent(msg);
        setShowEmojiRain(true);
        setTimeout(() => setShowEmojiRain(false), 3000);
      } else {
        const msg = drawMessages[Math.floor(Math.random() * drawMessages.length)];
        setPopupContent(msg);
      }
      
      playGameSound('tada');
      setShowPopup(true);
    }, 500);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameState('playing');
    setShowPopup(false);
    setCurrentTaunt(null);
    setMoveCount(0);
    setShowEmojiRain(false);
  };

  useEffect(() => {
    if (gamesPlayed >= 3 && !showHint) {
      setShowHint(true);
    }
  }, [gamesPlayed, showHint]);

  return (
    <div className="min-h-screen p-3 sm:p-4 animate-fade-in relative overflow-hidden">
      {/* Emoji Rain */}
      {showEmojiRain && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-xl sm:text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-50px`,
                animation: `fall ${2 + Math.random() * 2}s linear forwards`,
                animationDelay: `${Math.random() * 1}s`,
              }}
            >
              {['😂', '🤡', '🔥', '💀', '😭'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <Button variant="ghost" onClick={onBack} className="mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
        <ArrowLeft size={18} /> Back
      </Button>

      <div className="max-w-md mx-auto">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">
            Tic-Tac-Toe 🎮
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Player vs Bot (Fair game, trust me 😏)
          </p>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="mt-1 sm:mt-2"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </Button>
        </div>

        {/* Hint after 3 games */}
        {showHint && (
          <div className="bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-400 rounded-lg sm:rounded-xl p-2 sm:p-3 mb-3 sm:mb-4 text-center animate-fade-in">
            <p className="text-xs sm:text-sm font-medium">
              💡 Hint: Is game mein jeetna allowed nahi hai 😌
            </p>
          </div>
        )}

        {/* Bot Taunt */}
        {currentTaunt && (
          <div className="bg-card border-2 border-black rounded-lg sm:rounded-xl p-2 sm:p-3 mb-3 sm:mb-4 text-center animate-scale-in shadow-brutal">
            <p className="text-sm sm:text-lg font-bold">🤖 {currentTaunt}</p>
          </div>
        )}

        {/* Game Board */}
        <div 
          className={`bg-card rounded-xl sm:rounded-2xl p-3 sm:p-6 border-2 sm:border-4 border-black shadow-brutal ${isShaking ? 'animate-shake' : ''}`}
        >
          <div className="grid grid-cols-3 gap-1.5 sm:gap-3 max-w-[280px] sm:max-w-[300px] mx-auto">
            {board.map((cell, index) => (
              <button
                key={index}
                onClick={() => handleCellClick(index)}
                disabled={!isPlayerTurn || gameState === 'ended' || cell !== null}
                className={`
                  aspect-square rounded-lg sm:rounded-xl border-2 sm:border-3 border-black text-3xl sm:text-5xl font-bold
                  transition-all duration-200 flex items-center justify-center
                  ${cell === null && isPlayerTurn && gameState === 'playing'
                    ? 'bg-background hover:bg-primary/10 active:scale-95 cursor-pointer'
                    : 'bg-muted cursor-not-allowed'
                  }
                  ${cell === '❌' ? 'text-blue-500' : ''}
                  ${cell === '⭕' ? 'text-red-500' : ''}
                `}
              >
                {cell}
              </button>
            ))}
          </div>

          {/* Turn Indicator */}
          <div className="text-center mt-3 sm:mt-4">
            {gameState === 'playing' && (
              <p className="text-sm sm:text-lg font-medium">
                {isPlayerTurn ? 'Tera turn ❌' : 'Bot soch raha hai... 🤖'}
              </p>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 sm:gap-6 mt-3 sm:mt-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-lg sm:text-xl">❌</span>
            <span className="text-muted-foreground">Tu</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-lg sm:text-xl">⭕</span>
            <span className="text-muted-foreground">Bot (Legend)</span>
          </div>
        </div>

        {/* Share Section */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
            Is game ko doston ke saath share kar 😈
          </p>
          <ShareButtons 
            text="Tic-Tac-Toe khela jismein bot kabhi nahi haarta! 🤡 Try kar aur dekh!"
            title="Rigged Tic-Tac-Toe"
            compact
          />
        </div>
      </div>

      {/* Win/Lose Popup */}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="border-2 sm:border-4 border-black shadow-brutal max-w-[90%] sm:max-w-sm animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl text-center">
              {popupContent.title}
            </DialogTitle>
            <DialogDescription className="text-center text-base sm:text-lg whitespace-pre-line pt-2">
              {popupContent.message}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-2 sm:gap-3 mt-3 sm:mt-4">
            <Button 
              onClick={resetGame}
              className="w-full border-2 border-black shadow-brutal hover:shadow-none transition-all text-sm sm:text-base py-2 sm:py-3"
            >
              Try Again 🔄
            </Button>
            <Button 
              variant="outline"
              onClick={onBack}
              className="w-full border-2 border-black text-sm sm:text-base py-2 sm:py-3"
            >
              Main nahi khel raha 😤
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* CSS for animations */}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px) rotate(-1deg); }
          75% { transform: translateX(5px) rotate(1deg); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};
