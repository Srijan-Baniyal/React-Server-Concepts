import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export function SerializationBoundary() {
	return (
		<section className="space-y-8" id="serialization">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">
					Serialization Boundary 🔒
				</h2>
				<p className="text-muted-foreground">
					Every value that crosses the Server → Client boundary must be
					serialisable by the Flight protocol. This is one of the most common
					sources of runtime errors in RSC apps.
				</p>
			</div>

			<Card className="border-yellow-500/20 bg-yellow-500/5">
				<CardContent className="pt-6">
					<p className="text-muted-foreground leading-relaxed">
						When a Server Component passes{" "}
						<strong className="text-foreground">
							props to a Client Component
						</strong>
						, those props must travel through the Flight wire format. React
						serialises them to JSON-compatible structures. Anything that cannot
						be serialised causes a runtime error:{" "}
						<em>
							"Props must be serializable for Client Components in the App
							Router."
						</em>
					</p>
				</CardContent>
			</Card>

			{/* What can cross */}
			<div className="grid gap-4 md:grid-cols-2">
				<Card className="border-green-500/20">
					<CardHeader>
						<CardTitle className="text-green-600 text-sm">
							✅ Can Cross the Boundary
						</CardTitle>
						<CardDescription>Serialisable by Flight</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						<CodeBlock
							code={`// ✓ Primitives
<Client name="Alice" count={42} flag={true} />

// ✓ Plain objects & arrays
<Client user={{ id: 1, name: "Bob" }} />
<Client items={["a", "b", "c"]} />

// ✓ null / undefined
<Client value={null} />

// ✓ Date (Flight serialises to ISO string)
<Client date={new Date()} />

// ✓ Server Actions (as function prop)
async function save(data) { "use server"; ... }
<Client onSave={save} />

// ✓ React elements / JSX (as children)
<Client><ServerChild /></Client>`}
							variant="muted"
						/>
					</CardContent>
				</Card>

				<Card className="border-red-500/20">
					<CardHeader>
						<CardTitle className="text-destructive text-sm">
							❌ Cannot Cross the Boundary
						</CardTitle>
						<CardDescription>
							Not serialisable — causes runtime error
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						<CodeBlock
							code={`// ✗ Regular functions
<Client onClick={() => console.log("hi")} />

// ✗ Class instances
<Client db={new PrismaClient()} />

// ✗ Symbol
<Client id={Symbol("key")} />

// ✗ Map / Set
<Client data={new Map([["a", 1]])} />

// ✗ Promises (use "use" hook instead)
<Client promise={fetchUser()} />

// ✗ BigInt
<Client value={BigInt(9007199254740991)} />`}
							variant="muted"
						/>
					</CardContent>
				</Card>
			</div>

			{/* Common pitfalls & fixes */}
			<Card>
				<CardHeader>
					<CardTitle>Common Pitfalls & How to Fix Them</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{[
						{
							problem: "Passing a function as a prop",
							fix: 'Use a Server Action ("use server") or move the handler into the Client Component',
							badCode: `// ❌ functions are not serialisable
<Client onClick={() => doSomething()} />`,
							goodCode: `// ✅ Server Action crosses the boundary
async function doSomething() { "use server"; ... }
<Client onAction={doSomething} />

// ✅ Or move handler into Client Component
<Client id={itemId} /> // pass data, not functions`,
						},
						{
							problem: "Passing a class instance (e.g. a Prisma client)",
							fix: "Pass the raw data instead — query on the server, pass the result",
							badCode: `// ❌ PrismaClient is not serialisable
<Client db={prisma} />`,
							goodCode: `// ✅ Query on the server, pass serialisable data
const user = await prisma.user.findUnique({ where: { id } });
<Client user={user} /> // plain object ✓`,
						},
						{
							problem: "Passing a Promise",
							fix: 'Use the React "use" API to unwrap it in the Client Component',
							badCode: `// ❌ Promise is not serialisable as a prop
const promise = fetchUser(id);
<Client data={promise} />`,
							goodCode: `// ✅ Pass the Promise via "use" API
const promise = fetchUser(id);
<Client userPromise={promise} />

// ClientComponent.tsx
"use client";
import { use } from "react";
function Client({ userPromise }) {
  const user = use(userPromise); // unwraps ✓
}`,
						},
					].map(({ problem, fix, badCode, goodCode }) => (
						<div
							className="space-y-3 rounded-lg border border-border/40 p-4"
							key={problem}
						>
							<div className="flex items-start gap-2">
								<Badge className="shrink-0 bg-red-500/10 text-red-600 text-xs">
									Problem
								</Badge>
								<p className="text-sm">{problem}</p>
							</div>
							<div className="flex items-start gap-2">
								<Badge className="shrink-0 bg-green-500/10 text-green-600 text-xs">
									Fix
								</Badge>
								<p className="text-muted-foreground text-sm">{fix}</p>
							</div>
							<div className="grid gap-3 md:grid-cols-2">
								<CodeBlock
									className="bg-destructive/5"
									code={badCode}
									variant="muted"
								/>
								<CodeBlock
									className="bg-green-500/5"
									code={goodCode}
									variant="muted"
								/>
							</div>
						</div>
					))}
				</CardContent>
			</Card>

			{/* server-only / client-only packages */}
			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="text-base">
							<code className="rounded bg-muted px-1 font-mono">
								server-only
							</code>
						</CardTitle>
						<CardDescription>
							Hard error if a server module reaches the client
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<CodeBlock
							code={`// lib/db.ts
import "server-only";
// ↑ Build will throw if this module is imported
// anywhere inside a "use client" module graph

export async function getSensitiveData() {
  return db.query("SELECT * FROM secrets");
}`}
							variant="muted"
						/>
						<p className="text-muted-foreground text-xs">
							Install with:{" "}
							<code className="rounded bg-muted px-1">npm i server-only</code>
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-base">
							<code className="rounded bg-muted px-1 font-mono">
								client-only
							</code>
						</CardTitle>
						<CardDescription>
							Hard error if a browser module runs on the server
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<CodeBlock
							code={`// lib/analytics.ts
import "client-only";
// ↑ Build throws if imported in a Server Component

export function trackEvent(name: string) {
  window.gtag("event", name); // browser-only ✓
}`}
							variant="muted"
						/>
						<p className="text-muted-foreground text-xs">
							Install with:{" "}
							<code className="rounded bg-muted px-1">npm i client-only</code>
						</p>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
