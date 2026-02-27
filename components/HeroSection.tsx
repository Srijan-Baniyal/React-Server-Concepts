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
	type HTMLMotionProps,
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
import { cn } from "@/lib/Utils";

interface Node {
	id: string;
	label: string;
	scale: number;
	x: number;
	y: number;
}

interface Edge {
	from: string;
	progress: number;
	to: string;
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
	description: string;
	icon: ComponentType<{
		className?: string;
		weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
	}>;
	title: string;
}

interface Step {
	description: string;
	number: string;
	title: string;
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

const STEP_FILENAMES = [
	"UserProfile.tsx",
	"LikeButton.tsx",
	"Dashboard.tsx",
	"EditForm.tsx",
] as const;

const STEP_SNIPPETS = [
	// Step 01 – Server Components
	`// No 'use client' — zero bundle cost
async function UserProfile({ id }: { id: string }) {
  const user = await db.users.findById(id)
  const posts = await db.posts.byUser(id)

  return (
    <article className="profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <PostList posts={posts} />
    </article>
  )
}`,

	// Step 02 – Client Boundaries
	`'use client'

function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false)

  return (
    <button
      onClick={() => setLiked(!liked)}
      className="flex items-center gap-2"
    >
      {liked ? '❤️ Liked' : '🤍 Like'}
    </button>
  )
}`,

	// Step 03 – Data Fetching Patterns
	`async function Dashboard() {
  // Parallel fetch — no waterfalls
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts(),
  ])

  return <UserDashboard user={user} posts={posts} />
}

// Stream with Suspense boundary
<Suspense fallback={<DashboardSkeleton />}>
  <Dashboard />
</Suspense>`,

	// Step 04 – React 19 Features
	`const [state, action, isPending] =
  useActionState(
    async (prev: State, formData: FormData) => {
      const name = formData.get('username')
      await updateProfile(name)
      return { status: 'success', name }
    },
    { status: 'idle' }
  )

// No useState, no loading flags —
// React tracks it all automatically`,
] as const;

const HERO_STATS = [
	{ label: "Faster TTFB", value: "87%" },
	{ label: "Less JS Bundle", value: "−60%" },
	{ label: "Type Safe", value: "100%" },
] as const;

// Syntax-highlighting helpers
const CODE_KEYWORDS = new Set([
	"async",
	"function",
	"const",
	"let",
	"var",
	"return",
	"await",
	"true",
	"false",
	"null",
	"undefined",
	"import",
	"export",
	"default",
	"from",
	"new",
	"typeof",
	"if",
	"else",
	"class",
	"extends",
	"interface",
	"type",
]);

const RE_COMMENT = /^\s*\//;
const RE_DIRECTIVE = /^\s*['"]use (client|server)['"]\s*;?\s*$/;
const RE_CAPITAL = /^[A-Z]/;
const RE_TOKEN =
	/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(<\/?[A-Za-z][A-Za-z0-9.]*(?:\s*\/>)?\s*>?)|([A-Za-z_$][A-Za-z0-9_$]*)|([0-9]+(?:\.[0-9]+)?)|([\s\S])/g;

function tokenizeLine(line: string): Array<{ cls: string; text: string }> {
	if (RE_COMMENT.test(line) && line.trimStart().startsWith("//")) {
		return [{ text: line, cls: "text-slate-500 italic" }];
	}
	if (RE_DIRECTIVE.test(line)) {
		return [{ text: line, cls: "text-amber-400" }];
	}
	const tokens: Array<{ cls: string; text: string }> = [];
	const re = new RegExp(RE_TOKEN.source, "g");
	let m: RegExpExecArray | null;
	// biome-ignore lint/suspicious/noAssignInExpressions: intentional regex loop
	while ((m = re.exec(line)) !== null) {
		const [, str, tag, ident, num] = m;
		if (str) {
			tokens.push({ text: str, cls: "text-amber-400" });
		} else if (tag) {
			tokens.push({ text: tag, cls: "text-blue-400" });
		} else if (ident) {
			if (CODE_KEYWORDS.has(ident)) {
				tokens.push({ text: ident, cls: "text-purple-400" });
			} else if (RE_CAPITAL.test(ident)) {
				tokens.push({ text: ident, cls: "text-cyan-400" });
			} else {
				tokens.push({ text: ident, cls: "text-slate-200" });
			}
		} else if (num) {
			tokens.push({ text: num, cls: "text-emerald-400" });
		} else {
			tokens.push({ text: m[0], cls: "text-slate-400" });
		}
	}
	return tokens;
}

function StepCodeBlock({ code, filename }: { code: string; filename: string }) {
	const lines = code.split("\n");
	return (
		<div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-950 font-mono text-xs shadow-2xl">
			{/* macOS-style header */}
			<div className="flex shrink-0 items-center gap-2 border-white/10 border-b bg-zinc-900 px-4 py-2.5">
				<div className="flex gap-1.5">
					<div className="size-3 rounded-full bg-red-500/80" />
					<div className="size-3 rounded-full bg-yellow-500/80" />
					<div className="size-3 rounded-full bg-green-500/80" />
				</div>
				<span className="ml-3 select-none text-slate-400 text-xs">
					{filename}
				</span>
			</div>
			{/* Code lines */}
			<div className="overflow-auto p-4">
				<pre className="leading-6">
					{lines.map((line, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: static code snippet lines never reorder
						<div className="flex" key={i}>
							<span className="mr-4 w-5 shrink-0 select-none text-right text-slate-600">
								{i + 1}
							</span>
							<span>
								{tokenizeLine(line).map((tok, j) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: static token order is stable
									<span className={tok.cls} key={j}>
										{tok.text}
									</span>
								))}
							</span>
						</div>
					))}
				</pre>
			</div>
		</div>
	);
}

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
	const isInView = useInView(ref, { once: false, margin: "-80px" });

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
	const isInView = useInView(ref, { once: false, margin: "-80px" });

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

// Section Label
function SectionLabel({ label }: { label: string }) {
	return (
		<motion.div
			className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5"
			whileHover={{ scale: 1.04 }}
		>
			<span className="size-1.5 rounded-full bg-primary" />
			<span className="font-semibold text-primary text-xs uppercase tracking-widest">
				{label}
			</span>
		</motion.div>
	);
}

// Magnetic Button Component
const MagneticButton = ({
	children,
	className,
	...props
}: HTMLMotionProps<"button">) => {
	const ref = useRef<HTMLButtonElement>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e: React.MouseEvent) => {
		const { clientX, clientY } = e;
		if (!ref.current) {
			return;
		}
		const { left, top, width, height } = ref.current.getBoundingClientRect();
		const x = clientX - (left + width / 2);
		const y = clientY - (top + height / 2);
		setPosition({ x: x * 0.3, y: y * 0.3 });
	};

	const handleMouseLeave = () => {
		setPosition({ x: 0, y: 0 });
	};

	return (
		<motion.button
			animate={{ x: position.x, y: position.y }}
			className={className}
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
			ref={ref}
			transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
			{...props}
		>
			{children}
		</motion.button>
	);
};

// Staggered Text Component
const StaggeredText = ({
	text,
	className,
	delay = 0,
}: {
	text: string;
	className?: string;
	delay?: number;
}) => {
	const chars = text.split("").map((char, i) => ({ char, index: i }));
	return (
		<span className={cn("inline-block", className)}>
			{chars.map(({ char, index }) => (
				<motion.span
					animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					className="inline-block"
					initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
					key={`${char}-${index}`}
					transition={{
						duration: 0.4,
						delay: delay + index * 0.03,
						ease: "easeOut",
					}}
				>
					{char === " " ? "\u00A0" : char}
				</motion.span>
			))}
		</span>
	);
};

// Main Hero Section Component
export default function HeroSection() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ target: containerRef });
	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: ANIMATION_CONFIG.SCROLL_SPRING_CONFIG.stiffness,
		damping: ANIMATION_CONFIG.SCROLL_SPRING_CONFIG.damping,
	});

	const heroY = useTransform(smoothProgress, [0, 1], [0, -60]);
	const heroOpacity = useTransform(smoothProgress, [0, 0.45], [1, 0]);
	const graphScale = useTransform(smoothProgress, [0, 0.5], [1, 0.93]);
	const graphY = useTransform(smoothProgress, [0, 0.5], [0, 18]);

	return (
		<div className="relative overflow-hidden bg-background" ref={containerRef}>
			{/* ── HERO ── */}
			<motion.section
				className="relative flex min-h-screen items-center justify-center px-4 py-24 sm:py-28"
				style={{ y: heroY, opacity: heroOpacity }}
			>
				{/* Layered background */}
				<div className="pointer-events-none absolute inset-0">
					<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-size-[28px_28px]" />
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,hsl(var(--primary)/0.12),transparent)]" />
					<motion.div
						animate={{ scale: [1, 1.25, 1], opacity: [0.06, 0.14, 0.06] }}
						className="absolute top-1/4 -right-1/4 size-[600px] rounded-full bg-primary blur-[120px]"
						transition={{
							duration: 16,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					/>
					<motion.div
						animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.1, 0.04] }}
						className="absolute bottom-1/4 -left-1/4 size-[700px] rounded-full bg-primary blur-[140px]"
						transition={{
							duration: 22,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					/>
				</div>

				<div className="container relative z-10 mx-auto max-w-7xl">
					<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
						{/* ── Left: Copy ── */}
						<div className="flex flex-col gap-7">
							{/* Eyebrow badge */}
							<motion.div
								animate={{ opacity: 1, y: 0 }}
								initial={{ opacity: 0, y: 16 }}
								transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
							>
								<span className="inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/8 px-4 py-2 font-semibold text-primary text-sm shadow-[0_0_20px_hsl(var(--primary)/0.15)] backdrop-blur-sm">
									<motion.span
										animate={{ opacity: [1, 0.3, 1] }}
										className="size-2 rounded-full bg-primary"
										transition={{
											duration: 2,
											repeat: Number.POSITIVE_INFINITY,
										}}
									/>
									React 19 · Next.js 15 · RSC
								</span>
							</motion.div>

							{/* Headline */}
							<div>
								<h1 className="font-extrabold leading-[1.06] tracking-tight">
									<span className="block text-4xl text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
										<StaggeredText
											className="text-6xl"
											delay={0.15}
											text="Master React Server"
										/>
									</span>
									<span className="mt-1 block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
										<span className="relative inline-block">
											<StaggeredText
												className="bg-linear-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-6xl text-primary"
												delay={0.35}
												text="Components"
											/>
											<motion.span
												animate={{ scaleX: 1 }}
												className="absolute -bottom-1.5 left-0 -z-10 h-3 w-full origin-left -rotate-1 rounded-full bg-primary/15"
												initial={{ scaleX: 0 }}
												transition={{
													delay: 1.2,
													duration: 0.9,
													ease: "circOut",
												}}
											/>
										</span>
									</span>
								</h1>
							</div>

							{/* Description */}
							<motion.p
								animate={{ opacity: 1, y: 0 }}
								className="max-w-lg text-lg text-muted-foreground leading-relaxed sm:text-xl"
								initial={{ opacity: 0, y: 16 }}
								transition={{
									duration: 0.8,
									delay: 0.5,
									ease: [0.22, 1, 0.36, 1],
								}}
							>
								Explore the paradigm shift in React development. Learn server
								components, streaming, and React 19 features through{" "}
								<span className="font-semibold text-foreground">
									interactive demos
								</span>{" "}
								and{" "}
								<span className="font-semibold text-foreground">
									real-world patterns
								</span>
								.
							</motion.p>

							{/* CTAs */}
							<motion.div
								animate={{ opacity: 1, y: 0 }}
								className="flex flex-wrap gap-3 sm:gap-4"
								initial={{ opacity: 0, y: 16 }}
								transition={{
									duration: 0.8,
									delay: 0.62,
									ease: [0.22, 1, 0.36, 1],
								}}
							>
								<MagneticButton className="group relative overflow-hidden rounded-full bg-primary px-7 py-3.5 font-semibold text-base text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/40 hover:shadow-xl sm:px-8 sm:py-4">
									<span className="absolute inset-0 -translate-x-full skew-x-12 bg-white/15 transition-transform duration-700 group-hover:translate-x-full" />
									<Link
										className="relative z-10 flex items-center gap-2"
										href="/learning/architecture"
									>
										Get Started
										<ArrowRightIcon
											className="size-5 transition-transform duration-300 group-hover:translate-x-1"
											weight="bold"
										/>
									</Link>
								</MagneticButton>

								<MagneticButton className="group flex items-center gap-2 rounded-full border-2 border-border bg-background/60 px-7 py-3.5 font-semibold text-base text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 sm:px-8 sm:py-4">
									<Link
										className="flex items-center gap-2"
										href="/concepts/server-components"
									>
										<span className="flex size-6 items-center justify-center rounded-full bg-primary/15 transition-all duration-300 group-hover:bg-primary/25">
											<PlayIcon className="size-3 text-primary" weight="fill" />
										</span>
										Watch Demo
									</Link>
								</MagneticButton>
							</motion.div>

							{/* Stats strip */}
							<motion.div
								animate={{ opacity: 1, y: 0 }}
								className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1"
								initial={{ opacity: 0, y: 12 }}
								transition={{
									duration: 0.8,
									delay: 0.75,
									ease: [0.22, 1, 0.36, 1],
								}}
							>
								{HERO_STATS.map((stat, i) => (
									<div className="flex items-center gap-2" key={stat.label}>
										{i !== 0 && (
											<span className="hidden h-4 w-px bg-border sm:block" />
										)}
										<span className="font-bold text-base text-primary sm:text-lg">
											{stat.value}
										</span>
										<span className="text-muted-foreground text-sm">
											{stat.label}
										</span>
									</div>
								))}
							</motion.div>
						</div>

						{/* ── Right: Animated Graph Panel ── */}
						<motion.div
							animate={{ opacity: 1, scale: 1 }}
							className="relative z-10"
							initial={{ opacity: 0, scale: 0.92 }}
							style={{ scale: graphScale, y: graphY }}
							transition={{
								duration: 1.1,
								delay: 0.25,
								ease: [0.22, 1, 0.36, 1],
							}}
						>
							<motion.div
								className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border/60 bg-background/50 shadow-2xl backdrop-blur-xl"
								style={{ transformStyle: "preserve-3d" }}
								transition={{ type: "spring", stiffness: 350, damping: 28 }}
								whileHover={{ scale: 1.015, rotateY: 4, rotateX: -4 }}
							>
								<div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/12 via-transparent to-primary/6" />
								<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,hsl(var(--primary)/0.08),transparent_65%)]" />

								{/* Live indicator */}
								<div className="absolute top-5 left-5 z-10 flex items-center gap-2 rounded-full border border-border/50 bg-background/70 px-3 py-1.5 backdrop-blur-sm">
									<motion.span
										animate={{ opacity: [1, 0.3, 1] }}
										className="size-1.5 rounded-full bg-emerald-500"
										transition={{
											duration: 1.8,
											repeat: Number.POSITIVE_INFINITY,
										}}
									/>
									<span className="font-mono text-muted-foreground text-xs">
										RSC Architecture
									</span>
								</div>

								<div className="p-8 pt-16">
									<AnimatedGraph skipAnimation={false} />
								</div>
							</motion.div>

							{/* Floating stat pills — desktop only */}
							<motion.div
								animate={{ y: [-4, 4, -4] }}
								className="absolute top-[22%] -right-4 hidden rounded-2xl border border-border/50 bg-background/90 px-4 py-3 shadow-primary/8 shadow-xl backdrop-blur-xl lg:flex"
								initial={{ opacity: 0, x: 16 }}
								transition={{
									y: {
										duration: 4,
										repeat: Number.POSITIVE_INFINITY,
										ease: "easeInOut",
									},
									opacity: { duration: 0.5, delay: 1.3 },
									x: { duration: 0.5, delay: 1.3 },
								}}
								whileInView={{ opacity: 1, x: 0 }}
							>
								<div className="flex items-center gap-3">
									<div className="flex size-9 items-center justify-center rounded-xl bg-primary/12 text-primary">
										<LightningIcon className="size-4" weight="fill" />
									</div>
									<div>
										<div className="font-bold text-foreground text-xl leading-none">
											87%
										</div>
										<div className="mt-0.5 text-muted-foreground text-xs">
											Faster TTFB
										</div>
									</div>
								</div>
							</motion.div>

							<motion.div
								animate={{ y: [4, -4, 4] }}
								className="absolute bottom-[22%] -left-4 hidden rounded-2xl border border-border/50 bg-background/90 px-4 py-3 shadow-primary/8 shadow-xl backdrop-blur-xl lg:flex"
								initial={{ opacity: 0, x: -16 }}
								transition={{
									y: {
										duration: 3.6,
										repeat: Number.POSITIVE_INFINITY,
										ease: "easeInOut",
									},
									opacity: { duration: 0.5, delay: 1.5 },
									x: { duration: 0.5, delay: 1.5 },
								}}
								whileInView={{ opacity: 1, x: 0 }}
							>
								<div className="flex items-center gap-3">
									<div className="flex size-9 items-center justify-center rounded-xl bg-primary/12 text-primary">
										<CpuIcon className="size-4" weight="fill" />
									</div>
									<div>
										<div className="font-bold text-foreground text-xl leading-none">
											−60%
										</div>
										<div className="mt-0.5 text-muted-foreground text-xs">
											Bundle Size
										</div>
									</div>
								</div>
							</motion.div>

							{/* Glow ring behind card */}
							<div className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-3xl bg-primary/6 blur-3xl" />
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* ── FEATURES ── */}
			<section className="relative overflow-hidden bg-background py-28 sm:py-36">
				<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[44px_44px]" />
				<div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background to-transparent" />

				<div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
					<ScrollReveal>
						<div className="mb-16 flex flex-col items-center text-center sm:mb-20">
							<SectionLabel label="Features" />
							<h2 className="mb-5 font-extrabold text-3xl text-foreground tracking-tight sm:text-4xl lg:text-5xl">
								Everything you need to master RSC
							</h2>
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
								Discover the cutting-edge capabilities that make React Server
								Components the future of modern web development.
							</p>
						</div>
					</ScrollReveal>

					<StaggerReveal>
						<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
							{FEATURES.map((feature, idx) => (
								<StaggerItem key={feature.title}>
									<motion.div
										className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-7 transition-all duration-300 hover:border-primary/40 hover:shadow-primary/8 hover:shadow-xl"
										whileHover={{ y: -6 }}
									>
										{/* Top accent shimmer */}
										<div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

										{/* Ghost number */}
										<span className="mb-5 self-start font-black font-mono text-4xl text-primary/8 tabular-nums leading-none transition-colors duration-300 group-hover:text-primary/18">
											{String(idx + 1).padStart(2, "0")}
										</span>

										{/* Icon */}
										<div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-primary/15 bg-primary/8 text-primary transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/15">
											<feature.icon className="size-6" weight="duotone" />
										</div>

										<h3 className="mb-3 font-bold text-foreground text-lg">
											{feature.title}
										</h3>
										<p className="flex-1 text-muted-foreground text-sm leading-relaxed">
											{feature.description}
										</p>

										{/* Bottom slide bar */}
										<div className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-primary transition-all duration-500 group-hover:w-full" />
									</motion.div>
								</StaggerItem>
							))}
						</div>
					</StaggerReveal>
				</div>
			</section>

			{/* ── JOURNEY ── */}
			<section className="relative overflow-hidden py-28 sm:py-36">
				<div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background via-muted/20 to-background" />
				<div className="pointer-events-none absolute top-0 right-0 -z-10 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/5 blur-[120px]" />
				<div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] -translate-x-1/3 translate-y-1/3 rounded-full bg-primary/5 blur-[120px]" />

				<div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
					<ScrollReveal>
						<div className="mb-16 flex flex-col items-center text-center sm:mb-20">
							<SectionLabel label="Journey" />
							<h2 className="mb-5 font-extrabold text-3xl text-foreground tracking-tight sm:text-4xl lg:text-5xl">
								Your Learning Path
							</h2>
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
								Four progressive steps to master React Server Components and
								build high-performance applications.
							</p>
						</div>
					</ScrollReveal>

					<div className="space-y-20 sm:space-y-28">
						{STEPS.map((step, index) => (
							<ScrollReveal delay={index * 0.08} key={step.number}>
								<div
									className={cn(
										"grid items-center gap-8 sm:gap-12 lg:grid-cols-2",
										index % 2 === 1 && "lg:[&>*:first-child]:order-2"
									)}
								>
									{/* Text side */}
									<div className="flex flex-col gap-5">
										<div className="flex items-center gap-4">
											<motion.div
												className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary font-black text-primary-foreground text-xl shadow-lg shadow-primary/30"
												initial={{ scale: 0, rotate: -20 }}
												transition={{
													type: "spring",
													bounce: 0.45,
													delay: index * 0.12 + 0.2,
												}}
												viewport={{ once: true, margin: "-80px" }}
												whileHover={{ scale: 1.08, rotate: 4 }}
												whileInView={{ scale: 1, rotate: 0 }}
											>
												{step.number}
											</motion.div>
											<div className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
										</div>

										<div>
											<h3 className="mb-3 font-extrabold text-2xl text-foreground sm:text-3xl">
												{step.title}
											</h3>
											<p className="text-base text-muted-foreground leading-relaxed sm:text-lg">
												{step.description}
											</p>
										</div>

										<Link
											className="group inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-5 py-2.5 font-medium text-primary text-sm transition-all duration-300 hover:gap-3 hover:border-primary/40 hover:bg-primary/15"
											href="/learning/architecture"
										>
											Explore this step
											<ArrowRightIcon
												className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
												weight="bold"
											/>
										</Link>
									</div>

									{/* Code side */}
									<motion.div
										className="group relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
										initial={{
											opacity: 0,
											scale: 0.93,
											rotateY: index % 2 === 0 ? -12 : 12,
										}}
										style={{ transformPerspective: 1000 }}
										transition={{
											duration: 0.8,
											delay: index * 0.12 + 0.3,
											ease: [0.22, 1, 0.36, 1],
										}}
										viewport={{ once: true, margin: "-80px" }}
										whileHover={{ scale: 1.02 }}
										whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
									>
										<div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-br from-primary/15 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
										<StepCodeBlock
											code={STEP_SNIPPETS[index]}
											filename={STEP_FILENAMES[index]}
										/>
									</motion.div>
								</div>
							</ScrollReveal>
						))}
					</div>
				</div>
			</section>

			{/* ── CTA ── */}
			<section className="relative overflow-hidden py-32 sm:py-40">
				<div className="pointer-events-none absolute inset-0">
					<div className="absolute inset-0 bg-background" />
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,hsl(var(--primary)/0.13),transparent)]" />
					<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[32px_32px]" />
					<motion.div
						animate={{ scale: [1, 1.12, 1], opacity: [0.07, 0.13, 0.07] }}
						className="absolute top-1/2 left-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary blur-[160px]"
						transition={{
							duration: 11,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					/>
				</div>

				<div className="container relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
					<ScrollReveal>
						<motion.div
							className="relative overflow-hidden rounded-3xl border border-border/50 bg-background/60 px-8 py-14 text-center shadow-2xl backdrop-blur-xl sm:px-14 sm:py-20"
							transition={{ type: "spring", stiffness: 280 }}
							whileHover={{ scale: 1.008 }}
						>
							<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,hsl(var(--primary)/0.1),transparent)]" />
							<div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

							<div className="relative z-10 flex flex-col items-center gap-7">
								<motion.div
									animate={{ rotate: [0, 10, -10, 0] }}
									className="flex size-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 sm:size-20"
									transition={{
										duration: 4,
										repeat: Number.POSITIVE_INFINITY,
										ease: "easeInOut",
									}}
								>
									<SparkleIcon
										className="size-8 text-primary sm:size-10"
										weight="duotone"
									/>
								</motion.div>

								<div className="space-y-4">
									<h2 className="font-extrabold text-3xl text-foreground tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
										Ready to Build{" "}
										<span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
											Faster Apps?
										</span>
									</h2>
									<p className="mx-auto max-w-xl text-base text-muted-foreground leading-relaxed sm:text-lg">
										Join developers mastering React Server Components and
										creating ultra-fast, modern web applications.
									</p>
								</div>

								<div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:gap-4">
									<MagneticButton className="group relative w-full overflow-hidden rounded-full bg-primary px-8 py-4 font-semibold text-base text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/40 hover:shadow-xl sm:w-auto sm:px-10">
										<span className="absolute inset-0 -translate-x-full skew-x-12 bg-white/15 transition-transform duration-700 group-hover:translate-x-full" />
										<Link
											className="relative z-10 flex items-center justify-center gap-2"
											href="/learning/architecture"
										>
											Start Learning Now
											<ArrowRightIcon
												className="size-5 transition-transform duration-300 group-hover:translate-x-1"
												weight="bold"
											/>
										</Link>
									</MagneticButton>

									<MagneticButton className="group w-full rounded-full border-2 border-border bg-transparent px-8 py-4 font-semibold text-base text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/6 sm:w-auto sm:px-10">
										<Link
											className="flex items-center justify-center gap-2"
											href="/about"
										>
											Learn More
										</Link>
									</MagneticButton>
								</div>

								{/* Mini stat row */}
								<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2">
									{HERO_STATS.map((stat) => (
										<span
											className="flex items-center gap-1.5 text-muted-foreground text-sm"
											key={stat.label}
										>
											<span className="font-bold text-primary">
												{stat.value}
											</span>
											{stat.label}
										</span>
									))}
								</div>
							</div>
						</motion.div>
					</ScrollReveal>
				</div>
			</section>
		</div>
	);
}
