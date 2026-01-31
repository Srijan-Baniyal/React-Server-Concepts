/**
 * API Route for processing text into knowledge graph
 * This endpoint is called by React Query mutations
 */

import { processTextAction } from "@/actions/graph";
import { processTextSchema } from "@/lib/validations/graph";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		
		// Validate input with Zod
		const validatedData = processTextSchema.parse(body);
		
		// Process the text using Server Action
		const graph = await processTextAction(validatedData.text);
		
		return NextResponse.json(
			{
				success: true,
				data: graph,
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
				error: "An unexpected error occurred",
			},
			{ status: 500 }
		);
	}
}
