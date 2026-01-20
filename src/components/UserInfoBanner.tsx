import { useState, useEffect } from 'react';
import { Eye, MapPin, Wifi } from 'lucide-react';

interface UserInfo {
  ip: string;
  city?: string;
  country?: string;
}

export const UserInfoBanner = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [showFull, setShowFull] = useState(false);
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    // Fetch IP info
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setUserInfo({
          ip: data.ip,
          city: data.city,
          country: data.country_name
        });
      })
      .catch(() => {
        setUserInfo({ ip: '***.***.***' });
      });

    // Fake visitor count that looks real
    const baseCount = 12847;
    const randomAdd = Math.floor(Math.random() * 500);
    setVisitors(baseCount + randomAdd);
  }, []);

  if (!userInfo) return null;

  const maskedIP = userInfo.ip.split('.').map((part, i) => i < 2 ? part : '***').join('.');

  return (
    <div className="bg-black/80 backdrop-blur-sm border-b-2 border-primary py-2 px-4">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
        {/* Visitor Count */}
        <div className="flex items-center gap-2 text-white">
          <Eye size={14} className="text-primary" />
          <span>
            <span className="text-primary font-bold">{visitors.toLocaleString()}</span> log time waste kar chuke hain 🤡
          </span>
        </div>

        {/* IP Info */}
        <button
          onClick={() => setShowFull(!showFull)}
          className="flex items-center gap-2 text-white hover:text-primary transition-colors"
        >
          <Wifi size={14} className="text-green-400" />
          <span>
            Hum jaante hain:{' '}
            <span className="font-mono text-primary">
              {showFull ? userInfo.ip : maskedIP}
            </span>
          </span>
          {userInfo.city && (
            <>
              <MapPin size={14} className="text-red-400 ml-2" />
              <span className="text-muted-foreground">
                {userInfo.city}, {userInfo.country}
              </span>
            </>
          )}
          <span className="text-[10px] text-muted-foreground ml-1">
            ({showFull ? 'hide' : 'click 👀'})
          </span>
        </button>
      </div>
    </div>
  );
};
