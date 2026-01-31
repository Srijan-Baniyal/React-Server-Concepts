/**
 * Server Component for Graph Viewer
 * Displays the knowledge graph structure
 * Uses Suspense for progressive loading
 */

import { Suspense } from "react";
import type { KnowledgeGraph } from "@/lib/types/graph";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface GraphViewerProps {
	graph: KnowledgeGraph;
}

function GraphStats({ graph }: GraphViewerProps) {
	return (
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
	);
}

function EntitiesList({ graph }: GraphViewerProps) {
	return (
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
	);
}

function RelationshipsList({ graph }: GraphViewerProps) {
	const getEntityLabel = (id: string) => {
		const entity = graph.entities.find((e) => e.id === id);
		return entity?.label || id;
	};

	return (
		<Card className="p-6">
			<h3 className="mb-4 font-semibold text-lg">Relationships</h3>
			<div className="space-y-3">
				{graph.relationships.map((relationship) => (
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
				))}
			</div>
		</Card>
	);
}

export default function GraphViewer({ graph }: GraphViewerProps) {
	return (
		<div className="space-y-6">
			<GraphStats graph={graph} />
			<div className="grid gap-6 md:grid-cols-2">
				<Suspense
					fallback={
						<Card className="p-6">
							<Skeleton className="mb-4 h-6 w-32" />
							<div className="space-y-3">
								<Skeleton className="h-16 w-full" />
								<Skeleton className="h-16 w-full" />
								<Skeleton className="h-16 w-full" />
							</div>
						</Card>
					}
				>
					<EntitiesList graph={graph} />
				</Suspense>
				<Suspense
					fallback={
						<Card className="p-6">
							<Skeleton className="mb-4 h-6 w-32" />
							<div className="space-y-3">
								<Skeleton className="h-16 w-full" />
								<Skeleton className="h-16 w-full" />
								<Skeleton className="h-16 w-full" />
							</div>
						</Card>
					}
				>
					<RelationshipsList graph={graph} />
				</Suspense>
			</div>
		</div>
	);
}
