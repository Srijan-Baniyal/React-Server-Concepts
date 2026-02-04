import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SimplePokemon {
	name: string;
	url: string;
}

interface PokemonListResponse {
	results: SimplePokemon[];
}

// Example 1: Time-based revalidation
async function TimeBasedCacheExample() {
	// In Next.js, you can configure cache behavior like this:
	const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=3", {
		next: { revalidate: 60 }, // Revalidate every 60 seconds
	});

	const data = (await response.json()) as PokemonListResponse;
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

				<div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
					<p className="mb-1 font-semibold text-purple-600 text-xs dark:text-purple-400">
						💡 Best for:
					</p>
					<p className="text-muted-foreground text-xs leading-relaxed">
						Data that changes predictably (e.g., "refresh product prices every 5
						minutes")
					</p>
				</div>
			</CardContent>
		</Card>
	);
}

// Example 2: On-demand revalidation (conceptual)
function OnDemandRevalidationExample() {
	return (
		<Card className="border-orange-500/20 bg-orange-500/5">
			<CardHeader className="border-orange-500/10 border-b pb-4">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">On-Demand Revalidation</CardTitle>
					<Badge
						className="rounded-full bg-orange-500/10 px-2 py-0.5 font-normal text-orange-600 text-xs dark:text-orange-400"
						variant="secondary"
					>
						Tag-based
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 pt-4">
				<div className="rounded-lg border border-border/40 bg-background/50 p-3">
					<p className="mb-3 font-mono text-muted-foreground text-xs">
						{/* Tag your cached data */}
					</p>
					<pre className="mb-3 overflow-x-auto text-xs">
						<code>{`fetch(..., {
  next: { tags: ['pokemon-list'] }
})`}</code>
					</pre>
					<p className="mb-3 font-mono text-muted-foreground text-xs">
						{/* Revalidate after a mutation */}
					</p>
					<pre className="overflow-x-auto text-xs">
						<code>{`revalidateTag('pokemon-list')`}</code>
					</pre>
				</div>

				<div className="space-y-2">
					<p className="text-muted-foreground text-xs leading-relaxed">
						After a mutation (e.g., adding a new Pokémon to favorites), you can
						selectively invalidate just the affected data using tags.
					</p>
				</div>

				<div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-3">
					<p className="mb-1 font-semibold text-orange-600 text-xs dark:text-orange-400">
						💡 Best for:
					</p>
					<p className="text-muted-foreground text-xs leading-relaxed">
						Event-driven updates ("when user edits X, refresh Y") or after
						server actions
					</p>
				</div>
			</CardContent>
		</Card>
	);
}

// Example 3: No caching (dynamic)
async function DynamicDataExample() {
	// Force dynamic rendering - always fetch fresh
	const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=3", {
		cache: "no-store", // Never cache
	});

	// We don't need the data, just showing the timestamp
	await response.json();
	const now = new Date().toLocaleTimeString();

	return (
		<Card className="border-blue-500/20 bg-blue-500/5">
			<CardHeader className="border-blue-500/10 border-b pb-4">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">Dynamic (No Cache)</CardTitle>
					<Badge
						className="rounded-full bg-blue-500/10 px-2 py-0.5 font-normal text-blue-600 text-xs dark:text-blue-400"
						variant="secondary"
					>
						Always fresh
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 pt-4">
				<div className="rounded-lg border border-border/40 bg-background/50 p-3">
					<p className="mb-2 font-mono text-muted-foreground text-xs">
						fetch(..., {"{"}cache: 'no-store'{"}"})
					</p>
					<p className="text-muted-foreground text-xs leading-relaxed">
						This data is fetched fresh on every request. No caching applied.
					</p>
				</div>

				<div className="space-y-2">
					<p className="text-muted-foreground text-xs">
						Fetched at: <span className="font-medium font-mono">{now}</span>
					</p>
					<p className="text-muted-foreground text-xs">
						(Refresh the page to see the timestamp update)
					</p>
				</div>

				<div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
					<p className="mb-1 font-semibold text-blue-600 text-xs dark:text-blue-400">
						💡 Best for:
					</p>
					<p className="text-muted-foreground text-xs leading-relaxed">
						Personalized data, real-time feeds, or data that must always be
						current
					</p>
				</div>
			</CardContent>
		</Card>
	);
}

export function CachingExplainer() {
	return (
		<div className="space-y-6">
			<div className="text-center">
				<h2 className="mb-3 font-semibold text-4xl tracking-tight">
					Server Caching & Revalidation
				</h2>
				<p className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed">
					Control data freshness and performance with Next.js caching strategies
				</p>
			</div>

			{/* Cache Types Overview */}
			<Card className="overflow-hidden border-border/40 bg-card/50">
				<CardHeader>
					<CardTitle className="text-xl">Cache Behavior Overview</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid gap-4 sm:grid-cols-3">
						<div className="rounded-lg border border-border/40 bg-background/50 p-4">
							<div className="mb-2 flex items-center justify-between">
								<h4 className="font-semibold text-sm">Request Cache</h4>
								<Badge className="text-xs" variant="outline">
									Single render
								</Badge>
							</div>
							<p className="text-muted-foreground text-xs leading-relaxed">
								Deduplicates identical requests during a single page render.
								Automatic in React.
							</p>
						</div>

						<div className="rounded-lg border border-border/40 bg-background/50 p-4">
							<div className="mb-2 flex items-center justify-between">
								<h4 className="font-semibold text-sm">Data Cache</h4>
								<Badge className="text-xs" variant="outline">
									Persistent
								</Badge>
							</div>
							<p className="text-muted-foreground text-xs leading-relaxed">
								Stores fetch results across requests and deploys. Configured via{" "}
								<code className="text-xs">revalidate</code>.
							</p>
						</div>

						<div className="rounded-lg border border-border/40 bg-background/50 p-4">
							<div className="mb-2 flex items-center justify-between">
								<h4 className="font-semibold text-sm">Full Route Cache</h4>
								<Badge className="text-xs" variant="outline">
									Build time
								</Badge>
							</div>
							<p className="text-muted-foreground text-xs leading-relaxed">
								Pre-renders static routes at build time. Dynamic routes opt out
								automatically.
							</p>
						</div>
					</div>

					<div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
						<p className="mb-2 font-semibold text-sm text-yellow-600 dark:text-yellow-500">
							⚡ Performance Insight
						</p>
						<p className="text-muted-foreground text-xs leading-relaxed">
							Caching dramatically improves performance by reducing redundant
							work. The examples below show different strategies for balancing
							freshness and speed.
						</p>
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
				<CardHeader>
					<CardTitle className="text-xl">When to Use Each Strategy</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-border/40 border-b">
									<th className="pr-4 pb-3 text-left font-semibold">
										Strategy
									</th>
									<th className="pr-4 pb-3 text-left font-semibold">
										Use Case
									</th>
									<th className="pb-3 text-left font-semibold">Example</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border/20">
								<tr>
									<td className="py-3 pr-4">
										<Badge
											className="bg-purple-500/10 text-purple-600 dark:text-purple-400"
											variant="secondary"
										>
											Time-based
										</Badge>
									</td>
									<td className="py-3 pr-4 text-muted-foreground text-xs">
										Data changes on a schedule
									</td>
									<td className="py-3 text-muted-foreground text-xs">
										Product catalog, blog posts
									</td>
								</tr>
								<tr>
									<td className="py-3 pr-4">
										<Badge
											className="bg-orange-500/10 text-orange-600 dark:text-orange-400"
											variant="secondary"
										>
											On-demand
										</Badge>
									</td>
									<td className="py-3 pr-4 text-muted-foreground text-xs">
										Changes after user actions
									</td>
									<td className="py-3 text-muted-foreground text-xs">
										Shopping cart, user profiles
									</td>
								</tr>
								<tr>
									<td className="py-3 pr-4">
										<Badge
											className="bg-blue-500/10 text-blue-600 dark:text-blue-400"
											variant="secondary"
										>
											No cache
										</Badge>
									</td>
									<td className="py-3 pr-4 text-muted-foreground text-xs">
										Must always be current
									</td>
									<td className="py-3 text-muted-foreground text-xs">
										Live feeds, personalized data
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
