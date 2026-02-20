import { Fynix, Path } from "fynixui";

export default function Header() {
  return (
    <header style="position: sticky; top: 0; z-index: 50; background: rgba(10,10,15,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.05);">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:wght@400;500&display=swap');

        .header-nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s;
          letter-spacing: 0.01em;
        }
        .header-nav-link:hover { color: rgba(255,255,255,0.95); }

        .header-gh-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }
        .header-gh-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.9);
        }

        .header-logo-name {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: white;
          letter-spacing: -0.02em;
        }

        .header-divider {
          width: 1px;
          height: 16px;
          background: rgba(255,255,255,0.1);
        }

        .header-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: rgba(79,110,247,0.9);
          background: rgba(79,110,247,0.1);
          border: 1px solid rgba(79,110,247,0.2);
          padding: 2px 7px;
          border-radius: 100px;
          letter-spacing: 0.05em;
        }

        @media (max-width: 768px) {
          .header-nav { display: none !important; }
          .header-gh-btn { display: none !important; }
        }
      `}</style>

      <div style="max-width: 1100px; margin: 0 auto; padding: 0 16px; height: 58px; display: flex; align-items: center; justify-content: space-between;">

        {/* Logo */}
        <a href="/" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
          <img
            src="/fynixlogo.png"
            alt="Fynix Logo"
            style="width: 30px; height: 30px; border-radius: 8px;"
          />
          <span r-class="header-logo-name">Fynix</span>
          <span r-class="header-badge">v1.0</span>
        </a>

        {/* Nav */}
        <nav r-class="header-nav" style="display: flex; align-items: center; gap: 32px;">
          <Path
            to="/"
            value="Home"
            r-class="header-nav-link"
          />
          <Path
            to="/documentation/gettingstarted"
            value="Docs"
            r-class="header-nav-link"
          />
          <Path
            to="/components"
            value="Components"
            r-class="header-nav-link"
          />
          <div r-class="header-divider" />
          <a
            href="https://github.com/restygonzales/fynix"
            r-class="header-nav-link"
            style="display: flex; align-items: center; gap: 6px;"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="opacity: 0.7;">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </nav>

        {/* Right — Get Started CTA */}
        <a href="/documentation/gettingstarted" r-class="header-gh-btn">
          Get Started
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>

      </div>
    </header>
  );
}