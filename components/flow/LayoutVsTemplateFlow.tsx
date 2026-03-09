import type { Edge, Node } from "@xyflow/react";
import { FlowDiagram } from "./FlowWrapper";

const nodes: Node[] = [
	{
		id: "layout-title",
		position: { x: 20, y: 0 },
		data: { label: "layout.tsx — PERSISTENT" },
		style: {
			background: "#16a34a20",
			border: "2px solid #16a34a",
			borderRadius: 10,
			padding: 10,
			fontSize: 13,
			fontWeight: 600,
			width: 220,
			textAlign: "center" as const,
		},
	},
	{
		id: "l1",
		position: { x: 20, y: 70 },
		data: { label: "Created ONCE, never unmounted" },
		style: {
			background: "#16a34a15",
			border: "1px solid #16a34a",
			borderRadius: 8,
			padding: 8,
			fontSize: 11,
			width: 220,
			textAlign: "center" as const,
		},
	},
	{
		id: "l2",
		position: { x: 20, y: 130 },
		data: { label: "useState survives route changes" },
		style: {
			background: "#16a34a15",
			border: "1px solid #16a34a",
			borderRadius: 8,
			padding: 8,
			fontSize: 11,
			width: 220,
			textAlign: "center" as const,
		},
	},
	{
		id: "l3",
		position: { x: 20, y: 190 },
		data: { label: "Use for: navbars, sidebars, providers" },
		style: {
			background: "#16a34a10",
			border: "1px dashed #16a34a",
			borderRadius: 8,
			padding: 8,
			fontSize: 11,
			width: 220,
			textAlign: "center" as const,
		},
	},
	{
		id: "template-title",
		position: { x: 290, y: 0 },
		data: { label: "template.tsx — RE-MOUNTS" },
		style: {
			background: "#f59e0b20",
			border: "2px solid #f59e0b",
			borderRadius: 10,
			padding: 10,
			fontSize: 13,
			fontWeight: 600,
			width: 220,
			textAlign: "center" as const,
		},
	},
	{
		id: "t1",
		position: { x: 290, y: 70 },
		data: { label: "New instance on every navigation" },
		style: {
			background: "#f59e0b15",
			border: "1px solid #f59e0b",
			borderRadius: 8,
			padding: 8,
			fontSize: 11,
			width: 220,
			textAlign: "center" as const,
		},
	},
	{
		id: "t2",
		position: { x: 290, y: 130 },
		data: { label: "useState resets to initial value" },
		style: {
			background: "#f59e0b15",
			border: "1px solid #f59e0b",
			borderRadius: 8,
			padding: 8,
			fontSize: 11,
			width: 220,
			textAlign: "center" as const,
		},
	},
	{
		id: "t3",
		position: { x: 290, y: 190 },
		data: { label: "Use for: transitions, analytics, useEffect on nav" },
		style: {
			background: "#f59e0b10",
			border: "1px dashed #f59e0b",
			borderRadius: 8,
			padding: 8,
			fontSize: 11,
			width: 220,
			textAlign: "center" as const,
		},
	},
	{
		id: "shared",
		position: { x: 100, y: 270 },
		data: {
			label:
				"Both receive {children} and wrap the page.\nUse layout unless you specifically need the re-mount behaviour.",
		},
		style: {
			background: "#7c3aed10",
			border: "1px dashed #7c3aed",
			borderRadius: 8,
			padding: 10,
			fontSize: 11,
			width: 330,
			whiteSpace: "pre-wrap" as const,
			textAlign: "center" as const,
		},
	},
];

const edges: Edge[] = [
	{ id: "le1", source: "layout-title", target: "l1" },
	{ id: "le2", source: "l1", target: "l2" },
	{ id: "le3", source: "l2", target: "l3" },
	{ id: "te1", source: "template-title", target: "t1" },
	{ id: "te2", source: "t1", target: "t2" },
	{ id: "te3", source: "t2", target: "t3" },
	{
		id: "s1",
		source: "l3",
		target: "shared",
		style: { strokeDasharray: "5 5" },
	},
	{
		id: "s2",
		source: "t3",
		target: "shared",
		style: { strokeDasharray: "5 5" },
	},
];

export function LayoutVsTemplateFlow() {
	return <FlowDiagram edges={edges} fitView height={380} nodes={nodes} />;
}
