import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SuspenseProvider } from "@/providers/SuspenseProvider";

// Simulated slow data fetch
async function fetchSlowData() {
	await new Promise((resolve) => setTimeout(resolve, 3000));
	return {
		data: "Slow data loaded!",
		timestamp: new Date().toISOString(),
		loadTime: "~3s",
	};
}

// Server Component that fetches data
async function SlowDataComponent() {
	const result = await fetchSlowData();
	return (
		<Card className="border-orange-500/20 bg-orange-500/5">
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">Data Loaded Successfully</CardTitle>
					<Badge className="bg-orange-500/10 text-orange-500" variant="outline">
						{result.loadTime}
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="space-y-2">
				<p className="text-muted-foreground text-sm">{result.data}</p>
				<p className="mt-2 text-muted-foreground/70 text-xs">
					Loaded at: {result.timestamp}
				</p>
			</CardContent>
		</Card>
	);
}

// Loading skeleton fallback
function LoadingSkeleton() {
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

export function BasicSuspenseDemo() {
	return (
		<div className="space-y-4">
			<Card className="mb-4">
				<CardContent className="pt-6">
					<div className="space-y-3">
						<p className="text-muted-foreground text-sm leading-relaxed">
							The component below takes <strong>~3 seconds</strong> to load.
							With Suspense, the page renders immediately and shows a skeleton
							while data loads.
						</p>
						<div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
							<p className="font-medium text-primary text-sm">
								💡 How it works:
							</p>
							<ol className="mt-2 ml-4 list-decimal space-y-1 text-muted-foreground text-xs">
								<li>Page shell renders instantly (static content)</li>
								<li>Suspense boundary shows fallback skeleton</li>
								<li>Server fetches data asynchronously</li>
								<li>Component streams in when ready</li>
							</ol>
						</div>
					</div>
				</CardContent>
			</Card>

			<SuspenseProvider fallback={<LoadingSkeleton />}>
				<SlowDataComponent />
			</SuspenseProvider>
		</div>
	);
}
