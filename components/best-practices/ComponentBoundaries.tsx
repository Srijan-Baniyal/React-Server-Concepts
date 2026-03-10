import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

const DECISION_RULES = [
	{
		question: "Does it need useState or useReducer?",
		answer: "Client Component",
		color: "text-blue-600",
		bg: "bg-blue-500/5 border-blue-500/20",
	},
	{
		question: "Does it use useEffect or lifecycle hooks?",
		answer: "Client Component",
		color: "text-blue-600",
		bg: "bg-blue-500/5 border-blue-500/20",
	},
	{
		question: "Does it handle onClick, onChange, or form events?",
		answer: "Client Component",
		color: "text-blue-600",
		bg: "bg-blue-500/5 border-blue-500/20",
	},
	{
		question:
			"Does it use browser APIs (window, navigator, IntersectionObserver)?",
		answer: "Client Component",
		color: "text-blue-600",
		bg: "bg-blue-500/5 border-blue-500/20",
	},
	{
		question: "Does it fetch data from a database or external API?",
		answer: "Server Component",
		color: "text-green-600",
		bg: "bg-green-500/5 border-green-500/20",
	},
	{
		question: "Does it read environment secrets or server-only config?",
		answer: "Server Component",
		color: "text-green-600",
		bg: "bg-green-500/5 border-green-500/20",
	},
	{
		question: "Is it pure markup with no interactivity?",
		answer: "Server Component",
		color: "text-green-600",
		bg: "bg-green-500/5 border-green-500/20",
	},
];

export function ComponentBoundaries() {
	return (
		<section className="space-y-8" id="component-boundaries">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">
					Component Boundary Decisions 🗺️
				</h2>
				<p className="text-muted-foreground">
					The most impactful skill in RSC development — knowing exactly where to
					draw the "use client" line and how to keep it as leaf-like as
					possible.
				</p>
			</div>

			{/* Golden Rule */}
			<Card className="border-primary/20 bg-primary/5">
				<CardContent className="pt-6">
					<p className="font-semibold text-foreground text-lg">
						The Golden Rule: Default to Server. Opt-in to Client.
					</p>
					<p className="mt-2 text-muted-foreground leading-relaxed">
						Every component in the App Router is a Server Component by default.
						Add{" "}
						<code className="rounded bg-muted px-1 text-foreground">
							"use client"
						</code>{" "}
						only when you genuinely need browser interactivity, local state, or
						browser APIs. The boundary should be as close to the leaves of your
						component tree as possible — wrapping only the interactive fragment,
						not the entire section.
					</p>
				</CardContent>
			</Card>

			{/* Decision table */}
			<div>
				<h3 className="mb-4 font-semibold text-xl">Quick Decision Guide</h3>
				<div className="grid gap-3 sm:grid-cols-2">
					{DECISION_RULES.map((rule) => (
						<Card className={`${rule.bg}`} key={rule.question}>
							<CardContent className="flex items-start gap-3 pt-4 pb-4">
								<span
									className={`mt-0.5 shrink-0 font-bold text-lg ${rule.color}`}
								>
									{rule.answer === "Client Component" ? "🔵" : "🟢"}
								</span>
								<div>
									<p className="text-foreground text-sm">{rule.question}</p>
									<Badge
										className={`mt-1 text-xs ${rule.color}`}
										variant="secondary"
									>
										→ {rule.answer}
									</Badge>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Push the boundary down */}
			<div className="grid gap-6 lg:grid-cols-2">
				<Card className="border-red-500/20">
					<CardHeader>
						<CardTitle className="text-base text-red-600">
							✗ Wide Client Boundary (costly)
						</CardTitle>
						<CardDescription>
							Entire section becomes client JS — even static parts
						</CardDescription>
					</CardHeader>
					<CardContent>
						<CodeBlock
							code={`// ✗ Entire ProductPage is client-side
"use client";

async function ProductPage({ id }) {
  // Can't be async — we're in a Client Component
  // Can't do direct DB access either
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  // Large component shipped to every user
  return (
    <div>
      <ProductHeader product={product} />
      <ProductDescription product={product} />
      <ProductReviews productId={id} />
      <QuantitySelector qty={qty}
        onChange={setQty} />
      <AddToCartButton />
    </div>
  );
}`}
							variant="muted"
						/>
					</CardContent>
				</Card>

				<Card className="border-green-500/20">
					<CardHeader>
						<CardTitle className="text-base text-green-600">
							✓ Narrow Client Boundary (optimal)
						</CardTitle>
						<CardDescription>
							Only the interactive fragment ships as client JS
						</CardDescription>
					</CardHeader>
					<CardContent>
						<CodeBlock
							code={`// ✓ Only interactive leaf is a Client Component

// Server Component — fetches data, zero bundle cost
async function ProductPage({ id }) {
  const product = await db.product.find(id);
  return (
    <div>
      <ProductHeader product={product} />     {/* SC */}
      <ProductDescription product={product} />{/* SC */}
      <ProductReviews productId={id} />       {/* SC */}
      <AddToCart product={product} />         {/* CC ← only this */}
    </div>
  );
}

// ✓ Tiny Client Component — just the button
"use client";
function AddToCart({ product }) {
  const [qty, setQty] = useState(1);
  return (
    <div>
      <QuantitySelector qty={qty} onChange={setQty} />
      <button onClick={() => addToCart(product.id, qty)}>
        Add to Cart
      </button>
    </div>
  );
}`}
							variant="muted"
						/>
					</CardContent>
				</Card>
			</div>

			{/* Context provider pattern */}
			<Card className="border-yellow-500/20">
				<CardHeader>
					<CardTitle className="text-base text-yellow-700 dark:text-yellow-500">
						Context Providers — Thin Client Wrapper Pattern
					</CardTitle>
					<CardDescription>
						Providers must be Client Components. Keep them thin so Server
						Component children pass through.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 sm:grid-cols-2">
					<CodeBlock
						code={`// providers/ThemeProvider.tsx
"use client";
import { ThemeContext } from "./context";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
// ↑ CC — necessary because useState is used`}
						variant="muted"
					/>
					<CodeBlock
						code={`// app/layout.tsx (Server Component)
import { ThemeProvider } from "@/providers/ThemeProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}  {/* ← SC children pass through */}
        </ThemeProvider>
      </body>
    </html>
  );
}
// ↑ children are SC — still rendered server-side
// ThemeProvider just wraps without touching them`}
						variant="muted"
					/>
				</CardContent>
			</Card>

			{/* The children lift trick */}
			<Card className="border-blue-500/20">
				<CardHeader>
					<CardTitle className="text-base">
						Passing Server Components as Props
					</CardTitle>
					<CardDescription>
						Server Components can live inside Client Component subtrees via{" "}
						<code className="rounded bg-muted px-1 text-xs">children</code> or
						any slot prop
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-muted-foreground text-sm leading-relaxed">
						A Client Component cannot <em>import</em> a Server Component (it
						would be treated as a Client Component at the boundary). But a
						Server Component can <em>pass</em> a Server Component as the{" "}
						<code className="rounded bg-muted px-1">children</code> prop or any
						other prop to a Client Component — and it stays server-rendered.
					</p>
					<CodeBlock
						code={`// ✓ Server Component passes SC children into a CC wrapper

// app/dashboard/page.tsx — Server Component
import { AnimatedLayout } from "@/components/AnimatedLayout"; // CC
import { DataTable } from "@/components/DataTable";          // SC
import { MetricsPanel } from "@/components/MetricsPanel";   // SC

async function DashboardPage() {
  const [metrics, tableData] = await Promise.all([
    fetchMetrics(),
    fetchTableData(),
  ]);

  return (
    <AnimatedLayout
      sidebar={<MetricsPanel data={metrics} />}  {/* SC as prop */}
    >
      <DataTable data={tableData} />             {/* SC as children */}
    </AnimatedLayout>
  );
}

// AnimatedLayout.tsx — Client Component
"use client";
function AnimatedLayout({ children, sidebar }) {
  const [open, setOpen] = useState(true);
  return (
    <div className={open ? "expanded" : "collapsed"}>
      <aside>{sidebar}</aside>    {/* server-rendered MetricsPanel */}
      <main>{children}</main>     {/* server-rendered DataTable */}
    </div>
  );
}`}
						variant="muted"
					/>
				</CardContent>
			</Card>
		</section>
	);
}
