import type { Edge, Node } from "@xyflow/react";
import { FlowDiagram } from "./FlowWrapper";

/* ── Traditional SPA / CSR ── */
const spaNodes: Node[] = [
	{
		id: "browser",
		position: { x: 140, y: 0 },
		data: { label: "Browser" },
		style: {
			background: "#ef444420",
			border: "2px solid #ef4444",
			borderRadius: 10,
			padding: 10,
			fontSize: 13,
			fontWeight: 600,
			width: 200,
			textAlign: "center" as const,
		},
	},
	{
		id: "download",
		position: { x: 140, y: 75 },
		data: { label: "Download full JS bundle (MB+)" },
		style: {
			background: "#ef444415",
			border: "1px solid #ef4444",
			borderRadius: 8,
			padding: 8,
			fontSize: 11,
			width: 200,
			textAlign: "center" as const,
		},
	},
	{
		id: "execute",
		position: { x: 140, y: 140 },
		data: { label: "Execute React runtime" },
		style: {
			background: "#ef444415",
			border: "1px solid #ef4444",
			borderRadius: 8,
			padding: 8,
			fontSize: 11,
			width: 200,
			textAlign: "center" as const,
		},
	},
	{
		id: "fetch",
		position: { x: 140, y: 205 },
		data: { label: "Fetch data (client-side)" },
		style: {
			background: "#ef444415",
			border: "1px solid #ef4444",
			borderRadius: 8,
			padding: 8,
			fontSize: 11,
			width: 200,
			textAlign: "center" as const,
		},
	},
	{
		id: "render",
		position: { x: 140, y: 270 },
		data: { label: "Render UI" },
		style: {
			background: "#ef444415",
			border: "1px solid #ef4444",
			borderRadius: 8,
			padding: 8,
			fontSize: 11,
			width: 200,
			textAlign: "center" as const,
		},
	},
	{
		id: "problems",
		position: { x: 60, y: 350 },
		data: {
			label:
				"✗ Large JS bundle slows TTI\n✗ Secrets leaked (API keys)\n✗ Request waterfalls on load\n✗ No direct DB / FS access\n✗ Empty HTML (bad SEO / LCP)",
		},
		style: {
			background: "#ef444410",
			border: "1px dashed #ef4444",
			borderRadius: 8,
			padding: 10,
			fontSize: 11,
			width: 360,
			whiteSpace: "pre-wrap" as const,
			textAlign: "left" as const,
			lineHeight: "1.6",
		},
	},
];

const spaEdges: Edge[] = [
	{ id: "se1", source: "browser", target: "download" },
	{ id: "se2", source: "download", target: "execute" },
	{ id: "se3", source: "execute", target: "fetch" },
	{ id: "se4", source: "fetch", target: "render" },
	{
		id: "se5",
		source: "render",
		target: "problems",
		style: { strokeDasharray: "5 5" },
	},
];

/* ── React Server Components ── */
const rscNodes: Node[] = [
	{
		id: "server",
		position: { x: 40, y: 0 },
		data: { label: "Server" },
		style: {
			background: "#16a34a20",
			border: "2px solid #16a34a",
			borderRadius: 10,
			padding: 10,
			fontSize: 13,
			fontWeight: 600,
			width: 170,
			textAlign: "center" as const,
		},
	},
	{
		id: "rsc-run",
		position: { x: 40, y: 75 },
		data: { label: "Run Server Components" },
		style: {
			background: "#16a34a15",
			border: "1px solid #16a34a",
			borderRadius: 8,
			padding: 8,
			fontSize: 11,
			width: 170,
			textAlign: "center" as const,
		},
	},
	{
		id: "rsc-db",
		position: { x: 40, y: 140 },
		data: { label: "Direct DB / FS access" },
		style: {
			background: "#16a34a15",
			border: "1px solid #16a34a",
			borderRadius: 8,
			padding: 8,
			fontSize: 11,
			width: 170,
			textAlign: "center" as const,
		},
	},
	{
		id: "rsc-flight",
		position: { x: 40, y: 205 },
		data: { label: "Render → Flight stream" },
		style: {
			background: "#16a34a15",
			border: "1px solid #16a34a",
			borderRadius: 8,
			padding: 8,
			fontSize: 11,
			width: 170,
			textAlign: "center" as const,
		},
	},
	{
		id: "client",
		position: { x: 280, y: 0 },
		data: { label: "Browser" },
		style: {
			background: "#2563eb20",
			border: "2px solid #2563eb",
			borderRadius: 10,
			padding: 10,
			fontSize: 13,
			fontWeight: 600,
			width: 170,
			textAlign: "center" as const,
		},
	},
	{
		id: "rsc-receive",
		position: { x: 280, y: 75 },
		data: { label: "Receive RSC payload" },
		style: {
			background: "#2563eb15",
			border: "1px solid #2563eb",
			borderRadius: 8,
			padding: 8,
			fontSize: 11,
			width: 170,
			textAlign: "center" as const,
		},
	},
	{
		id: "rsc-hydrate",
		position: { x: 280, y: 140 },
		data: { label: "Hydrate Client Components only" },
		style: {
			background: "#2563eb15",
			border: "1px solid #2563eb",
			borderRadius: 8,
			padding: 8,
			fontSize: 11,
			width: 170,
			textAlign: "center" as const,
		},
	},
	{
		id: "rsc-interact",
		position: { x: 280, y: 205 },
		data: { label: "Interact ⚡" },
		style: {
			background: "#2563eb15",
			border: "1px solid #2563eb",
			borderRadius: 8,
			padding: 8,
			fontSize: 11,
			width: 170,
			textAlign: "center" as const,
		},
	},
	{
		id: "benefits",
		position: { x: 60, y: 290 },
		data: {
			label:
				"✓ Zero JS for server-only components\n✓ Secrets never leave the server\n✓ No client-side data waterfalls\n✓ Full HTML for SEO & fast LCP\n✓ Direct DB / file system access",
		},
		style: {
			background: "#16a34a10",
			border: "1px dashed #16a34a",
			borderRadius: 8,
			padding: 10,
			fontSize: 11,
			width: 360,
			whiteSpace: "pre-wrap" as const,
			textAlign: "left" as const,
			lineHeight: "1.6",
		},
	},
];

const rscEdges: Edge[] = [
	{ id: "re1", source: "server", target: "rsc-run" },
	{ id: "re2", source: "rsc-run", target: "rsc-db" },
	{ id: "re3", source: "rsc-db", target: "rsc-flight" },
	{
		id: "re4",
		source: "rsc-flight",
		target: "rsc-receive",
		animated: true,
		label: "stream",
		style: { stroke: "#16a34a" },
	},
	{ id: "re5", source: "client", target: "rsc-receive" },
	{ id: "re6", source: "rsc-receive", target: "rsc-hydrate" },
	{ id: "re7", source: "rsc-hydrate", target: "rsc-interact" },
	{
		id: "re8",
		source: "rsc-interact",
		target: "benefits",
		style: { strokeDasharray: "5 5" },
	},
];

export function SPAvsRSCFlow() {
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<div>
				<FlowDiagram edges={spaEdges} fitView height={520} nodes={spaNodes} />
			</div>
			<div>
				<FlowDiagram edges={rscEdges} fitView height={520} nodes={rscNodes} />
			</div>
		</div>
	);
}
