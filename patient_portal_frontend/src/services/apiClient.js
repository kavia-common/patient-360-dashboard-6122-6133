"use strict";

/**
 * Lightweight API client for backend services.
 * Reads REACT_APP_BACKEND_URL and exposes typed helpers.
 */

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "";

/** Internal fetch wrapper with JSON handling and error propagation */
async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  const resp = await fetch(url, { ...options, headers });
  const contentType = resp.headers.get("content-type") || "";
  let data = null;
  if (contentType.includes("application/json")) {
    data = await resp.json().catch(() => null);
  } else {
    data = await resp.text().catch(() => null);
  }
  if (!resp.ok) {
    const err = new Error((data && data.message) || `Request failed: ${resp.status}`);
    err.status = resp.status;
    err.data = data;
    throw err;
  }
  return data;
}

// PUBLIC_INTERFACE
export async function getPatients() {
  /** Fetch patients from /patients */
  return request(`/patients`, { method: "GET" });
}

// PUBLIC_INTERFACE
export async function getPatientById(id) {
  /** Fetch patient details by ID */
  return request(`/patients/${encodeURIComponent(id)}`, { method: "GET" });
}

// PUBLIC_INTERFACE
export async function getPatientEncounters(id) {
  /** Fetch patient encounters */
  return request(`/patients/${encodeURIComponent(id)}/encounters`, { method: "GET" });
}

// PUBLIC_INTERFACE
export async function getPatientVitals(id) {
  /** Fetch patient vitals */
  return request(`/patients/${encodeURIComponent(id)}/vitals`, { method: "GET" });
}

// PUBLIC_INTERFACE
export async function getPatientMedications(id) {
  /** Fetch patient medications */
  return request(`/patients/${encodeURIComponent(id)}/medications`, { method: "GET" });
}

// PUBLIC_INTERFACE
export async function getRecentActivities() {
  /** Fetch recent activities for dashboard */
  return request(`/activities`, { method: "GET" });
}

export default {
  getPatients,
  getPatientById,
  getPatientEncounters,
  getPatientVitals,
  getPatientMedications,
  getRecentActivities,
};
