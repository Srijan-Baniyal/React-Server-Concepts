import {
	ArrowRightIcon,
	AtomIcon,
	BracketsCurlyIcon,
	CodeIcon,
	GearSixIcon,
	GithubLogoIcon,
	LightningIcon,
	RocketLaunchIcon,
	StackIcon,
	TreeStructureIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "About | React Server Concepts",
	description:
		"Learn about this project — an interactive deep dive into React Server Components, RSC architecture, React 19 features, streaming, suspense, and modern Next.js patterns by Srijan Baniyal.",
	alternates: { canonical: "https://rsc.srijanbaniyal.com/about" },
	openGraph: {
		title: "About | React Server Concepts",
		description:
			"Learn about this project — an interactive deep dive into React Server Components, RSC architecture, React 19 features, and modern Next.js patterns.",
		url: "https://rsc.srijanbaniyal.com/about",
		images: [
			{
				url: "https://rsc.srijanbaniyal.com/api/og",
				width: 1200,
				height: 630,
				alt: "About React Server Concepts",
			},
		],
	},
	twitter: {
		title: "About | React Server Concepts",
		description:
			"Learn about this project — an interactive deep dive into React Server Components, RSC architecture, React 19 features, and modern Next.js patterns.",
		images: [
			{
				url: "https://rsc.srijanbaniyal.com/api/og",
				alt: "About React Server Concepts",
				width: 1200,
				height: 630,
			},
		],
	},
};

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TECH_STACK = [
	"Next.js 15",
	"React 19",
	"TypeScript",
	"Tailwind CSS 4",
	"Motion (Framer)",
	"shadcn/ui",
	"React Query",
	"Zod",
	"View Transitions API",
];

const SECTIONS = [
	{
		icon: <AtomIcon size={28} weight="duotone" />,
		title: "React Server Components",
		description:
			"How the server/client boundary works, why it matters for bundle size and performance, and what actually travels over the wire.",
		href: "/concepts/server-components",
	},
	{
		icon: <TreeStructureIcon size={28} weight="duotone" />,
		title: "Architecture Deep Dives",
		description:
			"The full rendering pipeline, RSC wire format (React Flight), caching layers, hydration, and route segments — end to end.",
		href: "/learning/architecture",
	},
	{
		icon: <LightningIcon size={28} weight="duotone" />,
		title: "Streaming & Suspense",
		description:
			"Progressive rendering in action — how React streams HTML, selective hydration, and nested Suspense boundaries.",
		href: "/concepts/streamingandsuspense",
	},
	{
		icon: <BracketsCurlyIcon size={28} weight="duotone" />,
		title: "React 19 Features",
		description:
			"Live demos for useOptimistic, useFormStatus, useActionState, the React Compiler, and the Activity API.",
		href: "/concepts/react-19",
	},
	{
		icon: <GearSixIcon size={28} weight="duotone" />,
		title: "Best Practices",
		description:
			"Component boundaries, security patterns, caching strategies, TypeScript patterns, and streaming architecture.",
		href: "/learning/best-practices",
	},
];

export default function AboutPage() {
	return (
		<div className="container mx-auto max-w-5xl space-y-16 px-4 pt-24 pb-32 sm:px-6 md:pt-28 lg:px-8">
			{/* ── Hero ── */}
			<section className="space-y-6">
				<div className="flex items-center gap-4">
					<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/50 shadow-lg shadow-primary/20">
						<span className="text-3xl">📖</span>
					</div>
					<div>
						<h1 className="font-bold text-5xl tracking-tight">
							About This Project
						</h1>
						<p className="mt-2 text-lg text-muted-foreground">
							An interactive deep-dive into React Server Components, modern
							rendering architecture, and the React 19 ecosystem
						</p>
					</div>
				</div>

				<Card className="border-primary/20 bg-primary/5">
					<CardContent className="pt-6">
						<p className="text-lg leading-relaxed">
							This isn&apos;t a collection of slides or static docs — it&apos;s
							a <strong className="text-primary">live, working codebase</strong>{" "}
							you can poke at, break, and learn from. Every concept is backed by
							a real implementation you can trace from the server to the
							browser, because reading about RSC and{" "}
							<strong className="text-foreground">
								actually internalizing it
							</strong>{" "}
							are two different things.
						</p>
					</CardContent>
				</Card>

				<div className="flex flex-wrap gap-2">
					{TECH_STACK.map((t) => (
						<Badge className="text-sm" key={t} variant="secondary">
							{t}
						</Badge>
					))}
				</div>
			</section>

			<Separator />

			{/* ── Why ── */}
			<section className="space-y-6">
				<h2 className="flex items-center gap-3 font-semibold text-3xl">
					<span className="rounded-lg bg-primary/10 p-2 text-primary">
						<CodeIcon size={28} weight="duotone" />
					</span>
					Why This Exists
				</h2>
				<div className="space-y-6 rounded-3xl border border-border/50 bg-card/30 p-8 text-lg text-muted-foreground leading-relaxed shadow-sm backdrop-blur-sm transition-all hover:bg-card/50">
					<p>
						When React Server Components first landed in stable Next.js, the
						mental model felt genuinely different from anything React had done
						before. The docs were good, but reading about it and{" "}
						<em className="font-medium text-foreground">
							actually internalizing it
						</em>{" "}
						are two different things. I wanted a codebase I could poke at — one
						where I could break things, observe what happened at the network
						layer, and understand <em>why</em> the decisions were made the way
						they were.
					</p>
					<p>
						There was also the timing: React 19 shipped alongside a brand-new
						compiler, new hooks, and the View Transitions API reaching a point
						where it was actually usable. It felt like the right moment to build
						something that tracked all of it in one place rather than jumping
						between isolated demos.
					</p>
				</div>
			</section>

			<Separator />

			{/* ── What's Inside ── */}
			<section className="space-y-6">
				<h2 className="flex items-center gap-3 font-semibold text-3xl">
					<span className="rounded-lg bg-primary/10 p-2 text-primary">
						<StackIcon size={28} weight="duotone" />
					</span>
					What&apos;s Inside
				</h2>
				<p className="text-lg text-muted-foreground leading-relaxed">
					The project is organized around five major areas — each one a living,
					interactive demonstration rather than a static code snippet.
				</p>
				<div className="grid gap-4 sm:grid-cols-2">
					{SECTIONS.map((s) => (
						<Link
							className="group flex flex-col gap-3 rounded-2xl border border-border/50 bg-card/30 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:translate-y-[-2px] hover:border-primary/30 hover:bg-card/50 hover:shadow-lg"
							href={s.href}
							key={s.title}
						>
							<div className="flex items-center gap-3">
								<span className="text-primary transition-colors group-hover:text-primary">
									{s.icon}
								</span>
								<strong className="text-foreground text-xl transition-colors group-hover:text-primary">
									{s.title}
								</strong>
							</div>
							<span className="text-muted-foreground text-sm leading-relaxed">
								{s.description}
							</span>
							<span className="mt-auto flex items-center gap-1 text-primary text-sm opacity-0 transition-all group-hover:opacity-100">
								Explore <ArrowRightIcon size={14} />
							</span>
						</Link>
					))}
				</div>
			</section>

			<Separator />

			{/* ── How It's Built ── */}
			<section className="space-y-6">
				<h2 className="flex items-center gap-3 font-semibold text-3xl">
					<span className="rounded-lg bg-primary/10 p-2 text-primary">
						<RocketLaunchIcon size={28} weight="duotone" />
					</span>
					How It&apos;s Built
				</h2>
				<div className="grid gap-4 md:grid-cols-3">
					<Card className="border-border/50 bg-card/30 backdrop-blur-sm transition-all hover:bg-card/50">
						<CardContent className="space-y-2 pt-6">
							<h3 className="font-semibold text-foreground text-lg">
								Server-First
							</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								Every page defaults to a React Server Component. Client code
								only ships where interactivity is truly needed — keeping bundles
								lean and page loads fast.
							</p>
						</CardContent>
					</Card>
					<Card className="border-border/50 bg-card/30 backdrop-blur-sm transition-all hover:bg-card/50">
						<CardContent className="space-y-2 pt-6">
							<h3 className="font-semibold text-foreground text-lg">
								Streaming Architecture
							</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								Suspense boundaries and streaming SSR deliver instant shell
								loads. Data-heavy sections resolve progressively without
								blocking the page.
							</p>
						</CardContent>
					</Card>
					<Card className="border-border/50 bg-card/30 backdrop-blur-sm transition-all hover:bg-card/50">
						<CardContent className="space-y-2 pt-6">
							<h3 className="font-semibold text-foreground text-lg">
								View Transitions
							</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								Theme toggling and page navigations use the native View
								Transitions API for smooth, cinematic state changes — no
								JavaScript animation libraries required.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>

			<Separator />

			{/* ── CTA ── */}
			<section className="flex flex-col items-center gap-6 rounded-3xl border border-primary/20 bg-primary/5 p-10 text-center">
				<h2 className="font-bold text-3xl tracking-tight">Ready to explore?</h2>
				<p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
					Jump into the interactive demos, trace requests through the rendering
					pipeline, and build real intuition for how modern React works under
					the hood.
				</p>
				<div className="flex flex-wrap justify-center gap-4">
					<Link
						className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground text-sm transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
						href="/concepts/server-components"
					>
						Start Learning <ArrowRightIcon size={16} weight="bold" />
					</Link>
					<Link
						className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 font-medium text-foreground text-sm transition-all hover:bg-muted"
						href="https://github.com/Srijan-Baniyal/React-Server-Concepts"
						rel="noopener noreferrer"
						target="_blank"
					>
						<GithubLogoIcon size={18} weight="bold" />
						View Source
					</Link>
				</div>
			</section>
		</div>
	);
}
