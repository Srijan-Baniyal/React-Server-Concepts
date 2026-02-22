"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PokemonAPIClient } from "@/lib/PokemonApi";

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

async function fetchPokemon(name: string): Promise<Pokemon> {
	const response = await PokemonAPIClient.get(`/pokemon/${name}`);
	return response.data;
}

export function ClientPokemonCard({ name }: { name: string }) {
	const {
		data: pokemon,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ["pokemon", name],
		queryFn: () => fetchPokemon(name),
		retry: 3,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});

	if (isLoading) {
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

	if (isError) {
		return (
			<Card className="border-destructive/20 bg-destructive/5 backdrop-blur-sm">
				<CardContent className="p-6">
					<div className="flex items-start gap-3">
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
							<span className="text-lg">⚠️</span>
						</div>
						<div className="flex-1 space-y-3">
							<div className="space-y-1">
								<p className="font-medium text-destructive">Failed to Load</p>
								<p className="text-muted-foreground text-sm">
									{error instanceof Error
										? error.message
										: "Unknown error occurred"}
								</p>
							</div>
							<Button
								className="w-full"
								onClick={() => refetch()}
								variant="outline"
							>
								Retry
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	if (!pokemon) {
		return null;
	}

	return (
		<Card className="group overflow-hidden border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-xl">
			<CardContent className="p-6">
				<div className="space-y-4">
					<div className="relative aspect-square overflow-hidden rounded-2xl bg-muted/30">
						<Image
							alt={pokemon.name}
							className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
							height={400}
							src={pokemon.sprites.other["official-artwork"].front_default}
							width={400}
						/>
					</div>
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<h3 className="font-semibold text-xl capitalize tracking-tight">
								{pokemon.name}
							</h3>
							<Badge className="rounded-full font-normal" variant="secondary">
								#{pokemon.id}
							</Badge>
						</div>
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
						<div className="space-y-2 pt-2">
							{pokemon.stats.slice(0, 3).map((stat) => (
								<div
									className="flex items-center justify-between text-sm"
									key={stat.stat.name}
								>
									<span className="text-muted-foreground capitalize">
										{stat.stat.name.replace("-", " ")}
									</span>
									<span className="font-medium font-mono">
										{stat.base_stat}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
