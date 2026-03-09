import type { Edge, Node } from "@xyflow/react";
import { FlowDiagram } from "./FlowWrapper";

const nodes: Node[] = [
	{
		id: "app",
		position: { x: 250, y: 0 },
		data: { label: "Your Next.js 15 App" },
		type: "input",
		style: {
			background: "#8b5cf6",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 700,
			fontSize: 13,
			padding: "10px 24px",
		},
	},
	// Server Runtime branch
	{
		id: "server-rt",
		position: { x: 30, y: 100 },
		data: { label: "Server Runtime\n(Node.js / Edge)" },
		style: {
			background: "#22c55e",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			fontSize: 11,
			whiteSpace: "pre-line" as const,
			width: 160,
			textAlign: "center" as const,
		},
	},
	{
		id: "sc",
		position: { x: -20, y: 200 },
		data: { label: "Server Components\nzero bundle, direct DB, async/await" },
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 200,
			textAlign: "center" as const,
		},
	},
	{
		id: "sa",
		position: { x: -20, y: 290 },
		data: { label: "Server Actions\nmutations as typed functions" },
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 200,
			textAlign: "center" as const,
		},
	},
	{
		id: "caching",
		position: { x: -20, y: 375 },
		data: { label: "Caching\nRequest Memo → Data Cache → Full Route" },
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 210,
			textAlign: "center" as const,
		},
	},
	{
		id: "flight",
		position: { x: -20, y: 460 },
		data: { label: "RSC Flight\ncompact serialisation, streamed" },
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 200,
			textAlign: "center" as const,
		},
	},
	// Network Boundary
	{
		id: "boundary",
		position: { x: 230, y: 100 },
		data: { label: "Network Boundary" },
		style: {
			background: "#f59e0b",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			fontSize: 11,
			width: 160,
			textAlign: "center" as const,
		},
	},
	{
		id: "serial",
		position: { x: 220, y: 200 },
		data: {
			label: "Serialisation\nonly JSON-safe values &\nServer Actions cross",
		},
		style: {
			background: "#f59e0b20",
			border: "1px solid #f59e0b60",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 170,
			textAlign: "center" as const,
		},
	},
	{
		id: "directives",
		position: { x: 220, y: 310 },
		data: {
			label: '"use client" / "use server"\ndirectives mark the boundary',
		},
		style: {
			background: "#f59e0b20",
			border: "1px solid #f59e0b60",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 180,
			textAlign: "center" as const,
		},
	},
	// Browser Runtime
	{
		id: "browser-rt",
		position: { x: 450, y: 100 },
		data: { label: "Browser Runtime" },
		style: {
			background: "#3b82f6",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			fontSize: 11,
			width: 160,
			textAlign: "center" as const,
		},
	},
	{
		id: "cc",
		position: { x: 430, y: 200 },
		data: { label: "Client Components\nJS bundle, hooks, events, APIs" },
		style: {
			background: "#3b82f620",
			border: "1px solid #3b82f660",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 200,
			textAlign: "center" as const,
		},
	},
	{
		id: "hydration",
		position: { x: 430, y: 290 },
		data: { label: "Selective Hydration\nconcurrent, priority order" },
		style: {
			background: "#3b82f620",
			border: "1px solid #3b82f660",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 200,
			textAlign: "center" as const,
		},
	},
	{
		id: "router-cache",
		position: { x: 430, y: 375 },
		data: { label: "Router Cache\nFlight payload cache (30s / 5min)" },
		style: {
			background: "#3b82f620",
			border: "1px solid #3b82f660",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 200,
			textAlign: "center" as const,
		},
	},
	{
		id: "streaming",
		position: { x: 430, y: 460 },
		data: { label: "Streaming\nSuspense replaces skeletons" },
		style: {
			background: "#3b82f620",
			border: "1px solid #3b82f660",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 200,
			textAlign: "center" as const,
		},
	},
	// Result
	{
		id: "result",
		position: { x: 150, y: 570 },
		data: {
			label:
				"✓ Minimal JS  ✓ Fast TTFB  ✓ Fast TTI\n✓ Excellent CWV  ✓ Colocated data fetching",
		},
		type: "output",
		style: {
			background: "#22c55e15",
			border: "2px dashed #22c55e50",
			borderRadius: 12,
			fontSize: 11,
			fontWeight: 600,
			whiteSpace: "pre-line" as const,
			width: 340,
			textAlign: "center" as const,
			padding: "12px",
		},
	},
];

const edges: Edge[] = [
	{
		id: "e1",
		source: "app",
		target: "server-rt",
		style: { stroke: "#22c55e" },
	},
	{
		id: "e2",
		source: "app",
		target: "boundary",
		style: { stroke: "#f59e0b" },
	},
	{
		id: "e3",
		source: "app",
		target: "browser-rt",
		style: { stroke: "#3b82f6" },
	},
	{
		id: "e4",
		source: "server-rt",
		target: "sc",
		style: { stroke: "#22c55e" },
	},
	{
		id: "e5",
		source: "sc",
		target: "sa",
		style: { stroke: "#22c55e" },
	},
	{
		id: "e6",
		source: "sa",
		target: "caching",
		style: { stroke: "#22c55e" },
	},
	{
		id: "e7",
		source: "caching",
		target: "flight",
		style: { stroke: "#22c55e" },
	},
	{
		id: "e8",
		source: "boundary",
		target: "serial",
		style: { stroke: "#f59e0b" },
	},
	{
		id: "e9",
		source: "serial",
		target: "directives",
		style: { stroke: "#f59e0b" },
	},
	{
		id: "e10",
		source: "browser-rt",
		target: "cc",
		style: { stroke: "#3b82f6" },
	},
	{
		id: "e11",
		source: "cc",
		target: "hydration",
		style: { stroke: "#3b82f6" },
	},
	{
		id: "e12",
		source: "hydration",
		target: "router-cache",
		style: { stroke: "#3b82f6" },
	},
	{
		id: "e13",
		source: "router-cache",
		target: "streaming",
		style: { stroke: "#3b82f6" },
	},
];

export function BigPictureFlow() {
	return <FlowDiagram edges={edges} height="680px" nodes={nodes} />;
}
