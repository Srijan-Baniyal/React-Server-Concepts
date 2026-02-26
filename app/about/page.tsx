export default function AboutPage() {
	return (
		<div className="container mx-auto px-4 py-16">
			{/* ── About Section ── */}
			<div className="mx-auto max-w-4xl">
				{/* Header */}
				<header className="mb-16">
					<p className="mb-3 font-medium text-muted-foreground text-sm uppercase tracking-widest">
						About this project
					</p>
					<h1 className="mb-6 font-bold text-5xl leading-tight md:text-6xl">
						A deep dive into the future of React.
					</h1>
					<p className="text-muted-foreground text-xl leading-relaxed">
						This started as a personal curiosity and turned into something I
						kept coming back to every day — an interactive playground for
						understanding React Server Components, React 19, and everything that
						comes with the new model of building on the web.
					</p>
				</header>

				{/* Why */}
				<section className="mb-16">
					<h2 className="mb-4 font-semibold text-2xl">Why this exists</h2>
					<div className="space-y-4 text-muted-foreground leading-relaxed">
						<p>
							When React Server Components first landed in stable Next.js, the
							mental model felt genuinely different from anything React had done
							before. The docs were good, but reading about it and{" "}
							<em>actually internalizing it</em> are two different things. I
							wanted a codebase I could poke at — one where I could break
							things, observe what happened at the network layer, and understand
							why the decisions were made the way they were.
						</p>
						<p>
							There was also the timing: React 19 shipped alongside a brand-new
							compiler, new hooks, and the View Transitions API reaching a point
							where it was actually usable. It felt like the right moment to
							build something that tracked all of it in one place rather than
							jumping between isolated demos.
						</p>
					</div>
				</section>

				{/* What was built */}
				<section className="mb-16">
					<h2 className="mb-4 font-semibold text-2xl">What was built</h2>
					<div className="space-y-4 text-muted-foreground leading-relaxed">
						<p>
							At its core, this is an interactive learning platform. Each
							section is a live, working demonstration — not just a code snippet
							on a slide. The project is organized around four major areas:
						</p>
						<ul className="ml-6 list-disc space-y-2">
							<li>
								<strong className="text-foreground">
									React Server Components
								</strong>{" "}
								— how the server/client boundary works, why it matters for
								bundle size and performance, and the composition patterns that
								make RSC actually useful in practice.
							</li>
							<li>
								<strong className="text-foreground">
									Architecture deep dives
								</strong>{" "}
								— the full rendering pipeline, RSC wire format (React Flight),
								caching layers, route segments, serialization constraints, and
								how hydration actually works under the hood.
							</li>
							<li>
								<strong className="text-foreground">React 19 features</strong> —
								live demos for{" "}
								<code className="rounded bg-muted px-1 text-sm">
									useOptimistic
								</code>
								,{" "}
								<code className="rounded bg-muted px-1 text-sm">
									useFormStatus
								</code>
								,{" "}
								<code className="rounded bg-muted px-1 text-sm">
									useActionState
								</code>
								, View Transitions, and the React Compiler in action.
							</li>
							<li>
								<strong className="text-foreground">Best practices</strong> —
								component boundary decisions, data fetching guidelines, caching
								strategy, security at the server/client edge, TypeScript
								patterns, and streaming architecture that actually scales.
							</li>
						</ul>
						<p>
							On top of that, there is a filesystem-based blog backed by a
							zero-dependency markdown parser that runs entirely on the server —
							no API routes, no client fetches, just async RSC reading files
							directly. The blog itself is used to publish notes from working
							through all of the above.
						</p>
					</div>
				</section>

				{/* How */}
				<section className="mb-16">
					<h2 className="mb-4 font-semibold text-2xl">How it was done</h2>
					<div className="space-y-4 text-muted-foreground leading-relaxed">
						<p>
							The stack is Next.js 16 with the App Router, React 19, and
							TypeScript throughout. No shortcuts on the architecture side — the
							aim was to actually use the patterns being demonstrated, not just
							render static explanations of them.
						</p>
						<p>
							Server components are the default everywhere. Client components
							are marked explicitly with{" "}
							<code className="rounded bg-muted px-1 text-sm">
								"use client"
							</code>{" "}
							only when they need browser APIs, event handlers, or local state.
							This keeps the JavaScript bundle small and makes the boundary
							visible rather than hidden. Providers like React Query and the
							theme provider are wrapped at the layout level so the rest of the
							tree stays server-rendered.
						</p>
						<p>
							Streaming is used where it makes a real difference — components
							that fetch data are wrapped in{" "}
							<code className="rounded bg-muted px-1 text-sm">Suspense</code>{" "}
							boundaries so the page shell arrives immediately and content
							streams in progressively. The Pokemon API demos in the server
							components section show this concretely: parallel server fetches
							that race to the client independently.
						</p>
						<p>
							The React Compiler is enabled via the Babel plugin, which means
							memoization is handled automatically at build time. No manual{" "}
							<code className="rounded bg-muted px-1 text-sm">useMemo</code> or{" "}
							<code className="rounded bg-muted px-1 text-sm">useCallback</code>{" "}
							scattered across components. Biome handles linting and formatting
							with a single config, and Tailwind 4 with PostCSS keeps the
							styling tightly co-located.
						</p>
					</div>
				</section>

				{/* Outcomes */}
				<section className="mb-16">
					<h2 className="mb-4 font-semibold text-2xl">What came out of it</h2>
					<div className="space-y-4 text-muted-foreground leading-relaxed">
						<p>
							The biggest shift was in how I think about the server/client
							split. Before this, the instinct was always to reach for{" "}
							<code className="rounded bg-muted px-1 text-sm">useEffect</code>{" "}
							and a fetch call. Now the default question is: does this even need
							to run on the client? Most of the time it doesn&apos;t, and moving
							that logic to the server simplifies both the component and the
							network story.
						</p>
						<p>
							Streaming genuinely changes perceived performance. The
							architecture deep dive section, which renders a lot of interactive
							diagrams, uses streaming so the layout is stable immediately even
							when some panels take longer to resolve. The difference in feel is
							noticeable without any artificial delays.
						</p>
						<p>
							The React 19 hooks — particularly{" "}
							<code className="rounded bg-muted px-1 text-sm">
								useOptimistic
							</code>{" "}
							and{" "}
							<code className="rounded bg-muted px-1 text-sm">
								useActionState
							</code>{" "}
							— reduced what used to be 30–40 lines of loading/error/state
							management boilerplate down to patterns that are genuinely
							readable. The optimistic UI demo makes this obvious side by side.
						</p>
						<p>
							View Transitions, while still experimental, gave page navigation a
							quality that feels native. The blog list to blog post transition
							is one example: the header and card animate into the detail view
							naturally because both ends share a{" "}
							<code className="rounded bg-muted px-1 text-sm">
								viewTransitionName
							</code>
							. No animation library needed for that specific interaction.
						</p>
					</div>
				</section>

				{/* Closing */}
				<section className="mb-20 rounded-2xl border bg-muted/40 px-8 py-8">
					<p className="text-muted-foreground leading-relaxed">
						This project is ongoing. The concepts section keeps growing as new
						things land in React and Next.js. The goal was never to build a
						finished product — it was to build a place to stay curious about
						where the web is going, and to keep a record of what it felt like to
						learn it properly.
					</p>
				</section>
			</div>
		</div>
	);
}
