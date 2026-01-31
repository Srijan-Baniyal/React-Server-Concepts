/**
 * Zod validation schemas for graph operations
 */

import { z } from "zod";

/**
 * Schema for text input validation
 */
export const processTextSchema = z.object({
	text: z
		.string()
		.min(10, "Text must be at least 10 characters long")
		.max(10000, "Text cannot exceed 10,000 characters")
		.trim(),
});

export type ProcessTextInput = z.infer<typeof processTextSchema>;

/**
 * Schema for entity expansion
 */
export const expandEntitySchema = z.object({
	entityId: z.string().min(1, "Entity ID is required"),
	graphId: z.string().min(1, "Graph ID is required"),
});

export type ExpandEntityInput = z.infer<typeof expandEntitySchema>;

/**
 * Schema for query execution
 */
export const executeQuerySchema = z.object({
	graphId: z.string().min(1, "Graph ID is required"),
	queryType: z.enum([
		"find_entity",
		"find_relationships",
		"find_path",
		"find_subgraph",
		"custom",
	]),
	params: z.record(z.string(), z.unknown()).optional(),
});

export type ExecuteQueryInput = z.infer<typeof executeQuerySchema>;

/**
 * Schema for schema creation
 */
export const createSchemaInputSchema = z.object({
	name: z
		.string()
		.min(1, "Schema name is required")
		.max(100, "Schema name cannot exceed 100 characters"),
	entityTypes: z.array(z.any()).optional(),
	relationshipTypes: z.array(z.any()).optional(),
});

export type CreateSchemaInput = z.infer<typeof createSchemaInputSchema>;
