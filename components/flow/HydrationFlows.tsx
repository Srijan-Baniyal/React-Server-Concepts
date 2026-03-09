import type { Edge, Node } from "@xyflow/react";
import { FlowDiagram } from "./FlowWrapper";

/* ── Classic Hydration (React 17) ── */
const classicNodes: Node[] = [
	{
		id: "c1",
		position: { x: 80, y: 0 },
		data: { label: "Wait for ALL JS to download" },
		type: "input",
		style: {
			background: "#eab30820",
			border: "1px solid #eab30860",
			borderRadius: 8,
			fontSize: 10,
			width: 200,
			textAlign: "center" as const,
		},
	},
	{
		id: "c2",
		position: { x: 80, y: 70 },
		data: { label: "React initialises" },
		style: {
			background: "#eab30820",
			border: "1px solid #eab30860",
			borderRadius: 8,
			fontSize: 10,
			width: 200,
			textAlign: "center" as const,
		},
	},
	{
		id: "c3",
		position: { x: 80, y: 140 },
		data: { label: "Walk ENTIRE tree from root" },
		style: {
			background: "#eab30820",
			border: "1px solid #eab30860",
			borderRadius: 8,
			fontSize: 10,
			width: 200,
			textAlign: "center" as const,
		},
	},
	{
		id: "c4",
		position: { x: 80, y: 210 },
		data: { label: "Attach ALL event listeners" },
		style: {
			background: "#eab30820",
			border: "1px solid #eab30860",
			borderRadius: 8,
			fontSize: 10,
			width: 200,
			textAlign: "center" as const,
		},
	},
	{
		id: "c5",
		position: { x: 80, y: 290 },
		data: { label: "Page interactive\n✗ All-or-nothing" },
		type: "output",
		style: {
			background: "#ef444415",
			border: "2px dashed #ef444450",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 200,
			textAlign: "center" as const,
			fontWeight: 500,
		},
	},
];

const classicEdges: Edge[] = [
	{ id: "ce1", source: "c1", target: "c2", style: { stroke: "#eab308" } },
	{ id: "ce2", source: "c2", target: "c3", style: { stroke: "#eab308" } },
	{ id: "ce3", source: "c3", target: "c4", style: { stroke: "#eab308" } },
	{ id: "ce4", source: "c4", target: "c5", style: { stroke: "#ef4444" } },
];

/* ── Selective Hydration (React 18 + RSC) ── */
const selectiveNodes: Node[] = [
	{
		id: "s1",
		position: { x: 80, y: 0 },
		data: { label: "HTML shell painted immediately" },
		type: "input",
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 8,
			fontSize: 10,
			width: 210,
			textAlign: "center" as const,
		},
	},
	{
		id: "s2",
		position: { x: 80, y: 70 },
		data: { label: "Each Suspense = isolated unit" },
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 8,
			fontSize: 10,
			width: 210,
			textAlign: "center" as const,
		},
	},
	{
		id: "s3",
		position: { x: 80, y: 140 },
		data: { label: "Hydrate boundaries as\nJS + Flight arrives" },
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
		id: "s4",
		position: { x: 80, y: 220 },
		data: { label: "User click → priority hydration" },
		style: {
			background: "#3b82f620",
			border: "1px solid #3b82f660",
			borderRadius: 8,
			fontSize: 10,
			width: 210,
			textAlign: "center" as const,
			fontWeight: 600,
		},
	},
	{
		id: "s5",
		position: { x: 80, y: 300 },
		data: { label: "Interactive ASAP\n✓ No hydration waterfall" },
		type: "output",
		style: {
			background: "#22c55e15",
			border: "2px dashed #22c55e50",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 210,
			textAlign: "center" as const,
			fontWeight: 500,
		},
	},
];

const selectiveEdges: Edge[] = [
	{
		id: "se1",
		source: "s1",
		target: "s2",
		animated: true,
		style: { stroke: "#22c55e" },
	},
	{
		id: "se2",
		source: "s2",
		target: "s3",
		animated: true,
		style: { stroke: "#22c55e" },
	},
	{
		id: "se3",
		source: "s3",
		target: "s4",
		animated: true,
		style: { stroke: "#3b82f6" },
	},
	{
		id: "se4",
		source: "s4",
		target: "s5",
		animated: true,
		style: { stroke: "#22c55e" },
	},
];

export function HydrationComparisonFlow() {
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<div className="space-y-2">
				<p className="text-center font-semibold text-sm text-yellow-600">
					Classic Hydration (React 17)
				</p>
				<FlowDiagram edges={classicEdges} height="400px" nodes={classicNodes} />
			</div>
			<div className="space-y-2">
				<p className="text-center font-semibold text-green-600 text-sm">
					Selective Hydration (React 18 + RSC)
				</p>
				<FlowDiagram
					edges={selectiveEdges}
					height="400px"
					nodes={selectiveNodes}
				/>
			</div>
		</div>
	);
}

/* ── RSC Hydration (Flight-based) ── */
const rscNodes: Node[] = [
	{
		id: "r-server",
		position: { x: 200, y: 0 },
		data: { label: "Server" },
		type: "input",
		style: {
			background: "#22c55e",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			fontSize: 12,
			width: 120,
			textAlign: "center" as const,
		},
	},
	{
		id: "r-html",
		position: { x: 80, y: 80 },
		data: { label: "HTML string" },
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 8,
			fontSize: 11,
			width: 120,
			textAlign: "center" as const,
		},
	},
	{
		id: "r-flight",
		position: { x: 280, y: 80 },
		data: { label: "RSC Flight Payload\n(inline script tags)" },
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
		id: "r-client",
		position: { x: 200, y: 180 },
		data: { label: "Browser" },
		style: {
			background: "#3b82f6",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			fontSize: 12,
			width: 120,
			textAlign: "center" as const,
		},
	},
	{
		id: "r-reconcile",
		position: { x: 140, y: 270 },
		data: { label: "React uses FLIGHT to reconcile\n(not re-rendering SCs)" },
		style: {
			background: "#f59e0b20",
			border: "1px solid #f59e0b60",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 230,
			textAlign: "center" as const,
			fontWeight: 500,
		},
	},
	{
		id: "r-sc-frozen",
		position: { x: 50, y: 370 },
		data: {
			label: "Server Component nodes\n= frozen HTML islands\n(no JS needed)",
		},
		style: {
			background: "#22c55e15",
			border: "1px solid #22c55e50",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 170,
			textAlign: "center" as const,
		},
	},
	{
		id: "r-cc-live",
		position: { x: 290, y: 370 },
		data: {
			label:
				"Client Component nodes\n= live islands\n(hydrate + event listeners)",
		},
		type: "output",
		style: {
			background: "#3b82f615",
			border: "1px solid #3b82f650",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 170,
			textAlign: "center" as const,
		},
	},
];

const rscEdges: Edge[] = [
	{
		id: "re1",
		source: "r-server",
		target: "r-html",
		style: { stroke: "#22c55e" },
	},
	{
		id: "re2",
		source: "r-server",
		target: "r-flight",
		animated: true,
		style: { stroke: "#f59e0b" },
	},
	{
		id: "re3",
		source: "r-html",
		target: "r-client",
		style: { stroke: "#3b82f6" },
	},
	{
		id: "re4",
		source: "r-flight",
		target: "r-client",
		animated: true,
		style: { stroke: "#f59e0b" },
	},
	{
		id: "re5",
		source: "r-client",
		target: "r-reconcile",
		style: { stroke: "#f59e0b" },
	},
	{
		id: "re6",
		source: "r-reconcile",
		target: "r-sc-frozen",
		style: { stroke: "#22c55e" },
	},
	{
		id: "re7",
		source: "r-reconcile",
		target: "r-cc-live",
		style: { stroke: "#3b82f6" },
	},
];

export function RSCHydrationFlow() {
	return <FlowDiagram edges={rscEdges} height="480px" nodes={rscNodes} />;
}
