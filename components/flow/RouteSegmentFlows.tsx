"use client";

import type { Edge, Node } from "@xyflow/react";
import { FlowDiagram } from "./FlowWrapper";

/* ── Nested Layout Anatomy ── */
const layoutNodes: Node[] = [
	{
		id: "root",
		position: { x: 200, y: 0 },
		data: { label: "app/layout.tsx\nRootLayout (always)" },
		style: {
			background: "#7c3aed20",
			border: "1px solid #7c3aed",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 200,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
	{
		id: "home",
		position: { x: 60, y: 100 },
		data: { label: "app/page.tsx\n/" },
		style: {
			background: "#16a34a20",
			border: "1px solid #16a34a",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 140,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
	{
		id: "dash-layout",
		position: { x: 260, y: 100 },
		data: { label: "dashboard/layout.tsx\nDashboardLayout" },
		style: {
			background: "#2563eb20",
			border: "1px solid #2563eb",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 200,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
	{
		id: "dash-page",
		position: { x: 160, y: 210 },
		data: { label: "dashboard/page.tsx\n/dashboard" },
		style: {
			background: "#16a34a20",
			border: "1px solid #16a34a",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 160,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
	{
		id: "loading",
		position: { x: 340, y: 210 },
		data: { label: "loading.tsx\n⏳ Suspense boundary" },
		style: {
			background: "#f59e0b20",
			border: "1px solid #f59e0b",
			borderRadius: 8,
			padding: 10,
			fontSize: 11,
			width: 160,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
	{
		id: "error",
		position: { x: 520, y: 210 },
		data: { label: "error.tsx\n⚠️ Error boundary" },
		style: {
			background: "#ef444420",
			border: "1px solid #ef4444",
			borderRadius: 8,
			padding: 10,
			fontSize: 11,
			width: 150,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
	{
		id: "settings-layout",
		position: { x: 260, y: 320 },
		data: { label: "settings/layout.tsx\nSettingsLayout" },
		style: {
			background: "#2563eb20",
			border: "1px solid #2563eb",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 200,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
	{
		id: "settings-page",
		position: { x: 260, y: 420 },
		data: { label: "settings/page.tsx\n/dashboard/settings" },
		style: {
			background: "#16a34a20",
			border: "1px solid #16a34a",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 200,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
	{
		id: "render-stack",
		position: { x: 140, y: 520 },
		data: {
			label:
				"Render stack for /dashboard/settings:\nRootLayout → DashboardLayout → SettingsLayout → SettingsPage",
		},
		style: {
			background: "#7c3aed10",
			border: "1px dashed #7c3aed",
			borderRadius: 8,
			padding: 10,
			fontSize: 11,
			width: 420,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
];

const layoutEdges: Edge[] = [
	{ id: "le1", source: "root", target: "home" },
	{ id: "le2", source: "root", target: "dash-layout" },
	{ id: "le3", source: "dash-layout", target: "dash-page" },
	{ id: "le4", source: "dash-layout", target: "loading" },
	{ id: "le5", source: "dash-layout", target: "error" },
	{ id: "le6", source: "dash-layout", target: "settings-layout" },
	{ id: "le7", source: "settings-layout", target: "settings-page" },
	{
		id: "le8",
		source: "settings-page",
		target: "render-stack",
		style: { strokeDasharray: "5 5" },
	},
];

/* ── Parallel & Intercepting Routes ── */
const parallelNodes: Node[] = [
	{
		id: "p-layout",
		position: { x: 200, y: 0 },
		data: { label: "dashboard/layout.tsx\nreceives @team & @analytics" },
		style: {
			background: "#7c3aed20",
			border: "1px solid #7c3aed",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 240,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
	{
		id: "p-children",
		position: { x: 80, y: 100 },
		data: { label: "{children}\npage.tsx" },
		style: {
			background: "#16a34a20",
			border: "1px solid #16a34a",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 130,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
	{
		id: "p-team",
		position: { x: 230, y: 100 },
		data: { label: "@team slot\n@team/page.tsx" },
		style: {
			background: "#2563eb20",
			border: "1px solid #2563eb",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 140,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
	{
		id: "p-analytics",
		position: { x: 395, y: 100 },
		data: { label: "@analytics slot\n@analytics/page.tsx" },
		style: {
			background: "#f59e0b20",
			border: "1px solid #f59e0b",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 160,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
	{
		id: "p-intercept-label",
		position: { x: 80, y: 220 },
		data: { label: "Intercepting Routes — (.)path" },
		style: {
			background: "#ef444410",
			border: "1px dashed #ef4444",
			borderRadius: 8,
			padding: 8,
			fontSize: 12,
			fontWeight: 600,
			width: 220,
			textAlign: "center",
		},
	},
	{
		id: "p-gallery",
		position: { x: 60, y: 300 },
		data: { label: "app/gallery/page.tsx" },
		style: {
			background: "#16a34a20",
			border: "1px solid #16a34a",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 170,
			textAlign: "center",
		},
	},
	{
		id: "p-modal",
		position: { x: 290, y: 300 },
		data: { label: "(.)photo/[id]/page.tsx\n→ Modal view" },
		style: {
			background: "#ef444420",
			border: "1px solid #ef4444",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 180,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
	{
		id: "p-full",
		position: { x: 290, y: 400 },
		data: { label: "Direct URL /photo/123\n→ Full page view" },
		style: {
			background: "#2563eb20",
			border: "1px solid #2563eb",
			borderRadius: 8,
			padding: 10,
			fontSize: 12,
			width: 180,
			whiteSpace: "pre-wrap",
			textAlign: "center",
		},
	},
	{
		id: "p-conventions",
		position: { x: 120, y: 490 },
		data: {
			label:
				"Convention prefixes:  (.) same level  |  (..) one up  |  (...) from root",
		},
		style: {
			background: "#f59e0b10",
			border: "1px dashed #f59e0b",
			borderRadius: 8,
			padding: 10,
			fontSize: 11,
			width: 420,
			textAlign: "center",
		},
	},
];

const parallelEdges: Edge[] = [
	{ id: "pe1", source: "p-layout", target: "p-children" },
	{ id: "pe2", source: "p-layout", target: "p-team" },
	{ id: "pe3", source: "p-layout", target: "p-analytics" },
	{
		id: "pe4",
		source: "p-gallery",
		target: "p-modal",
		label: "click from gallery",
		animated: true,
		style: { stroke: "#ef4444" },
	},
	{
		id: "pe5",
		source: "p-modal",
		target: "p-full",
		label: "direct URL",
		style: { strokeDasharray: "5 5", stroke: "#2563eb" },
	},
];

export function NestedLayoutFlow() {
	return (
		<FlowDiagram edges={layoutEdges} fitView height={640} nodes={layoutNodes} />
	);
}

export function ParallelRoutesFlow() {
	return (
		<FlowDiagram
			edges={parallelEdges}
			fitView
			height={580}
			nodes={parallelNodes}
		/>
	);
}
