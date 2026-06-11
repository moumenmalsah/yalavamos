import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const blocks = [
  {
    title: 'TEAM ANALYSIS',
    text: 'Deep statistical breakdowns of every squad — from possession metrics to xG trends. Our models process 10,000+ data points per match to identify the factors that decide games.',
    titleSide: 'left' as const,
  },
  {
    title: 'PLAYER INSIGHTS',
    text: 'Track star performers, injury updates, and form ratings. Predictive models highlight which players are primed to make the difference when it matters most.',
    titleSide: 'right' as const,
  },
];

export default function MatchInsights() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reveals = section.querySelectorAll('[data-effect-reveal]');

    reveals.forEach((el, index) => {
      const contentTitle = el.querySelector('[data-reveal-title]') as HTMLElement;
      const contentText = el.querySelector('[data-reveal-text]') as HTMLElement;

      if (!contentTitle || !contentText) return;

      const fromX = index === 0 ? -500 : 500;

      // Title animation
      gsap.fromTo(
        contentTitle,
        { xPercent: fromX },
        {
          xPercent: 0,
          duration: 1.1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 60%',
            end: '+=60%',
            scrub: true,
          },
        }
      );

      // Text animation
      gsap.fromTo(
        contentText,
        { xPercent: fromX },
        {
          xPercent: 0,
          duration: 1.1,
          ease: 'power1.out',
          delay: 0.05,
          scrollTrigger: {
            trigger: el,
            start: 'top 60%',
            end: '+=60%',
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger && section.contains(t.vars.trigger as Element)) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="insights"
      ref={sectionRef}
      className="relative"
      style={{ background: '#111111', padding: '120px 0' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {blocks.map((block, i) => (
          <div
            key={i}
            data-effect-reveal
            className="relative"
            style={{
              display: 'grid',
              placeItems: 'center',
              margin: i === 0 ? '0 auto 80px' : '80px auto 0',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 1000,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                alignItems: 'center',
                columnGap: '5vw',
              }}
            >
              {block.titleSide === 'left' ? (
                <>
                  <h3
                    data-reveal-title
                    className="uppercase"
                    style={{
                      gridArea: '1 / 1 / 2 / 2',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      fontSize: 'clamp(2rem, 5vw, 4rem)',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                      color: '#ffffff',
                      margin: 0,
                    }}
                  >
                    {block.title}
                  </h3>
                  <p
                    data-reveal-text
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: 16,
                      lineHeight: 1.65,
                      color: 'rgba(255, 255, 255, 0.6)',
                      margin: 0,
                      maxWidth: 480,
                    }}
                  >
                    {block.text}
                  </p>
                </>
              ) : (
                <>
                  <p
                    data-reveal-text
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: 16,
                      lineHeight: 1.65,
                      color: 'rgba(255, 255, 255, 0.6)',
                      margin: 0,
                      maxWidth: 480,
                    }}
                  >
                    {block.text}
                  </p>
                  <h3
                    data-reveal-title
                    className="uppercase"
                    style={{
                      gridArea: '1 / 2 / 2 / 3',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      fontSize: 'clamp(2rem, 5vw, 4rem)',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                      color: '#ffffff',
                      margin: 0,
                    }}
                  >
                    {block.title}
                  </h3>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
