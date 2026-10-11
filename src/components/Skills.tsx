import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Three.js et tout son écosystème sont dans un chunk séparé,
// téléchargé seulement quand la section approche de l'écran
const SkillsScene = lazy(() => import('./SkillsScene'));

// Renvoie true quand l'élément est (presque) à l'écran
function useInView<T extends Element>(rootMargin = '100px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);
  return [ref, inView] as const;
}

export default function Skills() {
  const { t } = useLanguage();
  // Marge large : le chunk 3D commence à charger avant que la section soit visible
  const [canvasRef, inView] = useInView<HTMLDivElement>('400px');
  const [everInView, setEverInView] = useState(false);

  useEffect(() => {
    if (inView) setEverInView(true);
  }, [inView]);

  return (
    <section id='skills' className='min-h-screen py-24 flex flex-col items-center relative bg-transparent'>
      <div className='text-center mb-12 mt-10 px-4'>
        <h2 className='text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight'>{t('skillsTitle')}</h2>
        <p className='text-xl text-gray-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto'>
          {t('skillsSubtitle')}
        </p>
      </div>

      <div
        ref={canvasRef}
        className='w-full h-[480px] sm:h-[600px] cursor-grab active:cursor-grabbing relative z-0'
      >
        {everInView && (
          <Suspense fallback={null}>
            <SkillsScene inView={inView} />
          </Suspense>
        )}
      </div>
    </section>
  );
}
