import { DataFetchingFlow } from "@/components/flow";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { hl } from "@/lib/Hl";

export function DataFetchingPatterns() {
	return (
		<section className="space-y-8" id="data-fetching">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">
					Data Fetching Patterns 📡
				</h2>
				<p className="text-muted-foreground">
					RSC unlocks patterns impossible in traditional React: colocated
					queries, server-level parallelism, and automatic deduplication.
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				{/* Parallel data fetching */}
				<Card className="border-green-500/20">
					<CardHeader>
						<CardTitle className="text-base text-green-600">
							✓ Parallel Fetching (preferred)
						</CardTitle>
						<CardDescription>
							Fire all independent requests simultaneously
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<pre className="rounded-md bg-muted/30 p-3 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
							{hl(`// ✓ Promise.all — both run in parallel
async function Page({ params }) {
  const [user, posts] = await Promise.all([
    fetchUser(params.id),
    fetchUserPosts(params.id),
  ]);
  return <Profile user={user} posts={posts} />;
}

// Total time = max(user, posts) instead of sum.
// If user=80ms and posts=120ms:
//   Sequential: 200ms
//   Parallel:   120ms ✓`)}
						</pre>
					</CardContent>
				</Card>

				{/* Sequential — when it's needed */}
				<Card className="border-yellow-500/20">
					<CardHeader>
						<CardTitle className="text-base text-yellow-600">
							⚠ Sequential (only when dependent)
						</CardTitle>
						<CardDescription>
							Use only when one request depends on another's result
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<pre className="rounded-md bg-muted/30 p-3 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
							{hl(`// Sequential — necessary because recommendations
// depend on the user's profile for personalisation
async function Page({ params }) {
  const user = await fetchUser(params.id);
  // Can't parallelise — we need user.preferences
  const recommendations = await fetchRecs(
    user.id,
    user.preferences
  );
  return <Feed user={user} items={recommendations} />;
}

// Minimise sequential waterfalls.
// If you can restructure the query to avoid
// the dependency, always do so.`)}
						</pre>
					</CardContent>
				</Card>

				{/* Colocated queries */}
				<Card className="border-blue-500/20">
					<CardHeader>
						<CardTitle className="text-base text-blue-600">
							✓ Colocated Queries
						</CardTitle>
						<CardDescription>
							Each component fetches its own data — React.cache deduplicates
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<pre className="rounded-md bg-muted/30 p-3 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
							{hl(`// lib/queries.ts — wrap with cache()
import { cache } from "react";

export const getUser = cache(async (id: string) => {
  return db.user.findUnique({ where: { id } });
});

// Header uses getUser
async function Header({ userId }) {
  const user = await getUser(userId); // hit
  return <nav>Hello, {user.name}</nav>;
}

// Page also uses getUser — deduplicated!
async function Page({ params }) {
  const user = await getUser(params.id); // no extra request
  return (
    <>
      <Header userId={params.id} />
      <UserDashboard user={user} />
    </>
  );
}
// Only ONE DB query executes. No prop drilling!`)}
						</pre>
					</CardContent>
				</Card>

				{/* Preloading pattern */}
				<Card className="border-purple-500/20">
					<CardHeader>
						<CardTitle className="text-base text-purple-600">
							✓ Preloading Pattern
						</CardTitle>
						<CardDescription>
							Kick off a fetch before awaiting it to eliminate waterfall
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<pre className="rounded-md bg-muted/30 p-3 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
							{hl(`// lib/queries.ts
import { cache } from "react";

// Expose preload() so callers can warm the cache
export const getProduct = cache(async (id: string) => {
  return db.product.findUnique({ where: { id } });
});
export function preloadProduct(id: string) {
  void getProduct(id); // fire-and-forget, caches result
}

// Parent starts the fetch immediately
async function ProductList({ ids }) {
  ids.forEach(preloadProduct); // ← warms cache for all
  const products = await Promise.all(ids.map(getProduct));
  return products.map((p) => <ProductCard product={p} />);
}

// Each ProductCard can also call getProduct(id)
// and will get the pre-warmed cached result instantly.`)}
						</pre>
					</CardContent>
				</Card>
			</div>

			{/* Pattern decision guide */}
			<Card>
				<CardHeader>
					<CardTitle>Pattern Decision Guide</CardTitle>
				</CardHeader>
				<CardContent>
					<DataFetchingFlow />
				</CardContent>
			</Card>
		</section>
	);
}
