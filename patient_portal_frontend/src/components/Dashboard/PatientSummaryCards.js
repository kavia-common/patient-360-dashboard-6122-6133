import React, { useEffect, useState } from 'react';
import { getPatients } from '../../services/apiClient';

// PUBLIC_INTERFACE
export default function PatientSummaryCards({ onViewPatients }) {
  /** Summary cards with counts; pulls basic list for count */
  const [count, setCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    getPatients()
      .then((list) => {
        const c = Array.isArray(list) ? list.length : (list?.items?.length || 0);
        if (mounted) setCount(c);
      })
      .catch(() => {
        if (mounted) setCount(0);
      });
    return () => { mounted = false; };
  }, []);

  return (
    <section aria-label="Summary">
      <div className="summary-grid">
        <div className="card summary-card">
          <div className="card-body">
            <div className="badge">Patients</div>
            <div className="value">{count}</div>
            <div style={{ color: 'var(--muted)' }}>Total registered patients</div>
          </div>
        </div>
        <div className="card summary-card">
          <div className="card-body">
            <div className="badge" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--secondary)'}}>Encounters</div>
            <div className="value">–</div>
            <div style={{ color: 'var(--muted)' }}>Recent 30 days</div>
          </div>
        </div>
        <div className="card summary-card">
          <div className="card-body">
            <div className="badge" style={{ background: 'rgba(37,99,235,0.12)', color: 'var(--primary)'}}>Vitals</div>
            <div className="value">–</div>
            <div style={{ color: 'var(--muted)' }}>Updated today</div>
          </div>
        </div>
        <div className="card summary-card">
          <div className="card-body">
            <div className="badge" style={{ background: 'rgba(239,68,68,0.12)', color: 'var(--error)'}}>Alerts</div>
            <div className="value">–</div>
            <div style={{ color: 'var(--muted)' }}>Active alerts</div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <button className="btn btn-primary" onClick={onViewPatients} aria-label="View Patients">
          View Patients
        </button>
      </div>
    </section>
  );
}
