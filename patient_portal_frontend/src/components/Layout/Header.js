import React from 'react';
import '../../App.css';

// PUBLIC_INTERFACE
export default function Header({ theme, onToggleTheme, onNavigateDashboard, onNavigatePatients }) {
  /** Top header with search and actions */
  return (
    <header className="header">
      <div className="header-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn btn-ghost" onClick={onNavigateDashboard} aria-label="Go to Dashboard">
            🏠 Dashboard
          </button>
          <button className="btn btn-ghost" onClick={onNavigatePatients} aria-label="Go to Patients">
            🧑‍⚕️ Patients
          </button>
        </div>
        <div className="search" role="search">
          <span aria-hidden="true">🔎</span>
          <input type="search" placeholder="Search patients..." aria-label="Search patients" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="kbd" aria-hidden="true">/?</span>
          <button
            className="btn"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            title={`Toggle theme (current: ${theme})`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </header>
  );
}
