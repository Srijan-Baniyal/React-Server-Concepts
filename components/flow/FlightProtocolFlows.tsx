import type { Edge, Node } from "@xyflow/react";
import { FlowDiagram } from "./FlowWrapper";

const wireNodes: Node[] = [
	{
		id: "server",
		position: { x: 220, y: 0 },
		data: { label: "SERVER RENDER" },
		type: "input",
		style: {
			background: "#22c55e",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 700,
			fontSize: 13,
			padding: "10px 28px",
		},
	},
	{
		id: "chunk0",
		position: { x: 150, y: 90 },
		data: {
			label:
				'Chunk 0 — Virtual DOM\n["$","div",null,{...}]\nServer Component output\nserialized as vDOM tree',
		},
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 240,
			textAlign: "center" as const,
			padding: "10px 14px",
		},
	},
	{
		id: "lazy-ref",
		position: { x: 20, y: 230 },
		data: {
			label:
				'"$L1" — Lazy Reference\nDeferred pointer to Client\nComponent chunk',
		},
		style: {
			background: "#3b82f620",
			border: "1px solid #3b82f660",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 200,
			textAlign: "center" as const,
			padding: "10px 14px",
		},
	},
	{
		id: "chunk1",
		position: { x: 300, y: 230 },
		data: {
			label:
				'Chunk 1 — Module Import\n1:I["(app-client)/UserCard.tsx",\n  ["chunks/UserCard-abc.js"],\n  "UserCard"]',
		},
		style: {
			background: "#8b5cf620",
			border: "1px solid #8b5cf660",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 250,
			textAlign: "center" as const,
			padding: "10px 14px",
		},
	},
	{
		id: "suspense-slot",
		position: { x: 20, y: 380 },
		data: {
			label:
				'"$S2" — Suspense Slot\nPlaceholder for deferred\ncontent boundary',
		},
		style: {
			background: "#f59e0b20",
			border: "1px dashed #f59e0b80",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 200,
			textAlign: "center" as const,
			padding: "10px 14px",
		},
	},
	{
		id: "chunk2",
		position: { x: 300, y: 380 },
		data: {
			label:
				"Chunk 2 — Resolved Slot\nStreams in when async data\nresolves on server",
		},
		style: {
			background: "#f59e0b20",
			border: "1px solid #f59e0b80",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 210,
			textAlign: "center" as const,
			padding: "10px 14px",
		},
	},
	{
		id: "client",
		position: { x: 170, y: 520 },
		data: {
			label: "REACT CLIENT RUNTIME\nProgressively merges chunks into live tree",
		},
		type: "output",
		style: {
			background: "#3b82f6",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			fontSize: 11,
			whiteSpace: "pre-line" as const,
			width: 260,
			textAlign: "center" as const,
			padding: "12px 16px",
		},
	},
];

const wireEdges: Edge[] = [
	{
		id: "w-e1",
		source: "server",
		target: "chunk0",
		animated: true,
		label: "stream",
		style: { stroke: "#22c55e" },
	},
	{
		id: "w-e2",
		source: "chunk0",
		target: "lazy-ref",
		label: "contains $L1",
		style: { stroke: "#3b82f6" },
	},
	{
		id: "w-e3",
		source: "chunk0",
		target: "chunk1",
		label: "references",
		style: { stroke: "#8b5cf6" },
	},
	{
		id: "w-e4",
		source: "lazy-ref",
		target: "chunk1",
		animated: true,
		label: "resolves to",
		style: { stroke: "#8b5cf6" },
	},
	{
		id: "w-e5",
		source: "chunk0",
		target: "suspense-slot",
		label: "contains $S2",
		style: { stroke: "#f59e0b" },
	},
	{
		id: "w-e6",
		source: "suspense-slot",
		target: "chunk2",
		animated: true,
		label: "filled by",
		style: { stroke: "#f59e0b" },
	},
	{
		id: "w-e7",
		source: "chunk1",
		target: "client",
		animated: true,
		style: { stroke: "#3b82f6" },
	},
	{
		id: "w-e8",
		source: "chunk2",
		target: "client",
		animated: true,
		style: { stroke: "#f59e0b" },
	},
	{
		id: "w-e9",
		source: "lazy-ref",
		target: "client",
		animated: true,
		style: { stroke: "#3b82f6" },
	},
];

export function WireFormatFlow() {
	return <FlowDiagram edges={wireEdges} height="640px" nodes={wireNodes} />;
}

/* ─────────────────────────────────────────────
   2. Flight Streaming Mechanics Flow
   Shows how Suspense boundaries become deferred
   slots and get swapped in progressively
   ───────────────────────────────────────────── */

const streamNodes: Node[] = [
	{
		id: "page",
		position: { x: 220, y: 0 },
		data: { label: "SERVER: Render Page()" },
		type: "input",
		style: {
			background: "#22c55e",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 700,
			fontSize: 13,
			padding: "10px 28px",
		},
	},
	{
		id: "header",
		position: { x: 60, y: 100 },
		data: { label: "<Header />\nReady immediately ⚡" },
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
		id: "suspense",
		position: { x: 310, y: 100 },
		data: { label: "<Suspense>\nfallback={<Skeleton />}" },
		style: {
			background: "#f59e0b20",
			border: "1px dashed #f59e0b80",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 180,
			textAlign: "center" as const,
		},
	},
	{
		id: "flight-chunk0",
		position: { x: 60, y: 210 },
		data: {
			label:
				"Flight Chunk 0 — immediate\nShell with <Header /> rendered\n+ $S1 Suspense placeholder",
		},
		style: {
			background: "#06b6d420",
			border: "1px solid #06b6d460",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 230,
			textAlign: "center" as const,
			padding: "10px 12px",
		},
	},
	{
		id: "slow-feed",
		position: { x: 340, y: 210 },
		data: { label: "<SlowFeed />\nawait fetch(...)  ⏳" },
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
		id: "client-shell",
		position: { x: 60, y: 340 },
		data: {
			label:
				"CLIENT: Renders shell\n<Header /> visible\n<Skeleton /> in Suspense slot",
		},
		style: {
			background: "#3b82f620",
			border: "1px solid #3b82f660",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 220,
			textAlign: "center" as const,
			padding: "10px 12px",
		},
	},
	{
		id: "flight-chunk1",
		position: { x: 340, y: 340 },
		data: {
			label:
				"Flight Chunk 1 — deferred\nSlowFeed resolved → full\nvDOM for the feed content",
		},
		style: {
			background: "#06b6d420",
			border: "1px solid #06b6d460",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 220,
			textAlign: "center" as const,
			padding: "10px 12px",
		},
	},
	{
		id: "swap",
		position: { x: 170, y: 470 },
		data: {
			label:
				"CLIENT: Swap $S1 → real content\nNo full re-render, state preserved ✓",
		},
		style: {
			background: "#22c55e",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			fontSize: 11,
			whiteSpace: "pre-line" as const,
			width: 280,
			textAlign: "center" as const,
			padding: "12px 16px",
		},
	},
	{
		id: "hydrate",
		position: { x: 190, y: 570 },
		data: { label: "Hydrate Client Components in new content" },
		type: "output",
		style: {
			background: "#3b82f6",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			fontSize: 11,
			width: 280,
			textAlign: "center" as const,
			padding: "10px 16px",
		},
	},
];

const streamEdges: Edge[] = [
	{
		id: "s-e1",
		source: "page",
		target: "header",
		style: { stroke: "#22c55e" },
	},
	{
		id: "s-e2",
		source: "page",
		target: "suspense",
		style: { stroke: "#f59e0b" },
	},
	{
		id: "s-e3",
		source: "header",
		target: "flight-chunk0",
		animated: true,
		label: "instant",
		style: { stroke: "#06b6d4" },
	},
	{
		id: "s-e4",
		source: "suspense",
		target: "slow-feed",
		label: "awaiting",
		style: { stroke: "#ef4444" },
	},
	{
		id: "s-e5",
		source: "flight-chunk0",
		target: "client-shell",
		animated: true,
		label: "stream to client",
		style: { stroke: "#3b82f6" },
	},
	{
		id: "s-e6",
		source: "slow-feed",
		target: "flight-chunk1",
		animated: true,
		label: "resolves",
		style: { stroke: "#06b6d4" },
	},
	{
		id: "s-e7",
		source: "client-shell",
		target: "swap",
		animated: true,
		style: { stroke: "#3b82f6" },
	},
	{
		id: "s-e8",
		source: "flight-chunk1",
		target: "swap",
		animated: true,
		label: "fills $S1 slot",
		style: { stroke: "#06b6d4" },
	},
	{
		id: "s-e9",
		source: "swap",
		target: "hydrate",
		animated: true,
		style: { stroke: "#22c55e" },
	},
];

export function FlightStreamingFlow() {
	return <FlowDiagram edges={streamEdges} height="680px" nodes={streamNodes} />;
}

/* ─────────────────────────────────────────────
   3. Initial Load vs Soft Navigation Flow
   Side-by-side comparison of what the server sends
   ───────────────────────────────────────────── */

const navNodes: Node[] = [
	// Left side — Initial Load
	{
		id: "initial-title",
		position: { x: 0, y: 0 },
		data: { label: "🌐 INITIAL PAGE LOAD" },
		type: "input",
		style: {
			background: "#3b82f6",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 700,
			fontSize: 12,
			padding: "10px 20px",
		},
	},
	{
		id: "server-html",
		position: { x: -30, y: 90 },
		data: {
			label: "Server sends TWO streams\nin parallel",
		},
		style: {
			background: "#3b82f620",
			border: "1px solid #3b82f660",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 190,
			textAlign: "center" as const,
		},
	},
	{
		id: "html-stream",
		position: { x: -80, y: 180 },
		data: {
			label: "HTML Stream\nFull markup for SEO\n& fast first paint",
		},
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 160,
			textAlign: "center" as const,
		},
	},
	{
		id: "flight-inline",
		position: { x: 110, y: 180 },
		data: {
			label:
				"Inline RSC Payload\n<script> tags with\nFlight data for hydration",
		},
		style: {
			background: "#8b5cf620",
			border: "1px solid #8b5cf660",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 170,
			textAlign: "center" as const,
		},
	},
	{
		id: "initial-hydrate",
		position: { x: 10, y: 310 },
		data: {
			label:
				"React hydrates using\nFlight payload as truth\nHTML is scaffolding only",
		},
		style: {
			background: "#06b6d420",
			border: "1px solid #06b6d460",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 200,
			textAlign: "center" as const,
			padding: "10px 12px",
		},
	},
	{
		id: "initial-result",
		position: { x: 30, y: 430 },
		data: { label: "Full page with SEO ✓" },
		type: "output",
		style: {
			background: "#22c55e",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			fontSize: 11,
			padding: "10px 20px",
		},
	},
	// Right side — Soft Navigation
	{
		id: "soft-title",
		position: { x: 400, y: 0 },
		data: { label: "⚡ SOFT NAVIGATION" },
		type: "input",
		style: {
			background: "#8b5cf6",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 700,
			fontSize: 12,
			padding: "10px 20px",
		},
	},
	{
		id: "prefetch",
		position: { x: 380, y: 90 },
		data: {
			label: "Router prefetches\nFlight payload only\n(no HTML needed)",
		},
		style: {
			background: "#8b5cf620",
			border: "1px solid #8b5cf660",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 180,
			textAlign: "center" as const,
		},
	},
	{
		id: "rsc-only",
		position: { x: 370, y: 200 },
		data: {
			label:
				"Server returns ONLY\nFlight payload for changed\nroute segments\nContent-Type: text/x-component",
		},
		style: {
			background: "#f59e0b20",
			border: "1px solid #f59e0b60",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 210,
			textAlign: "center" as const,
			padding: "10px 12px",
		},
	},
	{
		id: "merge",
		position: { x: 370, y: 340 },
		data: {
			label:
				"React router merges\ninto live tree\n• Keeps unchanged layouts\n• Preserves UI state",
		},
		style: {
			background: "#06b6d420",
			border: "1px solid #06b6d460",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 200,
			textAlign: "center" as const,
			padding: "10px 12px",
		},
	},
	{
		id: "soft-result",
		position: { x: 400, y: 470 },
		data: { label: "Sub-100ms transition ✓" },
		type: "output",
		style: {
			background: "#8b5cf6",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			fontSize: 11,
			padding: "10px 20px",
		},
	},
];

const navEdges: Edge[] = [
	// Left — Initial Load
	{
		id: "n-e1",
		source: "initial-title",
		target: "server-html",
		animated: true,
		style: { stroke: "#3b82f6" },
	},
	{
		id: "n-e2",
		source: "server-html",
		target: "html-stream",
		label: "stream 1",
		style: { stroke: "#22c55e" },
	},
	{
		id: "n-e3",
		source: "server-html",
		target: "flight-inline",
		label: "stream 2",
		style: { stroke: "#8b5cf6" },
	},
	{
		id: "n-e4",
		source: "html-stream",
		target: "initial-hydrate",
		animated: true,
		style: { stroke: "#22c55e" },
	},
	{
		id: "n-e5",
		source: "flight-inline",
		target: "initial-hydrate",
		animated: true,
		style: { stroke: "#8b5cf6" },
	},
	{
		id: "n-e6",
		source: "initial-hydrate",
		target: "initial-result",
		animated: true,
		style: { stroke: "#22c55e" },
	},
	// Right — Soft Navigation
	{
		id: "n-e7",
		source: "soft-title",
		target: "prefetch",
		animated: true,
		style: { stroke: "#8b5cf6" },
	},
	{
		id: "n-e8",
		source: "prefetch",
		target: "rsc-only",
		animated: true,
		label: "?_rsc=",
		style: { stroke: "#f59e0b" },
	},
	{
		id: "n-e9",
		source: "rsc-only",
		target: "merge",
		animated: true,
		label: "Flight only",
		style: { stroke: "#06b6d4" },
	},
	{
		id: "n-e10",
		source: "merge",
		target: "soft-result",
		animated: true,
		style: { stroke: "#8b5cf6" },
	},
];

export function InitialVsSoftNavFlow() {
	return <FlowDiagram edges={navEdges} height="580px" nodes={navNodes} />;
}

/* ─────────────────────────────────────────────
   4. Initial Load Detail Flow
   Shows HTML + Flight parallel streams on initial load
   ───────────────────────────────────────────── */

const initialLoadNodes: Node[] = [
	{
		id: "il-server",
		position: { x: 140, y: 0 },
		data: { label: "SERVER" },
		type: "input",
		style: {
			background: "#3b82f6",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 700,
			fontSize: 13,
			padding: "10px 36px",
		},
	},
	{
		id: "il-two-streams",
		position: { x: 90, y: 80 },
		data: { label: "Sends TWO things\nin parallel" },
		style: {
			background: "#3b82f620",
			border: "1px solid #3b82f660",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 180,
			textAlign: "center" as const,
			padding: "8px 12px",
		},
	},
	{
		id: "il-html",
		position: { x: 0, y: 175 },
		data: {
			label:
				"1. HTML String\n(renderToReadableStream)\nFull markup for SEO\n& fast first paint",
		},
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 170,
			textAlign: "center" as const,
			padding: "10px 12px",
		},
	},
	{
		id: "il-flight",
		position: { x: 220, y: 175 },
		data: {
			label:
				"2. Inline <script>\nRSC Flight Payload\nReact hydrates with this\nas source of truth",
		},
		style: {
			background: "#8b5cf620",
			border: "1px solid #8b5cf660",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 170,
			textAlign: "center" as const,
			padding: "10px 12px",
		},
	},
	{
		id: "il-suspense",
		position: { x: 0, y: 300 },
		data: { label: "Suspense fallbacks\nincluded in HTML" },
		style: {
			background: "#f59e0b20",
			border: "1px dashed #f59e0b80",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 160,
			textAlign: "center" as const,
			padding: "8px 10px",
		},
	},
	{
		id: "il-hydration",
		position: { x: 220, y: 300 },
		data: { label: "Matches server HTML\nexactly → no mismatch" },
		style: {
			background: "#06b6d420",
			border: "1px solid #06b6d460",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 160,
			textAlign: "center" as const,
			padding: "8px 10px",
		},
	},
	{
		id: "il-result",
		position: { x: 70, y: 400 },
		data: {
			label: "HTML = temporary scaffolding\nFlight payload = source of truth",
		},
		type: "output",
		style: {
			background: "#3b82f6",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			fontSize: 11,
			whiteSpace: "pre-line" as const,
			width: 260,
			textAlign: "center" as const,
			padding: "12px 16px",
		},
	},
];

const initialLoadEdges: Edge[] = [
	{
		id: "il-e1",
		source: "il-server",
		target: "il-two-streams",
		animated: true,
		style: { stroke: "#3b82f6" },
	},
	{
		id: "il-e2",
		source: "il-two-streams",
		target: "il-html",
		label: "stream 1",
		style: { stroke: "#22c55e" },
	},
	{
		id: "il-e3",
		source: "il-two-streams",
		target: "il-flight",
		label: "stream 2",
		style: { stroke: "#8b5cf6" },
	},
	{
		id: "il-e4",
		source: "il-html",
		target: "il-suspense",
		animated: true,
		style: { stroke: "#f59e0b" },
	},
	{
		id: "il-e5",
		source: "il-flight",
		target: "il-hydration",
		animated: true,
		style: { stroke: "#06b6d4" },
	},
	{
		id: "il-e6",
		source: "il-suspense",
		target: "il-result",
		animated: true,
		style: { stroke: "#22c55e" },
	},
	{
		id: "il-e7",
		source: "il-hydration",
		target: "il-result",
		animated: true,
		style: { stroke: "#8b5cf6" },
	},
];

export function InitialLoadDetailFlow() {
	return (
		<FlowDiagram
			edges={initialLoadEdges}
			height="500px"
			nodes={initialLoadNodes}
		/>
	);
}

/* ─────────────────────────────────────────────
   5. Soft Navigation Detail Flow
   Shows Flight-only payload and state-preserving merge
   ───────────────────────────────────────────── */

const softNavNodes: Node[] = [
	{
		id: "sn-router",
		position: { x: 140, y: 0 },
		data: { label: "CLIENT ROUTER" },
		type: "input",
		style: {
			background: "#8b5cf6",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 700,
			fontSize: 13,
			padding: "10px 28px",
		},
	},
	{
		id: "sn-prefetch",
		position: { x: 105, y: 80 },
		data: { label: "Prefetches RSC payload\nNo HTML, no full reload" },
		style: {
			background: "#8b5cf620",
			border: "1px solid #8b5cf660",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 190,
			textAlign: "center" as const,
			padding: "8px 12px",
		},
	},
	{
		id: "sn-server",
		position: { x: 90, y: 175 },
		data: {
			label: "Server returns ONLY\nFlight payload for changed\nroute segments",
		},
		style: {
			background: "#f59e0b20",
			border: "1px solid #f59e0b60",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 210,
			textAlign: "center" as const,
			padding: "10px 12px",
		},
	},
	{
		id: "sn-merge",
		position: { x: 20, y: 280 },
		data: { label: "Merge new payload\ninto live React tree" },
		style: {
			background: "#06b6d420",
			border: "1px solid #06b6d460",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 170,
			textAlign: "center" as const,
			padding: "8px 12px",
		},
	},
	{
		id: "sn-preserve",
		position: { x: 220, y: 280 },
		data: {
			label:
				"State preserved ✓\n• Unchanged layouts kept\n• Scroll position kept\n• Modal / form state kept",
		},
		style: {
			background: "#22c55e20",
			border: "1px solid #22c55e60",
			borderRadius: 8,
			fontSize: 10,
			whiteSpace: "pre-line" as const,
			width: 175,
			textAlign: "center" as const,
			padding: "10px 12px",
		},
	},
	{
		id: "sn-hydrate",
		position: { x: 65, y: 400 },
		data: { label: "Hydrate new Client Components" },
		style: {
			background: "#3b82f620",
			border: "1px solid #3b82f660",
			borderRadius: 8,
			fontSize: 10,
			width: 200,
			textAlign: "center" as const,
			padding: "8px 12px",
		},
	},
	{
		id: "sn-result",
		position: { x: 100, y: 490 },
		data: { label: "Sub-100ms page transition ⚡" },
		type: "output",
		style: {
			background: "#8b5cf6",
			color: "#fff",
			border: "none",
			borderRadius: 8,
			fontWeight: 600,
			fontSize: 11,
			width: 220,
			textAlign: "center" as const,
			padding: "10px 16px",
		},
	},
];

const softNavEdges: Edge[] = [
	{
		id: "sn-e1",
		source: "sn-router",
		target: "sn-prefetch",
		animated: true,
		style: { stroke: "#8b5cf6" },
	},
	{
		id: "sn-e2",
		source: "sn-prefetch",
		target: "sn-server",
		animated: true,
		label: "?_rsc=",
		style: { stroke: "#f59e0b" },
	},
	{
		id: "sn-e3",
		source: "sn-server",
		target: "sn-merge",
		animated: true,
		label: "Flight chunks",
		style: { stroke: "#06b6d4" },
	},
	{
		id: "sn-e4",
		source: "sn-server",
		target: "sn-preserve",
		animated: true,
		label: "diff only",
		style: { stroke: "#22c55e" },
	},
	{
		id: "sn-e5",
		source: "sn-merge",
		target: "sn-hydrate",
		animated: true,
		style: { stroke: "#3b82f6" },
	},
	{
		id: "sn-e6",
		source: "sn-preserve",
		target: "sn-hydrate",
		animated: true,
		style: { stroke: "#22c55e" },
	},
	{
		id: "sn-e7",
		source: "sn-hydrate",
		target: "sn-result",
		animated: true,
		style: { stroke: "#8b5cf6" },
	},
];

export function SoftNavigationDetailFlow() {
	return (
		<FlowDiagram edges={softNavEdges} height="580px" nodes={softNavNodes} />
	);
}
