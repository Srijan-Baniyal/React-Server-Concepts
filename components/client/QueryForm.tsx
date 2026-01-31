/**
 * Client Component for Query Form with React Hook Form + Zod + React Query
 */

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { executeQuerySchema, type ExecuteQueryInput } from "@/lib/validations/graph";
import { useExecuteQuery } from "@/hooks/use-graph";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import type { QueryResult } from "@/actions/query";
import { useState } from "react";

interface QueryFormProps {
	graphId: string;
	onResult?: (result: QueryResult) => void;
}

export default function QueryForm({ graphId, onResult }: QueryFormProps) {
	const [queryResult, setQueryResult] = useState<QueryResult | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		reset,
	} = useForm<ExecuteQueryInput>({
		resolver: zodResolver(executeQuerySchema),
		defaultValues: {
			graphId,
			queryType: "find_entity",
			params: {},
		},
	});

	const executeQueryMutation = useExecuteQuery();
	const queryType = watch("queryType");

	const onSubmit = async (data: ExecuteQueryInput) => {
		try {
			// Parse params if it's a string
			let parsedParams: Record<string, unknown> = {};
			if (typeof data.params === "string") {
				try {
					parsedParams = JSON.parse(data.params);
				} catch {
					parsedParams = {};
				}
			} else {
				parsedParams = data.params || {};
			}

			const result = await executeQueryMutation.mutateAsync({
				...data,
				params: parsedParams,
			});

			setQueryResult(result);
			if (onResult) {
				onResult(result);
			}
		} catch (error) {
			// Error is handled by the mutation's onError callback
			console.error("Query execution error:", error);
		}
	};

	return (
		<div className="space-y-6">
			<Card className="p-6">
				<h2 className="mb-4 font-semibold text-lg">Execute Query</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<Field>
						<FieldLabel htmlFor="query-type">Query Type</FieldLabel>
						<FieldContent>
							<Select
								value={queryType}
								onValueChange={(value) =>
									setValue("queryType", value as ExecuteQueryInput["queryType"])
								}
							>
								<SelectTrigger id="query-type">
									<SelectValue placeholder="Select query type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="find_entity">Find Entity</SelectItem>
									<SelectItem value="find_relationships">
										Find Relationships
									</SelectItem>
									<SelectItem value="find_path">Find Path</SelectItem>
									<SelectItem value="find_subgraph">Find Subgraph</SelectItem>
								</SelectContent>
							</Select>
							{errors.queryType && (
								<FieldError errors={[errors.queryType]} />
							)}
						</FieldContent>
					</Field>

					<Field>
						<FieldLabel htmlFor="query-params">Parameters (JSON)</FieldLabel>
						<FieldContent>
							<Textarea
								id="query-params"
								{...register("params", {
									setValueAs: (value) => {
										if (!value) return {};
										try {
											return JSON.parse(value);
										} catch {
											return {};
										}
									},
								})}
								placeholder='{"entityId": "entity-123"}'
								rows={4}
								aria-invalid={!!errors.params}
							/>
							{errors.params && <FieldError errors={[errors.params]} />}
							<FieldDescription>
								Enter query parameters as JSON. Example: {"{"}"entityId": "entity-123"{"}"}
							</FieldDescription>
						</FieldContent>
					</Field>

					<Button
						type="submit"
						className="w-full"
						disabled={executeQueryMutation.isPending}
					>
						{executeQueryMutation.isPending ? "Executing..." : "Execute Query"}
					</Button>
				</form>
			</Card>

			{queryResult && (
				<Card className="p-6">
					<h3 className="mb-4 font-semibold text-lg">Query Results</h3>
					{queryResult.metadata && (
						<div className="mb-4 text-muted-foreground text-sm">
							Found {queryResult.metadata.resultCount} results in{" "}
							{queryResult.metadata.executionTime}ms
						</div>
					)}

					{queryResult.entities && queryResult.entities.length > 0 && (
						<div className="mb-4">
							<h4 className="mb-2 font-medium">Entities</h4>
							<div className="space-y-2">
								{queryResult.entities.map((entity) => (
									<div
										key={entity.id}
										className="rounded-md border p-2 text-sm"
									>
										{entity.label} ({entity.type})
									</div>
								))}
							</div>
						</div>
					)}

					{queryResult.relationships &&
						queryResult.relationships.length > 0 && (
							<div>
								<h4 className="mb-2 font-medium">Relationships</h4>
								<div className="space-y-2">
									{queryResult.relationships.map((rel) => (
										<div
											key={rel.id}
											className="rounded-md border p-2 text-sm"
										>
											{rel.type}
										</div>
									))}
								</div>
							</div>
						)}

					{(!queryResult.entities || queryResult.entities.length === 0) &&
						(!queryResult.relationships ||
							queryResult.relationships.length === 0) && (
							<p className="text-muted-foreground text-center">
								No results found
							</p>
						)}
				</Card>
			)}
		</div>
	);
}
