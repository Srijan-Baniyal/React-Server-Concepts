/**
 * API Route for expanding entity subgraph
 */

import { expandEntityAction } from "@/actions/graph";
import { expandEntitySchema } from "@/lib/validations/graph";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		
		// Validate input
		const validatedData = expandEntitySchema.parse(body);
		
		// Load current graph first (you might want to pass it in the request)
		// For now, we'll need the full graph - this is a simplified version
		const currentGraph = {
			id: validatedData.graphId,
			entities: [],
			relationships: [],
		};
		
		const result = await expandEntityAction(
			validatedData.entityId,
			currentGraph
		);
		
		return NextResponse.json(
			{
				success: true,
				data: result,
			},
			{ status: 200 }
		);
	} catch (error) {
		// Zod validation error
		if (error instanceof ZodError) {
			return NextResponse.json(
				{
					success: false,
					error: "Validation failed",
					details: error.errors.map((e) => e.message).join(", "),
				},
				{ status: 400 }
			);
		}
		
		// Other errors
		if (error instanceof Error) {
			return NextResponse.json(
				{
					success: false,
					error: error.message,
				},
				{ status: 500 }
			);
		}
		
		return NextResponse.json(
			{
				success: false,
				error: "Failed to expand entity",
			},
			{ status: 500 }
		);
	}
}
