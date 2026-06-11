import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

interface MatchCard {
  home: string;
  homeFlag: string;
  away: string;
  awayFlag: string;
  date: string;
  confidence: number;
  odds: string;
}

const matchCards: MatchCard[] = [
  { home: 'USA', homeFlag: '#BF0A30', away: 'Argentina', awayFlag: '#6CACE4', date: 'June 12, 2026', confidence: 78, odds: '1.85' },
  { home: 'Brazil', homeFlag: '#009B3A', away: 'France', awayFlag: '#0055A4', date: 'June 13, 2026', confidence: 65, odds: '2.10' },
  { home: 'Mexico', homeFlag: '#006847', away: 'England', awayFlag: '#FFFFFF', date: 'June 14, 2026', confidence: 72, odds: '1.95' },
  { home: 'Germany', homeFlag: '#000000', away: 'Spain', awayFlag: '#AA151B', date: 'June 15, 2026', confidence: 58, odds: '2.35' },
  { home: 'Canada', homeFlag: '#FF0000', away: 'Portugal', awayFlag: '#006600', date: 'June 16, 2026', confidence: 81, odds: '1.72' },
  { home: 'Italy', homeFlag: '#0066CC', away: 'Netherlands', awayFlag: '#FF4500', date: 'June 17, 2026', confidence: 45, odds: '2.80' },
  { home: 'Belgium', homeFlag: '#000000', away: 'Croatia', awayFlag: '#171796', date: 'June 18, 2026', confidence: 69, odds: '2.05' },
  { home: 'Morocco', homeFlag: '#C1272D', away: 'Uruguay', awayFlag: '#0038A8', date: 'June 19, 2026', confidence: 52, odds: '2.55' },
  { home: 'Senegal', homeFlag: '#228B22', away: 'Ecuador', awayFlag: '#FFD700', date: 'June 20, 2026', confidence: 63, odds: '2.20' },
  { home: 'Japan', homeFlag: '#BC002D', away: 'Denmark', awayFlag: '#C60C30', date: 'June 21, 2026', confidence: 35, odds: '3.50' },
  { home: 'Australia', homeFlag: '#FFD700', away: 'Switzerland', awayFlag: '#DA291C', date: 'June 22, 2026', confidence: 41, odds: '3.10' },
  { home: 'Colombia', homeFlag: '#FCD116', away: 'Egypt', awayFlag: '#C8102E', date: 'June 23, 2026', confidence: 48, odds: '2.70' },
  { home: 'Serbia', homeFlag: '#C6363C', away: 'Ghana', awayFlag: '#FCD116', date: 'June 24, 2026', confidence: 55, odds: '2.40' },
  { home: 'Poland', homeFlag: '#DC143C', away: 'South Korea', awayFlag: '#CD2E3A', date: 'June 25, 2026', confidence: 50, odds: '2.60' },
];

function getCardOffset(
  index: number,
  total: number,
  cardWidth: number,
  gap: number
): { x: number; y: number; z: number; rotateY: number; scale: number; opacity: number } {
  const middleIndex = (total - 1) / 2;
  const totalCardWidth = cardWidth + gap;
  const direction = index < middleIndex ? -1 : 1;
  const isEdge = index === 0 || index === total - 1;
  const isCenter = index === middleIndex;

  const x = (index - middleIndex) * totalCardWidth * 1.2;

  const z = isEdge ? -1200 : isCenter ? 100 : -400;
  const rotateY = direction * (isEdge ? 55 : isCenter ? 0 : 25);
  const arcY = Math.pow((index - middleIndex) / (middleIndex + 1), 2) * -200;
  const scale = isCenter ? 1.25 : 0.85;
  const opacity = isCenter ? 1.0 : isEdge ? 0.2 : 0.45;

  return { x, y: arcY, z, rotateY, scale, opacity };
}

export default function UpcomingMatches() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const currentIndexRef = useRef(Math.floor(matchCards.length / 2));
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragInstanceRef = useRef<Draggable[] | null>(null);
  const isDraggingRef = useRef(false);

  const setupCarousel = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const cardWidth = 280;
    const cardGap = 20;
    const total = cards.length;

    cards.forEach((card, i) => {
      const offset = getCardOffset(i, total, cardWidth, cardGap);
      (card as any)._offset = offset;
      gsap.set(card, {
        x: offset.x,
        y: offset.y,
        z: offset.z,
        rotateY: offset.rotateY,
        scale: offset.scale,
        opacity: offset.opacity,
      });
    });
  }, []);

  const animateToCard = useCallback((targetIndex: number) => {
    const cards = cardsRef.current;
    const total = cards.length;
    const adjustedIndex = ((targetIndex % total) + total) % total;
    currentIndexRef.current = adjustedIndex;

    cards.forEach((card, i) => {
      const offset = (card as any)._offset;
      if (!offset) return;

      const isTarget = i === adjustedIndex;
      const rotateY = i < adjustedIndex ? 30 : i > adjustedIndex ? -30 : 0;

      gsap.to(card, {
        x: offset.x,
        y: offset.y,
        z: isTarget ? offset.z + 100 : offset.z - 100,
        rotateY: rotateY,
        scale: isTarget ? 1.3 : 0.9,
        opacity: isTarget ? 1 : Math.max(offset.opacity - 0.2, 0.1),
        duration: 0.8,
        ease: 'elastic.out(1, 0.7)',
      });
    });

    // Update dots
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
      (dot as HTMLElement).style.background = i === adjustedIndex ? '#26ff6a' : 'rgba(255,255,255,0.15)';
    });
  }, []);

  const scheduleAutoAdvance = useCallback(() => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    autoTimerRef.current = setTimeout(() => {
      if (!isDraggingRef.current) {
        currentIndexRef.current++;
        animateToCard(currentIndexRef.current);
        scheduleAutoAdvance();
      }
    }, 6000);
  }, [animateToCard]);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const cursor = cursorRef.current;
    if (!section || !wrapper || !cursor) return;

    // Settle layout then setup
    const initTimer = setTimeout(() => {
      setupCarousel();
      animateToCard(Math.floor(matchCards.length / 2));
      scheduleAutoAdvance();
    }, 100);

    // Custom cursor
    const handleCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        duration: 0.2,
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
    };

    // Draggable
    const container = containerRef.current;
    if (container) {
      dragInstanceRef.current = Draggable.create(container, {
        type: 'x',
        inertia: true,
        onDragStart: function () {
          isDraggingRef.current = true;
          gsap.to(cursor, { width: 24, height: 24, duration: 0.2 });
          if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
        },
        onDragEnd: function () {
          isDraggingRef.current = false;
          gsap.to(cursor, { width: 12, height: 12, duration: 0.2 });

          const dragDistance = this.x;
          const step = 340;
          const indexShift = Math.round(-dragDistance / step);
          const newIndex = currentIndexRef.current + indexShift;

          animateToCard(newIndex);
          scheduleAutoAdvance();

          // Reset container position
          gsap.to(container, { x: 0, duration: 0.3 });
        },
      });

      wrapper.addEventListener('mouseenter', handleMouseEnter);
      wrapper.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mousemove', handleCursor);
    }

    // Handle resize
    const handleResize = () => {
      setupCarousel();
      animateToCard(currentIndexRef.current);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimer);
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleCursor);
      wrapper.removeEventListener('mouseenter', handleMouseEnter);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
      if (dragInstanceRef.current) {
        dragInstanceRef.current.forEach((d) => d.kill());
      }
    };
  }, [setupCarousel, animateToCard, scheduleAutoAdvance]);

  return (
    <>
      {/* Custom cursor dot */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none rounded-full"
        style={{
          width: 12,
          height: 12,
          background: '#26ff6a',
          zIndex: 100,
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          left: 0,
          top: 0,
        }}
      />

      <section
        id="upcoming"
        ref={sectionRef}
        className="relative"
        style={{ height: '300vh', background: '#0a0a0a' }}
      >
        <div
          ref={wrapperRef}
          className="sticky top-0 w-full overflow-hidden flex flex-col items-center justify-center"
          style={{
            height: '100vh',
            perspective: 1000,
            cursor: 'none',
          }}
        >
          {/* Section Header */}
          <div className="absolute top-0 left-0 w-full text-center" style={{ paddingTop: 80, zIndex: 10, pointerEvents: 'none' }}>
            <p
              className="uppercase"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: 12,
                letterSpacing: '0.8px',
                color: '#26ff6a',
              }}
            >
              UPCOMING MATCHES
            </p>
            <h2
              className="uppercase mt-3"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(32px, 4vw, 48px)',
                letterSpacing: '-1px',
                color: '#ffffff',
              }}
            >
              FIXTURES &amp; PREDICTIONS
            </h2>
          </div>

          {/* Carousel Container */}
          <div
            ref={containerRef}
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              transformStyle: 'preserve-3d',
              transform: 'translate3d(-50%, -40%, 0)',
            }}
          >
            {matchCards.map((match, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
                className="absolute"
                style={{
                  width: 280,
                  height: 200,
                  transformStyle: 'preserve-3d',
                  borderRadius: 8,
                  background: '#1a1a1a',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                }}
              >
                {/* Teams */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block rounded-full"
                      style={{ width: 32, height: 32, background: match.homeFlag, border: '2px solid rgba(255,255,255,0.2)' }}
                    />
                    <span
                      className="text-white font-semibold"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: 16 }}
                    >
                      {match.home}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.35)',
                    }}
                  >
                    vs
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-white font-semibold"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: 16 }}
                    >
                      {match.away}
                    </span>
                    <span
                      className="inline-block rounded-full"
                      style={{ width: 32, height: 32, background: match.awayFlag, border: '2px solid rgba(255,255,255,0.2)' }}
                    />
                  </div>
                </div>

                {/* Date */}
                <p
                  className="mt-3"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  {match.date}
                </p>

                {/* Confidence Bar */}
                <div className="mt-3" style={{ width: 80, height: 2, background: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
                  <div
                    style={{
                      width: `${match.confidence}%`,
                      height: '100%',
                      background: '#26ff6a',
                      borderRadius: 1,
                    }}
                  />
                </div>

                {/* Odds */}
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 12,
                    color: '#26ff6a',
                  }}
                >
                  {match.odds}
                </p>
              </div>
            ))}
          </div>

          {/* Carousel Footer - Dots & Hint */}
          <div
            className="absolute bottom-0 left-0 w-full flex flex-col items-center"
            style={{ paddingBottom: 60, zIndex: 10, pointerEvents: 'none' }}
          >
            <div className="flex items-center gap-2 mb-3">
              {matchCards.map((_, i) => (
                <span
                  key={i}
                  className="carousel-dot inline-block rounded-full transition-colors duration-300"
                  style={{
                    width: 6,
                    height: 6,
                    background: i === Math.floor(matchCards.length / 2) ? '#26ff6a' : 'rgba(255,255,255,0.15)',
                  }}
                />
              ))}
            </div>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              Drag to browse matches
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
