import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: 'fr' | 'en' | 'nl' | 'pl'; label: string; name: string }[] = [
    { code: 'fr', label: 'FR', name: 'Français' },
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'nl', label: 'NL', name: 'Nederlands' },
    { code: 'pl', label: 'PL', name: 'Polski' },
  ];

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  return (
    <div className="fixed top-6 right-6 z-50" ref={dropdownRef}>
      <div className="relative">
        {/* Bouton principal */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3.5 py-2 bg-gray-900/80 dark:bg-white/80 text-white dark:text-gray-900 rounded-full border border-white/10 dark:border-gray-200 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer text-xs font-bold"
        >
          <Globe className="w-4 h-4 text-red-500" />
          <span>{currentLang.label}</span>
        </button>

        {/* Menu déroulant animé */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-36 bg-gray-900/90 dark:bg-white/95 border border-white/10 dark:border-gray-200 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden py-1"
            >
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    lang === l.code
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 dark:text-gray-700 hover:bg-white/10 dark:hover:bg-gray-100'
                  }`}
                >
                  <span>{l.name}</span>
                  <span className="text-[10px] opacity-75">{l.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}