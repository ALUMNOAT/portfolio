import { useLanguage } from '../context/LanguageContext';

export default function Timeline() {
  const { t, getParcours } = useLanguage();
  const parcoursItems = getParcours();

  return (
    <section id='parcours' className='min-h-screen py-24 flex flex-col justify-center max-w-4xl mx-auto px-4'>
      <h2 className='text-3xl font-bold mb-12 text-gray-900 dark:text-white text-center'>
        {t('parcoursTitle')}
      </h2>

      {/* Conteneur de la Timeline */}
      <div className='relative border-l-2 border-gray-200 dark:border-gray-700 ml-4 md:ml-32 space-y-12'>
        {parcoursItems.map((item, idx) => (
          <div key={idx} className='relative pl-8 md:pl-12 group'>
            
            {/* Point / Marqueur sur la ligne */}
            <div className='absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-red-500 border-4 border-white dark:border-gray-900 shadow-sm' />

            {/* Date / Année positionnée à gauche sur desktop (comme sur ton schéma) */}
            <div className='md:absolute md:-left-32 md:top-1 text-sm font-bold text-red-600 dark:text-red-400 mb-2 md:mb-0'>
              {item.year}
            </div>

            {/* Carte de contenu */}
            <div className='p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-transform hover:-translate-y-1'>
              <h3 className='text-xl font-semibold mb-1 text-gray-900 dark:text-white'>
                {item.title}
              </h3>
              <h4 className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-3'>
                {item.subtitle}
              </h4>
              <p className='text-gray-600 dark:text-gray-300 mb-4'>
                {item.description}
              </p>
              
              {/* Compétences ou technologies associées (optionnel) */}
              {item.tech && (
                <div className='flex gap-2 flex-wrap'>
                  {item.tech.map((tItem, i) => (
                    <span key={i} className='text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 font-medium'>
                      {tItem}
                    </span>
                  ))}
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}