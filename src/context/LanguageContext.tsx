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
  heroTitle: { fr: 'Salut, je m\'appelle', en: 'Hello, my name is', nl: 'Hoi, mijn naam is', pl: 'Cześć, nazywam się' },
  heroSubtitle: {
    fr: 'Étudiant en Informatique - Développement des Applications (Informatique de Gestion)',
    en: 'IT Student - Application Development (Business IT)',
    nl: 'IT-student - Applicatieontwikkeling (Bedrijfsinformatica)',
    pl: 'Student Informatyki - Tworzenie Aplikacji (Informatyka Biznesowa)'
  },
  heroDescription: {
    fr: 'Je construis des applications du backend au frontend. Je suis prêt pour un stage ou un travail à mi-temps, car il ne me reste que 2 projets et mon Travail de Fin d\'Études (TFE) à réaliser. En me prenant, vous avez 3 mois où vous pouvez me former gratuitement (via une convention de stage). Je vois ça comme un win-win.',
    en: 'I build everything from backend to frontend. I am ready for an internship or a part-time job, as I still have 2 projects and my Thesis to complete. By taking me on, you get 3 months where you can train me for free (via an internship agreement). I see it as a win-win.',
    nl: 'Ik bouw alles van backend tot frontend. Ik ben klaar voor een stage of een deeltijdse job, aangezien ik nog 2 projecten en mijn eindwerk moet voltooien. Door mij te nemen, krijg je 3 maanden de tijd om mij gratis op te leiden (via een stageovereenkomst). Ik zie het als een win-win.',
    pl: 'Tworzę wszystko od backendu po frontend. Jestem gotowy na staż lub pracę w niepełnym wymiarze godzin, ponieważ do zrobienia zostały mi tylko 2 projekty i praca dyplomowa. Biorąc mnie na staż, zyskujesz 3 miesiące, w których możesz mnie przeszkolić za darmo (poprzez umowę o staż). Widzę to jako win-win.'
  },
  heroViewProjects: { fr: 'Voir les projets', en: 'View Projects', nl: 'Bekijk projecten', pl: 'Zobacz projekty' },
  heroResume: { fr: 'CV', en: 'Resume', nl: 'CV', pl: 'CV' },

  // About
  aboutTitle: { fr: 'Sur Moi', en: 'About Me', nl: 'Over Mij', pl: 'O mnie' },
  aboutDescription: {
    fr: 'Je me suis intéressé à l\'informatique quand j\'avais une Nintendo DS avec une CycloDS Evolution : je devais y insérer des cheat codes et comprendre un peu l\'hexadécimal pour faire des modifications. Ensuite, ça a été le jailbreak d\'une Wii et l\'installation de l\'Homebrew Channel pour avoir tous les jeux. Je suis un développeur passionné. Quand je ne code pas, je joue aux jeux vidéo, je regarde des vidéos d\'économie, je m\'intéresse aux nouveautés technologiques et je télécharge de la musique en FLAC pour la convertir en OPUS 214 kbps avec VBR (parce que Spotify est cher et FLAC prend trop de place xD). On se débrouille comme on peut ! Au moins, ça montre mon côté débrouillard et curieux, qui aime comprendre comment tout fonctionne sous le capot.',
    en: 'I first got into computers when I had a Nintendo DS with a CycloDS Evolution: I had to insert cheat codes and understand a bit of hexadecimal to make modifications. Later on, it was jailbreaking a Wii and installing the Homebrew Channel to get games. I am a passionate developer. When I am not coding, I play video games, watch economics videos, keep up with tech trends, and download FLAC music to convert it into OPUS 214 kbps with VBR (because Spotify is expensive and FLAC takes up too much space xD). You do what you gotta do! At least it shows my resourceful side and that I like to question everything to understand how things work under the hood.',
    nl: 'Ik raakte voor het eerst geïnteresseerd in computers toen ik een Nintendo DS had met een CycloDS Evolution: ik moest cheatcodes invoeren en een beetje hexadecimaal begrijpen om aanpassingen te doen. Later volgde het jailbreaken van een Wii en het installeren van het Homebrew Channel om games te spelen. Ik ben een gepassioneerde developer. Als ik niet aan het coderen ben, speel ik videogames, kijk ik economie-video\'s, volg ik technologietrends en download ik FLAC-muziek om deze om te zetten naar OPUS 214 kbps met VBR (want Spotify is duur en FLAC neemt te veel ruimte in beslag xD). Je moet wat! Het toont tenminste mijn vindingrijke kant en dat ik alles in twijfel trek om te begrijpen hoe dingen onder de motorkap werken.',
    pl: 'Informatyką zainteresowałem się, gdy miałem Nintendo DS z kartą CycloDS Evolution – musiałem wpisywać kody i rozumieć nieco system szesnastkowy, żeby wprowadzać modyfikacje. Potem przyszedł jailbreak Wii i instalacja Homebrew Channel. Jestem pasjonatem programowania. Kiedy nie koduję, gram w gry wideo, oglądam materiały o ekonomii, śledzę nowinki technologiczne i pobieram muzykę w formacie FLAC, żeby przekonwertować ją na OPUS 214 kbps z VBR (bo Spotify jest drogie, a FLAC zajmuje za dużo miejsca xD). Radzi sobie człowiek, jak może! To przynajmniej pokazuje moją zaradność i to, że lubię wszystko kwestionować, żeby zrozumieć, jak rzeczy działają od podszewki.'
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
        description: 'En utilisant Java, le framework Lanterna et l\'architecture MVC, j\'ai développé une application fonctionnant comme un formulaire de questions/réponses. Gestion des propriétaires de questions et des utilisateurs répondant (cases à cocher à réponse unique ou multiple, pourcentages de la réponse la plus choisie, espace de saisie de réponse). Ce projet était davantage axé sur la gestion de Git et Trello (création de branches pour chaque fonctionnalité, commits, fusions, suppressions, étiquetage de commit, versionnement, etc.).',
        status: 'completed',
        tech: ['Java', 'Lanterna', 'Git'],
        link: "https://github.com/ALUMNOAT/tgpr-2425-a04"
      },
      {
        title: 'Site Web E-Commerce (Développement Web)',
        description: 'En utilisant PHP comme backend, un framework d\'école, l\'architecture MVC et MySQL comme base de données, j\'ai créé un site e-commerce avec option d\'enchères/achat (utilisation de TRANSACTIONS), barre de recherche d\'articles, filtres par nom d\'acheteur/catégorie d\'article, etc. Utilisation de requêtes AJAX, de JavaScript et du motif de conception Post-Redirect-Get.',
        status: 'completed',
        tech: ['PHP', 'LAMP stack', 'Git', 'JavaScript'],
        link: "https://github.com/ALUMNOAT/prwb_2526_d01"
      },
      {
        title: 'Application de Réservation de Restaurant (Gestion de Base de Données)',
        description: 'En utilisant Dart, le framework Flutter, PostgREST comme API REST et PostgreSQL comme base de données/serveur, ainsi que des jetons JWT pour l\'authentification, j\'ai construit une application de réservation de restaurant comprenant des restaurants, des services, des gestionnaires et des clients. Le backend est géré par des scripts PostgreSQL, et le frontend par Flutter.',
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
        description: 'Création d\'un site web de réservation de billets de théâtre en utilisant Spring Boot comme backend et Angular.js comme frontend. Projet non encore commencé, il sera détaillé ultérieurement.',
        status: 'in-progress',
        tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Angular.js'],
        link: "https://github.com/ALUMNOAT/reservationsSpringBoot"
      },
    ],
    en: [
      {
        title: 'Spreadsheet (Analysis & Conception)',
        description: 'Using Java, JavaFX library and MVVM architecture, I built a spreadsheet like Excel with cell recursion, math precedence order (PEMA) and import/export of the spreadsheet in a custom format given by the school. Used Builder design pattern.',
        status: 'completed',
        tech: ['Java', 'JavaFX'],
        link: "https://github.com/ALUMNOAT/anc3-2425-a03"
      },
      {
        title: 'Custom Forms',
        description: 'Using Java, Lanterna framework and MVC architecture, I built an application who works as a form with questions/answers. Owner of the questions and users who respond to it (checkbox with one or multiple responses, percentages of the most picked response, response input space). This project was more about managing Git and Trello (creating branches for each feature, comitting, merging, deleting, tagging a commit, versioning, ...)',
        status: 'completed',
        tech: ['Java', 'Lanterna', 'Git'],
        link: "https://github.com/ALUMNOAT/tgpr-2425-a04"
      },
      {
        title: 'E-commerce website (Web Development)',
        description: 'Using PHP as backend, school framework, MVC architecture, MySQL as database, I built an e-commerce website with option to bid/buy (used TRANSACTION), search bar for items, filter by name of buyer/item category, ... Used AJAX requests, JavaScript and Post-Redirect-Get design pattern.',
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
        description: 'Using Virtual Box and pfSense, I built a WAN (physical PC), LAN (Windows 10 and Windows Server 2019), DMZ (Ubuntu Server). Used Active Diectories (AD), Organisational Unit (OU) and Group Policy Objects (GPO).',
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
        description: 'Creating a theater ticket booking website using Spring Boot as backend and Angular.js as frontend. Project not started yet, so it will be detailed later.',
        status: 'in-progress',
        tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Angular.js'],
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
        description: 'Het bouwen van een website voor het boeken van theatertickets met Spring Boot als backend en Angular.js als frontend. Nog niet gestart, wordt later gedetailleerd.',
        status: 'in-progress',
        tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Angular.js'],
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
        description: 'Tworzenie strony internetowej do rezerwacji biletów do teatru przy użyciu Spring Boot jako backendu i Angular.js jako frontend. Projekt jeszcze się nie zaczął, więc zostanie szczegółowo opisany później.',
        status: 'in-progress',
        tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Angular.js'],
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
      { year: '2012-2018', title: '1e-6e secondaire général - Profil Math-Sciences', subtitle: 'Collège Roi Baudouin (CRB)', description: 'Classe en immersion néerlandophone. 6 heures de mathématiques, 4 heures de néerlandais, 6 heures de sciences.' },
      { year: '2018-2019', title: '7e année préparatoire en mathématiques', subtitle: 'Institut St-Louis', description: 'Une année de préparation intensive en mathématiques pour réussir l’examen d’admission en ingénieur civil. Réussi !' },
      { year: '2019-2022', title: 'Bachelier en Sciences de l’Ingénieur', subtitle: 'Université Libre de Bruxelles (ULB)', description: 'Non réussi.' },
      { year: '2022-2023', title: 'Bachelier en Sciences Informatiques', subtitle: 'Université Libre de Bruxelles (ULB)', description: 'Non réussi.' },
      { year: '2023 - Présent', title: 'Bachelier en Informatique - Développement des Applications', subtitle: 'EPFC (2023-2026), ICC (2026-2027)' },
    ],
    en: [
      { year: '2007-2012', title: 'Primary School (2nd-6th grade)', subtitle: 'École fondamentale communale n° 10' },
      { year: '2012-2018', title: 'High School - Math & Science Profile', subtitle: 'Collège Roi Baudouin (CRB)', description: 'Dutch immersion class. 6h Math, 4h Dutch, 6h Science.' },
      { year: '2018-2019', title: '7th Year Math Preparatory Year', subtitle: 'Institut St-Louis', description: 'A preparatory year in mathematics to pass the civil engineering entrance exam. Passed!' },
      { year: '2019-2022', title: 'Bachelor in Civil Engineering', subtitle: 'Université Libre de Bruxelles (ULB)', description: 'Not passed.' },
      { year: '2022-2023', title: 'Bachelor in Computer Science', subtitle: 'Université Libre de Bruxelles (ULB)', description: 'Not passed.' },
      { year: '2023 - Present', title: 'Bachelor in IT - Application Development', subtitle: 'EPFC (2023-2026), ICC (2026-2027)' },
    ],
    nl: [
      { year: '2007-2012', title: 'Lagere School (2e-6e leerjaar)', subtitle: 'École fondamentale communale n° 10' },
      { year: '2012-2018', title: 'Secundair Onderwijs - Wiskunde-Wetenschappen', subtitle: 'Collège Roi Baudouin (CRB)', description: 'Nederlandstalige immersieklas. 6u Wiskunde, 4u Nederlands, 6u Wetenschappen.' },
      { year: '2018-2019', title: '7de Jaar Voorbereidend Jaar Wiskunde', subtitle: 'Institut St-Louis', description: 'Een voorbereidend jaar wiskunde om het toelatingsexamen burgerlijk ingenieur te halen. Geslaagd!' },
      { year: '2019-2022', title: 'Bachelor in de Burgerlijk Ingenieurswetenschappen', subtitle: 'Université Libre de Bruxelles (ULB)', description: 'Niet geslaagd.' },
      { year: '2022-2023', title: 'Bachelor in de Informatica', subtitle: 'Université Libre de Bruxelles (ULB)', description: 'Niet geslaagd.' },
      { year: '2023 - Heden', title: 'Bachelor in de Informatica - Applicatieontwikkeling', subtitle: 'EPFC (2023-2026), ICC (2026-2027)' },
    ],
    pl: [
      { year: '2007-2012', title: 'Szkoła podstawowa (klasy 2-6)', subtitle: 'École fondamentale communale n° 10' },
      { year: '2012-2018', title: 'Liceum - Profil Matematyczno-Przyrodniczy', subtitle: 'Collège Roi Baudouin (CRB)', description: 'Klasa z immersją niderlandzką. 6h matematyki, 4h niderlandzkiego, 6h nauk ścisłych.' },
      { year: '2018-2019', title: '7. Rok przygotowawczy z matematyki', subtitle: 'Institut St-Louis', description: 'Rok przygotowujący z matematyki do egzaminu wstępnego na studia inżynierskie. Zaliczone!' },
      { year: '2019-2022', title: 'Studia Inżynierskie (Civil Engineering)', subtitle: 'Université Libre de Bruxelles (ULB)', description: 'Niezaliczone.' },
      { year: '2022-2023', title: 'Informatyka (Licencjat)', subtitle: 'Université Libre de Bruxelles (ULB)', description: 'Niezaliczone.' },
      { year: '2023 - Obecnie', title: 'Informatyka - Tworzenie Aplikacji', subtitle: 'EPFC (2023-2026), ICC (2026-2027)' },
    ],
  },

  // Contact
  contactTitle: { fr: 'Contactez-moi', en: 'Contact Me', nl: 'Neem Contact Op', pl: 'Skontaktuj się' },
  contactDescription: {
    fr: 'Ma boîte de réception est toujours ouverte. Que vous ayez une question ou simplement envie de dire bonjour, je vous répondrai !',
    en: 'My inbox is always open. Whether you have a question or just want to say hi, I\'ll get back to you!',
    nl: 'Mijn mailbox staat altijd open. Of je nu een vraag hebt of gewoon gedag wilt zeggen, ik reageer snel!',
    pl: 'Moja skrzynka odbiorcza jest zawsze otwarta. Niezależnie od tego, czy masz pytanie, czy po prostu chcesz się przywitać, odezwę się!'
  },
  contactButton: { fr: 'Dis Bonjour', en: 'Say Hello', nl: 'Zeg Hallo', pl: 'Przywitaj się' },

  // Experience Title
  experienceTitle: { fr: 'Expérience Professionnelle', en: 'Professional Experience', nl: 'Professionele Ervaring', pl: 'Doświadczenie Zawodowe' },

  // Experience Data
  experienceList: {
    fr: [
      {
        role: 'Stagiaire / Développeur Junior (Exemple)',
        company: 'Nom de l\'entreprise',
        period: '2025 - Présent',
        location: 'Bruxelles, Belgique',
        description: 'Participation au développement d\'applications web et internes.',
        bullets: [
          'Développement de composants front-end avec React et Tailwind CSS.',
          'Intégration d\'APIs REST et gestion des bases de données.',
          'Collaboration en méthode Agile / Scrum au sein de l\'équipe.'
        ],
        tech: ['React', 'Tailwind CSS', 'TypeScript', 'Node.js']
      }
    ],
    en: [
      {
        role: 'Intern / Junior Developer (Example)',
        company: 'Company Name',
        period: '2025 - Present',
        location: 'Brussels, Belgium',
        description: 'Participation in the development of web and internal applications.',
        bullets: [
          'Developed front-end components using React and Tailwind CSS.',
          'Integrated REST APIs and handled database management.',
          'Collaborated using Agile / Scrum methodology within the team.'
        ],
        tech: ['React', 'Tailwind CSS', 'TypeScript', 'Node.js']
      }
    ],
    nl: [
      {
        role: 'Stagiair / Junior Developer (Voorbeeld)',
        company: 'Bedrijfsnaam',
        period: '2025 - Heden',
        location: 'Brussel, België',
        description: 'Deelname aan de ontwikkeling van web- en interne applicaties.',
        bullets: [
          'Frontend-componenten ontwikkeld met React en Tailwind CSS.',
          'REST API\'s geïntegreerd en databases beheerd.',
          'Samengewerkt volgens de Agile / Scrum methodologie.'
        ],
        tech: ['React', 'Tailwind CSS', 'TypeScript', 'Node.js']
      }
    ],
    pl: [
      {
        role: 'Stażysta / Młodszy Programista (Przykład)',
        company: 'Nazwa firmy',
        period: '2025 - Obecnie',
        location: 'Bruksela, Belgia',
        description: 'Udział w tworzeniu aplikacji internetowych i wewnętrznych.',
        bullets: [
          'Tworzenie komponentów front-end przy użyciu React i Tailwind CSS.',
          'Integracja API REST oraz obsługa baz danych.',
          'Współpraca w zespole przy użyciu metodyki Agile / Scrum.'
        ],
        tech: ['React', 'Tailwind CSS', 'TypeScript', 'Node.js']
      }
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