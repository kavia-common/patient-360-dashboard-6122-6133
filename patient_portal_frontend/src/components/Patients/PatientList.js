import React, { useEffect, useState } from 'react';
import { getPatients } from '../../services/apiClient';

// PUBLIC_INTERFACE
export default function PatientList({ onSelectPatient }) {
  /** List of patients; click navigates to details */
  const [patients, setPatients] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    let mounted = true;
    getPatients()
      .then((list) => {
        const arr = Array.isArray(list) ? list : (list?.items || []);
        if (mounted) setPatients(arr);
      })
      .catch((e) => {
        if (mounted) setErr(e?.message || 'Failed to load patients');
      });
    return () => { mounted = false; };
  }, []);

  return (
    <section className="card" aria-label="Patients list">
      <div className="card-header">Patients</div>
      <div className="card-body">
        {err && <div role="alert" style={{ color: 'var(--error)', marginBottom: 8 }}>{err}</div>}
        <div className="list">
          {patients.map((p) => (
            <div className="list-item" key={p.id}>
              <div>
                <div style={{ fontWeight: 600 }}>{p.name || `${p.firstName || ''} ${p.lastName || ''}`.trim()}</div>
                <div style={{ color: 'var(--muted)', fontSize: 12 }}>
                  {p.gender ? `${p.gender} • ` : ''}{p.dob || p.dateOfBirth || ''}
                </div>
              </div>
              <button className="btn" onClick={() => onSelectPatient(p)} aria-label={`Open details for ${p.name || p.id}`}>
                Open
              </button>
            </div>
          ))}
          {patients.length === 0 && !err && (
            <div style={{ color: 'var(--muted)' }}>No patients found.</div>
          )}
        </div>
      </div>
    </section>
  );
}
