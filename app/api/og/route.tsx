import { ImageResponse } from "next/og";

export function GET() {
	const tags = ["RSC", "React 19", "Next.js", "Streaming", "Server Actions"];

	return new ImageResponse(
		<div
			style={{
				width: "1200px",
				height: "630px",
				background: "#050505",
				display: "flex",
				position: "relative",
				overflow: "hidden",
				fontFamily: "sans-serif",
			}}
		>
			{/* Background layers */}
			<svg
				height="630"
				style={{ position: "absolute", top: 0, left: 0 }}
				width="1200"
			>
				<title>Background</title>
				<defs>
					{/* Dot grid pattern */}
					<pattern
						height="32"
						id="dots"
						patternUnits="userSpaceOnUse"
						width="32"
					>
						<circle cx="1" cy="1" fill="#ffffff" opacity="0.07" r="1" />
					</pattern>

					{/* Primary glow - warm orange/amber */}
					<radialGradient cx="50%" cy="50%" id="glowPrimary" r="50%">
						<stop offset="0%" stopColor="#f97316" stopOpacity="0.18" />
						<stop offset="50%" stopColor="#f97316" stopOpacity="0.05" />
						<stop offset="100%" stopColor="#f97316" stopOpacity="0" />
					</radialGradient>

					{/* Secondary glow - indigo */}
					<radialGradient cx="50%" cy="50%" id="glowSecondary" r="50%">
						<stop offset="0%" stopColor="#6366f1" stopOpacity="0.14" />
						<stop offset="50%" stopColor="#6366f1" stopOpacity="0.04" />
						<stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
					</radialGradient>

					{/* Tertiary glow - cyan accent */}
					<radialGradient cx="50%" cy="50%" id="glowTertiary" r="50%">
						<stop offset="0%" stopColor="#06b6d4" stopOpacity="0.08" />
						<stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
					</radialGradient>
				</defs>

				{/* Dot grid */}
				<rect fill="url(#dots)" height="630" width="1200" />

				{/* Glow orbs */}
				<ellipse cx="950" cy="480" fill="url(#glowPrimary)" rx="500" ry="350" />
				<ellipse
					cx="150"
					cy="120"
					fill="url(#glowSecondary)"
					rx="400"
					ry="300"
				/>
				<ellipse
					cx="600"
					cy="200"
					fill="url(#glowTertiary)"
					rx="300"
					ry="200"
				/>

				{/* Decorative ring - top right */}
				<circle
					cx="1080"
					cy="80"
					fill="none"
					opacity="0.06"
					r="160"
					stroke="#f97316"
					strokeWidth="1"
				/>
				<circle
					cx="1080"
					cy="80"
					fill="none"
					opacity="0.03"
					r="220"
					stroke="#f97316"
					strokeWidth="1"
				/>

				{/* Decorative ring - bottom left */}
				<circle
					cx="80"
					cy="580"
					fill="none"
					opacity="0.05"
					r="120"
					stroke="#6366f1"
					strokeWidth="1"
				/>

				{/* Subtle diagonal lines */}
				<line
					opacity="0.03"
					stroke="#ffffff"
					strokeWidth="1"
					x1="700"
					x2="1200"
					y1="0"
					y2="500"
				/>
				<line
					opacity="0.02"
					stroke="#ffffff"
					strokeWidth="1"
					x1="800"
					x2="1200"
					y1="0"
					y2="400"
				/>

				{/* Small accent dots */}
				<circle cx="1100" cy="560" fill="#f97316" opacity="0.3" r="3" />
				<circle cx="1060" cy="540" fill="#f97316" opacity="0.15" r="2" />
				<circle cx="180" cy="90" fill="#6366f1" opacity="0.25" r="3" />
				<circle cx="220" cy="60" fill="#6366f1" opacity="0.12" r="2" />
			</svg>

			{/* Left accent bar */}
			<div
				style={{
					position: "absolute",
					left: 0,
					top: 0,
					width: "4px",
					height: "630px",
					display: "flex",
				}}
			>
				<svg height="630" width="4">
					<title>Accent bar</title>
					<defs>
						<linearGradient id="barGrad" x1="0" x2="0" y1="0" y2="1">
							<stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
							<stop offset="30%" stopColor="#6366f1" stopOpacity="0.8" />
							<stop offset="60%" stopColor="#f97316" stopOpacity="0.9" />
							<stop offset="100%" stopColor="#f97316" stopOpacity="0" />
						</linearGradient>
					</defs>
					<rect fill="url(#barGrad)" height="630" width="4" />
				</svg>
			</div>

			{/* Content */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "56px 80px",
					width: "1200px",
					height: "630px",
					position: "relative",
				}}
			>
				{/* Top: URL + React logo */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "10px",
						}}
					>
						{/* React atom icon */}
						<svg height="22" viewBox="-11.5 -10.232 23 20.463" width="22">
							<title>React</title>
							<circle cx="0" cy="0" fill="#61dafb" r="2.05" />
							<g fill="none" stroke="#61dafb" strokeWidth="1">
								<ellipse rx="11" ry="4.2" />
								<ellipse rx="11" ry="4.2" transform="rotate(60)" />
								<ellipse rx="11" ry="4.2" transform="rotate(120)" />
							</g>
						</svg>
						<span
							style={{
								fontSize: 14,
								fontFamily: "monospace",
								color: "#71717a",
								letterSpacing: "2px",
							}}
						>
							reactserverthings.vercel.app
						</span>
					</div>

					{/* Version badge */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "6px",
							background: "rgba(255,255,255,0.04)",
							border: "1px solid rgba(255,255,255,0.08)",
							borderRadius: "20px",
							padding: "6px 16px",
						}}
					>
						<div
							style={{
								width: "6px",
								height: "6px",
								borderRadius: "50%",
								background: "#22c55e",
								display: "flex",
							}}
						/>
						<span
							style={{
								fontSize: 12,
								fontFamily: "monospace",
								color: "#a1a1aa",
							}}
						>
							Next.js 15 + React 19
						</span>
					</div>
				</div>

				{/* Center: Title block */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "24px",
					}}
				>
					{/* Title */}
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "4px",
						}}
					>
						<span
							style={{
								fontSize: 92,
								fontWeight: 900,
								color: "#fafafa",
								lineHeight: 1,
								letterSpacing: "-4px",
							}}
						>
							React Server
						</span>
						<span
							style={{
								fontSize: 92,
								fontWeight: 900,
								lineHeight: 1,
								letterSpacing: "-4px",
								color: "#f97316",
							}}
						>
							Concepts
						</span>
					</div>

					{/* Description */}
					<span
						style={{
							fontSize: 19,
							color: "#a1a1aa",
							lineHeight: 1.6,
							maxWidth: "640px",
							letterSpacing: "0.2px",
						}}
					>
						Interactive deep-dive into RSC architecture, streaming, suspense,
						server actions, and the future of React.
					</span>

					{/* Tags row */}
					<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
						{tags.map((tag) => (
							<div
								key={tag}
								style={{
									display: "flex",
									alignItems: "center",
									gap: "6px",
									fontSize: 12,
									fontFamily: "monospace",
									color: "#d4d4d8",
									background: "rgba(255,255,255,0.04)",
									border: "1px solid rgba(255,255,255,0.08)",
									borderRadius: "6px",
									padding: "5px 14px",
									letterSpacing: "0.5px",
								}}
							>
								<div
									style={{
										width: "4px",
										height: "4px",
										borderRadius: "50%",
										background: "#f97316",
										display: "flex",
									}}
								/>
								{tag}
							</div>
						))}
					</div>
				</div>

				{/* Bottom: Author + branding */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "12px",
						}}
					>
						{/* Avatar circle */}
						<div
							style={{
								width: "32px",
								height: "32px",
								borderRadius: "50%",
								background: "linear-gradient(135deg, #6366f1, #f97316)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<span
								style={{
									fontSize: 14,
									fontWeight: 700,
									color: "#ffffff",
								}}
							>
								S
							</span>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "0px",
							}}
						>
							<span
								style={{
									fontSize: 14,
									fontWeight: 600,
									color: "#d4d4d8",
								}}
							>
								Srijan Baniyal
							</span>
							<span
								style={{
									fontSize: 12,
									color: "#52525b",
									fontFamily: "monospace",
								}}
							>
								@srijanbaniyal
							</span>
						</div>
					</div>

					{/* Right side decorative element */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "8px",
						}}
					>
						<div
							style={{
								width: "40px",
								height: "1px",
								background: "linear-gradient(90deg, transparent, #3f3f46)",
								display: "flex",
							}}
						/>
						<span
							style={{
								fontSize: 11,
								fontFamily: "monospace",
								color: "#3f3f46",
								letterSpacing: "2px",
								textTransform: "uppercase",
							}}
						>
							Open Source
						</span>
					</div>
				</div>
			</div>
		</div>,
		{ width: 1200, height: 630 }
	);
}
