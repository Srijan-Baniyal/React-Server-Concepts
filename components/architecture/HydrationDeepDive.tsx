import { HydrationComparisonFlow, RSCHydrationFlow } from "@/components/flow";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

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
			<HydrationComparisonFlow />

			{/* How React hydrates RSC */}
			<Card>
				<CardHeader>
					<CardTitle>How React Hydrates Server Output</CardTitle>
					<CardDescription>
						The Flight payload is the source of truth, not the HTML
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					<RSCHydrationFlow />
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
								<CodeBlock
									className="bg-red-500/10"
									code={bad}
									variant="muted"
								/>
								<CodeBlock
									className="bg-green-500/10"
									code={good}
									variant="muted"
								/>
							</div>
						</div>
					))}
				</CardContent>
			</Card>
		</section>
	);
}
