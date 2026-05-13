# JumbleM

JumbleM is a React/Vite single-page web application for building a music-and-location social flow. Users create a listening identity, draft a "vibe" with a song, environment, energy score, and GPS label, sync that vibe into a queue, and see the same data represented as social posts and map pins.

The repository also includes a lightweight Express API that persists demo user profiles, posts, activities, and notification counts to a local JSON file.

## What the app does

- **Home** introduces the product concept and links into the core journeys.
- **Discover** lets a user enter a song, handle, self-assessment, environment, tempo, energy level, and location. Submitting this form creates a local track/post/map record and, when the API is running, publishes a backend category post.
- **Vibe Queue** shows synced tracks, lets users switch the active track, edit/delete queued tracks, and previews the selected location pin.
- **Travel Map** visualizes synced locations, filters users by energy range, and highlights top liked tags.
- **Login/Profile** creates a profile with a unique nickname and vibe category, displays the saved profile, and shows recent activity/notification state.

## Tech stack

### Frontend

| Area | Technology | Where it is used |
| --- | --- | --- |
| UI framework | React 18 | Component tree, context providers, hooks, and pages under `src/` |
| Build tool/dev server | Vite 5 | `npm run dev`, `npm run build`, `npm run preview`, and React plugin setup |
| Routing | React Router DOM 6 | Browser routing for `/`, `/discover`, `/sync-your-sound`, `/login`, and `/travel-map` |
| State management | React Context + hooks | `JumbleMFlowContext` for local vibe/track/map state and `UserSessionContext` for profile/API state |
| Styling | Plain CSS | Global shell styles in `src/app.css`; route-specific CSS injected from `public/styles/` |
| Assets | SVG | Logo assets in `public/assets/` |

### Backend

| Area | Technology | Where it is used |
| --- | --- | --- |
| HTTP API | Express 5 | API routes in `server/index.js` |
| Persistence | JSON file storage | `server/data/app-data.json` is read/written by the Express API |
| Runtime | Node.js ES modules | `type: module` in `package.json`, native `fs/promises`, `path`, and `url` imports |

## Project structure

```text
.
├── index.html                    # Vite HTML entry point
├── package.json                  # npm scripts and dependencies
├── vite.config.js                # Vite React plugin and /api proxy to Express
├── public/
│   ├── assets/                   # Static SVG logos
│   └── styles/                   # Page-specific CSS loaded dynamically by pages
├── server/
│   ├── data/app-data.json        # Local demo database for users/posts
│   └── index.js                  # Express API
└── src/
    ├── App.jsx                   # Route table
    ├── main.jsx                  # React root, router, and providers
    ├── app.css                   # Global application CSS
    ├── components/               # Shared Navbar, Footer, and Logo
    ├── context/                  # Flow and session state providers
    ├── hooks/                    # Page CSS injection and brand animation hooks
    ├── lib/api.js                # Frontend API client helpers
    └── pages/                    # Route components
```

## Application architecture

### Entry and routing

`src/main.jsx` mounts the React app into `#root`, wraps it in `BrowserRouter`, then provides user-session state and JumbleM flow state to every route.

`src/App.jsx` defines the route map:

- `/` -> `HomePage`
- `/discover` -> `DiscoverPage`
- `/sync-your-sound` -> `SyncYourSoundPage`
- `/login` -> `LoginPage`
- `/travel-map` -> `TravelMapPage`
- any unknown route redirects to `/`

### Local vibe flow state

`src/context/JumbleMFlowContext.jsx` owns the browser-local product flow. It stores data under the `jumblem-flow-state-v3` localStorage key and exposes:

- `draft` and `updateDraft()` for the Discover form.
- `createTrackFromDraft()` for creating a synced track.
- `tracks`, `activeTrack`, `queue`, `posts`, `topTags`, and `mapPins` derived from saved tracks.
- `setActiveTrack()`, `updateTrack()`, `deleteTrack()`, and `likeTrack()` for queue/post interactions.

This context is what makes a Discover submission appear in the Vibe Queue and Travel Map without a required backend.

### User session and API state

`src/context/UserSessionContext.jsx` owns backend-backed profile state. It stores the current nickname under the `jumblem-current-nickname` localStorage key, fetches the active profile on load, polls for updates every 8 seconds, and exposes helpers for:

- nickname availability checks,
- manual registration,
- Google-profile-style registration,
- refreshing the current user,
- publishing category posts,
- marking notifications as read.

### API client

`src/lib/api.js` centralizes `fetch()` calls to `/api/...` endpoints. During development, Vite proxies `/api` requests to `http://localhost:3001`.

### Express API

`server/index.js` provides a small JSON-backed API:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Health check |
| `GET` | `/api/users/check-nickname?nickname=...` | Validate nickname availability |
| `POST` | `/api/users/register` | Create a manual user profile |
| `POST` | `/api/users/google` | Create or refresh a Google-style user profile |
| `GET` | `/api/users/:nickname` | Fetch a public user profile |
| `POST` | `/api/users/:nickname/notifications/read` | Clear a user's notification count |
| `POST` | `/api/posts` | Create a category post and update related user activities/notifications |

The backend is intended for local/demo persistence, not production-grade storage. It writes directly to `server/data/app-data.json`.

## Getting started

### Prerequisites

- Node.js 18+ recommended.
- npm, included with Node.js.

### Install dependencies

```bash
npm install
```

### Run the frontend

```bash
npm run dev
```

Vite starts the web app, usually at `http://localhost:5173`.

### Run the backend API

Open a second terminal and run:

```bash
npm run server
```

The Express API listens on `http://localhost:3001` by default. The Vite dev server proxies frontend `/api` calls to this API.

### Build for production

```bash
npm run build
```

The production bundle is emitted to `dist/`.

### Preview the production build

```bash
npm run preview
```

## Development notes

- Route-specific styles are injected by `usePageStylesheets()`, so new pages should either reuse `src/app.css` or add a CSS file under `public/styles/` and load it from the page component.
- The app currently uses localStorage for the main synced vibe flow and the Express JSON file for profile/post persistence. Keep this split in mind when debugging data that appears in one feature but not another.
- The API has no authentication layer yet; profile identity is based on the stored nickname in the browser.
- `server/data/app-data.json` is demo data and can be reset manually when needed.

## Additional documentation

See [FEATURE_DEVELOPMENT.md](./FEATURE_DEVELOPMENT.md) for a feature-by-feature roadmap and suggested implementation paths for continuing development.
