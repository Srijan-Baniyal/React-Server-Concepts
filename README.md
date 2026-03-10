# React Server Concepts

**An interactive learning platform for React Server Components, modern rendering architecture, and React 19.**

<p>
  <img src="https://img.shields.io/badge/Next.js-16.1-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.2-38bdf8?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License" />
</p>

> Every section is a live, working demonstration — not a slide deck. Trace requests from server to browser, break things on purpose, and build real intuition for how modern React works under the hood.

---

## What's Inside

| Section | Route | What you'll learn |
|---------|-------|-------------------|
| **Server Components** | `/concepts/server-components` | The server/client boundary, serialization, zero-bundle data fetching, composition patterns |
| **Streaming & Suspense** | `/concepts/streamingandsuspense` | Progressive rendering, nested Suspense boundaries, parallel loading, error boundaries |
| **React 19 Features** | `/concepts/react-19` | `useOptimistic`, `useFormStatus`, `useActionState`, `useEffectEvent`, Activity API, View Transitions |
| **Navigation Patterns** | `/concepts/navigation` | Dynamic routes, Pokémon API integration, server/client fetch comparison, network debugging |
| **Architecture Deep Dives** | `/learning/architecture` | Rendering pipeline, Flight Protocol (RSC wire format), caching layers, hydration, route segments |
| **Best Practices** | `/learning/best-practices` | Component boundaries, security, caching strategy, streaming patterns, TypeScript patterns |

Each page is backed by dozens of interactive components, animated flow diagrams (via [XYFlow](https://reactflow.dev)), and real API calls to illustrate concepts in practice.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) with App Router |
| Language | [TypeScript 5.9](https://www.typescriptlang.org) (strict) |
| UI | [React 19](https://react.dev), [shadcn/ui](https://ui.shadcn.com) + [Base UI](https://base-ui.com) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com), [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css) |
| Animation | [Motion](https://motion.dev) (Framer Motion), View Transitions API |
| Data | [TanStack React Query](https://tanstack.com/query), [Axios](https://axios-http.com) |
| State | [Zustand](https://zustand.docs.pmnd.rs), React Context |
| Forms | [React Hook Form](https://react-hook-form.com), [Zod 4](https://zod.dev) |
| Diagrams | [XYFlow (React Flow)](https://reactflow.dev) |
| Icons | [Phosphor Icons](https://phosphoricons.com) |
| Linting | [Biome](https://biomejs.dev), [Ultracite](https://github.com/haydenbleasel/ultracite) |

---

## Architecture Highlights

### Server-First by Default

Every page is a React Server Component. Client code (`"use client"`) only ships where interactivity is truly required — navigation state, animations, form interactions. This keeps bundles lean and initial loads fast.

### Dual-Runtime Data Fetching

The project fetches from [PokéAPI](https://pokeapi.co) and a custom API, demonstrating both patterns side by side:

```
Server Component                         Client Component
  │                                        │
  ├─ Direct async/await fetch              ├─ React Query + Axios
  ├─ Zero client bundle cost               ├─ Deduplication & caching
  ├─ X-Request-Source: server-component    ├─ Optimistic updates
  └─ Streamed via Suspense                 └─ Background refetch
```

### Streaming Architecture

Suspense boundaries and streaming SSR deliver an instant shell while data-heavy sections resolve progressively:

```
Browser request
    ↓
HTML shell (layout + navigation)  ←  immediate
    ↓  stream
Suspense boundary 1 resolves      ←  ~200ms
    ↓  stream
Suspense boundary 2 resolves      ←  ~400ms
    ↓
Selective hydration               ←  interactive
```

### Experimental Next.js Features

```ts
// next.config.ts
{
  reactCompiler: true,         // Automatic memoization — no manual useMemo/useCallback
  cacheComponents: true,       // RSC payload caching at the component level
  experimental: {
    viewTransition: true,      // Native CSS View Transitions for route changes & theme toggle
  },
}
```

---

## Project Structure

```
app/
├── layout.tsx                    # Root layout — providers, fonts, metadata
├── page.tsx                      # Home — animated architecture diagram
├── about/page.tsx                # About page
├── api/og/                       # Dynamic OG image generation (1200×630)
├── concepts/
│   ├── server-components/        # RSC explainer with live demos
│   ├── streamingandsuspense/     # Suspense boundary playground
│   ├── react-19/                 # React 19 hooks & features
│   └── navigation/              # Dynamic routes + Pokémon demos
│       ├── [pokemon]/            # /navigation/ditto, /eevee, /mew
│       └── page.tsx
└── learning/
    ├── architecture/             # Deep-dive into rendering pipeline
    └── best-practices/           # Production patterns & guidelines

components/
├── HeroSection.tsx               # Animated graph + code showcase
├── Navigation.tsx                # Floating nav with scroll detection
├── ThemeToggle.tsx               # View Transitions clip-path theme switch
├── architecture/                 # 15+ architecture visualization components
├── best-practices/               # 10+ best-practice section components
├── flow/                         # 18 interactive flow diagrams (XYFlow)
├── react19/                      # React 19 feature demos
├── server/                       # Server component demos + network debugger
├── streaming/                    # Suspense boundary demos
└── ui/                           # shadcn/ui component library

providers/
├── ReactQueryProvider.tsx        # TanStack Query setup
├── SuspenseProvider.tsx          # Suspense wrapper utilities
└── ThemeProvider.tsx             # next-themes with View Transitions

lib/
├── PokemonApi.ts                 # Dual server/client Axios instances (PokéAPI)
├── NeinApi.ts                    # Dual server/client Axios instances (custom API)
├── Hl.tsx                        # Syntax highlighting utilities
└── Utils.ts                      # cn() and helpers
```

---

## Getting Started

### Prerequisites

- Node.js 20+ (or [Bun](https://bun.sh))
- Package manager of your choice

### Install & Run

```bash
# Clone the repository
git clone https://github.com/Srijan-Baniyal/React-Server-Concepts.git
cd React-Server-Concepts

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start exploring.

### Other Commands

```bash
npm run build     # Production build
npm start         # Start production server
npm run check     # Lint & format check (Biome + Ultracite)
npm run fix       # Auto-fix lint & format issues
```

---

## Key Concepts Demonstrated

### React Server Components

- **Server vs Client boundary** — when and why to add `"use client"`
- **Composition pattern** — passing server components as children to client components
- **Serialization boundary** — what can and can't cross the wire
- **Zero-bundle server logic** — heavy computation that never ships to the browser

### Streaming & Suspense

- **Basic Suspense** — single boundary with fallback
- **Nested Suspense** — multiple boundaries resolving independently
- **Parallel Suspense** — concurrent data fetching without waterfalls
- **Error boundaries** — graceful failure handling within streams

### React 19

- **`useOptimistic`** — instant UI feedback before server confirmation
- **`useFormStatus`** — pending state from parent forms
- **`useActionState`** — server action return values as state
- **`useEffectEvent`** — stable event handlers in effects
- **Activity API** — component lifecycle management
- **React Compiler** — automatic optimization with zero manual memoization

### Architecture

- Full **rendering pipeline** from request to interactive page
- **Flight Protocol** — the RSC wire format React uses to serialize component trees
- **Caching layers** — request dedup, data cache, full-route cache, router cache
- **Hydration deep dive** — selective hydration and island architecture
- **Route segments** — layouts, templates, loading, error, and not-found conventions

---

## Design System

- **OKLch color palette** with light/dark mode via `next-themes`
- **Theme toggle** uses the View Transitions API with a clip-path circle reveal animation
- **Glassmorphism cards** — `backdrop-blur-sm`, subtle borders, hover state transitions
- **Scroll-triggered animations** via Motion's `useScroll`, `useSpring`, and `useInView`
- **Typography** — Montserrat (body), Ubuntu Mono (code), Merriweather (serif accents)

---

## License

[MIT](LICENSE) — Srijan Baniyal
