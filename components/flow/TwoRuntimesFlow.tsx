import type { Edge, Node } from "@xyflow/react";
import { FlowDiagram } from "./FlowWrapper";

const nodes: Node[] = [
	{
		id: "http",
		position: { x: 300, y: 0 },
		data: { label: "HTTP Request" },
		type: "input",
		style: {
			background: "#3b82f6",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			padding: "10px 24px",
		},
	},
	{
		id: "server",
		position: { x: 250, y: 100 },
		data: { label: "Next.js Server" },
		style: {
			background: "#22c55e",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			width: 200,
			textAlign: "center" as const,
		},
	},
	{
		id: "sc",
		position: { x: 215, y: 190 },
		data: {
			label:
				"Server Component\n• await db.query()\n• read secrets\n• fetch APIs",
		},
		style: {
			background: "#16a34a20",
			border: "1px solid #16a34a60",
			borderRadius: 8,
			fontSize: 11,
			whiteSpace: "pre-line" as const,
			width: 200,
			textAlign: "left" as const,
			padding: "8px 12px",
		},
	},
	{
		id: "flight",
		position: { x: 220, y: 340 },
		data: { label: "RSC Flight Payload (streamed)" },
		style: {
			background: "#f59e0b20",
			border: "1px dashed #f59e0b80",
			borderRadius: 8,
			fontSize: 11,
			fontStyle: "italic",
			width: 260,
			textAlign: "center" as const,
		},
	},
	{
		id: "browser",
		position: { x: 250, y: 440 },
		data: { label: "Browser" },
		style: {
			background: "#3b82f6",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			width: 200,
			textAlign: "center" as const,
		},
	},
	{
		id: "cc",
		position: { x: 215, y: 530 },
		data: {
			label: "Client Component\n• useState\n• useEffect\n• event handlers",
		},
		style: {
			background: "#3b82f620",
			border: "1px solid #3b82f660",
			borderRadius: 8,
			fontSize: 11,
			whiteSpace: "pre-line" as const,
			width: 200,
			textAlign: "left" as const,
			padding: "8px 12px",
		},
	},
	{
		id: "note-sc",
		position: { x: 480, y: 210 },
		data: { label: "← No JS bundle sent\n   Runs only here" },
		style: {
			background: "transparent",
			border: "none",
			fontSize: 10,
			color: "#16a34a",
			whiteSpace: "pre-line" as const,
		},
	},
	{
		id: "note-cc",
		position: { x: 480, y: 550 },
		data: { label: "← JS ships here\n   hydrated & live" },
		style: {
			background: "transparent",
			border: "none",
			fontSize: 10,
			color: "#3b82f6",
			whiteSpace: "pre-line" as const,
		},
	},
];

const edges: Edge[] = [
	{
		id: "e-http-server",
		source: "http",
		target: "server",
		animated: true,
		style: { stroke: "#3b82f6" },
	},
	{
		id: "e-server-sc",
		source: "server",
		target: "sc",
		style: { stroke: "#22c55e" },
	},
	{
		id: "e-sc-flight",
		source: "sc",
		target: "flight",
		animated: true,
		label: "render",
		style: { stroke: "#f59e0b" },
	},
	{
		id: "e-flight-browser",
		source: "flight",
		target: "browser",
		animated: true,
		style: { stroke: "#f59e0b" },
	},
	{
		id: "e-browser-cc",
		source: "browser",
		target: "cc",
		style: { stroke: "#3b82f6" },
	},
];

export function TwoRuntimesFlow() {
	return <FlowDiagram edges={edges} height="680px" nodes={nodes} />;
}
