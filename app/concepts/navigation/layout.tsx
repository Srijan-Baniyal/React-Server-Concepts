import { NavigationTabs } from "@/components/server/NavigationTabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NavigationDemoLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
			{/* Hero Section */}
			<div className="mb-12 text-center">
				<h1 className="mb-4 font-semibold text-5xl tracking-tight sm:text-6xl">
					Navigation & Partial Updates
				</h1>
				<p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
					See how layouts persist while content streams in
				</p>
			</div>

			{/* Explanation */}
			<Card className="mb-8 overflow-hidden border-border/40 bg-card/50">
				<CardHeader className="border-border/40 border-b">
					<CardTitle className="text-xl">How This Works</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 pt-6">
					<div className="grid gap-4 md:grid-cols-3">
						<div className="space-y-2 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
							<Badge
								className="bg-blue-500/10 text-blue-600 dark:text-blue-400"
								variant="secondary"
							>
								Layout (this component)
							</Badge>
							<p className="text-muted-foreground text-xs leading-relaxed">
								Rendered once and stays mounted. Contains the navigation tabs
								and shared UI.
							</p>
						</div>
						<div className="space-y-2 rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
							<Badge
								className="bg-purple-500/10 text-purple-600 dark:text-purple-400"
								variant="secondary"
							>
								Navigation Tabs
							</Badge>
							<p className="text-muted-foreground text-xs leading-relaxed">
								Client Component that handles route changes. Stays interactive
								during content loading.
							</p>
						</div>
						<div className="space-y-2 rounded-xl border border-green-500/20 bg-green-500/5 p-4">
							<Badge
								className="bg-green-500/10 text-green-600 dark:text-green-400"
								variant="secondary"
							>
								Page Content (below)
							</Badge>
							<p className="text-muted-foreground text-xs leading-relaxed">
								Server Component that fetches new data. Only this part
								re-renders and streams.
							</p>
						</div>
					</div>

					<div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
						<p className="mb-2 font-semibold text-sm text-yellow-600 dark:text-yellow-500">
							💡 Partial Rendering
						</p>
						<p className="text-muted-foreground text-xs leading-relaxed">
							When you navigate between pages, Next.js only re-renders the parts
							that changed (the page content), while keeping shared layouts
							mounted. This makes navigation feel instant and preserves client
							state in the layout.
						</p>
					</div>
				</CardContent>
			</Card>

			{/* Navigation Tabs - Client Component */}
			<div className="mb-8">
				<NavigationTabs />
			</div>

			{/* Page Content - Streams in on navigation */}
			<div className="space-y-8">{children}</div>
		</div>
	);
}
