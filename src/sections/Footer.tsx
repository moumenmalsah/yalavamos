const footerColumns = [
  {
    title: 'Platform',
    links: ['Matches', 'Predictions', 'Scoreboard', 'Analysis'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Terms', 'Privacy', 'Cookies', 'Responsible Gaming'],
  },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative"
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: 80,
        paddingBottom: 40,
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Logo */}
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-white font-bold text-xl tracking-tight inline-block"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              YAL<span className="text-[#26ff6a]">VA</span>MOS
            </a>
            <p
              className="mt-4"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                color: 'rgba(255, 255, 255, 0.35)',
                maxWidth: 280,
                lineHeight: 1.6,
              }}
            >
              The world's most advanced football prediction platform. World Cup 2026 and beyond.
            </p>
          </div>

          {/* Link Columns */}
          <div className="flex flex-wrap gap-12 lg:gap-20">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p
                  className="uppercase mb-4"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: 12,
                    letterSpacing: '0.8px',
                    color: 'rgba(255, 255, 255, 0.35)',
                  }}
                >
                  {column.title}
                </p>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="transition-colors duration-200"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 400,
                          fontSize: 14,
                          color: 'rgba(255, 255, 255, 0.6)',
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.color = 'rgba(255, 255, 255, 0.6)';
                        }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="mt-10"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
        />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              color: 'rgba(255, 255, 255, 0.35)',
            }}
          >
            &copy; 2026 YALAVAMOS. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {[
              {
                name: 'X',
                path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
              },
              {
                name: 'Instagram',
                path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
              },
              {
                name: 'YouTube',
                path: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
              },
            ].map((icon) => (
              <a
                key={icon.name}
                href="#"
                className="transition-opacity duration-200"
                style={{ opacity: 0.4 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = '0.4';
                }}
              >
                <svg width={20} height={20} viewBox="0 0 24 24" fill="white">
                  <path d={icon.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
