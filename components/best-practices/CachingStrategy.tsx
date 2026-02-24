import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const CACHE_LAYERS = [
	{
		name: "Request Memoization",
		emoji: "🔁",
		lifetime: "Single render tree",
		color: "border-green-500/20",
		badgeClass: "bg-green-500/10 text-green-600",
		tip: "Use React.cache() to wrap any function that fetches data. Two Server Components calling the same wrapped function with the same argument share one result — no extra DB round-trips.",
	},
	{
		name: "Data Cache (fetch)",
		emoji: "💾",
		lifetime: "Across requests & deploys",
		color: "border-blue-500/20",
		badgeClass: "bg-blue-500/10 text-blue-600",
		tip: "Next.js extends fetch() with { next: { revalidate } }. Tag responses with next.tags to enable on-demand purging via revalidateTag().",
	},
	{
		name: "Full Route Cache",
		emoji: "🗂️",
		lifetime: "Build time → invalidated on redeploy or revalidation",
		color: "border-yellow-500/20",
		badgeClass: "bg-yellow-500/10 text-yellow-600",
		tip: "Applies to statically rendered routes. Any dynamic function (cookies, headers, searchParams) opts the route out automatically.",
	},
	{
		name: "Router Cache",
		emoji: "⚡",
		lifetime: "Browser session (30s dynamic / 5min static)",
		color: "border-purple-500/20",
		badgeClass: "bg-purple-500/10 text-purple-600",
		tip: "RSC payloads are cached in the browser on <Link> prefetch. Call router.refresh() to bust stale data after a mutation.",
	},
];

export function CachingStrategy() {
	return (
		<section className="space-y-8" id="caching-strategy">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">Caching Strategy 🗄️</h2>
				<p className="text-muted-foreground">
					Next.js has four distinct caching layers. Understanding which layer
					applies — and how to intentionally control each — is the difference
					between a fast app and an unpredictably stale one.
				</p>
			</div>

			{/* Layer overview */}
			<div className="grid gap-4 sm:grid-cols-2">
				{CACHE_LAYERS.map((layer) => (
					<Card className={layer.color} key={layer.name}>
						<CardHeader className="pb-2">
							<div className="flex items-center gap-2">
								<span className="text-xl">{layer.emoji}</span>
								<CardTitle className="text-base">{layer.name}</CardTitle>
							</div>
							<Badge
								className={`w-fit text-xs ${layer.badgeClass}`}
								variant="secondary"
							>
								{layer.lifetime}
							</Badge>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground text-sm leading-relaxed">
								{layer.tip}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			{/* fetch() cache control */}
			<Card>
				<CardHeader>
					<CardTitle className="text-base">
						fetch() Cache Options — Choose Per Call
					</CardTitle>
					<CardDescription>
						Match the cache directive to the data's freshness requirements
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// Static data — cache indefinitely (default)
const config = await fetch("/api/config");

// Time-based revalidation — refresh every hour
const prices = await fetch("/api/prices", {
  next: { revalidate: 3600 },
});

// Never cache — always fresh (dynamic data)
const cart = await fetch("/api/cart", {
  cache: "no-store",
});

// Tag for on-demand invalidation
const products = await fetch("/api/products", {
  next: {
    tags: ["products"],
    revalidate: 300, // also revalidate every 5 min
  },
});`}
					</pre>
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// Invalidation from a Server Action
"use server";
import {
  revalidateTag,
  revalidatePath,
} from "next/cache";

export async function updateProduct(id: string, data) {
  await db.product.update({ where: { id }, data });

  // Purge all responses tagged "products"
  revalidateTag("products");

  // Also purge the product detail page
  revalidatePath(\`/products/\${id}\`);
}

// On-demand purge via route handler
// app/api/revalidate/route.ts
export async function POST(req: Request) {
  const { tag, secret } = await req.json();
  if (secret !== process.env.REVALIDATE_SECRET)
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  revalidateTag(tag);
  return Response.json({ revalidated: true });
}`}
					</pre>
				</CardContent>
			</Card>

			{/* Opt-out of Full Route Cache */}
			<Card className="border-yellow-500/20">
				<CardHeader>
					<CardTitle className="text-base text-yellow-700 dark:text-yellow-500">
						Dynamic Signals — Opting Out of Full Route Cache
					</CardTitle>
					<CardDescription>
						These calls make a route dynamic. Use them deliberately, not
						accidentally.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// Any of these opts the ENTIRE route out of
// Full Route Cache:

import { cookies, headers } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";

// Reading cookies or headers
const token = (await cookies()).get("token");

// Reading searchParams (in Pages, not layouts)
// export default function Page({ searchParams }) {...}

// Calling noStore() explicitly
noStore(); // force-dynamic for this component

// fetch with cache: "no-store"
await fetch(url, { cache: "no-store" });

// ⚠ Only call these when you actually need
// per-request dynamic data. Static is always faster.`}
					</pre>
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// ✓ Route caching config via segment options
// app/dashboard/layout.tsx

// Force all routes in this segment to be dynamic
export const dynamic = "force-dynamic";

// Or set a default revalidation interval
export const revalidate = 60; // seconds

// Force static (will error if dynamic APIs used)
export const dynamic = "force-static";


// Per-page revalidation overrides layout config:
// app/dashboard/page.tsx
export const revalidate = 300; // 5 min for this page only


// ✓ Best practice: be explicit. Don't let
// accidental cookies() calls make routes dynamic.`}
					</pre>
				</CardContent>
			</Card>

			{/* React.cache best practices */}
			<Card className="border-green-500/20">
				<CardHeader>
					<CardTitle className="text-base text-green-600">
						React.cache() — Best Practices
					</CardTitle>
					<CardDescription>
						Deduplicate data access functions per render — not per deployment
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// ✓ Wrap at the data-access layer, not at
// the component level

// lib/queries/user.ts
import { cache } from "react";

export const getUser = cache(async (id: string) => {
  return db.user.findUnique({
    where: { id },
    select: { id: true, name: true, avatar: true, role: true },
  });
});

export const getUserWithPosts = cache(
  async (id: string) => {
    return db.user.findUnique({
      where: { id },
      include: { posts: { take: 10, orderBy: { createdAt: "desc" } } },
    });
  }
);
// Each unique (function + args) gets one cached result.`}
						</pre>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// ✓ OK to call in multiple components
// React.cache is per-render, not global state

// Navbar.tsx
const user = await getUser(session.userId);
// returns cached result if called elsewhere in tree

// Breadcrumbs.tsx
const user = await getUser(session.userId); // ← cache HIT ✓

// Profile.tsx
const user = await getUser(session.userId); // ← cache HIT ✓


// ⚠ React.cache() resets on every new
// incoming Request — it is NOT shared
// across users or deployments.
// Use fetch() + Data Cache for cross-request caching.`}
						</pre>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
