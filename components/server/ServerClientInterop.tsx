import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PokemonAPI } from "@/lib/PokemonApi";
import { InteractivePokemonList } from "./InteractivePokemonList";

interface PokemonType {
	type: {
		name: string;
	};
}

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
	types: PokemonType[];
}

// Server Component: Fetches data
async function ServerClientInteropDemo() {
	// This runs on the server - can access database, APIs, secrets
	const pokemonNames = [
		"pikachu",
		"charizard",
		"bulbasaur",
		"squirtle",
		"jigglypuff",
		"meowth",
		"psyduck",
		"golduck",
	];

	// Parallel fetch all pokemon data on the server
	const pokemonDataPromises = pokemonNames.map(async (name) => {
		try {
			const response = await PokemonAPI.get<Pokemon>(`/pokemon/${name}`);
			const pokemon = response.data;

			return {
				name: pokemon.name,
				id: pokemon.id,
				types: pokemon.types.map((t) => t.type.name),
				image: pokemon.sprites.other["official-artwork"].front_default,
			};
		} catch (error) {
			console.error(`Failed to fetch ${name}:`, error);
			return null;
		}
	});

	const pokemonResults = await Promise.all(pokemonDataPromises);
	const pokemonList = pokemonResults.filter(
		(p): p is NonNullable<typeof p> => p !== null
	);

	return (
		<div className="space-y-6">
			<div className="text-center">
				<h2 className="mb-3 font-semibold text-4xl tracking-tight">
					Server-Client Interop
				</h2>
				<p className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed">
					Server fetches data, Client handles interactivity
				</p>
			</div>

			<Card className="overflow-hidden border-border/40 bg-card/50">
				<CardHeader className="border-border/40 border-b">
					<CardTitle className="text-xl">How This Works</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 pt-6">
					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-3 rounded-xl border border-green-500/20 bg-green-500/5 p-4">
							<div className="flex items-center gap-2">
								<Badge
									className="bg-green-500/10 text-green-600 dark:text-green-400"
									variant="secondary"
								>
									Server Component
								</Badge>
								<span className="text-muted-foreground text-xs">
									(this component)
								</span>
							</div>
							<ul className="space-y-2 text-sm">
								<li className="flex items-start gap-2">
									<span className="text-green-600 dark:text-green-400">✓</span>
									<span className="text-muted-foreground">
										Fetches {pokemonList.length} Pokémon from API
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-green-600 dark:text-green-400">✓</span>
									<span className="text-muted-foreground">
										Runs async code on the server
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-green-600 dark:text-green-400">✓</span>
									<span className="text-muted-foreground">
										Passes serialized data to Client
									</span>
								</li>
							</ul>
						</div>

						<div className="space-y-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
							<div className="flex items-center gap-2">
								<Badge
									className="bg-blue-500/10 text-blue-600 dark:text-blue-400"
									variant="secondary"
								>
									Client Components
								</Badge>
								<span className="text-muted-foreground text-xs">
									(InteractivePokemonList, TypeFilter, Cards)
								</span>
							</div>
							<ul className="space-y-2 text-sm">
								<li className="flex items-start gap-2">
									<span className="text-blue-600 dark:text-blue-400">✓</span>
									<span className="text-muted-foreground">
										Receive data as props (serializable only)
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-blue-600 dark:text-blue-400">✓</span>
									<span className="text-muted-foreground">
										Handle clicks, favorites, filtering
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-blue-600 dark:text-blue-400">✓</span>
									<span className="text-muted-foreground">
										Manage local UI state with useState
									</span>
								</li>
							</ul>
						</div>
					</div>

					<div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
						<p className="mb-2 font-semibold text-sm text-yellow-600 dark:text-yellow-500">
							🔑 Key Concept: Serialization Boundary
						</p>
						<p className="text-muted-foreground text-xs leading-relaxed">
							The server sends plain JavaScript objects (JSON) to the client. No
							functions, class instances, or Symbols can cross this boundary.
							Notice how we transform the API response into a simple object with
							strings and numbers before passing it down.
						</p>
					</div>

					<div className="rounded-xl border border-border/40 bg-background/50 p-4">
						<p className="mb-3 font-mono text-muted-foreground text-xs">
							Component Tree:
						</p>
						<div className="space-y-2 font-mono text-xs">
							<div className="flex items-center gap-2">
								<Badge
									className="shrink-0 bg-green-500/10 text-green-600 dark:text-green-400"
									variant="secondary"
								>
									S
								</Badge>
								<code>ServerClientInteropDemo (fetches data)</code>
							</div>
							<div className="ml-6 space-y-2 border-border/40 border-l-2 pl-4">
								<div className="flex items-center gap-2">
									<Badge
										className="shrink-0 bg-blue-500/10 text-blue-600 dark:text-blue-400"
										variant="secondary"
									>
										C
									</Badge>
									<code>InteractivePokemonList (manages filter state)</code>
								</div>
								<div className="ml-6 space-y-2 border-border/40 border-l-2 pl-4">
									<div className="flex items-center gap-2">
										<Badge
											className="shrink-0 bg-blue-500/10 text-blue-600 dark:text-blue-400"
											variant="secondary"
										>
											C
										</Badge>
										<code>TypeFilter (handles clicks)</code>
									</div>
									<div className="flex items-center gap-2">
										<Badge
											className="shrink-0 bg-blue-500/10 text-blue-600 dark:text-blue-400"
											variant="secondary"
										>
											C
										</Badge>
										<code>
											InteractivePokemonCard (favorite button, hover states)
										</code>
									</div>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* The actual interactive demo */}
			<Card className="overflow-hidden border-border/40 bg-card/50">
				<CardHeader className="border-border/40 border-b">
					<div className="flex items-center justify-between">
						<CardTitle className="text-xl">Try It Yourself</CardTitle>
						<Badge
							className="rounded-full bg-linear-to-r from-green-500/10 to-blue-500/10 px-3 py-1 font-normal text-sm"
							variant="secondary"
						>
							<span className="bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent dark:from-green-400 dark:to-blue-400">
								Server → Client
							</span>
						</Badge>
					</div>
				</CardHeader>
				<CardContent className="pt-6">
					{/* Client Component receives server-fetched data */}
					<InteractivePokemonList pokemonList={pokemonList} />
				</CardContent>
			</Card>
		</div>
	);
}

export default ServerClientInteropDemo;
