import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function DataFetchingGuidelines() {
	return (
		<section className="space-y-8" id="data-fetching-guidelines">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">
					Data Fetching Guidelines 📡
				</h2>
				<p className="text-muted-foreground">
					RSC makes data fetching composable, colocated, and deduplication-safe.
					These patterns maximize performance while keeping your code readable.
				</p>
			</div>

			{/* Rule 1 - Fetch at the component that needs the data */}
			<Card className="border-primary/20 bg-primary/5">
				<CardContent className="pt-6">
					<p className="font-semibold text-foreground">
						Principle: Fetch data as close to where it's used as possible.
					</p>
					<p className="mt-2 text-muted-foreground leading-relaxed">
						In RSC, you don't need to "lift state up" to a parent just so it can
						hand data down via props. Each Server Component can fetch its own
						data directly. Wrap shared fetches in{" "}
						<code className="rounded bg-muted px-1 text-foreground">
							React.cache()
						</code>{" "}
						to deduplicate identical calls within a single render tree — no
						network request fires twice.
					</p>
				</CardContent>
			</Card>

			{/* Parallel vs Sequential */}
			<div className="grid gap-6 lg:grid-cols-2">
				<Card className="border-green-500/20">
					<CardHeader>
						<CardTitle className="text-base text-green-600">
							✓ Parallel Fetching (always prefer)
						</CardTitle>
						<CardDescription>
							Fire all independent requests simultaneously with Promise.all
						</CardDescription>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// ✓ Both fetches run concurrently
async function ProfilePage({ userId }: { userId: string }) {
  const [user, posts, followers] = await Promise.all([
    getUser(userId),
    getUserPosts(userId),
    getFollowers(userId),
  ]);

  // Time = max(user, posts, followers) not sum
  // If each takes 100ms: total = 100ms not 300ms

  return (
    <>
      <ProfileHeader user={user} />
      <FollowerCount count={followers.length} />
      <PostFeed posts={posts} />
    </>
  );
}`}
						</pre>
					</CardContent>
				</Card>

				<Card className="border-red-500/20">
					<CardHeader>
						<CardTitle className="text-base text-red-600">
							✗ Sequential Waterfall (avoid unless dependent)
						</CardTitle>
						<CardDescription>
							Each await blocks the next — turns into a slow waterfall
						</CardDescription>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// ✗ Waterfall — posts waits for user to finish!
async function ProfilePage({ userId }: { userId: string }) {
  const user = await getUser(userId);      // 100ms
  const posts = await getUserPosts(userId); // 100ms (waits!)
  const followers = await getFollowers(userId); // 100ms (waits!)

  // Total = 300ms instead of 100ms

  return (
    <>
      <ProfileHeader user={user} />
      <FollowerCount count={followers.length} />
      <PostFeed posts={posts} />
    </>
  );
}

// ✓ Sequential is only justified when the second
// request depends on the first's return value:
async function Page({ userId }) {
  const user = await getUser(userId);
  // Recommendations need user.preferences — can't parallelize
  const recs = await getRecommendations(user.preferences);
  return <Feed user={user} items={recs} />;
}`}
						</pre>
					</CardContent>
				</Card>
			</div>

			{/* Colocated queries with React.cache */}
			<Card>
				<CardHeader>
					<CardTitle className="text-base">
						Colocated Queries with{" "}
						<code className="rounded bg-muted px-1 font-mono text-sm">
							React.cache()
						</code>
					</CardTitle>
					<CardDescription>
						Multiple components can call the same query — React deduplicates
						automatically within the render tree
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
							lib/queries.ts — wrap with cache()
						</p>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`import { cache } from "react";
import { db } from "@/lib/db";

// Deduplicated per React render tree
export const getUser = cache(async (id: string) => {
  console.log("DB hit for user", id); // fires ONCE
  return db.user.findUnique({ where: { id } });
});

export const getProduct = cache(
  async (id: string) => db.product.findUnique({ where: { id } })
);`}
						</pre>
					</div>
					<div className="space-y-2">
						<p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
							Multiple components calling the same query
						</p>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// Header.tsx — Server Component
import { getUser } from "@/lib/queries";
async function Header() {
  const user = await getUser("u_1"); // ← DB hit #1
  return <Avatar src={user.avatar} />;
}

// Sidebar.tsx — Server Component
import { getUser } from "@/lib/queries";
async function Sidebar() {
  const user = await getUser("u_1"); // ← DEDUPLICATED ✓
  return <p>Welcome, {user.name}</p>;
}

// Both called in the same render tree.
// React.cache() ensures only ONE DB query fires.`}
						</pre>
					</div>
				</CardContent>
			</Card>

			{/* Never fetch in Client Components when avoidable */}
			<div className="grid gap-6 lg:grid-cols-2">
				<Card className="border-red-500/20">
					<CardHeader>
						<CardTitle className="text-base text-red-600">
							✗ Fetching in Client Component with useEffect
						</CardTitle>
						<CardDescription>
							Adds client bundle weight, causes loading flicker, no caching
						</CardDescription>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`"use client";

// ✗ Avoid unless you genuinely can't use a SC
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then(r => r.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;
  // Problem: visible loading flash on every visit
  // Problem: fetch happens AFTER hydration
  // Problem: no server caching
  return products.map(p => <ProductCard key={p.id} product={p} />);
}`}
						</pre>
					</CardContent>
				</Card>

				<Card className="border-green-500/20">
					<CardHeader>
						<CardTitle className="text-base text-green-600">
							✓ Fetch in Server Component + stream with Suspense
						</CardTitle>
						<CardDescription>
							No client JS, instant streamed HTML, server-cached
						</CardDescription>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`import { Suspense } from "react";
import { ProductCardSkeleton } from "./skeletons";

// ✓ Server Component — no "use client" needed
async function ProductList() {
  const products = await getProducts(); // cached + deduped
  return products.map(p => (
    <ProductCard key={p.id} product={p} />
  ));
}

// Parent wraps with Suspense for streaming
function ProductPage() {
  return (
    <Suspense
      fallback={
        <div className="grid gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      }
    >
      <ProductList />
    </Suspense>
  );
}
// Result: HTML streams in, no useEffect, no flicker`}
						</pre>
					</CardContent>
				</Card>
			</div>

			{/* Avoid prop drilling — access data where needed */}
			<Card className="border-blue-500/20">
				<CardHeader>
					<CardTitle className="text-base">
						Avoid Prop Drilling — Each Component Owns Its Data
					</CardTitle>
					<CardDescription>
						RSC eliminates the need to thread data through multiple component
						layers
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Badge
							className="border-red-500/40 text-red-600 text-xs"
							variant="outline"
						>
							✗ Before RSC — prop drilling
						</Badge>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// Page fetches everything and drills it down
async function Page({ userId }) {
  const user = await getUser(userId);
  return <Layout user={user} />;
}
function Layout({ user }) {
  return <Sidebar user={user} />;
}
function Sidebar({ user }) {
  return <Avatar user={user} />;
}
// user passed through Layout and Sidebar
// just to reach Avatar — fragile & verbose`}
						</pre>
					</div>
					<div className="space-y-2">
						<Badge
							className="border-green-500/40 text-green-600 text-xs"
							variant="outline"
						>
							✓ With RSC — colocated, no prop drilling
						</Badge>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// Each component fetches exactly what it needs
async function Page({ userId }) {
  return <Layout userId={userId} />;
}
// Layout doesn't care about user data
function Layout({ userId }) {
  return <Sidebar userId={userId} />;
}
// Avatar fetches its own data — React.cache dedupes
async function Avatar({ userId }) {
  const user = await getUser(userId); // cache hit if called before
  return <img src={user.avatarUrl} />;
}
// No prop drilling. user is fetched once thanks to cache()`}
						</pre>
					</div>
				</CardContent>
			</Card>

			{/* N+1 queries */}
			<Card className="border-yellow-500/20">
				<CardHeader>
					<CardTitle className="text-base text-yellow-700 dark:text-yellow-500">
						⚠ Watch for N+1 Query Problems
					</CardTitle>
					<CardDescription>
						Colocated queries are powerful but can still cause N+1 if used
						naively in loops
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<pre className="rounded-md bg-red-500/10 p-3 font-mono text-xs leading-relaxed">
						{`// ✗ N+1 — one DB query per post
async function PostFeed({ authorId }) {
  const posts = await getPosts(authorId); // 1 query

  return posts.map(post => (
    <PostCard key={post.id} post={post} />
  ));
}

async function PostCard({ post }) {
  // ✗ Fires once for EVERY post!
  const author = await getUser(post.authorId);
  return <div>{author.name}: {post.title}</div>;
}
// 1 + N queries total — very expensive at scale`}
					</pre>
					<pre className="rounded-md bg-green-500/10 p-3 font-mono text-xs leading-relaxed">
						{`// ✓ Batch fetch — one query for all authors
async function PostFeed({ authorId }) {
  const posts = await getPosts(authorId); // 1 query

  // Fetch all authors in one round-trip
  const authorIds = [...new Set(posts.map(p => p.authorId))];
  const authors = await getUsersByIds(authorIds); // 1 query
  const authorMap = new Map(authors.map(a => [a.id, a]));

  return posts.map(post => (
    <PostCard
      key={post.id}
      post={post}
      author={authorMap.get(post.authorId)}
    />
  ));
}
// Total: 2 queries regardless of post count ✓`}
					</pre>
				</CardContent>
			</Card>
		</section>
	);
}
