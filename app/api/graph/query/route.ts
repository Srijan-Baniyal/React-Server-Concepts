/**
 * API Route for executing graph queries
 */

import { executeQueryAction } from "@/actions/query";
import { executeQuerySchema } from "@/lib/validations/graph";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		
		// Validate input with Zod
		const validatedData = executeQuerySchema.parse(body);
		
		// Execute query using Server Action
		const result = await executeQueryAction({
			type: validatedData.queryType,
			params: validatedData.params || {},
			graphId: validatedData.graphId,
		});
		
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
					details: error.issues.map((e) => e.message).join(", "),
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
