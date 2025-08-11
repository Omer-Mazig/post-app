## PostApp — Client

A modern React client for a posts feed. This was built as a focused front‑end assignment to demonstrate pragmatic architecture, strong UX, and production‑minded patterns on a small scope. A lightweight local API is provided only to enable richer client features.

### How to run (development)

- **Requirements**: Node.js 20+ and npm 10+
- **API server**: The client expects an API on `http://localhost:3000` by default. See the API/server instructions in `../server/README.md` and start it first.

Steps:

1. `cd client`
2. `npm install`
3. (Optional) create `.env` and set a custom API URL:
   - `VITE_API_URL=http://localhost:3000`
4. `npm run dev`
5. Open the Vite URL printed in the terminal (typically `http://localhost:5173`).

Useful scripts:

- `npm run build`: Production build
- `npm run preview`: Preview the production build locally
- `npm run lint`: Lint the codebase

### Purpose

Deliver a clean, responsive posts feed that feels “real” to use: fast initial load, infinite scrolling, optimistic updates where it matters, sensible error states, and a consistent, accessible UI. The API is intentionally minimal and in‑memory; the focus is the client experience and front‑end engineering choices.

### Features

- **Posts feed with infinite scroll**: Efficient pagination powered by TanStack Query and an intersection observer.
- **Search with URL sync**: Debounced search updates the `?q=` param for shareable/filterable URLs.
- **Create post**: Validated form (title/content) with success toasts and automated cache invalidation.
- **Delete own post**: Detail page allows deleting your own post with a confirmation dialog and optimistic list update.
- **Post details**: Dedicated page with content and metadata.
- **Comments with pagination**: Comments section loads incrementally per post, keeping the UI responsive.
- **Robust loading and error states**: Skeletons for perceived performance; toast errors for non‑blocking failures; clear retry actions when blocking.
- **Theme toggle (light/dark/system)**: Persisted preference with system‑aware default, implemented at the root for consistent theming.
- **Responsive, accessible UI**: Built with Radix primitives and sensible ARIA/keyboard defaults.

### Technologies

- **React 19 + Vite 6 + TypeScript**: Fast DX, strict typing, modern React features.
- **React Router 7**: App routing (`/feed`, `/posts/:id`) with simple redirects.
- **TanStack Query 5**: Data fetching, caching, infinite queries, and a tuned retry policy.
- **Axios**: HTTP client with a small dev‑time delay and centralized error logging.
- **Zod**: Runtime validation of API responses for safer client code.
- **React Hook Form**: Performant, well‑typed forms with Zod resolver.
- **UI stack**: Tailwind CSS 4, Radix UI primitives, `lucide-react` icons, and `sonner` for toasts.

### Architecture notes

- `src/features/posts` contains page components, UI, hooks, and a query‑options factory for cohesion and testability.
- `src/components/providers` hosts app‑level providers (auth, theme).
- `src/lib` centralizes cross‑cutting concerns like the API client, React Query client, and router.
- API base URL comes from `VITE_API_URL` with a sensible default (`http://localhost:3000/api`).

### Caveats

- The “current user” is a simple stub from the dev API (`/api/me`), used to gate actions like deleting your own post.
- The server is in‑memory; data resets on restart. That is intentional—the assignment emphasizes client behavior and UX.
