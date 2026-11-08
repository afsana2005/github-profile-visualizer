# AI features setup (Gemini)

This edition includes all five AI features:

1. **AI Developer Profile Analyzer** — profile presentation score, evidence-based strengths, improvement ideas, skill suggestions, career directions and data limitations.
2. **AI GitHub Chat Assistant** — chat with the searched developer's loaded public profile and repository data.
3. **AI Repository Reviewer** — review repository metadata and optionally pasted README content. It does not claim to inspect source code unless source is actually provided.
4. **AI Career Roadmap Generator** — a 30/60/90-day learning roadmap for a chosen career goal.
5. **Ask Your GitHub Data** — ask natural-language questions about the profile and loaded repository statistics.

## First-time setup (Windows / VS Code)

### 1. Configure your Gemini key

- Open `backend/.env.example` and use it as a reference.
- Create a new file named `.env` inside the `backend` folder. The full path must be `backend/.env`.
- Add the following values, replacing the placeholder with your own key:

```env
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
GEMINI_API_KEY=PASTE_YOUR_PRIVATE_KEY_HERE
GEMINI_MODEL=gemini-3.5-flash-lite
```

- Save the file. Do not share it, add it to screenshots, or commit it to GitHub. `backend/.gitignore` excludes it.
- If your AI Studio account lists a different available Gemini model, put that exact model ID in `GEMINI_MODEL`.

### 2. Install and run the frontend

Open a VS Code terminal at the project root (the folder containing the root `package.json`):

```bash
npm install
npm run dev
```

### 3. Install and run the backend

Open a **second** VS Code terminal:

```bash
cd backend
npm install
npm run dev
```

The backend should report `http://localhost:5000`. Keep both terminals running. The frontend normally opens at `http://localhost:5173`.

### 4. Use the AI features

Search for a public GitHub username. In the profile results, scroll below the AI Developer Analyzer to **AI GitHub Studio** and select one of its tabs:

- GitHub Chat
- Repo Reviewer
- Career Roadmap
- Ask GitHub Data

The AI Analyzer is shown separately above the studio.

## Troubleshooting

- Visit `http://localhost:5000/api/health` to confirm the backend is running.
- If the browser reports a connection error, ensure both frontend and backend terminals are running.
- If Gemini returns 401/403, check that the key is valid and its API access is enabled.
- If Gemini returns 429 or 503, check quota/model availability and retry later.
- If you change `.env`, restart the backend terminal.
- Do not put the Gemini key in the frontend `.env`, React source, or any `VITE_` variable. The key belongs only in `backend/.env`.

## Data and accuracy notes

The AI endpoints receive the searched user's public profile and up to 50 repositories loaded by this app. The repository reviewer also receives README text only if the user pastes it. It does not fetch or inspect private repositories or source files. AI responses can be wrong; public GitHub metadata is not proof of coding ability, employment history, or private contributions. GitHub unauthenticated API rate limits may apply.
