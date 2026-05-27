# AGENTS

## Project overview
- This is a Next.js 16 App Router job portal for job seekers, employers, and admins.
- The main UI lives under `app/`, shared UI under `components/`, and typed domain models under `lib/types.ts`.
- The current demo data is centralized in `lib/mock-data.ts`, and the API routes under `app/api/` are currently mock-backed placeholders.

## Build, lint, and run commands
- `pnpm dev` — start the local development server.
- `pnpm build` — verify production build.
- `pnpm start` — run the production server.
- `pnpm lint` — run ESLint.

## Architecture and conventions
- Use the App Router under `app/` for pages and route handlers.
- Reuse UI primitives from `components/ui/` and keep new UI composition in `components/` or page-local components.
- Prefer Tailwind CSS v4 utility classes for styling.
- Keep domain types in `lib/types.ts`; avoid inventing new ad hoc shape definitions when an existing type already exists.
- Treat `lib/mock-data.ts` as the current demo data source of truth for UI and API prototypes.
- Expect `app/api/*` route handlers to be mock implementations until a real database/auth layer is added.

## Project-specific pitfalls
- The authentication and API routes are placeholders and do not yet represent production database-backed behavior.
- The current mock API responses and app typings are not fully aligned; verify any API/UI integration against `lib/types.ts` before changing data flow.
- The app uses `next/font/google`, `next-themes`, `framer-motion`, `react-hook-form`, `zod`, and `shadcn/ui` primitives.
- When adding routes, follow the existing path layout under `app/` and keep dashboard-specific layouts consistent with the current role-based sections.

## Editing guidance
- When making UI changes, favor small reusable components and keep page files focused on composition.
- When changing data models, update `lib/types.ts` first and then adjust any consumers in `app/`, `components/`, and `app/api/`.
- When adding new API endpoints, preserve the existing Next.js route handler style and return JSON responses with explicit status codes.
- If a change introduces new environment variables, document them in `README.md` and keep additions minimal.

## Existing docs to consult
- `README.md` for product scope, routes, and setup details.
- `lib/types.ts` for the canonical model definitions.
- `lib/mock-data.ts` for current demo content and demo relationships.

## Helpful defaults for agents
- Prefer incremental changes with small, reviewable diffs.
- Prefer linking to existing docs instead of duplicating details.
- Verify changes with `pnpm build` and `pnpm lint` before finishing.
