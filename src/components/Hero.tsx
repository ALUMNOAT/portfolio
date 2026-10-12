import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { IconType } from 'react-icons';
import { FaGithub, FaArrowRight, FaDownload, FaLinkedin, FaLastfm } from 'react-icons/fa';
import heroNormal from '../assets/normalnie.webp';
import heroAlter from '../assets/ostro.webp';
import { useLanguage } from '../context/LanguageContext';

interface SocialLink {
  icon: IconType;
  name: string;
  link: string;
}

// Reflet irisé façon photocard (foil) : plus fin, plus doux
const foilStyle: CSSProperties = {
  background:
    'linear-gradient(115deg, transparent 30%, rgba(255,0,150,.28) 42%, rgba(0,229,255,.28) 50%, rgba(255,235,0,.28) 58%, transparent 70%)',
  backgroundSize: '250% 250%',
  backgroundPosition: 'var(--mx) var(--my)',
  mixBlendMode: 'soft-light',
  opacity: 'var(--o)',
  transition: 'opacity 300ms',
};

// Point de lumière qui suit le curseur
const glareStyle: CSSProperties = {
  background: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,.25), transparent 50%)',
  mixBlendMode: 'overlay',
  opacity: 'var(--o)',
  transition: 'opacity 300ms',
};

const faceStyle: CSSProperties = {
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
};

function PhotoCard() {
  const { t } = useLanguage();
  const [flipped, setFlipped] = useState(false);
  const tiltRef = useRef<HTMLDivElement>(null);

  const setVars = (rx: number, ry: number, mx: number, my: number, o: number) => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty('--rx', `${rx}deg`);
    el.style.setProperty('--ry', `${ry}deg`);
    el.style.setProperty('--mx', `${mx}%`);
    el.style.setProperty('--my', `${my}%`);
    el.style.setProperty('--o', String(o));
  };

  // Souris : la carte s'incline vers le curseur
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setVars((0.5 - py) * 20, (px - 0.5) * 20, px * 100, py * 100, 1);
  };

  const onPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    setVars(0, 0, 50, 50, 0.6);
  };

  // Tactile : la carte oscille toute seule (sauf si "moins d'animations"),
  // et seulement quand elle est visible à l'écran
  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!coarse || reduce) return;

    let visible = false;
    let raf = 0;
    const start = performance.now();

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(el);

    const loop = (now: number) => {
      if (visible) {
        const s = (now - start) / 1000;
        setVars(Math.cos(s * 0.7) * 6, Math.sin(s * 0.9) * 10, 50 + Math.sin(s * 0.9) * 40, 50 + Math.cos(s * 0.7) * 40, 1);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='relative group' style={{ perspective: '1000px' }}>
        {/* Halo rouge derrière la carte */}
        <div className='absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-3xl filter blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500' />

        <div
          ref={tiltRef}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className='relative w-64 h-[22rem] sm:w-72 sm:h-96'
          style={
            {
              '--rx': '0deg',
              '--ry': '0deg',
              '--mx': '50%',
              '--my': '50%',
              '--o': 0.6,
              transform: 'rotateX(var(--rx)) rotateY(var(--ry))',
              transformStyle: 'preserve-3d',
              transition: 'transform 150ms ease-out',
            } as CSSProperties
          }
        >
          <button
            type='button'
            onClick={() => setFlipped((f) => !f)}
            aria-label={t('heroFlipCard')}
            className='relative block w-full h-full cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-red-500 focus-visible:outline-offset-4'
            style={{
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition: 'transform 700ms cubic-bezier(.4,.2,.2,1)',
            }}
          >
            {/* Face avant : photo sérieuse */}
            <div
              className='absolute inset-0 rounded-2xl overflow-hidden border-2 border-red-500/40 shadow-xl'
              style={faceStyle}
            >
              <img src={heroNormal} alt='Portrait de Gorski Emilian' className='w-full h-full object-cover' />
              <div className='absolute inset-0 pointer-events-none' style={foilStyle} />
              <div className='absolute inset-0 pointer-events-none' style={glareStyle} />
            </div>

            {/* Face arrière : Alter Ego */}
            <div
              className='absolute inset-0 rounded-2xl overflow-hidden border-2 border-red-500/40 shadow-xl'
              style={{ ...faceStyle, transform: 'rotateY(180deg)' }}
            >
              <img src={heroAlter} alt='Gorski Emilian, version Alter Ego' className='w-full h-full object-cover' />
              <div className='absolute inset-0 pointer-events-none' style={foilStyle} />
              <div className='absolute inset-0 pointer-events-none' style={glareStyle} />
            </div>
          </button>
        </div>
      </div>

      <span className='text-sm text-gray-500 dark:text-gray-400'>↻ {t('heroFlipCard')}</span>
    </div>
  );
}

export default function Hero() {
  const { t, getResumeUrl, lang } = useLanguage();

  const socialIcons: SocialLink[] = [
    { icon: FaLinkedin, name: 'LinkedIn', link: 'https://www.linkedin.com/in/emilian-gorski-412484158' },
    { icon: FaGithub, name: 'GitHub', link: 'https://github.com/ALUMNOAT' },
    { icon: FaLastfm, name: 'Last.fm', link: 'https://www.last.fm/user/ardentslutuwu' }
  ];

  return (
    <section id='home' className='min-h-screen flex items-center relative overflow-hidden py-16'>
      <div className='container mx-auto px-4 relative z-10'>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16'>

          <div className='lg:w-3/5 w-full text-center lg:text-left'>
            <span className='inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-red-600 bg-red-500/10 rounded-full border border-red-500/20'>
              {t('heroWelcome')}
            </span>

            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white'>
              {t('heroTitle')} <span className='text-red-600'>Emilian Gorski</span>
              <span className='block mt-2 text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-600 dark:text-gray-400'>
                {t('heroSubtitle')}
              </span>
            </h1>

            <p className='text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed'>
              {t('heroDescription')}
            </p>

            <div className='flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10'>
              <a
                href='#projects'
                className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-colors shadow-lg shadow-red-600/25'
              >
                {t('heroViewProjects')}
                <FaArrowRight className='w-4 h-4' />
              </a>
              <a
                href={getResumeUrl()}
                download={`Gorski_Emilian_CV_${lang.toUpperCase()}.pdf`}
                className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium transition-colors border border-gray-200 dark:border-gray-700'
              >
                <FaDownload className='w-4 h-4' />
                {t('heroResume')}
              </a>
            </div>

            <div className='flex items-center justify-center lg:justify-start gap-4'>
              {socialIcons.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={item.name}
                    className='p-3 rounded-xl bg-gray-100 hover:bg-red-500 hover:text-white dark:bg-gray-800 dark:hover:bg-red-600 text-gray-700 dark:text-gray-300 transition-all duration-300 shadow-sm'
                  >
                    <Icon className='w-5 h-5' />
                  </a>
                );
              })}
            </div>
          </div>

          <div className='lg:w-2/5 w-full flex justify-center'>
            <PhotoCard />
          </div>

        </div>
      </div>
    </section>
  );
}