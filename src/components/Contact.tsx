import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const EMAIL = 'emigov.gorski@gmail.com';

export default function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard indisponible : l'adresse reste visible et sélectionnable
    }
  };

  return (
    <section id='contact' className='min-h-screen py-24 flex flex-col justify-center items-center text-center'>
      <h2 className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'>{t('contactTitle')}</h2>
      <p className='text-gray-600 dark:text-gray-300 mb-8 max-w-md'>
        {t('contactDescription')}
      </p>

      <a
        href={`mailto:${EMAIL}`}
        className='px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-colors shadow-lg shadow-red-600/25'
      >
        {t('contactButton')}
      </a>

      <div className='mt-6 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300'>
        <span className='select-all'>{EMAIL}</span>
        <button
          onClick={handleCopy}
          className='px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
        >
          {copied ? t('contactCopied') : t('contactCopy')}
        </button>
      </div>
    </section>
  );
}