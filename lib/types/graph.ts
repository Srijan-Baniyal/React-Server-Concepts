/**
 * Knowledge Graph Type Definitions
 * These types represent the core data structures for the knowledge graph
 */

export type EntityType = 
	| "person"
	| "organization"
	| "concept"
	| "place"
	| "event"
	| "document"
	| "topic"
	| "custom";

export type RelationshipType =
	| "related_to"
	| "part_of"
	| "located_in"
	| "works_for"
	| "created_by"
	| "influenced_by"
	| "similar_to"
	| "custom";

export interface Entity {
	id: string;
	label: string;
	type: EntityType;
	description?: string;
	properties?: Record<string, unknown>;
	confidence?: number;
	createdAt: Date;
}

export interface Relationship {
	id: string;
	from: string; // Entity ID
	to: string; // Entity ID
	type: RelationshipType;
	label?: string;
	strength?: number; // 0-1 confidence score
	properties?: Record<string, unknown>;
	createdAt: Date;
}

export interface KnowledgeGraph {
	id: string;
	entities: Entity[];
	relationships: Relationship[];
	metadata?: {
		source?: string;
		processedAt: Date;
		version?: number;
	};
}

export interface GraphNode {
	id: string;
	label: string;
	type: EntityType;
	x?: number;
	y?: number;
	expanded?: boolean;
}

export interface GraphEdge {
	id: string;
	source: string;
	target: string;
	type: RelationshipType;
	label?: string;
}

export interface GraphView {
	nodes: GraphNode[];
	edges: GraphEdge[];
}

export interface GraphStreamChunk {
	type: "entity" | "relationship" | "complete";
	data: Entity | Relationship | null;
	progress?: number;
}
