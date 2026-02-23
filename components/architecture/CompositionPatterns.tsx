import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function CompositionPatterns() {
	return (
		<section className="space-y-8" id="composition-patterns">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">Composition Patterns 🧩</h2>
				<p className="text-muted-foreground">
					Getting the most from Server + Client Components requires
					understanding how to compose them correctly and where common
					anti-patterns lurk.
				</p>
			</div>

			{/* Anti-patterns */}
			<Card className="border-red-500/20">
				<CardHeader>
					<CardTitle className="text-base text-red-600">
						Anti-patterns to Avoid
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Anti-pattern 1 */}
					<div>
						<p className="mb-2 font-medium text-sm">
							1. Importing a Server Component inside a Client Component
						</p>
						<div className="grid gap-2 sm:grid-cols-2">
							<pre className="rounded-md bg-red-500/10 p-3 font-mono text-[10px] leading-relaxed">
								{`// ✗ WRONG — will throw an error
"use client";
import { UserAvatar } from "./UserAvatar";
// ↑ Server Component (async, accesses DB)

function Container() {
  return <UserAvatar userId={state.id} />;
  // React can't render async Server
  // Components inside Client boundary
}`}
							</pre>
							<pre className="rounded-md bg-green-500/10 p-3 font-mono text-[10px] leading-relaxed">
								{`// ✓ CORRECT — pass as children prop

// Server Component parent controls the tree
async function Page() {
  const user = await getUser();
  return (
    <Container>
      <UserAvatar user={user} />
    </Container>
  );
}

// Client Component receives as children
"use client";
function Container({ children }) {
  return <div onClick={...}>{children}</div>;
}`}
							</pre>
						</div>
					</div>

					{/* Anti-pattern 2 */}
					<div>
						<p className="mb-2 font-medium text-sm">
							2. Adding Context at the Root (in a Server Component)
						</p>
						<div className="grid gap-2 sm:grid-cols-2">
							<pre className="rounded-md bg-red-500/10 p-3 font-mono text-[10px] leading-relaxed">
								{`// ✗ WRONG — layout.tsx is a Server Component
// createContext + useContext are client-only

import { MyContext } from "./context";
// This throws because Server Components
// cannot be a Context Provider`}
							</pre>
							<pre className="rounded-md bg-green-500/10 p-3 font-mono text-[10px] leading-relaxed">
								{`// ✓ CORRECT — wrap in a thin Client Component

// providers/ThemeProvider.tsx
"use client";
export function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={...}>
      {children}
    </ThemeContext.Provider>
  );
}

// layout.tsx (Server Component)
export default function Layout({ children }) {
  return (
    <ThemeProvider>  {/* ← Client Component */}
      {children}     {/* ← SC children pass through */}
    </ThemeProvider>
  );
}`}
							</pre>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Good patterns */}
			<div className="grid gap-4 md:grid-cols-2">
				<Card className="border-green-500/20">
					<CardHeader>
						<CardTitle className="text-base">
							The Children Pattern (Interleaving)
						</CardTitle>
						<CardDescription>
							How Server Components can live inside Client Components
						</CardDescription>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// ✓ Works — children are passed from SERVER
//   so they have already been rendered when
//   the Client Component receives them

// Server Component (page.tsx)
import { DataTable } from "@/components/DataTable";
import { Chart } from "@/components/Chart";

async function DashboardPage() {
  const data = await fetchDashboardData();
  return (
    <SidebarLayout>          {/* CC */}
      <DataTable data={data} />  {/* SC */}
      <Chart data={data} />      {/* SC */}
    </SidebarLayout>
  );
}

// The SC children are rendered server-side.
// SidebarLayout just renders {children} on client.`}
						</pre>
					</CardContent>
				</Card>

				<Card className="border-blue-500/20">
					<CardHeader>
						<CardTitle className="text-base">server-only Guard</CardTitle>
						<CardDescription>
							Prevent accidental client-side imports of server code
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// lib/db.ts
import "server-only"; // ← next line throws at BUILD TIME
                       //   if this file is imported from
                       //   a Client Component

import { PrismaClient } from "@prisma/client";
export const db = new PrismaClient();

// lib/secrets.ts
import "server-only";
export const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY!;

// If a Client Component accidentally imports db.ts,
// the build fails with:
//   "This module cannot be imported from a Client Component"
//
// Also useful: "client-only" for browser-only code.`}
						</pre>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-base">
							Pushing the Client Boundary Down
						</CardTitle>
						<CardDescription>
							The boundary should be as close to the interactive part as
							possible
						</CardDescription>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// ✗ Too broad — entire article is a CC
"use client";
async function BlogArticle({ slug }) {
  // Can't use async here either...
  return (
    <article>
      <h1>{title}</h1>
      <Content markdown={content} />
      <LikeButton />
    </article>
  );
}

// ✓ Narrow boundary — only LikeButton is CC
// BlogArticle.tsx (Server Component)
export async function BlogArticle({ slug }) {
  const post = await getPost(slug);
  return (
    <article>
      <h1>{post.title}</h1>
      <Content markdown={post.content} />
      <LikeButton postId={post.id} />  {/* CC */}
    </article>
  );
}`}
						</pre>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-base">Context at the Leaf</CardTitle>
						<CardDescription>
							Replace global Context with colocated Server data passes
						</CardDescription>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// Pattern: fetch at top, pass down to CC subtree

// Server Component (layout.tsx)
async function Layout({ children }) {
  const user = await getCurrentUser();
  return (
    <UserContextProvider value={user}>
      {children}
    </UserContextProvider>
  );
}

// Any nested CC can consume via useContext
"use client";
function NavAvatar() {
  const user = useContext(UserContext);
  return <img src={user.avatar} alt={user.name} />;
}

// The fetch happens once on the server.
// The context is only in client subtree.`}
						</pre>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
