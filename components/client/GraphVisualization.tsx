"use client";

/**
 * Client Component for Interactive Graph Visualization
 * This is one of the few client components - needed for interactivity
 * The graph data comes from Server Components via props
 */

import { useCallback, useMemo } from "react";
import type { KnowledgeGraph } from "@/lib/types/graph";
import { Card } from "@/components/ui/card";

interface GraphVisualizationProps {
	graph: KnowledgeGraph;
	onNodeClick?: (entityId: string) => void;
}

export default function GraphVisualization({
	graph,
	onNodeClick,
}: GraphVisualizationProps) {
	// Transform graph data for visualization
	const nodes = useMemo(
		() =>
			graph.entities.map((entity) => ({
				id: entity.id,
				label: entity.label,
				type: entity.type,
			})),
		[graph.entities]
	);

	const edges = useMemo(
		() =>
			graph.relationships.map((rel) => ({
				id: rel.id,
				source: rel.from,
				target: rel.to,
				type: rel.type,
			})),
		[graph.relationships]
	);

	const handleNodeClick = useCallback(
		(entityId: string) => {
			if (onNodeClick) {
				onNodeClick(entityId);
			}
		},
		[onNodeClick]
	);

	// TODO: Integrate React Flow or D3.js for actual graph visualization
	// For now, show a placeholder
	return (
		<Card className="p-6">
			<h3 className="mb-4 font-semibold text-lg">Graph Visualization</h3>
			<div className="flex h-96 items-center justify-center rounded-lg border border-dashed">
				<div className="text-center">
					<p className="text-muted-foreground mb-2">
						Graph visualization will appear here
					</p>
					<p className="text-muted-foreground text-sm">
						{graph.entities.length} entities, {graph.relationships.length}{" "}
						relationships
					</p>
					<p className="text-muted-foreground mt-4 text-xs">
						React Flow or D3.js integration coming soon
					</p>
				</div>
			</div>
		</Card>
	);
}
