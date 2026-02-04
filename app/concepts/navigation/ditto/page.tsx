import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PokemonAPI } from "@/lib/PokemonApi";

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
	id: number;
	name: string;
	height: number;
	weight: number;
	sprites: {
		other: {
			"official-artwork": {
				front_default: string;
			};
		};
	};
	types: PokemonType[];
	stats: PokemonStat[];
}

export default async function DittoPage() {
	// Simulate network delay to show streaming
	await new Promise((resolve) => setTimeout(resolve, 800));

	const response = await PokemonAPI.get<Pokemon>("/pokemon/ditto");
	const pokemon = response.data;
	const loadTime = new Date().toLocaleTimeString();

	return (
		<div className="space-y-6">
			<Card className="overflow-hidden border-border/40 bg-card/50">
				<CardHeader className="border-border/40 border-b">
					<div className="flex items-center justify-between">
						<CardTitle className="text-2xl capitalize">
							{pokemon.name}
						</CardTitle>
						<Badge className="rounded-full" variant="secondary">
							#{pokemon.id}
						</Badge>
					</div>
				</CardHeader>
				<CardContent className="pt-6">
					<div className="grid gap-6 md:grid-cols-2">
						<div className="flex items-center justify-center rounded-2xl border border-border/40 bg-muted/20 p-8">
							<Image
								alt={pokemon.name}
								className="h-64 w-64 object-contain"
								height={400}
								src={pokemon.sprites.other["official-artwork"].front_default}
								width={400}
							/>
						</div>
						<div className="space-y-4">
							<div>
								<h3 className="mb-3 font-semibold text-muted-foreground text-sm">
									Types
								</h3>
								<div className="flex flex-wrap gap-2">
									{pokemon.types.map((type) => (
										<Badge
											className="rounded-full capitalize"
											key={type.type.name}
											variant="outline"
										>
											{type.type.name}
										</Badge>
									))}
								</div>
							</div>
							<div>
								<h3 className="mb-3 font-semibold text-muted-foreground text-sm">
									Stats
								</h3>
								<div className="space-y-2">
									{pokemon.stats.map((stat) => (
										<div
											className="flex items-center justify-between"
											key={stat.stat.name}
										>
											<span className="text-muted-foreground text-sm capitalize">
												{stat.stat.name.replace("-", " ")}
											</span>
											<span className="font-medium font-mono text-sm">
												{stat.base_stat}
											</span>
										</div>
									))}
								</div>
							</div>
							<div className="rounded-xl border border-border/40 bg-background/50 p-3">
								<p className="mb-1 font-medium text-xs">Physical Attributes</p>
								<div className="flex gap-4 text-muted-foreground text-xs">
									<span>Height: {pokemon.height}</span>
									<span>Weight: {pokemon.weight}</span>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="border-green-500/20 bg-green-500/5">
				<CardContent className="p-4">
					<div className="flex items-start gap-3">
						<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
							⚡
						</div>
						<div className="flex-1">
							<p className="mb-1 font-semibold text-sm">
								Server Component Rendered
							</p>
							<p className="text-muted-foreground text-xs leading-relaxed">
								This content was fetched and rendered on the server. Loaded at{" "}
								<span className="font-medium font-mono">{loadTime}</span>. The
								layout above stayed mounted during this fetch.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
