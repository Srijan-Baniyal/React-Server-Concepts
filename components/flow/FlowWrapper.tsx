"use client";

import {
	Background,
	BackgroundVariant,
	Controls,
	type Edge,
	type Node,
	ReactFlow,
	ReactFlowProvider,
	useEdgesState,
	useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import type { NodeTypes } from "@xyflow/react";
import type { CSSProperties } from "react";

export interface FlowDiagramProps {
	className?: string;
	edges: Edge[];
	fitView?: boolean;
	height?: string | number;
	nodes: Node[];
	nodeTypes?: NodeTypes;
	showBackground?: boolean;
	showControls?: boolean;
	style?: CSSProperties;
}

export function FlowDiagram({
	nodes: initialNodes,
	edges: initialEdges,
	height = "420px",
	nodeTypes,
	className,
	style,
	fitView = true,
	showControls = true,
	showBackground = true,
}: FlowDiagramProps) {
	const [nodes] = useNodesState(initialNodes);
	const [edges] = useEdgesState(initialEdges);

	return (
		<div className={className} style={{ height, width: "100%", ...style }}>
			<ReactFlowProvider>
				<ReactFlow
					colorMode="system"
					edges={edges}
					edgesReconnectable={false}
					elementsSelectable={false}
					fitView={fitView}
					fitViewOptions={{ padding: 0.2 }}
					maxZoom={1.5}
					minZoom={0.3}
					nodes={nodes}
					nodesConnectable={false}
					nodesDraggable={false}
					nodeTypes={nodeTypes}
					panOnDrag
					proOptions={{ hideAttribution: true }}
					zoomOnScroll
				>
					{showBackground && (
						<Background gap={16} variant={BackgroundVariant.Dots} />
					)}
					{showControls && (
						<Controls
							fitViewOptions={{ padding: 0.2 }}
							showInteractive={false}
						/>
					)}
				</ReactFlow>
			</ReactFlowProvider>
		</div>
	);
}
