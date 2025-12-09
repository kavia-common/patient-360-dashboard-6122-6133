import React, { useMemo, useState } from 'react';
import './App.css';
import './index.css';
import { useTheme } from './hooks/useTheme';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import PatientSummaryCards from './components/Dashboard/PatientSummaryCards';
import RecentActivities from './components/Dashboard/RecentActivities';
import PatientList from './components/Patients/PatientList';
import PatientDetail from './components/Patients/PatientDetail';
import ChatPanel from './components/Chatbot/ChatPanel';

// Lightweight in-app routing using state (avoids adding router dependency)
const VIEWS = {
  DASHBOARD: 'dashboard',
  PATIENTS: 'patients',
  PATIENT_DETAIL: 'patient-detail',
};

// PUBLIC_INTERFACE
function App() {
  /** Theme hook applies data-theme and provides toggler */
  const { theme, toggleTheme } = useTheme();

  // View state
  const [view, setView] = useState(VIEWS.DASHBOARD);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const navigateToDashboard = () => setView(VIEWS.DASHBOARD);
  const navigateToPatients = () => {
    setSelectedPatientId(null);
    setView(VIEWS.PATIENTS);
  };
  const navigateToPatientDetail = (id) => {
    setSelectedPatientId(id);
    setView(VIEWS.PATIENT_DETAIL);
  };

  const content = useMemo(() => {
    switch (view) {
      case VIEWS.DASHBOARD:
        return (
          <div className="content-grid">
            <PatientSummaryCards onViewPatients={navigateToPatients} />
            <RecentActivities />
          </div>
        );
      case VIEWS.PATIENTS:
        return (
          <PatientList
            onSelectPatient={(p) => navigateToPatientDetail(p.id)}
          />
        );
      case VIEWS.PATIENT_DETAIL:
        return (
          <PatientDetail
            patientId={selectedPatientId}
            onBack={navigateToPatients}
          />
        );
      default:
        return <div>Not Found</div>;
    }
  }, [view, selectedPatientId]);

  return (
    <div className="app-shell">
      <Sidebar
        currentView={view}
        onNavigate={(v) => {
          if (v === VIEWS.DASHBOARD) navigateToDashboard();
          if (v === VIEWS.PATIENTS) navigateToPatients();
        }}
      />
      <div className="main-area">
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          onNavigateDashboard={navigateToDashboard}
          onNavigatePatients={navigateToPatients}
        />
        <main className="main-content" role="main" aria-live="polite">
          {content}
        </main>
      </div>
      <ChatPanel aria-label="Chatbot panel" />
    </div>
  );
}

export default App;
