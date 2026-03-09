import type { Edge, Node } from "@xyflow/react";
import { FlowDiagram } from "./FlowWrapper";

/* ── Hard Navigation (Initial Load) ── */
const hardNodes: Node[] = [
	{
		id: "h1",
		position: { x: 150, y: 0 },
		data: { label: "① Middleware runs (Edge)" },
		style: {
			background: "#7c3aed20",
			border: "1px solid #7c3aed",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 240,
		},
	},
	{
		id: "h2",
		position: { x: 150, y: 70 },
		data: { label: "② Route matched, segment files loaded" },
		style: {
			background: "#7c3aed20",
			border: "1px solid #7c3aed",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 240,
		},
	},
	{
		id: "h3",
		position: { x: 150, y: 140 },
		data: { label: "③ Server Component tree renders" },
		style: {
			background: "#16a34a20",
			border: "1px solid #16a34a",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 240,
		},
	},
	{
		id: "h4",
		position: { x: 150, y: 210 },
		data: { label: "④ HTML + Flight payload streamed" },
		style: {
			background: "#16a34a20",
			border: "1px solid #16a34a",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 240,
		},
	},
	{
		id: "h5",
		position: { x: 150, y: 280 },
		data: { label: "⑤ Browser paints HTML immediately" },
		style: {
			background: "#2563eb20",
			border: "1px solid #2563eb",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 240,
		},
	},
	{
		id: "h6",
		position: { x: 150, y: 350 },
		data: { label: "⑥ React hydrates with Flight payload" },
		style: {
			background: "#2563eb20",
			border: "1px solid #2563eb",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 240,
		},
	},
	{
		id: "h7",
		position: { x: 150, y: 420 },
		data: { label: "⑦ Suspense chunks arrive & swap in" },
		style: {
			background: "#2563eb20",
			border: "1px solid #2563eb",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 240,
		},
	},
	{
		id: "h-result",
		position: { x: 80, y: 500 },
		data: {
			label:
				"✓ Full HTML for SEO\n✓ Fast LCP (no JS to paint)\n✓ Flight is source of truth",
		},
		style: {
			background: "#16a34a15",
			border: "1px dashed #16a34a",
			borderRadius: 8,
			padding: 10,
			fontSize: 11,
			width: 380,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
];

const hardEdges: Edge[] = [
	{ id: "h-e1", source: "h1", target: "h2", animated: true },
	{ id: "h-e2", source: "h2", target: "h3", animated: true },
	{ id: "h-e3", source: "h3", target: "h4", animated: true },
	{ id: "h-e4", source: "h4", target: "h5", animated: true },
	{ id: "h-e5", source: "h5", target: "h6", animated: true },
	{ id: "h-e6", source: "h6", target: "h7", animated: true },
	{
		id: "h-e7",
		source: "h7",
		target: "h-result",
		animated: true,
		style: { strokeDasharray: "5 5" },
	},
];

/* ── Soft Navigation (Client-side) ── */
const softNodes: Node[] = [
	{
		id: "s1",
		position: { x: 150, y: 0 },
		data: { label: "① <Link> prefetches RSC payload on hover" },
		style: {
			background: "#f59e0b20",
			border: "1px solid #f59e0b",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 260,
		},
	},
	{
		id: "s2",
		position: { x: 150, y: 70 },
		data: { label: "② User clicks → router intercepts" },
		style: {
			background: "#f59e0b20",
			border: "1px solid #f59e0b",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 260,
		},
	},
	{
		id: "s3",
		position: { x: 150, y: 140 },
		data: { label: "③ GET /?_rsc=<hash> → pure Flight payload" },
		style: {
			background: "#2563eb20",
			border: "1px solid #2563eb",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 260,
		},
	},
	{
		id: "s4",
		position: { x: 150, y: 210 },
		data: { label: "④ Only CHANGED segments re-render" },
		style: {
			background: "#2563eb20",
			border: "1px solid #2563eb",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 260,
		},
	},
	{
		id: "s5",
		position: { x: 150, y: 280 },
		data: { label: "⑤ Unchanged layouts stay mounted" },
		style: {
			background: "#16a34a20",
			border: "1px solid #16a34a",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 260,
		},
	},
	{
		id: "s6",
		position: { x: 150, y: 350 },
		data: { label: "⑥ Client state preserved (scroll, modals)" },
		style: {
			background: "#16a34a20",
			border: "1px solid #16a34a",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 260,
		},
	},
	{
		id: "s-cache",
		position: { x: 100, y: 430 },
		data: {
			label:
				"Router Cache:\n  Static: 5 min  |  Dynamic: 30 sec\n  router.refresh() clears it",
		},
		style: {
			background: "#f59e0b15",
			border: "1px dashed #f59e0b",
			borderRadius: 8,
			padding: 10,
			fontSize: 11,
			width: 360,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
	{
		id: "s-result",
		position: { x: 130, y: 520 },
		data: { label: "✓ Sub-100ms transitions  ✓ No full page reload" },
		style: {
			background: "#16a34a15",
			border: "1px dashed #16a34a",
			borderRadius: 8,
			padding: 10,
			fontSize: 11,
			width: 300,
			textAlign: "center",
		},
	},
];

const softEdges: Edge[] = [
	{ id: "s-e1", source: "s1", target: "s2", animated: true },
	{ id: "s-e2", source: "s2", target: "s3", animated: true },
	{ id: "s-e3", source: "s3", target: "s4", animated: true },
	{ id: "s-e4", source: "s4", target: "s5", animated: true },
	{ id: "s-e5", source: "s5", target: "s6", animated: true },
	{
		id: "s-e6",
		source: "s6",
		target: "s-cache",
		animated: true,
		style: { strokeDasharray: "5 5" },
	},
	{
		id: "s-e7",
		source: "s-cache",
		target: "s-result",
		animated: true,
		style: { strokeDasharray: "5 5" },
	},
];

export function NavigationFlows() {
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<div>
				<h3 className="mb-2 font-medium text-sm">
					🌐 Hard Navigation (Initial Load)
				</h3>
				<FlowDiagram edges={hardEdges} fitView height={620} nodes={hardNodes} />
			</div>
			<div>
				<h3 className="mb-2 font-medium text-sm">
					⚡ Soft Navigation (Client-side)
				</h3>
				<FlowDiagram edges={softEdges} fitView height={620} nodes={softNodes} />
			</div>
		</div>
	);
}
