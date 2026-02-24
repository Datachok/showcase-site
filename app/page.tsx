'use client';

import { ThemeProvider } from '@/lib/theme-context';
import { I18nProvider } from '@/lib/i18n-context';
import { translations } from '@/lib/translations';
import CanvasBackground from '@/components/CanvasBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Marquee from '@/components/Marquee';
import Process from '@/components/Process';
import About from '@/components/About';
import Trust from '@/components/Trust';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  return (
    <ThemeProvider>
      <I18nProvider translations={translations}>
        <CanvasBackground />
        <Navbar />
        <Hero />
        <Services />
        <Marquee />
        <Process />
        <About />
        <Trust />
        <Contact />
        <Footer />
        <ScrollReveal />
      </I18nProvider>
    </ThemeProvider>
  );
}
