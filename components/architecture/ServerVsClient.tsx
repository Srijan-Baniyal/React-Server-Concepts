import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function ServerVsClient() {
	return (
		<section className="space-y-8" id="sc-vs-cc">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">
					Server vs Client Components ⚔️
				</h2>
				<p className="text-muted-foreground">
					The fundamental distinction — capabilities, constraints, and when to
					reach for each.
				</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				{/* Server Component */}
				<Card className="border-green-500/20">
					<CardHeader className="pb-3">
						<div className="flex items-center gap-2">
							<Badge className="bg-green-500/10 text-green-600">
								Server Component
							</Badge>
							<span className="text-muted-foreground text-xs">
								default in Next.js App Router
							</span>
						</div>
						<CardDescription className="mt-1">
							Renders once on the server; zero client JS.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="rounded-md bg-muted p-3 font-mono text-xs">
							<p className="mb-2 text-green-600">
								{"// No 'use client' directive — Server Component by default"}
							</p>
							{`async function ProductPage({ id }: { id: string }) {
  // ✓ Direct database access — no API layer needed
  const product = await db.product.findUnique({
    where: { id },
  });

  // ✓ Read environment secrets safely
  const key = process.env.STRIPE_SECRET_KEY;

  // ✓ Import heavy libraries — zero bundle cost
  const { unified } = await import("unified");

  return <ProductDetails product={product} />;
}`}
						</div>

						<div className="grid gap-3 sm:grid-cols-2">
							<div className="space-y-2">
								<p className="font-semibold text-sm">Can do ✅</p>
								<ul className="space-y-1 text-muted-foreground text-sm">
									{[
										"async / await at top level",
										"Direct DB, Redis, FS access",
										"Access server-only secrets",
										"Import heavy server-only libs",
										"Zero client bundle contribution",
										"Read HTTP headers / cookies",
									].map((item) => (
										<li className="flex items-start gap-2" key={item}>
											<span className="mt-0.5 text-green-500">✓</span>
											{item}
										</li>
									))}
								</ul>
							</div>

							<div className="space-y-2">
								<p className="font-semibold text-sm">Cannot do ❌</p>
								<ul className="space-y-1 text-muted-foreground text-sm">
									{[
										"useState / useReducer",
										"useEffect / useLayoutEffect",
										"Browser APIs (window, document)",
										"Event handlers (onClick, etc.)",
										"React Context provider/consumer",
										"useRef for DOM access",
									].map((item) => (
										<li className="flex items-start gap-2" key={item}>
											<span className="mt-0.5 text-destructive">✗</span>
											{item}
										</li>
									))}
								</ul>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Client Component */}
				<Card className="border-blue-500/20">
					<CardHeader className="pb-3">
						<div className="flex items-center gap-2">
							<Badge className="bg-blue-500/10 text-blue-600">
								Client Component
							</Badge>
							<span className="text-muted-foreground text-xs">
								opt-in with "use client"
							</span>
						</div>
						<CardDescription className="mt-1">
							Hydrated in the browser; enables interactivity.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="rounded-md bg-muted p-3 font-mono text-xs">
							<p className="mb-2 text-blue-500">"use client";</p>
							{`import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  // ✓ Side effects, DOM APIs, subscriptions
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicked {count} times
    </button>
  );
}`}
						</div>

						<div className="grid gap-3 sm:grid-cols-2">
							<div className="space-y-2">
								<p className="font-semibold text-sm">Can do ✅</p>
								<ul className="space-y-1 text-muted-foreground text-sm">
									{[
										"All React hooks",
										"Browser APIs & DOM",
										"Event listeners",
										"Third-party UI libs",
										"React Context",
										"SSR pre-rendered too",
									].map((item) => (
										<li className="flex items-start gap-2" key={item}>
											<span className="mt-0.5 text-green-500">✓</span>
											{item}
										</li>
									))}
								</ul>
							</div>

							<div className="space-y-2">
								<p className="font-semibold text-sm">Cannot do ❌</p>
								<ul className="space-y-1 text-muted-foreground text-sm">
									{[
										"async component body",
										"Direct DB / FS access",
										"Read server-only secrets",
										"Import server-only packages",
									].map((item) => (
										<li className="flex items-start gap-2" key={item}>
											<span className="mt-0.5 text-destructive">✗</span>
											{item}
										</li>
									))}
								</ul>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Decision flowchart */}
			<Card>
				<CardHeader>
					<CardTitle>Decision Guide: Which to Use?</CardTitle>
					<CardDescription>
						Follow this flowchart for every new component
					</CardDescription>
				</CardHeader>
				<CardContent>
					<pre className="overflow-x-auto rounded-md bg-muted p-4 font-mono text-xs leading-relaxed">
						{`Need interactivity? (onClick / onChange / useEffect / hooks)
│
├─ YES ──► Does it also need server data?
│           ├─ YES ──► Split boundaries:
│           │            Server Component fetches & passes props
│           │            └── Client Component leaf handles UI
│           └─ NO  ──► Pure Client Component ("use client")
│
└─ NO  ──► Does it fetch data or read secrets?
            ├─ YES ──► Async Server Component
            └─ NO  ──► Static Server Component

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Golden rule: push "use client" as FAR DOWN the
component tree as possible. Every ancestor that
stays Server = smaller bundle + colocated fetch.`}
					</pre>
				</CardContent>
			</Card>

			{/* Component type comparison table */}
			<Card>
				<CardHeader>
					<CardTitle>Quick Comparison Table</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-border/50 border-b">
									<th className="py-2 pr-4 text-left font-semibold">Feature</th>
									<th className="py-2 pr-4 text-center font-semibold text-green-600">
										Server
									</th>
									<th className="py-2 text-center font-semibold text-blue-600">
										Client
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border/30 text-muted-foreground">
								{[
									["Rendered on server", "✓ always", "✓ (SSR)"],
									["Rendered in browser", "✗", "✓ (hydration)"],
									["Contributes to JS bundle", "✗ zero", "✓"],
									["async / await body", "✓", "✗"],
									["useState / useEffect", "✗", "✓"],
									[
										"Access process.env secrets",
										"✓",
										"✗ (client-exposed only)",
									],
									["Direct DB / ORM calls", "✓", "✗"],
									["Event handlers", "✗", "✓"],
									["React Context", "✗", "✓"],
									["Can receive SC as children", "✓", "✓"],
								].map(([feature, server, client]) => (
									<tr key={feature as string}>
										<td className="py-2 pr-4 font-medium text-foreground">
											{feature}
										</td>
										<td className="py-2 pr-4 text-center font-mono text-xs">
											{server}
										</td>
										<td className="py-2 text-center font-mono text-xs">
											{client}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
