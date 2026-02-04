import { headers } from "next/headers";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PokemonAPI } from "@/lib/PokemonApi";
import { SuspenseProvider } from "@/providers/SuspenseProvider";
import { ErrorBoundary } from "./ErrorBoundary";

interface Pokemon {
	id: number;
	name: string;
	sprites: {
		other: {
			"official-artwork": {
				front_default: string;
			};
		};
	};
}

// Component that might fail
async function UnreliablePokemonCard({ name }: { name: string }) {
	await headers();
	await new Promise((resolve) =>
		setTimeout(resolve, 1000 + Math.random() * 2000)
	);

	// Simulate occasional failures
	if (Math.random() > 0.7) {
		throw new Error(`Failed to load ${name} (simulated error)`);
	}

	const response = await PokemonAPI.get<Pokemon>(`/pokemon/${name}`);
	const pokemon = response.data;

	return (
		<div className="overflow-hidden rounded-xl border border-border/40 bg-card/50 p-4">
			<Image
				alt={pokemon.name}
				className="mb-2 h-32 w-full object-contain"
				height={400}
				src={pokemon.sprites.other["official-artwork"].front_default}
				width={400}
			/>
			<p className="text-center font-medium text-sm capitalize">
				{pokemon.name}
			</p>
		</div>
	);
}

function PokemonCardSkeleton() {
	return (
		<div className="overflow-hidden rounded-xl border border-border/40 bg-card/50 p-4">
			<Skeleton className="mb-2 h-32 w-full" />
			<Skeleton className="mx-auto h-4 w-20" />
		</div>
	);
}

export function ErrorLoadingPatterns() {
	return (
		<div className="space-y-6">
			<div className="text-center">
				<h2 className="mb-3 font-semibold text-4xl tracking-tight">
					Error & Loading Patterns
				</h2>
				<p className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed">
					Build resilient UIs with Suspense boundaries and Error Boundaries
				</p>
			</div>

			{/* Conceptual Overview */}
			<Card className="overflow-hidden border-border/40 bg-card/50">
				<CardHeader>
					<CardTitle className="text-xl">Understanding Boundaries</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid gap-6 lg:grid-cols-2">
						{/* Suspense */}
						<div className="space-y-4 rounded-xl border border-purple-500/20 bg-purple-500/5 p-5">
							<div className="flex items-center gap-2">
								<Badge
									className="bg-purple-500/10 text-purple-600 dark:text-purple-400"
									variant="secondary"
								>
									Suspense
								</Badge>
								<span className="text-muted-foreground text-xs">
									Loading States
								</span>
							</div>
							<div className="space-y-3">
								<div>
									<p className="mb-1 font-semibold text-sm">What it does:</p>
									<p className="text-muted-foreground text-xs leading-relaxed">
										Shows a fallback UI while async components are loading.
										Enables streaming and progressive rendering.
									</p>
								</div>
								<div>
									<p className="mb-1 font-semibold text-sm">When to use:</p>
									<p className="text-muted-foreground text-xs leading-relaxed">
										Wrap async Server Components to show loading skeletons while
										data fetches.
									</p>
								</div>
								<div className="rounded-lg border border-border/40 bg-background/50 p-3">
									<pre className="overflow-x-auto text-xs">
										<code>{`<Suspense fallback={<Skeleton />}>
  <AsyncComponent />
</Suspense>`}</code>
									</pre>
								</div>
							</div>
						</div>

						{/* Error Boundary */}
						<div className="space-y-4 rounded-xl border border-red-500/20 bg-red-500/5 p-5">
							<div className="flex items-center gap-2">
								<Badge
									className="bg-red-500/10 text-red-600 dark:text-red-400"
									variant="secondary"
								>
									Error Boundary
								</Badge>
								<span className="text-muted-foreground text-xs">
									Error States
								</span>
							</div>
							<div className="space-y-3">
								<div>
									<p className="mb-1 font-semibold text-sm">What it does:</p>
									<p className="text-muted-foreground text-xs leading-relaxed">
										Catches JavaScript errors in child components and displays a
										fallback UI instead of crashing.
									</p>
								</div>
								<div>
									<p className="mb-1 font-semibold text-sm">When to use:</p>
									<p className="text-muted-foreground text-xs leading-relaxed">
										Wrap components that might fail (network errors, missing
										data) to prevent whole-page crashes.
									</p>
								</div>
								<div className="rounded-lg border border-border/40 bg-background/50 p-3">
									<pre className="overflow-x-auto text-xs">
										<code>{`<ErrorBoundary fallback={<Error />}>
  <ComponentThatMightFail />
</ErrorBoundary>`}</code>
									</pre>
								</div>
							</div>
						</div>
					</div>

					<div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
						<p className="mb-2 font-semibold text-sm text-yellow-600 dark:text-yellow-500">
							💡 Combine Both for Resilience
						</p>
						<p className="text-muted-foreground text-xs leading-relaxed">
							Use Suspense for loading states and Error Boundaries for failures.
							This pattern ensures users see appropriate feedback whether
							components are loading or have failed.
						</p>
					</div>
				</CardContent>
			</Card>

			{/* Granularity Comparison */}
			<div className="grid gap-6 lg:grid-cols-2">
				{/* Single Boundary */}
				<Card className="overflow-hidden border-orange-500/20 bg-orange-500/5">
					<CardHeader className="border-orange-500/10 border-b">
						<div className="flex items-center justify-between">
							<CardTitle className="text-base">Single Boundary</CardTitle>
							<Badge
								className="bg-orange-500/10 text-orange-600 dark:text-orange-400"
								variant="secondary"
							>
								All-or-nothing
							</Badge>
						</div>
					</CardHeader>
					<CardContent className="space-y-4 pt-4">
						<p className="text-muted-foreground text-xs leading-relaxed">
							One boundary around multiple components. If any fails, the entire
							section shows an error.
						</p>
						<div className="rounded-lg border border-border/40 bg-background/50 p-3">
							<pre className="overflow-x-auto text-xs">
								<code>{`<ErrorBoundary>
  <Suspense fallback={<Loading />}>
    <Card1 />
    <Card2 />
    <Card3 />
  </Suspense>
</ErrorBoundary>`}</code>
							</pre>
						</div>
						<div className="space-y-2">
							<p className="font-semibold text-xs">Behavior:</p>
							<ul className="space-y-1.5 text-muted-foreground text-xs">
								<li className="flex items-start gap-2">
									<span>•</span>
									<span>All cards wait until slowest one loads</span>
								</li>
								<li className="flex items-start gap-2">
									<span>•</span>
									<span>If one fails, entire section fails</span>
								</li>
								<li className="flex items-start gap-2">
									<span>•</span>
									<span>Simpler code, less granular UX</span>
								</li>
							</ul>
						</div>
					</CardContent>
				</Card>

				{/* Individual Boundaries */}
				<Card className="overflow-hidden border-green-500/20 bg-green-500/5">
					<CardHeader className="border-green-500/10 border-b">
						<div className="flex items-center justify-between">
							<CardTitle className="text-base">Individual Boundaries</CardTitle>
							<Badge
								className="bg-green-500/10 text-green-600 dark:text-green-400"
								variant="secondary"
							>
								Isolated
							</Badge>
						</div>
					</CardHeader>
					<CardContent className="space-y-4 pt-4">
						<p className="text-muted-foreground text-xs leading-relaxed">
							Separate boundaries for each component. Failures and loading are
							isolated to individual cards.
						</p>
						<div className="rounded-lg border border-border/40 bg-background/50 p-3">
							<pre className="overflow-x-auto text-xs">
								<code>{`{cards.map(card => (
  <ErrorBoundary key={card.id}>
    <Suspense fallback={<Skeleton />}>
      <Card {...card} />
    </Suspense>
  </ErrorBoundary>
))}`}</code>
							</pre>
						</div>
						<div className="space-y-2">
							<p className="font-semibold text-xs">Behavior:</p>
							<ul className="space-y-1.5 text-muted-foreground text-xs">
								<li className="flex items-start gap-2">
									<span>•</span>
									<span>Each card streams in as it's ready</span>
								</li>
								<li className="flex items-start gap-2">
									<span>•</span>
									<span>Failed cards don't affect others</span>
								</li>
								<li className="flex items-start gap-2">
									<span>•</span>
									<span>Better UX, more complex code</span>
								</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Live Demo */}
			<Card className="overflow-hidden border-border/40 bg-card/50">
				<CardHeader className="border-border/40 border-b">
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="text-xl">
								Live Demo: Partial Failures
							</CardTitle>
							<p className="mt-1 text-muted-foreground text-sm">
								Each card has ~30% chance to fail. Refresh to see different
								outcomes.
							</p>
						</div>
						<Badge
							className="rounded-full bg-green-500/10 px-3 py-1 font-normal text-green-600 dark:text-green-400"
							variant="secondary"
						>
							Individual Boundaries
						</Badge>
					</div>
				</CardHeader>
				<CardContent className="pt-6">
					<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
						{["pikachu", "charizard", "bulbasaur", "squirtle"].map((name) => (
							<ErrorBoundary key={name}>
								<SuspenseProvider fallback={<PokemonCardSkeleton />}>
									<UnreliablePokemonCard name={name} />
								</SuspenseProvider>
							</ErrorBoundary>
						))}
					</div>
					<div className="mt-4 rounded-xl border border-green-500/20 bg-green-500/5 p-4">
						<p className="text-muted-foreground text-xs leading-relaxed">
							Notice: Some cards may show errors while others load successfully.
							This is the power of isolated boundaries—failures don't cascade.
							Without individual boundaries, one error would break the entire
							grid.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
