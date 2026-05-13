# JumbleM Feature Development Guide

This guide gives future contributors an easier path for extending the main features that already exist in JumbleM. Use it together with the root README for setup and architecture context.

## Quick orientation

Before adding a feature, identify which state layer it needs:

1. **Pure UI or route-local behavior**: update the relevant page in `src/pages/` and its CSS in `public/styles/`.
2. **Cross-page vibe/track/map behavior**: update `src/context/JumbleMFlowContext.jsx` so Discover, Vibe Queue, and Travel Map all receive the same derived data.
3. **Profile, activity, notification, or multi-user behavior**: update `server/index.js`, `src/lib/api.js`, and `src/context/UserSessionContext.jsx`.

## Existing feature map

| Feature area | Main files | Current capability | Best next step |
| --- | --- | --- | --- |
| Home/onboarding | `src/pages/HomePage.jsx`, `public/styles/styles.css` | Landing page and navigation to the product journeys | Add clearer CTAs, onboarding state, or personalized recommendations when a profile exists |
| Discover/vibe creation | `src/pages/DiscoverPage.jsx`, `src/context/JumbleMFlowContext.jsx`, `public/styles/discover.css` | Creates a local synced track and optionally publishes a backend category post | Add validation, richer location input, mood presets, and API-backed post history |
| Vibe Queue | `src/pages/SyncYourSoundPage.jsx`, `src/context/JumbleMFlowContext.jsx`, `public/styles/sync-sound.css` | Displays, edits, deletes, and selects synced tracks | Add audio previews, drag-and-drop ordering, playback state, and persistent server-side queues |
| Travel Map | `src/pages/TravelMapPage.jsx`, `src/context/JumbleMFlowContext.jsx`, `public/styles/travel-map.css` | Displays map pins, posts, tags, and energy filtering | Replace decorative pins with real geocoding/map coordinates and backend-fed public posts |
| Login/Profile | `src/pages/LoginPage.jsx`, `src/context/UserSessionContext.jsx`, `src/lib/api.js`, `server/index.js`, `public/styles/login.css` | Creates local demo users, stores active nickname, shows activity, and clears notifications | Add real authentication, profile editing, sign out, and protected profile operations |
| Notifications/activity | `src/components/Navbar.jsx`, `src/context/UserSessionContext.jsx`, `server/index.js` | Shows notification count, records signup/post/notification activity, clears on open | Add real-time updates, notification preferences, and unread/read activity detail |
| Styling/branding | `src/app.css`, `public/styles/*.css`, `src/components/Logo.jsx`, `public/assets/` | Static branded UI with page-level CSS bundles | Consolidate design tokens, improve responsive coverage, and add component-level style conventions |

## Recommended development workflow

1. Run `npm install` if dependencies are not installed.
2. Start the API with `npm run server`.
3. Start the frontend with `npm run dev`.
4. Develop against the relevant route.
5. Run `npm run build` before opening a pull request.
6. If backend behavior changed, test the affected endpoint with curl or a REST client.

## Feature implementation paths

### 1. Improve Discover submissions

**Goal:** Make vibe creation more robust and useful.

Suggested steps:

1. Add client-side validation in `DiscoverPage.jsx` for required fields and numeric energy bounds.
2. Add validation messages to `public/styles/discover.css`.
3. Extend `defaultDraft` in `JumbleMFlowContext.jsx` if new fields are needed.
4. Update `buildTrackFromDraft()`, `posts`, `queue`, and `mapPins` derived data so new fields flow through the app.
5. If fields should persist in the backend, update `/api/posts` in `server/index.js` and the `createPost()` payload in `src/lib/api.js`.

Good candidates:

- mood preset chips,
- genre tags,
- location autocomplete,
- required-field validation,
- duplicate submission protection.

### 2. Persist the vibe queue to the backend

**Goal:** Stop relying only on localStorage for tracks.

Suggested steps:

1. Add queue endpoints to `server/index.js`, such as `GET /api/users/:nickname/tracks` and `POST /api/users/:nickname/tracks`.
2. Store tracks in `server/data/app-data.json` while prototyping.
3. Add client helpers in `src/lib/api.js`.
4. Update `JumbleMFlowContext.jsx` to hydrate tracks from the API when a user is logged in.
5. Keep localStorage as an offline fallback until full authentication exists.
6. Add loading and error states to `SyncYourSoundPage.jsx`.

Watch out for:

- merging local anonymous tracks with profile tracks,
- duplicate track IDs,
- whether deleting locally should also delete server records.

### 3. Add real authentication

**Goal:** Replace nickname-only identity with secure sessions.

Suggested steps:

1. Choose an auth provider or add a server-side session strategy.
2. Replace localStorage nickname identity in `UserSessionContext.jsx` with authenticated user/session state.
3. Protect write operations in `server/index.js` so users can only mutate their own data.
4. Add sign-out and profile-edit flows to `LoginPage.jsx`.
5. Store secrets in environment variables, never in the repository.

Minimum server changes:

- verify requests before profile/post writes,
- return `401` for unauthenticated requests,
- return `403` for authenticated users modifying someone else's data.

### 4. Upgrade Travel Map to real map data

**Goal:** Move from decorative pin placement to actual geographic coordinates.

Suggested steps:

1. Add `latitude` and `longitude` fields to the draft and track model.
2. Decide whether to use browser geolocation, a geocoding API, manual coordinate entry, or a map provider.
3. Update `mapPins` in `JumbleMFlowContext.jsx` to use real coordinates.
4. Replace or augment the CSS map UI in `TravelMapPage.jsx` with a map component.
5. Add graceful fallback states when coordinates are missing.

Considerations:

- user permission prompts for browser geolocation,
- API keys for map/geocoding services,
- privacy controls for exact vs approximate locations.

### 5. Add audio playback or music service integration

**Goal:** Make synced songs playable or linkable.

Suggested steps:

1. Add fields for artist, track URL, preview URL, and service provider.
2. Update the Discover form and `defaultDraft`.
3. Render playable previews in `SyncYourSoundPage.jsx`.
4. Validate URLs before saving.
5. If integrating a third-party music API, keep tokens on the server and expose only safe data to the browser.

Useful UI additions:

- play/pause control,
- currently playing state,
- unavailable preview fallback,
- external service link.

### 6. Improve notifications

**Goal:** Make activity and notifications feel live and user-controlled.

Suggested steps:

1. Replace 8-second polling in `UserSessionContext.jsx` with Server-Sent Events or WebSockets if live updates become important.
2. Add notification preference fields to user profiles.
3. Extend `server/index.js` to store read/unread state per activity instead of only a count.
4. Update `LoginPage.jsx` to show notification details, not just activity history.
5. Update `Navbar.jsx` to support an accessible popover or notification drawer.

### 7. Harden the API and data layer

**Goal:** Prepare the app for production-like use.

Suggested steps:

1. Replace JSON-file persistence with a real database.
2. Add schema validation for every request body.
3. Add structured error responses and server-side logging.
4. Add automated tests for API validation and state transitions.
5. Add rate limiting to public endpoints such as nickname checks and registration.

Potential database tables/collections:

- `users`,
- `profiles`,
- `tracks`,
- `posts`,
- `activities`,
- `notifications`,
- `likes`.

## Suggested testing plan for future work

The project does not currently include a dedicated test runner. Recommended additions:

- **Unit tests** for helpers like nickname normalization, tag generation, and metric labels.
- **Component tests** for Discover form submission, queue editing, and login validation.
- **API tests** for registration, duplicate nicknames, post creation, and notification clearing.
- **End-to-end tests** for the full path: create profile -> create vibe -> view queue -> view map -> read notifications.

A practical next tooling step would be to add Vitest and React Testing Library for frontend logic, plus Supertest for Express API routes.

## Contribution checklist

Use this checklist before handing off a change:

- [ ] The feature has a clear route, component, context, or API ownership.
- [ ] New data fields are added to all derived views that need them.
- [ ] Browser-only APIs are guarded if code might ever run outside the browser.
- [ ] API changes include matching frontend client helpers.
- [ ] Empty, loading, and error states are handled.
- [ ] `npm run build` passes.
- [ ] Documentation is updated when setup, architecture, or feature behavior changes.
