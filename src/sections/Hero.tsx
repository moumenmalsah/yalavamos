import { useEffect, useRef } from 'react';

const tickerMatches = [
  { status: 'LIVE', home: 'BRA', homeScore: 2, away: 'ARG', awayScore: 0, minute: "78'" },
  { status: 'LIVE', home: 'FRA', homeScore: 1, away: 'GER', awayScore: 1, minute: "63'" },
  { status: 'FT', home: 'ESP', homeScore: 3, away: 'ITA', awayScore: 1, minute: 'FT' },
  { status: 'LIVE', home: 'ENG', homeScore: 0, away: 'NED', awayScore: 0, minute: "12'" },
  { status: 'LIVE', home: 'POR', homeScore: 2, away: 'URU', awayScore: 1, minute: "55'" },
  { status: 'FT', home: 'JPN', homeScore: 1, away: 'KOR', awayScore: 0, minute: 'FT' },
];

export default function Hero() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    let animationId: number;
    let position = 0;
    const speed = 0.8;

    const animate = () => {
      position -= speed;
      if (Math.abs(position) >= ticker.scrollWidth / 2) {
        position = 0;
      }
      ticker.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const tickerContent = [...tickerMatches, ...tickerMatches];

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background: 'rgba(10, 10, 10, 0.4)',
        }}
      />

      {/* Hero Content */}
      <div
        className="relative flex flex-col justify-center h-full px-6 lg:px-10"
        style={{ zIndex: 3, maxWidth: 1400, margin: '0 auto', paddingTop: '10vh' }}
      >
        <h1
          className="text-white uppercase"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(40px, 6vw, 72px)',
            lineHeight: 1.05,
            letterSpacing: '-1.5px',
          }}
        >
          PREDICT THE
          <br />
          <span className="text-[#26ff6a]">BEAUTIFUL GAME</span>
        </h1>

        <p
          className="mt-6"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: 1.65,
            color: 'rgba(255, 255, 255, 0.6)',
            maxWidth: 480,
          }}
        >
          Expert predictions, real-time scores, and in-depth analysis for World Cup 2026.
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <a
            href="#upcoming"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('#upcoming');
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 64;
                window.scrollTo({ top, behavior: 'smooth' });
              }
            }}
            className="inline-block text-[14px] font-medium uppercase tracking-[0.5px] px-8 py-3.5 rounded-full transition-all duration-300"
            style={{
              background: '#26ff6a',
              color: '#0a0a0a',
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = '#4dff88';
              (e.target as HTMLElement).style.boxShadow = '0 0 24px rgba(38, 255, 106, 0.3)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = '#26ff6a';
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            View Predictions
          </a>
          <a
            href="#scoreboard"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('#scoreboard');
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 64;
                window.scrollTo({ top, behavior: 'smooth' });
              }
            }}
            className="inline-block text-[14px] font-medium uppercase tracking-[0.5px] px-8 py-3.5 rounded-full transition-all duration-300"
            style={{
              background: 'transparent',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.06)';
              (e.target as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = 'transparent';
              (e.target as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            Watch Live Scores
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{ zIndex: 4, bottom: 80 }}
      >
        <div className="relative" style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.3)' }}>
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: 6,
              height: 6,
              background: '#26ff6a',
              animation: 'scrollBounce 2s infinite',
            }}
          />
        </div>
        <style>{`
          @keyframes scrollBounce {
            0%, 100% { top: 0; }
            50% { top: 34px; }
          }
        `}</style>
      </div>

      {/* Live Ticker Bar */}
      <div
        className="absolute bottom-0 left-0 w-full overflow-hidden"
        style={{
          zIndex: 4,
          height: 48,
          background: 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          ref={tickerRef}
          className="flex items-center h-full whitespace-nowrap"
          style={{ willChange: 'transform' }}
        >
          {tickerContent.map((match, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 mx-8"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 13,
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              <span
                className="uppercase"
                style={{
                  color: match.status === 'LIVE' ? '#26ff6a' : 'rgba(255,255,255,0.35)',
                  fontWeight: 500,
                }}
              >
                {match.status}
              </span>
              <span className="text-white">{match.home}</span>
              <span className="text-[#26ff6a] font-medium">
                {match.homeScore}-{match.awayScore}
              </span>
              <span className="text-white">{match.away}</span>
              <span style={{ color: 'rgba(255,255,255,0.35)' }}>{match.minute}</span>
              <span className="mx-4" style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
