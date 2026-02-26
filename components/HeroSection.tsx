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
import { Button } from "@/components/ui/button";
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

	const heroY = useTransform(smoothProgress, [0, 1], [0, -80]);
	const heroOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
	const graphScale = useTransform(smoothProgress, [0, 0.5], [1, 0.92]);
	const graphY = useTransform(smoothProgress, [0, 0.5], [0, 20]);

	return (
		<div
			className="relative min-h-screen overflow-hidden bg-background"
			ref={containerRef}
		>
			{/* Dynamic Background */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]">
				<div className="absolute top-0 right-0 left-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
			</div>
			{/* Floating Particles Removed here as they are in WhimsicalBackground now, or kept for extra flair */}

			{/* Hero Section */}
			<motion.section
				className="relative flex min-h-screen items-center justify-center px-4 py-20"
				style={{ y: heroY, opacity: heroOpacity }}
			>
				<div className="container mx-auto max-w-7xl">
					<div className="grid items-center gap-16 lg:grid-cols-2">
						{/* Left Content */}
						<div className="relative z-10 space-y-8">
							<motion.div
								animate={{ opacity: 1, y: 0, scale: 1 }}
								className="inline-block"
								initial={{ opacity: 0, y: 20, scale: 0.9 }}
								transition={{
									duration: 0.8,
									ease: [0.22, 1, 0.36, 1],
								}}
							>
								<span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-medium text-primary text-sm shadow-[0_0_15px_rgba(var(--primary),0.2)] backdrop-blur-md">
									<SparkleIcon className="size-4 animate-pulse" weight="fill" />
									React Server Components
								</span>
							</motion.div>

							<div className="relative">
								<h1 className="font-extrabold text-3xl text-foreground leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
									<StaggeredText
										className="text-6xl"
										delay={0.2}
										text="Master React Server"
									/>
									<br />
									<span className="relative mt-2 inline-block">
										<span className="relative z-10 bg-linear-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
											Components
										</span>
										<motion.div
											animate={{ scaleX: 1 }}
											className="absolute -bottom-2 left-0 -z-10 h-4 w-full -rotate-2 bg-primary/10"
											initial={{ scaleX: 0 }}
											style={{ originX: 0 }}
											transition={{ delay: 1, duration: 0.8, ease: "circOut" }}
										/>
									</span>
								</h1>
							</div>

							<motion.p
								animate={{ opacity: 1, y: 0 }}
								className="max-w-xl text-muted-foreground text-xl leading-relaxed"
								initial={{ opacity: 0, y: 20 }}
								transition={{
									duration: 0.8,
									delay: 0.4,
									ease: [0.22, 1, 0.36, 1],
								}}
							>
								Explore the paradigm shift in React development. Learn server
								components, streaming, and React 19 features through interactive
								demos and real-world patterns.
							</motion.p>

							<motion.div
								animate={{ opacity: 1, y: 0 }}
								className="flex flex-wrap gap-4 pt-4"
								initial={{ opacity: 0, y: 20 }}
								transition={{
									duration: 0.8,
									delay: 0.5,
									ease: [0.22, 1, 0.36, 1],
								}}
							>
								<MagneticButton className="group relative overflow-hidden rounded-full bg-primary px-8 py-6 font-semibold text-lg text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-1 hover:shadow-primary/40">
									<span className="absolute inset-0 translate-x-full bg-linear-to-r from-primary/0 via-white/20 to-primary/0 transition-transform duration-1000 group-hover:translate-x-full" />
									<Link
										className="relative z-10 flex items-center gap-2"
										href="/learning/architecture"
									>
										Get Started
										<ArrowRightIcon
											className="ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1"
											weight="bold"
										/>
									</Link>
								</MagneticButton>
								<MagneticButton className="group rounded-full border-2 border-border bg-background px-8 py-6 font-semibold text-lg shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
									<Link className="flex items-center gap-2" href="/demo">
										<PlayIcon
											className="mr-2 size-5 text-primary transition-transform duration-300 group-hover:scale-110"
											weight="fill"
										/>
										Watch Demo
									</Link>
								</MagneticButton>
							</motion.div>
						</div>

						{/* Right Content - Animated Graph */}
						<motion.div
							animate={{ opacity: 1, scale: 1 }}
							className="relative z-10"
							initial={{ opacity: 0, scale: 0.9 }}
							style={{ scale: graphScale, y: graphY }}
							transition={{
								duration: 1,
								delay: 0.3,
								ease: [0.22, 1, 0.36, 1],
							}}
						>
							<motion.div
								className="perspective-1000 relative aspect-square w-full overflow-hidden rounded-3xl border border-border/50 bg-background/40 p-8 shadow-2xl backdrop-blur-xl"
								transition={{ type: "spring", stiffness: 400, damping: 30 }}
								whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
							>
								<div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-primary/5" />
								<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_60%)]" />
								<AnimatedGraph skipAnimation={false} />
							</motion.div>

							{/* Floating Stats */}
							<motion.div
								animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
								className="absolute top-1/4 -right-8 rounded-2xl border border-border/50 bg-background/80 p-5 shadow-2xl shadow-primary/10 backdrop-blur-xl"
								initial={{ opacity: 0, scale: 0.8, x: 20 }}
								transition={{
									y: {
										duration: 4,
										repeat: Number.POSITIVE_INFINITY,
										ease: "easeInOut",
									},
									rotate: {
										duration: 5,
										repeat: Number.POSITIVE_INFINITY,
										ease: "easeInOut",
									},
									opacity: {
										duration: 0.6,
										delay: 1.2,
									},
									scale: {
										duration: 0.6,
										delay: 1.2,
									},
								}}
								whileInView={{ opacity: 1, scale: 1, x: 0 }}
							>
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
										<LightningIcon className="size-5" weight="fill" />
									</div>
									<div>
										<div className="font-bold text-2xl text-foreground">
											87%
										</div>
										<div className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
											Faster Load
										</div>
									</div>
								</div>
							</motion.div>

							<motion.div
								animate={{ y: [5, -5, 5], rotate: [2, -2, 2] }}
								className="absolute bottom-1/4 -left-8 rounded-2xl border border-border/50 bg-background/80 p-5 shadow-2xl shadow-primary/10 backdrop-blur-xl"
								initial={{ opacity: 0, scale: 0.8, x: -20 }}
								transition={{
									y: {
										duration: 3.5,
										repeat: Number.POSITIVE_INFINITY,
										ease: "easeInOut",
									},
									rotate: {
										duration: 4.5,
										repeat: Number.POSITIVE_INFINITY,
										ease: "easeInOut",
									},
									opacity: {
										duration: 0.6,
										delay: 1.4,
									},
									scale: {
										duration: 0.6,
										delay: 1.4,
									},
								}}
								whileInView={{ opacity: 1, scale: 1, x: 0 }}
							>
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
										<CpuIcon className="size-5" weight="fill" />
									</div>
									<div>
										<div className="font-bold text-2xl text-foreground">
											-60%
										</div>
										<div className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
											Bundle Size
										</div>
									</div>
								</div>
							</motion.div>
						</motion.div>
					</div>
				</div>

				{/* Background Elements */}
				<div className="pointer-events-none absolute inset-0 overflow-hidden">
					<motion.div
						animate={{
							scale: [1, 1.2, 1],
							opacity: [0.03, 0.06, 0.03],
							rotate: [0, 90, 0],
						}}
						className="absolute top-1/4 -right-1/4 size-[500px] rounded-full bg-primary blur-[100px]"
						transition={{
							duration: 15,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					/>
					<motion.div
						animate={{
							scale: [1, 1.1, 1],
							opacity: [0.03, 0.08, 0.03],
							rotate: [0, -90, 0],
						}}
						className="absolute bottom-1/4 -left-1/4 size-[600px] rounded-full bg-primary blur-[120px]"
						transition={{
							duration: 20,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					/>
				</div>
			</motion.section>

			{/* Features Section */}
			<section className="relative overflow-hidden bg-background py-32">
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[40px_40px]" />
				<div className="container relative z-10 mx-auto max-w-7xl px-4">
					<ScrollReveal>
						<div className="mb-24 text-center">
							<motion.div
								className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1.5"
								whileHover={{ scale: 1.05 }}
							>
								<span className="font-semibold text-primary text-sm uppercase tracking-wide">
									Features
								</span>
							</motion.div>
							<h2 className="mb-6 font-extrabold text-4xl text-foreground tracking-tight sm:text-5xl">
								Powerful React Server Components
							</h2>
							<p className="mx-auto max-w-2xl text-muted-foreground text-xl leading-relaxed">
								Discover the cutting-edge features that make React Server
								Components the future of modern web development.
							</p>
						</div>
					</ScrollReveal>

					<StaggerReveal>
						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
							{FEATURES.map((feature, _idx) => (
								<StaggerItem key={feature.title}>
									<motion.div
										className="group relative h-full overflow-hidden rounded-3xl border border-border/50 bg-background/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
										whileHover={{ y: -8, scale: 1.02 }}
									>
										<div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

										<motion.div
											className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner"
											transition={{
												type: "spring",
												stiffness: 400,
												damping: 10,
											}}
											whileHover={{ scale: 1.1, rotate: 10 }}
										>
											<feature.icon className="size-7" weight="duotone" />
										</motion.div>
										<h3 className="mb-4 font-bold text-foreground text-xl">
											{feature.title}
										</h3>
										<p className="text-base text-muted-foreground leading-relaxed">
											{feature.description}
										</p>

										<div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
									</motion.div>
								</StaggerItem>
							))}
						</div>
					</StaggerReveal>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="relative overflow-hidden bg-linear-to-b from-background via-muted/30 to-background py-32">
				<div className="absolute top-1/4 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]" />
				<div className="absolute bottom-1/4 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]" />

				<div className="container mx-auto max-w-7xl px-4">
					<ScrollReveal>
						<div className="mb-24 text-center">
							<motion.div
								className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1.5"
								whileHover={{ scale: 1.05 }}
							>
								<span className="font-semibold text-primary text-sm uppercase tracking-wide">
									Journey
								</span>
							</motion.div>
							<h2 className="mb-6 font-extrabold text-4xl text-foreground tracking-tight sm:text-5xl">
								Your Learning Journey
							</h2>
							<p className="mx-auto max-w-2xl text-muted-foreground text-xl leading-relaxed">
								Four progressive steps to master React Server Components and
								build high-performance applications.
							</p>
						</div>
					</ScrollReveal>

					<div className="relative">
						{/* Progress Line */}
						<motion.div
							className="absolute top-0 left-8 h-full w-1 origin-top rounded-full bg-linear-to-b from-primary/40 via-primary/20 to-transparent md:left-1/2 md:-translate-x-1/2"
							initial={{ scaleY: 0 }}
							transition={{
								duration: 1.5,
								delay: 0.3,
								ease: [0.22, 1, 0.36, 1],
							}}
							viewport={{ once: true, margin: "-100px" }}
							whileInView={{ scaleY: 1 }}
						/>

						<div className="space-y-32">
							{STEPS.map((step, index) => (
								<ScrollReveal delay={index * 0.1} key={step.number}>
									<div className="relative grid gap-12 md:grid-cols-2 md:items-center">
										{/* Number Circle */}
										<motion.div
											className="absolute top-0 left-8 z-10 flex size-16 items-center justify-center rounded-full border-4 border-background bg-primary font-black text-2xl text-primary-foreground shadow-primary/20 shadow-xl md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
											initial={{ scale: 0, rotate: -180 }}
											transition={{
												duration: 0.8,
												delay: index * 0.15 + 0.2,
												type: "spring",
												bounce: 0.4,
											}}
											viewport={{ once: true, margin: "-100px" }}
											whileHover={{ scale: 1.1, rotate: 10 }}
											whileInView={{ scale: 1, rotate: 0 }}
										>
											{step.number}
										</motion.div>

										{/* Content - Left on even, Right on odd */}
										<div
											className={`ml-24 md:ml-0 ${index % 2 === 0 ? "md:order-1 md:pr-16 md:text-right" : "md:order-2 md:pl-16 md:text-left"}`}
										>
											<motion.div
												transition={{ type: "spring", stiffness: 300 }}
												whileHover={{ x: index % 2 === 0 ? -10 : 10 }}
											>
												<h3 className="mb-4 font-extrabold text-3xl text-foreground">
													{step.title}
												</h3>
												<p className="text-lg text-muted-foreground leading-relaxed">
													{step.description}
												</p>
											</motion.div>
										</div>

										{/* Visual - Right on even, Left on odd */}
										<div
											className={`ml-24 md:ml-0 ${index % 2 === 0 ? "md:order-2 md:pl-16" : "md:order-1 md:pr-16"}`}
										>
											<motion.div
												className="group relative aspect-video overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
												initial={{
													opacity: 0,
													scale: 0.9,
													rotateY: index % 2 === 0 ? -15 : 15,
												}}
												style={{ transformPerspective: 1000 }}
												transition={{
													duration: 0.8,
													delay: index * 0.15 + 0.3,
													ease: [0.22, 1, 0.36, 1],
												}}
												viewport={{ once: true, margin: "-100px" }}
												whileHover={{ scale: 1.05, zIndex: 10 }}
												whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
											>
												<div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-tr from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
												<StepCodeBlock
													code={STEP_SNIPPETS[index]}
													filename={STEP_FILENAMES[index]}
												/>
											</motion.div>
										</div>
									</div>
								</ScrollReveal>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="relative overflow-hidden bg-background py-40">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_70%)]" />

				<div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
					<ScrollReveal>
						<motion.div
							className="space-y-10 rounded-3xl border border-border/50 bg-background/50 p-12 shadow-2xl backdrop-blur-xl"
							transition={{ type: "spring", stiffness: 300 }}
							whileHover={{ scale: 1.01 }}
						>
							<div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-4">
								<SparkleIcon
									className="size-8 animate-pulse text-primary"
									weight="fill"
								/>
							</div>
							<h2 className="font-extrabold text-4xl text-foreground tracking-tight sm:text-5xl lg:text-6xl">
								Ready to Build Faster Apps?
							</h2>
							<p className="mx-auto max-w-2xl text-muted-foreground text-xl leading-relaxed">
								Join developers mastering React Server Components and creating
								ultra-fast, modern web applications.
							</p>
							<div className="flex flex-wrap items-center justify-center gap-6 pt-4">
								<Button
									className="group relative overflow-hidden rounded-full px-10 py-7 text-lg shadow-primary/25 shadow-xl transition-all hover:-translate-y-1 hover:shadow-primary/40"
									size="lg"
								>
									<span className="absolute inset-0 translate-x-full bg-linear-to-r from-primary/0 via-white/20 to-primary/0 transition-transform duration-1000 group-hover:translate-x-full" />
									<Link
										className="relative z-10 flex items-center gap-2"
										href="/learning/architecture"
									>
										Start Learning Now
										<ArrowRightIcon
											className="ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1"
											weight="bold"
										/>
									</Link>
								</Button>
								<Button
									className="rounded-full border-2 px-10 py-7 text-lg hover:bg-primary/5"
									size="lg"
									variant="outline"
								>
									<Link className="flex items-center gap-2" href="/about">
										Learn More
									</Link>
								</Button>
							</div>
						</motion.div>
					</ScrollReveal>
				</div>

				{/* Background Glow */}
				<div className="pointer-events-none absolute inset-0 overflow-hidden">
					<motion.div
						animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
						className="absolute top-1/2 left-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary blur-[150px]"
						transition={{
							duration: 10,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					/>
				</div>
			</section>
		</div>
	);
}
