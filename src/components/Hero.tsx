import type { IconType } from 'react-icons';
import { FaGithub, FaArrowRight, FaDownload, FaLinkedin, FaLastfm } from 'react-icons/fa';
import hero from '../assets/normalnie.jpg';
import { useLanguage } from '../context/LanguageContext';

interface SocialLink {
  icon: IconType;
  name: string;
  link: string;
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
              {t('heroTitle')} <span className='text-red-600'>Gorski Emilian</span>
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
            <div className='relative group'>
              <div className='absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-full filter blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500' />
              
              <div className='relative w-72 h-72 sm:w-80 sm:h-80 lg:w-72 lg:h-96'>
                <img 
                  src={hero} 
                  alt="Hero profile" 
                  className='w-full h-full object-cover rounded-full relative z-10 transform group-hover:scale-105 transition-transform duration-500 shadow-xl' 
                />
                <div className='absolute inset-0 border-2 border-red-500/30 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500 pointer-events-none' />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}