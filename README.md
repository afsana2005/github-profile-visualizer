# GitHub Profile Visualizer

A responsive React + Vite application for exploring public GitHub profiles, comparing developers, saving favorite profiles, analyzing repositories, and exporting a PDF developer report.

## Features

- Search public GitHub profiles and view profile details.
- Save favorite profiles locally in the browser.
- Compare two developers using followers, following, public repositories, loaded repository stars/forks, and language profiles.
- Advanced Developer Analytics: language distribution, repository push activity, contribution calendar, top repositories, and an illustrative developer score.
- Repository Insights: search repositories, filter by language, sort by stars/forks/last updated, and chart the most-starred loaded projects.
- Download a PDF developer report with profile metrics, repository totals, languages, and top repositories.
- Responsive layout and dark/light theme.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Data notes

The app uses GitHub's public REST API without authentication. GitHub applies unauthenticated rate limits, so repeated searches may temporarily be limited. Up to 100 public repositories are loaded per profile for repository charts, comparisons, and reports. Star/fork totals shown in repository analysis therefore describe the loaded repository sample, not necessarily every repository on an account. Contribution calendar data is fetched by `react-github-calendar` from its configured contribution data service. The developer score is an illustrative formula, not an official GitHub rating or a measure of coding skill.

## Main technologies

React, Vite, React Router, Tailwind CSS, Recharts, react-github-calendar, jsPDF, React Icons, and the GitHub REST API.


## Gemini AI backend starter

A separate Express backend starter is included in `backend/`. See [README_AI_SETUP.md](./README_AI_SETUP.md) for API-key setup, installation, running both servers, and testing the Gemini connection. The AI feature interfaces will be added in stages after the backend connection is verified.
