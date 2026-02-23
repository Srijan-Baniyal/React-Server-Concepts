import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function StreamingSuspense() {
	return (
		<section className="space-y-8" id="streaming">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">
					Streaming &amp; Suspense 🌊
				</h2>
				<p className="text-muted-foreground">
					React 18's concurrent engine lets the server flush HTML incrementally.
					Suspense boundaries act as "await points" — content above them renders
					immediately while slower parts stream in later.
				</p>
			</div>

			{/* Blocking vs streaming timeline */}
			<div className="grid gap-4 md:grid-cols-2">
				<Card className="border-red-500/20">
					<CardHeader>
						<div className="flex items-center gap-2">
							<CardTitle className="text-base">Blocking SSR (old)</CardTitle>
							<Badge className="text-[10px]" variant="destructive">
								No Streaming
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`t=0    Request arrives
       ├── DB query A (~50ms)
       ├── DB query B (~200ms)
       └── DB query C (~80ms)
              ↓
t=200  ALL queries done
       ├── Render full page
       └── Send entire HTML
              ↓
t=220  Browser receives everything
       └── First paint (TTFB = 200ms!)

User sees blank screen for 200ms.
One slow query blocks everything.`}
						</pre>
					</CardContent>
				</Card>
				<Card className="border-green-500/20">
					<CardHeader>
						<div className="flex items-center gap-2">
							<CardTitle className="text-base">Streaming SSR (RSC)</CardTitle>
							<Badge
								className="bg-green-500/10 text-[10px] text-green-600"
								variant="outline"
							>
								Progressive
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`t=0    Request arrives
       ├── DB query A (~50ms) ──► flush at t=50
       ├── DB query B (~200ms) ─► flush at t=200
       └── DB query C (~80ms) ──► flush at t=80
              ↓
t=1ms  HTML shell + Suspense fallbacks sent
t=50   Chunk A streamed & swapped in browser
t=80   Chunk C streamed & swapped in browser
t=200  Chunk B streamed & swapped in browser

User sees page shell at t=1ms.
Each section appears as data resolves!`}
						</pre>
					</CardContent>
				</Card>
			</div>

			{/* Suspense anatomy */}
			<Card>
				<CardHeader>
					<CardTitle>Suspense Boundary Anatomy</CardTitle>
					<CardDescription>
						How Suspense works in a Server Component tree
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					<pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// Server Component tree with Suspense
export default function Dashboard() {
  return (
    <div>
      <Header />                          {/* ← rendered immediately */}

      <Suspense fallback={<UserSkeleton />}>
        <UserProfile />                   {/* ← async, streams when ready */}
      </Suspense>

      <Suspense fallback={<FeedSkeleton />}>
        <FeedItems />                     {/* ← async, independent stream */}
      </Suspense>

      <SidebarStats />                    {/* ← rendered immediately */}

      <Suspense fallback={<p>Loading notifications…</p>}>
        <Notifications />                 {/* ← async, independent stream */}
      </Suspense>
    </div>
  );
}

// UserProfile, FeedItems, Notifications all await data concurrently.
// They DON'T block each other.`}
					</pre>

					<div className="grid gap-3 text-xs sm:grid-cols-3">
						{[
							{
								title: "loading.tsx = Implicit Suspense",
								body: "Placing a loading.tsx in any route segment automatically wraps the page in <Suspense fallback={<Loading />}>. No manual wrapping needed.",
							},
							{
								title: "error.tsx = Implicit Error Boundary",
								body: "Placing an error.tsx wraps the segment in an Error Boundary. Must be 'use client' to use the error prop and reset() function.",
							},
							{
								title: "Nested Suspense Strategy",
								body: "Wrap the smallest possible granular unit. A Suspense too high in the tree means a large skeleton. Too low means unnecessary complexity.",
							},
						].map(({ title, body }) => (
							<div
								className="rounded-lg border border-border/50 bg-accent/30 p-3"
								key={title}
							>
								<p className="font-medium">{title}</p>
								<p className="mt-1 text-muted-foreground">{body}</p>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Nested Suspense */}
			<Card>
				<CardHeader>
					<CardTitle>Nested Suspense — Progressive Enhancement</CardTitle>
					<CardDescription>
						Outer resolves first, inner resolves independently
					</CardDescription>
				</CardHeader>
				<CardContent>
					<pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`export default function ProductPage({ params }) {
  return (
    // ① Fast — product info resolves first (~30ms)
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails id={params.id}>
        {/* ② Slower — reviews resolve independently (~300ms) */}
        <Suspense fallback={<ReviewsSkeleton />}>
          <Reviews productId={params.id} />
        </Suspense>
      </ProductDetails>
    </Suspense>
  );
}

Timeline:
  t=0    Shell sent with both skeletons
  t=30   <ProductDetails> resolves → outer skeleton replaced
           <ReviewsSkeleton> still visible inside
  t=300  <Reviews> resolves → inner skeleton replaced
           Page fully populated`}
					</pre>
				</CardContent>
			</Card>

			{/* use() hook for client */}
			<Card>
				<CardHeader>
					<CardTitle>
						<code>use(promise)</code> — Async in Client Components
					</CardTitle>
					<CardDescription>
						React 19 allows Client Components to Suspend on a passed-down
						Promise
					</CardDescription>
				</CardHeader>
				<CardContent>
					<pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// Server Component — create promise and pass it down
import { use } from "react";

async function Page() {
  // Do NOT await here — pass the Promise itself
  const userPromise = fetchUser();

  return (
    <Suspense fallback={<Spinner />}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}

// Client Component — consumes the promise with use()
"use client";
function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise); // Suspends until resolved ✓
  return <div>{user.name}</div>;
}

// Why? The Server Component kicks off the fetch immediately.
// The Client Component suspends without blocking hydration.
// Waterfall avoided: data fetch starts at server, not after hydration.`}
					</pre>
				</CardContent>
			</Card>
		</section>
	);
}
