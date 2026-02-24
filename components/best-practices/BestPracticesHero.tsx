import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const BADGES = [
	"Component Boundaries",
	"Data Fetching",
	"Caching Strategy",
	"Streaming & Suspense",
	"Server Actions",
	"Security",
	"Performance",
	"TypeScript Patterns",
	"Error Handling",
	"Bundle Optimization",
	"Colocated Queries",
	"Parallel Fetching",
	"server-only",
	"Revalidation",
];

export function BestPracticesHero() {
	return (
		<section className="space-y-6">
			<div className="flex items-center gap-4">
				<div className="flex h-16 w-16 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/50 shadow-lg shadow-primary/20">
					<span className="text-3xl">📋</span>
				</div>
				<div>
					<h1 className="font-bold text-5xl tracking-tight">Best Practices</h1>
					<p className="mt-2 text-lg text-muted-foreground">
						Battle-tested patterns and guidelines for building production-grade
						applications with React Server Components and the Next.js App Router
					</p>
				</div>
			</div>

			<Card className="border-primary/20 bg-primary/5">
				<CardContent className="pt-6">
					<p className="text-lg leading-relaxed">
						<strong className="text-foreground">Great RSC applications</strong>{" "}
						aren't just about knowing what Server and Client Components are —
						they're about cultivating a{" "}
						<strong className="text-primary">server-first instinct</strong>,
						making deliberate decisions about boundaries, fetching data as close
						to where it's used as possible, and protecting sensitive logic
						behind the{" "}
						<strong className="text-primary">serialization boundary</strong>.
						This guide distills the most important principles across every layer
						of the stack into actionable, copy-paste-ready patterns.
					</p>
				</CardContent>
			</Card>

			<div className="flex flex-wrap gap-2">
				{BADGES.map((f) => (
					<Badge className="text-sm" key={f} variant="secondary">
						{f}
					</Badge>
				))}
			</div>
		</section>
	);
}
