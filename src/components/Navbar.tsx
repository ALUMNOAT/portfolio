import React, { useState } from 'react';
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaEnvelope, FaHistory } from 'react-icons/fa';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

interface NavItem {
  key: string;
  link: string;
  icon: React.ElementType;
}

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const [activeTab, setActiveTab] = useState<string>('navHome');
  const { t } = useLanguage();

  const navItems: NavItem[] = [
    { key: 'navHome', link: '#home', icon: FaHome },
    { key: 'navAbout', link: '#about', icon: FaUser },
    { key: 'navParcours', link: '#parcours', icon: FaHistory },
    { key: 'navSkills', link: '#skills', icon: FaCode },
    { key: 'navProjects', link: '#projects', icon: FaProjectDiagram },
    { key: 'navContact', link: '#contact', icon: FaEnvelope },
  ];

  return (
    <div className='fixed z-50 bottom-6 left-0 right-0 flex justify-center px-4 pointer-events-none'>
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className='relative w-full max-w-xl pointer-events-auto'
      >
        {/* Bouton Dark Mode positionné au-dessus de la barre */}
        <div className='absolute -top-12 right-0 flex items-center'>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className='p-2.5 rounded-full bg-gray-900/80 dark:bg-white/80 text-white dark:text-black transition-colors backdrop-blur-md cursor-pointer shadow-lg border border-white/10 dark:border-gray-200'
          >
            {darkMode ? <Sun className='w-5 h-5' /> : <Moon className='w-5 h-5' />}
          </motion.button>
        </div>

        {/* Corps de la Navbar */}
        <div className='relative bg-gradient-to-r from-red-600 to-red-800 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 px-3 py-2'>
          <div className='flex items-center justify-around gap-1'>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <motion.a
                  key={item.key}
                  href={item.link}
                  onClick={() => setActiveTab(item.key)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='flex flex-col items-center gap-0.5 py-1.5 px-2 relative group flex-1 text-white'
                >
                  {isActive && (
                    <motion.div
                      layoutId='activeTab'
                      className='absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-white rounded-full'
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <Icon className='w-5 h-5' />
                  <span className='text-[10px] font-medium'>{t(item.key)}</span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </div>
  );
}