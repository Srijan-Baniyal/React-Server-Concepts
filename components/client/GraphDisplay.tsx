/**
 * Client Component for Graph Display
 * Uses React Query for data fetching with dynamic query keys
 */

"use client";

import { AtIcon } from "@phosphor-icons/react";
import { useGraph } from "@/hooks/use-graph";
import GraphVisualization from "@/components/client/GraphVisualization";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface GraphDisplayProps {
	graphId?: string | null;
}

export default function GraphDisplay({ graphId }: GraphDisplayProps) {
	const {
		data: graph,
		isLoading,
		isError,
		error,
		refetch,
	} = useGraph(graphId, {
		enabled: !!graphId,
	});

	if (!graphId) {
		return (
			<Card className="p-6">
				<p className="text-muted-foreground text-center">
					Enter text on the left to build a knowledge graph
				</p>
			</Card>
		);
	}

	if (isLoading) {
		return (
			<Card className="p-6">
				<Skeleton className="mb-4 h-8 w-48" />
				<div className="space-y-4">
					<Skeleton className="h-32 w-full" />
					<Skeleton className="h-32 w-full" />
				</div>
			</Card>
		);
	}

	if (isError) {
		return (
			<Card className="p-6">
				<div className="flex flex-col items-center gap-4 text-center">
					<AtIcon className="text-destructive size-12" />
					<div>
						<h3 className="font-semibold text-lg">Error loading graph</h3>
						<p className="text-muted-foreground mt-1 text-sm">
							{error?.message || "Failed to load the knowledge graph"}
						</p>
					</div>
					<Button onClick={() => refetch()} variant="outline">
						Try Again
					</Button>
				</div>
			</Card>
		);
	}

	if (!graph) {
		return (
			<Card className="p-6">
				<p className="text-muted-foreground text-center">
					Graph not found. Please create a new graph.
				</p>
			</Card>
		);
	}

	return (
		<div className="space-y-6">
			{/* Graph Stats */}
			<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
				<Card className="p-4">
					<div className="text-muted-foreground text-sm">Entities</div>
					<div className="font-bold text-2xl">{graph.entities.length}</div>
				</Card>
				<Card className="p-4">
					<div className="text-muted-foreground text-sm">Relationships</div>
					<div className="font-bold text-2xl">{graph.relationships.length}</div>
				</Card>
				<Card className="p-4">
					<div className="text-muted-foreground text-sm">Entity Types</div>
					<div className="font-bold text-2xl">
						{new Set(graph.entities.map((e) => e.type)).size}
					</div>
				</Card>
				<Card className="p-4">
					<div className="text-muted-foreground text-sm">Relationship Types</div>
					<div className="font-bold text-2xl">
						{new Set(graph.relationships.map((r) => r.type)).size}
					</div>
				</Card>
			</div>

			{/* Entities List */}
			<Card className="p-6">
				<h3 className="mb-4 font-semibold text-lg">Entities</h3>
				<div className="space-y-3">
					{graph.entities.map((entity) => (
						<div
							key={entity.id}
							className="flex items-start justify-between rounded-lg border p-3"
						>
							<div className="flex-1">
								<div className="flex items-center gap-2">
									<span className="font-medium">{entity.label}</span>
									<Badge variant="outline">{entity.type}</Badge>
								</div>
								{entity.description && (
									<p className="text-muted-foreground mt-1 text-sm">
										{entity.description}
									</p>
								)}
							</div>
							{entity.confidence && (
								<div className="text-muted-foreground text-xs">
									{Math.round(entity.confidence * 100)}%
								</div>
							)}
						</div>
					))}
				</div>
			</Card>

			{/* Relationships List */}
			<Card className="p-6">
				<h3 className="mb-4 font-semibold text-lg">Relationships</h3>
				<div className="space-y-3">
					{graph.relationships.map((relationship) => {
						const getEntityLabel = (id: string) => {
							const entity = graph.entities.find((e) => e.id === id);
							return entity?.label || id;
						};

						return (
							<div
								key={relationship.id}
								className="flex items-center gap-3 rounded-lg border p-3"
							>
								<span className="font-medium">
									{getEntityLabel(relationship.from)}
								</span>
								<Badge variant="secondary">{relationship.type}</Badge>
								<span className="font-medium">
									{getEntityLabel(relationship.to)}
								</span>
								{relationship.strength && (
									<div className="ml-auto text-muted-foreground text-xs">
										{Math.round(relationship.strength * 100)}%
									</div>
								)}
							</div>
						);
					})}
				</div>
			</Card>

			{/* Graph Visualization */}
			<GraphVisualization graph={graph} />
		</div>
	);
}
