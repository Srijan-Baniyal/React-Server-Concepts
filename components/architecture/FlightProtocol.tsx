import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function FlightProtocol() {
	return (
		<section className="space-y-8" id="flight-protocol">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">
					The RSC Flight Protocol ✈️
				</h2>
				<p className="text-muted-foreground">
					React doesn't send HTML for Server Components — it sends a custom
					streaming wire format called the{" "}
					<strong className="text-foreground">Flight protocol</strong>. This is
					the secret behind instant soft navigations, incremental streaming, and
					state-preserving updates.
				</p>
			</div>

			{/* What is flight */}
			<Card className="border-primary/20 bg-primary/5">
				<CardHeader>
					<CardTitle>What is the Flight Protocol?</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-muted-foreground leading-relaxed">
						React Flight is the internal name for the serialisation layer that
						converts a Server Component tree into a{" "}
						<strong className="text-foreground">
							line-delimited JSON stream
						</strong>
						. Each line is a "chunk" containing part of the virtual DOM tree,
						lazy references to Client Components, Server Action IDs, or Suspense
						boundaries. The React client runtime{" "}
						<strong className="text-foreground">
							progressively deserialises
						</strong>{" "}
						these chunks and merges them into the existing React tree — without
						destroying any client state.
					</p>
					<div className="grid gap-3 sm:grid-cols-3">
						{[
							{
								label: "Not raw HTML",
								desc: "The payload is a virtual DOM description React can diff, not markup a browser renders directly.",
								icon: "🚫",
							},
							{
								label: "Not JSON-RPC",
								desc: "It's a streaming format with back-references, lazy chunks, and deferred Suspense slots.",
								icon: "🔄",
							},
							{
								label: "Stateful merging",
								desc: "The React client router merges incoming payloads into the live tree, keeping UI state intact.",
								icon: "🔗",
							},
						].map(({ label, desc, icon }) => (
							<div
								className="rounded-lg border border-border/50 bg-background/60 p-3"
								key={label}
							>
								<p className="mb-1 font-medium text-sm">
									{icon} {label}
								</p>
								<p className="text-muted-foreground text-xs leading-relaxed">
									{desc}
								</p>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Wire format anatomy */}
			<Card>
				<CardHeader>
					<CardTitle>Wire Format Anatomy</CardTitle>
					<CardDescription>
						Each line in the stream is prefixed with a chunk ID
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<pre className="overflow-x-auto rounded-md bg-muted p-4 font-mono text-xs leading-relaxed">
						{`// Example RSC payload for a simple page
// (simplified — real format uses binary-safe encoding)

0:["$","div",null,{"className":"container"},
    ["$","h1",null,{"children":"Hello, Alice"}],
    ["$L1",null,{"userId":"u_123"}]
  ]

1:I["(app-client)/components/UserCard.tsx",
    ["static/chunks/UserCard-abc123.js"],
    "UserCard"
  ]

2:["$","$L1",null,{"userId":"u_123","name":"Alice"}]`}
					</pre>

					<div className="space-y-3">
						{[
							{
								token: `0:["$","div",...]`,
								color: "bg-green-500/10 text-green-700",
								label: "Virtual DOM node",
								desc: `"$" is a React element marker. The array is [type, key, ref, props]. Server Component output is serialised directly as a virtual DOM tree.`,
							},
							{
								token: `"$L1"`,
								color: "bg-blue-500/10 text-blue-700",
								label: "Lazy client reference",
								desc: `A deferred reference to chunk "1". React will resolve this when the JavaScript for that Client Component loads. The L means "lazy".`,
							},
							{
								token: "1:I[...]",
								color: "bg-purple-500/10 text-purple-700",
								label: "Client Component module reference",
								desc: `The "I" prefix means "import". It includes the module path and chunk filename so the browser knows which JS file to load for this Client Component.`,
							},
							{
								token: "2:[...]",
								color: "bg-yellow-500/10 text-yellow-700",
								label: "Resolved slot",
								desc: "A later chunk that fills in a Suspense boundary or deferred slot. Streams in after the initial shell — enabling incremental hydration.",
							},
						].map(({ token, color, label, desc }) => (
							<div
								className="flex items-start gap-3 rounded-lg border border-border/40 p-3"
								key={label}
							>
								<code
									className={`shrink-0 rounded px-2 py-0.5 font-mono text-[10px] ${color}`}
								>
									{token}
								</code>
								<div>
									<p className="font-medium text-sm">{label}</p>
									<p className="mt-0.5 text-muted-foreground text-xs leading-relaxed">
										{desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Streaming mechanics */}
			<Card>
				<CardHeader>
					<CardTitle>How Streaming Works in Flight</CardTitle>
					<CardDescription>
						Suspense boundaries become deferred slots in the stream
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<p className="font-medium text-sm">React Component</p>
							<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
								{`export default function Page() {
  return (
    <div>
      <Header />          {/* fast */}
      <Suspense fallback={<Skeleton />}>
        <SlowFeed />      {/* slow */}
      </Suspense>
    </div>
  );
}`}
							</pre>
						</div>
						<div className="space-y-2">
							<p className="font-medium text-sm">
								Resulting Flight stream (simplified)
							</p>
							<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
								{`// Chunk 0 — sent immediately
0:["$","div",null,{},
    ["$","header",null,{"children":"..."}],
    ["$","$S1",null,{}]   ← Suspense placeholder
  ]

// Chunk 1 — sent when SlowFeed resolves
1:["$","ul",null,{},
    ["$","li",null,{"children":"Post 1"}],
    ["$","li",null,{"children":"Post 2"}]
  ]`}
							</pre>
						</div>
					</div>
					<div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
						<p className="font-medium text-sm">How React processes this</p>
						<ol className="mt-2 list-decimal space-y-1 pl-4 text-muted-foreground text-xs">
							<li>
								Receive chunk 0 instantly — render shell with{" "}
								<code className="rounded bg-muted px-1">{"<Skeleton />"}</code>{" "}
								in the Suspense slot
							</li>
							<li>
								Stream chunk 1 when{" "}
								<code className="rounded bg-muted px-1">SlowFeed</code> resolves
								on the server
							</li>
							<li>
								React client locates the{" "}
								<code className="rounded bg-muted px-1">$S1</code> placeholder
								and swaps in the real content — no full re-render
							</li>
							<li>
								Client Components in the new content are hydrated in place
							</li>
						</ol>
					</div>
				</CardContent>
			</Card>

			{/* Initial load vs navigation */}
			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="text-base">
							🌐 Initial Load — HTML + Flight
						</CardTitle>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`Server sends TWO things in parallel:

1. HTML string  (from renderToString)
   └── Full HTML for SEO & fast paint
   └── Suspense fallbacks included

2. Inline <script> tags with RSC payload
   └── React hydrates with this payload
   └── Matches server HTML exactly
   └── Avoids hydration mismatch

The HTML is temporary scaffolding.
The Flight payload is the source of truth.`}
						</pre>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="text-base">
							⚡ Soft Navigation — Flight Only
						</CardTitle>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`Client router prefetches RSC payload
(no HTML, no full page reload)

Server returns ONLY the Flight payload
for the changed route segments

React router:
  1. Merges new payload into live tree
  2. Keeps unchanged layouts in memory
  3. Preserves scroll / modal / form state
  4. Hydrates new Client Components

Result: sub-100ms page transitions ✓`}
						</pre>
					</CardContent>
				</Card>
			</div>

			{/* Network tab appearance */}
			<Card>
				<CardHeader>
					<CardTitle>What You See in the Network Tab</CardTitle>
					<CardDescription>
						RSC payloads have a recognisable{" "}
						<code className="rounded bg-muted px-1">text/x-component</code>{" "}
						Content-Type
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Badge className="bg-blue-500/10 text-blue-600 text-xs">
									Initial Request
								</Badge>
								<span className="text-muted-foreground text-xs">
									GET /products
								</span>
							</div>
							<pre className="rounded-md bg-muted p-3 font-mono text-xs">
								{`Status: 200 OK
Content-Type: text/html
Transfer-Encoding: chunked

(streamed HTML + inline RSC payload)`}
							</pre>
						</div>
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Badge className="bg-purple-500/10 text-purple-600 text-xs">
									Soft Navigation
								</Badge>
								<span className="text-muted-foreground text-xs">
									GET /products?_rsc=1
								</span>
							</div>
							<pre className="rounded-md bg-muted p-3 font-mono text-xs">
								{`Status: 200 OK
Content-Type: text/x-component
Transfer-Encoding: chunked

(pure Flight payload, no HTML wrapper)
0:["$","div",null,{"className":"..."}...]
1:I["(app-client)/components/..."]`}
							</pre>
						</div>
					</div>
					<p className="mt-3 text-muted-foreground text-xs">
						The <code className="rounded bg-muted px-1">?_rsc=</code> query
						parameter is Next.js's signal to return a plain Flight payload
						instead of a full HTML document. The value is a cache-busting hash.
					</p>
				</CardContent>
			</Card>

			{/* React.cache & Flight */}
			<Card>
				<CardHeader>
					<CardTitle>
						<code className="rounded bg-muted px-1 font-mono">react.cache</code>{" "}
						& Flight Deduplication
					</CardTitle>
					<CardDescription>
						How React memoises async work within a single Flight render
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					<pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`import { cache } from "react";

// Memoised per-request — same arguments = same Promise
export const getUser = cache(async (id: string) => {
  return db.user.findUnique({ where: { id } });
});

// Header.tsx (Server Component)
async function Header() {
  const user = await getUser("u_1"); // DB hit ← first call
  return <Avatar user={user} />;
}

// Sidebar.tsx (Server Component)
async function Sidebar() {
  const user = await getUser("u_1"); // cache hit ← same request
  return <UserMenu user={user} />;
}`}
					</pre>
					<p className="text-muted-foreground text-xs">
						<code className="rounded bg-muted px-1">react.cache</code> is scoped
						to a single render pass (one incoming request). The cache is
						discarded after the Flight payload is sent — it doesn't persist
						across requests. Use Next.js's{" "}
						<code className="rounded bg-muted px-1">unstable_cache</code> for
						cross-request persistence.
					</p>
				</CardContent>
			</Card>
		</section>
	);
}
