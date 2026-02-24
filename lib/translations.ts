export type Lang = 'en' | 'fr';

export type TranslationKey =
  | 'about.lead'
  | 'about.p1'
  | 'about.p2'
  | 'about.stat1'
  | 'about.stat2'
  | 'about.stat3'
  | 'about.tag'
  | 'about.title'
  | 'contact.desc'
  | 'contact.form.email'
  | 'contact.form.message'
  | 'contact.form.name'
  | 'contact.form.other'
  | 'contact.form.select'
  | 'contact.form.sent'
  | 'contact.form.submit'
  | 'contact.tag'
  | 'contact.title'
  | 'footer.connect'
  | 'footer.love'
  | 'footer.rights'
  | 'footer.tagline'
  | 'hero.cta1'
  | 'hero.cta2'
  | 'hero.overline'
  | 'hero.sub'
  | 'hero.title'
  | 'nav.about'
  | 'nav.cta'
  | 'nav.process'
  | 'nav.services'
  | 'process.s1.desc'
  | 'process.s1.title'
  | 'process.s2.desc'
  | 'process.s2.title'
  | 'process.s3.desc'
  | 'process.s3.title'
  | 'process.s4.desc'
  | 'process.s4.title'
  | 'process.tag'
  | 'process.title'
  | 'renaissance.author'
  | 'renaissance.connect'
  | 'renaissance.quote'
  | 'services.cta.btn'
  | 'services.cta.desc'
  | 'services.cta.title'
  | 'services.s1.desc'
  | 'services.s1.title'
  | 'services.s2.desc'
  | 'services.s2.title'
  | 'services.s3.desc'
  | 'services.s3.title'
  | 'services.s4.desc'
  | 'services.s4.title'
  | 'services.s5.desc'
  | 'services.s5.title'
  | 'services.s6.desc'
  | 'services.s6.title'
  | 'services.s7.desc'
  | 'services.s7.title'
  | 'services.tag'
  | 'services.title'
  | 'trust.airship'
  | 'trust.besport'
  | 'trust.beta'
  | 'trust.ina'
  | 'trust.label'
  | 'trust.opera';

export type Translations = Record<Lang, Record<TranslationKey, string>>;

export const translations: Translations = {
  en: {
    'about.lead': 'The name started as a joke over an artichoke salad. It stuck because it turned out to be the perfect metaphor for what we do.',
    'about.p1': 'An artichoke is complex, layered, and a little intimidating at first glance. But with the right technique and patience, you get to the heart — the most valuable part. That\'s exactly how we approach data engineering.',
    'about.p2': 'We\'re a boutique studio of data engineers, architects, and analytics experts who believe that great data infrastructure should be as elegant as it is powerful. We don\'t do cookie-cutter solutions. Every engagement is crafted to fit.',
    'about.stat1': 'Projects delivered',
    'about.stat2': 'Data processed daily',
    'about.stat3': 'Pipeline uptime',
    'about.tag': 'Why Datachoke?',
    'about.title': 'Data + Artichoke.<br>Yes, <em>seriously</em>.',
    'contact.desc': 'Tell us about your project and we\'ll get back to you within 24 hours. No sales pitch, just a real conversation about your data needs.',
    'contact.form.email': 'Email address',
    'contact.form.message': 'Tell us about your project',
    'contact.form.name': 'Your name',
    'contact.form.other': 'Something else',
    'contact.form.select': 'What do you need?',
    'contact.form.sent': 'Message sent!',
    'contact.form.submit': 'Send message',
    'contact.tag': 'Get in touch',
    'contact.title': 'Ready to get to<br>the <em>heart</em> of your data?',
    'footer.connect': 'Connect',
    'footer.love': 'Crafted with care and a love for artichokes.',
    'footer.rights': 'All rights reserved.',
    'footer.tagline': 'Data engineering, artfully crafted.',
    'hero.cta1': 'Discover our craft',
    'hero.cta2': 'Start a project',
    'hero.overline': 'Where data meets artistry',
    'hero.sub': 'Like an artichoke reveals its heart through patience and precision, we strip away data chaos to uncover the insights at your core.',
    'hero.title': 'We peel back complexity,<br><span class="hero-accent">layer by layer.</span>',
    'nav.about': 'About',
    'nav.cta': 'Let\'s Talk',
    'nav.process': 'Process',
    'nav.services': 'Services',
    'process.s1.desc': 'We start at the surface. Understanding your business context, existing infrastructure, pain points, and ambitions. No assumptions, just deep listening.',
    'process.s1.title': 'Outer leaves — Discovery',
    'process.s2.desc': 'Architecture decisions, tech stack selection, data modeling. We design every layer with intention, ensuring each piece fits the whole.',
    'process.s2.title': 'Middle layers — Design',
    'process.s3.desc': 'Hands on keyboards. We build iteratively, with CI/CD from day one, comprehensive testing, and full documentation. No black boxes.',
    'process.s3.title': 'Inner petals — Build',
    'process.s4.desc': 'The best part. Your data platform goes live, your team gets trained, and we stay close for optimization. The heart of the artichoke is always worth the wait.',
    'process.s4.title': 'The heart — Deliver & Grow',
    'process.tag': 'How we work',
    'process.title': 'Like an artichoke,<br>great data unfolds <em>patiently</em>.',
    'renaissance.author': '— Leonardo da Vinci',
    'renaissance.connect': 'Like the Old Masters, we believe the most powerful work comes from mastering every layer before revealing the final masterpiece.',
    'renaissance.quote': 'Simplicity is the ultimate sophistication.',
    'services.cta.btn': 'Get in touch',
    'services.cta.desc': 'Let\'s peel it apart together.',
    'services.cta.title': 'Got a data challenge?',
    'services.s1.desc': 'We design robust, scalable data architectures that grow with your ambitions. From data lakes to warehouses, we build foundations that last.',
    'services.s1.title': 'Data Architecture',
    'services.s2.desc': 'Real-time or batch, we craft data pipelines that are reliable, observable, and elegant. Your data flows like it was always meant to.',
    'services.s2.title': 'Pipeline Engineering',
    'services.s3.desc': 'We build intelligent AI agents and MCP integrations that automate complex workflows. From conversational bots to autonomous pipelines, we make AI work for your data.',
    'services.s3.title': 'AI Agents & MCP',
    'services.s4.desc': 'AWS, GCP, Azure — we speak fluent cloud. We deploy and optimize your data infrastructure with IaC, Kubernetes, and battle-tested DevOps practices.',
    'services.s4.title': 'Cloud & Infrastructure',
    'services.s5.desc': 'Quality, lineage, compliance — we structure your data governance so every dataset is trusted, traceable, and regulation-ready. No surprises, just clarity.',
    'services.s5.title': 'Data Governance',
    'services.s6.desc': 'Dashboards that tell stories, metrics that drive decisions. We transform raw data into visual narratives your entire team can understand.',
    'services.s6.title': 'Analytics & BI',
    'services.s7.desc': 'We dive deep into your business reality before writing a single line of code. Needs analysis, maturity audit, and a pragmatic roadmap — because great engineering starts with understanding.',
    'services.s7.title': 'Data Strategy',
    'services.tag': 'What we cultivate',
    'services.title': 'Every layer of your data,<br>carefully <em>engineered</em>.',
    'trust.airship': 'CRM & Push Notifications',
    'trust.besport': 'The Sports Social Network',
    'trust.beta': 'French Gov Digital Services',
    'trust.ina': 'Institut National de l\'Audiovisuel',
    'trust.label': 'They trust us',
    'trust.opera': 'Opéra National de Paris',
  },
  fr: {
    'about.lead': 'Le nom est né d\'une blague autour d\'une salade d\'artichauts. Il est resté parce qu\'il s\'est avéré être la métaphore parfaite de ce que nous faisons.',
    'about.p1': 'Un artichaut est complexe, en couches, et un peu intimidant au premier regard. Mais avec la bonne technique et de la patience, on arrive au cœur — la partie la plus précieuse. C\'est exactement notre approche du data engineering.',
    'about.p2': 'Nous sommes un studio boutique d\'ingénieurs data, d\'architectes et d\'experts analytics qui croient qu\'une grande infrastructure de données doit être aussi élégante que puissante. Pas de solutions standardisées. Chaque mission est taillée sur mesure.',
    'about.stat1': 'Projets livrés',
    'about.stat2': 'Données traitées / jour',
    'about.stat3': 'Uptime pipelines',
    'about.tag': 'Pourquoi Datachoke ?',
    'about.title': 'Data + Artichaut.<br>Oui, <em>sérieusement</em>.',
    'contact.desc': 'Parlez-nous de votre projet et nous vous recontactons sous 24h. Pas de pitch commercial, juste une vraie conversation sur vos besoins data.',
    'contact.form.email': 'Adresse email',
    'contact.form.message': 'Parlez-nous de votre projet',
    'contact.form.name': 'Votre nom',
    'contact.form.other': 'Autre chose',
    'contact.form.select': 'De quoi avez-vous besoin ?',
    'contact.form.sent': 'Message envoyé !',
    'contact.form.submit': 'Envoyer',
    'contact.tag': 'Nous contacter',
    'contact.title': 'Prêt à aller au<br><em>cœur</em> de vos données ?',
    'footer.connect': 'Suivez-nous',
    'footer.love': 'Conçu avec soin et un amour pour les artichauts.',
    'footer.rights': 'Tous droits réservés.',
    'footer.tagline': 'Le data engineering, fait avec art.',
    'hero.cta1': 'Notre savoir-faire',
    'hero.cta2': 'Lancer un projet',
    'hero.overline': 'Là où la data rencontre l’art',
    'hero.sub': 'Comme un artichaut révèle son cœur avec patience et précision, nous dissipons le chaos de vos données pour révéler les insights essentiels.',
    'hero.title': 'On décortique la complexité,<br><span class="hero-accent">couche par couche.</span>',
    'nav.about': 'À propos',
    'nav.cta': 'Parlons-en',
    'nav.process': 'Approche',
    'nav.services': 'Services',
    'process.s1.desc': 'On commence en surface. Comprendre votre contexte métier, l\'infrastructure existante, les points de friction et les ambitions. Zéro présupposé, juste une écoute profonde.',
    'process.s1.title': 'Feuilles extérieures — Découverte',
    'process.s2.desc': 'Décisions d\'architecture, choix de stack, modélisation de données. Nous concevons chaque couche avec intention, en assurant la cohérence de l\'ensemble.',
    'process.s2.title': 'Couches intermédiaires — Design',
    'process.s3.desc': 'Les mains sur le clavier. Nous construisons de manière itérative, avec CI/CD dès le premier jour, des tests complets et une documentation complète. Zéro boîte noire.',
    'process.s3.title': 'Pétales internes — Construction',
    'process.s4.desc': 'Le meilleur moment. Votre plateforme data est en production, votre équipe est formée, et nous restons proches pour l\'optimisation. Le cœur de l\'artichaut vaut toujours l\'attente.',
    'process.s4.title': 'Le cœur — Livraison & Croissance',
    'process.tag': 'Notre approche',
    'process.title': 'Comme un artichaut,<br>la bonne data se révèle <em>patiemment</em>.',
    'renaissance.author': '— Léonard de Vinci',
    'renaissance.connect': 'Comme les grands Maîtres, nous croyons que l’œuvre la plus puissante naît de la maîtrise de chaque couche avant de révéler le chef-d’œuvre final.',
    'renaissance.quote': 'La simplicité est la sophistication suprême.',
    'services.cta.btn': 'Nous contacter',
    'services.cta.desc': 'Épluchons-le ensemble.',
    'services.cta.title': 'Un défi data ?',
    'services.s1.desc': 'Nous concevons des architectures de données robustes et évolutives qui grandissent avec vos ambitions. Des data lakes aux entrepôts, nous bâtissons des fondations durables.',
    'services.s1.title': 'Architecture Data',
    'services.s2.desc': 'Temps réel ou batch, nous créons des pipelines de données fiables, observables et élégants. Vos données coulent comme elles l\'ont toujours voulu.',
    'services.s2.title': 'Ingénierie Pipeline',
    'services.s3.desc': 'Nous construisons des agents IA intelligents et des intégrations MCP qui automatisent les workflows complexes. Des bots conversationnels aux pipelines autonomes, l\'IA au service de vos données.',
    'services.s3.title': 'Agents IA & MCP',
    'services.s4.desc': 'AWS, GCP, Azure — nous parlons couramment cloud. Nous déployons et optimisons votre infrastructure data avec IaC, Kubernetes et des pratiques DevOps éprouvées.',
    'services.s4.title': 'Cloud & Infrastructure',
    'services.s5.desc': 'Qualité, linéage, conformité — nous structurons votre gouvernance pour que chaque jeu de données soit fiable, traçable et conforme. Zéro surprise, juste de la clarté.',
    'services.s5.title': 'Gouvernance Data',
    'services.s6.desc': 'Des dashboards qui racontent des histoires, des métriques qui orientent les décisions. Nous transformons les données brutes en récits visuels que toute votre équipe peut comprendre.',
    'services.s6.title': 'Analytics & BI',
    'services.s7.desc': 'Nous plongéons au cœur de votre réalité métier avant d\'écrire la moindre ligne de code. Analyse des besoins, audit de maturité, feuille de route — parce que la bonne ingénierie commence par la compréhension.',
    'services.s7.title': 'Stratégie Data',
    'services.tag': 'Ce que nous cultivons',
    'services.title': 'Chaque couche de vos données,<br>soigneusement <em>ingénierée</em>.',
    'trust.airship': 'CRM & Notifications Push',
    'trust.besport': 'Le Réseau Social du Sport',
    'trust.beta': 'Services Numériques de l’État',
    'trust.ina': 'Institut National de l’Audiovisuel',
    'trust.label': 'Ils nous font confiance',
    'trust.opera': 'Opéra National de Paris',
  },
};
