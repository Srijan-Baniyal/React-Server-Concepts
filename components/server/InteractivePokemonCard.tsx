"use client";

import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface InteractivePokemonCardProps {
	id: number;
	image: string;
	name: string;
	types: string[];
}

export function InteractivePokemonCard({
	name,
	id,
	types,
	image,
}: InteractivePokemonCardProps) {
	const [isFavorite, setIsFavorite] = useState(false);

	return (
		<div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-xl">
			{/* Client Component: Favorite Button */}
			<button
				className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-background"
				onClick={() => setIsFavorite(!isFavorite)}
				type="button"
			>
				<span className="text-lg transition-transform duration-300">
					{isFavorite ? "❤️" : "🤍"}
				</span>
			</button>

			{/* Server-provided data (serialized props) */}
			<div className="space-y-3">
				<div className="relative aspect-square overflow-hidden rounded-xl bg-muted/30">
					<Image
						alt={name}
						className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
						height={400}
						src={image}
						width={400}
					/>
				</div>
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<h3 className="font-semibold text-lg capitalize">{name}</h3>
						<Badge className="rounded-full text-xs" variant="secondary">
							#{id}
						</Badge>
					</div>
					<div className="flex flex-wrap gap-1.5">
						{types.map((type) => (
							<Badge
								className="rounded-full text-xs capitalize"
								key={type}
								variant="outline"
							>
								{type}
							</Badge>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
