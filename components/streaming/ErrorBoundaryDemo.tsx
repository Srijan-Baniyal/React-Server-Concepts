import { ErrorBoundary } from "@/components/server/ErrorBoundary";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SuspenseProvider } from "@/providers/SuspenseProvider";

// Simulated async data fetching
async function fetchSuccessData() {
	await new Promise((resolve) => setTimeout(resolve, 1500));
	return {
		data: "Data loaded successfully!",
		timestamp: new Date().toISOString(),
	};
}

async function fetchErrorData() {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	throw new Error("Simulated network error: Failed to fetch data from API");
}

// Success Component
async function SuccessComponent() {
	const result = await fetchSuccessData();
	return (
		<Card className="border-green-500/20 bg-green-500/5">
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">Success Component</CardTitle>
					<Badge className="bg-green-500/10 text-green-500" variant="outline">
						✓ Loaded
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground text-sm">{result.data}</p>
				<p className="mt-2 text-muted-foreground/70 text-xs">
					{result.timestamp}
				</p>
			</CardContent>
		</Card>
	);
}

// Error Component
async function ErrorComponent() {
	await fetchErrorData();
	return <div>This won't render</div>;
}

// Custom Error Fallback
function CustomErrorFallback({ error }: { error: Error }) {
	return (
		<Card className="border-destructive/20 bg-destructive/5">
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="text-base text-destructive">
						Error Component
					</CardTitle>
					<Badge
						className="bg-destructive/10 text-destructive"
						variant="outline"
					>
						✗ Failed
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="space-y-2">
				<p className="font-medium text-destructive text-sm">Error Details:</p>
				<p className="text-muted-foreground text-sm">{error.message}</p>
			</CardContent>
		</Card>
	);
}

function ComponentSkeleton() {
	return (
		<Card className="border-border/50">
			<CardHeader>
				<div className="flex items-center justify-between">
					<Skeleton className="h-5 w-32" />
					<Skeleton className="h-5 w-16" />
				</div>
			</CardHeader>
			<CardContent className="space-y-2">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-3 w-3/4" />
			</CardContent>
		</Card>
	);
}

export function ErrorBoundaryDemo() {
	return (
		<div className="space-y-4">
			<Card className="mb-4">
				<CardContent className="pt-6">
					<div className="space-y-3">
						<p className="text-muted-foreground text-sm leading-relaxed">
							Combining{" "}
							<strong className="text-foreground">Error Boundaries</strong> with{" "}
							<strong className="text-foreground">Suspense</strong> handles both
							loading and error states gracefully. If a component fails, only
							that section shows an error.
						</p>
						<div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
							<p className="font-medium text-primary text-sm">
								🛡️ Error Boundary Pattern:
							</p>
							<ol className="mt-2 ml-4 list-decimal space-y-1 text-muted-foreground text-xs">
								<li>Error Boundary wraps Suspense boundary</li>
								<li>Suspense handles loading state</li>
								<li>Error Boundary catches render/fetch errors</li>
								<li>Isolated failures don't crash entire page</li>
								<li>Custom fallback UI shows user-friendly errors</li>
							</ol>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-4 md:grid-cols-2">
				{/* Success case */}
				<ErrorBoundary
					fallback={
						<CustomErrorFallback
							error={new Error("Component failed to load")}
						/>
					}
				>
					<SuspenseProvider fallback={<ComponentSkeleton />}>
						<SuccessComponent />
					</SuspenseProvider>
				</ErrorBoundary>

				{/* Error case */}
				<ErrorBoundary
					fallback={
						<CustomErrorFallback error={new Error("Network error occurred")} />
					}
				>
					<SuspenseProvider fallback={<ComponentSkeleton />}>
						<ErrorComponent />
					</SuspenseProvider>
				</ErrorBoundary>
			</div>
		</div>
	);
}
