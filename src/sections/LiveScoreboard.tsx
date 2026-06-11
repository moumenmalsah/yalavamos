import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Team {
  name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  gd: number;
  points: number;
  flagColor: string;
}

interface Group {
  teams: Team[];
  nextMatch: string;
}

function generateWorldCupData(): Record<string, Group> {
  return {
    A: {
      teams: [
        { name: 'Qatar', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#8B1A1A' },
        { name: 'Ecuador', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#FFD700' },
        { name: 'Senegal', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#228B22' },
        { name: 'Netherlands', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#FF4500' },
      ],
      nextMatch: 'June 15, 2026 — Qatar vs Ecuador',
    },
    B: {
      teams: [
        { name: 'England', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#FFFFFF' },
        { name: 'Iran', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#228B22' },
        { name: 'USA', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#BF0A30' },
        { name: 'Wales', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#C8102E' },
      ],
      nextMatch: 'June 16, 2026 — England vs Iran',
    },
    C: {
      teams: [
        { name: 'Argentina', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#6CACE4' },
        { name: 'Saudi Arabia', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#006C35' },
        { name: 'Mexico', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#006847' },
        { name: 'Poland', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#DC143C' },
      ],
      nextMatch: 'June 17, 2026 — Argentina vs Saudi Arabia',
    },
    D: {
      teams: [
        { name: 'France', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#0055A4' },
        { name: 'Australia', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#FFD700' },
        { name: 'Denmark', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#C60C30' },
        { name: 'Tunisia', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#E70013' },
      ],
      nextMatch: 'June 18, 2026 — France vs Australia',
    },
    E: {
      teams: [
        { name: 'Spain', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#AA151B' },
        { name: 'Costa Rica', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#002B7F' },
        { name: 'Germany', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#000000' },
        { name: 'Japan', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#BC002D' },
      ],
      nextMatch: 'June 19, 2026 — Spain vs Costa Rica',
    },
    F: {
      teams: [
        { name: 'Belgium', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#000000' },
        { name: 'Canada', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#FF0000' },
        { name: 'Morocco', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#C1272D' },
        { name: 'Croatia', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#171796' },
      ],
      nextMatch: 'June 20, 2026 — Belgium vs Canada',
    },
    G: {
      teams: [
        { name: 'Brazil', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#009B3A' },
        { name: 'Serbia', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#C6363C' },
        { name: 'Switzerland', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#DA291C' },
        { name: 'Cameroon', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#007A5E' },
      ],
      nextMatch: 'June 21, 2026 — Brazil vs Serbia',
    },
    H: {
      teams: [
        { name: 'Portugal', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#006600' },
        { name: 'Ghana', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#FCD116' },
        { name: 'Uruguay', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#0038A8' },
        { name: 'South Korea', played: 0, wins: 0, draws: 0, losses: 0, gd: 0, points: 0, flagColor: '#CD2E3A' },
      ],
      nextMatch: 'June 22, 2026 — Portugal vs Ghana',
    },
  };
}

export default function LiveScoreboard() {
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const section = sectionRef.current;
    if (!grid || !section) return;

    const data = generateWorldCupData();
    grid.innerHTML = '';

    Object.entries(data).forEach(([groupName, groupData]) => {
      const card = document.createElement('div');
      card.className = 'group-card';
      card.style.cssText = 'background: #1a1a1a; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 16px; transition: border-color 0.3s ease, box-shadow 0.3s ease;';

      card.innerHTML = `
        <div class="group-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 12px; margin-bottom: 12px;">
          <span style="font-family: Inter, sans-serif; font-weight: 500; font-size: 12px; letter-spacing: 0.8px; text-transform: uppercase; color: #26ff6a;">GROUP ${groupName}</span>
          <span class="next-match" style="font-family: Inter, sans-serif; font-size: 11px; color: rgba(255,255,255,0.35);">${groupData.nextMatch}</span>
        </div>
        <table class="standings-table" style="width: 100%; border-collapse: collapse; font-family: 'IBM Plex Mono', monospace; font-size: 13px;">
          <thead>
            <tr>
              <th style="text-align: left; color: rgba(255, 255, 255, 0.35); font-weight: 400; padding: 6px 4px;">#</th>
              <th style="text-align: left; color: rgba(255, 255, 255, 0.35); font-weight: 400; padding: 6px 4px;">Team</th>
              <th style="text-align: center; color: rgba(255, 255, 255, 0.35); font-weight: 400; padding: 6px 4px;">P</th>
              <th style="text-align: center; color: rgba(255, 255, 255, 0.35); font-weight: 400; padding: 6px 4px;">W</th>
              <th style="text-align: center; color: rgba(255, 255, 255, 0.35); font-weight: 400; padding: 6px 4px;">D</th>
              <th style="text-align: center; color: rgba(255, 255, 255, 0.35); font-weight: 400; padding: 6px 4px;">L</th>
              <th style="text-align: center; color: rgba(255, 255, 255, 0.35); font-weight: 400; padding: 6px 4px;">GD</th>
              <th class="pts" style="text-align: center; color: #26ff6a; font-weight: 500; padding: 6px 4px;">PTS</th>
            </tr>
          </thead>
          <tbody>
            ${groupData.teams.map((team, idx) => `
              <tr style="transition: background 0.2s ease;">
                <td style="color: rgba(255,255,255,0.6); padding: 8px 4px;">${idx + 1}</td>
                <td style="color: #ffffff; padding: 8px 4px;">
                  <span class="flag-icon" style="width: 16px; height: 16px; border-radius: 50%; margin-right: 8px; display: inline-block; background: ${team.flagColor}; border: 1px solid rgba(255,255,255,0.1); vertical-align: middle;"></span>
                  ${team.name}
                </td>
                <td style="color: #ffffff; padding: 8px 4px; text-align: center;">${team.played}</td>
                <td style="color: #ffffff; padding: 8px 4px; text-align: center;">${team.wins}</td>
                <td style="color: #ffffff; padding: 8px 4px; text-align: center;">${team.draws}</td>
                <td style="color: #ffffff; padding: 8px 4px; text-align: center;">${team.losses}</td>
                <td style="color: #ffffff; padding: 8px 4px; text-align: center;">${team.gd > 0 ? '+' : ''}${team.gd}</td>
                <td class="pts" style="color: #26ff6a; font-weight: 500; padding: 8px 4px; text-align: center;">${team.points}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;

      // Hover effects
      card.addEventListener('mouseenter', () => {
        card.style.borderColor = 'rgba(38, 255, 106, 0.3)';
        card.style.boxShadow = '0 0 20px rgba(38, 255, 106, 0.05)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        card.style.boxShadow = 'none';
      });

      const rows = card.querySelectorAll('tbody tr');
      rows.forEach((row) => {
        row.addEventListener('mouseenter', () => {
          (row as HTMLElement).style.background = 'rgba(38, 255, 106, 0.04)';
        });
        row.addEventListener('mouseleave', () => {
          (row as HTMLElement).style.background = 'transparent';
        });
      });

      grid.appendChild(card);
    });

    // Entrance animation
    const cards = grid.querySelectorAll('.group-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section
      id="scoreboard"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(180deg, #111111 0%, #0a0a0a 100%)',
        padding: '120px 0',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-12">
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
            LIVE SCOREBOARD
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
            WORLD CUP 2026
          </h2>
          <p
            className="mt-2"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: 16,
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            All groups. All matches. Real-time updates.
          </p>
        </div>

        {/* Scoreboard Grid */}
        <div
          ref={gridRef}
          className="scoreboard-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 24,
          }}
        />
      </div>
    </section>
  );
}
