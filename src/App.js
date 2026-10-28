import React, { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { PROFILE } from './content/site';

const NAV = [
  { to: '/#now', label: 'Now', wide: true },
  { to: '/#featured', label: 'Featured', wide: true },
  { to: '/#index', label: 'Index' },
];

const App = () => {
  const { pathname, hash } = useLocation();

  // Router navigation doesn't reset scroll; hash targets are scrolled by Home.
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="min-h-screen overflow-x-clip">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-20 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-background">
        Skip to content
      </a>
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-[60px] max-w-[1080px] items-center justify-between px-5 sm:px-6">
          <Link to="/" className="inline-flex min-h-[44px] items-center font-semibold tracking-[-0.01em]">
            {PROFILE.name}<span aria-hidden="true" className="text-accent">.</span>
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-0.5 text-sm">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className={`${n.wide ? 'hidden sm:inline-flex' : 'inline-flex'} min-h-[40px] items-center rounded-lg px-3 text-muted-foreground hover:bg-secondary hover:text-foreground`}>
                {n.label}
              </Link>
            ))}
            <Link to="/#contact" className="ml-1.5 inline-flex min-h-[40px] items-center rounded-lg bg-foreground px-3 text-background">
              Contact
            </Link>
          </nav>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-[1080px] px-5 sm:px-6">
        <Outlet />
      </main>
      <footer className="mx-auto max-w-[1080px] px-5 pb-10 font-mono text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} {PROFILE.name} · Mumbai · Every claim links to its source
      </footer>
    </div>
  );
};

export default App;
