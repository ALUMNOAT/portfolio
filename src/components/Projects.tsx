import { useLanguage } from '../context/LanguageContext';

export default function Projects() {
  const { lang, t, getProjects } = useLanguage();
  const projects = getProjects();

  // Dictionnaire des libellés de statuts selon la langue
  const statusLabels = {
    completed: { fr: 'Terminé', en: 'Completed', nl: 'Voltooid', pl: 'Ukończone' },
    'in-progress': { fr: 'En cours', en: 'In Progress', nl: 'Bezig', pl: 'W toku' },
    upcoming: { fr: 'À faire', en: 'Upcoming', nl: 'Binnenkort', pl: 'Do zrobienia' }
  };

  // Dictionnaire pour les textes des boutons de liens selon le type de lien et la langue
  const linkTextLabels = {
    code: {
      fr: 'Voir le code →',
      en: 'View code →',
      nl: 'Bekijk code →',
      pl: 'Zobacz kod →'
    },
    doc: {
      fr: 'Voir le rapport →',
      en: 'View report →',
      nl: 'Bekijk rapport →',
      pl: 'Zobacz raport →'
    }
  };

  // Fonction pour les couleurs Tailwind (Vert, Jaune, Rouge)
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'in-progress':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'upcoming':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20';
    }
  };

  return (
    <section id='projects' className='min-h-screen py-24 flex flex-col justify-center'>
      <h2 className='text-3xl font-bold mb-8 text-gray-900 dark:text-white'>
        {t('projectsTitle')}
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {projects.map((p, idx) => {
          // On vérifie si le projet possède un lien
          const CardTag = p.link ? 'a' : 'div';
          
          // Détermine si c'est un lien vers du code (GitHub) ou un document (PDF)
          const isGitHub = typeof p.link === 'string' && p.link.includes('github.com');
          const linkTypeKey = isGitHub ? 'code' : 'doc';
          
          return (
            <CardTag
              key={idx}
              {...(p.link ? { href: p.link, target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col justify-between transition-all duration-200 ${
                p.link ? 'hover:border-red-500/50 dark:hover:border-red-500/50 hover:shadow-lg cursor-pointer group' : ''
              }`}
            >
              <div>
                {/* En-tête de la carte : Titre et Badge de statut */}
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2'>
                  <h3 className={`text-xl font-semibold text-gray-900 dark:text-white ${p.link ? 'group-hover:text-red-500 transition-colors' : ''}`}>
                    {p.title}
                  </h3>
                  {p.status && (
                    <span className={`self-start sm:self-auto text-xs px-3 py-1 rounded-full border font-medium ${getStatusBadgeStyle(p.status)}`}>
                      {statusLabels[p.status]?.[lang] || p.status}
                    </span>
                  )}
                </div>

                <p className='text-gray-600 dark:text-gray-300 mb-4'>{p.description}</p>
              </div>

              <div className='flex gap-2 flex-wrap items-center justify-between'>
                <div className='flex gap-2 flex-wrap'>
                  {p.tech.map((tItem, i) => (
                    <span key={i} className='text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 font-medium'>
                      {tItem}
                    </span>
                  ))}
                </div>
                
                {/* Indicateur visuel permanent et multilingue si un lien est présent */}
                {p.link && (
                  <span className='text-xs text-red-600 dark:text-red-400 font-semibold flex items-center gap-1 group-hover:underline'>
                    {linkTextLabels[linkTypeKey][lang] || linkTextLabels[linkTypeKey]['en']}
                  </span>
                )}
              </div>
            </CardTag>
          );
        })}
      </div>
    </section>
  );
}