import type { AxiosRequestConfig } from "axios";
import { headers } from "next/headers";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PokemonAPI } from "@/lib/PokemonApi";

interface NextAxiosConfig extends AxiosRequestConfig {
	cache?: RequestCache;
	next?: { revalidate?: number | false; tags?: string[] };
}

interface SimplePokemon {
	name: string;
	url: string;
}

interface PokemonListResponse {
	results: SimplePokemon[];
}

// Example 1: Time-based revalidation
async function TimeBasedCacheExample() {
	await headers();
	const config: NextAxiosConfig = {
		params: { limit: 3 },
		next: { revalidate: 60 },
	};
	const res = await PokemonAPI.get<PokemonListResponse>("/pokemon", config);
	const data: PokemonListResponse = res.data;
	const now = new Date().toLocaleTimeString();

	return (
		<Card className="border-purple-500/20 bg-purple-500/5">
			<CardHeader className="border-purple-500/10 border-b pb-4">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">Time-Based Revalidation</CardTitle>
					<Badge
						className="rounded-full bg-purple-500/10 px-2 py-0.5 font-normal text-purple-600 text-xs dark:text-purple-400"
						variant="secondary"
					>
						60s cache
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 pt-4">
				<div className="rounded-lg border border-border/40 bg-background/50 p-3">
					<p className="mb-2 font-mono text-muted-foreground text-xs">
						fetch(..., {"{"}next: {"{"} revalidate: 60 {"}}"}
						{"}"})
					</p>
					<p className="text-muted-foreground text-xs leading-relaxed">
						This data is cached and revalidated every 60 seconds. Multiple
						requests within that window use the cached version.
					</p>
				</div>

				<div className="space-y-2">
					<p className="text-muted-foreground text-xs">
						Fetched at: <span className="font-medium font-mono">{now}</span>
					</p>
					<div className="space-y-1">
						{data.results.map((pokemon, i) => (
							<div
								className="flex items-center gap-2 rounded-lg border border-border/40 bg-background/30 px-3 py-2"
								key={pokemon.name}
							>
								<Badge className="text-xs" variant="outline">
									{i + 1}
								</Badge>
								<span className="font-medium text-sm capitalize">
									{pokemon.name}
								</span>
							</div>
						))}
					</div>
				</div>

				<div className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-2.5">
					<p className="font-semibold text-purple-600 text-xs dark:text-purple-400">
						✦ Best for
					</p>
					<p className="mt-0.5 text-muted-foreground text-xs leading-relaxed">
						Data that changes predictably — product prices, blog posts, sports
						scores
					</p>
				</div>
			</CardContent>
		</Card>
	);
}

// Example 2: On-demand revalidation (conceptual)
function OnDemandRevalidationExample() {
	return (
		<Card className="overflow-hidden border-orange-500/20 bg-orange-500/5">
			<CardHeader className="border-orange-500/10 border-b bg-orange-500/5 px-6 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/15 text-lg">
							🏷️
						</div>
						<CardTitle className="text-base">On-Demand Revalidation</CardTitle>
					</div>
					<Badge
						className="bg-orange-500/10 font-mono text-orange-600 text-xs dark:text-orange-400"
						variant="secondary"
					>
						tag-based
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 pt-5">
				<div className="space-y-2">
					<p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
						1 — tag the fetch
					</p>
					<div className="overflow-hidden rounded-lg border border-border/40">
						<pre className="bg-muted/30 p-3 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
							<code>{`await fetch(url, {
  next: { tags: ['pokemon-list'] }
})`}</code>
						</pre>
					</div>
				</div>
				<div className="space-y-2">
					<p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
						2 — invalidate after mutation
					</p>
					<div className="overflow-hidden rounded-lg border border-border/40">
						<pre className="bg-muted/30 p-3 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
							<code>{`revalidateTag('pokemon-list')`}</code>
						</pre>
					</div>
				</div>
				<div className="rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-2.5">
					<p className="font-semibold text-orange-600 text-xs dark:text-orange-400">
						✦ Best for
					</p>
					<p className="mt-0.5 text-muted-foreground text-xs leading-relaxed">
						Event-driven updates — shopping carts, user profiles, after Server
						Actions
					</p>
				</div>
			</CardContent>
		</Card>
	);
}

// Example 3: No caching (dynamic)
async function DynamicDataExample() {
	// Force dynamic rendering - always fetch fresh
	const config: NextAxiosConfig = { params: { limit: 3 }, cache: "no-store" };
	await PokemonAPI.get("/pokemon", config);
	const now = new Date().toLocaleTimeString();

	return (
		<Card className="overflow-hidden border-blue-500/20 bg-blue-500/5">
			<CardHeader className="border-blue-500/10 border-b bg-blue-500/5 px-6 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/15 text-lg">
							⚡
						</div>
						<CardTitle className="text-base">Dynamic (No Cache)</CardTitle>
					</div>
					<Badge
						className="bg-blue-500/10 font-mono text-blue-600 text-xs dark:text-blue-400"
						variant="secondary"
					>
						no-store
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 pt-5">
				<div className="overflow-hidden rounded-lg border border-border/40">
					<div className="border-border/30 border-b bg-muted/60 px-3 py-1.5">
						<span className="font-mono text-[11px] text-muted-foreground">
							app/live/page.tsx
						</span>
					</div>
					<pre className="bg-muted/30 p-3 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
						<code>{`await fetch(url, {
  cache: 'no-store'
})`}</code>
					</pre>
				</div>

				<div className="space-y-2">
					<p className="text-muted-foreground text-xs">
						Fetched at: <span className="font-medium font-mono">{now}</span>
					</p>
					<p className="text-muted-foreground text-xs">
						(Refresh the page to see the timestamp update)
					</p>
				</div>

				<div className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2.5">
					<p className="font-semibold text-blue-600 text-xs dark:text-blue-400">
						✦ Best for
					</p>
					<p className="mt-0.5 text-muted-foreground text-xs leading-relaxed">
						Personalized data, real-time feeds, auth-gated pages
					</p>
				</div>
			</CardContent>
		</Card>
	);
}

export function CachingExplainer() {
	return (
		<div className="space-y-10">
			{/* Hero */}
			<section className="space-y-6">
				<div className="flex items-center gap-4">
					<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/50 shadow-lg shadow-primary/20">
						<span className="text-3xl">🗄️</span>
					</div>
					<div>
						<h1 className="font-bold text-5xl tracking-tight">
							Server Caching &amp; Revalidation
						</h1>
						<p className="mt-2 max-w-2xl text-lg text-muted-foreground">
							Control data freshness and performance with Next.js caching
							strategies
						</p>
					</div>
				</div>
			</section>

			{/* Cache Types Overview */}
			<Card className="overflow-hidden border-border/40 bg-card/50">
				<CardHeader className="border-border/40 border-b px-6 py-4">
					<CardTitle className="text-xl">Cache Behavior Overview</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 pt-5">
					<div className="grid gap-3 sm:grid-cols-3">
						{[
							{
								icon: "⚛️",
								color: "bg-violet-500/10 border-l-violet-500/50",
								title: "Request Cache",
								badge: "Single render",
								desc: "Deduplicates identical fetch calls within a single render pass. Fully automatic — zero config.",
							},
							{
								icon: "💾",
								color: "bg-emerald-500/10 border-l-emerald-500/50",
								title: "Data Cache",
								badge: "Persistent",
								desc: "Stores fetch results across requests and deployments. Configured via revalidate or cache tags.",
							},
							{
								icon: "🗂️",
								color: "bg-sky-500/10 border-l-sky-500/50",
								title: "Full Route Cache",
								badge: "Build time",
								desc: "Pre-renders and stores full page HTML at build time. Dynamic routes opt out automatically.",
							},
						].map(({ icon, color, title, badge, desc }) => (
							<div
								className={`rounded-lg border border-border/40 border-l-2 ${color} space-y-2 p-4`}
								key={title}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<span className="text-base">{icon}</span>
										<h4 className="font-semibold text-sm">{title}</h4>
									</div>
									<Badge className="text-[10px]" variant="outline">
										{badge}
									</Badge>
								</div>
								<p className="text-muted-foreground text-xs leading-relaxed">
									{desc}
								</p>
							</div>
						))}
					</div>

					<div className="flex items-start gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
						<span className="text-lg">⚡</span>
						<div>
							<p className="font-semibold text-sm text-yellow-600 dark:text-yellow-500">
								Performance Insight
							</p>
							<p className="mt-0.5 text-muted-foreground text-xs leading-relaxed">
								Caching dramatically improves performance by reducing redundant
								work. The examples below show different strategies for balancing
								freshness and speed.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Live Examples */}
			<div className="grid gap-6 lg:grid-cols-3">
				<TimeBasedCacheExample />
				<OnDemandRevalidationExample />
				<DynamicDataExample />
			</div>

			{/* Comparison Table */}
			<Card className="overflow-hidden border-border/40 bg-card/50">
				<CardHeader className="border-border/40 border-b px-6 py-4">
					<CardTitle className="text-xl">When to Use Each Strategy</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					{[
						{
							icon: "🕐",
							badge: "Time-based",
							badgeClass:
								"bg-purple-500/10 text-purple-600 dark:text-purple-400",
							border: "border-l-purple-500/50",
							useCase: "Data changes on a predictable schedule",
							example: "Product catalog, blog posts, sports scores",
						},
						{
							icon: "🏷️",
							badge: "On-demand",
							badgeClass:
								"bg-orange-500/10 text-orange-600 dark:text-orange-400",
							border: "border-l-orange-500/50",
							useCase: "Invalidate after user mutations or events",
							example: "Shopping cart, user profile, CMS content",
						},
						{
							icon: "⚡",
							badge: "No cache",
							badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
							border: "border-l-blue-500/50",
							useCase: "Data must always be current per request",
							example: "Live feeds, auth-gated pages, dashboards",
						},
					].map(
						({ icon, badge, badgeClass, border, useCase, example }, i, arr) => (
							<div
								className={`flex items-center gap-4 border-l-2 ${border} px-6 py-4${
									i < arr.length - 1 ? "border-border/20 border-b" : ""
								}`}
								key={badge}
							>
								<span className="shrink-0 text-xl">{icon}</span>
								<div className="w-32 shrink-0">
									<Badge className={badgeClass} variant="secondary">
										{badge}
									</Badge>
								</div>
								<div className="min-w-0 flex-1">
									<p className="font-medium text-xs">{useCase}</p>
									<p className="mt-0.5 text-[11px] text-muted-foreground">
										{example}
									</p>
								</div>
							</div>
						)
					)}
				</CardContent>
			</Card>
		</div>
	);
}
