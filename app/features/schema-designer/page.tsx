/**
 * Schema Designer Page - Server Component
 * Demonstrates RSC patterns for schema management
 */

import { Suspense } from "react";
import { listSchemasAction, createSchemaAction } from "@/actions/schema";
import type { SchemaDefinition } from "@/actions/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

async function SchemasList() {
	// Server Component fetches data directly
	const schemas = await listSchemasAction();

	if (schemas.length === 0) {
		return (
			<Card className="p-6">
				<p className="text-muted-foreground text-center">
					No schemas yet. Create your first schema below.
				</p>
			</Card>
		);
	}

	return (
		<div className="space-y-4">
			{schemas.map((schema) => (
				<Card key={schema.id} className="p-4">
					<div className="flex items-start justify-between">
						<div>
							<h3 className="font-semibold">{schema.name}</h3>
							<p className="text-muted-foreground mt-1 text-sm">
								{schema.entityTypes.length} entity types,{" "}
								{schema.relationshipTypes.length} relationship types
							</p>
							<p className="text-muted-foreground mt-1 text-xs">
								Created: {schema.createdAt.toLocaleDateString()}
							</p>
						</div>
					</div>
				</Card>
			))}
		</div>
	);
}

async function CreateSchemaForm() {
	async function handleSubmit(formData: FormData) {
		"use server";

		const name = formData.get("name") as string;
		
		if (!name) {
			return;
		}

		// Create a basic schema with default types
		await createSchemaAction(
			name,
			[
				{
					type: "person",
					label: "Person",
					description: "A person entity",
				},
				{
					type: "organization",
					label: "Organization",
					description: "An organization entity",
				},
				{
					type: "concept",
					label: "Concept",
					description: "A concept or idea",
				},
			],
			[
				{
					type: "related_to",
					label: "Related To",
					description: "Generic relationship",
				},
			]
		);

		// Revalidate the page to show the new schema
		// In Next.js, we can use revalidatePath
		const { revalidatePath } = await import("next/cache");
		revalidatePath("/features/schema-designer");
	}

	return (
		<Card className="p-6">
			<h2 className="mb-4 font-semibold text-lg">Create New Schema</h2>
			<form action={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="schema-name">Schema Name</Label>
					<Input
						id="schema-name"
						name="name"
						placeholder="My Knowledge Graph Schema"
						required
					/>
				</div>
				<Button type="submit">Create Schema</Button>
			</form>
		</Card>
	);
}

export default function SchemaDesignerPage() {
	return (
		<div className="container mx-auto max-w-7xl space-y-8 p-6">
			<div className="space-y-2">
				<h1 className="font-bold text-3xl">Schema Designer</h1>
				<p className="text-muted-foreground">
					Design and manage schemas for your knowledge graphs using Server
					Components.
				</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<div>
					<CreateSchemaForm />
				</div>

				<div>
					<h2 className="mb-4 font-semibold text-lg">Existing Schemas</h2>
					<Suspense
						fallback={
							<div className="space-y-4">
								<Card className="p-4">
									<Skeleton className="h-20 w-full" />
								</Card>
								<Card className="p-4">
									<Skeleton className="h-20 w-full" />
								</Card>
							</div>
						}
					>
						<SchemasList />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
