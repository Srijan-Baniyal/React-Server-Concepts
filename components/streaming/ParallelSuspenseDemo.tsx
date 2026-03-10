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

const streamConfig = [
	{ name: "pikachu", delay: 1000, color: "blue" as const, label: "~1s" },
	{ name: "charizard", delay: 2500, color: "orange" as const, label: "~2.5s" },
	{ name: "mewtwo", delay: 4500, color: "purple" as const, label: "~4.5s" },
];

const colorMap = {
	blue: {
		border: "border-blue-500/20",
		bg: "from-blue-500/5",
		badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
	},
	orange: {
		border: "border-orange-500/20",
		bg: "from-orange-500/5",
		badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
	},
	purple: {
		border: "border-purple-500/20",
		bg: "from-purple-500/5",
		badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
	},
};

async function StreamingCard({
	name,
	delay,
	color,
	label,
}: (typeof streamConfig)[number]) {
	const pokemon = await fetchPokemon(name, delay);
	const colors = colorMap[color];

	return (
		<Card
			className={`overflow-hidden ${colors.border} bg-linear-to-br ${colors.bg} to-transparent transition-all duration-300 hover:shadow-lg`}
		>
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base capitalize">{pokemon.name}</CardTitle>
					<Badge className={colors.badge} variant="outline">
						{label}
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="flex justify-center">
					<Image
						alt={pokemon.name}
						className="h-20 w-20 object-contain drop-shadow-md"
						height={96}
						src={pokemon.sprites.other["official-artwork"].front_default}
						width={96}
					/>
				</div>
				<div className="flex flex-wrap justify-center gap-1">
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
				<div className="space-y-1 rounded-lg bg-background/50 p-2 text-xs">
					{pokemon.stats.slice(0, 2).map((s) => (
						<div className="flex justify-between" key={s.stat.name}>
							<span className="text-muted-foreground capitalize">
								{s.stat.name.replace("-", " ")}
							</span>
							<span className="font-medium font-mono">{s.base_stat}</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

function ComponentSkeleton() {
	return (
		<Card className="border-border/50">
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<Skeleton className="h-5 w-24" />
					<Skeleton className="h-5 w-14 rounded-full" />
				</div>
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="flex justify-center">
					<Skeleton className="h-20 w-20 rounded-xl" />
				</div>
				<div className="flex justify-center gap-1">
					<Skeleton className="h-5 w-14 rounded-full" />
				</div>
				<div className="space-y-1 rounded-lg p-2">
					<Skeleton className="h-3 w-full" />
					<Skeleton className="h-3 w-3/4" />
				</div>
			</CardContent>
		</Card>
	);
}

export function ParallelSuspenseDemo() {
	return (
		<div className="space-y-4">
			<Card className="border-border/40 bg-card/50">
				<CardContent className="pt-6">
					<div className="space-y-4">
						<p className="text-muted-foreground text-sm leading-relaxed">
							Each Pokémon card has its own{" "}
							<strong className="text-foreground">
								independent Suspense boundary
							</strong>
							. All three fetch concurrently — cards stream in as they resolve,
							not one-after-another.
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
									parallel-suspense.tsx
								</span>
							</div>
							<pre className="overflow-x-auto bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
								<span className="text-foreground/90">{"<"}</span>
								<span className="text-green-400">div </span>
								<span className="text-orange-400">className</span>
								<span className="text-foreground/90">
									{'="grid grid-cols-3">\n'}
								</span>
								{"  "}
								<span className="text-muted-foreground/60">
									{"// \u2705 All 3 start fetching simultaneously\n"}
								</span>
								{"  <"}
								<span className="text-green-400">Suspense</span>
								<span className="text-foreground/90">
									{" fallback={<Skeleton />}>\n"}
								</span>
								{"    <"}
								<span className="text-blue-400">Pikachu</span>
								<span className="text-foreground/90">{" /> "}</span>
								<span className="text-muted-foreground/60">
									{"// streams at ~1s\n"}
								</span>
								{"  </"}
								<span className="text-green-400">Suspense</span>
								<span className="text-foreground/90">{">\n"}</span>
								{"  <"}
								<span className="text-green-400">Suspense</span>
								<span className="text-foreground/90">
									{" fallback={<Skeleton />}>\n"}
								</span>
								{"    <"}
								<span className="text-orange-400">Charizard</span>
								<span className="text-foreground/90">{" /> "}</span>
								<span className="text-muted-foreground/60">
									{"// streams at ~2.5s\n"}
								</span>
								{"  </"}
								<span className="text-green-400">Suspense</span>
								<span className="text-foreground/90">{">\n"}</span>
								{"  <"}
								<span className="text-green-400">Suspense</span>
								<span className="text-foreground/90">
									{" fallback={<Skeleton />}>\n"}
								</span>
								{"    <"}
								<span className="text-purple-400">Mewtwo</span>
								<span className="text-foreground/90">{" />    "}</span>
								<span className="text-muted-foreground/60">
									{"// streams at ~4.5s\n"}
								</span>
								{"  </"}
								<span className="text-green-400">Suspense</span>
								<span className="text-foreground/90">{">\n"}</span>
								<span className="text-foreground/90">{"</"}</span>
								<span className="text-green-400">div</span>
								<span className="text-foreground/90">{">"}</span>
							</pre>
						</div>
						<div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
							<p className="font-medium text-primary text-sm">
								\u23f1 Total time = <strong>max(1s, 2.5s, 4.5s) = ~4.5s</strong>
								, not 1 + 2.5 + 4.5 = 8s
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
				{streamConfig.map((config) => (
					<SuspenseProvider fallback={<ComponentSkeleton />} key={config.name}>
						<StreamingCard {...config} />
					</SuspenseProvider>
				))}
			</div>
		</div>
	);
}
