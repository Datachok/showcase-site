/* ============================================
   DATACHOKE STUDIOS — Background, Dark Mode, i18n, Peel Animation
   ============================================ */

(function () {
    'use strict';

    // ── Canvas Background: Enhanced floating artichoke petals + golden particles ──
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let petals = [];
    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    let time = 0;

    const COLORS_LIGHT = [
        { r: 183, g: 207, b: 183, a: 0.12 },
        { r: 143, g: 184, b: 143, a: 0.10 },
        { r: 212, g: 197, b: 249, a: 0.10 },
        { r: 255, g: 218, b: 179, a: 0.08 },
        { r: 255, g: 209, b: 220, a: 0.08 },
        { r: 200, g: 230, b: 208, a: 0.10 },
    ];

    const COLORS_DARK = [
        { r: 74, g: 122, b: 74, a: 0.10 },
        { r: 58, g: 79, b: 58, a: 0.08 },
        { r: 80, g: 70, b: 120, a: 0.08 },
        { r: 92, g: 74, b: 53, a: 0.07 },
        { r: 90, g: 60, b: 70, a: 0.06 },
        { r: 60, g: 95, b: 70, a: 0.08 },
    ];

    const PARTICLES_LIGHT = { r: 200, g: 180, b: 120, a: 0.25 };
    const PARTICLES_DARK = { r: 180, g: 160, b: 100, a: 0.15 };

    let currentColors = COLORS_LIGHT;
    let currentParticleColor = PARTICLES_LIGHT;

    function updateCanvasColors(theme) {
        currentColors = theme === 'dark' ? COLORS_DARK : COLORS_LIGHT;
        currentParticleColor = theme === 'dark' ? PARTICLES_DARK : PARTICLES_LIGHT;
        petals.forEach(function (p) {
            p.color = currentColors[Math.floor(Math.random() * currentColors.length)];
        });
    }

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createPetal() {
        var color = currentColors[Math.floor(Math.random() * currentColors.length)];
        var size = 40 + Math.random() * 140;
        var depth = 0.3 + Math.random() * 0.7; // parallax depth
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            size: size,
            depth: depth,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.004 * depth,
            vx: (Math.random() - 0.5) * 0.2 * depth,
            vy: (-0.05 - Math.random() * 0.15) * depth,
            color: color,
            scaleX: 0.5 + Math.random() * 0.5,
            scaleY: 0.7 + Math.random() * 0.3,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: 0.004 + Math.random() * 0.008,
            wobbleAmp: 0.2 + Math.random() * 0.6,
            // Double-petal shape variation
            petalType: Math.random() > 0.6 ? 'double' : 'single',
        };
    }

    function createParticle() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            size: 1 + Math.random() * 2.5,
            speed: 0.15 + Math.random() * 0.35,
            angle: Math.random() * Math.PI * 2,
            drift: (Math.random() - 0.5) * 0.3,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.03,
        };
    }

    function initPetals() {
        var count = Math.min(Math.floor((width * height) / 28000), 35);
        petals = [];
        for (var i = 0; i < count; i++) {
            petals.push(createPetal());
        }
        // Golden dust particles
        var pCount = Math.min(Math.floor((width * height) / 15000), 50);
        particles = [];
        for (var j = 0; j < pCount; j++) {
            particles.push(createParticle());
        }
    }

    function drawPetal(p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(p.scaleX, p.scaleY);

        var s = p.size;
        var r = p.color.r, g = p.color.g, b = p.color.b, a = p.color.a;

        // Main petal shape
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.5);
        ctx.bezierCurveTo(s * 0.35, -s * 0.35, s * 0.4, s * 0.1, 0, s * 0.5);
        ctx.bezierCurveTo(-s * 0.4, s * 0.1, -s * 0.35, -s * 0.35, 0, -s * 0.5);
        ctx.closePath();
        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        ctx.fill();

        // Vein line
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.4);
        ctx.quadraticCurveTo(s * 0.02, 0, 0, s * 0.4);
        ctx.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + (a * 0.4) + ')';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Double petal — add a second smaller one rotated
        if (p.petalType === 'double') {
            ctx.rotate(0.6);
            ctx.scale(0.6, 0.7);
            ctx.beginPath();
            ctx.moveTo(0, -s * 0.4);
            ctx.bezierCurveTo(s * 0.28, -s * 0.28, s * 0.32, s * 0.08, 0, s * 0.4);
            ctx.bezierCurveTo(-s * 0.32, s * 0.08, -s * 0.28, -s * 0.28, 0, -s * 0.4);
            ctx.closePath();
            ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + (a * 0.7) + ')';
            ctx.fill();
        }

        ctx.restore();
    }

    function drawParticle(p) {
        var c = currentParticleColor;
        p.pulse += p.pulseSpeed;
        var alpha = c.a * (0.5 + 0.5 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + alpha + ')';
        ctx.fill();
    }

    function updatePetal(p) {
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * p.wobbleAmp;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        var dx = p.x - mouse.x;
        var dy = p.y - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var radius = 120 + (1 - p.depth) * 60;
        if (dist < radius) {
            var force = ((radius - dist) / radius) * 0.6 * p.depth;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
        }

        if (p.y < -p.size) { p.y = height + p.size; p.x = Math.random() * width; }
        if (p.y > height + p.size) { p.y = -p.size; p.x = Math.random() * width; }
        if (p.x < -p.size) p.x = width + p.size;
        if (p.x > width + p.size) p.x = -p.size;
    }

    function updateParticle(p) {
        p.x += Math.cos(p.angle) * p.speed + p.drift;
        p.y += Math.sin(p.angle) * p.speed;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
    }

    function animate() {
        time++;
        ctx.clearRect(0, 0, width, height);

        // Draw particles (behind petals)
        for (var j = 0; j < particles.length; j++) {
            updateParticle(particles[j]);
            drawParticle(particles[j]);
        }

        // Draw petals sorted by depth (far petals first)
        for (var i = 0; i < petals.length; i++) {
            updatePetal(petals[i]);
            drawPetal(petals[i]);
        }

        requestAnimationFrame(animate);
    }

    resize();
    initPetals();
    animate();

    window.addEventListener('resize', function () { resize(); initPetals(); });
    document.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
    document.addEventListener('mouseleave', function () { mouse.x = -1000; mouse.y = -1000; });

    // ── i18n Translations ──
    var translations = {
        en: {
            'nav.services': 'Services',
            'nav.process': 'Process',
            'nav.about': 'About',
            'nav.cta': "Let's Talk",
            'hero.overline': 'Where data meets artistry',
            'hero.title': 'We peel back complexity,<br><span class="hero-accent">layer by layer.</span>',
            'hero.sub': 'Like an artichoke reveals its heart through patience and precision, we strip away data chaos to uncover the insights at your core.',
            'hero.cta1': 'Discover our craft',
            'hero.cta2': 'Start a project',
            'services.tag': 'What we cultivate',
            'services.title': 'Every layer of your data,<br>carefully <em>engineered</em>.',
            'services.s1.title': 'Data Architecture',
            'services.s1.desc': 'We design robust, scalable data architectures that grow with your ambitions. From data lakes to warehouses, we build foundations that last.',
            'services.s2.title': 'Pipeline Engineering',
            'services.s2.desc': 'Real-time or batch, we craft data pipelines that are reliable, observable, and elegant. Your data flows like it was always meant to.',
            'services.s3.title': 'AI Agents & MCP',
            'services.s3.desc': 'We build intelligent AI agents and MCP integrations that automate complex workflows. From conversational bots to autonomous pipelines, we make AI work for your data.',
            'services.s4.title': 'Cloud & Infrastructure',
            'services.s4.desc': 'AWS, GCP, Azure \u2014 we speak fluent cloud. We deploy and optimize your data infrastructure with IaC, Kubernetes, and battle-tested DevOps practices.',
            'services.s5.title': 'Data Governance',
            'services.s5.desc': 'Quality, lineage, compliance \u2014 we structure your data governance so every dataset is trusted, traceable, and regulation-ready. No surprises, just clarity.',
            'services.s6.title': 'Analytics & BI',
            'services.s6.desc': 'Dashboards that tell stories, metrics that drive decisions. We transform raw data into visual narratives your entire team can understand.',
            'services.s7.title': 'Data Strategy',
            'services.s7.desc': 'We dive deep into your business reality before writing a single line of code. Needs analysis, maturity audit, and a pragmatic roadmap \u2014 because great engineering starts with understanding.',
            'services.cta.title': 'Got a data challenge?',
            'services.cta.desc': "Let's peel it apart together.",
            'services.cta.btn': 'Get in touch',
            'process.tag': 'How we work',
            'process.title': 'Like an artichoke,<br>great data unfolds <em>patiently</em>.',
            'process.s1.title': 'Outer leaves \u2014 Discovery',
            'process.s1.desc': 'We start at the surface. Understanding your business context, existing infrastructure, pain points, and ambitions. No assumptions, just deep listening.',
            'process.s2.title': 'Middle layers \u2014 Design',
            'process.s2.desc': 'Architecture decisions, tech stack selection, data modeling. We design every layer with intention, ensuring each piece fits the whole.',
            'process.s3.title': 'Inner petals \u2014 Build',
            'process.s3.desc': 'Hands on keyboards. We build iteratively, with CI/CD from day one, comprehensive testing, and full documentation. No black boxes.',
            'process.s4.title': 'The heart \u2014 Deliver & Grow',
            'process.s4.desc': 'The best part. Your data platform goes live, your team gets trained, and we stay close for optimization. The heart of the artichoke is always worth the wait.',
            'about.tag': 'Why Datachoke?',
            'about.title': 'Data + Artichoke.<br>Yes, <em>seriously</em>.',
            'about.lead': 'The name started as a joke over an artichoke salad. It stuck because it turned out to be the perfect metaphor for what we do.',
            'about.p1': "An artichoke is complex, layered, and a little intimidating at first glance. But with the right technique and patience, you get to the heart \u2014 the most valuable part. That's exactly how we approach data engineering.",
            'about.p2': "We're a boutique studio of data engineers, architects, and analytics experts who believe that great data infrastructure should be as elegant as it is powerful. We don't do cookie-cutter solutions. Every engagement is crafted to fit.",
            'about.stat1': 'Projects delivered',
            'about.stat2': 'Data processed daily',
            'about.stat3': 'Pipeline uptime',
            'gallery.tag': 'Our philosophy',
            'gallery.title': 'A journey through art,<br>a philosophy for <em>data</em>.',
            'gallery.intro': 'From the Renaissance to modern art, every era taught the same truth: mastery is built layer by layer. We bring that same vision to data engineering.',
            'gallery.g1.title': 'The Birth of Venus',
            'gallery.g1.lesson': 'Beauty emerges from chaos \u2014 like clean data from raw streams.',
            'gallery.g3.title': 'The Creation of Adam',
            'gallery.g3.lesson': 'The spark of connection \u2014 when systems finally talk to each other.',
            'gallery.g4.title': 'The School of Athens',
            'gallery.g4.lesson': 'Architecture of knowledge \u2014 where every element has its place.',
            'gallery.g7.title': 'Sacred and Profane Love',
            'gallery.g7.lesson': 'Duality mastered \u2014 the balance between raw data and refined insight.',
            'gallery.g6.title': 'Medusa',
            'gallery.g6.lesson': 'Chiaroscuro \u2014 mastering light and shadow to find the truth in data.',
            'gallery.g5.title': 'Girl with a Pearl Earring',
            'gallery.g5.lesson': 'One perfect insight can illuminate everything.',
            'gallery.g8.title': 'The Starry Night',
            'gallery.g8.lesson': 'Seeing patterns where others see noise \u2014 the art of data visualization.',
            'gallery.g9.title': 'Composition VIII',
            'gallery.g9.lesson': 'Pure abstraction \u2014 geometry and color become the universal language of data.',
            'trust.label': 'They trust us',
            'trust.ina': 'Institut National de l\'Audiovisuel',
            'trust.beta': 'French Gov Digital Services',
            'trust.besport': 'The Sports Social Network',
            'trust.airship': 'CRM & Push Notifications',
            'trust.opera': 'Op\u00E9ra National de Paris',
            'renaissance.quote': 'Simplicity is the ultimate sophistication.',
            'renaissance.author': '\u2014 Leonardo da Vinci',
            'renaissance.connect': 'Like the Old Masters, we believe the most powerful work comes from mastering every layer before revealing the final masterpiece.',
            'contact.tag': 'Get in touch',
            'contact.title': 'Ready to get to<br>the <em>heart</em> of your data?',
            'contact.desc': "Tell us about your project and we'll get back to you within 24 hours. No sales pitch, just a real conversation about your data needs.",
            'contact.form.name': 'Your name',
            'contact.form.email': 'Email address',
            'contact.form.select': 'What do you need?',
            'contact.form.other': 'Something else',
            'contact.form.message': 'Tell us about your project',
            'contact.form.submit': 'Send message',
            'contact.form.sent': 'Message sent!',
            'footer.tagline': 'Data engineering, artfully crafted.',
            'footer.connect': 'Connect',
            'footer.rights': 'All rights reserved.',
            'footer.love': 'Crafted with care and a love for artichokes.',
        },
        fr: {
            'nav.services': 'Services',
            'nav.process': 'Approche',
            'nav.about': '\u00C0 propos',
            'nav.cta': 'Parlons-en',
            'hero.overline': 'L\u00E0 o\u00F9 la data rencontre l\u2019art',
            'hero.title': 'On d\u00E9cortique la complexit\u00E9,<br><span class="hero-accent">couche par couche.</span>',
            'hero.sub': "Comme un artichaut r\u00E9v\u00E8le son c\u0153ur avec patience et pr\u00E9cision, nous dissipons le chaos de vos donn\u00E9es pour r\u00E9v\u00E9ler les insights essentiels.",
            'hero.cta1': 'Notre savoir-faire',
            'hero.cta2': 'Lancer un projet',
            'services.tag': 'Ce que nous cultivons',
            'services.title': 'Chaque couche de vos donn\u00E9es,<br>soigneusement <em>ing\u00E9nier\u00E9e</em>.',
            'services.s1.title': 'Architecture Data',
            'services.s1.desc': "Nous concevons des architectures de donn\u00E9es robustes et \u00E9volutives qui grandissent avec vos ambitions. Des data lakes aux entrep\u00F4ts, nous b\u00E2tissons des fondations durables.",
            'services.s2.title': 'Ing\u00E9nierie Pipeline',
            'services.s2.desc': "Temps r\u00E9el ou batch, nous cr\u00E9ons des pipelines de donn\u00E9es fiables, observables et \u00E9l\u00E9gants. Vos donn\u00E9es coulent comme elles l'ont toujours voulu.",
            'services.s3.title': 'Agents IA & MCP',
            'services.s3.desc': "Nous construisons des agents IA intelligents et des int\u00E9grations MCP qui automatisent les workflows complexes. Des bots conversationnels aux pipelines autonomes, l'IA au service de vos donn\u00E9es.",
            'services.s4.title': 'Cloud & Infrastructure',
            'services.s4.desc': "AWS, GCP, Azure \u2014 nous parlons couramment cloud. Nous d\u00E9ployons et optimisons votre infrastructure data avec IaC, Kubernetes et des pratiques DevOps \u00E9prouv\u00E9es.",
            'services.s5.title': 'Gouvernance Data',
            'services.s5.desc': "Qualit\u00E9, lin\u00E9age, conformit\u00E9 \u2014 nous structurons votre gouvernance pour que chaque jeu de donn\u00E9es soit fiable, tra\u00E7able et conforme. Z\u00E9ro surprise, juste de la clart\u00E9.",
            'services.s6.title': 'Analytics & BI',
            'services.s6.desc': "Des dashboards qui racontent des histoires, des m\u00E9triques qui orientent les d\u00E9cisions. Nous transformons les donn\u00E9es brutes en r\u00E9cits visuels que toute votre \u00E9quipe peut comprendre.",
            'services.s7.title': 'Strat\u00E9gie Data',
            'services.s7.desc': "Nous plong\u00E9ons au c\u0153ur de votre r\u00E9alit\u00E9 m\u00E9tier avant d'\u00E9crire la moindre ligne de code. Analyse des besoins, audit de maturit\u00E9, feuille de route \u2014 parce que la bonne ing\u00E9nierie commence par la compr\u00E9hension.",
            'services.cta.title': 'Un d\u00E9fi data ?',
            'services.cta.desc': "\u00C9pluchons-le ensemble.",
            'services.cta.btn': 'Nous contacter',
            'process.tag': 'Notre approche',
            'process.title': "Comme un artichaut,<br>la bonne data se r\u00E9v\u00E8le <em>patiemment</em>.",
            'process.s1.title': 'Feuilles ext\u00E9rieures \u2014 D\u00E9couverte',
            'process.s1.desc': "On commence en surface. Comprendre votre contexte m\u00E9tier, l'infrastructure existante, les points de friction et les ambitions. Z\u00E9ro pr\u00E9suppos\u00E9, juste une \u00E9coute profonde.",
            'process.s2.title': 'Couches interm\u00E9diaires \u2014 Design',
            'process.s2.desc': "D\u00E9cisions d'architecture, choix de stack, mod\u00E9lisation de donn\u00E9es. Nous concevons chaque couche avec intention, en assurant la coh\u00E9rence de l'ensemble.",
            'process.s3.title': 'P\u00E9tales internes \u2014 Construction',
            'process.s3.desc': "Les mains sur le clavier. Nous construisons de mani\u00E8re it\u00E9rative, avec CI/CD d\u00E8s le premier jour, des tests complets et une documentation compl\u00E8te. Z\u00E9ro bo\u00EEte noire.",
            'process.s4.title': 'Le c\u0153ur \u2014 Livraison & Croissance',
            'process.s4.desc': "Le meilleur moment. Votre plateforme data est en production, votre \u00E9quipe est form\u00E9e, et nous restons proches pour l'optimisation. Le c\u0153ur de l'artichaut vaut toujours l'attente.",
            'about.tag': 'Pourquoi Datachoke ?',
            'about.title': 'Data + Artichaut.<br>Oui, <em>s\u00E9rieusement</em>.',
            'about.lead': "Le nom est n\u00E9 d'une blague autour d'une salade d'artichauts. Il est rest\u00E9 parce qu'il s'est av\u00E9r\u00E9 \u00EAtre la m\u00E9taphore parfaite de ce que nous faisons.",
            'about.p1': "Un artichaut est complexe, en couches, et un peu intimidant au premier regard. Mais avec la bonne technique et de la patience, on arrive au c\u0153ur \u2014 la partie la plus pr\u00E9cieuse. C'est exactement notre approche du data engineering.",
            'about.p2': "Nous sommes un studio boutique d'ing\u00E9nieurs data, d'architectes et d'experts analytics qui croient qu'une grande infrastructure de donn\u00E9es doit \u00EAtre aussi \u00E9l\u00E9gante que puissante. Pas de solutions standardis\u00E9es. Chaque mission est taill\u00E9e sur mesure.",
            'about.stat1': 'Projets livr\u00E9s',
            'about.stat2': 'Donn\u00E9es trait\u00E9es / jour',
            'about.stat3': 'Uptime pipelines',
            'gallery.tag': 'Notre philosophie',
            'gallery.title': 'Un voyage \u00e0 travers l\u2019art,<br>une philosophie pour la <em>data</em>.',
            'gallery.intro': 'De la Renaissance \u00e0 l\u2019art moderne, chaque \u00e9poque a enseign\u00e9 la m\u00eame v\u00e9rit\u00e9 : la ma\u00eetrise se construit couche par couche. Nous apportons cette m\u00eame vision au data engineering.',
            'gallery.g1.title': 'La Naissance de V\u00e9nus',
            'gallery.g1.lesson': 'La beaut\u00e9 \u00e9merge du chaos \u2014 comme des donn\u00e9es propres naissent des flux bruts.',
            'gallery.g3.title': 'La Cr\u00e9ation d\u2019Adam',
            'gallery.g3.lesson': 'L\u2019\u00e9tincelle de connexion \u2014 quand les syst\u00e8mes se parlent enfin.',
            'gallery.g4.title': 'L\u2019\u00c9cole d\u2019Ath\u00e8nes',
            'gallery.g4.lesson': 'Architecture du savoir \u2014 o\u00f9 chaque \u00e9l\u00e9ment trouve sa place.',
            'gallery.g7.title': 'Amour sacr\u00e9 et Amour profane',
            'gallery.g7.lesson': 'La dualit\u00e9 ma\u00eetris\u00e9e \u2014 l\u2019\u00e9quilibre entre donn\u00e9es brutes et insight raffin\u00e9.',
            'gallery.g6.title': 'M\u00e9duse',
            'gallery.g6.lesson': 'Le clair-obscur \u2014 ma\u00eetriser la lumi\u00e8re et l\u2019ombre pour trouver la v\u00e9rit\u00e9 dans les donn\u00e9es.',
            'gallery.g5.title': 'La Jeune Fille \u00e0 la perle',
            'gallery.g5.lesson': 'Un seul insight parfait peut tout illuminer.',
            'gallery.g8.title': 'La Nuit \u00e9toil\u00e9e',
            'gallery.g8.lesson': 'Voir des motifs l\u00e0 o\u00f9 d\u2019autres voient du bruit \u2014 l\u2019art de la data visualisation.',
            'gallery.g9.title': 'Composition VIII',
            'gallery.g9.lesson': 'L\u2019abstraction pure \u2014 g\u00e9om\u00e9trie et couleur deviennent le langage universel de la data.',
            'trust.label': 'Ils nous font confiance',
            'trust.ina': 'Institut National de l\u2019Audiovisuel',
            'trust.beta': 'Services Num\u00e9riques de l\u2019\u00c9tat',
            'trust.besport': 'Le R\u00e9seau Social du Sport',
            'trust.airship': 'CRM & Notifications Push',
            'trust.opera': 'Op\u00e9ra National de Paris',
            'renaissance.quote': 'La simplicit\u00E9 est la sophistication supr\u00EAme.',
            'renaissance.author': '\u2014 L\u00E9onard de Vinci',
            'renaissance.connect': 'Comme les grands Ma\u00EEtres, nous croyons que l\u2019\u0153uvre la plus puissante na\u00EEt de la ma\u00EEtrise de chaque couche avant de r\u00E9v\u00E9ler le chef-d\u2019\u0153uvre final.',
            'contact.tag': 'Nous contacter',
            'contact.title': 'Pr\u00EAt \u00E0 aller au<br><em>c\u0153ur</em> de vos donn\u00E9es ?',
            'contact.desc': "Parlez-nous de votre projet et nous vous recontactons sous 24h. Pas de pitch commercial, juste une vraie conversation sur vos besoins data.",
            'contact.form.name': 'Votre nom',
            'contact.form.email': 'Adresse email',
            'contact.form.select': 'De quoi avez-vous besoin ?',
            'contact.form.other': 'Autre chose',
            'contact.form.message': 'Parlez-nous de votre projet',
            'contact.form.submit': 'Envoyer',
            'contact.form.sent': 'Message envoy\u00E9 !',
            'footer.tagline': "Le data engineering, fait avec art.",
            'footer.connect': 'Suivez-nous',
            'footer.rights': 'Tous droits r\u00E9serv\u00E9s.',
            'footer.love': "Con\u00E7u avec soin et un amour pour les artichauts.",
        }
    };

    var currentLang = localStorage.getItem('datachoke-lang') || 'en';

    // ── Flag SVG builders ──
    function flagFR() {
        return '<rect width="20" height="40" fill="#002395"/><rect x="20" width="20" height="40" fill="#FFF"/><rect x="40" width="20" height="40" fill="#ED2939"/>';
    }
    function flagGB() {
        return '<rect width="60" height="40" fill="#012169"/>' +
            '<path d="M0 0L60 40M60 0L0 40" stroke="#FFF" stroke-width="6"/>' +
            '<path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" stroke-width="4"/>' +
            '<path d="M30 0V40M0 20H60" stroke="#FFF" stroke-width="10"/>' +
            '<path d="M30 0V40M0 20H60" stroke="#C8102E" stroke-width="6"/>';
    }

    function updateFlags() {
        var svg = currentLang === 'en' ? flagFR() : flagGB();
        document.querySelectorAll('.flag-icon').forEach(function (el) {
            el.innerHTML = svg;
        });
    }

    function applyTranslations() {
        var t = translations[currentLang];
        document.documentElement.lang = currentLang;

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (t[key] !== undefined) {
                el.textContent = t[key];
            }
        });

        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-html');
            if (t[key] !== undefined) {
                el.innerHTML = t[key];
            }
        });

        document.title = currentLang === 'fr'
            ? 'Datachoke Studios \u2014 Data Engineering, un Art du D\u00E9tail'
            : 'Datachoke Studios \u2014 Data Engineering, Artfully Crafted';

        updateFlags();
    }

    function toggleLang() {
        currentLang = currentLang === 'en' ? 'fr' : 'en';
        localStorage.setItem('datachoke-lang', currentLang);
        applyTranslations();
    }

    document.getElementById('lang-toggle').addEventListener('click', toggleLang);
    document.getElementById('lang-toggle-mobile').addEventListener('click', toggleLang);

    applyTranslations();

    // ── Dark Mode ──
    function getPreferredTheme() {
        var stored = localStorage.getItem('datachoke-theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('datachoke-theme', theme);
        updateCanvasColors(theme);
    }

    function toggleTheme() {
        var current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    }

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('theme-toggle-mobile').addEventListener('click', toggleTheme);

    applyTheme(getPreferredTheme());

    // ── Navbar scroll effect ──
    var navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // ── Mobile menu toggle ──
    var navToggle = document.getElementById('nav-toggle');
    var mobileMenu = document.getElementById('mobile-menu');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ── Scroll reveal ──
    var revealEls = document.querySelectorAll('[data-reveal]');

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var parent = entry.target.parentElement;
                var siblings = parent ? Array.from(parent.querySelectorAll('[data-reveal]')) : [];
                var siblingIndex = siblings.indexOf(entry.target);
                var delay = siblingIndex >= 0 ? siblingIndex * 100 : 0;
                setTimeout(function () { entry.target.classList.add('revealed'); }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });

    // Fallback for file:// or already-visible
    setTimeout(function () {
        revealEls.forEach(function (el) {
            if (!el.classList.contains('revealed')) {
                var rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight + 50) {
                    el.classList.add('revealed');
                }
            }
        });
    }, 1500);

    // ── Smooth anchor scrolling ──
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var top = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // ── Contact form (visual feedback) ──
    var form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = form.querySelector('.btn');
            var t = translations[currentLang];
            btn.textContent = t['contact.form.sent'];
            btn.style.background = 'var(--leaf-deep)';
            setTimeout(function () {
                btn.textContent = t['contact.form.submit'];
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    }

    // ── Artichoke Peel & Reset Loop Animation ──
    var artichoke = document.getElementById('artichoke-peel');
    if (artichoke) {
        var layers = artichoke.querySelectorAll('.art-layer');
        var core = artichoke.querySelector('.art-core');
        var layerCount = layers.length;
        var peelDirections = [
            { rotate: -35, tx: -120, ty: -60 },
            { rotate: 30, tx: 100, ty: -80 },
            { rotate: -25, tx: -90, ty: 50 },
            { rotate: 40, tx: 110, ty: 40 },
            { rotate: -20, tx: -70, ty: -90 },
            { rotate: 35, tx: 80, ty: 70 },
            { rotate: -30, tx: -100, ty: -40 },
        ];

        // States: 'idle' -> 'peeling' -> 'reveal' -> 'returning' -> 'idle'
        var peelState = 'idle';
        var peelIndex = 0;
        var peelTimers = [];

        function setIdleState() {
            layers.forEach(function (l) {
                l.classList.remove('peeling', 'peeled', 'returning');
                l.classList.add('idle');
                l.style.transform = '';
                l.style.opacity = '';
            });
            core.classList.remove('visible');
            peelState = 'idle';
            peelIndex = 0;
        }

        function startPeeling() {
            if (peelState !== 'idle') return;
            peelState = 'peeling';

            // Remove idle animations
            layers.forEach(function (l) { l.classList.remove('idle'); });

            // Peel layers one by one from outermost (index 0) to innermost
            for (var i = 0; i < layerCount; i++) {
                (function (idx) {
                    var timer = setTimeout(function () {
                        var layer = layers[idx];
                        var dir = peelDirections[idx % peelDirections.length];
                        layer.classList.add('peeling');
                        layer.style.transform = 'rotate(' + dir.rotate + 'deg) translate(' + dir.tx + 'px, ' + dir.ty + 'px) scale(0.3)';
                        layer.style.opacity = '0';

                        // After transition, mark as peeled
                        setTimeout(function () {
                            layer.classList.add('peeled');
                        }, 1200);

                        // If last layer, show core
                        if (idx === layerCount - 1) {
                            setTimeout(function () {
                                peelState = 'reveal';
                                core.classList.add('visible');
                                // Hold the reveal, then start returning
                                setTimeout(function () {
                                    startReturning();
                                }, 2000);
                            }, 1000);
                        }
                    }, idx * 600);
                    peelTimers.push(timer);
                })(i);
            }
        }

        function startReturning() {
            peelState = 'returning';
            core.classList.remove('visible');

            // Return layers from innermost to outermost
            for (var i = layerCount - 1; i >= 0; i--) {
                (function (idx) {
                    var reverseIdx = layerCount - 1 - idx;
                    var timer = setTimeout(function () {
                        var layer = layers[idx];
                        layer.classList.remove('peeling', 'peeled');
                        layer.classList.add('returning');
                        layer.style.transform = '';
                        layer.style.opacity = '';

                        // If first layer (outermost, last to return), go back to idle
                        if (idx === 0) {
                            setTimeout(function () {
                                setIdleState();
                                // Restart the cycle after a pause
                                setTimeout(function () {
                                    startPeeling();
                                }, 3000);
                            }, 800);
                        }
                    }, reverseIdx * 400);
                    peelTimers.push(timer);
                })(i);
            }
        }

        // Start animation when the artichoke scrolls into view
        var peelObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && peelState === 'idle') {
                    // Small delay to let the reveal animation happen first
                    setTimeout(function () {
                        startPeeling();
                    }, 1200);
                }
            });
        }, { threshold: 0.3 });

        setIdleState();
        peelObserver.observe(artichoke);
    }

    // ── Timeline: Scroll-driven crossfade gallery ──
    var timelineScroll = document.getElementById('timeline-scroll');
    if (timelineScroll) {
        var panels = timelineScroll.querySelectorAll('.timeline-panel');
        var progressFill = document.getElementById('timeline-progress-fill');
        var counterCurrent = document.getElementById('timeline-current');
        var panelCount = panels.length;
        var lastActiveIndex = 0;

        function updateTimeline() {
            var rect = timelineScroll.getBoundingClientRect();
            var scrollHeight = timelineScroll.offsetHeight - window.innerHeight;
            var scrolled = -rect.top;
            var progress = Math.max(0, Math.min(1, scrolled / scrollHeight));

            // Which panel should be active?
            var activeIndex = Math.min(Math.floor(progress * panelCount), panelCount - 1);

            if (activeIndex !== lastActiveIndex) {
                panels[lastActiveIndex].classList.remove('active');
                panels[activeIndex].classList.add('active');
                lastActiveIndex = activeIndex;
                if (counterCurrent) counterCurrent.textContent = activeIndex + 1;
            }

            // Update progress bar
            if (progressFill) {
                progressFill.style.width = ((activeIndex + 1) / panelCount * 100) + '%';
            }

            requestAnimationFrame(updateTimeline);
        }

        // Start the loop
        requestAnimationFrame(updateTimeline);
    }

})();
