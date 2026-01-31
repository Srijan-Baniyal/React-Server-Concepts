/**
 * Query Editor Page - Server Component
 * Demonstrates RSC patterns for query execution
 */

import { Suspense } from "react";
import { getQuerySuggestionsAction } from "@/actions/query";
import QueryForm from "@/components/client/QueryForm";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

async function QuerySuggestions({ graphId }: { graphId: string }) {
	const suggestions = await getQuerySuggestionsAction(graphId);

	return (
		<Card className="p-4">
			<h3 className="mb-3 font-semibold text-sm">Query Suggestions</h3>
			<div className="space-y-2">
				{suggestions.map((suggestion, index) => (
					<button
						key={index}
						className="w-full rounded-md border p-2 text-left text-sm transition-colors hover:bg-accent"
					>
						<div className="font-medium">{suggestion.label}</div>
						<div className="text-muted-foreground text-xs">
							{suggestion.description}
						</div>
					</button>
				))}
			</div>
		</Card>
	);
}

async function QueryEditorContent({
	searchParams,
}: {
	searchParams: Promise<{ graphId?: string }>;
}) {
	const params = await searchParams;
	const graphId = params.graphId || "default";

	return (
		<>
			<div className="lg:col-span-2">
				<QueryForm graphId={graphId} />
			</div>

			<div>
				<Suspense
					fallback={
						<Card className="p-4">
							<Skeleton className="mb-3 h-6 w-32" />
							<Skeleton className="h-20 w-full" />
						</Card>
					}
				>
					<QuerySuggestions graphId={graphId} />
				</Suspense>
			</div>
		</>
	);
}

export default function QueryEditorPage({
	searchParams,
}: {
	searchParams: Promise<{ graphId?: string }>;
}) {
	return (
		<div className="container mx-auto max-w-7xl space-y-8 p-6">
			<div className="space-y-2">
				<h1 className="font-bold text-3xl">Query Editor</h1>
				<p className="text-muted-foreground">
					Execute queries on your knowledge graphs using Server Components and
					Server Actions.
				</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				<Suspense
					fallback={
						<>
							<div className="lg:col-span-2">
								<Card className="p-6">
									<Skeleton className="mb-4 h-8 w-48" />
									<Skeleton className="h-32 w-full" />
								</Card>
							</div>
							<div>
								<Card className="p-4">
									<Skeleton className="mb-3 h-6 w-32" />
									<Skeleton className="h-20 w-full" />
								</Card>
							</div>
						</>
					}
				>
					<QueryEditorContent searchParams={searchParams} />
				</Suspense>
			</div>
		</div>
	);
}
