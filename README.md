# FitLog

A responsive workout library and daily workout planner built with Next.js App Router, TypeScript, Tailwind CSS, and the FitLog API.

## Features
- Browse the workout library and sort by duration, calories, or rating.
- View dynamic workout details and instructions.
- Add up to five unique workouts to today's plan.
- Save workouts for later in a separate list.
- Mark workouts complete and remove items.
- Persist plan and saved workouts with localStorage.
- Responsive dark UI with lime accents.
- Loading, error, and not-found states.

## Tech Stack
Next.js, React, TypeScript, Tailwind CSS v4, Lucide React, Sonner.

## Getting Started
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## API
- All workouts: https://api.abcz.workers.dev/api/fitlog
- One workout: https://api.abcz.workers.dev/api/fitlog/:id

## Git Commit Plan
1. chore: initialize Next.js project
2. feat: add FitLog global layout and navigation
3. feat: build workout library and sorting
4. feat: add dynamic workout detail page
5. feat: add plan and saved workout context
6. feat: persist workout plan in localStorage
7. feat: add responsive styling and feedback
8. docs: add project README
