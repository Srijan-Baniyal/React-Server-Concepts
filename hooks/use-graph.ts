/**
 * React Query hooks for graph operations
 * Demonstrates best practices with dynamicity and caching
 */

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { KnowledgeGraph } from "@/lib/types/graph";
import type {
	ExecuteQueryInput,
	ExpandEntityInput,
	ProcessTextInput,
} from "@/lib/validations/graph";
import type { QueryResult } from "@/actions/query";

/**
 * API client functions
 */
const graphApi = {
	processText: async (input: ProcessTextInput): Promise<KnowledgeGraph> => {
		const response = await fetch("/api/graph/process", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(input),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to process text");
		}

		const result = await response.json();
		return result.data;
	},

	getGraph: async (graphId: string): Promise<KnowledgeGraph> => {
		const response = await fetch(`/api/graph/${graphId}`);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to load graph");
		}

		const result = await response.json();
		return result.data;
	},

	expandEntity: async (input: ExpandEntityInput) => {
		const response = await fetch("/api/graph/expand", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(input),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to expand entity");
		}

		const result = await response.json();
		return result.data;
	},

	deleteGraph: async (graphId: string): Promise<void> => {
		const response = await fetch(`/api/graph/${graphId}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to delete graph");
		}
	},

	executeQuery: async (input: ExecuteQueryInput): Promise<QueryResult> => {
		const response = await fetch("/api/graph/query", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(input),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Failed to execute query");
		}

		const result = await response.json();
		return result.data;
	},
};

/**
 * Query keys factory for consistent key management
 */
export const graphKeys = {
	all: ["graphs"] as const,
	lists: () => [...graphKeys.all, "list"] as const,
	list: (filters: Record<string, unknown>) =>
		[...graphKeys.lists(), filters] as const,
	details: () => [...graphKeys.all, "detail"] as const,
	detail: (id: string) => [...graphKeys.details(), id] as const,
	expansions: (graphId: string) =>
		[...graphKeys.detail(graphId), "expansions"] as const,
	expansion: (graphId: string, entityId: string) =>
		[...graphKeys.expansions(graphId), entityId] as const,
};

/**
 * Mutation: Process text into knowledge graph
 * Uses optimistic updates and dynamic query invalidation
 */
export function useProcessText() {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: graphApi.processText,
		onMutate: async (newData) => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({ queryKey: graphKeys.all });

			// Return context for rollback
			return { previousGraphs: queryClient.getQueriesData({ queryKey: graphKeys.all }) };
		},
		onSuccess: (data) => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: graphKeys.all });
			
			// Set the new graph in cache
			queryClient.setQueryData(graphKeys.detail(data.id), data);
			
			// Navigate to the graph builder with the new graph
			router.push(`/features/graph-builder?graphId=${data.id}`);
			
			toast.success("Knowledge graph created successfully!");
		},
		onError: (error, _variables, context) => {
			// Rollback on error
			if (context?.previousGraphs) {
				context.previousGraphs.forEach(([queryKey, data]) => {
					queryClient.setQueryData(queryKey, data);
				});
			}
			
			toast.error(error.message || "Failed to process text");
		},
		// Retry configuration
		retry: 1,
		retryDelay: 1000,
	});
}

/**
 * Query: Get a specific graph by ID
 * Uses dynamic query key based on graphId
 */
export function useGraph(graphId: string | null | undefined, options?: {
	enabled?: boolean;
}) {
	return useQuery({
		queryKey: graphKeys.detail(graphId || ""),
		queryFn: () => graphApi.getGraph(graphId!),
		enabled: !!graphId && (options?.enabled !== false),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
		retry: 1,
	});
}

/**
 * Mutation: Expand entity subgraph
 * Dynamically updates the parent graph cache
 */
export function useExpandEntity() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: graphApi.expandEntity,
		onSuccess: (data, variables) => {
			// Invalidate the specific expansion cache
			queryClient.invalidateQueries({
				queryKey: graphKeys.expansion(variables.graphId, variables.entityId),
			});
			
			// Optionally update the parent graph with new entities/relationships
			queryClient.setQueryData<KnowledgeGraph>(
				graphKeys.detail(variables.graphId),
				(old) => {
					if (!old) return old;
					
					// Merge new entities and relationships
					const existingEntityIds = new Set(old.entities.map((e) => e.id));
					const existingRelIds = new Set(old.relationships.map((r) => r.id));
					
					const newEntities = data.entities.filter(
						(e: { id: string }) => !existingEntityIds.has(e.id)
					);
					const newRelationships = data.relationships.filter(
						(r: { id: string }) => !existingRelIds.has(r.id)
					);
					
					return {
						...old,
						entities: [...old.entities, ...newEntities],
						relationships: [...old.relationships, ...newRelationships],
					};
				}
			);
			
			toast.success("Entity expanded successfully");
		},
		onError: (error) => {
			toast.error(error.message || "Failed to expand entity");
		},
	});
}

/**
 * Mutation: Delete a graph
 * Optimistically removes from cache
 */
export function useDeleteGraph() {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: graphApi.deleteGraph,
		onMutate: async (graphId) => {
			// Cancel outgoing queries
			await queryClient.cancelQueries({ queryKey: graphKeys.detail(graphId) });

			// Snapshot previous value
			const previousGraph = queryClient.getQueryData<KnowledgeGraph>(
				graphKeys.detail(graphId)
			);

			// Optimistically remove from cache
			queryClient.removeQueries({ queryKey: graphKeys.detail(graphId) });

			return { previousGraph };
		},
		onSuccess: () => {
			// Invalidate lists to refresh
			queryClient.invalidateQueries({ queryKey: graphKeys.lists() });
			router.push("/dashboard");
			toast.success("Graph deleted successfully");
		},
		onError: (error, graphId, context) => {
			// Rollback on error
			if (context?.previousGraph) {
				queryClient.setQueryData(graphKeys.detail(graphId), context.previousGraph);
			}
			toast.error(error.message || "Failed to delete graph");
		},
	});
}

/**
 * Mutation: Execute a graph query
 * Uses React Query for query execution and result caching
 */
export function useExecuteQuery() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: graphApi.executeQuery,
		onSuccess: (data, variables) => {
			// Cache the query result
			queryClient.setQueryData(
				["query", variables.graphId, variables.queryType, variables.params],
				data
			);
			
			toast.success("Query executed successfully");
		},
		onError: (error) => {
			toast.error(error.message || "Failed to execute query");
		},
	});
}
