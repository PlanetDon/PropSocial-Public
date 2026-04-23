# Frontend Architecture

## Core Principle

PropSocial frontend is a secure, state-driven client platform, realtime interaction layer, and trust visualization system.

## High-Level Layers

1. UI layer: `components/*`
2. State layer: `store/*`
3. Data layer: `services/*`, `hooks/*`, `lib/api.ts`
4. Security layer: `middleware.ts`, `app/(dashboard)/layout.tsx`, `lib/auth.ts`
5. Realtime layer: `lib/realtime.ts`, `hooks/use-realtime-notifications.ts`
6. Globalization layer: `lib/globalization.ts`

## Feature Modules

- Property module: listing/search/detail
- Location module: consent-based GPS tracking (`useLocation`, Zustand store, geolocation service)
- Agent module: virtual office and trust profile
- Investment module: opportunities and portfolio
- GRC module: compliance status, risk, audit, escrow
- Social module: neighborhood activity feed

## Route Map

- `/`
- `/search`
- `/property/[id]`
- `/agent/[id]`
- `/invest`
- `/dashboard`
- `/messages`
- `/grc`
- `/settings`
- `/login`
- `/register`
