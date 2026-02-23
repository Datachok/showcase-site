/* ============================================
   DATACHOKE STUDIOS — Background, Dark Mode, i18n
   ============================================ */

(function () {
    'use strict';

    // ── Canvas Background: Floating artichoke petals ──
    // (defined first so other code can reference updateCanvasColors)
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let petals = [];
    let mouse = { x: -1000, y: -1000 };

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

    let currentColors = COLORS_LIGHT;

    function updateCanvasColors(theme) {
        currentColors = theme === 'dark' ? COLORS_DARK : COLORS_LIGHT;
        petals.forEach(p => {
            p.color = currentColors[Math.floor(Math.random() * currentColors.length)];
        });
    }

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createPetal() {
        const color = currentColors[Math.floor(Math.random() * currentColors.length)];
        const size = 40 + Math.random() * 120;
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            size,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.003,
            vx: (Math.random() - 0.5) * 0.15,
            vy: -0.1 - Math.random() * 0.2,
            color,
            scaleX: 0.6 + Math.random() * 0.4,
            scaleY: 0.8 + Math.random() * 0.2,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: 0.005 + Math.random() * 0.01,
            wobbleAmp: 0.3 + Math.random() * 0.5,
        };
    }

    function initPetals() {
        const count = Math.min(Math.floor((width * height) / 25000), 40);
        petals = [];
        for (let i = 0; i < count; i++) {
            petals.push(createPetal());
        }
    }

    function drawPetal(p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(p.scaleX, p.scaleY);

        ctx.beginPath();
        const s = p.size;
        ctx.moveTo(0, -s * 0.5);
        ctx.bezierCurveTo(s * 0.35, -s * 0.35, s * 0.4, s * 0.1, 0, s * 0.5);
        ctx.bezierCurveTo(-s * 0.4, s * 0.1, -s * 0.35, -s * 0.35, 0, -s * 0.5);
        ctx.closePath();

        const { r, g, b, a } = p.color;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(0, -s * 0.4);
        ctx.quadraticCurveTo(s * 0.02, 0, 0, s * 0.4);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.restore();
    }

    function updatePetal(p) {
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * p.wobbleAmp;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
            const force = (150 - dist) / 150 * 0.8;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
        }

        if (p.y < -p.size) { p.y = height + p.size; p.x = Math.random() * width; }
        if (p.y > height + p.size) { p.y = -p.size; p.x = Math.random() * width; }
        if (p.x < -p.size) p.x = width + p.size;
        if (p.x > width + p.size) p.x = -p.size;
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < petals.length; i++) {
            updatePetal(petals[i]);
            drawPetal(petals[i]);
        }
        requestAnimationFrame(animate);
    }

    resize();
    initPetals();
    animate();

    window.addEventListener('resize', () => { resize(); initPetals(); });
    document.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    document.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });

    // ── i18n Translations ──
    const translations = {
        en: {
            'nav.services': 'Services',
            'nav.process': 'Process',
            'nav.about': 'About',
            'nav.cta': "Let's Talk",
            'hero.badge': 'Data Engineering Studio',
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
            'services.s3.title': 'Cloud & Infrastructure',
            'services.s3.desc': 'AWS, GCP, Azure \u2014 we speak fluent cloud. We deploy and optimize your data infrastructure with IaC, Kubernetes, and battle-tested DevOps practices.',
            'services.s4.title': 'Analytics & BI',
            'services.s4.desc': 'Dashboards that tell stories, metrics that drive decisions. We transform raw data into visual narratives your entire team can understand.',
            'services.s5.title': 'Data Strategy',
            'services.s5.desc': "Not sure where to start? We audit your data maturity, map your needs, and chart a pragmatic roadmap to data excellence.",
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
            'hero.badge': 'Studio Data Engineering',
            'hero.title': 'On d\u00E9cortique la complexit\u00E9,<br><span class="hero-accent">couche par couche.</span>',
            'hero.sub': "Comme un artichaut r\u00E9v\u00E8le son c\u0153ur avec patience et pr\u00E9cision, nous dissipons le chaos de vos donn\u00E9es pour r\u00E9v\u00E9ler les insights essentiels.",
            'hero.cta1': 'D\u00E9couvrir notre savoir-faire',
            'hero.cta2': 'Lancer un projet',
            'services.tag': 'Ce que nous cultivons',
            'services.title': 'Chaque couche de vos donn\u00E9es,<br>soigneusement <em>ing\u00E9nier\u00E9e</em>.',
            'services.s1.title': 'Architecture Data',
            'services.s1.desc': "Nous concevons des architectures de donn\u00E9es robustes et \u00E9volutives qui grandissent avec vos ambitions. Des data lakes aux entrep\u00F4ts, nous b\u00E2tissons des fondations durables.",
            'services.s2.title': 'Ing\u00E9nierie Pipeline',
            'services.s2.desc': "Temps r\u00E9el ou batch, nous cr\u00E9ons des pipelines de donn\u00E9es fiables, observables et \u00E9l\u00E9gants. Vos donn\u00E9es coulent comme elles l'ont toujours voulu.",
            'services.s3.title': 'Cloud & Infrastructure',
            'services.s3.desc': "AWS, GCP, Azure \u2014 nous parlons couramment cloud. Nous d\u00E9ployons et optimisons votre infrastructure data avec IaC, Kubernetes et des pratiques DevOps \u00E9prouv\u00E9es.",
            'services.s4.title': 'Analytics & BI',
            'services.s4.desc': "Des dashboards qui racontent des histoires, des m\u00E9triques qui orientent les d\u00E9cisions. Nous transformons les donn\u00E9es brutes en r\u00E9cits visuels que toute votre \u00E9quipe peut comprendre.",
            'services.s5.title': 'Strat\u00E9gie Data',
            'services.s5.desc': "Pas s\u00FBr par o\u00F9 commencer ? Nous auditons votre maturit\u00E9 data, cartographions vos besoins et tra\u00E7ons une feuille de route pragmatique vers l'excellence.",
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

    let currentLang = localStorage.getItem('datachoke-lang') || 'en';

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
        const svg = currentLang === 'en' ? flagFR() : flagGB();
        document.querySelectorAll('.flag-icon').forEach(el => {
            el.innerHTML = svg;
        });
    }

    function applyTranslations() {
        const t = translations[currentLang];
        document.documentElement.lang = currentLang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key] !== undefined) {
                el.textContent = t[key];
            }
        });

        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
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
        const stored = localStorage.getItem('datachoke-theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('datachoke-theme', theme);
        updateCanvasColors(theme);
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    }

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('theme-toggle-mobile').addEventListener('click', toggleTheme);

    applyTheme(getPreferredTheme());

    // ── Navbar scroll effect ──
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // ── Mobile menu toggle ──
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

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
    // Use a lower threshold and bigger rootMargin to ensure elements reveal
    // even when opening as a local file
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

    // Fallback: if after 1.5s some elements still haven't revealed (e.g. already in viewport), force reveal
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
})();
