import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import UpcomingMatches from './sections/UpcomingMatches';
import MatchInsights from './sections/MatchInsights';
import LiveScoreboard from './sections/LiveScoreboard';
import PredictionMethodology from './sections/PredictionMethodology';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <Navigation />
      <Hero />
      <UpcomingMatches />
      <MatchInsights />
      <LiveScoreboard />
      <PredictionMethodology />
      <Footer />
    </div>
  );
}
