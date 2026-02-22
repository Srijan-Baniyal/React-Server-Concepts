import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SuspenseProvider } from "@/providers/SuspenseProvider";

// Different speed data fetchers
async function fetchFastData() {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	return {
		data: "Fast data loaded!",
		timestamp: new Date().toISOString(),
	};
}

async function fetchMediumData() {
	await new Promise((resolve) => setTimeout(resolve, 3000));
	return {
		data: "Medium data loaded!",
		timestamp: new Date().toISOString(),
	};
}

async function fetchSlowData() {
	await new Promise((resolve) => setTimeout(resolve, 5000));
	return {
		data: "Slow data loaded!",
		timestamp: new Date().toISOString(),
	};
}

// Component variants
async function FastComponent() {
	const result = await fetchFastData();
	return (
		<Card className="border-blue-500/20 bg-blue-500/5">
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">Fast Component</CardTitle>
					<Badge className="bg-blue-500/10 text-blue-500" variant="outline">
						~1s
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

async function MediumComponent() {
	const result = await fetchMediumData();
	return (
		<Card className="border-orange-500/20 bg-orange-500/5">
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">Medium Component</CardTitle>
					<Badge className="bg-orange-500/10 text-orange-500" variant="outline">
						~3s
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

async function SlowComponent() {
	const result = await fetchSlowData();
	return (
		<Card className="border-purple-500/20 bg-purple-500/5">
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">Slow Component</CardTitle>
					<Badge className="bg-purple-500/10 text-purple-500" variant="outline">
						~5s
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

function ComponentSkeleton() {
	return (
		<Card className="border-border/50">
			<CardHeader>
				<div className="flex items-center justify-between">
					<Skeleton className="h-5 w-32" />
					<Skeleton className="h-5 w-12" />
				</div>
			</CardHeader>
			<CardContent className="space-y-2">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-3 w-3/4" />
			</CardContent>
		</Card>
	);
}

export function ParallelSuspenseDemo() {
	return (
		<div className="space-y-4">
			<Card className="mb-4">
				<CardContent className="pt-6">
					<div className="space-y-3">
						<p className="text-muted-foreground text-sm leading-relaxed">
							Each component has its own Suspense boundary. They load{" "}
							<strong className="text-foreground">in parallel</strong> and
							render independently as they complete.
						</p>
						<div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
							<p className="font-medium text-primary text-sm">
								🔄 Parallel Loading Pattern:
							</p>
							<ol className="mt-2 ml-4 list-decimal space-y-1 text-muted-foreground text-xs">
								<li>All three components start fetching simultaneously</li>
								<li>Fast component (1s) renders first</li>
								<li>Medium component (3s) renders next</li>
								<li>Slow component (5s) renders last</li>
								<li>
									<strong>Total time: ~5s (not 1s + 3s + 5s = 9s)</strong>
								</li>
							</ol>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-4 md:grid-cols-3">
				<SuspenseProvider fallback={<ComponentSkeleton />}>
					<FastComponent />
				</SuspenseProvider>
				<SuspenseProvider fallback={<ComponentSkeleton />}>
					<MediumComponent />
				</SuspenseProvider>
				<SuspenseProvider fallback={<ComponentSkeleton />}>
					<SlowComponent />
				</SuspenseProvider>
			</div>
		</div>
	);
}
