import type { Edge, Node } from "@xyflow/react";
import { FlowDiagram } from "./FlowWrapper";

const nodes: Node[] = [
	{
		id: "start",
		position: { x: 250, y: 0 },
		data: { label: "Need interactivity?\n(onClick / onChange / hooks)" },
		type: "input",
		style: {
			background: "#8b5cf6",
			color: "#fff",
			border: "none",
			borderRadius: 12,
			fontWeight: 600,
			fontSize: 12,
			whiteSpace: "pre-line" as const,
			width: 240,
			textAlign: "center" as const,
			padding: "12px 16px",
		},
	},
	{
		id: "yes-interactive",
		position: { x: 80, y: 130 },
		data: { label: "YES" },
		style: {
			background: "#3b82f6",
			color: "#fff",
			border: "none",
			borderRadius: 20,
			fontWeight: 700,
			fontSize: 12,
			width: 60,
			textAlign: "center" as const,
		},
	},
	{
		id: "no-interactive",
		position: { x: 500, y: 130 },
		data: { label: "NO" },
		style: {
			background: "#22c55e",
			color: "#fff",
			border: "none",
			borderRadius: 20,
			fontWeight: 700,
			fontSize: 12,
			width: 60,
			textAlign: "center" as const,
		},
	},
	{
		id: "need-server-data",
		position: { x: 20, y: 230 },
		data: { label: "Also needs server data?" },
		style: {
			background: "#3b82f620",
			border: "2px solid #3b82f660",
			borderRadius: 12,
			fontWeight: 600,
			fontSize: 12,
			width: 200,
			textAlign: "center" as const,
		},
	},
	{
		id: "fetch-or-secrets",
		position: { x: 430, y: 230 },
		data: { label: "Fetches data or\nreads secrets?" },
		style: {
			background: "#22c55e20",
			border: "2px solid #22c55e60",
			borderRadius: 12,
			fontWeight: 600,
			fontSize: 12,
			whiteSpace: "pre-line" as const,
			width: 180,
			textAlign: "center" as const,
		},
	},
	{
		id: "split",
		position: { x: -30, y: 350 },
		data: {
			label:
				"Split boundaries:\nServer Component fetches →\nClient Component leaf handles UI",
		},
		style: {
			background: "#f59e0b20",
			border: "1px solid #f59e0b80",
			borderRadius: 8,
			fontSize: 11,
			whiteSpace: "pre-line" as const,
			width: 230,
			textAlign: "center" as const,
			fontWeight: 500,
		},
	},
	{
		id: "pure-client",
		position: { x: 230, y: 350 },
		data: { label: 'Pure Client Component\n"use client"' },
		style: {
			background: "#3b82f620",
			border: "1px solid #3b82f680",
			borderRadius: 8,
			fontSize: 11,
			whiteSpace: "pre-line" as const,
			width: 180,
			textAlign: "center" as const,
			fontWeight: 500,
		},
	},
	{
		id: "async-sc",
		position: { x: 430, y: 350 },
		data: { label: "Async Server Component" },
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e80",
			borderRadius: 8,
			fontSize: 11,
			width: 180,
			textAlign: "center" as const,
			fontWeight: 500,
		},
	},
	{
		id: "static-sc",
		position: { x: 640, y: 350 },
		data: { label: "Static Server Component" },
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e80",
			borderRadius: 8,
			fontSize: 11,
			width: 180,
			textAlign: "center" as const,
			fontWeight: 500,
		},
	},
	{
		id: "golden-rule",
		position: { x: 200, y: 470 },
		data: {
			label:
				'🏆 Golden rule: push "use client" as FAR DOWN\nthe tree as possible → smaller bundle + colocated fetch',
		},
		type: "output",
		style: {
			background: "#f59e0b15",
			border: "2px dashed #f59e0b60",
			borderRadius: 12,
			fontSize: 11,
			whiteSpace: "pre-line" as const,
			width: 380,
			textAlign: "center" as const,
			fontWeight: 600,
			padding: "12px",
		},
	},
];

const edges: Edge[] = [
	{
		id: "e1",
		source: "start",
		target: "yes-interactive",
		label: "YES",
		style: { stroke: "#3b82f6" },
	},
	{
		id: "e2",
		source: "start",
		target: "no-interactive",
		label: "NO",
		style: { stroke: "#22c55e" },
	},
	{
		id: "e3",
		source: "yes-interactive",
		target: "need-server-data",
		style: { stroke: "#3b82f6" },
	},
	{
		id: "e4",
		source: "no-interactive",
		target: "fetch-or-secrets",
		style: { stroke: "#22c55e" },
	},
	{
		id: "e5",
		source: "need-server-data",
		target: "split",
		label: "YES",
		style: { stroke: "#f59e0b" },
	},
	{
		id: "e6",
		source: "need-server-data",
		target: "pure-client",
		label: "NO",
		style: { stroke: "#3b82f6" },
	},
	{
		id: "e7",
		source: "fetch-or-secrets",
		target: "async-sc",
		label: "YES",
		style: { stroke: "#22c55e" },
	},
	{
		id: "e8",
		source: "fetch-or-secrets",
		target: "static-sc",
		label: "NO",
		style: { stroke: "#22c55e" },
	},
];

export function DecisionFlow() {
	return <FlowDiagram edges={edges} height="560px" nodes={nodes} />;
}
