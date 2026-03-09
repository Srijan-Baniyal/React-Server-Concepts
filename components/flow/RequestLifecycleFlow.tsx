import type { Edge, Node } from "@xyflow/react";
import { FlowDiagram } from "./FlowWrapper";

const nodes: Node[] = [
	{
		id: "req",
		position: { x: 280, y: 0 },
		data: { label: "Incoming HTTP Request" },
		type: "input",
		style: {
			background: "#3b82f6",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			padding: "10px 20px",
		},
	},
	{
		id: "middleware",
		position: { x: 260, y: 90 },
		data: {
			label: "Middleware (Edge)\nAuth, A/B testing, geo redirects",
		},
		style: {
			background: "#8b5cf620",
			border: "1px solid #8b5cf660",
			borderRadius: 8,
			fontSize: 11,
			whiteSpace: "pre-line" as const,
			width: 240,
			textAlign: "center" as const,
		},
	},
	{
		id: "route",
		position: { x: 260, y: 190 },
		data: {
			label:
				"Route Resolution (App Router)\nMatch segments, find layout/page chain",
		},
		style: {
			background: "#06b6d420",
			border: "1px solid #06b6d460",
			borderRadius: 8,
			fontSize: 11,
			whiteSpace: "pre-line" as const,
			width: 280,
			textAlign: "center" as const,
		},
	},
	{
		id: "sc-tree",
		position: { x: 200, y: 300 },
		data: { label: "Server Component Tree Render" },
		style: {
			background: "#22c55e",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			width: 280,
			textAlign: "center" as const,
		},
	},
	{
		id: "root-layout",
		position: { x: 100, y: 390 },
		data: { label: "RootLayout (async)\ncheck cache" },
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 160,
		},
	},
	{
		id: "seg-layout",
		position: { x: 100, y: 475 },
		data: { label: "Segment Layout (async)\nscoped data" },
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 160,
		},
	},
	{
		id: "page",
		position: { x: 100, y: 560 },
		data: { label: "Page (async)\nmain data" },
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 160,
		},
	},
	{
		id: "suspense",
		position: { x: 310, y: 420 },
		data: { label: "<Suspense>\nfallback sent immediately" },
		style: {
			background: "#f59e0b20",
			border: "1px dashed #f59e0b80",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 180,
		},
	},
	{
		id: "slow",
		position: { x: 310, y: 510 },
		data: { label: "SlowComp\nstreams in later" },
		style: {
			background: "#ef444420",
			border: "1px solid #ef444460",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 150,
		},
	},
	{
		id: "fast",
		position: { x: 310, y: 590 },
		data: { label: "FastComp\nrenders immediately" },
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 150,
		},
	},
	{
		id: "cache-note",
		position: { x: 540, y: 450 },
		data: { label: "React.cache dedups\nidentical calls\nwithin this pass" },
		style: {
			background: "transparent",
			border: "1px dashed #a855f740",
			borderRadius: 8,
			fontSize: 9,
			color: "#a855f7",
			whiteSpace: "pre-line" as const,
			width: 130,
			textAlign: "center" as const,
		},
	},
	{
		id: "stream",
		position: { x: 200, y: 700 },
		data: {
			label:
				"① HTML shell (streamed)\n② RSC Flight payload (streamed)\n③ Suspense chunks (streamed)",
		},
		style: {
			background: "#f59e0b20",
			border: "1px dashed #f59e0b80",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 250,
			textAlign: "left" as const,
			padding: "8px 12px",
		},
	},
	{
		id: "browser",
		position: { x: 200, y: 820 },
		data: {
			label:
				"Browser\n1. Paint HTML shell\n2. Download CC JS\n3. Hydrate CC\n4. Stream Suspense",
		},
		type: "output",
		style: {
			background: "#3b82f6",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontSize: 11,
			whiteSpace: "pre-line" as const,
			width: 200,
			textAlign: "left" as const,
			padding: "10px 16px",
		},
	},
];

const edges: Edge[] = [
	{
		id: "e1",
		source: "req",
		target: "middleware",
		animated: true,
		style: { stroke: "#3b82f6" },
	},
	{
		id: "e2",
		source: "middleware",
		target: "route",
		label: "next()",
		style: { stroke: "#8b5cf6" },
	},
	{
		id: "e3",
		source: "route",
		target: "sc-tree",
		style: { stroke: "#06b6d4" },
	},
	{
		id: "e4",
		source: "sc-tree",
		target: "root-layout",
		style: { stroke: "#22c55e" },
	},
	{
		id: "e5",
		source: "root-layout",
		target: "seg-layout",
		style: { stroke: "#22c55e" },
	},
	{
		id: "e6",
		source: "seg-layout",
		target: "page",
		style: { stroke: "#22c55e" },
	},
	{
		id: "e7",
		source: "sc-tree",
		target: "suspense",
		style: { stroke: "#f59e0b" },
	},
	{
		id: "e8",
		source: "suspense",
		target: "slow",
		animated: true,
		label: "async",
		style: { stroke: "#ef4444" },
	},
	{
		id: "e9",
		source: "page",
		target: "fast",
		style: { stroke: "#22c55e" },
	},
	{
		id: "e10",
		source: "page",
		target: "stream",
		animated: true,
		style: { stroke: "#f59e0b" },
	},
	{
		id: "e11",
		source: "slow",
		target: "stream",
		animated: true,
		style: { stroke: "#ef4444" },
	},
	{
		id: "e12",
		source: "stream",
		target: "browser",
		animated: true,
		style: { stroke: "#3b82f6" },
	},
];

export function RequestLifecycleFlow() {
	return <FlowDiagram edges={edges} height="960px" nodes={nodes} />;
}
