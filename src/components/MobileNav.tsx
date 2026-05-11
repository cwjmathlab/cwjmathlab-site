import React, { useState } from 'react';

type NavItem = { path: string; label: string };

type Props = {
  items: NavItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
};

export const MobileNav: React.FC<Props> = ({ items, currentPath, onNavigate }) => {
  const [open, setOpen] = useState(false);

  const isActive = (path: string) =>
    path === '/schools' ? currentPath.startsWith('/schools') : currentPath === path;

  return (
    <div className="mobile-nav">
      <button
        type="button"
        aria-label="메뉴"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--bg-cream)',
          cursor: 'pointer',
          padding: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
      >
        <span style={{ width: 24, height: 2, background: 'currentColor', display: 'block' }} />
        <span style={{ width: 24, height: 2, background: 'currentColor', display: 'block' }} />
        <span style={{ width: 24, height: 2, background: 'currentColor', display: 'block' }} />
      </button>

      {open && (
        <div
          className="mobile-nav-drawer"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--primary-deep-forest)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 100,
          }}
        >
          {items.map(item => (
            <button
              key={item.path}
              onClick={() => {
                onNavigate(item.path);
                setOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: isActive(item.path) ? 'var(--accent-gold)' : 'var(--bg-cream)',
                fontSize: '1rem',
                fontWeight: isActive(item.path) ? 600 : 400,
                textAlign: 'left',
                padding: '1rem 1.5rem',
                cursor: 'pointer',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
