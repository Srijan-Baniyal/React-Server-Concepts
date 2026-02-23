import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const CACHES = [
	{
		name: "Request Memoization",
		scope: "Single render pass",
		where: "In-memory (Node.js process)",
		color: "border-green-500/20",
		badgeColor: "bg-green-500/10 text-green-600",
		description:
			"Deduplicates identical fetch() or react.cache() calls within one React render tree. Call the same URL in 10 Server Components — only one network request fires.",
		code: `// Both components call the same URL —
// only ONE DB/network request per render

const getUser = cache(async (id: string) => {
  return db.user.findUnique({ where: { id } });
});

async function Header() {
  const user = await getUser("u_1"); // hit
}
async function Sidebar() {
  const user = await getUser("u_1"); // deduplicated ✓
}`,
	},
	{
		name: "Data Cache",
		scope: "Across requests & deploys",
		where: "Persistent (filesystem / CDN)",
		color: "border-blue-500/20",
		badgeColor: "bg-blue-500/10 text-blue-600",
		description:
			"Stores fetch() results on disk. Survives server restarts. Controlled per-call via revalidate or cache options, or on-demand via revalidateTag / revalidatePath.",
		code: `// Cache indefinitely (default)
fetch(url);

// Cache for 1 hour
fetch(url, { next: { revalidate: 3600 } });

// Never cache
fetch(url, { cache: "no-store" });

// Tag for on-demand invalidation
fetch(url, { next: { tags: ["products"] } });

// Invalidate from a Server Action
revalidateTag("products");
revalidatePath("/products");`,
	},
	{
		name: "Full Route Cache",
		scope: "Across requests",
		where: "Server filesystem",
		color: "border-yellow-500/20",
		badgeColor: "bg-yellow-500/10 text-yellow-600",
		description:
			"Caches the full rendered RSC payload + HTML of static routes at build time. Dynamic routes bypass this entirely. Invalidated by revalidate config or on-demand revalidation.",
		code: `// ✓ Static route — Full Route Cache active
export default async function Page() {
  const data = await fetch(staticUrl); // cached
  return <Component data={data} />;
}

// ✗ Dynamic route — Full Route Cache bypassed
import { cookies } from "next/headers";
export default async function Page() {
  await cookies(); // dynamic signal → no cache
  const user = await getUser();
  return <Dashboard user={user} />;
}`,
	},
	{
		name: "Router Cache",
		scope: "Browser session",
		where: "Client memory",
		color: "border-purple-500/20",
		badgeColor: "bg-purple-500/10 text-purple-600",
		description:
			"Holds prefetched RSC Flight payloads in the browser for instant back/forward and repeated navigations. Expires: 30s (dynamic segments), 5 min (static segments).",
		code: `// Prefetch on hover (default for <Link>)
<Link href="/products">Products</Link>

// Disable prefetch for heavy pages
<Link href="/dashboard" prefetch={false}>
  Dashboard
</Link>

// Programmatic navigation & cache control
router.push("/products");
router.replace("/products");
router.refresh(); // clears router cache +
                  // re-fetches current page`,
	},
];

export function CachingLayers() {
	return (
		<section className="space-y-8" id="caching">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">Caching Layers 🗄️</h2>
				<p className="text-muted-foreground">
					Next.js has four independent caches that compose to give blazing-fast
					responses while staying fresh. They operate at different granularities
					and lifetimes.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				{CACHES.map(
					({ name, scope, where, color, badgeColor, description, code }) => (
						<Card className={color} key={name}>
							<CardHeader className="pb-3">
								<div className="flex items-start justify-between gap-2">
									<CardTitle className="text-base">{name}</CardTitle>
									<Badge
										className={`shrink-0 text-xs ${badgeColor}`}
										variant="outline"
									>
										{scope}
									</Badge>
								</div>
								<CardDescription className="text-xs">{where}</CardDescription>
							</CardHeader>
							<CardContent className="space-y-3">
								<p className="text-muted-foreground text-sm">{description}</p>
								<pre className="overflow-x-auto rounded-md bg-background/60 p-3 font-mono text-[10px] leading-relaxed">
									{code}
								</pre>
							</CardContent>
						</Card>
					)
				)}
			</div>

			{/* Cache interaction flow */}
			<Card>
				<CardHeader>
					<CardTitle>Cache Interaction Flow</CardTitle>
					<CardDescription>
						How the four caches interact on an incoming request
					</CardDescription>
				</CardHeader>
				<CardContent>
					<pre className="overflow-x-auto rounded-md bg-muted p-4 font-mono text-xs leading-relaxed">
						{`Incoming Request
   │
   ▼  CACHE HIT ────────────────────────────────► Response (instant)
Router Cache (browser)
   │ MISS
   ▼  CACHE HIT ────────────────────────────────► Response (fast)
Full Route Cache (server filesystem)
   │ MISS
   ▼
React Server Component render
   │
   ├── fetch(url) / db query
   │      │  HIT ──────────────────────────────► use cached data
   │   Data Cache (persistent)
   │      │ MISS
   │      │  HIT (same URL in same render) ────► deduplicated
   │   Request Memoization (in-memory)
   │      │ MISS
   │      ▼
   │   Network / Database ← actual I/O
   │
   ▼
Rendered RSC Payload →──► populate Full Route Cache (if static)
                       →──► send to browser
                       →──► browser stores in Router Cache`}
					</pre>
				</CardContent>
			</Card>

			{/* Invalidation cheatsheet */}
			<Card>
				<CardHeader>
					<CardTitle>Invalidation Cheatsheet</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full text-xs">
							<thead>
								<tr className="border-border/50 border-b">
									<th className="py-2 pr-4 text-left font-semibold">Method</th>
									<th className="py-2 pr-4 text-left font-semibold">
										Invalidates
									</th>
									<th className="py-2 text-left font-semibold">
										Where to call
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border/30 text-muted-foreground">
								{[
									[
										"revalidatePath('/products')",
										"Data Cache + Full Route Cache for that path",
										"Server Action / Route Handler",
									],
									[
										"revalidateTag('products')",
										"Data Cache entries with that tag (across paths)",
										"Server Action / Route Handler",
									],
									[
										"router.refresh()",
										"Router Cache for current page",
										"Client Component",
									],
									[
										"export const revalidate = 60",
										"Full Route Cache after 60s (ISR)",
										"Route segment config",
									],
									[
										"fetch(url, { cache: 'no-store' })",
										"Data Cache opt-out for this specific fetch",
										"Server Component / utility",
									],
								].map(([method, invalidates, where]) => (
									<tr key={method as string}>
										<td className="py-2 pr-4 font-mono text-[10px] text-foreground">
											{method}
										</td>
										<td className="py-2 pr-4">{invalidates}</td>
										<td className="py-2">{where}</td>
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
