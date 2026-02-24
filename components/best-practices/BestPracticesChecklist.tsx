import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CHECKLIST = [
	{
		category: "Component Design",
		emoji: "🗺️",
		color: "border-blue-500/20",
		badgeClass: "bg-blue-500/10 text-blue-600",
		items: [
			"Default to Server Components — add 'use client' only when needed",
			"Push 'use client' as far toward the leaves as possible",
			"Extract only the interactive fragment into a Client Component",
			"Never import a Server Component inside a Client Component",
			"Wrap Context providers in thin Client Component files",
			"Pass Server Components as children/props to Client Components",
			"Apply server-only to all modules with secrets or DB access",
		],
	},
	{
		category: "Data Fetching",
		emoji: "📡",
		color: "border-green-500/20",
		badgeClass: "bg-green-500/10 text-green-600",
		items: [
			"Fetch data in Server Components — avoid useEffect fetching",
			"Use Promise.all() for independent parallel fetches",
			"Wrap all data-access functions with React.cache()",
			"Keep queries colocated with the component that uses them",
			"Avoid N+1: batch queries when iterating over lists",
			"Sequential awaits only when one result depends on another",
			"Pass minimal data as props — never leak secrets across the boundary",
		],
	},
	{
		category: "Caching",
		emoji: "🗄️",
		color: "border-yellow-500/20",
		badgeClass: "bg-yellow-500/10 text-yellow-600",
		items: [
			"Match fetch() cache option to data freshness requirements",
			"Tag all mutable data fetches with next: { tags: [...] }",
			"Call revalidateTag() / revalidatePath() after every mutation",
			"Use export const revalidate in route segments for time-based ISR",
			"Use dynamic APIs (cookies, headers) deliberately — they bypass Full Route Cache",
			"Prefer revalidateTag over revalidatePath for precise invalidation",
			"React.cache() deduplicates within a render tree — not across requests",
		],
	},
	{
		category: "Streaming & Suspense",
		emoji: "⚡",
		color: "border-purple-500/20",
		badgeClass: "bg-purple-500/10 text-purple-600",
		items: [
			"Wrap slow data in <Suspense> to unblock the critical path",
			"Use loading.tsx for segment-level streaming fallbacks",
			"Create shape-matched skeleton components — prevent layout shift",
			"Use granular Suspense boundaries — not one for the whole page",
			"Identify and prioritise the critical rendering path",
			"Use use() + Promise props to stream data into Client Components",
			"Place Suspense boundaries at the same level as the slow component",
		],
	},
	{
		category: "Server Actions",
		emoji: "⚙️",
		color: "border-orange-500/20",
		badgeClass: "bg-orange-500/10 text-orange-600",
		items: [
			"Authenticate the caller at the start of every action",
			"Authorise access to the specific resource being mutated",
			"Validate all inputs with Zod before touching the database",
			"Return structured error objects — don't throw for user-facing errors",
			"Revalidate relevant caches after every successful mutation",
			"Store actions in dedicated 'use server' files — not inline",
			"Use useOptimistic() for instant UI feedback on toggles/likes",
		],
	},
	{
		category: "Security",
		emoji: "🔐",
		color: "border-red-500/20",
		badgeClass: "bg-red-500/10 text-red-600",
		items: [
			"Import server-only in every sensitive module (db, auth, etc.)",
			"Never pass secrets or API keys as props to Client Components",
			"Use NEXT_PUBLIC_ only for keys designed to be public",
			"Validate and sanitise all route params and searchParams with Zod",
			"Consider experimental_taintObjectReference for sensitive objects",
			"Authenticate in both Server Components and Server Actions",
			"Return 404 (notFound) not 403 to avoid resource existence leakage",
		],
	},
	{
		category: "Performance",
		emoji: "🚀",
		color: "border-teal-500/20",
		badgeClass: "bg-teal-500/10 text-teal-600",
		items: [
			"Keep heavy libraries (shiki, unified, etc.) in Server Components",
			"Use next/dynamic with ssr: false for browser-only libraries",
			"Use next/image for all images — never raw <img> tags",
			"Use next/font — self-hosted, zero CLS, no external requests",
			"Set priority on above-the-fold images",
			"Disable prefetch={false} on heavy/rarely-visited routes",
			"Call router.refresh() after mutations to bust Router Cache",
		],
	},
	{
		category: "TypeScript",
		emoji: "🔷",
		color: "border-sky-500/20",
		badgeClass: "bg-sky-500/10 text-sky-600",
		items: [
			"Type all page and layout props explicitly (params, searchParams)",
			"Derive model types from Prisma/Drizzle rather than hand-writing",
			"Type Server Action state with a shared ActionResult<T> type",
			"Narrow nullable query results with notFound() immediately",
			"Use satisfies for config objects to keep literal types",
			"Type-safe route params with Zod before using them",
			"Avoid as casts — use safeParse and proper narrowing",
		],
	},
	{
		category: "Error Handling",
		emoji: "🚨",
		color: "border-rose-500/20",
		badgeClass: "bg-rose-500/10 text-rose-600",
		items: [
			"Add error.tsx to every route segment with risky data fetching",
			"Add not-found.tsx at the appropriate segment level",
			"Call notFound() for missing resources — use redirect() for auth",
			"Report errors to a monitoring service in error.tsx useEffect",
			"Provide a reset() button so users can retry without full reload",
			"Use react-error-boundary for granular Client Component isolation",
			"Return field-level errors from Server Actions — don't throw",
		],
	},
];

const GOLDEN_RULES = [
	{
		number: "01",
		rule: "Server First",
		detail:
			"Every component starts as a Server Component. Add 'use client' only when you need real interactivity.",
		color: "border-green-500/20 bg-green-500/5",
	},
	{
		number: "02",
		rule: "Leaf Boundaries",
		detail:
			"Push client boundaries as far toward the leaves as possible. Only the interactive fragment needs to be a CC.",
		color: "border-blue-500/20 bg-blue-500/5",
	},
	{
		number: "03",
		rule: "Fetch Close",
		detail:
			"Fetch data in the component that uses it. Use React.cache() to deduplicate. Avoid prop drilling via colocated queries.",
		color: "border-yellow-500/20 bg-yellow-500/5",
	},
	{
		number: "04",
		rule: "Stream Slow",
		detail:
			"Any component that might be slow gets its own Suspense boundary. Design skeletons before you design the real UI.",
		color: "border-purple-500/20 bg-purple-500/5",
	},
	{
		number: "05",
		rule: "Secure Always",
		detail:
			"Every Server Action authenticates and authorises. Every module with secrets imports server-only. Props never carry secrets.",
		color: "border-red-500/20 bg-red-500/5",
	},
	{
		number: "06",
		rule: "Cache Intentionally",
		detail:
			"Know which cache layer applies to each piece of data. Tag everything. Revalidate after every mutation.",
		color: "border-orange-500/20 bg-orange-500/5",
	},
];

export function BestPracticesChecklist() {
	return (
		<section className="space-y-12" id="checklist">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">
					The Definitive Checklist ✅
				</h2>
				<p className="text-muted-foreground">
					Before shipping any feature, run through these categories. A green
					light across all nine means your RSC code is production-ready.
				</p>
			</div>

			{/* Golden rules */}
			<div>
				<h3 className="mb-6 font-semibold text-xl">Six Golden Rules</h3>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{GOLDEN_RULES.map((rule) => (
						<Card className={rule.color} key={rule.number}>
							<CardHeader className="pb-2">
								<div className="flex items-center gap-3">
									<span className="font-black text-2xl text-muted-foreground/40">
										{rule.number}
									</span>
									<CardTitle className="text-base">{rule.rule}</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-sm leading-relaxed">
									{rule.detail}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			<Separator />

			{/* Full checklist by category */}
			<div>
				<h3 className="mb-6 font-semibold text-xl">Full Category Checklist</h3>
				<div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
					{CHECKLIST.map((section) => (
						<Card className={section.color} key={section.category}>
							<CardHeader className="pb-3">
								<div className="flex items-center gap-2">
									<span className="text-xl">{section.emoji}</span>
									<CardTitle className="text-base">
										{section.category}
									</CardTitle>
								</div>
								<Badge
									className={`w-fit text-xs ${section.badgeClass}`}
									variant="secondary"
								>
									{section.items.length} items
								</Badge>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2">
									{section.items.map((item) => (
										<li
											className="flex items-start gap-2 text-muted-foreground text-sm"
											key={item}
										>
											<span className="mt-0.5 shrink-0 text-green-500">☑</span>
											{item}
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			<Separator />

			{/* Closing statement */}
			<Card className="border-primary/20 bg-primary/5">
				<CardContent className="pt-6">
					<div className="flex items-start gap-4">
						<span className="text-4xl">🎯</span>
						<div>
							<p className="font-semibold text-foreground text-lg">
								The RSC Mindset in One Sentence
							</p>
							<p className="mt-2 text-muted-foreground leading-relaxed">
								Start on the server, stream what's slow, push interactivity to
								the leaves, colocate data with its component, protect secrets
								with boundaries, validate everything that comes in, and let the
								cache layers work in your favour — never against you.
							</p>
							<div className="mt-4 flex flex-wrap gap-2">
								{[
									"Server First",
									"Bundle Minimal",
									"Stream Early",
									"Cache Intentionally",
									"Validate Always",
									"Type Everything",
									"Error Gracefully",
								].map((tag) => (
									<Badge className="text-xs" key={tag} variant="secondary">
										{tag}
									</Badge>
								))}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
