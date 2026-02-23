import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const STRATEGIES = [
	{
		label: "Static (SSG)",
		icon: "🗿",
		color: "border-slate-500/20 bg-slate-500/5",
		badge: "bg-slate-500/10 text-slate-600",
		when: "Build time",
		revalidate: "Never (or on-demand)",
		useCase: "Marketing pages, docs, blogs",
		code: `// default — static (no dynamic APIs used)
export default async function Page() {
  const data = await fetch(url); // cached indefinitely
  return <Component data={data} />;
}`,
	},
	{
		label: "ISR",
		icon: "⏱️",
		color: "border-yellow-500/20 bg-yellow-500/5",
		badge: "bg-yellow-500/10 text-yellow-600",
		when: "Build + background regen",
		revalidate: "After N seconds",
		useCase: "Product listings, news feeds",
		code: `export const revalidate = 60; // seconds

export default async function Page() {
  const data = await fetch(url);
  return <Component data={data} />;
}`,
	},
	{
		label: "SSR (Dynamic)",
		icon: "⚡",
		color: "border-blue-500/20 bg-blue-500/5",
		badge: "bg-blue-500/10 text-blue-600",
		when: "Every request",
		revalidate: "Per-request",
		useCase: "Dashboards, user-specific pages",
		code: `import { cookies } from "next/headers";

export default async function Page() {
  // cookies() opts into dynamic rendering
  const user = await getUser(await cookies());
  return <Dashboard user={user} />;
}`,
	},
	{
		label: "PPR",
		icon: "🚀",
		color: "border-purple-500/20 bg-purple-500/5",
		badge: "bg-purple-500/10 text-purple-600",
		when: "Shell: build; Slots: request",
		revalidate: "Mixed",
		useCase: "Pages with static shell + live data",
		code: `import { Suspense } from "react";

// Shell is statically cached at build time.
// Dynamic slots stream in per-request.
export default function Page() {
  return (
    <>
      <StaticShell />
      <Suspense fallback={<Skeleton />}>
        <DynamicContent />
      </Suspense>
    </>
  );
}`,
	},
];

export function RenderingPipeline() {
	return (
		<section className="space-y-8" id="rendering-pipeline">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">Rendering Pipeline 🔄</h2>
				<p className="text-muted-foreground">
					Next.js App Router supports four distinct rendering strategies. Each
					trades off freshness, speed, and infrastructure cost differently.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{STRATEGIES.map(
					({ label, icon, color, badge, when, revalidate, useCase, code }) => (
						<Card className={color} key={label}>
							<CardHeader className="pb-3">
								<div className="flex items-center gap-2">
									<span className="text-2xl">{icon}</span>
									<div>
										<CardTitle className="text-base">{label}</CardTitle>
										<Badge
											className={`mt-1 text-xs ${badge}`}
											variant="outline"
										>
											{when}
										</Badge>
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="space-y-1 text-xs">
									<p>
										<span className="font-medium">Revalidate:</span>{" "}
										<span className="text-muted-foreground">{revalidate}</span>
									</p>
									<p>
										<span className="font-medium">Best for:</span>{" "}
										<span className="text-muted-foreground">{useCase}</span>
									</p>
								</div>
								<pre className="overflow-x-auto rounded-md bg-background/60 p-2 font-mono text-[10px] leading-relaxed">
									{code}
								</pre>
							</CardContent>
						</Card>
					)
				)}
			</div>

			{/* Dynamic detection */}
			<Card>
				<CardHeader>
					<CardTitle>What Opts a Route into Dynamic Rendering?</CardTitle>
					<CardDescription>
						Next.js automatically detects these signals at build time
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<p className="font-medium text-sm">Dynamic signals (automatic)</p>
							<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
								{`import { cookies }    from "next/headers";
import { headers }    from "next/headers";
import { connection }  from "next/server";

// Any of these force dynamic rendering:
const c = await cookies();    // reads request
const h = await headers();    // reads request
await connection();           // explicit opt-in
const { searchParams } = props; // from URL`}
							</pre>
						</div>
						<div className="space-y-2">
							<p className="font-medium text-sm">Force via route config</p>
							<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
								{`// Force static (errors on dynamic API use)
export const dynamic = "force-static";

// Force dynamic (always SSR)
export const dynamic = "force-dynamic";

// Cache indefinitely (opt back to SSG)
export const dynamic = "error"; // fail-fast

// ISR — background regen every N seconds
export const revalidate = 3600;

// Partial Pre-Rendering (Next.js 15+)
export const experimental_ppr = true;`}
							</pre>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* generateStaticParams */}
			<Card>
				<CardHeader>
					<CardTitle>
						<code className="rounded bg-muted px-1 font-mono">
							generateStaticParams
						</code>{" "}
						for Dynamic Routes
					</CardTitle>
					<CardDescription>
						Pre-render all known param combinations at build time
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					<pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// app/blog/[slug]/page.tsx

// Called at BUILD TIME — Next.js pre-renders every slug
export async function generateStaticParams() {
  const posts = await db.post.findMany({ select: { slug: true } });
  return posts.map((p) => ({ slug: p.slug }));
  // Returns: [{ slug: "hello" }, { slug: "world" }, ...]
}

// This page runs at build time for each returned slug
export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return <Article post={post} />;
}

// Optionally control what happens for unknown slugs:
export const dynamicParams = false; // 404
export const dynamicParams = true;  // SSR on first visit (default)`}
					</pre>
					<p className="text-muted-foreground text-xs">
						<code className="rounded bg-muted px-1">generateStaticParams</code>{" "}
						works in tandem with the Data Cache — even paths fetched at runtime
						benefit from ISR via{" "}
						<code className="rounded bg-muted px-1">revalidate</code>.
					</p>
				</CardContent>
			</Card>
		</section>
	);
}
