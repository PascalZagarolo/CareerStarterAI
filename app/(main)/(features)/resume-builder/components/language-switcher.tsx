'use client';

import { useLanguage } from './i18n/language-context';
import { Button } from '@/components/ui/button';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all duration-200 hover:scale-105"
    >
      <div className="flex items-center gap-2">
        {/* Flag for current language */}
        <div className="w-5 h-4 rounded-sm overflow-hidden border border-gray-300 shadow-sm">
          {language === 'en' ? (
            <div className="w-full h-full bg-gradient-to-b from-blue-600 to-blue-800 relative">
              {/* US Flag stripes */}
              <div className="absolute top-0 left-0 w-full h-1 bg-white"></div>
              <div className="absolute top-2 left-0 w-full h-1 bg-white"></div>
              <div className="absolute top-4 left-0 w-full h-1 bg-white"></div>
              <div className="absolute top-6 left-0 w-full h-1 bg-white"></div>
              <div className="absolute top-8 left-0 w-full h-1 bg-white"></div>
              <div className="absolute top-10 left-0 w-full h-1 bg-white"></div>
              <div className="absolute top-12 left-0 w-full h-1 bg-white"></div>
              {/* US Flag canton */}
              <div className="absolute top-0 left-0 w-8 h-7 bg-blue-900"></div>
              {/* Stars (simplified) */}
              <div className="absolute top-1 left-1 w-6 h-5 flex flex-wrap justify-center items-center">
                <div className="text-white text-xs font-bold">★</div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-yellow-400 to-red-500 relative">
              {/* German Flag stripes */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-black"></div>
              <div className="absolute top-1.5 left-0 w-full h-1.5 bg-red-600"></div>
              <div className="absolute top-3 left-0 w-full h-1.5 bg-yellow-400"></div>
            </div>
          )}
        </div>
        
        {/* Language code */}
        <span className="font-medium text-sm">
          {language === 'en' ? 'EN' : 'DE'}
        </span>
        
        {/* Toggle indicator */}
        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
      </div>
    </Button>
  );
} 