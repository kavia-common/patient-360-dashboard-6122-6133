"use strict";

/**
 * Chat client that defaults to backend relay.
 * Optional direct Gemini mode controlled by REACT_APP_GEMINI_DIRECT=false by default.
 */

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "";
const GEMINI_DIRECT = String(process.env.REACT_APP_GEMINI_DIRECT || "false").toLowerCase() === "true";
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "";
const GEMINI_MODEL = process.env.REACT_APP_GEMINI_MODEL || "gemini-1.5-flash";

// PUBLIC_INTERFACE
export async function sendMessage(message, context = []) {
  /** Sends a chat message, returning assistant response text. */
  if (!GEMINI_DIRECT) {
    const resp = await fetch(`${BASE_URL}/chatbot/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, context }),
    });
    if (!resp.ok) {
      const t = await resp.text().catch(() => "");
      throw new Error(`Chat request failed: ${resp.status} ${t}`);
    }
    const data = await resp.json().catch(() => ({}));
    return data.reply || data.text || "";
  }

  // Direct Gemini mode (disabled by default)
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY missing for direct mode.");
  }

  // Minimalistic direct call via generative language API (pseudo; keep lightweight)
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;
  const payload = {
    contents: [
      ...(Array.isArray(context) ? context : []).map((c) => ({ role: c.role || "user", parts: [{ text: c.text || "" }]})),
      { role: "user", parts: [{ text: message }] },
    ],
  };
  const resp = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const t = await resp.text().catch(() => "");
    throw new Error(`Gemini request failed: ${resp.status} ${t}`);
  }
  const data = await resp.json().catch(() => ({}));
  const text =
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("\n") ||
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "";
  return text;
}

export default { sendMessage };
