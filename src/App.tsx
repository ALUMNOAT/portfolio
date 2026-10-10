import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Skills from './components/Skills';
import { LanguageProvider } from './context/LanguageContext';
import LanguageSelector from './components/LanguageSelector';
import Timeline from './components/Timeline';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <LanguageProvider>
      <div className='bg-white dark:bg-[#16171d] text-gray-800 dark:text-gray-200 min-h-screen selection:bg-red-500 selection:text-white relative pb-24'>
        <LanguageSelector /> {/* <- Affichage du menu déroulant en haut à droite */}
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className='max-w-6xl mx-auto px-4 sm:px-8'>
          <Hero />
          <About />
          <Timeline />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
    </LanguageProvider>
  );
}