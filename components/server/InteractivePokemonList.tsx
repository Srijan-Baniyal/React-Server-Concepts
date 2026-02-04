"use client";

import { useState } from "react";
import { InteractivePokemonCard } from "./InteractivePokemonCard";
import { TypeFilter } from "./TypeFilter";

interface PokemonData {
	name: string;
	id: number;
	types: string[];
	image: string;
}

interface InteractivePokemonListProps {
	pokemonList: PokemonData[];
}

export function InteractivePokemonList({
	pokemonList,
}: InteractivePokemonListProps) {
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

	// Extract unique types for the filter
	const allTypes = Array.from(
		new Set(pokemonList.flatMap((p) => p.types))
	).sort();

	// Filter pokemon based on selected types
	const filteredPokemon =
		selectedTypes.length === 0
			? pokemonList
			: pokemonList.filter((pokemon) =>
					selectedTypes.some((type) => pokemon.types.includes(type))
				);

	return (
		<div className="space-y-6">
			<TypeFilter availableTypes={allTypes} onFilterChange={setSelectedTypes} />

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{filteredPokemon.map((pokemon) => (
					<InteractivePokemonCard
						id={pokemon.id}
						image={pokemon.image}
						key={pokemon.id}
						name={pokemon.name}
						types={pokemon.types}
					/>
				))}
			</div>

			{filteredPokemon.length === 0 && (
				<div className="flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-muted/20 py-16 text-center">
					<div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
						<span className="text-3xl">🔍</span>
					</div>
					<p className="font-medium text-muted-foreground">
						No Pokémon match this filter
					</p>
					<p className="text-muted-foreground text-sm">
						Try selecting different types
					</p>
				</div>
			)}
		</div>
	);
}
