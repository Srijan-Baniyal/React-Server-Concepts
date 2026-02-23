import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function RouteSegments() {
	return (
		<section className="space-y-8" id="route-segments">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">
					Route Segments & Layouts 📁
				</h2>
				<p className="text-muted-foreground">
					Next.js App Router organises UI via conventions — each folder in{" "}
					<code className="rounded bg-muted px-1">app/</code> is a route segment
					with its own server boundary, layout, and special files.
				</p>
			</div>

			{/* Segment files reference */}
			<Card>
				<CardHeader>
					<CardTitle>Special Files in a Segment</CardTitle>
					<CardDescription>
						All files are Server Components by default unless they contain{" "}
						<code className="rounded bg-muted px-1">"use client"</code>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-border/50 border-b">
									<th className="py-2 pr-6 text-left font-semibold">File</th>
									<th className="py-2 pr-6 text-left font-semibold">Purpose</th>
									<th className="py-2 text-left font-semibold">Notes</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border/30 text-muted-foreground text-xs">
								{[
									[
										"layout.tsx",
										"Wraps the segment + all children",
										"Persists on navigation; state preserved",
									],
									[
										"page.tsx",
										"Unique UI for the route; makes it publicly accessible",
										"Receives params & searchParams props",
									],
									[
										"loading.tsx",
										"Suspense fallback for the entire segment",
										"Instant shell — shown while page.tsx resolves",
									],
									[
										"error.tsx",
										"Error boundary for the segment; must be 'use client'",
										"Receives error + reset props",
									],
									[
										"not-found.tsx",
										"Rendered when notFound() is called",
										"Can also be triggered by 404 HTTP status",
									],
									[
										"template.tsx",
										"Like layout but re-mounts on every navigation",
										"Useful for enter/exit animations",
									],
									[
										"default.tsx",
										"Fallback for parallel routes when slot is unmatched",
										"Parallel routes only",
									],
									[
										"route.tsx",
										"API Route Handler (GET, POST, etc.)",
										"Cannot coexist with page.tsx",
									],
									[
										"middleware.ts",
										"Edge function running before request reaches segment",
										"Defined at project root, not in app/",
									],
								].map(([file, purpose, notes]) => (
									<tr key={file as string}>
										<td className="py-2 pr-6 font-mono text-[11px] text-foreground">
											{file}
										</td>
										<td className="py-2 pr-6">{purpose}</td>
										<td className="py-2 text-muted-foreground">{notes}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>

			{/* Layout nesting */}
			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="text-base">Nested Layout Anatomy</CardTitle>
					</CardHeader>
					<CardContent>
						<pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`app/
├── layout.tsx        ← RootLayout (always)
├── page.tsx          ← /
├── dashboard/
│   ├── layout.tsx    ← DashboardLayout
│   ├── page.tsx      ← /dashboard
│   ├── loading.tsx   ← Suspense boundary
│   ├── error.tsx     ← Error boundary
│   └── settings/
│       ├── layout.tsx ← SettingsLayout
│       └── page.tsx   ← /dashboard/settings

Render stack for /dashboard/settings:
RootLayout
  └── DashboardLayout
       └── SettingsLayout
            └── SettingsPage`}
						</pre>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-base">
							layout.tsx vs template.tsx
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// layout.tsx — PERSISTENT
// - Created ONCE, never unmounted
// - useState survives route changes
// - Use for navbars, sidebars, providers

// template.tsx — RE-MOUNTS on every nav
// - New instance on every navigation
// - useState resets to initial value
// - Use for page transitions, analytics
//   or when you need useEffect on nav

// Both receive {children} and wrap the page.
// Use layout unless you specifically need
// the re-mount behaviour.`}
						</pre>
						<p className="text-muted-foreground text-xs">
							A layout that wraps multiple pages will have its{" "}
							<code className="rounded bg-muted px-1">useState</code> from
							Client children survive page navigations—use{" "}
							<code className="rounded bg-muted px-1">template.tsx</code> to
							reset that state.
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Error handling architecture */}
			<Card>
				<CardHeader>
					<CardTitle>Error Handling Architecture</CardTitle>
					<CardDescription>
						Each segment independently catches errors from its subtree
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<pre className="overflow-x-auto rounded-md bg-muted p-4 font-mono text-xs leading-relaxed">
						{`// error.tsx — catches errors from page.tsx & children
// Must be a Client Component (React error boundaries require this)
"use client";

export default function DashboardError({
  error,
  reset,          // re-renders the segment
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong in Dashboard</h2>
      <p>{error.message}</p>           {/* user-facing message */}
      <p>{error.digest}</p>            {/* server log correlation ID */}
      <button onClick={reset}>Retry</button>
    </div>
  );
}

// global-error.tsx — catches errors in RootLayout
// Replaces the entire document when triggered`}
					</pre>

					<div className="grid gap-3 sm:grid-cols-3">
						{[
							{
								label: "error.tsx",
								scope: "Segment + children (not layout)",
								color: "border-red-500/20 bg-red-500/5",
								badge: "bg-red-500/10 text-red-600",
							},
							{
								label: "global-error.tsx",
								scope: "Root layout and entire app",
								color: "border-orange-500/20 bg-orange-500/5",
								badge: "bg-orange-500/10 text-orange-600",
							},
							{
								label: "not-found.tsx",
								scope: "When notFound() is thrown",
								color: "border-yellow-500/20 bg-yellow-500/5",
								badge: "bg-yellow-500/10 text-yellow-600",
							},
						].map(({ label, scope, color, badge }) => (
							<div className={`rounded-lg border p-3 ${color}`} key={label}>
								<Badge className={`mb-2 text-xs ${badge}`} variant="outline">
									{label}
								</Badge>
								<p className="text-muted-foreground text-xs">{scope}</p>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Parallel & intercepted routes */}
			<Card>
				<CardHeader>
					<CardTitle>Parallel & Intercepting Routes</CardTitle>
					<CardDescription>
						Advanced routing for modals, side-panels, and split views
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<p className="font-medium text-sm">Parallel Routes (@slot)</p>
							<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
								{`app/dashboard/
├── layout.tsx   ← receives @team & @analytics
├── page.tsx
├── @team/
│   └── page.tsx ← /dashboard with team slot
└── @analytics/
    └── page.tsx ← /dashboard with analytics slot

// layout.tsx
export default function Layout({
  children,
  team,       // @team slot
  analytics,  // @analytics slot
}) {
  return (
    <>
      {children}
      {team}
      {analytics}
    </>
  );
}`}
							</pre>
						</div>
						<div className="space-y-2">
							<p className="font-medium text-sm">
								Intercepting Routes ((.)path)
							</p>
							<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
								{`// Intercept /photo/[id] when navigating from
// the gallery — show a modal instead

app/gallery/
├── page.tsx
└── (.)photo/
    └── [id]/
        └── page.tsx ← modal view

// Direct URL /photo/123 → full page
// Click from gallery → shows as modal
// Back button → closes modal

Convention prefixes:
(.)   — same level
(..)  — one level up
(...) — from root`}
							</pre>
						</div>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
