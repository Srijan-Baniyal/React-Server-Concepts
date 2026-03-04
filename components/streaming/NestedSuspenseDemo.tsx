import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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

async function fetchPokemon(name: string, delay: number) {
	await new Promise((resolve) => setTimeout(resolve, delay));
	const response = await PokemonAPI.get<Pokemon>(`/pokemon/${name}`);
	return response.data;
}

// Level 1 – streams at ~1s
async function DashboardHeader() {
	const pokemon = await fetchPokemon("eevee", 1000);
	return (
		<Card className="border-blue-500/20 bg-linear-to-r from-blue-500/5 to-transparent transition-all duration-300 hover:shadow-md">
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Image
							alt={pokemon.name}
							className="h-10 w-10 object-contain drop-shadow"
							height={40}
							src={pokemon.sprites.other["official-artwork"].front_default}
							width={40}
						/>
						<div>
							<CardTitle className="text-base capitalize">
								{pokemon.name}
							</CardTitle>
							<CardDescription className="text-xs">
								Dashboard header — streamed at ~1s
							</CardDescription>
						</div>
					</div>
					<Badge
						className="bg-blue-500/10 text-blue-600 dark:text-blue-400"
						variant="outline"
					>
						~1s
					</Badge>
				</div>
			</CardHeader>
		</Card>
	);
}

// Level 2a – streams at ~2.5s
async function Widget1() {
	const pokemon = await fetchPokemon("snorlax", 2500);
	return (
		<Card className="border-green-500/20 bg-linear-to-br from-green-500/5 to-transparent transition-all duration-300 hover:shadow-md">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-sm capitalize">{pokemon.name}</CardTitle>
					<Badge
						className="bg-green-500/10 text-green-600 text-xs dark:text-green-400"
						variant="outline"
					>
						~2.5s
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="space-y-2">
				<div className="flex justify-center">
					<Image
						alt={pokemon.name}
						className="h-16 w-16 object-contain drop-shadow"
						height={80}
						src={pokemon.sprites.other["official-artwork"].front_default}
						width={80}
					/>
				</div>
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
			</CardContent>
		</Card>
	);
}

// Level 2b – streams at ~4s (nested inside level 2)
async function Widget2() {
	const pokemon = await fetchPokemon("dragonite", 4000);
	return (
		<Card className="border-purple-500/20 bg-linear-to-br from-purple-500/5 to-transparent transition-all duration-300 hover:shadow-md">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-sm capitalize">{pokemon.name}</CardTitle>
					<Badge
						className="bg-purple-500/10 text-purple-600 text-xs dark:text-purple-400"
						variant="outline"
					>
						~4s
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="space-y-2">
				<div className="flex justify-center">
					<Image
						alt={pokemon.name}
						className="h-16 w-16 object-contain drop-shadow"
						height={80}
						src={pokemon.sprites.other["official-artwork"].front_default}
						width={80}
					/>
				</div>
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
			</CardContent>
		</Card>
	);
}

function HeaderSkeleton() {
	return (
		<Card className="border-border/50">
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Skeleton className="h-10 w-10 rounded-xl" />
						<div className="space-y-1">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-3 w-32" />
						</div>
					</div>
					<Skeleton className="h-5 w-12 rounded-full" />
				</div>
			</CardHeader>
		</Card>
	);
}

function WidgetSkeleton() {
	return (
		<Card className="border-border/50">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-5 w-12 rounded-full" />
				</div>
			</CardHeader>
			<CardContent className="space-y-2">
				<div className="flex justify-center">
					<Skeleton className="h-16 w-16 rounded-xl" />
				</div>
				<div className="flex gap-1">
					<Skeleton className="h-4 w-14 rounded-full" />
				</div>
			</CardContent>
		</Card>
	);
}

export function NestedSuspenseDemo() {
	return (
		<div className="space-y-4">
			<Card className="border-border/40 bg-card/50">
				<CardContent className="pt-6">
					<div className="space-y-4">
						<p className="text-muted-foreground text-sm leading-relaxed">
							Suspense boundaries can be{" "}
							<strong className="text-foreground">nested</strong> for
							progressive enhancement. The outer shell renders instantly, then
							each level streams in independently.
						</p>
						<div className="overflow-hidden rounded-lg border border-border/50">
							<div className="flex items-center gap-2 border-border/40 border-b bg-muted/60 px-4 py-2">
								<div className="flex gap-1.5">
									<div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
									<div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
									<div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
								</div>
								<span className="font-mono text-muted-foreground text-xs">
									nested-suspense.tsx
								</span>
							</div>
							<pre className="overflow-x-auto bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
								<span className="text-foreground/90">{"<"}</span>
								<span className="text-green-400">Dashboard</span>
								<span className="text-foreground/90">{" />  "}</span>
								<span className="text-muted-foreground/60">
									{"// renders instantly (static shell)\n"}
								</span>
								<span className="text-foreground/90">{"  <"}</span>
								<span className="text-green-400">Suspense</span>
								<span className="text-foreground/90">
									{" fallback={<HeaderSkeleton />}>\n"}
								</span>
								<span className="text-foreground/90">{"    <"}</span>
								<span className="text-blue-400">DashboardHeader</span>
								<span className="text-foreground/90">{" />  "}</span>
								<span className="text-muted-foreground/60">
									{"// streams at ~1s\n"}
								</span>
								<span className="text-foreground/90">{"  </"}</span>
								<span className="text-green-400">Suspense</span>
								<span className="text-foreground/90">{">\n"}</span>
								<span className="text-foreground/90">{"  <"}</span>
								<span className="text-green-400">Suspense</span>
								<span className="text-foreground/90">
									{" fallback={<WidgetSkeleton />}>\n"}
								</span>
								<span className="text-foreground/90">{"    <"}</span>
								<span className="text-green-400">Widget1</span>
								<span className="text-foreground/90">{" />       "}</span>
								<span className="text-muted-foreground/60">
									{"// streams at ~2.5s\n"}
								</span>
								<span className="text-foreground/90">{"    <"}</span>
								<span className="text-purple-400">Widget2</span>
								<span className="text-foreground/90">{" />       "}</span>
								<span className="text-muted-foreground/60">
									{"// streams at ~4s (nested)\n"}
								</span>
								<span className="text-foreground/90">{"  </"}</span>
								<span className="text-green-400">Suspense</span>
								<span className="text-foreground/90">{">"}</span>
							</pre>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="border-border/40">
				<CardHeader>
					<CardTitle className="text-base">Dashboard Container</CardTitle>
					<CardDescription>
						This static shell renders instantly \u26a1
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{/* Outer Suspense — header at ~1s */}
					<SuspenseProvider fallback={<HeaderSkeleton />}>
						<DashboardHeader />
					</SuspenseProvider>

					{/* Inner Suspense — widgets at ~2.5s and ~4s */}
					<div className="grid gap-4 md:grid-cols-2">
						<SuspenseProvider fallback={<WidgetSkeleton />}>
							<Widget1 />
						</SuspenseProvider>
						<SuspenseProvider fallback={<WidgetSkeleton />}>
							<Widget2 />
						</SuspenseProvider>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
