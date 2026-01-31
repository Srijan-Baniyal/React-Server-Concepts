/**
 * Dashboard Page - Server Component
 * Demonstrates RSC patterns for data aggregation and display
 */

import { Suspense } from "react";
import Link from "next/link";
import { listSchemasAction } from "@/actions/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

async function RecentGraphs() {
	// In a real implementation, this would fetch from a database
	// For now, return empty array
	const graphs: Array<{ id: string; name: string; createdAt: Date }> = [];

	if (graphs.length === 0) {
		return (
			<Card className="p-6">
				<p className="text-muted-foreground text-center">
					No graphs yet. Create your first graph to get started.
				</p>
				<Link href="/features/graph-builder" className="mt-4 block">
					<Button className="w-full">
						Create Graph
					</Button>
				</Link>
			</Card>
		);
	}

	return (
		<Card className="p-6">
			<h3 className="mb-4 font-semibold text-lg">Recent Graphs</h3>
			<div className="space-y-3">
				{graphs.map((graph) => (
					<div
						key={graph.id}
						className="flex items-center justify-between rounded-lg border p-3"
					>
						<div>
							<div className="font-medium">{graph.name}</div>
							<div className="text-muted-foreground text-sm">
								{graph.createdAt.toLocaleDateString()}
							</div>
						</div>
						<Link href={`/features/graph-builder?graphId=${graph.id}`}>
							<Button variant="ghost" size="sm">
								View
							</Button>
						</Link>
					</div>
				))}
			</div>
		</Card>
	);
}

async function SchemasCount() {
	const schemas = await listSchemasAction();
	return (
		<Card className="p-6">
			<div className="text-muted-foreground text-sm">Total Schemas</div>
			<div className="font-bold text-3xl">{schemas.length}</div>
		</Card>
	);
}

async function StatsGrid() {
	const schemas = await listSchemasAction();

	return (
		<div className="grid gap-4 md:grid-cols-3">
			<Card className="p-6">
				<div className="text-muted-foreground text-sm">Total Graphs</div>
				<div className="font-bold text-3xl">0</div>
			</Card>
			<Suspense
				fallback={
					<Card className="p-6">
						<Skeleton className="mb-2 h-4 w-24" />
						<Skeleton className="h-8 w-16" />
					</Card>
				}
			>
				<SchemasCount />
			</Suspense>
			<Card className="p-6">
				<div className="text-muted-foreground text-sm">Total Entities</div>
				<div className="font-bold text-3xl">0</div>
			</Card>
		</div>
	);
}

export default function DashboardPage() {
	return (
		<div className="container mx-auto max-w-7xl space-y-8 p-6">
			<div className="space-y-2">
				<h1 className="font-bold text-3xl">Dashboard</h1>
				<p className="text-muted-foreground">
					Overview of your knowledge graphs, built with React Server Components.
				</p>
			</div>

			<Suspense
				fallback={
					<div className="grid gap-4 md:grid-cols-3">
						<Card className="p-6">
							<Skeleton className="mb-2 h-4 w-24" />
							<Skeleton className="h-8 w-16" />
						</Card>
						<Card className="p-6">
							<Skeleton className="mb-2 h-4 w-24" />
							<Skeleton className="h-8 w-16" />
						</Card>
						<Card className="p-6">
							<Skeleton className="mb-2 h-4 w-24" />
							<Skeleton className="h-8 w-16" />
						</Card>
					</div>
				}
			>
				<StatsGrid />
			</Suspense>

			<div className="grid gap-6 lg:grid-cols-2">
				<Suspense
					fallback={
						<Card className="p-6">
							<Skeleton className="mb-4 h-6 w-32" />
							<Skeleton className="h-20 w-full" />
						</Card>
					}
				>
					<RecentGraphs />
				</Suspense>

				<Card className="p-6">
					<h3 className="mb-4 font-semibold text-lg">Quick Actions</h3>
					<div className="space-y-3">
						<Link href="/features/graph-builder" className="block">
							<Button className="w-full" variant="outline">
								Build New Graph
							</Button>
						</Link>
						<Link href="/features/schema-designer" className="block">
							<Button className="w-full" variant="outline">
								Design Schema
							</Button>
						</Link>
						<Link href="/features/query-editor" className="block">
							<Button className="w-full" variant="outline">
								Query Graphs
							</Button>
						</Link>
					</div>
				</Card>
			</div>
		</div>
	);
}
