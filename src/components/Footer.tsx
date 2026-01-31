import { Instagram, Globe, Heart } from 'lucide-react';
import { ShareButtons } from './ShareButtons';

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8 sm:py-12 px-3 sm:px-4 mt-10 sm:mt-16 border-t-4 border-primary">
      <div className="max-w-4xl mx-auto text-center">
        {/* Share Section */}
        <div className="mb-6 sm:mb-8">
          <p className="text-base sm:text-lg mb-3 sm:mb-4 text-muted-foreground">
            Is bakchodi ko doston ke saath share kar! 📤
          </p>
          <ShareButtons 
            text="Ye website dekho yaar! 🤡 Bahut maza aaya - games, roasts, aur bakchodi sab hai!"
            title="Birthday Roast Website"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-muted my-6 sm:my-8" />

        {/* Credit Section */}
        <div className="mb-6 sm:mb-8">
          <p className="text-base sm:text-xl mb-1.5 sm:mb-2 text-secondary-foreground">Ye mahaan website banayi hai 👑</p>
          <h3 className="text-xl sm:text-3xl md:text-4xl font-black text-primary mb-4 sm:mb-6">
            Pruthvirajsinh Makwana ne 😎
          </h3>
          
          {/* Social Links */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <a
              href="https://www.instagram.com/pruthvirajsinh__makwana/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold hover:scale-105 transition-transform border-2 border-primary text-sm sm:text-base shadow-brutal"
            >
              <Instagram size={18} />
              Instagram
            </a>
            <a
              href="https://pruthvirajsinh.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold hover:scale-105 transition-transform border-2 border-primary-foreground text-sm sm:text-base shadow-brutal"
            >
              <Globe size={18} />
              Portfolio
            </a>
          </div>
        </div>

        {/* Quote */}
        <div className="border-t border-muted pt-4 sm:pt-6 mb-4 sm:mb-6">
          <p className="text-sm sm:text-lg text-muted-foreground italic px-2 sm:px-4">
            "Aisi website sirf legends hi bana sakte hain 🤡"
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span>Made with</span>
            <Heart size={12} className="text-destructive animate-pulse sm:w-[14px] sm:h-[14px]" fill="currentColor" />
            <span>and bakchodi</span>
          </div>
          <span className="hidden sm:inline text-muted">•</span>
          <span>© 2024 Birthday Roast • Sab moh maya hai 🙏</span>
        </div>
      </div>
    </footer>
  );
};
