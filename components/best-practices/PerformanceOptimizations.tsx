import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function PerformanceOptimizations() {
	return (
		<section className="space-y-8" id="performance">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">
					Performance Optimizations 🚀
				</h2>
				<p className="text-muted-foreground">
					RSC dramatically reduces the default JavaScript footprint. These
					patterns ensure you get the maximum benefit — smaller bundles, faster
					interactions, and optimal Core Web Vitals.
				</p>
			</div>

			{/* Bundle size */}
			<Card className="border-primary/20 bg-primary/5">
				<CardContent className="pt-6">
					<p className="font-semibold text-foreground">
						Principle: Zero Cost by Default — Don't Give It Back
					</p>
					<p className="mt-2 text-muted-foreground leading-relaxed">
						Server Components contribute{" "}
						<strong className="text-foreground">zero bytes</strong> to the
						client bundle. Every time you reach for{" "}
						<code className="rounded bg-muted px-1 text-foreground">
							"use client"
						</code>{" "}
						unnecessarily — or import a large library inside a Client Component
						— you're giving back the performance advantage RSC gives you. Heavy
						processing, large libraries, and markdown/syntax-highlighting should
						stay on the server.
					</p>
				</CardContent>
			</Card>

			{/* Heavy libs on server */}
			<div className="grid gap-6 lg:grid-cols-2">
				<Card className="border-red-500/20">
					<CardHeader>
						<CardTitle className="text-base text-red-600">
							✗ Heavy Library in Client Component
						</CardTitle>
						<CardDescription>
							Ships the full library to every user's browser
						</CardDescription>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// ✗ Sends ~2MB of syntax-highlighting library to browser
"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeBlock({ code, language }) {
  return (
    <SyntaxHighlighter language={language} style={vscDarkPlus}>
      {code}
    </SyntaxHighlighter>
  );
}
// react-syntax-highlighter: ~2.5 MB minified!
// Every user downloads this on first load.`}
						</pre>
					</CardContent>
				</Card>

				<Card className="border-green-500/20">
					<CardHeader>
						<CardTitle className="text-base text-green-600">
							✓ Heavy Library Stays on Server — Zero Bundle Cost
						</CardTitle>
						<CardDescription>
							HTML with syntax colours ships — not the library
						</CardDescription>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// ✓ Runs on server — library doesn't ship to browser
import { codeToHtml } from "shiki";

// Server Component — no "use client"
async function CodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  // shiki runs on server, produces static HTML
  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-dark",
  });

  return (
    <div
      className="rounded-md overflow-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
// Client bundle impact: 0 bytes — only HTML/CSS sent ✓`}
						</pre>
					</CardContent>
				</Card>
			</div>

			{/* Dynamic imports */}
			<Card>
				<CardHeader>
					<CardTitle className="text-base">
						Dynamic Imports for Client-Side-Only Libraries
					</CardTitle>
					<CardDescription>
						Use next/dynamic with ssr: false for libraries that require the
						browser
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// ✓ Lazy-load heavy Client Components
import dynamic from "next/dynamic";

// Only loads when this component renders
const RichTextEditor = dynamic(
  () => import("@/components/RichTextEditor"),
  {
    loading: () => <EditorSkeleton />,
    ssr: false,  // ← for browser-only libs (e.g. CodeMirror)
  },
);

// ✓ Code-split the chart library
const Chart = dynamic(
  () => import("@/components/Chart"),
  {
    loading: () => <ChartSkeleton />,
    // ssr: true (default) — pre-renders static on server
  },
);

function DashboardPage() {
  return (
    <>
      <Chart data={data} />     {/* pre-rendered + lazy hydrated */}
      <RichTextEditor />       {/* browser-only, loads on demand */}
    </>
  );
}`}
					</pre>
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// ✓ Dynamic import with named export
const HeavyModal = dynamic(
  () => import("@/components/modals").then((m) => m.HeavyModal),
  { loading: () => <ModalSkeleton /> },
);

// ✓ Conditionally load — only when actually needed
function Page() {
  const [showEditor, setShowEditor] = useState(false);
  return (
    <div>
      <button onClick={() => setShowEditor(true)}>
        Open Editor
      </button>
      {/* Editor only loads after button click */}
      {showEditor && <RichTextEditor />}
    </div>
  );
}

// Without dynamic import, RichTextEditor would be
// downloaded on page load even if never opened.
// With dynamic + condition: downloaded only when needed.`}
					</pre>
				</CardContent>
			</Card>

			{/* Image optimization */}
			<Card className="border-blue-500/20">
				<CardHeader>
					<CardTitle className="text-base">
						Image Best Practices with next/image
					</CardTitle>
					<CardDescription>
						Use the Image component — never a raw img tag
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<pre className="rounded-md bg-red-500/10 p-3 font-mono text-xs leading-relaxed">
						{`// ✗ Raw img tag — no optimization
<img
  src="/hero.jpg"
  alt="Hero"
  className="w-full"
/>
// Problems:
// - Full resolution served to all devices
// - No WebP/AVIF conversion
// - No lazy loading by default
// - No CLS prevention (no size reservation)
// - No blur placeholder
// Hero image: potentially 2-8 MB to mobile users!`}
					</pre>
					<pre className="rounded-md bg-green-500/10 p-3 font-mono text-xs leading-relaxed">
						{`import Image from "next/image";

// ✓ next/image — automatic optimization
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority           // ← eager load for above-the-fold
  placeholder="blur" // ← low-res blur while loading
  className="w-full rounded-lg object-cover"
  sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"
/>

// For below the fold — omit priority (lazy by default)
<Image
  src={product.imageUrl}
  alt={product.name}
  width={400} height={400}
  // lazy loaded automatically ✓
/>
// Result: WebP/AVIF, right size per device, lazy, CLS-free`}
					</pre>
				</CardContent>
			</Card>

			{/* Prefetching and Link */}
			<Card className="border-green-500/20">
				<CardHeader>
					<CardTitle className="text-base text-green-600">
						Navigation Performance — Link Prefetching
					</CardTitle>
					<CardDescription>
						Control prefetch behaviour to balance instant navigations against
						bandwidth usage
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`import Link from "next/link";

// ✓ Default <Link> — prefetches on hover/viewport entry
// Ideal for main navigation
<Link href="/products">Browse Products</Link>

// ✓ Disable for heavy/noisy routes
// Avoid prefetching heavy dashboards automatically
<Link href="/reports/full" prefetch={false}>
  Full Analytics Report
</Link>

// ✓ Programmatic navigation
import { useRouter } from "next/navigation";
const router = useRouter();

// Navigate + bust Router Cache (re-fetches current route)
router.push("/cart");
router.refresh();

// Replace current history entry (no back button entry)
router.replace("/login");`}
					</pre>
					<div className="space-y-3">
						<p className="font-medium text-sm">Prefetch Behaviour Summary</p>
						{[
							{
								condition: "Static segment + <Link>",
								result: "Full payload prefetched",
								color: "text-green-600",
							},
							{
								condition: "Dynamic segment + <Link>",
								result: "Prefetches up to nearest loading.tsx",
								color: "text-yellow-600",
							},
							{
								condition: "<Link prefetch={false}>",
								result: "No prefetch (on demand only)",
								color: "text-muted-foreground",
							},
							{
								condition: "router.push()",
								result: "No prefetch — navigates immediately",
								color: "text-muted-foreground",
							},
						].map((row) => (
							<div className="rounded-md border p-2" key={row.condition}>
								<p className="font-mono text-muted-foreground text-xs">
									{row.condition}
								</p>
								<p className={`mt-1 text-xs ${row.color}`}>→ {row.result}</p>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Fonts */}
			<Card className="border-purple-500/20">
				<CardHeader>
					<CardTitle className="text-base">
						Font Optimization with next/font
					</CardTitle>
					<CardDescription>
						Zero layout shift, self-hosted automatically, no third-party DNS
						lookups
					</CardDescription>
				</CardHeader>
				<CardContent>
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// app/layout.tsx
// ✓ next/font — downloaded at build time, self-hosted
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",    // CSS variable for Tailwind
  display: "swap",            // show fallback while loading
  preload: true,
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

// Or a local font
const customFont = localFont({
  src: "./fonts/CustomFont.woff2",
  variable: "--font-custom",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={\`\${inter.variable} \${mono.variable}\`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
// ✓ No external network request for fonts at runtime
// ✓ Font files served from your own domain
// ✓ Automatic size-adjust prevents CLS`}
					</pre>
				</CardContent>
			</Card>
		</section>
	);
}
