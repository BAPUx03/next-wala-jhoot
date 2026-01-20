import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

const memeOverlays = [
  "Expectation vs Reality 😭",
  "Main hi hoon problem 🤡",
  "Ye photo ne button ko bhi dara diya 😱",
  "Legend spotted 🔥",
  "Certified Troll Survivor 🏆",
];

const stickers = ['😂', '👀', '🔥', '🤯', '💀', '🫠', '👑'];

interface PhotoUploadProps {
  onPhotoProcessed: (originalPhoto: string, editedPhoto: string) => void;
}

export const PhotoUpload = ({ onPhotoProcessed }: PhotoUploadProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedOverlay, setSelectedOverlay] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setUploadedImage(result);
        processImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = (imageData: string) => {
    setIsProcessing(true);
    setSelectedOverlay(memeOverlays[Math.floor(Math.random() * memeOverlays.length)]);
    
    // Simulate processing
    setTimeout(() => {
      setProcessedImage(imageData);
      setIsProcessing(false);
      onPhotoProcessed(imageData, imageData);
    }, 2000);
  };

  return (
    <div className="space-y-6 p-6 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">
          Theek hai… ek last kaam kar 😌
        </h2>
        <p className="text-xl text-muted-foreground">Apni photo bhej 📸</p>
      </div>

      {!uploadedImage ? (
        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-6 text-xl font-bold rounded-2xl border-4 border-black shadow-brutal hover:scale-105 transition-transform"
          >
            Upload Photo 📷
          </Button>
        </div>
      ) : isProcessing ? (
        <div className="space-y-4">
          <div className="text-6xl animate-spin">🎨</div>
          <p className="text-xl font-bold text-foreground animate-pulse">
            Magic ho raha hai... ✨
          </p>
        </div>
      ) : processedImage ? (
        <div className="space-y-6">
          <div className="relative inline-block">
            {/* Cartoon frame */}
            <div className="relative p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl border-8 border-black shadow-brutal animate-wobble">
              <img
                src={processedImage}
                alt="Your photo"
                className="max-w-sm rounded-xl border-4 border-white"
              />
              
              {/* Overlay text */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-xl font-bold text-lg whitespace-nowrap">
                {selectedOverlay}
              </div>
              
              {/* Random stickers */}
              <div className="absolute -top-4 -right-4 text-4xl animate-bounce">
                {stickers[Math.floor(Math.random() * stickers.length)]}
              </div>
              <div className="absolute -bottom-4 -left-4 text-4xl animate-bounce delay-100">
                {stickers[Math.floor(Math.random() * stickers.length)]}
              </div>
            </div>
          </div>
          
          <p className="text-xl font-bold text-foreground">
            {selectedOverlay}
          </p>
        </div>
      ) : null}
    </div>
  );
};
