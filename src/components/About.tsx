import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id='about' className='min-h-screen py-24 flex flex-col justify-center'>
      <h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>{t('aboutTitle')}</h2>
      <p className='text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-2xl'>
        {t('aboutDescription')}
      </p>
    </section>
  );
}