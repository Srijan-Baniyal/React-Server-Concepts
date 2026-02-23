import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function RequestLifecycle() {
	return (
		<section className="space-y-8" id="request-lifecycle">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">Request Lifecycle 🔁</h2>
				<p className="text-muted-foreground">
					What Next.js does, step by step, when a request arrives — from
					middleware all the way to hydration.
				</p>
			</div>

			<Card>
				<CardContent className="pt-6">
					<pre className="overflow-x-auto rounded-md bg-muted p-4 font-mono text-xs leading-relaxed">
						{`Incoming HTTP Request
        │
        ▼
┌───────────────────┐
│    Middleware      │  ← Runs on Edge (sub-ms). Auth checks, A/B
│  (middleware.ts)   │    testing, geo redirects, header rewrites.
└────────┬──────────┘    Returns next() | redirect() | rewrite()
         │
         ▼
┌───────────────────┐
│  Route Resolution  │  ← Match app/ segments. Find layout.tsx,
│  (App Router)      │    page.tsx, loading.tsx, error.tsx chain.
└────────┬──────────┘
         │
         ▼
┌────────────────────────────────────────────────────────┐
│              Server Component Tree Render               │
│                                                        │
│  RootLayout (async) ─────────────── check cache        │
│    └── Segment Layout (async) ────── scoped data       │
│        └── Page (async) ──────────── main data         │
│            ├── <Suspense> ◄─── immediate fallback sent │
│            │    └── SlowComp ─── streams in later      │
│            └── FastComp ──────── renders immediately   │
│                                                        │
│  React.cache dedups identical calls within this pass.  │
└────────────────────────┬───────────────────────────────┘
                         │  ① HTML shell (streamed)
                         │  ② Inline RSC Flight payload (streamed)
                         │  ③ Suspense chunks (streamed as resolved)
                         ▼
              ┌──────────────────────┐
              │     Browser           │
              │  1. Paint HTML shell  │ ← fast first paint
              │  2. Download CC JS    │ ← only Client Component
              │  3. Hydrate CC        │ ← attach event handlers
              │  4. Stream Suspense   │ ← deferred chunks arrive
              └──────────────────────┘`}
					</pre>
				</CardContent>
			</Card>

			{/* Navigation types */}
			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="text-base">
							🌐 Hard Navigation (Initial Load)
						</CardTitle>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`1. Middleware runs (Edge)
2. Route matched, segment files loaded
3. Server Component tree renders
4. HTML + Flight payload streamed
5. Browser paints HTML immediately
6. React hydrates with Flight payload
7. Suspense chunks arrive & swap in

Result:
  ✓ Full HTML for SEO / crawlers
  ✓ Fast LCP (no JS needed to paint)
  ✓ Hydration uses Flight, not HTML
    (Flight is the source of truth)`}
						</pre>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="text-base">
							⚡ Soft Navigation (Client-side)
						</CardTitle>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`1. <Link> prefetches RSC payload on hover
2. User clicks → router intercepts
3. GET /?_rsc=<hash> → pure Flight payload
4. Only CHANGED segments re-render
5. Unchanged layouts stay mounted
6. Client state preserved (scroll, modals)

Router Cache:
  Static segments: cached 5 min
  Dynamic segments: cached 30 sec
  router.refresh() clears it

Result:
  ✓ Sub-100ms transitions
  ✓ No full page reload`}
						</pre>
					</CardContent>
				</Card>
			</div>

			{/* Concurrency model */}
			<Card>
				<CardHeader>
					<CardTitle>
						React's Concurrent Rendering Model on the Server
					</CardTitle>
					<CardDescription>
						How RSC and Suspense cooperate to stream work progressively
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					<pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`React processes the Server Component tree CONCURRENTLY:

  ① Start rendering all non-suspended nodes immediately
  ② When an async Server Component suspends (awaits data):
       • Insert placeholder in the Flight stream
       • Continue rendering other branches
  ③ When the awaited Promise resolves:
       • Render that branch
       • Flush the resolved chunk into the stream
  ④ Repeat until entire tree is resolved

Timeline example (three async components):
  t=0    Start rendering page
  t=1ms  Send HTML shell + Suspense placeholders
  t=50ms Resolve UserProfile → flush chunk 1
  t=80ms Resolve Notifications → flush chunk 2
  t=200ms Resolve Feed → flush chunk 3 (stream closes)`}
					</pre>
					<div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs">
						<p className="font-medium">Key insight</p>
						<p className="mt-1 text-muted-foreground">
							The server doesn't wait for the slowest component. Each node
							resolves independently and flushes into the stream as soon as it's
							ready. The browser renders each incoming chunk incrementally —
							users see real content progressively, not a spinner blocking
							everything.
						</p>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
