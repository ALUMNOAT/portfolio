import { FaHome, FaUser, FaCode, FaProjectDiagram, FaEnvelope, FaHistory, FaBriefcase } from 'react-icons/fa';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useActiveSection } from '../hooks/useActiveSection';
import type { IconType } from 'react-icons';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

interface NavItem {
  key: string;
  id: string;
  icon: IconType;
}

const navItems: NavItem[] = [
  { key: 'navHome', id: 'home', icon: FaHome },
  { key: 'navAbout', id: 'about', icon: FaUser },
  { key: 'navParcours', id: 'parcours', icon: FaHistory },
  { key: 'navExperience', id: 'experience', icon: FaBriefcase },
  { key: 'navSkills', id: 'skills', icon: FaCode },
  { key: 'navProjects', id: 'projects', icon: FaProjectDiagram },
  { key: 'navContact', id: 'contact', icon: FaEnvelope },
];

const SECTION_IDS = navItems.map((item) => item.id);

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const activeId = useActiveSection(SECTION_IDS);
  const { t } = useLanguage();

  return (
    <div className='fixed z-50 bottom-4 sm:bottom-6 left-0 right-0 flex justify-center px-2 sm:px-4 pointer-events-none'>
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
            aria-label='Changer de thème'
            className='p-2.5 rounded-full bg-gray-900/80 dark:bg-white/80 text-white dark:text-black transition-colors backdrop-blur-md cursor-pointer shadow-lg border border-white/10 dark:border-gray-200'
          >
            {darkMode ? <Sun className='w-5 h-5' /> : <Moon className='w-5 h-5' />}
          </motion.button>
        </div>

        {/* Corps de la Navbar */}
        <div className='relative bg-gradient-to-r from-red-600 to-red-800 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 px-1.5 sm:px-3 py-1.5 sm:py-2'>
          <div className='flex items-center justify-around gap-0.5 sm:gap-1'>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeId === item.id;
              return (
                <motion.a
                  key={item.key}
                  href={`#${item.id}`}
                  aria-label={t(item.key)}
                  aria-current={isActive ? 'true' : undefined}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='flex flex-col items-center justify-center gap-0.5 py-2.5 sm:py-1.5 px-1 sm:px-2 relative group flex-1 min-w-0 text-white'
                >
                  {isActive && (
                    <motion.div
                      layoutId='activeTab'
                      className='absolute -top-1 sm:-top-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-white rounded-full'
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <Icon className='w-6 h-6 sm:w-5 sm:h-5 shrink-0' />
                  {/* Texte visible seulement à partir de 640px */}
                  <span className='hidden sm:block text-[10px] font-medium whitespace-nowrap'>
                    {t(item.key)}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </div>
  );
}