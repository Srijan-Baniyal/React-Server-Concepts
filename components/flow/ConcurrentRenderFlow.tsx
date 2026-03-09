import type { Edge, Node } from "@xyflow/react";
import { FlowDiagram } from "./FlowWrapper";

const nodes: Node[] = [
	{
		id: "start",
		position: { x: 200, y: 0 },
		data: { label: "Start rendering Server Component tree" },
		style: {
			background: "#7c3aed20",
			border: "1px solid #7c3aed",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 260,
		},
	},
	{
		id: "non-suspended",
		position: { x: 200, y: 80 },
		data: { label: "① Render all non-suspended nodes immediately" },
		style: {
			background: "#16a34a20",
			border: "1px solid #16a34a",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 280,
		},
	},
	{
		id: "shell",
		position: { x: 200, y: 160 },
		data: { label: "t=1ms — Send HTML shell + Suspense placeholders" },
		style: {
			background: "#2563eb20",
			border: "1px solid #2563eb",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 300,
		},
	},
	{
		id: "suspended",
		position: { x: 200, y: 240 },
		data: {
			label:
				"② Async SC suspends (awaits data)\n→ Insert placeholder in Flight stream\n→ Continue rendering other branches",
		},
		style: {
			background: "#f59e0b20",
			border: "1px solid #f59e0b",
			borderRadius: 8,
			padding: 10,
			fontSize: 11,
			width: 300,
			whiteSpace: "pre-wrap",
		},
	},
	{
		id: "chunk1",
		position: { x: 60, y: 360 },
		data: { label: "t=50ms\nUserProfile resolves\n→ flush chunk 1" },
		style: {
			background: "#16a34a20",
			border: "1px solid #16a34a",
			borderRadius: 8,
			padding: 10,
			fontSize: 11,
			width: 180,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
	{
		id: "chunk2",
		position: { x: 260, y: 360 },
		data: { label: "t=80ms\nNotifications resolves\n→ flush chunk 2" },
		style: {
			background: "#16a34a20",
			border: "1px solid #16a34a",
			borderRadius: 8,
			padding: 10,
			fontSize: 11,
			width: 180,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
	{
		id: "chunk3",
		position: { x: 460, y: 360 },
		data: { label: "t=200ms\nFeed resolves\n→ flush chunk 3" },
		style: {
			background: "#f59e0b20",
			border: "1px solid #f59e0b",
			borderRadius: 8,
			padding: 10,
			fontSize: 11,
			width: 180,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
	{
		id: "close",
		position: { x: 200, y: 480 },
		data: { label: "④ Stream closes — all chunks flushed" },
		style: {
			background: "#2563eb20",
			border: "1px solid #2563eb",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 280,
		},
	},
	{
		id: "insight",
		position: { x: 120, y: 560 },
		data: {
			label:
				"Key: Server doesn't wait for the slowest component.\nEach node resolves independently and flushes as ready.",
		},
		style: {
			background: "#7c3aed10",
			border: "1px dashed #7c3aed",
			borderRadius: 8,
			padding: 10,
			fontSize: 11,
			width: 440,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
];

const edges: Edge[] = [
	{ id: "e1", source: "start", target: "non-suspended", animated: true },
	{ id: "e2", source: "non-suspended", target: "shell", animated: true },
	{ id: "e3", source: "shell", target: "suspended", animated: true },
	{ id: "e4a", source: "suspended", target: "chunk1", animated: true },
	{ id: "e4b", source: "suspended", target: "chunk2", animated: true },
	{ id: "e4c", source: "suspended", target: "chunk3", animated: true },
	{ id: "e5a", source: "chunk1", target: "close", animated: true },
	{ id: "e5b", source: "chunk2", target: "close", animated: true },
	{ id: "e5c", source: "chunk3", target: "close", animated: true },
	{
		id: "e6",
		source: "close",
		target: "insight",
		animated: true,
		style: { strokeDasharray: "5 5" },
	},
];

export function ConcurrentRenderFlow() {
	return <FlowDiagram edges={edges} fitView height={680} nodes={nodes} />;
}
