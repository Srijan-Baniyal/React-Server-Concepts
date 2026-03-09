import type { Edge, Node } from "@xyflow/react";
import { FlowDiagram } from "./FlowWrapper";

const SC = {
	background: "#16a34a18",
	border: "1px solid #16a34a",
	borderRadius: 8,
	padding: 8,
	fontSize: 11,
	textAlign: "center" as const,
};

const CC = {
	background: "#2563eb18",
	border: "1px solid #2563eb",
	borderRadius: 8,
	padding: 8,
	fontSize: 11,
	textAlign: "center" as const,
};

const BOUNDARY = {
	background: "#f59e0b18",
	border: "1px dashed #f59e0b",
	borderRadius: 8,
	padding: 8,
	fontSize: 11,
	textAlign: "center" as const,
};

const W = 150;

const nodes: Node[] = [
	{
		id: "root",
		position: { x: 275, y: 0 },
		data: { label: "RootLayout" },
		style: { ...SC, width: W, fontWeight: 600, fontSize: 13 },
	},
	{
		id: "nav",
		position: { x: 20, y: 100 },
		data: { label: "Navigation" },
		style: { ...SC, width: W },
	},
	{
		id: "theme",
		position: { x: 20, y: 210 },
		data: { label: "ThemeToggle\nonClick" },
		style: { ...CC, width: W, whiteSpace: "pre-wrap" as const },
	},
	{
		id: "page",
		position: { x: 275, y: 100 },
		data: { label: "async PokemonPage\n📦 data fetching" },
		style: { ...SC, width: W, whiteSpace: "pre-wrap" as const },
	},
	{
		id: "footer",
		position: { x: 510, y: 100 },
		data: { label: "Footer" },
		style: { ...SC, width: W },
	},
	{
		id: "error",
		position: { x: 230, y: 240 },
		data: { label: "ErrorBoundary" },
		style: { ...CC, width: W },
	},
	{
		id: "suspense",
		position: { x: 420, y: 240 },
		data: { label: "<Suspense>\n⏳ streaming" },
		style: { ...BOUNDARY, width: W, whiteSpace: "pre-wrap" as const },
	},
	{
		id: "list",
		position: { x: 290, y: 350 },
		data: { label: "PokemonList" },
		style: { ...SC, width: W },
	},
	{
		id: "card",
		position: { x: 290, y: 440 },
		data: { label: "PokemonCard × N" },
		style: { ...SC, width: W },
	},
	{
		id: "fav",
		position: { x: 200, y: 535 },
		data: { label: "FavoriteButton\nuseState" },
		style: { ...CC, width: W, whiteSpace: "pre-wrap" as const },
	},
	{
		id: "share",
		position: { x: 390, y: 535 },
		data: { label: "ShareButton\nnavigator.share" },
		style: { ...CC, width: W, whiteSpace: "pre-wrap" as const },
	},
];

const edges: Edge[] = [
	{ id: "e1", source: "root", target: "nav" },
	{ id: "e2", source: "root", target: "page" },
	{ id: "e3", source: "root", target: "footer" },
	{ id: "e4", source: "nav", target: "theme" },
	{ id: "e5", source: "page", target: "error" },
	{ id: "e6", source: "page", target: "suspense" },
	{ id: "e7", source: "suspense", target: "list", animated: true },
	{ id: "e8", source: "list", target: "card" },
	{ id: "e9", source: "card", target: "fav" },
	{ id: "e10", source: "card", target: "share" },
];

export function CompositionTreeFlow() {
	return <FlowDiagram edges={edges} fitView height={620} nodes={nodes} />;
}
