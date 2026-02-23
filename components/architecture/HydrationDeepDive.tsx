import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function HydrationDeepDive() {
	return (
		<section className="space-y-8" id="hydration">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">Hydration Deep Dive 💧</h2>
				<p className="text-muted-foreground">
					Hydration is how a static HTML page becomes an interactive React app.
					With RSC and React 18's concurrent engine, hydration is selective,
					interruptible, and prioritised.
				</p>
			</div>

			{/* Classic vs selective hydration */}
			<div className="grid gap-4 md:grid-cols-2">
				<Card className="border-yellow-500/20">
					<CardHeader>
						<CardTitle className="text-base">
							Classic Hydration (React 17)
						</CardTitle>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`1. Wait for ALL JavaScript to download
2. Wait for React to initialise
3. Walk ENTIRE component tree from root
4. Attach event listeners to every node
5. Page becomes interactive

Problems:
  ✗ Entire JS bundle must arrive first
  ✗ Long Tasks block the main thread
  ✗ Components deeper in the tree
    wait for those above them
  ✗ All-or-nothing — slow components
    block faster siblings`}
						</pre>
					</CardContent>
				</Card>
				<Card className="border-green-500/20">
					<CardHeader>
						<CardTitle className="text-base">
							Selective Hydration (React 18 + RSC)
						</CardTitle>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`1. HTML shell is painted immediately
2. Each Suspense boundary = isolated unit
3. React hydrates boundaries as their JS
   and Flight payload arrive
4. User interactions PRIORITISE hydration:
   clicking an unhydrated component forces
   it to hydrate first
5. Long Tasks are yielded back to browser
   to keep the main thread responsive

Benefits:
  ✓ No "hydration waterfall"
  ✓ Interactive components unblock ASAP
  ✓ Slow Suspense chunks don't block fast ones`}
						</pre>
					</CardContent>
				</Card>
			</div>

			{/* How React hydrates RSC */}
			<Card>
				<CardHeader>
					<CardTitle>How React Hydrates Server Output</CardTitle>
					<CardDescription>
						The Flight payload is the source of truth, not the HTML
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					<pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`Traditional SSR Hydration:
  Server → HTML string
  Client → ReactDOM.hydrateRoot(html)
           React re-runs component tree
           in the browser to attach handlers

RSC Hydration:
  Server → HTML string + RSC Flight payload (inline script tags)
  Client → ReactDOM.hydrateRoot(html, { hydrate: true })
           React uses the FLIGHT PAYLOAD to reconcile,
           not re-rendering Server Components
           
  Why Flight, not HTML?
    • HTML is lossy (loses JSX metadata, component boundaries)
    • Flight preserves the exact React tree structure
    • Client Components hydrate against their serialised props
    • Server Component subtrees are already "done" — no JS needed

  Result: Server Component nodes are treated as opaque HTML.
          Only Client Component nodes attach event listeners.`}
					</pre>
					<div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs">
						<p className="font-medium">The key mental model</p>
						<p className="mt-1 text-muted-foreground">
							Think of Server Components as "frozen HTML islands" in your React
							tree. React never re-executes their render function on the client.
							Client Components are "live islands" — they hydrate, re-render on
							state change, and respond to events. The Flight payload precisely
							describes which parts are which.
						</p>
					</div>
				</CardContent>
			</Card>

			{/* Hydration mismatches */}
			<Card>
				<CardHeader>
					<CardTitle>Hydration Mismatches — Causes &amp; Fixes</CardTitle>
					<CardDescription>
						When client output differs from server HTML, React throws a warning
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{[
						{
							cause: "Date/Time rendering",
							bad: `// ✗ Bad — server and client run at different times
<p>Rendered at {new Date().toLocaleString()}</p>`,
							good: `// ✓ Good — read once, pass as prop or use useEffect
"use client";
const [time, setTime] = useState<string>("");
useEffect(() => setTime(new Date().toLocaleString()), []);
return <p>{time || "Loading…"}</p>;`,
						},
						{
							cause: "Browser-only APIs (localStorage, window)",
							bad: `// ✗ Bad — window doesn't exist on server
const theme = window.localStorage.getItem("theme");`,
							good: `// ✓ Good — check for browser environment
const theme = typeof window !== "undefined"
  ? localStorage.getItem("theme")
  : null;
// Or use suppressHydrationWarning for intentional diffs:
<div suppressHydrationWarning>{browserOnlyValue}</div>`,
						},
						{
							cause: "Random IDs / Math.random()",
							bad: `// ✗ Bad — different IDs on server vs client
<label htmlFor={Math.random().toString()}>Name</label>`,
							good: `// ✓ Good — React 18 useId() hook
"use client";
import { useId } from "react";
const id = useId(); // Stable across server + client
<label htmlFor={id}>Name</label>`,
						},
					].map(({ cause, bad, good }) => (
						<div className="space-y-2" key={cause}>
							<p className="font-medium text-sm">{cause}</p>
							<div className="grid gap-2 sm:grid-cols-2">
								<pre className="rounded-md bg-red-500/10 p-3 font-mono text-[10px] leading-relaxed">
									{bad}
								</pre>
								<pre className="rounded-md bg-green-500/10 p-3 font-mono text-[10px] leading-relaxed">
									{good}
								</pre>
							</div>
						</div>
					))}
				</CardContent>
			</Card>
		</section>
	);
}
