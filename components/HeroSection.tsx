"use client";

import {
	ArrowRightIcon,
	CpuIcon,
	EyeIcon,
	LightningIcon,
	PlayIcon,
	SparkleIcon,
} from "@phosphor-icons/react";
import {
	motion,
	useInView,
	useScroll,
	useSpring,
	useTransform,
} from "motion/react";
import Link from "next/link";
import {
	type ComponentType,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { Button } from "@/components/ui/button";

// Hook to track if user has seen the hero animations before
function useHasSeenAnimation() {
	const [hasSeen, setHasSeen] = useState<boolean | null>(null);

	useEffect(() => {
		const seen = localStorage.getItem("hero-animation-seen") === "true";
		setHasSeen(seen);
	}, []);

	const markAsSeen = useCallback(() => {
		localStorage.setItem("hero-animation-seen", "true");
		setHasSeen(true);
	}, []);

	return { hasSeen, markAsSeen };
}

interface Node {
	id: string;
	label: string;
	x: number;
	y: number;
	scale: number;
}

interface Edge {
	from: string;
	to: string;
	progress: number;
}

interface NodeSequence {
	id: string;
	label: string;
	x: number;
	y: number;
}

interface EdgeSequence {
	from: string;
	to: string;
}

interface Feature {
	icon: ComponentType<{
		className?: string;
		weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
	}>;
	title: string;
	description: string;
}

interface Step {
	number: string;
	title: string;
	description: string;
}

interface ScrollRevealProps {
	children: React.ReactNode;
	delay?: number;
}

interface StaggerRevealProps {
	children: React.ReactNode;
}

interface StaggerItemProps {
	children: React.ReactNode;
}

// Constants
const NODE_SEQUENCE: readonly NodeSequence[] = [
	{ id: "1", label: "Server", x: 50, y: 50 },
	{ id: "2", label: "Client", x: 75, y: 30 },
	{ id: "3", label: "Data", x: 25, y: 35 },
	{ id: "4", label: "UI", x: 60, y: 70 },
	{ id: "5", label: "State", x: 35, y: 65 },
	{ id: "6", label: "React", x: 50, y: 85 },
	{ id: "7", label: "Stream", x: 80, y: 55 },
	{ id: "8", label: "Suspense", x: 20, y: 55 },
] as const;

const EDGE_SEQUENCE: readonly EdgeSequence[] = [
	{ from: "1", to: "2" },
	{ from: "1", to: "3" },
	{ from: "2", to: "7" },
	{ from: "3", to: "8" },
	{ from: "1", to: "4" },
	{ from: "1", to: "5" },
	{ from: "4", to: "6" },
	{ from: "5", to: "6" },
	{ from: "7", to: "4" },
	{ from: "8", to: "5" },
] as const;

const FEATURES: readonly Feature[] = [
	{
		icon: LightningIcon,
		title: "Zero-Bundle Server Logic",
		description:
			"Server components run exclusively on the server. Heavy computations, data fetching, and business logic never reach the client bundle.",
	},
	{
		icon: EyeIcon,
		title: "Streaming & Suspense",
		description:
			"Watch content progressively render as it becomes ready. No loading spinners—just smooth, incremental page building with React Suspense.",
	},
	{
		icon: CpuIcon,
		title: "React 19 Compiler",
		description:
			"Automatic memoization and optimization without manual useMemo or useCallback. The compiler handles performance for you.",
	},
	{
		icon: SparkleIcon,
		title: "Server-First Architecture",
		description:
			"Experience the paradigm shift of server components. Direct database access, async components, and seamless server-client composition.",
	},
] as const;

const STEPS: readonly Step[] = [
	{
		number: "01",
		title: "Server Components",
		description:
			"Understand how components run on the server by default, reducing JavaScript bundle size and enabling direct access to backend resources.",
	},
	{
		number: "02",
		title: "Client Boundaries",
		description:
			"Learn strategic placement of 'use client' directives. See how to compose server and client components for optimal performance.",
	},
	{
		number: "03",
		title: "Data Fetching Patterns",
		description:
			"Explore async/await in components, streaming with Suspense, and parallel data fetching without traditional API routes.",
	},
	{
		number: "04",
		title: "React 19 Features",
		description:
			"Experience the React Compiler, enhanced hooks, server actions, and the future of React architecture in a production-ready app.",
	},
] as const;

const ANIMATION_CONFIG = {
	NODE_INTERVAL: 350,
	EDGE_INTERVAL: 250,
	EDGE_ANIMATION_DURATION: 500,
	SPRING_CONFIG: { stiffness: 120, damping: 18 },
	SCROLL_SPRING_CONFIG: { stiffness: 80, damping: 25 },
} as const;

// Animated Architecture Diagram Component - No Repeat
function AnimatedGraph({ skipAnimation }: { skipAnimation: boolean }) {
	// Initialize with all nodes and edges if animation should be skipped
	const initialNodes = useMemo(
		() =>
			skipAnimation ? NODE_SEQUENCE.map((node) => ({ ...node, scale: 1 })) : [],
		[skipAnimation]
	);
	const initialEdges = useMemo(
		() =>
			skipAnimation
				? EDGE_SEQUENCE.map((edge) => ({ ...edge, progress: 1 }))
				: [],
		[skipAnimation]
	);

	const [nodes, setNodes] = useState<Node[]>(initialNodes);
	const [edges, setEdges] = useState<Edge[]>(initialEdges);
	const [nodeIndex, setNodeIndex] = useState(
		skipAnimation ? NODE_SEQUENCE.length : 0
	);
	const [edgeIndex, setEdgeIndex] = useState(
		skipAnimation ? EDGE_SEQUENCE.length : 0
	);
	const [isComplete, setIsComplete] = useState(skipAnimation);

	// Add nodes sequentially
	useEffect(() => {
		if (nodeIndex >= NODE_SEQUENCE.length || isComplete || skipAnimation) {
			return;
		}

		const timer = setTimeout(() => {
			setNodes((prev) => [...prev, { ...NODE_SEQUENCE[nodeIndex], scale: 0 }]);
			setNodeIndex((prev) => prev + 1);
		}, ANIMATION_CONFIG.NODE_INTERVAL);

		return () => clearTimeout(timer);
	}, [nodeIndex, isComplete, skipAnimation]);

	// Animate node scale
	useEffect(() => {
		if (nodes.length === 0 || isComplete || skipAnimation) {
			return;
		}

		const timer = setTimeout(() => {
			setNodes((prev) =>
				prev.map((node, idx) =>
					idx === prev.length - 1 ? { ...node, scale: 1 } : node
				)
			);
		}, 50);

		return () => clearTimeout(timer);
	}, [nodes.length, isComplete, skipAnimation]);

	// Add edges sequentially
	useEffect(() => {
		if (
			edgeIndex >= EDGE_SEQUENCE.length ||
			nodes.length < 2 ||
			isComplete ||
			skipAnimation
		) {
			return;
		}

		const timer = setTimeout(() => {
			const currentEdge = EDGE_SEQUENCE[edgeIndex];
			const fromExists = nodes.some((n) => n.id === currentEdge.from);
			const toExists = nodes.some((n) => n.id === currentEdge.to);

			if (fromExists && toExists) {
				setEdges((prev) => [...prev, { ...currentEdge, progress: 0 }]);
				setEdgeIndex((prev) => prev + 1);
			}
		}, ANIMATION_CONFIG.EDGE_INTERVAL);

		return () => clearTimeout(timer);
	}, [edgeIndex, nodes, isComplete, skipAnimation]);

	// Animate edge progress
	useEffect(() => {
		if (edges.length === 0 || isComplete || skipAnimation) {
			return;
		}

		const timer = setTimeout(() => {
			setEdges((prev) =>
				prev.map((edge, idx) =>
					idx === prev.length - 1 ? { ...edge, progress: 1 } : edge
				)
			);
		}, 50);

		return () => clearTimeout(timer);
	}, [edges.length, isComplete, skipAnimation]);

	// Mark as complete when animation finishes
	useEffect(() => {
		if (
			nodeIndex >= NODE_SEQUENCE.length &&
			edgeIndex >= EDGE_SEQUENCE.length &&
			!isComplete
		) {
			setIsComplete(true);
		}
	}, [nodeIndex, edgeIndex, isComplete]);

	const getNodePosition = useCallback(
		(nodeId: string) => {
			const node = nodes.find((n) => n.id === nodeId);
			return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
		},
		[nodes]
	);

	return (
		<svg
			aria-label="React Server Components architecture visualization"
			className="h-full w-full"
			viewBox="0 0 100 100"
		>
			<title>React Server Components Flow</title>
			<defs>
				<linearGradient id="edgeGradient" x1="0%" x2="100%" y1="0%" y2="0%">
					<stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
					<stop offset="50%" stopColor="currentColor" stopOpacity="0.4" />
					<stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
				</linearGradient>
			</defs>

			{/* Edges */}
			{edges.map((edge) => {
				const from = getNodePosition(edge.from);
				const to = getNodePosition(edge.to);
				return (
					<motion.line
						animate={{ opacity: 0.4 }}
						initial={{ opacity: 0 }}
						key={`${edge.from}-${edge.to}`}
						stroke="url(#edgeGradient)"
						strokeWidth="0.4"
						transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
						x1={from.x}
						x2={to.x}
						y1={from.y}
						y2={to.y}
					/>
				);
			})}

			{/* Nodes */}
			{nodes.map((node) => (
				<motion.g key={node.id}>
					<motion.circle
						animate={{ scale: node.scale, opacity: 1 }}
						className="fill-primary/20"
						cx={node.x}
						cy={node.y}
						initial={{ scale: 0, opacity: 0 }}
						r="4.5"
						transition={{ ...ANIMATION_CONFIG.SPRING_CONFIG, type: "spring" }}
					/>
					<motion.circle
						animate={{ scale: node.scale, opacity: 1 }}
						className="fill-primary"
						cx={node.x}
						cy={node.y}
						initial={{ scale: 0, opacity: 0 }}
						r="2.5"
						transition={{
							...ANIMATION_CONFIG.SPRING_CONFIG,
							type: "spring",
							delay: 0.05,
						}}
					/>
					<motion.text
						animate={{ opacity: node.scale }}
						className="fill-current font-medium text-[2.8px]"
						dy="0.3em"
						initial={{ opacity: 0 }}
						textAnchor="middle"
						transition={{ duration: 0.4, delay: 0.1 }}
						x={node.x}
						y={node.y + 7}
					>
						{node.label}
					</motion.text>
				</motion.g>
			))}
		</svg>
	);
}

// Scroll Reveal Component
function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-80px" });

	return (
		<motion.div
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
			initial={{ opacity: 0, y: 30 }}
			ref={ref}
			transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
		>
			{children}
		</motion.div>
	);
}

// Stagger Reveal Container
function StaggerReveal({ children }: StaggerRevealProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-80px" });

	return (
		<motion.div
			animate={isInView ? "visible" : "hidden"}
			initial="hidden"
			ref={ref}
			variants={{
				hidden: {},
				visible: { transition: { staggerChildren: 0.12 } },
			}}
		>
			{children}
		</motion.div>
	);
}

// Stagger Item
function StaggerItem({ children }: StaggerItemProps) {
	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 24, scale: 0.96 },
				visible: {
					opacity: 1,
					y: 0,
					scale: 1,
					transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
				},
			}}
		>
			{children}
		</motion.div>
	);
}

// Main Hero Section Component
export default function HeroSection() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { hasSeen, markAsSeen } = useHasSeenAnimation();
	const { scrollYProgress } = useScroll({ target: containerRef });
	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: ANIMATION_CONFIG.SCROLL_SPRING_CONFIG.stiffness,
		damping: ANIMATION_CONFIG.SCROLL_SPRING_CONFIG.damping,
	});

	const heroY = useTransform(smoothProgress, [0, 1], [0, -80]);
	const heroOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
	const graphScale = useTransform(smoothProgress, [0, 0.5], [1, 0.92]);
	const graphY = useTransform(smoothProgress, [0, 0.5], [0, 20]);

	// Mark animations as seen after they complete
	useEffect(() => {
		if (hasSeen === false) {
			const timer = setTimeout(() => {
				markAsSeen();
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [hasSeen, markAsSeen]);

	// Skip animations if already seen or still loading from localStorage
	const shouldAnimate = hasSeen === false;

	return (
		<div className="relative min-h-screen overflow-hidden" ref={containerRef}>
			{/* Hero Section */}
			<motion.section
				className="relative flex min-h-screen items-center justify-center px-4 py-20"
				style={{ y: heroY, opacity: heroOpacity }}
			>
				<div className="container mx-auto max-w-7xl">
					<div className="grid items-center gap-16 lg:grid-cols-2">
						{/* Left Content */}
						<div className="space-y-8">
							<motion.div
								animate={{ opacity: 1, y: 0, scale: 1 }}
								className="inline-block"
								initial={
									shouldAnimate
										? { opacity: 0, y: 20, scale: 0.9 }
										: { opacity: 1, y: 0, scale: 1 }
								}
								transition={{
									duration: shouldAnimate ? 0.8 : 0,
									ease: [0.22, 1, 0.36, 1],
								}}
							>
								<span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-linear-to-r from-primary/10 to-primary/5 px-4 py-2 font-medium text-primary text-sm backdrop-blur-sm">
									<SparkleIcon className="size-4" weight="fill" />
									React Server Components
								</span>
							</motion.div>

							<motion.h1
								animate={{ opacity: 1, y: 0 }}
								className="font-bold text-4xl text-foreground leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
								initial={
									shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }
								}
								transition={{
									duration: shouldAnimate ? 0.8 : 0,
									delay: shouldAnimate ? 0.1 : 0,
									ease: [0.22, 1, 0.36, 1],
								}}
							>
								Master React Server Components{" "}
								<span className="bg-linear-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
									The Future of React
								</span>
							</motion.h1>

							<motion.p
								animate={{ opacity: 1, y: 0 }}
								className="text-lg text-muted-foreground leading-relaxed sm:text-xl"
								initial={
									shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }
								}
								transition={{
									duration: shouldAnimate ? 0.8 : 0,
									delay: shouldAnimate ? 0.2 : 0,
									ease: [0.22, 1, 0.36, 1],
								}}
							>
								Explore the paradigm shift in React development. Learn server
								components, streaming, and React 19 features through interactive
								demos and real-world patterns that showcase the future of web
								applications.
							</motion.p>

							<motion.div
								animate={{ opacity: 1, y: 0 }}
								className="flex flex-wrap gap-4"
								initial={
									shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }
								}
								transition={{
									duration: shouldAnimate ? 0.8 : 0,
									delay: shouldAnimate ? 0.3 : 0,
									ease: [0.22, 1, 0.36, 1],
								}}
							>
								<Button className="group" size="lg">
									<Link className="flex items-center gap-2" href="/dashboard">
										Get Started
										<ArrowRightIcon
											className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1"
											weight="bold"
										/>
									</Link>
								</Button>
								<Button className="group" size="lg" variant="outline">
									<Link className="flex items-center gap-2" href="#features">
										<PlayIcon
											className="mr-2 size-4 transition-transform duration-300 group-hover:scale-110"
											weight="fill"
										/>
										Watch Demo
									</Link>
								</Button>
							</motion.div>
						</div>

						{/* Right Content - Animated Graph */}
						<motion.div
							animate={{ opacity: 1, scale: 1 }}
							className="relative"
							initial={
								shouldAnimate
									? { opacity: 0, scale: 0.9 }
									: { opacity: 1, scale: 1 }
							}
							style={{ scale: graphScale, y: graphY }}
							transition={{
								duration: shouldAnimate ? 1 : 0,
								delay: shouldAnimate ? 0.3 : 0,
								ease: [0.22, 1, 0.36, 1],
							}}
						>
							<div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border/50 bg-linear-to-br from-primary/5 via-primary/3 to-background p-8 shadow-2xl shadow-primary/5 backdrop-blur-sm">
								<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.03),transparent_50%)]" />
								<AnimatedGraph skipAnimation={!shouldAnimate} />
							</div>

							{/* Floating Stats */}
							<motion.div
								animate={{ y: [-2, 2, -2] }}
								className="absolute top-1/4 -right-4 rounded-xl border border-border/50 bg-background/95 p-4 shadow-primary/5 shadow-xl backdrop-blur-xl"
								initial={
									shouldAnimate
										? { opacity: 0, scale: 0.8, y: 20 }
										: { opacity: 1, scale: 1, y: 0 }
								}
								transition={{
									y: {
										duration: 4,
										repeat: Number.POSITIVE_INFINITY,
										ease: "easeInOut",
									},
									opacity: {
										duration: shouldAnimate ? 0.6 : 0,
										delay: shouldAnimate ? 1.2 : 0,
									},
									scale: {
										duration: shouldAnimate ? 0.6 : 0,
										delay: shouldAnimate ? 1.2 : 0,
									},
								}}
								whileInView={{ opacity: 1, scale: 1, y: 0 }}
							>
								<div className="font-bold text-2xl text-primary">87%</div>
								<div className="text-muted-foreground text-xs">Faster Load</div>
							</motion.div>

							<motion.div
								animate={{ y: [2, -2, 2] }}
								className="absolute bottom-1/4 -left-4 rounded-xl border border-border/50 bg-background/95 p-4 shadow-primary/5 shadow-xl backdrop-blur-xl"
								initial={
									shouldAnimate
										? { opacity: 0, scale: 0.8, y: -20 }
										: { opacity: 1, scale: 1, y: 0 }
								}
								transition={{
									y: {
										duration: 3.5,
										repeat: Number.POSITIVE_INFINITY,
										ease: "easeInOut",
									},
									opacity: {
										duration: shouldAnimate ? 0.6 : 0,
										delay: shouldAnimate ? 1.4 : 0,
									},
									scale: {
										duration: shouldAnimate ? 0.6 : 0,
										delay: shouldAnimate ? 1.4 : 0,
									},
								}}
								whileInView={{ opacity: 1, scale: 1, y: 0 }}
							>
								<div className="font-bold text-2xl text-primary">-60%</div>
								<div className="text-muted-foreground text-xs">Bundle Size</div>
							</motion.div>
						</motion.div>
					</div>
				</div>

				{/* Background Elements */}
				<div className="pointer-events-none absolute inset-0 overflow-hidden">
					<motion.div
						animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.05, 0.03] }}
						className="absolute top-1/4 -right-1/4 size-96 rounded-full bg-primary blur-3xl"
						transition={{
							duration: 8,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					/>
					<motion.div
						animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
						className="absolute bottom-1/4 -left-1/4 size-96 rounded-full bg-primary blur-3xl"
						transition={{
							duration: 10,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					/>
				</div>
			</motion.section>

			{/* Features Section */}
			<section className="relative bg-background py-32">
				<div className="container mx-auto max-w-7xl px-4">
					<ScrollReveal>
						<div className="mb-20 text-center">
							<h2 className="mb-4 font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
								Powerful React Server Components
							</h2>
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
								Discover the cutting-edge features that make React Server
								Components the future of modern web development.
							</p>
						</div>
					</ScrollReveal>

					<StaggerReveal>
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
							{FEATURES.map((feature) => (
								<StaggerItem key={feature.title}>
									<motion.div
										className="group relative h-full overflow-hidden rounded-xl border border-border/50 bg-linear-to-br from-card to-background p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
										transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
										whileHover={{ y: -4 }}
									>
										<motion.div
											className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/15 to-primary/5 text-primary"
											transition={{ duration: 0.3 }}
											whileHover={{ scale: 1.1, rotate: 5 }}
										>
											<feature.icon className="size-6" weight="duotone" />
										</motion.div>
										<h3 className="mb-3 font-semibold text-foreground text-lg">
											{feature.title}
										</h3>
										<p className="text-muted-foreground text-sm leading-relaxed">
											{feature.description}
										</p>
									</motion.div>
								</StaggerItem>
							))}
						</div>
					</StaggerReveal>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="relative bg-linear-to-b from-muted/30 to-background py-32">
				<div className="container mx-auto max-w-7xl px-4">
					<ScrollReveal>
						<div className="mb-20 text-center">
							<h2 className="mb-4 font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
								Your Learning Journey
							</h2>
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
								Four progressive steps to master React Server Components and
								build high-performance applications.
							</p>
						</div>
					</ScrollReveal>

					<div className="relative">
						{/* Progress Line */}
						<motion.div
							className="absolute top-0 left-8 h-full w-0.5 origin-top bg-linear-to-b from-primary/40 via-primary/20 to-transparent md:left-1/2"
							initial={{ scaleY: 0 }}
							transition={{
								duration: 1.2,
								delay: 0.3,
								ease: [0.22, 1, 0.36, 1],
							}}
							viewport={{ once: true }}
							whileInView={{ scaleY: 1 }}
						/>

						<div className="space-y-24">
							{STEPS.map((step, index) => (
								<ScrollReveal delay={index * 0.15} key={step.number}>
									<div className="relative grid gap-8 md:grid-cols-2 md:items-start">
										{/* Number Circle */}
										<motion.div
											className="absolute top-0 left-8 z-10 flex size-16 items-center justify-center rounded-full border-4 border-border bg-background font-bold text-2xl text-primary shadow-lg shadow-primary/10 md:left-1/2 md:-translate-x-1/2"
											initial={{ scale: 0, rotate: -180 }}
											transition={{
												duration: 0.6,
												delay: index * 0.15 + 0.2,
												ease: [0.22, 1, 0.36, 1],
											}}
											viewport={{ once: true }}
											whileInView={{ scale: 1, rotate: 0 }}
										>
											{step.number}
										</motion.div>

										{/* Content - Left on even, Right on odd */}
										<div
											className={`ml-24 md:ml-0 ${
												index % 2 === 0
													? "md:order-1 md:pr-12 md:text-right"
													: "md:order-2 md:pl-12 md:text-left"
											}`}
										>
											<h3 className="mb-3 font-bold text-2xl text-foreground">
												{step.title}
											</h3>
											<p className="text-muted-foreground leading-relaxed">
												{step.description}
											</p>
										</div>

										{/* Visual - Right on even, Left on odd */}
										<div
											className={`ml-24 md:ml-0 ${
												index % 2 === 0
													? "md:order-2 md:pl-12"
													: "md:order-1 md:pr-12"
											}`}
										>
											<motion.div
												className="aspect-video rounded-xl border border-border/50 bg-linear-to-br from-primary/10 via-primary/5 to-background shadow-lg"
												initial={{ opacity: 0, scale: 0.9 }}
												transition={{
													duration: 0.6,
													delay: index * 0.15 + 0.3,
													ease: [0.22, 1, 0.36, 1],
												}}
												viewport={{ once: true }}
												whileInView={{ opacity: 1, scale: 1 }}
											/>
										</div>
									</div>
								</ScrollReveal>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="relative bg-background py-32">
				<div className="container mx-auto max-w-4xl px-4 text-center">
					<ScrollReveal>
						<div className="space-y-8">
							<h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl lg:text-5xl">
								Ready to Build Faster Apps?
							</h2>
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
								Join developers mastering React Server Components and creating
								ultra-fast, modern web applications.
							</p>
							<div className="flex flex-wrap items-center justify-center gap-4">
								<Button className="group" size="lg">
									<Link className="flex items-center gap-2" href="/dashboard">
										Start Learning Now
										<ArrowRightIcon
											className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1"
											weight="bold"
										/>
									</Link>
								</Button>
								<Button size="lg" variant="outline">
									<Link className="flex items-center gap-2" href="/about">
										Learn More
									</Link>
								</Button>
							</div>
						</div>
					</ScrollReveal>
				</div>

				{/* Background Glow */}
				<div className="pointer-events-none absolute inset-0 overflow-hidden">
					<motion.div
						animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
						className="absolute top-1/2 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary blur-3xl"
						transition={{
							duration: 8,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					/>
				</div>
			</section>
		</div>
	);
}
