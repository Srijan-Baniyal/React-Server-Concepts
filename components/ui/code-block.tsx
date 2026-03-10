import { cn } from "@/lib/Utils";

// ─── Tokenizer ──────────────────────────────────────────────────────────────

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

// ─── Component ──────────────────────────────────────────────────────────────

interface CodeBlockProps {
	/** Badge text displayed in the title bar (e.g. "server", "client") */
	badge?: string;
	/** Custom className for the badge */
	badgeClassName?: string;
	/** Pre-rendered children — bypasses auto-highlighting (e.g. manually colored JSX) */
	children?: React.ReactNode;
	/** Additional className applied to the root container */
	className?: string;
	/** Raw code string — auto syntax-highlighted via built-in tokenizer */
	code?: string;
	/** Filename shown in the macOS-style title bar. Triggers the header when set. */
	filename?: string;
	/** Show line numbers alongside code lines (only works with `code` prop) */
	showLineNumbers?: boolean;
	/**
	 * Visual variant:
	 * - `"dark"` — Dark background with glowing border and macOS chrome (featured code)
	 * - `"muted"` — Subtle muted background, no header (inline code blocks)
	 * - `"outlined"` — Themed border with macOS chrome header (documentation code windows)
	 */
	variant?: "dark" | "muted" | "outlined";
}

const ROOT_STYLES = {
	dark: "rounded-xl border border-white/10 bg-zinc-950 shadow-2xl",
	muted: "overflow-hidden rounded-md bg-muted/30 dark:bg-zinc-900/40",
	outlined: "overflow-hidden rounded-lg border border-border/50",
} as const;

const HEADER_STYLES = {
	dark: "border-white/10 border-b bg-zinc-900 px-4 py-2.5",
	muted: "",
	outlined:
		"flex items-center justify-between border-border/40 border-b bg-muted/60 px-4 py-2",
} as const;

const DOT_SIZES = {
	dark: "size-3",
	muted: "",
	outlined: "h-2.5 w-2.5",
} as const;

const DOT_COLORS = {
	dark: ["bg-red-500/80", "bg-yellow-500/80", "bg-green-500/80"],
	muted: [],
	outlined: ["bg-red-400/70", "bg-yellow-400/70", "bg-green-400/70"],
} as const;

const BODY_STYLES = {
	dark: "overflow-auto p-4",
	muted: "overflow-x-auto p-3",
	outlined: "bg-muted/30 p-4 dark:bg-zinc-900/40",
} as const;

const PRE_STYLES = {
	dark: "leading-6",
	muted: "leading-relaxed",
	outlined: "overflow-x-auto leading-relaxed",
} as const;

export function CodeBlock({
	code,
	children,
	filename,
	badge,
	badgeClassName,
	showLineNumbers = false,
	variant = "dark",
	className,
}: CodeBlockProps) {
	const showHeader = !!filename && variant !== "muted";
	const lines = code?.split("\n");

	return (
		<div className={cn("font-mono text-xs", ROOT_STYLES[variant], className)}>
			{showHeader && (
				<div
					className={cn(
						"flex shrink-0 items-center gap-2",
						HEADER_STYLES[variant]
					)}
				>
					<div className="flex items-center gap-2">
						<div className="flex gap-1.5">
							{DOT_COLORS[variant].map((color, i) => (
								<div
									className={cn("rounded-full", DOT_SIZES[variant], color)}
									// biome-ignore lint/suspicious/noArrayIndexKey: static dot list
									key={i}
								/>
							))}
						</div>
						<span
							className={cn(
								"select-none text-xs",
								variant === "dark"
									? "ml-1 text-slate-400"
									: "font-mono text-muted-foreground"
							)}
						>
							{filename}
						</span>
					</div>
					{badge && (
						<span
							className={cn(
								"ml-auto rounded px-2 py-0.5 font-mono text-xs",
								badgeClassName
							)}
						>
							{badge}
						</span>
					)}
				</div>
			)}

			<div className={BODY_STYLES[variant]}>
				<pre className={PRE_STYLES[variant]}>
					{code && lines
						? lines.map((line, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: static code lines
								<div className="flex" key={i}>
									{showLineNumbers && (
										<span className="mr-4 w-5 shrink-0 select-none text-right text-slate-600">
											{i + 1}
										</span>
									)}
									<span>
										{tokenizeLine(line).map((tok, j) => (
											// biome-ignore lint/suspicious/noArrayIndexKey: static token order
											<span className={tok.cls} key={j}>
												{tok.text}
											</span>
										))}
									</span>
								</div>
							))
						: children}
				</pre>
			</div>
		</div>
	);
}
