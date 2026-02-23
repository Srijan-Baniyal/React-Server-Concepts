import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const BUNDLE_SAVINGS = [
	{
		pkg: "marked + highlight.js",
		size: "~185 kB",
		saved: true,
		use: "Markdown rendering (blog content)",
	},
	{
		pkg: "date-fns",
		size: "~75 kB",
		saved: true,
		use: "Date formatting",
	},
	{
		pkg: "shiki",
		size: "~350 kB",
		saved: true,
		use: "Syntax highlighting",
	},
	{
		pkg: "lodash",
		size: "~70 kB",
		saved: true,
		use: "Data transformation utilities",
	},
	{
		pkg: "@sentry/browser",
		size: "~45 kB",
		saved: false,
		use: "Browser error tracking (must be client)",
	},
	{
		pkg: "react-query",
		size: "~12 kB",
		saved: false,
		use: "Client-side cache & sync (intentionally client)",
	},
];

export function BundleImpact() {
	return (
		<section className="space-y-8" id="bundle-impact">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">Bundle Impact 📦</h2>
				<p className="text-muted-foreground">
					The most profound performance win with RSC: heavy server-only
					dependencies never ship to the browser. Zero bundle cost.
				</p>
			</div>

			<Card className="border-primary/20 bg-primary/5">
				<CardContent className="pt-6">
					<p className="text-muted-foreground leading-relaxed">
						In traditional React, every library your component imports is
						bundled and shipped to every user. With RSC, Server Components
						execute only on the server — their imports never appear in the JS
						bundle. A 350 kB syntax highlighter becomes{" "}
						<strong className="text-foreground">0 bytes on the client</strong>.
					</p>
				</CardContent>
			</Card>

			{/* Before/After comparison */}
			<div className="grid gap-4 md:grid-cols-2">
				<Card className="border-red-500/20">
					<CardHeader>
						<CardTitle className="text-base text-red-600">
							Before: Traditional React SPA
						</CardTitle>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// BlogPost.tsx (shipped to every visitor)
import { marked } from "marked";       // +185kB
import { format } from "date-fns";     //  +75kB
import { codeToHtml } from "shiki";    // +350kB
import _ from "lodash";                //  +70kB

function BlogPost({ post }) {
  const html = marked(post.content);
  const date = format(post.createdAt, "PPP");
  // ...
}

Total impact on client bundle:
  +680 kB of JS the user must download,
  parse, and execute before seeing content.
  Initial page load: ~3.5 seconds on 3G.`}
						</pre>
					</CardContent>
				</Card>
				<Card className="border-green-500/20">
					<CardHeader>
						<CardTitle className="text-base text-green-600">
							After: Next.js Server Component
						</CardTitle>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// BlogPost.tsx (Server Component — runs on server)
import { marked } from "marked";       // 0 bytes
import { format } from "date-fns";     // 0 bytes
import { codeToHtml } from "shiki";    // 0 bytes
import _ from "lodash";                // 0 bytes

export default async function BlogPost({ post }) {
  const html = await marked(post.content);
  const date = format(post.createdAt, "PPP");
  // ...
}

Client bundle impact: 0 kB ✓
All processing happens on the server.
User downloads pre-rendered HTML instead.
Initial page load: ~0.4 seconds on 3G.`}
						</pre>
					</CardContent>
				</Card>
			</div>

			{/* Library table */}
			<Card>
				<CardHeader>
					<CardTitle>Library-by-Library Savings</CardTitle>
					<CardDescription>
						Which dependencies stay on the server vs. must ship to the client
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full text-xs">
							<thead>
								<tr className="border-border/50 border-b">
									<th className="py-2 pr-4 text-left font-semibold">Package</th>
									<th className="py-2 pr-4 text-left font-semibold">Size</th>
									<th className="py-2 pr-4 text-left font-semibold">
										Use case
									</th>
									<th className="py-2 text-left font-semibold">
										Client bundle?
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border/30">
								{BUNDLE_SAVINGS.map(({ pkg, size, saved, use }) => (
									<tr key={pkg}>
										<td className="py-2 pr-4 font-mono text-foreground">
											{pkg}
										</td>
										<td className="py-2 pr-4 text-muted-foreground">{size}</td>
										<td className="py-2 pr-4 text-muted-foreground">{use}</td>
										<td className="py-2">
											{saved ? (
												<Badge
													className="bg-green-500/10 text-[10px] text-green-600"
													variant="outline"
												>
													0 bytes ✓
												</Badge>
											) : (
												<Badge className="text-[10px]" variant="secondary">
													Stays in bundle
												</Badge>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>

			{/* Core Web Vitals callout */}
			<div className="grid gap-4 sm:grid-cols-3">
				{[
					{
						metric: "LCP",
						label: "Largest Contentful Paint",
						impact:
							"Improved drastically — server renders the largest element. No waiting for JS to paint it.",
						color: "border-green-500/20 bg-green-500/5",
					},
					{
						metric: "INP",
						label: "Interaction to Next Paint",
						impact:
							"Fewer bytes parsed = less main thread blocking = faster response to user interactions.",
						color: "border-blue-500/20 bg-blue-500/5",
					},
					{
						metric: "CLS",
						label: "Cumulative Layout Shift",
						impact:
							"Suspense fallbacks (skeletons) reserve space. Streamed content replaces reserved space — no layout shift.",
						color: "border-yellow-500/20 bg-yellow-500/5",
					},
				].map(({ metric, label, impact, color }) => (
					<Card className={color} key={metric}>
						<CardContent className="pt-6">
							<div className="mb-2 font-bold text-2xl">{metric}</div>
							<p className="mb-2 font-medium text-sm">{label}</p>
							<p className="text-muted-foreground text-xs">{impact}</p>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
