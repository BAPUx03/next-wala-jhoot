import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, RotateCcw, Sparkles } from "lucide-react";

type WheelMode = "yesno" | "custom";

const PRESET_OPTIONS = ["Yes ✅", "No ❌"];

const COLORS = [
  "#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", 
  "#F38181", "#AA96DA", "#FCBAD3", "#A8D8EA",
  "#FF9F43", "#6C5CE7", "#00D2D3", "#FF6B81"
];

const SpinWheel = () => {
  const [mode, setMode] = useState<WheelMode>("yesno");
  const [customOptions, setCustomOptions] = useState<string[]>(["Option 1", "Option 2", "Option 3"]);
  const [newOption, setNewOption] = useState("");
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const options = mode === "yesno" ? PRESET_OPTIONS : customOptions;

  const addOption = () => {
    if (newOption.trim() && customOptions.length < 12) {
      setCustomOptions([...customOptions, newOption.trim()]);
      setNewOption("");
    }
  };

  const removeOption = (index: number) => {
    if (customOptions.length > 2) {
      setCustomOptions(customOptions.filter((_, i) => i !== index));
    }
  };

  const spinWheel = () => {
    if (isSpinning || options.length < 2) return;

    setIsSpinning(true);
    setResult(null);

    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const extraDegrees = Math.random() * 360;
    const totalRotation = rotation + (spins * 360) + extraDegrees;
    
    setRotation(totalRotation);

    setTimeout(() => {
      const normalizedRotation = totalRotation % 360;
      const segmentAngle = 360 / options.length;
      // Calculate which segment is at the top (pointer position)
      const adjustedRotation = (360 - normalizedRotation + segmentAngle / 2) % 360;
      const winningIndex = Math.floor(adjustedRotation / segmentAngle);
      
      setResult(options[winningIndex]);
      setIsSpinning(false);
    }, 4000);
  };

  const resetWheel = () => {
    setRotation(0);
    setResult(null);
    setIsSpinning(false);
  };

  const getSegmentPath = (index: number, total: number) => {
    const angle = 360 / total;
    const startAngle = index * angle - 90;
    const endAngle = startAngle + angle;
    
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = 150 + 140 * Math.cos(startRad);
    const y1 = 150 + 140 * Math.sin(startRad);
    const x2 = 150 + 140 * Math.cos(endRad);
    const y2 = 150 + 140 * Math.sin(endRad);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    return `M 150 150 L ${x1} ${y1} A 140 140 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  const getTextPosition = (index: number, total: number) => {
    const angle = (360 / total) * index + (360 / total) / 2 - 90;
    const rad = (angle * Math.PI) / 180;
    const x = 150 + 85 * Math.cos(rad);
    const y = 150 + 85 * Math.sin(rad);
    return { x, y, angle: angle + 90 };
  };

  return (
    <div className="bg-card border-4 border-foreground rounded-2xl p-6 shadow-brutal">
      <h2 className="text-2xl font-bold text-center mb-4 flex items-center justify-center gap-2">
        🎡 Spin the Wheel
      </h2>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-4 justify-center">
        <Button
          variant={mode === "yesno" ? "default" : "outline"}
          onClick={() => { setMode("yesno"); resetWheel(); }}
          className="border-2 border-foreground"
          size="sm"
        >
          Yes/No 🎯
        </Button>
        <Button
          variant={mode === "custom" ? "default" : "outline"}
          onClick={() => { setMode("custom"); resetWheel(); }}
          className="border-2 border-foreground"
          size="sm"
        >
          Custom ✏️
        </Button>
      </div>

      {/* Custom Options Input */}
      {mode === "custom" && (
        <div className="mb-4 space-y-3">
          <div className="flex gap-2">
            <Input
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              placeholder="Add option..."
              className="border-2 border-foreground"
              onKeyPress={(e) => e.key === "Enter" && addOption()}
              maxLength={20}
            />
            <Button
              onClick={addOption}
              disabled={!newOption.trim() || customOptions.length >= 12}
              className="border-2 border-foreground shadow-brutal"
              size="icon"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {customOptions.map((opt, i) => (
              <span
                key={i}
                className="bg-secondary px-3 py-1 rounded-full text-sm flex items-center gap-1 border-2 border-foreground"
              >
                {opt}
                {customOptions.length > 2 && (
                  <button
                    onClick={() => removeOption(i)}
                    className="hover:text-destructive ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Wheel */}
      <div className="relative flex justify-center mb-4">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
          <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-foreground" />
        </div>
        
        {/* Wheel SVG */}
        <div
          ref={wheelRef}
          className="transition-transform duration-[4000ms] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <svg width="300" height="300" viewBox="0 0 300 300" className="drop-shadow-lg">
            {/* Wheel segments */}
            {options.map((option, i) => (
              <g key={i}>
                <path
                  d={getSegmentPath(i, options.length)}
                  fill={COLORS[i % COLORS.length]}
                  stroke="#1a1a1a"
                  strokeWidth="3"
                />
                <text
                  x={getTextPosition(i, options.length).x}
                  y={getTextPosition(i, options.length).y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#1a1a1a"
                  fontSize={options.length > 6 ? "10" : "12"}
                  fontWeight="bold"
                  transform={`rotate(${getTextPosition(i, options.length).angle}, ${getTextPosition(i, options.length).x}, ${getTextPosition(i, options.length).y})`}
                >
                  {option.length > 10 ? option.slice(0, 10) + "..." : option}
                </text>
              </g>
            ))}
            
            {/* Center circle */}
            <circle cx="150" cy="150" r="25" fill="#1a1a1a" stroke="#fff" strokeWidth="3" />
            <text x="150" y="150" textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="20">
              🎯
            </text>
          </svg>
        </div>
      </div>

      {/* Spin Button */}
      <div className="flex gap-2 justify-center mb-4">
        <Button
          onClick={spinWheel}
          disabled={isSpinning || options.length < 2}
          className="shadow-brutal border-2 border-foreground text-lg px-8"
          size="lg"
        >
          {isSpinning ? (
            <>
              <Sparkles className="w-5 h-5 mr-2 animate-spin" />
              Spinning...
            </>
          ) : (
            "🎰 SPIN!"
          )}
        </Button>
        <Button
          onClick={resetWheel}
          variant="outline"
          className="border-2 border-foreground"
          size="lg"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* Result */}
      {result && (
        <div className="text-center animate-in zoom-in-95 duration-300">
          <div className="bg-primary/20 border-4 border-foreground rounded-xl p-4 shadow-brutal">
            <p className="text-sm text-muted-foreground mb-1">Result hai boss:</p>
            <p className="text-2xl font-bold">{result}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {mode === "yesno" 
                ? (result.includes("Yes") ? "Haan bhai, kar de! 🚀" : "Nahi yaar, mat kar! 🙅")
                : "Wheel ne decide kar diya! 🎉"
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
