import type { Edge, Node } from "@xyflow/react";
import { FlowDiagram } from "./FlowWrapper";

/* ─────────────── Blocking SSR ─────────────── */
const blockingNodes: Node[] = [
	{
		id: "b-req",
		position: { x: 100, y: 0 },
		data: { label: "t=0  Request arrives" },
		type: "input",
		style: {
			background: "#ef4444",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			fontSize: 11,
			width: 180,
			textAlign: "center" as const,
		},
	},
	{
		id: "b-qa",
		position: { x: 20, y: 80 },
		data: { label: "DB query A (~50ms)" },
		style: {
			background: "#ef444420",
			border: "1px solid #ef444460",
			borderRadius: 6,
			fontSize: 10,
			width: 140,
			textAlign: "center" as const,
		},
	},
	{
		id: "b-qb",
		position: { x: 20, y: 140 },
		data: { label: "DB query B (~200ms)" },
		style: {
			background: "#ef444420",
			border: "1px solid #ef444460",
			borderRadius: 6,
			fontSize: 10,
			width: 140,
			textAlign: "center" as const,
		},
	},
	{
		id: "b-qc",
		position: { x: 20, y: 200 },
		data: { label: "DB query C (~80ms)" },
		style: {
			background: "#ef444420",
			border: "1px solid #ef444460",
			borderRadius: 6,
			fontSize: 10,
			width: 140,
			textAlign: "center" as const,
		},
	},
	{
		id: "b-wait",
		position: { x: 60, y: 280 },
		data: { label: "t=200  ALL done → render full page" },
		style: {
			background: "#ef444430",
			border: "1px solid #ef444480",
			borderRadius: 8,
			fontSize: 10,
			fontWeight: 600,
			width: 220,
			textAlign: "center" as const,
		},
	},
	{
		id: "b-paint",
		position: { x: 65, y: 360 },
		data: {
			label: "t=220  Browser receives everything\nUser sees blank for 200ms ✗",
		},
		type: "output",
		style: {
			background: "#ef444415",
			border: "2px dashed #ef444450",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 230,
			textAlign: "center" as const,
			fontWeight: 500,
		},
	},
];

const blockingEdges: Edge[] = [
	{ id: "be1", source: "b-req", target: "b-qa", style: { stroke: "#ef4444" } },
	{
		id: "be2",
		source: "b-req",
		target: "b-qb",
		style: { stroke: "#ef4444" },
	},
	{
		id: "be3",
		source: "b-req",
		target: "b-qc",
		style: { stroke: "#ef4444" },
	},
	{
		id: "be4",
		source: "b-qb",
		target: "b-wait",
		label: "blocks",
		style: { stroke: "#ef4444" },
	},
	{
		id: "be5",
		source: "b-wait",
		target: "b-paint",
		style: { stroke: "#ef4444" },
	},
];

/* ─────────────── Streaming SSR ─────────────── */
const streamingNodes: Node[] = [
	{
		id: "s-req",
		position: { x: 100, y: 0 },
		data: { label: "t=0  Request arrives" },
		type: "input",
		style: {
			background: "#22c55e",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			fontSize: 11,
			width: 180,
			textAlign: "center" as const,
		},
	},
	{
		id: "s-shell",
		position: { x: 60, y: 80 },
		data: { label: "t=1ms  HTML shell + fallbacks sent ⚡" },
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 8,
			fontSize: 10,
			fontWeight: 600,
			width: 240,
			textAlign: "center" as const,
		},
	},
	{
		id: "s-a",
		position: { x: 20, y: 170 },
		data: { label: "Chunk A @ t=50ms" },
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 6,
			fontSize: 10,
			width: 130,
			textAlign: "center" as const,
		},
	},
	{
		id: "s-c",
		position: { x: 170, y: 170 },
		data: { label: "Chunk C @ t=80ms" },
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 6,
			fontSize: 10,
			width: 130,
			textAlign: "center" as const,
		},
	},
	{
		id: "s-b",
		position: { x: 95, y: 255 },
		data: { label: "Chunk B @ t=200ms" },
		style: {
			background: "#eab30820",
			border: "1px solid #eab30860",
			borderRadius: 6,
			fontSize: 10,
			width: 140,
			textAlign: "center" as const,
		},
	},
	{
		id: "s-done",
		position: { x: 55, y: 340 },
		data: {
			label:
				"User sees shell at t=1ms\nEach section appears as data resolves ✓",
		},
		type: "output",
		style: {
			background: "#22c55e15",
			border: "2px dashed #22c55e50",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 250,
			textAlign: "center" as const,
			fontWeight: 500,
		},
	},
];

const streamingEdges: Edge[] = [
	{
		id: "se1",
		source: "s-req",
		target: "s-shell",
		animated: true,
		style: { stroke: "#22c55e" },
	},
	{
		id: "se2",
		source: "s-shell",
		target: "s-a",
		animated: true,
		label: "50ms",
		style: { stroke: "#22c55e" },
	},
	{
		id: "se3",
		source: "s-shell",
		target: "s-c",
		animated: true,
		label: "80ms",
		style: { stroke: "#22c55e" },
	},
	{
		id: "se4",
		source: "s-shell",
		target: "s-b",
		animated: true,
		label: "200ms",
		style: { stroke: "#eab308" },
	},
	{
		id: "se5",
		source: "s-b",
		target: "s-done",
		style: { stroke: "#22c55e" },
	},
];

export function BlockingVsStreamingFlow() {
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<div className="space-y-2">
				<p className="text-center font-semibold text-destructive text-sm">
					❌ Blocking SSR (old)
				</p>
				<FlowDiagram
					edges={blockingEdges}
					height="320px"
					className="sm:h-[460px]!"
					nodes={blockingNodes}
				/>
			</div>
			<div className="space-y-2">
				<p className="text-center font-semibold text-green-600 text-sm">
					✅ Streaming SSR (RSC)
				</p>
				<FlowDiagram
					edges={streamingEdges}
					height="320px"
					className="sm:h-[460px]!"
					nodes={streamingNodes}
				/>
			</div>
		</div>
	);
}
