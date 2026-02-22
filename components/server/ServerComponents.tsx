import { headers } from "next/headers";
import Image from "next/image";
import { CachingExplainer } from "@/components/server/CachingExplainer";
import { ClientPokemonCard } from "@/components/server/ClientPokemonCard";
import { CodeBoundariesExplainer } from "@/components/server/CodeBoundariesExplainer";
import { ErrorBoundary } from "@/components/server/ErrorBoundary";
import { ErrorLoadingPatterns } from "@/components/server/ErrorLoadingPatterns";
import { NetworkDebugger } from "@/components/server/NetworkDebugger";
import ServerClientInteropDemo from "@/components/server/ServerClientInterop";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { NeinAPI } from "@/lib/NeinApi";
import { PokemonAPI } from "@/lib/PokemonApi";
import { SuspenseProvider } from "@/providers/SuspenseProvider";

// TypeScript interfaces for type safety
interface PokemonType {
	type: {
		name: string;
	};
}

interface PokemonStat {
	base_stat: number;
	stat: {
		name: string;
	};
}

interface Pokemon {
	height: number;
	id: number;
	name: string;
	sprites: {
		other: {
			"official-artwork": {
				front_default: string;
			};
		};
	};
	stats: PokemonStat[];
	types: PokemonType[];
	weight: number;
}

interface PokemonListResponse {
	count: number;
	results: Array<{ name: string; url: string }>;
}

interface NeinResponse {
	reason: string;
}

// Error component for inline error display
function ErrorCard({ message }: { message: string }) {
	return (
		<Card className="border-destructive/20 bg-destructive/5 backdrop-blur-sm">
			<CardContent className="p-6">
				<div className="flex items-start gap-3">
					<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
						<span className="text-lg">⚠️</span>
					</div>
					<div className="space-y-1">
						<p className="font-medium text-destructive">Error</p>
						<p className="text-muted-foreground text-sm leading-relaxed">
							{message}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

// 1️⃣ SERVER COMPONENT WITH ERROR HANDLING
async function PokemonCard({ name }: { name: string }) {
	try {
		const response = await PokemonAPI.get<Pokemon>(`/pokemon/${name}`);
		const pokemon = response.data;

		return (
			<Card className="overflow-hidden">
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="capitalize">{pokemon.name}</CardTitle>
						<div className="flex gap-2">
							<Badge variant="secondary">#{pokemon.id}</Badge>
							<Badge
								className="bg-green-500/10 text-green-500"
								variant="outline"
							>
								Server
							</Badge>
						</div>
					</div>
					<CardDescription>
						Height: {pokemon.height} | Weight: {pokemon.weight}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-4">
						<Image
							alt={pokemon.name}
							className="h-48 w-full object-contain"
							height={400}
							src={pokemon.sprites.other["official-artwork"].front_default}
							width={400}
						/>
						<div className="flex flex-wrap gap-2">
							{pokemon.types.map((type: PokemonType) => (
								<Badge key={type.type.name} variant="outline">
									{type.type.name}
								</Badge>
							))}
						</div>
						<div>
							<h4 className="mb-2 font-semibold">Base Stats:</h4>
							<div className="space-y-1 text-sm">
								{pokemon.stats.slice(0, 3).map((stat: PokemonStat) => (
									<div className="flex justify-between" key={stat.stat.name}>
										<span className="capitalize">
											{stat.stat.name.replace("-", " ")}:
										</span>
										<span className="font-mono">{stat.base_stat}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	} catch (error) {
		console.error(`Failed to fetch Pokemon: ${name}`, error);
		return (
			<ErrorCard
				message={`Failed to load ${name}. ${
					error instanceof Error ? error.message : "Unknown error"
				}`}
			/>
		);
	}
}

function PokemonCardSkeleton() {
	return (
		<Card className="overflow-hidden border-border/40 bg-card/50 backdrop-blur-sm">
			<CardContent className="p-6">
				<div className="space-y-4">
					<Skeleton className="aspect-square w-full rounded-2xl" />
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<Skeleton className="h-7 w-28" />
							<Skeleton className="h-6 w-12 rounded-full" />
						</div>
						<div className="flex gap-2">
							<Skeleton className="h-6 w-16 rounded-full" />
							<Skeleton className="h-6 w-16 rounded-full" />
						</div>
						<div className="space-y-2 pt-2">
							<Skeleton className="h-5 w-full" />
							<Skeleton className="h-5 w-full" />
							<Skeleton className="h-5 w-full" />
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

// 2️⃣ SERVER STATS WITH COMPREHENSIVE ERROR HANDLING
async function ServerStats() {
	try {
		// Opt into dynamic rendering
		await headers();

		const startTime = Date.now();

		console.log("🔄 Starting PARALLEL data fetch with Promise.allSettled...");

		// Parallel data fetching with individual error handling
		const [pokemonListResult, neinResult] = await Promise.allSettled([
			PokemonAPI.get<PokemonListResponse>("/pokemon?limit=5"),
			NeinAPI.get<NeinResponse>(""),
		]);

		const loadTime = Date.now() - startTime;

		console.log(`✅ Parallel fetch completed in ${loadTime}ms`);

		// Extract data with fallbacks
		const pokemonList =
			pokemonListResult.status === "fulfilled"
				? pokemonListResult.value.data
				: null;
		const neinResponse =
			neinResult.status === "fulfilled"
				? neinResult.value.data
				: { reason: "Nein! (API unavailable)" };

		// Calculate individual request status
		const pokemonStatus =
			pokemonListResult.status === "fulfilled" ? "✅ Success" : "❌ Failed";
		const neinStatus =
			neinResult.status === "fulfilled" ? "✅ Success" : "❌ Failed";

		return (
			<Card className="overflow-hidden border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-lg">
				<CardHeader className="space-y-3 pb-6">
					<div className="flex items-start justify-between">
						<div className="space-y-1.5">
							<CardTitle className="font-semibold text-2xl">
								Server Statistics
							</CardTitle>
							<CardDescription className="text-base">
								Parallel data fetching on the server
							</CardDescription>
						</div>
						<Badge
							className="rounded-full bg-purple-500/10 px-3 py-1 font-normal text-purple-600 text-sm dark:text-purple-400"
							variant="secondary"
						>
							Parallel
						</Badge>
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Fetch Strategy Indicator */}
					<div className="rounded-2xl border border-purple-500/10 bg-purple-500/3 p-6">
						<div className="mb-4 flex items-center gap-3">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10">
								<span className="text-lg">⚡</span>
							</div>
							<div>
								<p className="font-medium text-sm">Promise.allSettled</p>
								<p className="text-muted-foreground text-xs">
									Independent parallel requests
								</p>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-3">
							<div className="rounded-xl border border-border/50 bg-background/50 p-3 backdrop-blur-sm">
								<p className="mb-1 text-muted-foreground text-xs">
									Pokemon API
								</p>
								<p className="font-mono text-sm">{pokemonStatus}</p>
							</div>
							<div className="rounded-xl border border-border/50 bg-background/50 p-3 backdrop-blur-sm">
								<p className="mb-1 text-muted-foreground text-xs">Nein API</p>
								<p className="font-mono text-sm">{neinStatus}</p>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div className="rounded-2xl border border-border/40 bg-background/50 p-6 backdrop-blur-sm">
							<p className="mb-2 text-muted-foreground text-sm">
								Total Pokémon Available
							</p>
							<p className="font-semibold text-4xl tracking-tight">
								{pokemonList?.count ?? "N/A"}
							</p>
							{pokemonListResult.status === "rejected" && (
								<p className="mt-2 text-destructive text-xs">Failed to fetch</p>
							)}
						</div>
						<div className="rounded-2xl border border-border/40 bg-background/50 p-6 backdrop-blur-sm">
							<p className="mb-2 text-muted-foreground text-sm">Load Time</p>
							<p className="font-semibold text-4xl tracking-tight">
								{loadTime}
								<span className="text-2xl text-muted-foreground">ms</span>
							</p>
							<p className="mt-2 text-muted-foreground text-xs">
								Parallel fetching
							</p>
						</div>
					</div>
					<div className="rounded-2xl border border-border/40 bg-background/50 p-6 backdrop-blur-sm">
						<p className="mb-3 text-muted-foreground text-sm">API Response</p>
						<p className="font-mono text-lg">{neinResponse.reason}</p>
						{neinResult.status === "rejected" && (
							<p className="mt-3 text-muted-foreground text-sm">
								Using fallback response
							</p>
						)}
					</div>
				</CardContent>
			</Card>
		);
	} catch (error) {
		console.error("ServerStats error:", error);
		return (
			<ErrorCard
				message={`Failed to load server statistics. ${
					error instanceof Error ? error.message : "Unknown error"
				}`}
			/>
		);
	}
}

// 3️⃣ SEQUENTIAL FETCH EXAMPLE (for comparison)
async function SequentialFetchDemo() {
	try {
		await headers();

		const startTime = Date.now();

		console.log("🔄 Starting SEQUENTIAL data fetch (one-by-one)...");

		// Sequential fetching - each waits for the previous
		let pokemon1: Pokemon | null = null;
		let pokemon2: Pokemon | null = null;
		const timing = { first: 0, second: 0 };

		try {
			const start1 = Date.now();
			const response1 = await PokemonAPI.get<Pokemon>("/pokemon/ditto");
			pokemon1 = response1.data;
			timing.first = Date.now() - start1;
			console.log(`✅ First request completed in ${timing.first}ms`);
		} catch (error) {
			console.error("❌ First request failed:", error);
		}

		try {
			const start2 = Date.now();
			const response2 = await PokemonAPI.get<Pokemon>("/pokemon/mew");
			pokemon2 = response2.data;
			timing.second = Date.now() - start2;
			console.log(`✅ Second request completed in ${timing.second}ms`);
		} catch (error) {
			console.error("❌ Second request failed:", error);
		}

		const totalTime = Date.now() - startTime;
		console.log(
			`✅ Sequential fetch completed in ${totalTime}ms (${timing.first}ms + ${timing.second}ms)`
		);

		return (
			<Card className="overflow-hidden border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-lg">
				<CardHeader className="space-y-3 pb-6">
					<div className="flex items-start justify-between">
						<div className="space-y-1.5">
							<CardTitle className="font-semibold text-2xl">
								Sequential Fetching
							</CardTitle>
							<CardDescription className="text-base">
								Requests executed one after another
							</CardDescription>
						</div>
						<Badge
							className="rounded-full bg-orange-500/10 px-3 py-1 font-normal text-orange-600 text-sm dark:text-orange-400"
							variant="secondary"
						>
							Sequential
						</Badge>
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-4">
						<div className="space-y-3">
							<div className="flex items-center gap-3">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 font-medium text-blue-600 text-sm dark:text-blue-400">
									1
								</div>
								<div className="flex-1 rounded-xl border border-border/40 bg-background/50 p-4 backdrop-blur-sm">
									<p className="mb-1 text-muted-foreground text-xs">
										First Request
									</p>
									<p className="font-mono text-sm capitalize">
										{pokemon1?.name || "Failed"}
									</p>
									<p className="mt-1 text-muted-foreground text-xs">
										{timing.first}ms
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 font-medium text-blue-600 text-sm dark:text-blue-400">
									2
								</div>
								<div className="flex-1 rounded-xl border border-border/40 bg-background/50 p-4 backdrop-blur-sm">
									<p className="mb-1 text-muted-foreground text-xs">
										Second Request
									</p>
									<p className="font-mono text-sm capitalize">
										{pokemon2?.name || "Failed"}
									</p>
									<p className="mt-1 text-muted-foreground text-xs">
										{timing.second}ms
									</p>
								</div>
							</div>
						</div>
						<div className="rounded-xl border border-orange-500/20 bg-orange-500/3 p-4">
							<p className="mb-1 text-muted-foreground text-sm">Total Time</p>
							<p className="font-mono font-semibold text-2xl">{totalTime}ms</p>
							<p className="mt-1 text-muted-foreground text-xs">
								{timing.first}ms + {timing.second}ms
							</p>
						</div>
					</div>
					<div className="space-y-2 text-muted-foreground text-sm">
						<p className="font-medium">Best used when:</p>
						<ul className="space-y-1.5 pl-4">
							<li>• Second request depends on first response</li>
							<li>• Order of execution matters</li>
							<li>• Rate limiting requires sequential calls</li>
						</ul>
					</div>
				</CardContent>
			</Card>
		);
	} catch (error) {
		console.error("SequentialFetchDemo error:", error);
		return <ErrorCard message="Failed to demonstrate sequential fetching" />;
	}
}

// 4️⃣ POKEMON TEAM - Server Components
// 4️⃣ POKEMON TEAM - Server Components
function PokemonTeam() {
	const pokemonNames = ["pikachu", "charizard", "mewtwo", "dragonite"];

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="space-y-1.5">
					<h2 className="font-semibold text-3xl tracking-tight">
						Server Components
					</h2>
					<p className="text-base text-muted-foreground">
						Streaming data with independent Suspense boundaries
					</p>
				</div>
				<Badge
					className="w-fit rounded-full bg-green-500/10 px-3 py-1 font-normal text-green-600 text-sm dark:text-green-400"
					variant="secondary"
				>
					Streaming
				</Badge>
			</div>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{pokemonNames.map((name) => (
					<ErrorBoundary key={name}>
						<SuspenseProvider fallback={<PokemonCardSkeleton />}>
							<PokemonCard name={name} />
						</SuspenseProvider>
					</ErrorBoundary>
				))}
			</div>
		</div>
	);
}

// 5️⃣ CLIENT COMPONENTS TEAM - React Query
function ClientPokemonTeam() {
	const pokemonNames = ["bulbasaur", "squirtle", "eevee", "snorlax"];

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="space-y-1.5">
					<h2 className="font-semibold text-3xl tracking-tight">
						Client Components
					</h2>
					<p className="text-base text-muted-foreground">
						React Query for client-side data fetching with caching
					</p>
				</div>
				<Badge
					className="w-fit rounded-full bg-blue-500/10 px-3 py-1 font-normal text-blue-600 text-sm dark:text-blue-400"
					variant="secondary"
				>
					Client-Side
				</Badge>
			</div>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{pokemonNames.map((name) => (
					<ErrorBoundary key={name}>
						<ClientPokemonCard name={name} />
					</ErrorBoundary>
				))}
			</div>
		</div>
	);
}

export default function ServerComponentsPage() {
	return (
		<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
			{/* Hero Section - Apple-style minimal */}
			<div className="mb-20 text-center">
				<h1 className="mb-4 font-semibold text-5xl tracking-tight sm:text-6xl lg:text-7xl">
					React Server Components
				</h1>
				<p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
					Explore parallel fetching, streaming, and client-side data management
				</p>
			</div>

			{/* Main content sections with better spacing */}
			<div className="space-y-16">
				{/* Where Code Runs - NEW SECTION */}
				<section>
					<ErrorBoundary>
						<CodeBoundariesExplainer />
					</ErrorBoundary>
				</section>

				{/* Caching & Revalidation - NEW SECTION */}
				<section>
					<ErrorBoundary>
						<SuspenseProvider
							fallback={<Skeleton className="h-96 w-full rounded-3xl" />}
						>
							<CachingExplainer />
						</SuspenseProvider>
					</ErrorBoundary>
				</section>

				{/* Server stats */}
				<section>
					<ErrorBoundary>
						<SuspenseProvider
							fallback={<Skeleton className="h-96 w-full rounded-3xl" />}
						>
							<ServerStats />
						</SuspenseProvider>
					</ErrorBoundary>
				</section>

				{/* Sequential comparison */}
				<section>
					<ErrorBoundary>
						<SuspenseProvider
							fallback={<Skeleton className="h-96 w-full rounded-3xl" />}
						>
							<SequentialFetchDemo />
						</SuspenseProvider>
					</ErrorBoundary>
				</section>

				{/* Server-Client Interop - NEW SECTION */}
				<section>
					<ErrorBoundary>
						<SuspenseProvider
							fallback={<Skeleton className="h-96 w-full rounded-3xl" />}
						>
							<ServerClientInteropDemo />
						</SuspenseProvider>
					</ErrorBoundary>
				</section>

				{/* Server Components team */}
				<section>
					<ErrorBoundary>
						<SuspenseProvider
							fallback={
								<div className="space-y-6">
									<div className="space-y-1.5">
										<Skeleton className="h-9 w-64" />
										<Skeleton className="h-6 w-96" />
									</div>
									<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
										{[1, 2, 3, 4].map((i) => (
											<PokemonCardSkeleton key={i} />
										))}
									</div>
								</div>
							}
						>
							<PokemonTeam />
						</SuspenseProvider>
					</ErrorBoundary>
				</section>

				{/* Client Components team */}
				<section>
					<ErrorBoundary>
						<ClientPokemonTeam />
					</ErrorBoundary>
				</section>

				{/* Error & Loading Patterns - NEW SECTION */}
				<section>
					<ErrorBoundary>
						<ErrorLoadingPatterns />
					</ErrorBoundary>
				</section>

				{/* Comparison Guide */}
				<section className="space-y-8">
					<div className="text-center">
						<h2 className="mb-3 font-semibold text-3xl tracking-tight">
							Technical Reference
						</h2>
						<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
							Understanding the patterns and best practices
						</p>
					</div>

					<div className="grid gap-6 lg:grid-cols-3">
						<Card className="border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-lg">
							<CardContent className="p-6">
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10">
									<span className="text-2xl">⚡</span>
								</div>
								<h3 className="mb-2 font-semibold text-lg">
									Parallel Fetching
								</h3>
								<p className="mb-4 text-muted-foreground text-sm leading-relaxed">
									Multiple independent requests execute simultaneously for
									optimal performance
								</p>
								<div className="space-y-2 text-sm">
									<p className="text-muted-foreground">Best for:</p>
									<ul className="space-y-1 text-muted-foreground">
										<li>• Independent data sources</li>
										<li>• Maximum speed</li>
										<li>• Unrelated requests</li>
									</ul>
								</div>
							</CardContent>
						</Card>

						<Card className="border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-lg">
							<CardContent className="p-6">
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10">
									<span className="text-2xl">🔗</span>
								</div>
								<h3 className="mb-2 font-semibold text-lg">
									Sequential Fetching
								</h3>
								<p className="mb-4 text-muted-foreground text-sm leading-relaxed">
									Requests execute one after another when dependencies exist
								</p>
								<div className="space-y-2 text-sm">
									<p className="text-muted-foreground">Best for:</p>
									<ul className="space-y-1 text-muted-foreground">
										<li>• Dependent requests</li>
										<li>• Ordered execution</li>
										<li>• Rate limiting</li>
									</ul>
								</div>
							</CardContent>
						</Card>

						<Card className="border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-lg">
							<CardContent className="p-6">
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10">
									<span className="text-2xl">🌊</span>
								</div>
								<h3 className="mb-2 font-semibold text-lg">Streaming</h3>
								<p className="mb-4 text-muted-foreground text-sm leading-relaxed">
									Progressive rendering as data becomes available
								</p>
								<div className="space-y-2 text-sm">
									<p className="text-muted-foreground">Best for:</p>
									<ul className="space-y-1 text-muted-foreground">
										<li>• Better perceived performance</li>
										<li>• Content cards</li>
										<li>• User profiles</li>
									</ul>
								</div>
							</CardContent>
						</Card>
					</div>
				</section>

				{/* Navigation Demo Callout - NEW */}
				<section>
					<Card className="overflow-hidden border-blue-500/20 bg-linear-to-br from-blue-500/5 to-purple-500/5">
						<CardContent className="p-8 text-center">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
								<span className="text-4xl">🧭</span>
							</div>
							<h3 className="mb-2 font-semibold text-2xl">
								Try Navigation & Partial Updates
							</h3>
							<p className="mx-auto mb-6 max-w-xl text-muted-foreground">
								See how layouts persist while content streams in. Experience the
								power of partial rendering.
							</p>
							<a
								className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 font-medium text-sm text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg dark:bg-blue-500 dark:hover:bg-blue-600"
								href="/concepts/navigation"
							>
								Explore Navigation Demo →
							</a>
						</CardContent>
					</Card>
				</section>
			</div>

			<NetworkDebugger />
		</div>
	);
}
