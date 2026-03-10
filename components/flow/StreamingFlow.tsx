import type { Edge, Node } from "@xyflow/react";
import { FlowDiagram } from "./FlowWrapper";

const nodes: Node[] = [
	{
		id: "req",
		position: { x: 250, y: 0 },
		data: { label: "CLIENT REQUEST" },
		type: "input",
		style: {
			background: "#3b82f6",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			fontSize: 12,
			padding: "10px 24px",
		},
	},
	{
		id: "shell",
		position: { x: 210, y: 90 },
		data: {
			label:
				"SERVER: Generate Page Shell\n• Static HTML structure\n• <Suspense> boundaries marked\n• Send to client immediately ⚡",
		},
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 260,
			textAlign: "left" as const,
			padding: "10px 14px",
		},
	},
	{
		id: "client-shell",
		position: { x: 210, y: 230 },
		data: {
			label:
				"CLIENT: Displays Page Shell\n• Shows fallback UI for suspended components",
		},
		style: {
			background: "#3b82f620",
			border: "1px solid #3b82f660",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 280,
			textAlign: "left" as const,
			padding: "10px 14px",
		},
	},
	{
		id: "async1",
		position: { x: 80, y: 350 },
		data: { label: "SERVER: Async Data 1\n(Fast — 1s)" },
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 170,
			textAlign: "center" as const,
		},
	},
	{
		id: "async2",
		position: { x: 380, y: 350 },
		data: { label: "SERVER: Async Data 2\n(Slow — 3s)" },
		style: {
			background: "#ef444420",
			border: "1px solid #ef444460",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 170,
			textAlign: "center" as const,
		},
	},
	{
		id: "chunk1",
		position: { x: 80, y: 450 },
		data: { label: "Stream Chunk 1\nto client at ~1s" },
		style: {
			background: "#f59e0b20",
			border: "1px dashed #f59e0b80",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 160,
			textAlign: "center" as const,
		},
	},
	{
		id: "chunk2",
		position: { x: 380, y: 490 },
		data: { label: "Stream Chunk 2\nto client at ~3s" },
		style: {
			background: "#f59e0b20",
			border: "1px dashed #f59e0b80",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 160,
			textAlign: "center" as const,
		},
	},
	{
		id: "interactive",
		position: { x: 180, y: 600 },
		data: {
			label:
				"CLIENT: Fully Interactive Page\nAll async components rendered and hydrated ✓",
		},
		type: "output",
		style: {
			background: "#22c55e",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			fontSize: 11,
			whiteSpace: "pre-line" as const,
			width: 300,
			textAlign: "center" as const,
			padding: "12px 16px",
		},
	},
];

const edges: Edge[] = [
	{
		id: "e1",
		source: "req",
		target: "shell",
		animated: true,
		style: { stroke: "#3b82f6" },
	},
	{
		id: "e2",
		source: "shell",
		target: "client-shell",
		animated: true,
		label: "immediate ⚡",
		style: { stroke: "#22c55e" },
	},
	{
		id: "e3",
		source: "client-shell",
		target: "async1",
		style: { stroke: "#22c55e" },
	},
	{
		id: "e4",
		source: "client-shell",
		target: "async2",
		style: { stroke: "#ef4444" },
	},
	{
		id: "e5",
		source: "async1",
		target: "chunk1",
		animated: true,
		label: "~1s",
		style: { stroke: "#f59e0b" },
	},
	{
		id: "e6",
		source: "async2",
		target: "chunk2",
		animated: true,
		label: "~3s",
		style: { stroke: "#f59e0b" },
	},
	{
		id: "e7",
		source: "chunk1",
		target: "interactive",
		animated: true,
		style: { stroke: "#22c55e" },
	},
	{
		id: "e8",
		source: "chunk2",
		target: "interactive",
		animated: true,
		style: { stroke: "#22c55e" },
	},
];

export function StreamingFlow() {
	return <FlowDiagram edges={edges} height="450px" className="sm:h-[700px]!" nodes={nodes} />;
}
