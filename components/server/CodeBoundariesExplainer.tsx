import { CompositionTreeFlow } from "@/components/flow";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function CodeWindow({
	filename,
	children,
	badge,
	badgeClass,
}: {
	filename: string;
	children: React.ReactNode;
	badge?: string;
	badgeClass?: string;
}) {
	return (
		<div className="overflow-hidden rounded-lg border border-border/50">
			<div className="flex items-center justify-between border-border/40 border-b bg-muted/60 px-4 py-2">
				<div className="flex items-center gap-2">
					<div className="flex gap-1.5">
						<div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
						<div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
						<div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
					</div>
					<span className="font-mono text-muted-foreground text-xs">
						{filename}
					</span>
				</div>
				{badge && (
					<span
						className={`rounded px-2 py-0.5 font-mono text-xs ${badgeClass}`}
					>
						{badge}
					</span>
				)}
			</div>
			<div className="bg-muted/30 p-4 dark:bg-zinc-900/40">
				<pre className="overflow-x-auto font-mono text-xs leading-relaxed">
					{children}
				</pre>
			</div>
		</div>
	);
}

// Tiny helpers for syntax token colours
const kw = (s: string) => (
	<span className="text-violet-600 dark:text-violet-400">{s}</span>
);
const fn = (s: string) => (
	<span className="text-blue-600 dark:text-blue-400">{s}</span>
);
const str = (s: string) => (
	<span className="text-orange-500 dark:text-amber-400">{s}</span>
);
const cmt = (s: string) => (
	<span className="text-muted-foreground/60 italic">{s}</span>
);
const type = (s: string) => (
	<span className="text-teal-600 dark:text-teal-400">{s}</span>
);
const punct = (s: string) => <span className="text-foreground/70">{s}</span>;

const SERVER_CAPABILITIES = [
	{
		title: "Direct Data Access",
		description: "Databases, file systems, and backend services — no API layer",
	},
	{
		title: "Secrets Stay Secret",
		description: "API keys and tokens never leave the server environment",
	},
	{
		title: "Zero Client JS",
		description: "Component code is never shipped to the browser",
	},
	{
		title: "Async by Default",
		description: "Await data directly in the component body with no hooks",
	},
];

const CLIENT_CAPABILITIES = [
	{
		title: "Interactivity",
		description: "onClick, onChange, form submissions, and all event handlers",
	},
	{
		title: "Local State",
		description: "useState, useReducer, and useContext for reactive UI",
	},
	{
		title: "Browser APIs",
		description: "window, localStorage, geolocation, and Web APIs",
	},
	{
		title: "Lifecycle Hooks",
		description: "useEffect for side effects, timers, and subscriptions",
	},
];

const BADGES = [
	"use client directive",
	"Serialization Boundary",
	"Zero Bundle Cost",
	"Server-First Rendering",
	"Async Components",
	"Client-Side State",
	"Browser APIs",
	"Component Composition",
];

export function CodeBoundariesExplainer() {
	return (
		<div className="space-y-10">
			{/* Hero */}
			<section className="space-y-6">
				<div className="flex items-center gap-4">
					<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/50 shadow-lg shadow-primary/20">
						<span className="text-3xl">⚡</span>
					</div>
					<div>
						<h1 className="font-bold text-5xl tracking-tight">
							Where Code Runs
						</h1>
						<p className="mt-2 max-w-2xl text-lg text-muted-foreground">
							The server/client boundary is the foundational mental model for
							React Server Components
						</p>
					</div>
				</div>

				<Card className="border-primary/20 bg-primary/5">
					<CardContent>
						<p className="text-lg leading-relaxed">
							In React's new model, every component has a{" "}
							<strong className="text-foreground">designated runtime</strong> —
							either the server or the browser. Server Components run once at
							request time with{" "}
							<strong className="text-primary">zero client bundle cost</strong>,
							while Client Components hydrate in the browser and power all
							interactivity. The boundary between them is called the{" "}
							<strong className="text-primary">serialization boundary</strong>,
							and understanding it unlocks the full power of the RSC model.
						</p>
					</CardContent>
				</Card>

				<div className="flex flex-wrap gap-2">
					{BADGES.map((b) => (
						<Badge className="text-sm" key={b} variant="secondary">
							{b}
						</Badge>
					))}
				</div>
			</section>

			<Separator />

			{/* Runtime Environments */}
			<section className="space-y-4">
				<div>
					<h2 className="font-semibold text-3xl">Runtime Environments</h2>
					<p className="mt-1 text-muted-foreground">
						Each component type has a distinct set of capabilities and
						constraints.
					</p>
				</div>

				<div className="grid gap-6 lg:grid-cols-2">
					{/* Server */}
					<Card className="overflow-hidden border-green-500/20">
						<CardHeader className="border-green-500/10 border-b bg-green-500/5 px-6 py-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/15 text-xl">
										🖥
									</div>
									<CardTitle className="text-xl">Server Components</CardTitle>
								</div>
								<Badge
									className="bg-green-500/10 font-mono text-green-700 dark:text-green-400"
									variant="secondary"
								>
									default
								</Badge>
							</div>
						</CardHeader>
						<CardContent className="space-y-5 pt-6">
							<div className="space-y-3">
								{SERVER_CAPABILITIES.map((cap) => (
									<div className="flex items-start gap-3" key={cap.title}>
										<span className="mt-0.5 text-base text-green-600 dark:text-green-400">
											✓
										</span>
										<div>
											<p className="font-medium text-sm">{cap.title}</p>
											<p className="text-muted-foreground text-xs">
												{cap.description}
											</p>
										</div>
									</div>
								))}
							</div>

							<Separator />

							<div className="space-y-2">
								<p className="font-medium text-sm">Not available on server:</p>
								<ul className="space-y-1">
									{[
										"useState, useEffect, useContext",
										"Browser APIs (window, document)",
										"Event handlers (onClick, onChange)",
									].map((item) => (
										<li
											className="flex items-center gap-2 text-muted-foreground text-xs"
											key={item}
										>
											<span className="text-destructive">✗</span> {item}
										</li>
									))}
								</ul>
							</div>

							<CodeWindow
								badge="Server"
								badgeClass="bg-green-500/10 text-green-700 dark:text-green-400"
								filename="app/pokemon/page.tsx"
							>
								<code>
									{cmt("// No directive — Server Component by default\n")}
									{kw("async")} {kw("function")} {fn("PokemonPage")}
									{punct("() {\n")}
									{"  "}
									{cmt("// ✓ Direct DB — zero extra API layer\n")}
									{"  "}
									{kw("const")} {" list = "}
									{kw("await")}
									{" db"}
									{punct(".")}
									{fn("pokemon")}
									{punct(".")}
									{fn("findMany")}
									{punct("({\n")}
									{"    "}
									{"orderBy"}
									{punct(": { ")}
									{"name"}
									{punct(": ")}
									{str('"asc"')}
									{punct(" },\n")}
									{"  "}
									{punct(");\n\n")}
									{"  "}
									{cmt("// ✓ Secrets never reach the browser\n")}
									{"  "}
									{kw("const")} {" key = "}
									{"process"}
									{punct(".")}
									{fn("env")}
									{punct(".")}
									{type("STRIPE_KEY")}
									{punct(";\n\n")}
									{"  "}
									{kw("return")} {punct("<")}
									{fn("PokemonGrid")}
									{" list"}
									{punct("={")}
									{fn("list")}
									{punct("} />;\n")}
									{punct("}")}
								</code>
							</CodeWindow>
						</CardContent>
					</Card>

					{/* Client */}
					<Card className="overflow-hidden border-blue-500/20">
						<CardHeader className="border-blue-500/10 border-b bg-blue-500/5 px-6 py-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/15 text-xl">
										🌐
									</div>
									<CardTitle className="text-xl">Client Components</CardTitle>
								</div>
								<Badge
									className="bg-blue-500/10 font-mono text-blue-700 dark:text-blue-400"
									variant="secondary"
								>
									"use client"
								</Badge>
							</div>
						</CardHeader>
						<CardContent className="space-y-5 pt-6">
							<div className="space-y-3">
								{CLIENT_CAPABILITIES.map((cap) => (
									<div className="flex items-start gap-3" key={cap.title}>
										<span className="mt-0.5 text-base text-blue-600 dark:text-blue-400">
											✓
										</span>
										<div>
											<p className="font-medium text-sm">{cap.title}</p>
											<p className="text-muted-foreground text-xs">
												{cap.description}
											</p>
										</div>
									</div>
								))}
							</div>

							<Separator />

							<div className="space-y-2">
								<p className="font-medium text-sm">Not available on client:</p>
								<ul className="space-y-1">
									{[
										"Direct database / file-system access",
										"Backend-only Node.js libraries",
										"Environment secrets (exposed in bundle)",
									].map((item) => (
										<li
											className="flex items-center gap-2 text-muted-foreground text-xs"
											key={item}
										>
											<span className="text-destructive">✗</span> {item}
										</li>
									))}
								</ul>
							</div>

							<CodeWindow
								badge="Client"
								badgeClass="bg-blue-500/10 text-blue-700 dark:text-blue-400"
								filename="components/FavoriteButton.tsx"
							>
								<code>
									{str('"use client"')}
									{cmt("  // ← opts the file into the client bundle\n")}
									{kw("import")} {"{ useState }"} {kw("from")} {str('"react"')}
									{"\n\n"}
									{kw("function")} {fn("FavoriteButton")}
									{punct("() {\n")}
									{"  "}
									{cmt("// ✓ Client state — not possible on server\n")}
									{"  "}
									{kw("const")} {" [liked, setLiked] = "}
									{fn("useState")}
									{punct("(")}
									{"false"}
									{punct(");\n\n")}
									{"  "}
									{kw("return")} {punct("(\n")}
									{"    "}
									{punct("<")}
									{fn("button")}
									{" onClick"}
									{punct("={()=> ")}
									{fn("setLiked")}
									{punct("(!liked)}")}
									{"\n"}
									{"    "}
									{punct("  ")}
									{"className"}
									{punct("{liked ? ")}
									{str('"text-red-500"')}
									{punct(" : ")}
									{str('"text-gray-400"')}
									{punct("}\n")}
									{"    "}
									{punct(">")}
									{" {liked ? "}
									{str('"❤️"')}
									{" : "}
									{str('"🤍"')}
									{"} "}
									{punct("</")}
									{fn("button")}
									{punct(">\n")}
									{"  "}
									{punct(");\n")}
									{punct("}")}
								</code>
							</CodeWindow>
						</CardContent>
					</Card>
				</div>
			</section>

			<Separator />

			{/* Component tree composition */}
			<section className="space-y-4">
				<div>
					<h2 className="font-semibold text-3xl">Component Composition</h2>
					<p className="mt-1 text-muted-foreground">
						Server Components can render Client Components — the reverse is not
						allowed at the module level.
					</p>
				</div>

				<div className="grid gap-6 lg:grid-cols-5">
					{/* Tree visualization */}
					<Card className="border-border/40 bg-card/50 lg:col-span-3">
						<CardHeader className="px-5 pt-4 pb-2">
							<div className="flex items-center justify-between">
								<CardTitle className="text-base">Live Component Tree</CardTitle>
								<div className="flex items-center gap-3 text-muted-foreground text-xs">
									<span className="flex items-center gap-1.5">
										<span className="inline-block h-2 w-2 rounded-full bg-green-500/60" />
										Server
									</span>
									<span className="flex items-center gap-1.5">
										<span className="inline-block h-2 w-2 rounded-full bg-blue-500/60" />
										Client
									</span>
									<span className="flex items-center gap-1.5">
										<span className="inline-block h-2 w-2 rounded-full bg-yellow-500/60" />
										Boundary
									</span>
								</div>
							</div>
						</CardHeader>
						<CardContent className="px-5 pb-5">
							<CompositionTreeFlow />
						</CardContent>
					</Card>
					{/* Valid / Invalid patterns */}
					<div className="flex flex-col gap-4 lg:col-span-2">
						<Card className="flex flex-1 flex-col border-green-500/20 bg-green-500/5">
							<CardHeader className="px-5 pt-4 pb-3">
								<CardTitle className="flex items-center gap-2 text-green-700 text-sm dark:text-green-400">
									<span>✓</span> Valid Pattern
								</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-1 flex-col gap-4 px-5 pb-5">
								<ul className="space-y-1.5">
									{[
										"Server imports and renders Client Components",
										"Pass Server data to Client via serializable props",
										"Nest Client Components anywhere in the Server tree",
										"Pass Server Components as children to Client wrappers",
									].map((rule) => (
										<li
											className="flex items-start gap-2 text-muted-foreground text-xs"
											key={rule}
										>
											<span className="mt-px text-green-600 dark:text-green-400">
												✓
											</span>
											{rule}
										</li>
									))}
								</ul>
								<CodeWindow filename="app/page.tsx">
									<code>
										{cmt("// Server Component — no directive needed\n")}
										{kw("import")} {"{ FavoriteButton }"} {kw("from")}{" "}
										{str('"@/components/FavoriteButton"')}
										{"\n\n"}
										{kw("async")} {kw("function")} {fn("Page")}
										{punct("() {\n")}
										{"  "}
										{kw("const")} {" data = "}
										{kw("await")} {fn("fetchPokemon")}
										{punct("();\n")}
										{"  "}
										{kw("return")} {punct("(\n")}
										{"    "}
										{punct("<")}
										{fn("div")}
										{punct(">\n")}
										{"      "}
										{punct("<")}
										{fn("PokemonCard")}
										{" data"}
										{punct("={")}
										{"data"}
										{punct("} />")}
										{cmt("  {/* Server */}\n")}
										{"      "}
										{punct("<")}
										{fn("FavoriteButton")}
										{punct(" />")}
										{cmt("  {/* Client ✓ */}\n")}
										{"    "}
										{punct("</")}
										{fn("div")}
										{punct(">\n")}
										{"  "}
										{punct(");\n")}
										{punct("}")}
									</code>
								</CodeWindow>
							</CardContent>
						</Card>

						<Card className="flex flex-1 flex-col border-destructive/20 bg-destructive/5">
							<CardHeader className="px-5 pt-4 pb-3">
								<CardTitle className="flex items-center gap-2 text-destructive text-sm">
									<span>✗</span> Invalid Pattern
								</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-1 flex-col gap-4 px-5 pb-5">
								<ul className="space-y-1.5">
									{[
										"Client cannot import a Server Component directly",
										"Server-only code would be bundled into the client",
										"Database calls inside Client components break at runtime",
										"Fix: pass Server Component as children prop instead",
									].map((rule) => (
										<li
											className="flex items-start gap-2 text-muted-foreground text-xs"
											key={rule}
										>
											<span className="mt-px text-destructive">✗</span>
											{rule}
										</li>
									))}
								</ul>
								<CodeWindow filename="components/ClientWrapper.tsx">
									<code>
										{str('"use client"')}
										{"\n"}
										{kw("import")} {"{ ServerFeed }"} {kw("from")}{" "}
										{str('"@/components/ServerFeed"')}
										{cmt("  // ✗\n")}
										{"\n"}
										{kw("function")} {fn("ClientWrapper")}
										{punct("() {\n")}
										{"  "}
										{cmt("// ✗ ServerFeed gets pulled into client bundle\n")}
										{"  "}
										{kw("return")} {punct("<")}
										{fn("ServerFeed")}
										{punct(" />")}
										{"\n"}
										{punct("}\n")}
										{"\n"}
										{cmt("// ✓ Fix — accept as children instead\n")}
										{kw("function")} {fn("ClientWrapper")}
										{punct("({ children }) {\n")}
										{"  "}
										{kw("return")} {punct("<")}
										{fn("div")}
										{punct(">")}
										{"children"}
										{punct("</")}
										{fn("div")}
										{punct(">\n")}
										{punct("}")}
									</code>
								</CodeWindow>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Serialization callout */}
			<Card className="border-yellow-500/20 bg-yellow-500/5">
				<CardContent className="flex items-start gap-4">
					<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-500/15 text-xl">
						💡
					</div>
					<div className="space-y-1">
						<p className="font-semibold text-yellow-700 dark:text-yellow-400">
							Serialization Boundary
						</p>
						<p className="text-muted-foreground text-sm leading-relaxed">
							All props crossing from Server → Client must be serializable JSON.
							No functions, class instances, Symbols, Maps, or Sets. Use plain
							objects, arrays, strings, numbers, and booleans. Server Actions
							are the only exception — React serializes them as references.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
