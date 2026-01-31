/**
 * Graph Builder Page - Hybrid RSC + React Query
 * Demonstrates:
 * - Server Components for initial data (optional)
 * - React Query for client-side data fetching and mutations
 * - React Hook Form with Zod validation
 * - Dynamic query invalidation and caching
 */

import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import TextInput from "@/components/client/TextInput";
import GraphDisplay from "@/components/client/GraphDisplay";

interface GraphBuilderPageProps {
	searchParams: Promise<{ graphId?: string }>;
}

async function GraphDisplayWrapper({
	searchParams,
}: {
	searchParams: Promise<{ graphId?: string }>;
}) {
	const params = await searchParams;
	const graphId = params.graphId;

	return <GraphDisplay graphId={graphId} />;
}

export default function GraphBuilderPage({
	searchParams,
}: GraphBuilderPageProps) {
	return (
		<div className="container mx-auto max-w-7xl space-y-8 p-6">
			<div className="space-y-2">
				<h1 className="font-bold text-3xl">Graph Builder</h1>
				<p className="text-muted-foreground">
					Transform unstructured text into interactive knowledge graphs using
					React Hook Form, Zod validation, and React Query.
				</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				{/* Text Input - Client Component with React Hook Form + React Query */}
				<div>
					<TextInput />
				</div>

				{/* Graph Display - Client Component with React Query */}
				<div>
					<Suspense
						fallback={
							<Card className="p-6">
								<div className="text-muted-foreground text-center">
									Loading graph...
								</div>
							</Card>
						}
					>
						<GraphDisplayWrapper searchParams={searchParams} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
