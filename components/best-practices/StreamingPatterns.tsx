import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function StreamingPatterns() {
	return (
		<section className="space-y-8" id="streaming-patterns">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">
					Streaming & Suspense Patterns ⚡
				</h2>
				<p className="text-muted-foreground">
					Streaming transforms a slow all-or-nothing page load into a
					progressively revealed experience. Suspense is the mechanism — use it
					deliberately to unblock important content and keep users engaged.
				</p>
			</div>

			{/* Core principle */}
			<Card className="border-primary/20 bg-primary/5">
				<CardContent className="pt-6">
					<p className="font-semibold text-foreground">
						Principle: Identify the Critical Path, Suspend Everything Else
					</p>
					<p className="mt-2 text-muted-foreground leading-relaxed">
						Render your layout, navigation, and above-the-fold content
						immediately. Wrap slow data — recommendations, activity feeds,
						secondary panels — in{" "}
						<code className="rounded bg-muted px-1 text-foreground">
							{"<Suspense>"}
						</code>{" "}
						so they stream in without blocking the critical path. Users see a
						useful page in milliseconds, not seconds.
					</p>
				</CardContent>
			</Card>

			{/* loading.tsx vs inline Suspense */}
			<div className="grid gap-6 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="text-base">
							loading.tsx — Route-level Streaming
						</CardTitle>
						<CardDescription>
							Next.js automatically wraps your page in a Suspense boundary
						</CardDescription>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// app/products/loading.tsx
// Automatically shown while page.tsx suspends

import { ProductGridSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="container">
      <div className="mb-8">
        {/* Skeleton for page header */}
        <div className="h-10 w-64 rounded bg-muted animate-pulse" />
        <div className="mt-2 h-5 w-96 rounded bg-muted animate-pulse" />
      </div>
      <ProductGridSkeleton count={12} />
    </div>
  );
}

// ✓ Layout and navigation render immediately
// ✓ Loading skeleton shown until page data resolves
// ✓ Matches the shape of the real content`}
						</pre>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-base">
							Inline Suspense — Granular Streaming
						</CardTitle>
						<CardDescription>
							Wrap individual slow sections — unblock the rest of the page
						</CardDescription>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`import { Suspense } from "react";

// ✓ Fast parts render immediately
// ✓ Slow parts stream in without blocking others
async function ProductPage({ id }) {
  const product = await getProduct(id); // fast ( <30ms cached)

  return (
    <div>
      <ProductHeader product={product} />   {/* fast */}
      <ProductDescription product={product} /> {/* fast */}

      {/* Stream in slow sections independently */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews productId={id} />    {/* slow — DB query */}
      </Suspense>

      <Suspense fallback={<RecommendationsSkeleton />}>
        <Recommendations productId={id} />   {/* slow — ML service */}
      </Suspense>
    </div>
  );
}`}
						</pre>
					</CardContent>
				</Card>
			</div>

			{/* Skeleton best practices */}
			<Card className="border-blue-500/20">
				<CardHeader>
					<CardTitle className="text-base text-blue-600">
						Design Skeletons to Match the Real Content
					</CardTitle>
					<CardDescription>
						Good skeletons reduce perceived loading time and prevent layout
						shift
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<pre className="rounded-md bg-red-500/10 p-3 font-mono text-xs leading-relaxed">
						{`// ✗ Generic spinner — no shape hint
function Fallback() {
  return (
    <div className="flex items-center justify-center h-64">
      <Spinner />
    </div>
  );
}
// Problems:
// - Doesn't hint at the shape of incoming content
// - Causes large layout shift when real content arrives
// - Feels slow even when data comes back quickly`}
					</pre>
					<pre className="rounded-md bg-green-500/10 p-3 font-mono text-xs leading-relaxed">
						{`// ✓ Shape-matched skeleton — same layout as content
function ProductCardSkeleton() {
  return (
    <div className="rounded-lg border p-4 space-y-3">
      {/* Matches image area */}
      <div className="h-48 rounded-md bg-muted animate-pulse" />
      {/* Matches title */}
      <div className="h-5 w-3/4 rounded bg-muted animate-pulse" />
      {/* Matches price */}
      <div className="h-4 w-1/4 rounded bg-muted animate-pulse" />
      {/* Matches button */}
      <div className="h-9 w-full rounded bg-muted animate-pulse" />
    </div>
  );
}
// Same grid dimensions as the real card — zero layout shift`}
					</pre>
				</CardContent>
			</Card>

			{/* Nested Suspense boundaries */}
			<Card>
				<CardHeader>
					<CardTitle className="text-base">
						Nested Suspense — Prioritised Reveal Order
					</CardTitle>
					<CardDescription>
						Inner boundaries resolve independently; the outermost fallback
						covers the whole subtree
					</CardDescription>
				</CardHeader>
				<CardContent>
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// ✓ Nested boundaries stream independently
async function DashboardPage() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Critical: resolves first */}
      <Suspense fallback={<MetricsSkeleton />}>
        <MetricsPanel />           {/* DB query ~50ms */}
      </Suspense>

      {/* Secondary: can take longer */}
      <div className="col-span-2">
        <Suspense fallback={<ChartSkeleton />}>
          <ActivityChart />        {/* analytics query ~300ms */}
        </Suspense>

        {/* Nested: only shown after ActivityChart area is ready */}
        <Suspense fallback={<FeedSkeleton />}>
          <RecentActivity />       {/* feed query ~200ms */}
        </Suspense>
      </div>
    </div>
  );
}

// MetricsPanel streams in at ~50ms
// RecentActivity streams in at ~200ms
// ActivityChart streams in at ~300ms
// Page feels fast from the first 50ms ✓`}
					</pre>
				</CardContent>
			</Card>

			{/* Common mistakes */}
			<div className="grid gap-6 lg:grid-cols-2">
				<Card className="border-red-500/20">
					<CardHeader>
						<CardTitle className="text-base text-red-600">
							✗ Suspense Too High Up
						</CardTitle>
						<CardDescription>
							Wrapping the whole page defeats the purpose of streaming
						</CardDescription>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// ✗ One Suspense for the entire page
// Fast sections also wait for the slowest fetch
function Dashboard() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <MetricsPanel />      {/*  50ms */}
      <RecentActivity />    {/* 200ms */}
      <ActivityChart />     {/* 300ms — everything waits for this */}
    </Suspense>
  );
}
// User sees a spinner for 300ms, then everything at once
// Effectively same as not streaming at all`}
						</pre>
					</CardContent>
				</Card>

				<Card className="border-green-500/20">
					<CardHeader>
						<CardTitle className="text-base text-green-600">
							✓ Granular Suspense Boundaries
						</CardTitle>
						<CardDescription>
							Each section reveals as soon as its own data is ready
						</CardDescription>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// ✓ Independent boundaries — content streams progressively
function Dashboard() {
  return (
    <>
      {/* Shows at ~50ms */}
      <Suspense fallback={<MetricsSkeleton />}>
        <MetricsPanel />
      </Suspense>

      {/* Shows at ~200ms */}
      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivity />
      </Suspense>

      {/* Shows at ~300ms */}
      <Suspense fallback={<ChartSkeleton />}>
        <ActivityChart />
      </Suspense>
    </>
  );
}
// Progressive reveal — perceived performance is far better ✓`}
						</pre>
					</CardContent>
				</Card>
			</div>

			{/* use() hook from Client Components */}
			<Card className="border-purple-500/20">
				<CardHeader>
					<CardTitle className="text-base">
						Streaming Data into Client Components with{" "}
						<code className="rounded bg-muted px-1 font-mono text-sm">
							use()
						</code>
					</CardTitle>
					<CardDescription>
						Pass a Promise from a Server Component to a Client Component — the
						CC suspends until resolved
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// Server Component — creates the Promise
async function Page({ userId }) {
  // Don't await — pass the Promise directly
  const userPromise = getUser(userId);

  return (
    <Suspense fallback={<ProfileSkeleton />}>
      {/* Client Component receives the Promise */}
      <ProfileCard userPromise={userPromise} />
    </Suspense>
  );
}`}
					</pre>
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// Client Component — unwraps with use()
"use client";
import { use } from "react";

function ProfileCard({
  userPromise,
}: {
  userPromise: Promise<User>;
}) {
  // use() suspends until the Promise resolves
  // Suspense boundary above catches the suspension
  const user = use(userPromise);

  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
    </div>
  );
}
// ✓ Data starts fetching on the server
// ✓ Client component suspends gracefully
// ✓ No waterfall: fetch starts before hydration`}
					</pre>
				</CardContent>
			</Card>
		</section>
	);
}
