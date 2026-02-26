import { Code, Info, Layers } from "@phosphor-icons/react/dist/ssr";
import { ContentSection } from "@/components/ui/ContentSection";
import { PageHeader } from "@/components/ui/PageHeader";

export default function AboutPage() {
	return (
		<div className="container mx-auto px-4 py-8 pb-32">
			{/* ── About Header ── */}
			<div className="mx-auto max-w-4xl space-y-12">
				<div className="mb-12 flex flex-col items-center gap-6 md:flex-row">
					<PageHeader
						description="A deep dive into the future of React, Server Components, and the modern web architecture."
						icon={<Info size={48} weight="duotone" />}
						title="About this project"
					/>
				</div>

				{/* Why */}
				<ContentSection className="mb-16" delay={0.2}>
					<h2 className="mb-6 flex items-center gap-3 font-semibold text-3xl">
						<span className="rounded-lg bg-primary/10 p-2 text-primary">
							<Code size={32} weight="duotone" />
						</span>
						Why this exists
					</h2>
					<div className="space-y-6 rounded-3xl border border-border/50 bg-card/30 p-8 text-lg text-muted-foreground leading-relaxed shadow-sm backdrop-blur-sm transition-all hover:bg-card/50">
						<p>
							When React Server Components first landed in stable Next.js, the
							mental model felt genuinely different from anything React had done
							before. The docs were good, but reading about it and{" "}
							<em className="font-medium text-foreground">
								actually internalizing it
							</em>{" "}
							are two different things. I wanted a codebase I could poke at —
							one where I could break things, observe what happened at the
							network layer, and understand why the decisions were made the way
							they were.
						</p>
						<p>
							There was also the timing: React 19 shipped alongside a brand-new
							compiler, new hooks, and the View Transitions API reaching a point
							where it was actually usable. It felt like the right moment to
							build something that tracked all of it in one place rather than
							jumping between isolated demos.
						</p>
					</div>
				</ContentSection>

				{/* What was built */}
				<ContentSection delay={0.3}>
					<h2 className="mb-6 flex items-center gap-3 font-semibold text-3xl">
						<span className="rounded-lg bg-primary/10 p-2 text-primary">
							<Layers size={32} weight="duotone" />
						</span>
						What was built
					</h2>
					<div className="space-y-8 rounded-3xl border border-border/50 bg-card/30 p-8 text-lg text-muted-foreground leading-relaxed shadow-sm backdrop-blur-sm transition-all hover:bg-card/50">
						<p>
							At its core, this is an interactive learning platform. Each
							section is a live, working demonstration — not just a code snippet
							on a slide. The project is organized around four major areas:
						</p>
						<ul className="grid gap-4 sm:grid-cols-2">
							<li className="group flex flex-col gap-2 rounded-2xl border border-border/50 bg-background/40 p-6 transition-all duration-300 hover:translate-y-[-2px] hover:border-primary/30 hover:bg-background/60 hover:shadow-lg">
								<strong className="text-foreground text-xl transition-colors group-hover:text-primary">
									React Server Components
								</strong>
								<span className="text-sm">
									How the server/client boundary works, why it matters for
									bundle size and performance.
								</span>
							</li>
							<li className="group flex flex-col gap-2 rounded-2xl border border-border/50 bg-background/40 p-6 transition-all duration-300 hover:translate-y-[-2px] hover:border-primary/30 hover:bg-background/60 hover:shadow-lg">
								<strong className="text-foreground text-xl transition-colors group-hover:text-primary">
									Architecture deep dives
								</strong>
								<span className="text-sm">
									The full rendering pipeline, RSC wire format (React Flight),
									and caching layers.
								</span>
							</li>
							<li className="group flex flex-col gap-2 rounded-2xl border border-border/50 bg-background/40 p-6 transition-all duration-300 hover:translate-y-[-2px] hover:border-primary/30 hover:bg-background/60 hover:shadow-lg">
								<strong className="text-foreground text-xl transition-colors group-hover:text-primary">
									React 19 features
								</strong>
								<span className="text-sm">
									Live demos for useOptimistic, useFormStatus, useActionState,
									and the Compiler.
								</span>
							</li>
							<li className="group flex flex-col gap-2 rounded-2xl border border-border/50 bg-background/40 p-6 transition-all duration-300 hover:translate-y-[-2px] hover:border-primary/30 hover:bg-background/60 hover:shadow-lg">
								<strong className="text-foreground text-xl transition-colors group-hover:text-primary">
									Best practices
								</strong>
								<span className="text-sm">
									Component boundaries, security patterns, and streaming
									architecture.
								</span>
							</li>
						</ul>
						<p className="mt-4 border-border/50 border-t pt-6 text-base italic">
							On top of that, there is a filesystem-based blog backed by a
							zero-dependency markdown parser that runs entirely on the server —
							no API routes, no client fetches, just async RSC reading files
							directly.
						</p>
					</div>
				</ContentSection>
			</div>
		</div>
	);
}
