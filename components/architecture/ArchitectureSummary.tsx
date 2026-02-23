import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const REFERENCE_TABLE = [
	{
		feature: "Render environment",
		server: "Node.js / Edge (server)",
		client: "Browser + Node.js (hydration)",
	},
	{
		feature: "async/await in component",
		server: "✓ Yes",
		client: "✗ No (use hooks)",
	},
	{
		feature: "Access DB / secrets directly",
		server: "✓ Yes",
		client: "✗ No",
	},
	{
		feature: "JS bundle contribution",
		server: "0 bytes",
		client: "Included in bundle",
	},
	{
		feature: "useState / useEffect",
		server: "✗ No",
		client: "✓ Yes",
	},
	{
		feature: "Event handlers (onClick, etc.)",
		server: "✗ No",
		client: "✓ Yes",
	},
	{
		feature: "Browser APIs (window, document)",
		server: "✗ No",
		client: "✓ Yes",
	},
	{
		feature: "React Context as provider",
		server: "✗ No",
		client: "✓ Yes",
	},
	{
		feature: "Import heavy libraries (shiki, etc.)",
		server: "✓ Free (0 bundle cost)",
		client: "Sent to every user",
	},
	{
		feature: "Can be parent of the other",
		server: "✓ Can render CC as children/props",
		client: "✓ Can receive SC as children prop",
	},
];

const GOLDEN_RULES = [
	{
		rule: "Start on the Server",
		detail:
			'Default to Server Components for every new component. Only add "use client" when you actually need browser interactivity, local state, or browser APIs. The further you push boundaries toward the leaves, the less JS you ship.',
		badge: "Rule 1",
		color: "border-green-500/20 bg-green-500/5",
	},
	{
		rule: "Push Boundaries Down",
		detail:
			"When you do need a Client Component, make it as small and leaf-like as possible. Extract only the interactive part. Keep data fetching, transformations, and markup in Server Components above it.",
		badge: "Rule 2",
		color: "border-blue-500/20 bg-blue-500/5",
	},
	{
		rule: "Stream Everything Slow",
		detail:
			"Any component that awaits data can be wrapped in a Suspense boundary. Never block your entire page for one slow data source. Parallel fetching + Suspense boundaries = progressive, responsive UIs.",
		badge: "Rule 3",
		color: "border-purple-500/20 bg-purple-500/5",
	},
];

export function ArchitectureSummary() {
	return (
		<section className="space-y-8" id="summary">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">Architecture Summary 🗺️</h2>
				<p className="text-muted-foreground">
					A concise reference covering every key concept: Server vs Client
					Component capabilities, the three golden rules, and the mental model
					that ties it all together.
				</p>
			</div>

			{/* Full reference table */}
			<Card>
				<CardHeader>
					<CardTitle>Complete Reference Table</CardTitle>
					<CardDescription>
						Server Component vs Client Component — at a glance
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full text-xs">
							<thead>
								<tr className="border-border/50 border-b">
									<th className="py-2 pr-6 text-left font-semibold">Feature</th>
									<th className="py-2 pr-6 text-left font-semibold text-orange-600">
										Server Component
									</th>
									<th className="py-2 text-left font-semibold text-blue-600">
										Client Component
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border/30">
								{REFERENCE_TABLE.map(({ feature, server, client }) => (
									<tr key={feature}>
										<td className="py-2 pr-6 font-medium text-foreground">
											{feature}
										</td>
										<td className="py-2 pr-6 text-muted-foreground">
											{server}
										</td>
										<td className="py-2 text-muted-foreground">{client}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>

			{/* Golden rules */}
			<div className="grid gap-4 md:grid-cols-3">
				{GOLDEN_RULES.map(({ rule, detail, badge, color }) => (
					<Card className={color} key={rule}>
						<CardHeader className="pb-3">
							<div className="flex items-center gap-2">
								<Badge className="text-[10px]" variant="outline">
									{badge}
								</Badge>
								<CardTitle className="text-base">{rule}</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground text-sm leading-relaxed">
								{detail}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			<Separator />

			{/* Big picture mental model — final summary */}
			<Card>
				<CardHeader>
					<CardTitle>The Big Picture — Mental Model</CardTitle>
					<CardDescription>How all the pieces fit together</CardDescription>
				</CardHeader>
				<CardContent>
					<pre className="overflow-x-auto rounded-md bg-muted p-4 font-mono text-xs leading-relaxed">
						{`Your Next.js 15 App
│
├── Server Runtime (Node.js / Edge)
│   ├── Server Components — zero bundle, direct DB, async/await
│   ├── Server Actions — mutations as typed functions, no API routes
│   ├── Caching — Request Memo → Data Cache → Full Route Cache
│   └── RSC Flight — compact serialisation format streamed to browser
│
├── Network Boundary
│   ├── Serialisation — only JSON-safe values & Server Actions cross
│   └── "use client" / "use server" directives mark the boundary
│
└── Browser Runtime
    ├── Client Components — JS bundle, hooks, events, browser APIs
    ├── Selective Hydration — concurrent React hydrates in priority order
    ├── Router Cache — browser-side Flight payload cache (30s / 5min)
    └── Streaming — Suspense boundaries replace skeletons with real content

The result:
  ✓ Minimal JS shipped (~0 bytes for SC-only subtrees)
  ✓ Fast time-to-first-byte (HTML streamed from server)
  ✓ Fast time-to-interactive (only CC code needs to hydrate)
  ✓ Excellent Core Web Vitals (LCP, INP, CLS all improve)
  ✓ Co-located data fetching without prop-drilling or global stores`}
					</pre>
				</CardContent>
			</Card>
		</section>
	);
}
