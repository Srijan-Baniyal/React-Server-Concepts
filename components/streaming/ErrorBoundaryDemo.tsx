import Image from "next/image";
import { ErrorBoundary } from "@/components/server/ErrorBoundary";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PokemonAPI } from "@/lib/PokemonApi";
import { SuspenseProvider } from "@/providers/SuspenseProvider";

interface PokemonType {
	type: { name: string };
}

interface Pokemon {
	id: number;
	name: string;
	sprites: {
		other: { "official-artwork": { front_default: string } };
	};
	stats: Array<{ base_stat: number; stat: { name: string } }>;
	types: PokemonType[];
}

// Success path — resolves normally after a slight delay
async function SuccessComponent() {
	await new Promise((resolve) => setTimeout(resolve, 1500));
	const response = await PokemonAPI.get<Pokemon>("/pokemon/bulbasaur");
	const pokemon = response.data;

	return (
		<Card className="border-green-500/20 bg-linear-to-br from-green-500/5 to-transparent transition-all duration-300 hover:shadow-md">
			<CardHeader className="border-green-500/10 border-b pb-4">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base capitalize">{pokemon.name}</CardTitle>
					<div className="flex items-center gap-2">
						<Badge variant="secondary">#{pokemon.id}</Badge>
						<Badge
							className="bg-green-500/10 text-green-600 dark:text-green-400"
							variant="outline"
						>
							✓ Loaded
						</Badge>
					</div>
				</div>
			</CardHeader>
			<CardContent className="pt-4">
				<div className="flex gap-4">
					<Image
						alt={pokemon.name}
						className="h-20 w-20 object-contain drop-shadow-md"
						height={80}
						src={pokemon.sprites.other["official-artwork"].front_default}
						width={80}
					/>
					<div className="flex-1 space-y-2">
						<div className="flex flex-wrap gap-1">
							{pokemon.types.map((t) => (
								<Badge
									className="text-xs capitalize"
									key={t.type.name}
									variant="outline"
								>
									{t.type.name}
								</Badge>
							))}
						</div>
						<div className="space-y-1">
							{pokemon.stats.slice(0, 3).map((s) => (
								<div className="flex justify-between text-xs" key={s.stat.name}>
									<span className="text-muted-foreground capitalize">
										{s.stat.name.replace("-", " ")}
									</span>
									<span className="font-medium font-mono">{s.base_stat}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

// Error path — intentionally fetches a nonexistent Pokémon
async function ErrorComponent() {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	// This will throw — 404 from the API
	await PokemonAPI.get("/pokemon/this-pokemon-does-not-exist-xyz");
	return <div>This won&apos;t render</div>;
}

function ComponentSkeleton() {
	return (
		<Card className="border-border/50">
			<CardHeader className="border-border/40 border-b pb-4">
				<div className="flex items-center justify-between">
					<Skeleton className="h-5 w-24" />
					<div className="flex gap-2">
						<Skeleton className="h-5 w-10 rounded-full" />
						<Skeleton className="h-5 w-16 rounded-full" />
					</div>
				</div>
			</CardHeader>
			<CardContent className="pt-4">
				<div className="flex gap-4">
					<Skeleton className="h-20 w-20 shrink-0 rounded-xl" />
					<div className="flex-1 space-y-2">
						<div className="flex gap-1">
							<Skeleton className="h-4 w-16 rounded-full" />
						</div>
						<div className="space-y-1">
							<Skeleton className="h-3 w-full" />
							<Skeleton className="h-3 w-full" />
							<Skeleton className="h-3 w-3/4" />
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export function ErrorBoundaryDemo() {
	return (
		<div className="space-y-4">
			<Card className="border-border/40 bg-card/50">
				<CardContent className="pt-6">
					<div className="space-y-4">
						<p className="text-muted-foreground text-sm leading-relaxed">
							Combining{" "}
							<strong className="text-foreground">Error Boundaries</strong> with{" "}
							<strong className="text-foreground">Suspense</strong> handles both
							loading and error states gracefully. When a component fails, only
							that isolated section shows an error — the rest of the page is
							unaffected.
						</p>
						<div className="overflow-hidden rounded-lg border border-border/50">
							<div className="flex items-center gap-2 border-border/40 border-b bg-muted/60 px-4 py-2">
								<div className="flex gap-1.5">
									<div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
									<div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
									<div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
								</div>
								<span className="font-mono text-muted-foreground text-xs">
									error-boundary.tsx
								</span>
							</div>
							<pre className="overflow-x-auto bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
								<span className="text-muted-foreground/60">
									{"// Wrap each section independently\n"}
								</span>
								<span className="text-foreground/90">{"<"}</span>
								<span className="text-red-400">ErrorBoundary </span>
								<span className="text-orange-400">fallback</span>
								<span className="text-foreground/90">{"={<"}</span>
								<span className="text-red-400">ErrorFallback</span>
								<span className="text-foreground/90">{"   />}>\n"}</span>
								<span className="text-foreground/90">{"  <"}</span>
								<span className="text-green-400">Suspense </span>
								<span className="text-orange-400">fallback</span>
								<span className="text-foreground/90">{"={<"}</span>
								<span className="text-green-400">Skeleton</span>
								<span className="text-foreground/90">{"       />}>\n"}</span>
								<span className="text-foreground/90">{"    <"}</span>
								<span className="text-blue-400">AsyncComponent</span>
								<span className="text-foreground/90">{" />\n"}</span>
								<span className="text-foreground/90">{"  </"}</span>
								<span className="text-green-400">Suspense</span>
								<span className="text-foreground/90">{">\n</"}</span>
								<span className="text-red-400">ErrorBoundary</span>
								<span className="text-foreground/90">{">"}</span>
							</pre>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-4 md:grid-cols-2">
				{/* Success case */}
				<div className="space-y-2">
					<div className="flex items-center gap-2 px-1">
						<div className="h-2 w-2 rounded-full bg-green-500" />
						<span className="font-medium text-muted-foreground text-xs">
							Success path — component loads normally
						</span>
					</div>
					<ErrorBoundary>
						<SuspenseProvider fallback={<ComponentSkeleton />}>
							<SuccessComponent />
						</SuspenseProvider>
					</ErrorBoundary>
				</div>

				{/* Error case */}
				<div className="space-y-2">
					<div className="flex items-center gap-2 px-1">
						<div className="h-2 w-2 rounded-full bg-destructive" />
						<span className="font-medium text-muted-foreground text-xs">
							Error path — 404 from API, caught by boundary
						</span>
					</div>
					<ErrorBoundary>
						<SuspenseProvider fallback={<ComponentSkeleton />}>
							<ErrorComponent />
						</SuspenseProvider>
					</ErrorBoundary>
				</div>
			</div>
		</div>
	);
}
