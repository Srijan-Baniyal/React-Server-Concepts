"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TypeFilterProps {
	availableTypes: string[];
	onFilterChange: (types: string[]) => void;
}

export function TypeFilter({
	availableTypes,
	onFilterChange,
}: TypeFilterProps) {
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

	const toggleType = (type: string) => {
		const newSelection = selectedTypes.includes(type)
			? selectedTypes.filter((t) => t !== type)
			: [...selectedTypes, type];

		setSelectedTypes(newSelection);
		onFilterChange(newSelection);
	};

	const clearFilters = () => {
		setSelectedTypes([]);
		onFilterChange([]);
	};

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="font-semibold text-sm">Filter by Type</h3>
					<p className="text-muted-foreground text-xs">
						Client-side filtering (interactive)
					</p>
				</div>
				{selectedTypes.length > 0 && (
					<Button
						className="h-7 text-xs"
						onClick={clearFilters}
						size="sm"
						variant="ghost"
					>
						Clear
					</Button>
				)}
			</div>
			<div className="flex flex-wrap gap-2">
				{availableTypes.map((type) => (
					<Badge
						className={`cursor-pointer capitalize transition-all duration-200 ${
							selectedTypes.includes(type)
								? "border-primary bg-primary text-primary-foreground"
								: "border-border/40 hover:border-border/60"
						}`}
						key={type}
						onClick={() => toggleType(type)}
						variant="outline"
					>
						{type}
					</Badge>
				))}
			</div>
		</div>
	);
}
