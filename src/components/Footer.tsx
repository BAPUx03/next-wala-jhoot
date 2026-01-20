import { Instagram, Globe, Heart, Send, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 sm:py-12 px-4 mt-12 sm:mt-16 border-t-4 border-primary">
      <div className="max-w-4xl mx-auto text-center">
        {/* Credit Section */}
        <div className="mb-8">
          <p className="text-lg sm:text-xl mb-2">Ye mahaan website banayi hai 👑</p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-6">
            Pruthvirajsinh Makwana ne 😎
          </h3>
          
          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            <a
              href="https://www.instagram.com/pruthvirajsinh__makwana/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold hover:scale-105 transition-transform border-2 border-white text-sm sm:text-base"
            >
              <Instagram size={18} />
              <span className="hidden sm:inline">Instagram</span>
              <span className="sm:hidden">Insta</span>
            </a>
            <a
              href="https://t.me/pruthvirajsinh_makwana"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0088cc] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold hover:scale-105 transition-transform border-2 border-white text-sm sm:text-base"
            >
              <Send size={18} />
              <span className="hidden sm:inline">Telegram</span>
              <span className="sm:hidden">TG</span>
            </a>
            <a
              href="https://pruthvirajsinh.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary text-black px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold hover:scale-105 transition-transform border-2 border-white text-sm sm:text-base"
            >
              <Globe size={18} />
              Portfolio
            </a>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-6">
            <a 
              href="https://www.instagram.com/pruthvirajsinh__makwana/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              DM for collab <ExternalLink size={12} />
            </a>
            <span className="text-gray-600">•</span>
            <span>Report bug? 🐛 Chill kar, feature hai 😏</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-6 mb-6">
          <p className="text-base sm:text-lg text-gray-400 italic px-4">
            "Aisi website sirf legends hi bana sakte hain 🤡"
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart size={14} className="text-red-500 animate-pulse" fill="currentColor" />
            <span>and bakchodi</span>
          </div>
          <span className="hidden sm:inline text-gray-600">•</span>
          <span className="text-gray-600">© 2024 NextWala • Sab moh maya hai 🙏</span>
        </div>
      </div>
    </footer>
  );
};
