import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const BADGES = [
	"Dual Runtime",
	"Flight Protocol",
	"RSC Wire Format",
	"Server Components",
	"Client Components",
	"Server Actions",
	"Streaming SSR",
	"Selective Hydration",
	"Zero Bundle Cost",
	"Static / Dynamic Rendering",
	"Partial Pre-rendering",
	"Caching Layers",
	"Serialization Boundary",
	"Route Segments",
];

export function ArchitectureHero() {
	return (
		<section className="space-y-6">
			<div className="flex items-center gap-4">
				<div className="flex h-16 w-16 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/50 shadow-lg shadow-primary/20">
					<span className="text-3xl">🏗️</span>
				</div>
				<div>
					<h1 className="font-bold text-5xl tracking-tight">
						RSC Architecture
					</h1>
					<p className="mt-2 text-lg text-muted-foreground">
						A comprehensive deep-dive into how React Server Components reshape
						the full-stack rendering model — from wire format to caching layers
					</p>
				</div>
			</div>

			<Card className="border-primary/20 bg-primary/5">
				<CardContent className="pt-6">
					<p className="text-lg leading-relaxed">
						<strong className="text-foreground">
							React Server Components (RSC)
						</strong>{" "}
						introduce a dual-runtime model where components execute either on
						the server or the client. This unlocks{" "}
						<strong className="text-primary">zero-bundle data fetching</strong>,
						direct backend access, and{" "}
						<strong className="text-primary">selective hydration</strong> —
						while keeping the familiar component mental model. At its core, RSC
						is powered by a custom streaming wire format called the{" "}
						<strong className="text-primary">Flight Protocol</strong> that React
						uses to serialize server-rendered output and reconcile it in the
						browser efficiently.
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
