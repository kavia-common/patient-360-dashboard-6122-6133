import React, { useEffect, useState } from 'react';
import { getRecentActivities } from '../../services/apiClient';

// PUBLIC_INTERFACE
export default function RecentActivities() {
  /** List of recent activities; shows graceful empty */
  const [items, setItems] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    let mounted = true;
    getRecentActivities()
      .then((list) => {
        const arr = Array.isArray(list) ? list : (list?.items || []);
        if (mounted) setItems(arr);
      })
      .catch((e) => {
        if (mounted) setErr(e?.message || 'Failed to load activities');
      });
    return () => { mounted = false; };
  }, []);

  return (
    <section className="activities card" aria-label="Recent activities">
      <div className="card-header">Recent Activities</div>
      <div className="card-body">
        {err && <div role="alert" style={{ color: 'var(--error)', marginBottom: 8 }}>{err}</div>}
        {items.length === 0 ? (
          <div style={{ color: 'var(--muted)' }}>No recent activities.</div>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {items.map((a, idx) => (
              <li key={idx} style={{ marginBottom: 8 }}>
                <span style={{ fontWeight: 600 }}>{a?.title || 'Activity'}</span>
                <div style={{ color: 'var(--muted)', fontSize: 12 }}>{a?.timestamp || ''}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
