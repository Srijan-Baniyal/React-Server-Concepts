import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CodeBoundariesExplainer() {
	return (
		<div className="space-y-6">
			<div className="text-center">
				<h2 className="mb-3 font-semibold text-4xl tracking-tight">
					Where Code Runs
				</h2>
				<p className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed">
					Understanding the server/client boundary is the core mental model for
					React Server Components
				</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				{/* Server Components */}
				<Card className="overflow-hidden border-green-500/20 bg-green-500/5">
					<CardHeader className="border-green-500/10 border-b pb-4">
						<div className="flex items-center justify-between">
							<CardTitle className="text-xl">Server Components</CardTitle>
							<Badge
								className="rounded-full bg-green-500/10 px-3 py-1 font-normal text-green-600 dark:text-green-400"
								variant="secondary"
							>
								Server
							</Badge>
						</div>
					</CardHeader>
					<CardContent className="space-y-4 pt-6">
						<div className="space-y-3">
							<div className="flex items-start gap-3">
								<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
									✓
								</div>
								<div>
									<p className="font-medium text-sm">Direct Data Access</p>
									<p className="text-muted-foreground text-xs">
										Can access databases, file systems, and backend services
										directly
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
									✓
								</div>
								<div>
									<p className="font-medium text-sm">Use Secrets Safely</p>
									<p className="text-muted-foreground text-xs">
										API keys, tokens, and credentials stay on the server
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
									✓
								</div>
								<div>
									<p className="font-medium text-sm">Zero Client JS</p>
									<p className="text-muted-foreground text-xs">
										Code never sent to the browser, reducing bundle size
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
									✓
								</div>
								<div>
									<p className="font-medium text-sm">Async by Default</p>
									<p className="text-muted-foreground text-xs">
										Can await data directly in the component body
									</p>
								</div>
							</div>
						</div>

						<div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
							<p className="mb-2 font-medium text-sm">Cannot use:</p>
							<ul className="space-y-1 text-muted-foreground text-xs">
								<li className="flex items-center gap-2">
									<span className="text-red-500">✗</span> useState, useEffect,
									useContext
								</li>
								<li className="flex items-center gap-2">
									<span className="text-red-500">✗</span> Browser APIs (window,
									document)
								</li>
								<li className="flex items-center gap-2">
									<span className="text-red-500">✗</span> Event handlers
									(onClick, onChange)
								</li>
							</ul>
						</div>

						<div className="rounded-xl border border-border/40 bg-background/50 p-4">
							<p className="mb-2 font-mono text-muted-foreground text-xs">
								Example:
							</p>
							<pre className="overflow-x-auto text-xs">
								<code>{`// ✓ Server Component (default)
async function PokemonList() {
  // Direct database access
  const pokemon = await db.query(...)
  
  return <div>{pokemon.map(...)}</div>
}`}</code>
							</pre>
						</div>
					</CardContent>
				</Card>

				{/* Client Components */}
				<Card className="overflow-hidden border-blue-500/20 bg-blue-500/5">
					<CardHeader className="border-blue-500/10 border-b pb-4">
						<div className="flex items-center justify-between">
							<CardTitle className="text-xl">Client Components</CardTitle>
							<Badge
								className="rounded-full bg-blue-500/10 px-3 py-1 font-normal text-blue-600 dark:text-blue-400"
								variant="secondary"
							>
								Client
							</Badge>
						</div>
					</CardHeader>
					<CardContent className="space-y-4 pt-6">
						<div className="space-y-3">
							<div className="flex items-start gap-3">
								<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
									✓
								</div>
								<div>
									<p className="font-medium text-sm">Interactivity</p>
									<p className="text-muted-foreground text-xs">
										Event handlers, clicks, form submissions
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
									✓
								</div>
								<div>
									<p className="font-medium text-sm">Local State</p>
									<p className="text-muted-foreground text-xs">
										useState, useReducer for component state
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
									✓
								</div>
								<div>
									<p className="font-medium text-sm">Browser APIs</p>
									<p className="text-muted-foreground text-xs">
										Access to window, localStorage, geolocation
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
									✓
								</div>
								<div>
									<p className="font-medium text-sm">Lifecycle Hooks</p>
									<p className="text-muted-foreground text-xs">
										useEffect for side effects and subscriptions
									</p>
								</div>
							</div>
						</div>

						<div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
							<p className="mb-2 font-medium text-sm">Cannot use:</p>
							<ul className="space-y-1 text-muted-foreground text-xs">
								<li className="flex items-center gap-2">
									<span className="text-red-500">✗</span> Direct database/file
									system access
								</li>
								<li className="flex items-center gap-2">
									<span className="text-red-500">✗</span> Backend-only libraries
								</li>
								<li className="flex items-center gap-2">
									<span className="text-red-500">✗</span> Secrets (exposed in
									bundle)
								</li>
							</ul>
						</div>

						<div className="rounded-xl border border-border/40 bg-background/50 p-4">
							<p className="mb-2 font-mono text-muted-foreground text-xs">
								Example:
							</p>
							<pre className="overflow-x-auto text-xs">
								<code>{`// Client Component (needs "use client")
"use client"
function FavoriteButton() {
  const [liked, setLiked] = useState(false)
  
  return <button onClick={() => setLiked(!liked)}>
    {liked ? "❤️" : "🤍"}
  </button>
}`}</code>
							</pre>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Component Tree Example */}
			<Card className="overflow-hidden border-border/40 bg-card/50">
				<CardHeader>
					<CardTitle className="text-xl">Component Composition</CardTitle>
					<p className="text-muted-foreground text-sm">
						Server Components can render Client Components, but not vice versa
					</p>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="rounded-xl border border-border/40 bg-background/50 p-6">
						<div className="space-y-4 font-mono text-sm">
							<div className="flex items-start gap-3">
								<Badge
									className="shrink-0 bg-green-500/10 text-green-600 dark:text-green-400"
									variant="secondary"
								>
									Server
								</Badge>
								<div className="flex-1">
									<code className="text-xs">async function PokemonPage()</code>
									<p className="mt-1 text-muted-foreground text-xs">
										✓ Fetches data from database
									</p>
								</div>
							</div>

							<div className="ml-8 space-y-4 border-border/40 border-l-2 pl-4">
								<div className="flex items-start gap-3">
									<Badge
										className="shrink-0 bg-green-500/10 text-green-600 dark:text-green-400"
										variant="secondary"
									>
										Server
									</Badge>
									<div className="flex-1">
										<code className="text-xs">PokemonList</code>
										<p className="mt-1 text-muted-foreground text-xs">
											✓ Renders static list
										</p>
									</div>
								</div>

								<div className="ml-8 space-y-3 border-border/40 border-l-2 pl-4">
									<div className="flex items-start gap-3">
										<Badge
											className="shrink-0 bg-blue-500/10 text-blue-600 dark:text-blue-400"
											variant="secondary"
										>
											Client
										</Badge>
										<div className="flex-1">
											<code className="text-xs">{"<FavoriteButton />"}</code>
											<p className="mt-1 text-muted-foreground text-xs">
												✓ Handles clicks, manages state
											</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<Badge
											className="shrink-0 bg-blue-500/10 text-blue-600 dark:text-blue-400"
											variant="secondary"
										>
											Client
										</Badge>
										<div className="flex-1">
											<code className="text-xs">{"<ShareButton />"}</code>
											<p className="mt-1 text-muted-foreground text-xs">
												✓ Uses Web Share API
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
							<p className="mb-2 flex items-center gap-2 font-medium text-sm">
								<span className="text-green-600 dark:text-green-400">✓</span>
								Valid Pattern
							</p>
							<pre className="overflow-x-auto text-xs">
								<code>{`// Server Component
function Page() {
  return <ClientButton />
}`}</code>
							</pre>
						</div>

						<div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
							<p className="mb-2 flex items-center gap-2 font-medium text-sm">
								<span className="text-red-500">✗</span>
								Invalid Pattern
							</p>
							<pre className="overflow-x-auto text-xs">
								<code>{`// Client Component
"use client"
function ClientPage() {
  return <ServerComponent /> // ✗
}`}</code>
							</pre>
						</div>
					</div>

					<div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
						<p className="mb-2 font-semibold text-sm text-yellow-600 dark:text-yellow-500">
							💡 Pro Tip: Serialization Boundary
						</p>
						<p className="text-muted-foreground text-xs leading-relaxed">
							Data passed from Server to Client Components must be serializable
							(JSON). No functions, class instances, or Symbols. Use plain
							objects, arrays, strings, numbers, and booleans.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
