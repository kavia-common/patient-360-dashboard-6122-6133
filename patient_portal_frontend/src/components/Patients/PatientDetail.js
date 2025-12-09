import React, { useEffect, useState } from 'react';
import {
  getPatientById,
  getPatientEncounters,
  getPatientVitals,
  getPatientMedications
} from '../../services/apiClient';

// PUBLIC_INTERFACE
export default function PatientDetail({ patientId, onBack }) {
  /** Detail view showing basic profile and tabs of info */
  const [patient, setPatient] = useState(null);
  const [encounters, setEncounters] = useState([]);
  const [vitals, setVitals] = useState([]);
  const [medications, setMedications] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!patientId) return;
    let mounted = true;

    Promise.allSettled([
      getPatientById(patientId),
      getPatientEncounters(patientId),
      getPatientVitals(patientId),
      getPatientMedications(patientId)
    ])
      .then(([p, e, v, m]) => {
        if (!mounted) return;
        if (p.status === 'fulfilled') setPatient(p.value);
        if (e.status === 'fulfilled') setEncounters(Array.isArray(e.value) ? e.value : (e.value?.items || []));
        if (v.status === 'fulfilled') setVitals(Array.isArray(v.value) ? v.value : (v.value?.items || []));
        if (m.status === 'fulfilled') setMedications(Array.isArray(m.value) ? m.value : (m.value?.items || []));
        const anyErr = [p,e,v,m].find(r => r.status === 'rejected');
        if (anyErr) setErr(anyErr.reason?.message || 'Some data failed to load');
      })
      .catch((e) => setErr(e?.message || 'Failed to load patient'));

    return () => { mounted = false; };
  }, [patientId]);

  if (!patientId) return null;

  return (
    <section className="card" aria-label="Patient details">
      <div className="card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>Patient Details</div>
        <button className="btn" onClick={onBack} aria-label="Back to patients">← Back</button>
      </div>
      <div className="card-body">
        {err && <div role="alert" style={{ color: 'var(--error)', marginBottom: 8 }}>{err}</div>}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{patient?.name || `${patient?.firstName || ''} ${patient?.lastName || ''}`.trim()}</div>
          <div style={{ color: 'var(--muted)' }}>
            {patient?.gender ? `${patient.gender} • ` : ''}{patient?.dob || patient?.dateOfBirth || ''}
          </div>
        </div>

        <div className="content-grid">
          <div className="card" style={{ gridColumn: 'span 6' }}>
            <div className="card-header">Recent Encounters</div>
            <div className="card-body">
              {encounters.length === 0 ? <div style={{ color: 'var(--muted)' }}>No encounters.</div> :
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {encounters.map((en, idx) => (
                    <li key={idx}>
                      <strong>{en.type || en.reason || 'Encounter'}</strong> — {en.date || en.timestamp || ''}
                    </li>
                  ))}
                </ul>}
            </div>
          </div>

          <div className="card" style={{ gridColumn: 'span 6' }}>
            <div className="card-header">Latest Vitals</div>
            <div className="card-body">
              {vitals.length === 0 ? <div style={{ color: 'var(--muted)' }}>No vitals.</div> :
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {vitals.map((v, idx) => (
                    <li key={idx}>{v.name || v.type}: {v.value} {v.unit || ''}</li>
                  ))}
                </ul>}
            </div>
          </div>

          <div className="card" style={{ gridColumn: 'span 12' }}>
            <div className="card-header">Medications</div>
            <div className="card-body">
              {medications.length === 0 ? <div style={{ color: 'var(--muted)' }}>No medications.</div> :
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {medications.map((m, idx) => (
                    <li key={idx}>
                      <strong>{m.name || m.drug}</strong> — {m.dose || ''} {m.frequency || ''}
                    </li>
                  ))}
                </ul>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
