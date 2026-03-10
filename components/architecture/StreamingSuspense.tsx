import { BlockingVsStreamingFlow } from "@/components/flow";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

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
			<BlockingVsStreamingFlow />

			{/* Suspense anatomy */}
			<Card>
				<CardHeader>
					<CardTitle>Suspense Boundary Anatomy</CardTitle>
					<CardDescription>
						How Suspense works in a Server Component tree
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					<CodeBlock
						code={`// Server Component tree with Suspense
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
						variant="muted"
					/>

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
					<CodeBlock
						code={`export default function ProductPage({ params }) {
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
						variant="muted"
					/>
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
					<CodeBlock
						code={`// Server Component — create promise and pass it down
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
						variant="muted"
					/>
				</CardContent>
			</Card>
		</section>
	);
}
