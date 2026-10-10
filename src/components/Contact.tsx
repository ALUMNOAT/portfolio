import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id='contact' className='min-h-screen py-24 flex flex-col justify-center items-center text-center'>
      <h2 className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'>{t('contactTitle')}</h2>
      <p className='text-gray-600 dark:text-gray-300 mb-8 max-w-md'>
        {t('contactDescription')}
      </p>
      <a
        href='mailto:emigov.gorski@gmail.com'
        className='px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-colors shadow-lg shadow-red-600/25'
      >
        {t('contactButton')}
      </a>
    </section>
  );
}