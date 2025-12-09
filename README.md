# patient-360-dashboard-6122-6133 (Frontend)

Quick start:
- cd patient_portal_frontend
- cp .env.example .env
- Ensure REACT_APP_BACKEND_URL points to your backend (default http://localhost:3001)
- npm install
- npm start

Environment:
- REACT_APP_BACKEND_URL=http://localhost:3001
- REACT_APP_GEMINI_DIRECT=false
- REACT_APP_GEMINI_API_KEY=
- REACT_APP_GEMINI_MODEL=gemini-1.5-flash

API client:
- src/services/apiClient.js reads REACT_APP_BACKEND_URL and prefixes all requests with it.

Smoke checks (manual):
- Check backend health: curl $REACT_APP_BACKEND_URL/
- Login via UI (or POST /auth/login) to obtain a token; subsequent calls include Authorization automatically in the app.
- Patients list should render using GET $REACT_APP_BACKEND_URL/patients (requires Authorization).
- Chatbot UI uses POST $REACT_APP_BACKEND_URL/chatbot/send behind the scenes.
