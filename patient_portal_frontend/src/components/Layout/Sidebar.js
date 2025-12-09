import React from 'react';
import '../../App.css';

const VIEWS = {
  DASHBOARD: 'dashboard',
  PATIENTS: 'patients',
};

function NavItem({ active, icon, label, onClick }) {
  return (
    <div
      className={`nav-item ${active ? 'active' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      aria-current={active ? 'page' : undefined}
      aria-label={label}
    >
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Sidebar({ currentView, onNavigate }) {
  /** Sidebar with navigation links */
  return (
    <aside className="sidebar" aria-label="Primary">
      <div className="nav-group">
        <div style={{ fontWeight: 800, marginBottom: 12 }}>Patient 360</div>
        <NavItem
          label="Dashboard"
          icon="📊"
          active={currentView === VIEWS.DASHBOARD}
          onClick={() => onNavigate(VIEWS.DASHBOARD)}
        />
        <NavItem
          label="Patients"
          icon="🧑‍⚕️"
          active={currentView === VIEWS.PATIENTS}
          onClick={() => onNavigate(VIEWS.PATIENTS)}
        />
      </div>
      <div className="nav-group">
        <div className="badge">Ocean Professional</div>
      </div>
    </aside>
  );
}
