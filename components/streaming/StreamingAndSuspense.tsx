import type { ReactNode } from "react";
import { BlockingVsStreamingFlow } from "@/components/flow/BlockingVsStreamingFlow";
import { StreamingFlow } from "@/components/flow/StreamingFlow";
import { BasicSuspenseDemo } from "@/components/streaming/BasicSuspenseDemo";
import { ErrorBoundaryDemo } from "@/components/streaming/ErrorBoundaryDemo";
import { NestedSuspenseDemo } from "@/components/streaming/NestedSuspenseDemo";
import { ParallelSuspenseDemo } from "@/components/streaming/ParallelSuspenseDemo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Minimal regex-based TSX syntax highlighter for code panels
function hl(code: string): ReactNode {
	const re =
		/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\/\*[\s\S]*?\*\/)|(\/\/[^\n]*)|(\b(?:import|export|default|from|async|function|return|const|let|type|interface|await|new|class|extends|null|undefined|true|false|void)\b)|(<\\?\/?[A-Z][A-Za-z0-9.]*)|(<\\?\/?[a-z][a-z0-9-]*)/g;
	const out: ReactNode[] = [];
	let last = 0;
	for (const m of code.matchAll(re)) {
		const [full, str, blk, cmt, kw, comp, tag] = m;
		const i = m.index ?? 0;
		if (i > last) {
			out.push(code.slice(last, i));
		}
		if (str !== undefined) {
			out.push(
				<span className="text-yellow-400" key={i}>
					{full}
				</span>
			);
		} else if (blk !== undefined || cmt !== undefined) {
			out.push(
				<span className="text-zinc-400 italic" key={i}>
					{full}
				</span>
			);
		} else if (kw !== undefined) {
			out.push(
				<span className="text-blue-400" key={i}>
					{full}
				</span>
			);
		} else if (comp !== undefined) {
			out.push(
				<span className="text-red-400" key={i}>
					{full}
				</span>
			);
		} else if (tag !== undefined) {
			out.push(
				<span className="text-green-400" key={i}>
					{full}
				</span>
			);
		}
		last = i + full.length;
	}
	if (last < code.length) {
		out.push(code.slice(last));
	}
	return <>{out}</>;
}

export default function StreamingAndSuspense() {
	return (
		<div className="container mx-auto max-w-7xl space-y-16 px-4 pt-24 pb-16 sm:px-6 md:pt-28 lg:px-8">
			{/* ─── Hero ────────────────────────────────────────────────── */}
			<section className="space-y-6">
				<div className="flex items-start gap-5">
					<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/50 shadow-lg shadow-primary/20">
						<span className="text-3xl">⚡</span>
					</div>
					<div>
						<h1 className="font-bold text-5xl tracking-tight">
							Streaming &amp; Suspense
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

			<Separator />

			{/* ─── What is Streaming ───────────────────────────────────── */}
			<section className="space-y-8">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						What is Streaming? 🌊
					</h2>
					<p className="text-muted-foreground">
						How HTML is chunked, sent progressively, and rendered on the client
					</p>
				</div>

				<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
					<CardContent className="space-y-6 pt-6">
						<p className="text-muted-foreground leading-relaxed">
							<strong className="text-foreground">
								Streaming Server Rendering (SSR)
							</strong>{" "}
							allows you to break down your page&apos;s HTML into smaller chunks
							and progressively send those chunks from the server to the client.
							This enables parts of your page to be displayed sooner, without
							waiting for all data to load on the server.
						</p>

						{/* SSR comparison — interactive flow diagrams */}
						<BlockingVsStreamingFlow />

						{/* Benefit pills */}
						<div className="grid gap-3 md:grid-cols-3">
							{[
								{
									icon: "🚀",
									title: "Faster First Paint (FP)",
									desc: "Users see meaningful content immediately, even before slow data loads",
								},
								{
									icon: "📊",
									title: "Better Core Web Vitals",
									desc: "Improved FCP, LCP, and TTI metrics through progressive loading",
								},
								{
									icon: "✨",
									title: "Perceived Performance",
									desc: "Progressive rendering feels faster and more responsive to users",
								},
							].map(({ icon, title, desc }) => (
								<div
									className="rounded-xl border border-border/40 bg-background/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-md"
									key={title}
								>
									<div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-lg">
										{icon}
									</div>
									<h3 className="mb-1 font-semibold text-sm">{title}</h3>
									<p className="text-muted-foreground text-xs leading-relaxed">
										{desc}
									</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</section>

			<Separator />

			{/* ─── How Suspense Works ──────────────────────────────────── */}
			<section className="space-y-8">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						How Suspense Works 🎯
					</h2>
					<p className="text-muted-foreground">
						React&apos;s declarative mechanism for async loading states
					</p>
				</div>

				<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
					<CardContent className="space-y-6 pt-6">
						<p className="text-muted-foreground leading-relaxed">
							<strong className="text-foreground">Suspense</strong> is
							React&apos;s mechanism for declaratively specifying loading states
							for asynchronous operations. When a component suspends (awaits
							async data), React shows a fallback UI until the component is
							ready.
						</p>

						{/* 3-step mechanism */}
						<div className="space-y-3">
							{[
								{
									step: "1",
									label: "Component Suspends",
									color: "blue" as const,
									code: (
										<>
											<span className="text-purple-400">async function </span>
											<span className="text-blue-400">DataComponent</span>
											<span className="text-foreground/90">{"() {\n"}</span>
											<span className="text-foreground/90">
												{"  const data = "}
											</span>
											<span className="text-purple-400">await </span>
											<span className="text-blue-400">fetchData</span>
											<span className="text-foreground/90">{"();"}</span>
											<span className="text-muted-foreground/60">
												{"  // 🛑 suspends here\n"}
											</span>
											<span className="text-purple-400">{"  return "}</span>
											<span className="text-foreground/90">{"<"}</span>
											<span className="text-green-400">div</span>
											<span className="text-foreground/90">{">{data}</"}</span>
											<span className="text-green-400">div</span>
											<span className="text-foreground/90">{">\n}"}</span>
										</>
									),
								},
								{
									step: "2",
									label: "React Shows Fallback",
									color: "orange" as const,
									code: (
										<>
											<span className="text-foreground/90">{"<"}</span>
											<span className="text-green-400">Suspense </span>
											<span className="text-orange-400">fallback</span>
											<span className="text-foreground/90">{"={<"}</span>
											<span className="text-green-400">Loading</span>
											<span className="text-foreground/90">
												{"  />}>\n  <"}
											</span>
											<span className="text-blue-400">DataComponent</span>
											<span className="text-foreground/90">{" />"}</span>
											<span className="text-muted-foreground/60">
												{"  {/* shows <Loading /> while waiting */}\n"}
											</span>
											<span className="text-foreground/90">{"</"}</span>
											<span className="text-green-400">Suspense</span>
											<span className="text-foreground/90">{">"}</span>
										</>
									),
								},
								{
									step: "3",
									label: "Component Streams In",
									color: "green" as const,
									code: (
										<>
											<span className="text-muted-foreground/60">
												{"// Server sends HTML chunk:\n"}
											</span>
											<span className="text-foreground/90">
												{'<div id="suspense-1">\n'}
											</span>
											<span className="text-foreground/90">
												{"  <div>Loaded data: ...</div>\n"}
											</span>
											<span className="text-foreground/90">{"</div>\n\n"}</span>
											<span className="text-muted-foreground/60">
												{"// React replaces fallback with real content"}
											</span>
										</>
									),
								},
							].map(({ step, label, code }) => (
								<div
									className="overflow-hidden rounded-xl border border-border/40"
									key={step}
								>
									<div className="flex items-center gap-3 border-border/40 border-b bg-muted/40 px-4 py-2.5">
										<div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 font-mono font-semibold text-primary text-xs">
											{step}
										</div>
										<span className="font-medium text-sm">{label}</span>
									</div>
									<pre className="overflow-x-auto bg-muted/20 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/30">
										{code}
									</pre>
								</div>
							))}
						</div>

						{/* Key characteristics */}
						<div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
							<h3 className="mb-3 font-semibold text-sm">
								Key Characteristics:
							</h3>
							<ul className="grid gap-2 sm:grid-cols-2">
								{[
									{
										title: "Declarative",
										desc: "Describe what to show while loading, not when",
									},
									{
										title: "Composable",
										desc: "Boundaries nest for granular control",
									},
									{
										title: "Non-blocking",
										desc: "Other parts of the page keep rendering",
									},
									{
										title: "Server-integrated",
										desc: "Works seamlessly with SSR and streaming",
									},
								].map(({ title, desc }) => (
									<li className="flex gap-2 text-sm" key={title}>
										<span className="text-primary">→</span>
										<span>
											<strong>{title}:</strong>{" "}
											<span className="text-muted-foreground">{desc}</span>
										</span>
									</li>
								))}
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>

			<Separator />

			{/* ─── Demos ───────────────────────────────────────────────── */}
			{[
				{
					id: "DEMO 1",
					title: "Basic Suspense Pattern",
					component: <BasicSuspenseDemo />,
				},
				{
					id: "DEMO 2",
					title: "Parallel Loading with Independent Boundaries",
					component: <ParallelSuspenseDemo />,
				},
				{
					id: "DEMO 3",
					title: "Nested Suspense Boundaries",
					component: <NestedSuspenseDemo />,
				},
				{
					id: "DEMO 4",
					title: "Error Boundaries + Suspense",
					component: <ErrorBoundaryDemo />,
				},
			].map(({ id, title, component }, i) => (
				<section className="space-y-6" key={id}>
					<div className="flex items-center gap-3">
						<Badge className="font-mono text-xs" variant="outline">
							{id}
						</Badge>
						<h2 className="font-semibold text-2xl tracking-tight">{title}</h2>
					</div>
					{component}
					{i < 3 && <Separator />}
				</section>
			))}

			<Separator />

			{/* ─── Streaming Architecture ──────────────────────────────── */}
			<section className="space-y-8">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						Streaming Architecture 🏗️
					</h2>
					<p className="text-muted-foreground">
						How the server and client collaborate to deliver progressive HTML
					</p>
				</div>

				<div className="space-y-6">
					{/* ASCII flow diagram */}
					<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="text-base">
								Complete Streaming Flow
							</CardTitle>
						</CardHeader>
						<CardContent>
							<StreamingFlow />
						</CardContent>
					</Card>

					{/* Best Practices / Anti-Patterns */}
					<div className="grid gap-6 md:grid-cols-2">
						<Card className="border-green-500/20 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-green-500/30 hover:shadow-lg">
							<CardHeader className="border-green-500/10 border-b">
								<CardTitle className="flex items-center gap-2 text-base">
									<span className="text-green-500">✓</span> Best Practices
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-4">
								<ul className="space-y-3 text-sm">
									{[
										{
											title: "Granular Boundaries",
											desc: "Place Suspense at component level, not page level",
										},
										{
											title: "Meaningful Fallbacks",
											desc: "Match loading skeleton to actual content structure",
										},
										{
											title: "Error Handling",
											desc: "Always wrap Suspense in Error Boundaries",
										},
										{
											title: "Critical First",
											desc: "Load above-the-fold content before below-the-fold",
										},
										{
											title: "Parallel Loading",
											desc: "Use multiple boundaries for concurrent data fetching",
										},
										{
											title: "Avoid Over-Suspending",
											desc: "Too many boundaries cause layout shift",
										},
									].map(({ title, desc }) => (
										<li className="flex gap-2" key={title}>
											<span className="mt-0.5 shrink-0 text-green-500">•</span>
											<span>
												<strong>{title}:</strong>{" "}
												<span className="text-muted-foreground">{desc}</span>
											</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>

						<Card className="border-destructive/20 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-destructive/30 hover:shadow-lg">
							<CardHeader className="border-destructive/10 border-b">
								<CardTitle className="flex items-center gap-2 text-base">
									<span className="text-destructive">✗</span> Anti-Patterns
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-4">
								<ul className="space-y-3 text-sm">
									{[
										{
											title: "Single Page Boundary",
											desc: "Wrapping entire page defeats streaming purpose",
										},
										{
											title: "Waterfall Fetching",
											desc: "Nested components that wait sequentially",
										},
										{
											title: "Client-Side Suspense",
											desc: "Using Suspense for client interactions (use state)",
										},
										{
											title: "Suspense Without Errors",
											desc: "Not handling async failures gracefully",
										},
										{
											title: "Blocking Data",
											desc: "Fetching data before rendering starts",
										},
										{
											title: "Generic Loaders",
											desc: "Using same loading UI for all content types",
										},
									].map(({ title, desc }) => (
										<li className="flex gap-2" key={title}>
											<span className="mt-0.5 shrink-0 text-destructive">
												•
											</span>
											<span>
												<strong>{title}:</strong>{" "}
												<span className="text-muted-foreground">{desc}</span>
											</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<Separator />

			{/* ─── Common Patterns ─────────────────────────────────────── */}
			<section className="space-y-8">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						Common Patterns 📝
					</h2>
					<p className="text-muted-foreground">
						Copy-ready patterns for the most frequent Suspense use cases
					</p>
				</div>

				<div className="space-y-6">
					{/* Pattern 1 */}
					<Card className="border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-lg">
						<CardHeader className="border-border/40 border-b">
							<CardTitle className="font-medium text-sm">
								Pattern 1 — Basic Server Component with Suspense
							</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<div className="flex items-center gap-2 border-border/40 border-b bg-muted/60 px-4 py-2">
								<div className="flex gap-1.5">
									<div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
									<div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
									<div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
								</div>
								<span className="font-mono text-muted-foreground text-xs">
									profile-page.tsx
								</span>
							</div>
							<pre className="overflow-x-auto bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
								{hl(`// Server Component (async by default)
async function UserProfile({ userId }: { userId: string }) {
  const user = await fetchUser(userId);  // No API route needed
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// Parent wraps with Suspense — skeleton shown while streaming
export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <UserProfile userId="123" />
    </Suspense>
  );
}`)}
							</pre>
						</CardContent>
					</Card>

					{/* Pattern 2 */}
					<Card className="border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-lg">
						<CardHeader className="border-border/40 border-b">
							<CardTitle className="font-medium text-sm">
								Pattern 2 — Parallel Loading with Multiple Boundaries
							</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<div className="flex items-center gap-2 border-border/40 border-b bg-muted/60 px-4 py-2">
								<div className="flex gap-1.5">
									<div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
									<div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
									<div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
								</div>
								<span className="font-mono text-muted-foreground text-xs">
									dashboard.tsx
								</span>
							</div>
							<pre className="overflow-x-auto bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
								{hl(`export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* All three fetch in parallel */}
      <Suspense fallback={<WidgetSkeleton />}>
        <RevenueWidget />   {/* fetches revenue */}
      </Suspense>

      <Suspense fallback={<WidgetSkeleton />}>
        <UsersWidget />     {/* fetches users  */}
      </Suspense>

      <Suspense fallback={<WidgetSkeleton />}>
        <OrdersWidget />    {/* fetches orders */}
      </Suspense>
    </div>
  );
}

// ✅ Total time = max(revenue, users, orders)
// ❌ NOT  revenue + users + orders`)}
							</pre>
						</CardContent>
					</Card>

					{/* Pattern 3 */}
					<Card className="border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-lg">
						<CardHeader className="border-border/40 border-b">
							<CardTitle className="font-medium text-sm">
								Pattern 3 — Error Boundary + Suspense Composition
							</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<div className="flex items-center gap-2 border-border/40 border-b bg-muted/60 px-4 py-2">
								<div className="flex gap-1.5">
									<div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
									<div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
									<div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
								</div>
								<span className="font-mono text-muted-foreground text-xs">
									product-page.tsx
								</span>
							</div>
							<pre className="overflow-x-auto bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
								{hl(`import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function ProductPage() {
  return (
    <ErrorBoundary fallback={<ProductError />}>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductDetails />
      </Suspense>
    </ErrorBoundary>
  );
}

// Handles three states:
// • Loading  → shows ProductSkeleton
// • Error    → shows ProductError (if fetch fails)
// • Success  → shows ProductDetails`)}
							</pre>
						</CardContent>
					</Card>

					{/* Pattern 4 */}
					<Card className="border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-lg">
						<CardHeader className="border-border/40 border-b">
							<CardTitle className="font-medium text-sm">
								Pattern 4 — Nested Suspense for Progressive Enhancement
							</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<div className="flex items-center gap-2 border-border/40 border-b bg-muted/60 px-4 py-2">
								<div className="flex gap-1.5">
									<div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
									<div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
									<div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
								</div>
								<span className="font-mono text-muted-foreground text-xs">
									article-page.tsx
								</span>
							</div>
							<pre className="overflow-x-auto bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
								{hl(`export default function ArticlePage() {
  return (
    <div>
      <Suspense fallback={<HeaderSkeleton />}>
        <ArticleHeader />          {/* critical, fast */}
      </Suspense>

      <Suspense fallback={<ContentSkeleton />}>
        <ArticleContent />         {/* medium */}

        <Suspense fallback={<CommentsSkeleton />}>
          <ArticleComments />      {/* non-critical, slow */}
        </Suspense>
      </Suspense>
    </div>
  );
}
// Stream order: Header → Content → Comments`)}
							</pre>
						</CardContent>
					</Card>

					{/* Anti-pattern */}
					<Card className="border-destructive/20 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-destructive/30 hover:shadow-lg">
						<CardHeader className="border-destructive/10 border-b">
							<CardTitle className="flex items-center gap-2 font-medium text-sm">
								<span className="text-destructive">⚠️</span>
								Anti-Pattern — Waterfall Loading
							</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<div className="flex items-center gap-2 border-border/40 border-b bg-muted/60 px-4 py-2">
								<div className="flex gap-1.5">
									<div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
									<div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
									<div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
								</div>
								<span className="font-mono text-muted-foreground text-xs">
									waterfall.tsx
								</span>
							</div>
							<pre className="overflow-x-auto bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
								{hl(`// ❌ BAD: Sequential loading (waterfall)
async function ParentComponent() {
  const data1 = await fetchData1();    // waits 2s

  return (
    <div>
      <Child1 data={data1} />
      <Suspense fallback={<Loading />}>
        <Child2 />                      {/* starts AFTER parent loads! */}
      </Suspense>
    </div>
  );
}
// Total time: 2s + 3s = 5s


// ✅ GOOD: Parallel loading
export default function ParentComponent() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Child1 />    {/* starts immediately */}
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Child2 />    {/* starts immediately */}
      </Suspense>
    </div>
  );
}
// Total time: max(2s, 3s) = 3s`)}
							</pre>
						</CardContent>
					</Card>
				</div>
			</section>

			<Separator />

			{/* ─── Advanced Concepts ───────────────────────────────────── */}
			<section className="space-y-8">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						Advanced Concepts 🎓
					</h2>
					<p className="text-muted-foreground">
						SuspenseProvider, selective hydration, and transition-aware loading
					</p>
				</div>

				<div className="space-y-6">
					{/* SuspenseProvider */}
					<Card className="border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-lg">
						<CardHeader className="border-border/40 border-b">
							<CardTitle className="text-base">
								Streaming with SuspenseProvider
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4 pt-5">
							<p className="text-muted-foreground text-sm leading-relaxed">
								Create reusable Suspense wrappers with the{" "}
								<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
									SuspenseProvider
								</code>{" "}
								pattern for consistent loading states across your application.
							</p>
							<div className="overflow-hidden rounded-xl border border-border/50">
								<div className="flex items-center gap-2 border-border/40 border-b bg-muted/60 px-4 py-2">
									<div className="flex gap-1.5">
										<div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
										<div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
										<div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
									</div>
									<span className="font-mono text-muted-foreground text-xs">
										SuspenseProvider.tsx
									</span>
								</div>
								<pre className="overflow-x-auto bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
									{hl(`// providers/SuspenseProvider.tsx
import { Suspense, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

export function SuspenseProvider({
  children,
  fallback = <DefaultLoader />,
}: Props) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

// Usage — drop-in replacement for raw <Suspense>
import { SuspenseProvider } from "@/providers/SuspenseProvider";

export default function Page() {
  return (
    <SuspenseProvider fallback={<CustomLoader />}>
      <AsyncContent />
    </SuspenseProvider>
  );
}`)}
								</pre>
							</div>
						</CardContent>
					</Card>

					{/* Selective Hydration */}
					<Card className="border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-lg">
						<CardHeader className="border-border/40 border-b">
							<CardTitle className="text-base">Selective Hydration</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4 pt-5">
							<p className="text-muted-foreground text-sm leading-relaxed">
								React&apos;s{" "}
								<strong className="text-foreground">Selective Hydration</strong>{" "}
								works with Suspense to prioritize interactive components.
								Components that haven&apos;t streamed yet don&apos;t block
								hydration of other parts.
							</p>
							<div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
								<h3 className="mb-3 font-semibold text-sm">How it works:</h3>
								<ol className="ml-4 list-decimal space-y-2 text-muted-foreground text-xs">
									<li>
										Server sends static HTML shell with Suspense placeholders
									</li>
									<li>
										Client immediately hydrates available (non-suspended)
										content
									</li>
									<li>When user interacts, React prioritizes that component</li>
									<li>
										Suspended components hydrate as they stream in from server
									</li>
									<li>Page becomes progressively interactive</li>
								</ol>
							</div>
						</CardContent>
					</Card>

					{/* Transition API */}
					<Card className="border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-lg">
						<CardHeader className="border-border/40 border-b">
							<CardTitle className="text-base">
								Transition API with Suspense
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4 pt-5">
							<p className="text-muted-foreground text-sm leading-relaxed">
								Use{" "}
								<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
									useTransition
								</code>{" "}
								to show the current UI while new content loads in the
								background, avoiding jarring fallbacks during navigation.
							</p>
							<div className="overflow-hidden rounded-xl border border-border/50">
								<div className="flex items-center gap-2 border-border/40 border-b bg-muted/60 px-4 py-2">
									<div className="flex gap-1.5">
										<div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
										<div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
										<div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
									</div>
									<span className="font-mono text-muted-foreground text-xs">
										product-list.tsx
									</span>
								</div>
								<pre className="overflow-x-auto bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
									{hl(`"use client";
import { useTransition, useState } from "react";

export function ProductList() {
  const [isPending, startTransition] = useTransition();
  const [category, setCategory] = useState("all");

  return (
    <div>
      <button
        onClick={() => {
          startTransition(() => {
            setCategory("new"); // doesn't block the UI
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
}`)}
								</pre>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<Separator />

			{/* ─── Performance Impact ──────────────────────────────────── */}
			<section className="space-y-8">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						Performance Impact 📊
					</h2>
					<p className="text-muted-foreground">
						Measured improvements in Core Web Vitals from streaming
					</p>
				</div>

				<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
					<CardContent className="space-y-6 pt-6">
						<div className="grid gap-4 md:grid-cols-2">
							{[
								{
									label: "First Contentful Paint (FCP)",
									value: "-40%",
									desc: "Users see content faster with streaming shell",
								},
								{
									label: "Largest Contentful Paint (LCP)",
									value: "-30%",
									desc: "Main content appears sooner with parallel loading",
								},
								{
									label: "Time to Interactive (TTI)",
									value: "-50%",
									desc: "Selective hydration makes pages interactive faster",
								},
								{
									label: "Total Blocking Time (TBT)",
									value: "-60%",
									desc: "Progressive hydration reduces main thread blocking",
								},
							].map(({ label, value, desc }) => (
								<div
									className="rounded-xl border border-primary/20 bg-primary/5 p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md"
									key={label}
								>
									<p className="mb-2 font-semibold text-sm">{label}</p>
									<div className="flex items-baseline gap-2">
										<span className="font-bold text-3xl text-primary tracking-tight">
											{value}
										</span>
										<span className="text-muted-foreground text-xs">
											average improvement
										</span>
									</div>
									<p className="mt-2 text-muted-foreground text-xs">{desc}</p>
								</div>
							))}
						</div>

						<div className="rounded-xl border border-border/40 bg-muted/30 p-4">
							<p className="mb-1.5 font-semibold text-sm">
								📈 Real-world example
							</p>
							<p className="text-muted-foreground text-xs leading-relaxed">
								A dashboard with 5 widgets: Without streaming, users wait for
								the slowest widget (5s). With streaming + parallel loading,
								users see the page shell immediately and widgets appear as they
								load — the page is fully interactive in ~5s but usable after
								~1s.
							</p>
						</div>
					</CardContent>
				</Card>
			</section>

			<Separator />

			{/* ─── Key Takeaways ───────────────────────────────────────── */}
			<section>
				<Card className="border-primary/20 bg-linear-to-br from-primary/5 to-transparent">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-xl">
							<span className="text-2xl">💡</span> Key Takeaways
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="grid gap-4 md:grid-cols-2">
							{[
								{
									key: "Streaming",
									desc: "breaks HTML into chunks and sends them progressively, improving perceived performance",
								},
								{
									key: "Suspense",
									desc: "declaratively marks async boundaries with loading fallbacks — no manual loading state needed",
								},
								{
									key: "Error Boundaries",
									desc: "catch rendering errors in async components and prevent full page crashes",
								},
								{
									key: "Parallel loading",
									desc: "with multiple boundaries reduces total load time to the slowest single request",
								},
								{
									key: "Avoid waterfalls",
									desc: "by fetching data at the component level, not in parent-child chains",
								},
								{
									key: "Selective hydration",
									desc: "makes pages interactive progressively as components stream in",
								},
								{
									key: "Granular boundaries",
									desc: "at component level provide better UX than page-level boundaries",
								},
								{
									key: "Error Boundaries + Suspense",
									desc: "should always be combined in production for resilient apps",
								},
							].map(({ key, desc }) => (
								<li className="flex gap-3 text-sm leading-relaxed" key={key}>
									<span className="mt-0.5 shrink-0 text-primary">→</span>
									<span>
										<strong className="text-foreground">{key}</strong> {desc}
									</span>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			</section>
		</div>
	);
}
