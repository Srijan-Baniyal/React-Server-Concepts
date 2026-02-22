import { BasicSuspenseDemo } from "@/components/streaming/BasicSuspenseDemo";
import { ErrorBoundaryDemo } from "@/components/streaming/ErrorBoundaryDemo";
import { NestedSuspenseDemo } from "@/components/streaming/NestedSuspenseDemo";
import { ParallelSuspenseDemo } from "@/components/streaming/ParallelSuspenseDemo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function StreamingPage() {
	return (
		<div className="container mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
			{/* Hero Section */}
			<section className="space-y-6">
				<div className="flex items-center gap-4">
					<div className="flex h-16 w-16 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/50 shadow-lg shadow-primary/20">
						<span className="text-3xl">⚡</span>
					</div>
					<div>
						<h1 className="font-bold text-5xl tracking-tight">
							Streaming & Suspense
						</h1>
						<p className="mt-2 text-lg text-muted-foreground">
							Progressive rendering with error boundaries in React Server
							Components
						</p>
					</div>
				</div>

				<Card className="border-primary/20 bg-primary/5">
					<CardContent className="pt-6">
						<p className="text-lg leading-relaxed">
							<strong className="text-foreground">Streaming</strong> and{" "}
							<strong className="text-foreground">Suspense</strong> are
							fundamental patterns in React Server Components that enable{" "}
							<strong className="text-primary">progressive rendering</strong>.
							Instead of waiting for all data to load before showing anything,
							you can send HTML to the client in chunks as it becomes ready.
						</p>
					</CardContent>
				</Card>
			</section>

			<Separator className="my-12" />

			{/* What is Streaming - Deep Dive */}
			<section className="space-y-8">
				<div>
					<h2 className="mb-4 font-semibold text-3xl">What is Streaming? 🌊</h2>

					<div className="space-y-6">
						<Card>
							<CardContent className="pt-6">
								<div className="space-y-4">
									<p className="text-muted-foreground leading-relaxed">
										<strong className="text-foreground">
											Streaming Server Rendering (SSR)
										</strong>{" "}
										allows you to break down your page's HTML into smaller
										chunks and progressively send those chunks from the server
										to the client. This enables parts of your page to be
										displayed sooner, without waiting for all data to load on
										the server.
									</p>

									<div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
										<h3 className="mb-3 font-semibold text-foreground text-sm">
											🔄 Traditional SSR vs Streaming SSR
										</h3>
										<div className="grid gap-4 md:grid-cols-2">
											<div className="space-y-2">
												<p className="font-medium text-destructive text-sm">
													❌ Traditional SSR (Blocking)
												</p>
												<pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs">
													{`1. Server fetches ALL data
2. Server renders ALL HTML
3. Server sends COMPLETE page
4. Client receives & hydrates
   
⏱️ Total: Wait for slowest data`}
												</pre>
											</div>
											<div className="space-y-2">
												<p className="font-medium text-green-600 text-sm">
													✅ Streaming SSR (Progressive)
												</p>
												<pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs">
													{`1. Server sends page shell
2. Client renders shell
3. Server streams in sections
4. Client updates incrementally
   
⏱️  Fast initial paint`}
												</pre>
											</div>
										</div>
									</div>

									<div className="grid gap-3 md:grid-cols-3">
										<div className="rounded-lg border border-border/50 bg-accent/30 p-4">
											<div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
												<span>🚀</span>
											</div>
											<h3 className="mb-1 font-semibold text-sm">
												Faster First Paint (FP)
											</h3>
											<p className="text-muted-foreground text-xs leading-relaxed">
												Users see meaningful content immediately, even before
												slow data loads
											</p>
										</div>
										<div className="rounded-lg border border-border/50 bg-accent/30 p-4">
											<div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
												<span>📊</span>
											</div>
											<h3 className="mb-1 font-semibold text-sm">
												Better Core Web Vitals
											</h3>
											<p className="text-muted-foreground text-xs leading-relaxed">
												Improved FCP, LCP, and TTI metrics through progressive
												loading
											</p>
										</div>
										<div className="rounded-lg border border-border/50 bg-accent/30 p-4">
											<div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
												<span>✨</span>
											</div>
											<h3 className="mb-1 font-semibold text-sm">
												Perceived Performance
											</h3>
											<p className="text-muted-foreground text-xs leading-relaxed">
												Progressive rendering feels faster and more responsive
												to users
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<Separator className="my-12" />

			{/* How Suspense Works */}
			<section className="space-y-8">
				<div>
					<h2 className="mb-4 font-semibold text-3xl">How Suspense Works 🎯</h2>

					<Card>
						<CardContent className="pt-6">
							<div className="space-y-6">
								<p className="text-muted-foreground leading-relaxed">
									<strong className="text-foreground">Suspense</strong> is
									React's mechanism for declaratively specifying loading states
									for asynchronous operations. When a component suspends (awaits
									async data), React shows a fallback UI until the component is
									ready.
								</p>

								<div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
									<h3 className="mb-3 font-semibold text-foreground text-sm">
										⚙️ Suspense Mechanism
									</h3>
									<div className="space-y-3">
										<div>
											<p className="mb-2 font-medium text-sm">
												1. Component Suspends
											</p>
											<pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs">
												{`async function DataComponent() {
  const data = await fetchData(); // 🛑 Suspends here
  return <div>{data}</div>;
}`}
											</pre>
										</div>
										<div>
											<p className="mb-2 font-medium text-sm">
												2. React Shows Fallback
											</p>
											<pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs">
												{`<Suspense fallback={<Loading />}>
  <DataComponent /> {/* While waiting, shows <Loading /> */}
</Suspense>`}
											</pre>
										</div>
										<div>
											<p className="mb-2 font-medium text-sm">
												3. Component Streams In
											</p>
											<pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs">
												{`// Server sends HTML chunk:
<div id="suspense-boundary-1">
  <div>Loaded data: ...</div>
</div>

// React replaces fallback with real content`}
											</pre>
										</div>
									</div>
								</div>

								<div className="space-y-3">
									<h3 className="font-semibold text-sm">
										Key Characteristics:
									</h3>
									<ul className="space-y-2">
										<li className="flex gap-3">
											<span className="text-primary">→</span>
											<span className="text-sm">
												<strong>Declarative:</strong> You describe what to show
												while loading, not when to show it
											</span>
										</li>
										<li className="flex gap-3">
											<span className="text-primary">→</span>
											<span className="text-sm">
												<strong>Composable:</strong> Suspense boundaries can be
												nested for granular control
											</span>
										</li>
										<li className="flex gap-3">
											<span className="text-primary">→</span>
											<span className="text-sm">
												<strong>Non-blocking:</strong> Other parts of the page
												continue rendering
											</span>
										</li>
										<li className="flex gap-3">
											<span className="text-primary">→</span>
											<span className="text-sm">
												<strong>Server-integrated:</strong> Works seamlessly
												with SSR and streaming
											</span>
										</li>
									</ul>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<Separator className="my-12" />

			{/* Demo 1: Basic Suspense */}
			<section className="space-y-6">
				<div>
					<div className="mb-6 flex items-center gap-3">
						<Badge className="font-mono text-xs" variant="outline">
							DEMO 1
						</Badge>
						<h2 className="font-semibold text-2xl">Basic Suspense Pattern</h2>
					</div>
					<BasicSuspenseDemo />
				</div>
			</section>

			<Separator className="my-12" />

			{/* Demo 2: Parallel Suspense */}
			<section className="space-y-6">
				<div>
					<div className="mb-6 flex items-center gap-3">
						<Badge className="font-mono text-xs" variant="outline">
							DEMO 2
						</Badge>
						<h2 className="font-semibold text-2xl">
							Parallel Loading with Independent Boundaries
						</h2>
					</div>
					<ParallelSuspenseDemo />
				</div>
			</section>

			<Separator className="my-12" />

			{/* Demo 3: Nested Suspense */}
			<section className="space-y-6">
				<div>
					<div className="mb-6 flex items-center gap-3">
						<Badge className="font-mono text-xs" variant="outline">
							DEMO 3
						</Badge>
						<h2 className="font-semibold text-2xl">
							Nested Suspense Boundaries
						</h2>
					</div>
					<NestedSuspenseDemo />
				</div>
			</section>

			<Separator className="my-12" />

			{/* Demo 4: Error Boundaries */}
			<section className="space-y-6">
				<div>
					<div className="mb-6 flex items-center gap-3">
						<Badge className="font-mono text-xs" variant="outline">
							DEMO 4
						</Badge>
						<h2 className="font-semibold text-2xl">
							Error Boundaries + Suspense
						</h2>
					</div>
					<ErrorBoundaryDemo />
				</div>
			</section>

			<Separator className="my-12" />

			{/* Architecture & Patterns */}
			<section className="space-y-8">
				<div>
					<h2 className="mb-6 font-semibold text-3xl">
						Streaming Architecture 🏗️
					</h2>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Complete Streaming Flow</CardTitle>
							</CardHeader>
							<CardContent>
								<pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs leading-relaxed">
									{`┌─────────────────────────────────────────────────────────────┐
│ CLIENT REQUEST                                              │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│ SERVER: Generate Page Shell (Synchronous)                  │
│  ├─ Static HTML structure                                  │
│  ├─ <Suspense> boundaries marked                           │
│  └─ Send to client immediately ⚡                           │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│ CLIENT: Displays Page Shell                                │
│  └─ Shows fallback UI for suspended components             │
└────────────────────────────┬────────────────────────────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
┌───────────────────────┐    ┌───────────────────────┐
│ SERVER: Async Data 1  │    │ SERVER: Async Data 2  │
│  (Fast - 1s)          │    │  (Slow - 3s)          │
└──────────┬────────────┘    └──────────┬────────────┘
           │                            │
           ▼                            │
┌────────────────────────┐              │
│ Stream Component 1     │              │
│  to client at ~1s      │              │
└────────────────────────┘              │
                                        ▼
                             ┌────────────────────────┐
                             │ Stream Component 2     │
                             │  to client at ~3s      │
                             └────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────┐
│ CLIENT: Fully Interactive Page                             │
│  └─ All async components rendered and hydrated             │
└─────────────────────────────────────────────────────────────┘`}
								</pre>
							</CardContent>
						</Card>

						<div className="grid gap-6 md:grid-cols-2">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-base">
										<span className="text-green-500">✓</span> Best Practices
									</CardTitle>
								</CardHeader>
								<CardContent>
									<ul className="space-y-3 text-sm">
										<li className="flex gap-2">
											<span className="text-primary">•</span>
											<span>
												<strong>Granular Boundaries:</strong> Place Suspense at
												component level, not page level
											</span>
										</li>
										<li className="flex gap-2">
											<span className="text-primary">•</span>
											<span>
												<strong>Meaningful Fallbacks:</strong> Match loading
												skeleton to actual content structure
											</span>
										</li>
										<li className="flex gap-2">
											<span className="text-primary">•</span>
											<span>
												<strong>Error Handling:</strong> Always wrap Suspense in
												Error Boundaries
											</span>
										</li>
										<li className="flex gap-2">
											<span className="text-primary">•</span>
											<span>
												<strong>Critical First:</strong> Load above-the-fold
												content before below-the-fold
											</span>
										</li>
										<li className="flex gap-2">
											<span className="text-primary">•</span>
											<span>
												<strong>Parallel Loading:</strong> Use multiple
												boundaries for concurrent data fetching
											</span>
										</li>
										<li className="flex gap-2">
											<span className="text-primary">•</span>
											<span>
												<strong>Avoid Over-Suspending:</strong> Too many
												boundaries cause layout shift
											</span>
										</li>
									</ul>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-base">
										<span className="text-destructive">✗</span> Anti-Patterns
									</CardTitle>
								</CardHeader>
								<CardContent>
									<ul className="space-y-3 text-sm">
										<li className="flex gap-2">
											<span className="text-destructive">•</span>
											<span>
												<strong>Single Page Boundary:</strong> Wrapping entire
												page defeats streaming purpose
											</span>
										</li>
										<li className="flex gap-2">
											<span className="text-destructive">•</span>
											<span>
												<strong>Waterfall Fetching:</strong> Nested components
												that wait sequentially
											</span>
										</li>
										<li className="flex gap-2">
											<span className="text-destructive">•</span>
											<span>
												<strong>Client-Side Suspense:</strong> Using Suspense
												for client interactions (use state)
											</span>
										</li>
										<li className="flex gap-2">
											<span className="text-destructive">•</span>
											<span>
												<strong>Suspense Without Errors:</strong> Not handling
												async failures gracefully
											</span>
										</li>
										<li className="flex gap-2">
											<span className="text-destructive">•</span>
											<span>
												<strong>Blocking Data:</strong> Fetching data before
												rendering starts
											</span>
										</li>
										<li className="flex gap-2">
											<span className="text-destructive">•</span>
											<span>
												<strong>Generic Loaders:</strong> Using same loading UI
												for all content types
											</span>
										</li>
									</ul>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			<Separator className="my-12" />

			{/* Code Patterns Section */}
			<section className="space-y-8">
				<div>
					<h2 className="mb-6 font-semibold text-3xl">Common Patterns 📝</h2>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">
									Pattern 1: Basic Server Component with Suspense
								</CardTitle>
							</CardHeader>
							<CardContent>
								<pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs">
									<code>{`// Server Component (async by default)
async function UserProfile({ userId }: { userId: string }) {
  // Direct data fetching - no API route needed
  const user = await fetchUser(userId);
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// Parent Component
export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <UserProfile userId="123" />
    </Suspense>
  );
}`}</code>
								</pre>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">
									Pattern 2: Parallel Loading with Multiple Boundaries
								</CardTitle>
							</CardHeader>
							<CardContent>
								<pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs">
									<code>{`export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* All three fetch in parallel */}
      <Suspense fallback={<WidgetSkeleton />}>
        <RevenueWidget />  {/* Fetches revenue data */}
      </Suspense>
      
      <Suspense fallback={<WidgetSkeleton />}>
        <UsersWidget />    {/* Fetches user data */}
      </Suspense>
      
      <Suspense fallback={<WidgetSkeleton />}>
        <OrdersWidget />   {/* Fetches order data */}
      </Suspense>
    </div>
  );
}

// ✅ Total time = max(revenue, users, orders)
// ❌ NOT revenue + users + orders`}</code>
								</pre>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">
									Pattern 3: Error Boundary + Suspense Composition
								</CardTitle>
							</CardHeader>
							<CardContent>
								<pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs">
									<code>{`import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function ProductPage() {
  return (
    <ErrorBoundary fallback={<ProductError />}>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductDetails />
      </Suspense>
    </ErrorBoundary>
  );
}

// Handles both states:
// - Loading: Shows ProductSkeleton
// - Error: Shows ProductError (if fetch fails)
// - Success: Shows ProductDetails`}</code>
								</pre>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">
									Pattern 4: Nested Suspense for Progressive Enhancement
								</CardTitle>
							</CardHeader>
							<CardContent>
								<pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs">
									<code>{`export default function ArticlePage() {
  return (
    <div>
      {/* Critical content - fast */}
      <Suspense fallback={<HeaderSkeleton />}>
        <ArticleHeader />
      </Suspense>
      
      {/* Main content - medium */}
      <Suspense fallback={<ContentSkeleton />}>
        <ArticleContent />
        
        {/* Non-critical - slow */}
        <Suspense fallback={<CommentsSkeleton />}>
          <ArticleComments />
        </Suspense>
      </Suspense>
    </div>
  );
}

// Load order: Header → Content → Comments`}</code>
								</pre>
							</CardContent>
						</Card>

						<Card className="border-destructive/20">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-base">
									<span className="text-destructive">⚠️</span>
									Anti-Pattern: Waterfall Loading
								</CardTitle>
							</CardHeader>
							<CardContent>
								<pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs">
									<code>{`// ❌ BAD: Sequential loading (waterfall)
async function ParentComponent() {
  const data1 = await fetchData1();  // Wait 2s
  
  return (
    <div>
      <Child1 data={data1} />
      <Suspense fallback={<Loading />}>
        <Child2 />  {/* Starts after Parent loads! */}
      </Suspense>
    </div>
  );
}

async function Child2() {
  const data2 = await fetchData2();  // Another 3s
  return <div>{data2}</div>;
}

// Total time: 2s + 3s = 5s


// ✅ GOOD: Parallel loading
export default function ParentComponent() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Child1 />  {/* Starts immediately */}
      </Suspense>
      
      <Suspense fallback={<Loading />}>
        <Child2 />  {/* Starts immediately */}
      </Suspense>
    </div>
  );
}

// Total time: max(2s, 3s) = 3s`}</code>
								</pre>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<Separator className="my-12" />

			{/* Advanced Concepts */}
			<section className="space-y-8">
				<div>
					<h2 className="mb-6 font-semibold text-3xl">Advanced Concepts 🎓</h2>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Streaming with SuspenseProvider</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-muted-foreground text-sm leading-relaxed">
									You can create reusable Suspense wrappers with the{" "}
									<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
										SuspenseProvider
									</code>{" "}
									pattern. This is useful for consistent loading states across
									your application.
								</p>
								<pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs">
									<code>{`// providers/SuspenseProvider.tsx
import { Suspense, ReactNode } from "react";

interface SuspenseProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function SuspenseProvider({ 
  children, 
  fallback = <DefaultLoader /> 
}: SuspenseProviderProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

// Usage
import { SuspenseProvider } from "@/providers/SuspenseProvider";

export default function Page() {
  return (
    <SuspenseProvider fallback={<CustomLoader />}>
      <AsyncContent />
    </SuspenseProvider>
  );
}`}</code>
								</pre>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Selective Hydration</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-muted-foreground text-sm leading-relaxed">
									React's <strong>Selective Hydration</strong> works with
									Suspense to prioritize interactive components. Components that
									haven't streamed yet don't block hydration of other parts.
								</p>
								<div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
									<h3 className="mb-2 font-semibold text-sm">How it works:</h3>
									<ol className="ml-4 list-decimal space-y-2 text-muted-foreground text-xs">
										<li>
											Server sends static HTML shell with Suspense placeholders
										</li>
										<li>
											Client immediately hydrates available (non-suspended)
											content
										</li>
										<li>
											When user interacts, React prioritizes that component
										</li>
										<li>
											Suspended components hydrate as they stream in from server
										</li>
										<li>Page becomes progressively interactive</li>
									</ol>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Transition API with Suspense</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-muted-foreground text-sm leading-relaxed">
									Use{" "}
									<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
										useTransition
									</code>{" "}
									to show the current UI while new content loads in the
									background.
								</p>
								<pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs">
									<code>{`"use client";

import { useTransition, useState } from "react";

export function ProductList() {
  const [isPending, startTransition] = useTransition();
  const [category, setCategory] = useState("all");
  
  return (
    <div>
      <button
        onClick={() => {
          startTransition(() => {
            setCategory("new");  // Update doesn't block UI
          });
        }}
        className={isPending ? "opacity-50" : ""}
      >
        New Products
      </button>
      
      <Suspense fallback={<Loading />}>
        <Products category={category} />
      </Suspense>
    </div>
  );
}`}</code>
								</pre>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<Separator className="my-12" />

			{/* Performance Metrics */}
			<section className="space-y-8">
				<div>
					<h2 className="mb-6 font-semibold text-3xl">Performance Impact 📊</h2>

					<Card>
						<CardContent className="pt-6">
							<div className="space-y-6">
								<div>
									<h3 className="mb-3 font-semibold">
										Streaming improves key metrics:
									</h3>
									<div className="grid gap-4 md:grid-cols-2">
										<div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
											<p className="mb-2 font-semibold text-sm">
												First Contentful Paint (FCP)
											</p>
											<div className="flex items-baseline gap-2">
												<span className="font-bold text-2xl text-primary">
													-40%
												</span>
												<span className="text-muted-foreground text-xs">
													average improvement
												</span>
											</div>
											<p className="mt-2 text-muted-foreground text-xs">
												Users see content faster with streaming shell
											</p>
										</div>

										<div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
											<p className="mb-2 font-semibold text-sm">
												Largest Contentful Paint (LCP)
											</p>
											<div className="flex items-baseline gap-2">
												<span className="font-bold text-2xl text-primary">
													-30%
												</span>
												<span className="text-muted-foreground text-xs">
													average improvement
												</span>
											</div>
											<p className="mt-2 text-muted-foreground text-xs">
												Main content appears sooner with parallel loading
											</p>
										</div>

										<div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
											<p className="mb-2 font-semibold text-sm">
												Time to Interactive (TTI)
											</p>
											<div className="flex items-baseline gap-2">
												<span className="font-bold text-2xl text-primary">
													-50%
												</span>
												<span className="text-muted-foreground text-xs">
													average improvement
												</span>
											</div>
											<p className="mt-2 text-muted-foreground text-xs">
												Selective hydration makes pages interactive faster
											</p>
										</div>

										<div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
											<p className="mb-2 font-semibold text-sm">
												Total Blocking Time (TBT)
											</p>
											<div className="flex items-baseline gap-2">
												<span className="font-bold text-2xl text-primary">
													-60%
												</span>
												<span className="text-muted-foreground text-xs">
													average improvement
												</span>
											</div>
											<p className="mt-2 text-muted-foreground text-xs">
												Progressive hydration reduces main thread blocking
											</p>
										</div>
									</div>
								</div>

								<div className="rounded-lg border border-border/50 bg-accent/30 p-4">
									<p className="mb-2 font-semibold text-sm">
										📈 Real-world example:
									</p>
									<p className="text-muted-foreground text-xs leading-relaxed">
										A dashboard with 5 widgets: Without streaming, users wait
										for the slowest widget (5s). With streaming + parallel
										loading, users see the page shell immediately and widgets
										appear as they load, with the page fully interactive in ~5s
										but usable after ~1s.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<Separator className="my-12" />

			{/* Key Takeaways */}
			<section>
				<Card className="border-primary/20 bg-primary/5">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-xl">
							<span className="text-2xl">💡</span> Key Takeaways
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="grid gap-4 md:grid-cols-2">
							<li className="flex gap-3">
								<span className="text-primary">→</span>
								<span className="text-sm leading-relaxed">
									<strong>Streaming</strong> breaks HTML into chunks and sends
									them progressively, improving perceived performance
								</span>
							</li>
							<li className="flex gap-3">
								<span className="text-primary">→</span>
								<span className="text-sm leading-relaxed">
									<strong>Suspense</strong> declaratively marks async boundaries
									with loading fallbacks, no manual loading state needed
								</span>
							</li>
							<li className="flex gap-3">
								<span className="text-primary">→</span>
								<span className="text-sm leading-relaxed">
									<strong>Error Boundaries</strong> catch rendering errors in
									async components and prevent full page crashes
								</span>
							</li>
							<li className="flex gap-3">
								<span className="text-primary">→</span>
								<span className="text-sm leading-relaxed">
									<strong>Parallel loading</strong> with multiple boundaries
									reduces total load time significantly
								</span>
							</li>
							<li className="flex gap-3">
								<span className="text-primary">→</span>
								<span className="text-sm leading-relaxed">
									<strong>Avoid waterfalls</strong> by fetching data at the
									component level, not in parent-child chains
								</span>
							</li>
							<li className="flex gap-3">
								<span className="text-primary">→</span>
								<span className="text-sm leading-relaxed">
									<strong>Selective hydration</strong> makes pages interactive
									progressively as components stream in
								</span>
							</li>
							<li className="flex gap-3">
								<span className="text-primary">→</span>
								<span className="text-sm leading-relaxed">
									<strong>Granular boundaries</strong> at component level
									provide better UX than page-level boundaries
								</span>
							</li>
							<li className="flex gap-3">
								<span className="text-primary">→</span>
								<span className="text-sm leading-relaxed">
									Always combine Suspense with <strong>Error Boundaries</strong>{" "}
									in production for resilient apps
								</span>
							</li>
						</ul>
					</CardContent>
				</Card>
			</section>
		</div>
	);
}
