import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, X, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if on iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Check if already installed
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    if (isStandalone) return;

    // Check if dismissed before
    const dismissed = localStorage.getItem("pwa-prompt-dismissed");
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      // Show again after 7 days
      if (Date.now() - dismissedTime < 7 * 24 * 60 * 60 * 1000) return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show prompt after 3 seconds
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // Show iOS instructions after delay
    if (isIOSDevice) {
      setTimeout(() => setShowPrompt(true), 5000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      if (isIOS) {
        setShowIOSInstructions(true);
      }
      return;
    }

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIOSInstructions(false);
    localStorage.setItem("pwa-prompt-dismissed", Date.now().toString());
  };

  if (!showPrompt) return null;

  return (
    <>
      {/* Main Install Banner */}
      <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-4 duration-500">
        <div className="bg-card border-4 border-foreground rounded-2xl shadow-brutal p-4 max-w-md mx-auto">
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1 hover:bg-muted rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">📱 Install Pakad Na Paoge!</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Apne phone pe install karo aur kabhi bhi roast karo! 🔥
              </p>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleInstall}
                  className="flex-1 shadow-brutal border-2 border-foreground"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Install Now
                </Button>
                <Button
                  onClick={handleDismiss}
                  variant="outline"
                  className="border-2 border-foreground"
                  size="sm"
                >
                  Baad Mein
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* iOS Instructions Modal */}
      {showIOSInstructions && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border-4 border-foreground rounded-2xl shadow-brutal p-6 max-w-sm w-full animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowIOSInstructions(false)}
              className="absolute top-3 right-3 p-1 hover:bg-muted rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="font-bold text-xl mb-4 text-center">📲 iPhone pe Install Kaise Kare?</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">1</span>
                <p className="text-sm pt-1">Safari browser mein ye website kholo</p>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">2</span>
                <p className="text-sm pt-1">
                  Neeche Share button <span className="inline-block px-1">⬆️</span> dabao
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">3</span>
                <p className="text-sm pt-1">
                  <strong>"Add to Home Screen"</strong> select karo
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">4</span>
                <p className="text-sm pt-1">
                  <strong>"Add"</strong> dabao - Done! 🎉
                </p>
              </div>
            </div>
            
            <Button
              onClick={() => setShowIOSInstructions(false)}
              className="w-full mt-6 shadow-brutal border-2 border-foreground"
            >
              Samajh Gaya! 👍
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default PWAInstallPrompt;
