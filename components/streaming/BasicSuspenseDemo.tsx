import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PokemonAPI } from "@/lib/PokemonApi";
import { SuspenseProvider } from "@/providers/SuspenseProvider";

interface PokemonType {
	type: { name: string };
}

interface Pokemon {
	height: number;
	id: number;
	name: string;
	sprites: {
		other: { "official-artwork": { front_default: string } };
	};
	stats: Array<{ base_stat: number; stat: { name: string } }>;
	types: PokemonType[];
	weight: number;
}

async function StreamingPokemonCard() {
	// Artificial delay to demonstrate Suspense streaming
	await new Promise((resolve) => setTimeout(resolve, 2000));
	const response = await PokemonAPI.get<Pokemon>("/pokemon/gengar");
	const pokemon = response.data;

	return (
		<Card className="overflow-hidden border-purple-500/20 bg-linear-to-br from-purple-500/5 to-transparent transition-all duration-300 hover:border-purple-500/40 hover:shadow-lg">
			<CardHeader className="border-purple-500/10 border-b pb-4">
				<div className="flex items-center justify-between">
					<CardTitle className="text-lg capitalize">{pokemon.name}</CardTitle>
					<div className="flex items-center gap-2">
						<Badge variant="secondary">#{pokemon.id}</Badge>
						<Badge
							className="bg-purple-500/10 text-purple-600 dark:text-purple-400"
							variant="outline"
						>
							~2s stream
						</Badge>
					</div>
				</div>
			</CardHeader>
			<CardContent className="pt-5">
				<div className="flex gap-5">
					<Image
						alt={pokemon.name}
						className="h-24 w-24 object-contain drop-shadow-md"
						height={96}
						src={pokemon.sprites.other["official-artwork"].front_default}
						width={96}
					/>
					<div className="flex-1 space-y-3">
						<div className="flex flex-wrap gap-1.5">
							{pokemon.types.map((t) => (
								<Badge
									className="capitalize"
									key={t.type.name}
									variant="outline"
								>
									{t.type.name}
								</Badge>
							))}
						</div>
						<div className="space-y-1">
							{pokemon.stats.slice(0, 3).map((s) => (
								<div
									className="flex items-center justify-between gap-4 text-sm"
									key={s.stat.name}
								>
									<span className="text-muted-foreground capitalize">
										{s.stat.name.replace("-", " ")}
									</span>
									<span className="font-mono font-semibold">{s.base_stat}</span>
								</div>
							))}
						</div>
						<p className="text-muted-foreground/60 text-xs">
							{pokemon.height / 10}m · {pokemon.weight / 10}kg
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

function StreamingPokemonSkeleton() {
	return (
		<Card className="overflow-hidden border-border/50">
			<CardHeader className="border-border/40 border-b pb-4">
				<div className="flex items-center justify-between">
					<Skeleton className="h-6 w-20" />
					<div className="flex gap-2">
						<Skeleton className="h-5 w-10 rounded-full" />
						<Skeleton className="h-5 w-20 rounded-full" />
					</div>
				</div>
			</CardHeader>
			<CardContent className="pt-5">
				<div className="flex gap-5">
					<Skeleton className="h-24 w-24 shrink-0 rounded-xl" />
					<div className="flex-1 space-y-3">
						<div className="flex gap-1.5">
							<Skeleton className="h-5 w-16 rounded-full" />
							<Skeleton className="h-5 w-16 rounded-full" />
						</div>
						<div className="space-y-2">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-3/4" />
						</div>
						<Skeleton className="h-3 w-24" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export function BasicSuspenseDemo() {
	return (
		<div className="space-y-4">
			<Card className="border-border/40 bg-card/50">
				<CardContent className="pt-6">
					<div className="space-y-4">
						<p className="text-muted-foreground text-sm leading-relaxed">
							The Pokémon card below simulates a{" "}
							<strong className="text-foreground">~2 second</strong> data fetch.
							With Suspense, the page renders immediately and shows a skeleton
							while the server streams the component in.
						</p>
						{/* Styled code panel */}
						<div className="overflow-hidden rounded-lg border border-border/50">
							<div className="flex items-center gap-2 border-border/40 border-b bg-muted/60 px-4 py-2">
								<div className="flex gap-1.5">
									<div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
									<div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
									<div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
								</div>
								<span className="font-mono text-muted-foreground text-xs">
									basic-suspense.tsx
								</span>
							</div>
							<pre className="overflow-x-auto bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
								<span className="text-purple-400">async function </span>
								<span className="text-blue-400">StreamingPokemonCard</span>
								<span className="text-foreground/90">{"() {\n"}</span>
								<span className="text-foreground/90">{"  "}</span>
								<span className="text-purple-400">const </span>
								<span className="text-foreground/90">pokemon = </span>
								<span className="text-purple-400">await </span>
								<span className="text-blue-400">fetchPokemon</span>
								<span className="text-foreground/90">{"(); "}</span>
								<span className="text-muted-foreground/60">
									{"// 🛑 suspends here\n"}
								</span>
								<span className="text-foreground/90">{"  "}</span>
								<span className="text-purple-400">return </span>
								<span className="text-foreground/90">{"<"}</span>
								<span className="text-green-400">PokemonCard</span>
								<span className="text-foreground/90">
									{" pokemon={pokemon} />;\n}\n\n"}
								</span>
								<span className="text-foreground/90">{"<"}</span>
								<span className="text-green-400">Suspense </span>
								<span className="text-orange-400">fallback</span>
								<span className="text-foreground/90">{"={<"}</span>
								<span className="text-green-400">Skeleton</span>
								<span className="text-foreground/90">{" />}>\n  <"}</span>
								<span className="text-green-400">StreamingPokemonCard</span>
								<span className="text-foreground/90">{" />\n</"}</span>
								<span className="text-green-400">Suspense</span>
								<span className="text-foreground/90">{">"} </span>
								<span className="text-muted-foreground/60">
									{"// shows skeleton while streaming"}
								</span>
							</pre>
						</div>
					</div>
				</CardContent>
			</Card>

			<SuspenseProvider fallback={<StreamingPokemonSkeleton />}>
				<StreamingPokemonCard />
			</SuspenseProvider>
		</div>
	);
}
