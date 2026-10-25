import React, { createContext, useEffect, useContext, useState } from 'react';
import resumeFr from '../assets/CV_fr.pdf';
import resumeEn from '../assets/CV_en.pdf';
import resumeNl from '../assets/CV_nl.pdf';
import resumePl from '../assets/CV_pl.pdf';
import rapportSNET from '../assets/Rapport_SNET.pdf';

type Language = 'fr' | 'en' | 'nl' | 'pl';

interface ProjectTranslation {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  tech: string[];
  link?: string;
}

interface ParcoursTranslation {
  year: string;
  title: string;
  subtitle: string;
  description?: string;
  tech?: string[];
}

interface ExperienceTranslation {
  role: string;
  company: string;
  period: string;
  location?: string;
  description?: string;
  bullets: string[];
  tech?: string[];
}

interface Translations {
  [key: string]: {
    [lang in Language]: string | ProjectTranslation[] | ParcoursTranslation[] | ExperienceTranslation[];
  };
}

const translations: Translations = {
  // Navbar
  navHome: { fr: 'Accueil', en: 'Home', nl: 'Home', pl: 'Start' },
  navAbout: { fr: 'À propos', en: 'About', nl: 'Over mij', pl: 'O mnie' },
  navSkills: { fr: 'Compétences', en: 'Skills', nl: 'Vaardigheden', pl: 'Umiejętności' },
  navProjects: { fr: 'Projets', en: 'Projects', nl: 'Projecten', pl: 'Projekty' },
  navParcours: { fr: 'Parcours', en: 'Education', nl: 'Opleiding', pl: 'Edukacja' },
  navExperience: { fr: 'Expérience', en: 'Experience', nl: 'Ervaring', pl: 'Doświadczenie' },
  navContact: { fr: 'Contact', en: 'Contact', nl: 'Contact', pl: 'Kontakt' },

  // Hero
  heroWelcome: { fr: 'Bienvenue sur mon portfolio', en: 'Welcome to my portfolio', nl: 'Welkom op mijn portfolio', pl: 'Witaj w moim portfolio' },
  heroTitle: { fr: 'Bonjour, je suis', en: 'Hello, my name is', nl: 'Hallo, mijn naam is', pl: 'Dzień dobry, nazywam się' },
  heroSubtitle: {
    fr: 'Étudiant en Informatique (Développement d\'applications) | Stagiaire Full Stack Developer',
    en: 'IT Student (Application Development) | Full Stack Developer Intern',
    nl: 'IT-student (Applicatieontwikkeling) | Stagiair Full Stack Developer',
    pl: 'Student Informatyki (Tworzenie Aplikacji) | Stażysta Full Stack Developer'
  },
  heroDescription: {
    fr: 'Je construis des applications du backend au frontend (Java, PHP, JavaScript, PostgreSQL). Je suis disponible pour un stage de 3 mois (convention de stage) ou un job à temps partiel, en parallèle de mes deux derniers projets et de mon Travail de Fin d\'Études (TFE).',
    en: 'I build applications from backend to frontend (Java, PHP, JavaScript, PostgreSQL). I am available for a 3-month internship (internship agreement) or a part-time job, alongside my last two projects and my thesis.',
    nl: 'Ik bouw applicaties van backend tot frontend (Java, PHP, JavaScript, PostgreSQL). Ik ben beschikbaar voor een stage van 3 maanden (stageovereenkomst) of een deeltijdse job, naast mijn laatste twee projecten en mijn eindwerk.',
    pl: 'Tworzę aplikacje od backendu po frontend (Java, PHP, JavaScript, PostgreSQL). Jestem dostępny na 3-miesięczny staż (umowa o staż) lub pracę w niepełnym wymiarze godzin, równolegle z moimi dwoma ostatnimi projektami i pracą dyplomową.'
  },
  heroViewProjects: { fr: 'Voir les projets', en: 'View Projects', nl: 'Bekijk projecten', pl: 'Zobacz projekty' },
  heroResume: { fr: 'CV', en: 'Resume', nl: 'CV', pl: 'CV' },

  // About
  aboutTitle: { fr: 'Sur moi', en: 'About Me', nl: 'Over mij', pl: 'O mnie' },
  aboutDescription: {
    fr: 'Je me suis intéressé à l’informatique grâce à ma Nintendo DS et sa flashcard CycloDS Evolution : pour y insérer des codes de triche, j’ai dû comprendre un peu d’hexadécimal. Cette curiosité m’a ensuite mené à bidouiller une Wii avec le Homebrew Channel. Je suis un développeur passionné. En dehors du code, je joue aux jeux vidéo, je regarde des vidéos sur l’économie et je me tiens au courant des tendances technologiques. J’aime comprendre comment les choses fonctionnent sous le capot, et je n’hésite pas à tout remettre en question pour y arriver.',
    en: 'I got into computing through my Nintendo DS and its CycloDS Evolution flashcart: to enter cheat codes, I had to learn a bit of hexadecimal. That curiosity later led me to tinker with a Wii and the Homebrew Channel. I am a passionate developer. Outside of coding, I play video games, watch economics videos and keep up with tech trends. I like to understand how things work under the hood, so I question everything to get there.',
    nl: 'Ik raakte geïnteresseerd in computers door mijn Nintendo DS met een CycloDS Evolution: om cheatcodes in te voeren moest ik een beetje hexadecimaal begrijpen. Die nieuwsgierigheid bracht me later bij het aanpassen van een Wii met het Homebrew Channel. Ik ben een gepassioneerde developer. Naast coderen speel ik videogames, kijk ik naar economievideo’s en volg ik de nieuwste technologietrends. Ik wil begrijpen hoe dingen onder de motorkap werken en stel daarom graag alles in vraag.',
    pl: 'Informatyką zainteresowałem się dzięki Nintendo DS z kartą CycloDS Evolution: żeby wprowadzać kody, musiałem zrozumieć trochę systemu szesnastkowego. Ta ciekawość zaprowadziła mnie potem do modyfikowania konsoli Wii z Homebrew Channel. Jestem pasjonatem programowania. Poza kodowaniem gram w gry wideo, oglądam materiały o ekonomii i śledzę nowinki technologiczne. Lubię rozumieć, jak rzeczy działają od podszewki, dlatego chętnie wszystko kwestionuję.'
  },

  // Skills
  skillsTitle: { fr: 'Mes Compétences', en: 'My Skills', nl: 'Mijn Vaardigheden', pl: 'Moje Umiejętności' },
  skillsSubtitle: {
    fr: 'Technologies et outils que j\'utilise pour créer des expériences numériques exceptionnelles.',
    en: 'Technologies and tools I leverage to build exceptional digital experiences.',
    nl: 'Technologieën en tools die ik gebruik om uitzonderlijke digitale ervaringen te creëren.',
    pl: 'Technologie i narzędzia, które wykorzystuję do tworzenia wyjątkowych cyfrowych doświadczeń.'
  },

  // Projects Title
  projectsTitle: { fr: 'Mes Projets', en: 'My Projects', nl: 'Mijn Projecten', pl: 'Moje Projekty' },

  // Projects Data
  projectsList: {
    fr: [
      {
        title: 'Tableur (Analyse et Conception)',
        description: 'Utilisant Java, la bibliothèque JavaFX et l\'architecture MVVM, j\'ai créé un tableur similaire à Excel avec récursion des cellules, ordre de priorité des opérateurs mathématiques (PEMDAS) et importation/exportation du tableur dans un format personnalisé fourni par l\'école. Utilisation du motif de conception Builder.',
        status: 'completed',
        tech: ['Java', 'JavaFX'],
        link: "https://github.com/ALUMNOAT/anc3-2425-a03"
      },
      {
        title: 'Formulaires Personnalisés',
        description: 'En utilisant Java, le framework Lanterna et l\'architecture MVC, j\'ai développé une application fonctionnant comme un formulaire de questions/réponses. Gestion des propriétaires de questions et des utilisateurs répondants (cases à cocher à réponse unique ou multiple, pourcentages de la réponse la plus choisie, espace de saisie de réponse). Ce projet était davantage axé sur la gestion de Git et Trello (création de branches pour chaque fonctionnalité, commits, fusions, suppressions, étiquetage de commit, versionnement, etc.).',
        status: 'completed',
        tech: ['Java', 'Lanterna', 'Git'],
        link: "https://github.com/ALUMNOAT/tgpr-2425-a04"
      },
      {
        title: 'Site Web E-Commerce (Développement Web)',
        description: 'Avec PHP comme technologie backend, l’architecture MVC et MySQL comme base de données, j’ai développé une plateforme de commerce électronique dotée de fonctionnalités telles que la possibilité d’enchérir ou d’acheter immédiatement (grâce à l’utilisation des transactions), une barre de recherche d’articles, des filtres par nom d’utilisateur et catégorie d’article, et bien plus encore. Utilisation de requêtes AJAX, de JavaScript et du motif de conception Post-Redirect-Get.',
        status: 'completed',
        tech: ['PHP', 'LAMP stack', 'Git', 'JavaScript'],
        link: "https://github.com/ALUMNOAT/prwb_2526_d01"
      },
      {
        title: 'Application de Réservation de Restaurant (Gestion de Base de Données)',
        description: 'En utilisant Dart et le framework Flutter, PostgREST comme API REST, et PostgreSQL comme base de données/serveur, j’ai construit une application de réservation de restaurant comprenant des restaurants, des services, des gestionnaires et des clients. J’ai aussi intégré des jetons JWT pour l’authentification. Le backend est géré par des scripts PostgreSQL, et le frontend par Flutter.',
        status: 'completed',
        tech: ['Dart', 'Flutter', 'PostgREST', 'PostgreSQL'],
        link: "https://github.com/ALUMNOAT/prbd-2526-a02"
      },
      {
        title: 'Réseau Industriel (Sécurité des Réseaux)',
        description: 'À l\'aide de VirtualBox et de pfSense, j\'ai mis en place un réseau WAN (PC physique), LAN (Windows 10 et Windows Server 2019) et DMZ (Ubuntu Server). Utilisation d\'Active Directory (AD), d\'unités organisationnelles (OU) et d\'objets de stratégie de groupe (GPO).',
        status: 'completed',
        tech: ['pfSense', 'Oracle Virtual Box', 'Cisco Packet Tracer'],
        link: rapportSNET
      },
      {
        title: 'Application CRUD (Gestion de Base de Données)',
        description: 'Création d\'une application en utilisant Lazarus et Object Pascal permettant d\'effectuer des opérations CRUD sur une base de données avec plusieurs interfaces. Projet non encore commencé, il sera détaillé ultérieurement.',
        status: 'upcoming',
        tech: ['Pascal', 'MySQL', 'Lazarus']
      },
      {
        title: 'Application CRUD (Projet d\'Intégration au Développement) (feuille de route)',
        description: 'Conception d’un site de réservation de billets de théâtre avec Spring Boot pour le backend et Angular pour le frontend. Projet à venir, il sera détaillé ultérieurement.',
        status: 'upcoming',
        tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Angular'],
        link: "https://github.com/ALUMNOAT/reservationsSpringBoot"
      },
    ],
    en: [
      {
        title: 'Spreadsheet (Analysis & Conception)',
        description: 'Using Java, JavaFX library and MVVM architecture, I built a spreadsheet like Excel with cell recursion, math precedence order (PEMDAS) and import/export of the spreadsheet in a custom format given by the school. Used Builder design pattern.',
        status: 'completed',
        tech: ['Java', 'JavaFX'],
        link: "https://github.com/ALUMNOAT/anc3-2425-a03"
      },
      {
        title: 'Custom Forms',
        description: 'Using Java, the Lanterna framework and MVC architecture, I built an application that works as a question/answer form. It handles question owners and responding users (single- or multiple-choice checkboxes, percentage of the most picked answer, free-text input). This project focused more on managing Git and Trello (creating a branch for each feature, committing, merging, deleting, tagging commits, versioning, etc.).',
        status: 'completed',
        tech: ['Java', 'Lanterna', 'Git'],
        link: "https://github.com/ALUMNOAT/tgpr-2425-a04"
      },
      {
        title: 'E-commerce website (Web Development)',
        description: 'Using PHP (school framework, MVC architecture) and MySQL, I built an e-commerce website with bidding and instant purchase (using transactions), an item search bar, and filters by seller name and item category. Used AJAX requests, JavaScript and the Post-Redirect-Get design pattern.',
        status: 'completed',
        tech: ['PHP', 'LAMP stack', 'Git', 'JavaScript'],
        link: "https://github.com/ALUMNOAT/prwb_2526_d01"
      },
      {
        title: 'Restaurant Reservation App (Database management)',
        description: 'Using Dart, Flutter Framework, PostgREST as REST API and PostgreSQL as database/server, JWT tokens for authentication, I built a restaurant reservation app with restaurants, services, managers and clients. The backend is managed by PostgreSQL scripts, frontend is managed by Flutter.',
        status: 'completed',
        tech: ['Dart', 'Flutter', 'PostgREST', 'PostgreSQL'],
        link: "https://github.com/ALUMNOAT/prbd-2526-a02"
      },
      {
        title: 'Industrial Network (Network Security)',
        description: 'Using Virtual Box and pfSense, I built a WAN (physical PC), LAN (Windows 10 and Windows Server 2019), DMZ (Ubuntu Server). Used Active Directory (AD), Organisational Unit (OU) and Group Policy Objects (GPO).',
        status: 'completed',
        tech: ['pfSense', 'Oracle Virtual Box', 'Cisco Packet Tracer'],
        link: rapportSNET
      },
      {
        title: 'CRUD Application (Database Management)',
        description: 'Creating an application using Lazarus and Object Pascal that can perform CRUD operations on a database with multiple interfaces. Project not started yet, so it will be detailed later.',
        status: 'upcoming',
        tech: ['Pascal', 'MySQL', 'Lazarus']
      },
      {
        title: 'CRUD Application (Development Integration Project) (roadmap)',
        description: 'Designing a theater ticket booking website with Spring Boot as backend and Angular as frontend. Upcoming project, it will be detailed later.',
        status: 'upcoming',
        tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Angular'],
        link: "https://github.com/ALUMNOAT/reservationsSpringBoot"
      },
    ],
    nl: [
      {
        title: 'Spreadsheet (Analyse & Ontwerp)',
        description: 'Met behulp van Java, de JavaFX-bibliotheek en de MVVM-architectuur heb ik een spreadsheet gebouwd die lijkt op Excel, met cel-recursie, wiskundige prioriteitsvolgorde (PEMDAS) en import/export van de spreadsheet in een aangepast formaat van school. Het Builder design pattern is toegepast.',
        status: 'completed',
        tech: ['Java', 'JavaFX'],
        link: "https://github.com/ALUMNOAT/anc3-2425-a03"
      },
      {
        title: 'Aangepaste Formulieren',
        description: 'Met behulp van Java, het Lanterna-framework en de MVC-architectuur heb ik een applicatie gebouwd die werkt als een formulier met vragen en antwoorden. Beheer van eigenaars van de vragen en gebruikers die reageren (selectievakjes met één of meerdere antwoorden, percentages van het meest gekozen antwoord, invoerveld voor antwoorden). Dit project ging meer over Git- en Trello-beheer (branches aanmaken voor elke functie, committen, mergen, verwijderen, taggen van een commit, versionering, etc.).',
        status: 'completed',
        tech: ['Java', 'Lanterna', 'Git'],
        link: "https://github.com/ALUMNOAT/tgpr-2425-a04"
      },
      {
        title: 'E-commerce Website (Webontwikkeling)',
        description: 'Met PHP als backend, een schoolframework, MVC-architectuur en MySQL als database heb ik een e-commerce website gebouwd met de optie om te bieden/kopen (transacties gebruikt), een zoekbalk voor artikelen, filteren op naam van koper/artikelcategorie, enz. AJAX-verzoeken, JavaScript en het Post-Redirect-Get design pattern zijn toegepast.',
        status: 'completed',
        tech: ['PHP', 'LAMP stack', 'Git', 'JavaScript'],
        link: "https://github.com/ALUMNOAT/prwb_2526_d01"
      },
      {
        title: 'Restaurant Reserveringsapp (Databasebeheer)',
        description: 'Met behulp van Dart, het Flutter-framework, PostgREST als REST API en PostgreSQL als database/server, en JWT-tokens voor authenticatie, heb ik een restaurantreserveringsapp gebouwd met restaurants, diensten, managers en klanten. De backend wordt beheerd via PostgreSQL-scripts en de frontend via Flutter.',
        status: 'completed',
        tech: ['Dart', 'Flutter', 'PostgREST', 'PostgreSQL'],
        link: "https://github.com/ALUMNOAT/prbd-2526-a02"
      },
      {
        title: 'Industrieel Netwerk (Netwerkbeveiliging)',
        description: 'Met behulp van VirtualBox en pfSense heb ik een WAN (fysieke pc), LAN (Windows 10 en Windows Server 2019) en DMZ (Ubuntu Server) opgezet. Active Directory (AD), Organisational Units (OU) en Group Policy Objects (GPO) zijn gebruikt.',
        status: 'completed',
        tech: ['pfSense', 'Oracle Virtual Box', 'Cisco Packet Tracer'],
        link: rapportSNET
      },
      {
        title: 'CRUD-applicatie (Databasebeheer)',
        description: 'Het creëren van een applicatie met Lazarus en Object Pascal die CRUD-bewerkingen kan uitvoeren op een database met meerdere interfaces. Nog niet gestart, wordt later gedetailleerd.',
        status: 'upcoming',
        tech: ['Pascal', 'MySQL', 'Lazarus']
      },
      {
        title: 'CRUD-applicatie (Ontwikkelingsintegratieproject) (roadmap)',
        description: 'Het ontwerpen van een website voor het boeken van theatertickets met Spring Boot als backend en Angular als frontend. Komend project, wordt later gedetailleerd.',
        status: 'upcoming',
        tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Angular'],
        link: "https://github.com/ALUMNOAT/reservationsSpringBoot"
      },
    ],
    pl: [
      {
        title: 'Arkusz Kalkulacyjny (Analiza i Projektowanie)',
        description: 'Używając języka Java, biblioteki JavaFX oraz architektury MVVM, zbudowałem arkusz kalkulacyjny przypominający Excela z rekursją komórek, kolejnością wykonywania działań matematycznych (PEMDAS) oraz importem/eksportem arkusza w niestandardowym formacie podanym przez szkołę. Wykorzystano wzorzec projektowy Builder.',
        status: 'completed',
        tech: ['Java', 'JavaFX'],
        link: "https://github.com/ALUMNOAT/anc3-2425-a03"
      },
      {
        title: 'Formularze Niestandardowe',
        description: 'Używając języka Java, frameworka Lanterna oraz architektury MVC, stworzyłem aplikację działającą jako formularz z pytaniami i odpowiedziami. Obsługa właścicieli pytań oraz użytkowników na nie odpowiadających (pola wyboru z jedną lub wieloma odpowiedziami, procentowy udział najczęściej wybieranej odpowiedzi, pole wprowadzania odpowiedzi). Projekt ten skupiał się bardziej na zarządzaniu usługami Git i Trello (tworzenie gałęzi dla każdej funkcji, commity, mergowanie, usuwanie, tagowanie commitów, wersjonowanie itp.).',
        status: 'completed',
        tech: ['Java', 'Lanterna', 'Git'],
        link: "https://github.com/ALUMNOAT/tgpr-2425-a04"
      },
      {
        title: 'Strona E-commerce (Tworzenie Stron Internetowych)',
        description: 'Używając PHP jako backendu, szkolnego frameworka, architektury MVC oraz bazy danych MySQL, zbudowałem sklep internetowy z opcją licytacji/zakupu (wykorzystano TRANSAKCJE), paskiem wyszukiwania produktów, filtrowaniem według nazwy kupującego/kategorii produktu itp. Wykorzystano żądania AJAX, JavaScript oraz wzorzec projektowy Post-Redirect-Get.',
        status: 'completed',
        tech: ['PHP', 'LAMP stack', 'Git', 'JavaScript'],
        link: "https://github.com/ALUMNOAT/prwb_2526_d01"
      },
      {
        title: 'Aplikacja do Rezerwacji Restauracji (Zarządzanie Bazami Danych)',
        description: 'Używając języka Dart, frameworka Flutter, PostgREST jako API REST oraz PostgreSQL jako bazy danych/serwera, a także tokenów JWT do uwierzytelniania, stworzyłem aplikację do rezerwacji w restauracjach obejmującą restauracje, usługi, menedżerów i klientów. Backend jest zarządzany przez skrypty PostgreSQL, a frontend przez Flutter.',
        status: 'completed',
        tech: ['Dart', 'Flutter', 'PostgREST', 'PostgreSQL'],
        link: "https://github.com/ALUMNOAT/prbd-2526-a02"
      },
      {
        title: 'Sieć Przemysłowa (Bezpieczeństwo Sieci)',
        description: 'Za pomocą programu VirtualBox oraz pfSense zbudowałem sieć WAN (fizyczny komputer), LAN (Windows 10 i Windows Server 2019) oraz DMZ (Ubuntu Server). Wykorzystano usługi Active Directory (AD), jednostki organizacyjne (OU) oraz obiekty zasad grupy (GPO).',
        status: 'completed',
        tech: ['pfSense', 'Oracle Virtual Box', 'Cisco Packet Tracer'],
        link: rapportSNET
      },
      {
        title: 'Aplikacja CRUD (Zarządzanie Bazami Danych)',
        description: 'Tworzenie aplikacji przy użyciu języka Lazarus i Object Pascal, która może wykonywać operacje CRUD na bazie danych z wieloma interfejsami. Projekt jeszcze się nie zaczął, więc zostanie szczegółowo opisany później.',
        status: 'upcoming',
        tech: ['Pascal', 'MySQL', 'Lazarus']
      },
      {
        title: 'Aplikacja CRUD (Projekt Integracji Rozwoju) (roadmap)',
        description: 'Projektowanie strony internetowej do rezerwacji biletów do teatru z użyciem Spring Boot (backend) i Angular (frontend). Nadchodzący projekt, zostanie szczegółowo opisany później.',
        status: 'upcoming',
        tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Angular'],
        link: "https://github.com/ALUMNOAT/reservationsSpringBoot"
      },
    ],
  },

  // Parcours Title
  parcoursTitle: { fr: 'Mon Parcours', en: 'My Education', nl: 'Mijn Opleiding', pl: 'Moja Edukacja' },

  // Parcours Data
  parcoursList: {
    fr: [
      { year: '2007-2012', title: '2e-6e année primaire', subtitle: 'École fondamentale communale n° 10' },
      { year: '2012-2018', title: '1re-6e secondaire général - Profil Math-Sciences', subtitle: 'Collège Roi Baudouin (CRB)', description: 'Classe en immersion néerlandophone. 6 heures de mathématiques, 4 heures de néerlandais, 6 heures de sciences.' },
      { year: '2018-2019', title: '7e année préparatoire en mathématiques', subtitle: 'Institut St-Louis', description: 'Une année de préparation intensive en mathématiques pour réussir l’examen d’admission en ingénieur civil. Réussi !' },
      { year: '2019-2022', title: 'Bachelier en Sciences de l’Ingénieur', subtitle: 'Université Libre de Bruxelles (ULB)', description: 'Non abouti.' },
      { year: '2022-2023', title: 'Bachelier en Sciences Informatiques', subtitle: 'Université Libre de Bruxelles (ULB)', description: 'Non abouti.' },
      { year: '2023 - Présent', title: 'Bachelier en Informatique - Développement des Applications', subtitle: 'EPFC (2023-2026), ICC (2026-2027)' },
    ],
    en: [
      { year: '2007-2012', title: 'Primary School (2nd-6th grade)', subtitle: 'École fondamentale communale n° 10' },
      { year: '2012-2018', title: 'High School - Math & Science Profile', subtitle: 'Collège Roi Baudouin (CRB)', description: 'Dutch immersion class. 6h Math, 4h Dutch, 6h Science.' },
      { year: '2018-2019', title: '7th Year Math Preparatory Year', subtitle: 'Institut St-Louis', description: 'A preparatory year in mathematics to pass the civil engineering entrance exam. Passed!' },
      { year: '2019-2022', title: 'Bachelor in Civil Engineering', subtitle: 'Université Libre de Bruxelles (ULB)', description: 'Not completed.' },
      { year: '2022-2023', title: 'Bachelor in Computer Science', subtitle: 'Université Libre de Bruxelles (ULB)', description: 'Not completed.' },
      { year: '2023 - Present', title: 'Bachelor in IT - Application Development', subtitle: 'EPFC (2023-2026), ICC (2026-2027)' },
    ],
    nl: [
      { year: '2007-2012', title: 'Lagere School (2e-6e leerjaar)', subtitle: 'École fondamentale communale n° 10' },
      { year: '2012-2018', title: 'Secundair Onderwijs - Wiskunde-Wetenschappen', subtitle: 'Collège Roi Baudouin (CRB)', description: 'Nederlandstalige immersieklas. 6u Wiskunde, 4u Nederlands, 6u Wetenschappen.' },
      { year: '2018-2019', title: '7de Jaar Voorbereidend Jaar Wiskunde', subtitle: 'Institut St-Louis', description: 'Een voorbereidend jaar wiskunde om het toelatingsexamen burgerlijk ingenieur te halen. Geslaagd!' },
      { year: '2019-2022', title: 'Bachelor in de burgerlijk ingenieurswetenschappen', subtitle: 'Université Libre de Bruxelles (ULB)', description: 'Niet afgerond.' },
      { year: '2022-2023', title: 'Bachelor in de Informatica', subtitle: 'Université Libre de Bruxelles (ULB)', description: 'Niet afgerond.' },
      { year: '2023 - Heden', title: 'Bachelor in de Informatica - Applicatieontwikkeling', subtitle: 'EPFC (2023-2026), ICC (2026-2027)' },
    ],
    pl: [
      { year: '2007-2012', title: 'Szkoła podstawowa (klasy 2-6)', subtitle: 'École fondamentale communale n° 10' },
      { year: '2012-2018', title: 'Liceum - Profil Matematyczno-Przyrodniczy', subtitle: 'Collège Roi Baudouin (CRB)', description: 'Klasa z immersją niderlandzką. 6h matematyki, 4h niderlandzkiego, 6h nauk ścisłych.' },
      { year: '2018-2019', title: '7. Rok przygotowawczy z matematyki', subtitle: 'Institut St-Louis', description: 'Rok przygotowujący z matematyki do egzaminu wstępnego na studia inżynierskie. Zaliczone!' },
      { year: '2019-2022', title: 'Studia Inżynierskie (Licencjat)', subtitle: 'Université Libre de Bruxelles (ULB)', description: 'Nieukończone.' },
      { year: '2022-2023', title: 'Informatyka (Licencjat)', subtitle: 'Université Libre de Bruxelles (ULB)', description: 'Nieukończone.' },
      { year: '2023 - Obecnie', title: 'Informatyka - Tworzenie Aplikacji', subtitle: 'EPFC (2023-2026), ICC (2026-2027)' },
    ],
  },

  // Contact
  contactTitle: { fr: 'Contactez-moi', en: 'Contact Me', nl: 'Neem Contact Op', pl: 'Skontaktuj się' },
  contactDescription: {
    fr: 'Ma boîte de réception est toujours ouverte. Que vous ayez une question ou que vous souhaitiez simplement dire bonjour, je vous répondrai !',
    en: 'My inbox is always open. Whether you have a question or just want to say hi, I\'ll get back to you!',
    nl: 'Mijn mailbox staat altijd open. Of je nu een vraag hebt of gewoon gedag wilt zeggen, ik reageer snel!',
    pl: 'Moja skrzynka odbiorcza jest zawsze otwarta. Niezależnie od tego, czy masz pytanie, czy po prostu chcesz się przywitać, odezwę się!'
  },
  contactButton: { fr: 'Dites Bonjour', en: 'Say Hello', nl: 'Zeg Hallo', pl: 'Przywitaj się' },
  contactCopy: { fr: 'Copier', en: 'Copy', nl: 'Kopiëren', pl: 'Kopiuj' },
  contactCopied: { fr: 'Copié !', en: 'Copied!', nl: 'Gekopieerd!', pl: 'Skopiowano!' },

  // Experience Title
  experienceTitle: { fr: 'Expérience Professionnelle', en: 'Professional Experience', nl: 'Professionele Ervaring', pl: 'Doświadczenie Zawodowe' },

  // Experience Data
  experienceList: {
    fr: [
      {
        role: 'Assistant Administratif & Support Opérationnel',
        company: '(Entreprise Familiale)',
        period: '2020 - 2023',
        location: 'Bruxelles, Belgique',
        bullets: [
          'Gestion administrative : Préparation et suivi des factures de l\'entreprise, classement et aide à la comptabilité.',
          'Support linguistique : Traduction de documents professionnels et support de communication.',
          'Rénovation & Chantier : Travaux de second œuvre (peinture, finition) exigeant rigueur, gestion de l\'effort et souci du détail.'
        ],
      },
      {
        role: 'Employé Événementiel & Logistique',
        company: 'Rock The City',
        period: '2024 - Présent',
        location: 'Bruxelles, Belgique',
        description: 'Job étudiant',
        bullets: [
          'Organisation logistique et accueil : gérer les mouvements, assurer des allers-retours logistiques sur site et vendre des billets lors d’événements grand public (Exposition Schtroumpf Expérience au Heysel).',
          'Support institutionnel : Assistance logistique lors d\'événements à l\'Hôtel de Ville de Bruxelles.',
          'Communication de terrain : Distribution et promotion lors de campagnes événementielles.'
        ],
      },
    ],
    en: [
      {
        role: 'Administrative Assistant & Operational Support',
        company: '(Family business)',
        period: '2020 - 2023',
        location: 'Brussels, Belgium',
        bullets: [
          'Administrative management: Preparation and tracking of company invoices, filing, and accounting support.',
          'Linguistic support: Translation of professional documents and communication support.',
          'Renovation & Construction: Finishing works (painting, finishing) requiring rigor, physical effort management, and attention to detail.'
        ],
      },
      {
        role: 'Event & Logistics Employee',
        company: 'Rock The City',
        period: '2024 - Present',
        location: 'Brussels, Belgium',
        description: 'Student job',
        bullets: [
          'Logistics & Reception: Flow management, on-site logistics runs, and sales at large public events (Smurf Experience Exhibition at Heysel).',
          'Institutional support: Logistics assistance during events at Brussels City Hall.',
          'Field communication: Distribution and promotion during event campaigns.'
        ],
      },
    ],
    nl: [
      {
        role: 'Administratief Assistent & Operationele Ondersteuning',
        company: '(Familiebedrijf)',
        period: '2020 - 2023',
        location: 'Brussel, België',
        bullets: [
          'Administratief beheer: Voorbereiding en opvolging van bedrijfsfacturen, archivering en ondersteuning bij de boekhouding.',
          'Taalkundige ondersteuning: Vertaling van professionele documenten en communicatieondersteuning.',
          'Renovatie & Bouw: Afwerkingswerkzaamheden (schilderen, afwerking) die nauwkeurigheid, fysieke inzet en oog voor detail vereisen.'
        ],
      },
      {
        role: 'Evenementen- & Logistiek Medewerker',
        company: 'Rock The City',
        period: '2024 - Heden',
        location: 'Brussel, België',
        description: 'Studentenjob',
        bullets: [
          'Logistiek & Onthaal: Beheer van bezoekersstromen, logistieke ritten ter plaatse en verkoop tijdens grootschalige evenementen (Smurf Experience-tentoonstelling op de Heizel).',
          'Institutionele ondersteuning: Logistieke bijstand tijdens evenementen in het Stadhuis van Brussel.',
          'Veldcommunicatie: Distributie en promotie tijdens evenementencampagnes.'
        ],
      },
    ],
    pl: [
      {
        role: 'Asystent Administracyjny i Wsparcie Operacyjne',
        company: '(Firma rodzinna)',
        period: '2020 - 2023',
        location: 'Bruksela, Belgia',
        bullets: [
          'Zarządzanie administracyjne: Przygotowywanie i monitorowanie faktur firmowych, archiwizacja oraz wsparcie w księgowości.',
          'Wsparcie językowe: Tłumaczenie dokumentów zawodowych i wsparcie w komunikacji.',
          'Remonty i Prace Budowlane: Prace wykończeniowe (malowanie, wykończenia) wymagające skrupulatności, dobrej organizacji pracy i dbałości o detale.'
        ],
      },
      {
        role: 'Pracownik ds. Eventów i Logistyki',
        company: 'Rock The City',
        period: '2024 - Obecnie',
        location: 'Bruksela, Belgia',
        description: 'Praca studencka',
        bullets: [
          'Logistyka i Obsługa Klienta: Zarządzanie przepływem ludzi, bieżąca logistyka na miejscu oraz sprzedaż podczas wydarzeń masowych (Wystawa Smurf Experience na Heysel).',
          'Wsparcie instytucjonalne: Pomoc logistyczna podczas wydarzeń w Ratuszu w Brukseli.',
          'Komunikacja w terenie: Dystrybucja materiałów i promocja podczas kampanii eventowych.'
        ],
      },
    ]
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  getProjects: () => ProjectTranslation[];
  getParcours: () => ParcoursTranslation[];
  getExperiences: () => ExperienceTranslation[];
  getResumeUrl: () => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('fr');

  // Garde l'étiquette <html lang="..."> synchronisée avec la langue choisie
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string) => {
    const value = translations[key]?.[lang];
    return typeof value === 'string' ? value : key;
  };

  const getProjects = () => {
    const value = translations.projectsList?.[lang];
    return Array.isArray(value) ? (value as ProjectTranslation[]) : [];
  };

  const getParcours = () => {
    const value = translations.parcoursList?.[lang];
    return Array.isArray(value) ? (value as ParcoursTranslation[]) : [];
  };

  const getExperiences = () => {
    const value = translations.experienceList?.[lang];
    return Array.isArray(value) ? (value as ExperienceTranslation[]) : [];
  };

  const getResumeUrl = () => {
    switch (lang) {
      case 'fr': return resumeFr;
      case 'en': return resumeEn;
      case 'nl': return resumeNl;
      case 'pl': return resumePl;
      default: return resumeFr;
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, getProjects, getParcours, getExperiences, getResumeUrl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}