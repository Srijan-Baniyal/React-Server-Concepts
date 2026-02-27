import { ImageResponse } from "next/og";

function Star({
	x,
	y,
	size,
	opacity = 1,
}: {
	x: number;
	y: number;
	size: number;
	opacity?: number;
}) {
	return (
		<svg
			height={size}
			style={{
				position: "absolute",
				left: x,
				top: y,
				opacity,
			}}
			viewBox="0 0 36 36"
			width={size}
		>
			<title>Sparkle</title>
			<path
				d="M28.865 7.134c7.361 7.359 9.35 17.304 4.443 22.209-4.907 4.907-14.85 2.918-22.21-4.441-.25-.25-.478-.51-.716-.766l4.417-4.417c5.724 5.724 13.016 7.714 16.286 4.442 3.271-3.271 1.282-10.563-4.441-16.287l.022.021-.021-.022C20.104 1.331 11.154-.326 6.657 4.171 4.482 6.346 3.76 9.564 4.319 13.044c-.858-4.083-.15-7.866 2.338-10.353 4.906-4.906 14.849-2.917 22.208 4.443"
				fill="#FDD888"
			/>
			<path
				d="M19.403 34c-.252 0-.503-.077-.719-.231l-5.076-3.641-5.076 3.641c-.433.31-1.013.31-1.443-.005a1.23 1.23 0 0 1-.45-1.369l1.894-6.11-5.031-3.545a1.24 1.24 0 0 1-.442-1.375 1.24 1.24 0 0 1 1.165-.851l6.147-.012 2.067-5.957a1.233 1.233 0 0 1 2.34 0l1.866 5.957 6.347.012a1.233 1.233 0 0 1 .723 2.226l-5.031 3.545 1.893 6.11A1.23 1.23 0 0 1 19.403 34"
				fill="#FFAC33"
			/>
		</svg>
	);
}

export function GET() {
	return new ImageResponse(
		<div
			style={{
				width: "1200px",
				height: "630px",
				background: "#09090b",
				display: "flex",
				position: "relative",
				overflow: "hidden",
				fontFamily: "sans-serif",
			}}
		>
			{/* Subtle grid */}
			<svg
				height="630"
				style={{ position: "absolute", top: 0, left: 0 }}
				width="1200"
			>
				<title>Background grid</title>
				<defs>
					<pattern
						height="48"
						id="grid"
						patternUnits="userSpaceOnUse"
						width="48"
						x="0"
						y="0"
					>
						<path
							d="M 48 0 L 0 0 0 48"
							fill="none"
							stroke="#ffffff"
							strokeOpacity="0.04"
							strokeWidth="1"
						/>
					</pattern>
				</defs>
				<rect fill="url(#grid)" height="630" width="1200" />
				{/* Warm amber glow bottom-right */}
				<radialGradient cx="50%" cy="50%" id="warmGlow" r="50%">
					<stop offset="0%" stopColor="#FFAC33" stopOpacity="0.12" />
					<stop offset="100%" stopColor="#FFAC33" stopOpacity="0" />
				</radialGradient>
				<ellipse cx="1050" cy="500" fill="url(#warmGlow)" rx="380" ry="280" />
				{/* Cool blue glow top-left */}
				<radialGradient cx="50%" cy="50%" id="coolGlow" r="50%">
					<stop offset="0%" stopColor="#818cf8" stopOpacity="0.1" />
					<stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
				</radialGradient>
				<ellipse cx="200" cy="160" fill="url(#coolGlow)" rx="320" ry="220" />
			</svg>

			{/* Decorative stars */}
			<Star opacity={0.15} size={280} x={820} y={-60} />
			<Star opacity={0.08} size={180} x={40} y={380} />
			<Star opacity={0.25} size={72} x={1090} y={52} />
			<Star opacity={0.2} size={48} x={680} y={530} />
			<Star opacity={0.18} size={36} x={160} y={70} />

			{/* Main content */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "60px 72px",
					width: "1200px",
					height: "630px",
					position: "relative",
					zIndex: 1,
				}}
			>
				{/* Top row: label + inline star */}
				<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
					<svg height="28" viewBox="0 0 36 36" width="28">
						<title>Sparkle</title>
						<path
							d="M28.865 7.134c7.361 7.359 9.35 17.304 4.443 22.209-4.907 4.907-14.85 2.918-22.21-4.441-.25-.25-.478-.51-.716-.766l4.417-4.417c5.724 5.724 13.016 7.714 16.286 4.442 3.271-3.271 1.282-10.563-4.441-16.287l.022.021-.021-.022C20.104 1.331 11.154-.326 6.657 4.171 4.482 6.346 3.76 9.564 4.319 13.044c-.858-4.083-.15-7.866 2.338-10.353 4.906-4.906 14.849-2.917 22.208 4.443"
							fill="#FDD888"
						/>
						<path
							d="M19.403 34c-.252 0-.503-.077-.719-.231l-5.076-3.641-5.076 3.641c-.433.31-1.013.31-1.443-.005a1.23 1.23 0 0 1-.45-1.369l1.894-6.11-5.031-3.545a1.24 1.24 0 0 1-.442-1.375 1.24 1.24 0 0 1 1.165-.851l6.147-.012 2.067-5.957a1.233 1.233 0 0 1 2.34 0l1.866 5.957 6.347.012a1.233 1.233 0 0 1 .723 2.226l-5.031 3.545 1.893 6.11A1.23 1.23 0 0 1 19.403 34"
							fill="#FFAC33"
						/>
					</svg>
					<span
						style={{
							fontSize: 14,
							fontFamily: "monospace",
							color: "#FFAC33",
							letterSpacing: "3px",
							textTransform: "uppercase",
						}}
					>
						rsc.srijanbaniyal.com
					</span>
				</div>

				{/* Center: title + description */}
				<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
					<div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
						<span
							style={{
								fontSize: 86,
								fontWeight: 800,
								color: "#ffffff",
								lineHeight: 1,
								letterSpacing: "-3px",
							}}
						>
							React Server
						</span>
						<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
							<span
								style={{
									fontSize: 86,
									fontWeight: 800,
									color: "#FFAC33",
									lineHeight: 1,
									letterSpacing: "-3px",
								}}
							>
								Concepts
							</span>
							{/* inline star next to title */}
							<svg
								height="56"
								style={{ marginTop: "8px" }}
								viewBox="0 0 36 36"
								width="56"
							>
								<title>Sparkle</title>
								<path
									d="M28.865 7.134c7.361 7.359 9.35 17.304 4.443 22.209-4.907 4.907-14.85 2.918-22.21-4.441-.25-.25-.478-.51-.716-.766l4.417-4.417c5.724 5.724 13.016 7.714 16.286 4.442 3.271-3.271 1.282-10.563-4.441-16.287l.022.021-.021-.022C20.104 1.331 11.154-.326 6.657 4.171 4.482 6.346 3.76 9.564 4.319 13.044c-.858-4.083-.15-7.866 2.338-10.353 4.906-4.906 14.849-2.917 22.208 4.443"
									fill="#FDD888"
								/>
								<path
									d="M19.403 34c-.252 0-.503-.077-.719-.231l-5.076-3.641-5.076 3.641c-.433.31-1.013.31-1.443-.005a1.23 1.23 0 0 1-.45-1.369l1.894-6.11-5.031-3.545a1.24 1.24 0 0 1-.442-1.375 1.24 1.24 0 0 1 1.165-.851l6.147-.012 2.067-5.957a1.233 1.233 0 0 1 2.34 0l1.866 5.957 6.347.012a1.233 1.233 0 0 1 .723 2.226l-5.031 3.545 1.893 6.11A1.23 1.23 0 0 1 19.403 34"
									fill="#FFAC33"
								/>
							</svg>
						</div>
					</div>

					<span
						style={{
							fontSize: 20,
							color: "#a1a1aa",
							lineHeight: 1.5,
							maxWidth: "700px",
						}}
					>
						An interactive deep dive into RSC architecture, React 19 features,
						streaming, suspense, and server actions with Next.js.
					</span>

					{/* Tags */}
					<div style={{ display: "flex", gap: "10px" }}>
						{["RSC", "React 19", "Next.js", "Streaming", "Server Actions"].map(
							(tag) => (
								<span
									key={tag}
									style={{
										fontSize: 13,
										fontFamily: "monospace",
										color: "#FDD888",
										background: "#FFAC3315",
										border: "1px solid #FFAC3330",
										borderRadius: "6px",
										padding: "5px 14px",
										letterSpacing: "0.3px",
									}}
								>
									{tag}
								</span>
							)
						)}
					</div>
				</div>

				{/* Bottom: author */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<span
						style={{
							fontSize: 15,
							color: "#52525b",
							fontFamily: "monospace",
						}}
					>
						— Srijan Baniyal
					</span>
					<span
						style={{
							fontSize: 13,
							color: "#3f3f46",
							fontFamily: "monospace",
						}}
					>
						@srijanbaniyal
					</span>
				</div>
			</div>
		</div>,
		{ width: 1200, height: 630 }
	);
}
