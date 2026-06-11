import { useEffect, useRef, useState } from 'react';

const navLinks = [
  { label: 'Matches', target: '#upcoming' },
  { label: 'Predictions', target: '#insights' },
  { label: 'Scoreboard', target: '#scoreboard' },
  { label: 'Analysis', target: '#methodology' },
  { label: 'About', target: '#footer' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);

      const sections = ['upcoming', 'insights', 'scoreboard', 'methodology', 'footer'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    const el = document.querySelector(target);
    if (el) {
      const offset = 64;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 transition-all"
      style={{
        background: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(255, 255, 255, 0.06)' : 'none',
        transitionDuration: '400ms',
      }}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-16 px-6 lg:px-10">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-white font-bold text-xl tracking-tight"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          YAL<span className="text-[#26ff6a]">VA</span>MOS
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const sectionId = link.target.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.label}
                href={link.target}
                onClick={(e) => handleNavClick(e, link.target)}
                className="relative text-[13px] font-medium uppercase tracking-[0.5px] transition-colors duration-200"
                style={{
                  color: isActive ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)',
                  fontFamily: 'Inter, sans-serif',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.target as HTMLElement).style.color = 'rgba(255,255,255,1)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#26ff6a]"
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button
            className="hidden sm:block text-[13px] font-medium uppercase tracking-[0.5px] transition-colors duration-200"
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'Inter, sans-serif',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = 'rgba(255,255,255,1)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
            }}
          >
            Log In
          </button>
          <button
            className="text-[13px] font-medium uppercase tracking-[0.5px] px-6 py-2.5 rounded-full transition-all duration-300"
            style={{
              background: '#26ff6a',
              color: '#0a0a0a',
              fontFamily: 'Inter, sans-serif',
              border: 'none',
              cursor: 'pointer',
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
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
