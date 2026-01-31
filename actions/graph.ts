"use server";

/**
 * Server Actions for Knowledge Graph Operations
 * All mutations and data operations happen through Server Actions
 * This keeps the client minimal and leverages RSC patterns
 */

import { buildKnowledgeGraph, streamKnowledgeGraph } from "@/lib/graph/extraction";
import type { KnowledgeGraph, Entity, Relationship } from "@/lib/types/graph";

/**
 * Process text and build a knowledge graph
 * This Server Action runs entirely on the server
 */
export async function processTextAction(text: string): Promise<KnowledgeGraph> {
	if (!text || text.trim().length === 0) {
		throw new Error("Text input is required");
	}

	if (text.length > 10000) {
		throw new Error("Text input is too long (max 10,000 characters)");
	}

	try {
		const graph = await buildKnowledgeGraph(text);
		return graph;
	} catch (error) {
		console.error("Error processing text:", error);
		throw new Error("Failed to process text. Please try again.");
	}
}

/**
 * Get expanded subgraph for a specific entity
 * This Server Action fetches related entities and relationships
 */
export async function expandEntityAction(
	entityId: string,
	currentGraph: KnowledgeGraph
): Promise<{
	entities: Entity[];
	relationships: Relationship[];
}> {
	// Find the entity in the current graph
	const entity = currentGraph.entities.find((e) => e.id === entityId);
	
	if (!entity) {
		throw new Error("Entity not found");
	}

	// TODO: Implement actual subgraph expansion logic
	// For now, return related entities from the current graph
	const relatedRelationships = currentGraph.relationships.filter(
		(rel) => rel.from === entityId || rel.to === entityId
	);

	const relatedEntityIds = new Set<string>();
	relatedRelationships.forEach((rel) => {
		relatedEntityIds.add(rel.from);
		relatedEntityIds.add(rel.to);
	});

	const relatedEntities = currentGraph.entities.filter((e) =>
		relatedEntityIds.has(e.id)
	);

	return {
		entities: relatedEntities,
		relationships: relatedRelationships,
	};
}

/**
 * Save a knowledge graph
 * This Server Action persists the graph (in-memory for now, can be extended to database)
 */
export async function saveGraphAction(graph: KnowledgeGraph): Promise<{ success: boolean; graphId: string }> {
	// TODO: Implement actual persistence (database, file system, etc.)
	// For now, just return success
	return {
		success: true,
		graphId: graph.id,
	};
}

/**
 * Load a knowledge graph by ID
 * This Server Action retrieves a saved graph
 */
export async function loadGraphAction(graphId: string): Promise<KnowledgeGraph | null> {
	// TODO: Implement actual retrieval from storage
	// For now, return null
	return null;
}

/**
 * Delete a knowledge graph
 * This Server Action removes a graph from storage
 */
export async function deleteGraphAction(graphId: string): Promise<{ success: boolean }> {
	// TODO: Implement actual deletion
	return { success: true };
}
