/**
 * API Route for graph operations (GET, DELETE)
 */

import { loadGraphAction, deleteGraphAction } from "@/actions/graph";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ graphId: string }> }
) {
	try {
		const { graphId } = await params;
		
		const graph = await loadGraphAction(graphId);
		
		if (!graph) {
			return NextResponse.json(
				{
					success: false,
					error: "Graph not found",
				},
				{ status: 404 }
			);
		}
		
		return NextResponse.json(
			{
				success: true,
				data: graph,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : "Failed to load graph",
			},
			{ status: 500 }
		);
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ graphId: string }> }
) {
	try {
		const { graphId } = await params;
		
		const result = await deleteGraphAction(graphId);
		
		return NextResponse.json(
			{
				success: result.success,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : "Failed to delete graph",
			},
			{ status: 500 }
		);
	}
}
