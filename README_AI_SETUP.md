# Add Gemini AI to GitHub Profile Visualizer

This ZIP preserves your existing React/Vite application and adds a separate Express backend starter. The five AI features are not all implemented yet; this is the secure foundation for building them one at a time.

## 1. Get a Gemini API key

Create an API key in Google AI Studio: https://aistudio.google.com/app/apikey

Keep the key private. Do not place it in React code or commit it to GitHub.

## 2. Configure the backend

Open a terminal in the project root, then run:

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` in the `backend` folder, then put your own key in `GEMINI_API_KEY`.

Example:

```env
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
GEMINI_API_KEY=your_real_key_here
GEMINI_MODEL=gemini-flash-latest
```

## 3. Start the backend

In the backend terminal:

```bash
npm run dev
```

Expected message:

```text
AI backend running at http://localhost:5000
```

Check `http://localhost:5000/api/health` in your browser.

## 4. Start the existing frontend

Open a second terminal at the project root (not inside backend):

```bash
npm install
npm run dev
```

Open the Vite URL, normally `http://localhost:5173`.

## 5. Test the Gemini endpoint (PowerShell)

```powershell
$body = @{ prompt = "Explain what a GitHub developer profile is in two sentences." } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/ai/test" -Method Post -ContentType "application/json" -Body $body
```

A successful response contains `success: true` and an AI-generated `response`.

## Existing project files confirmed

- `src/pages/Home.jsx` searches GitHub profiles and renders `ProfileCard`.
- `src/components/ProfileCard.jsx` is the best place to add the AI analyzer panel.
- `src/components/analytics/DeveloperAnalytics.jsx` contains current profile analytics.
- `src/components/RepositoryInsights.jsx` contains repository filtering and charts.
- `src/pages/Compare.jsx` contains developer comparison.
- `src/services/githubApi.js` fetches public GitHub profile and repository data.

## Next implementation stages

1. AI Developer Profile Analyzer.
2. AI GitHub Chat Assistant.
3. AI Repository Reviewer (fetch README content through a backend GitHub API service).
4. AI Career Roadmap Generator.
5. Ask Your GitHub Data (ground answers in metrics already loaded by the frontend).

## Security and deployment notes

- `backend/.env` is ignored by Git.
- Never expose the Gemini API key in Vite variables such as `VITE_GEMINI_API_KEY`.
- Add authentication, request rate limiting, stricter validation and usage limits before deploying a public backend.
- Configure `FRONTEND_ORIGIN` to your deployed frontend origin when deploying.
- Gemini API availability, model names, quotas and pricing depend on your Google AI Studio account and current model availability.


## AI Developer Profile Analyzer

The first AI feature is integrated into the profile page. Search for a GitHub username, then scroll to **AI Developer Analyzer** and select **Analyze with AI**.

### Run the application

Open two VS Code terminals.

Terminal 1 — frontend (project root):
```bash
npm install
npm run dev
```

Terminal 2 — backend:
```bash
cd backend
npm install
npm run dev
```

Create `backend/.env` from `backend/.env.example` and add your own Gemini API key. Never put the key in a frontend `.env` file or commit `backend/.env` to GitHub.

The frontend calls `http://localhost:5000/api/ai/analyze-profile` by default. If your backend runs elsewhere, create a root `.env` with:
```env
VITE_AI_API_URL=http://localhost:5000
```

The analyzer uses public profile fields and up to 30 repositories. Its score is a profile-presentation estimate, not a measure of programming ability.
