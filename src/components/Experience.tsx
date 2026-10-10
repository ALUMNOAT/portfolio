import { Briefcase } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Experience() {
  const { t, getExperiences } = useLanguage();
  const experiences = getExperiences();

  return (
    <section id='experience' className='min-h-screen py-24 flex flex-col justify-center max-w-4xl mx-auto px-4'>
      <h2 className='text-3xl font-bold mb-12 text-gray-900 dark:text-white text-center flex items-center justify-center gap-3'>
        <Briefcase className='w-8 h-8 text-red-600 dark:text-red-500' />
        {t('experienceTitle')}
      </h2>

      <div className='space-y-8'>
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className='p-6 md:p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-transform hover:-translate-y-1'
          >
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4'>
              <div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                  {exp.role}
                </h3>
                <h4 className='text-base font-semibold text-red-600 dark:text-red-400'>
                  {exp.company}
                </h4>
              </div>

              <div className='flex flex-col md:items-end text-xs font-semibold text-gray-500 dark:text-gray-400'>
                <span className='px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 w-fit mb-1'>
                  {exp.period}
                </span>
                {exp.location && <span>{exp.location}</span>}
              </div>
            </div>

            {exp.description && (
              <p className='text-gray-600 dark:text-gray-300 text-sm mb-4'>
                {exp.description}
              </p>
            )}

            {exp.bullets && exp.bullets.length > 0 && (
              <ul className='space-y-2 mb-6 text-gray-600 dark:text-gray-300 text-sm'>
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className='flex items-start gap-2.5'>
                    <span className='mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0' />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {exp.tech && exp.tech.length > 0 && (
              <div className='flex gap-2 flex-wrap pt-2 border-t border-gray-200/60 dark:border-gray-700/60'>
                {exp.tech.map((techItem, i) => (
                  <span
                    key={i}
                    className='text-xs px-3 py-1 rounded-full bg-gray-200/70 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium'
                  >
                    {techItem}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}