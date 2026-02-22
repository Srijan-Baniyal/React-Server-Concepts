import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SuspenseProvider } from "@/providers/SuspenseProvider";

// Data fetchers
async function fetchHeaderData() {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	return { title: "Dashboard Header", timestamp: new Date().toISOString() };
}

async function fetchWidget1Data() {
	await new Promise((resolve) => setTimeout(resolve, 2500));
	return { data: "Widget 1 Data", timestamp: new Date().toISOString() };
}

async function fetchWidget2Data() {
	await new Promise((resolve) => setTimeout(resolve, 4000));
	return { data: "Widget 2 Data", timestamp: new Date().toISOString() };
}

// Components
async function DashboardHeader() {
	const result = await fetchHeaderData();
	return (
		<Card className="border-blue-500/20 bg-blue-500/5">
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">{result.title}</CardTitle>
					<Badge className="bg-blue-500/10 text-blue-500" variant="outline">
						~1s
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground text-xs">
					Loaded at: {result.timestamp}
				</p>
			</CardContent>
		</Card>
	);
}

async function Widget1() {
	const result = await fetchWidget1Data();
	return (
		<Card className="border-green-500/20 bg-green-500/5">
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">Widget 1</CardTitle>
					<Badge className="bg-green-500/10 text-green-500" variant="outline">
						~2.5s
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

async function Widget2() {
	const result = await fetchWidget2Data();
	return (
		<Card className="border-purple-500/20 bg-purple-500/5">
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">Widget 2</CardTitle>
					<Badge className="bg-purple-500/10 text-purple-500" variant="outline">
						~4s
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
					<Skeleton className="h-5 w-24" />
					<Skeleton className="h-5 w-12" />
				</div>
			</CardHeader>
			<CardContent className="space-y-2">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-3 w-2/3" />
			</CardContent>
		</Card>
	);
}

export function NestedSuspenseDemo() {
	return (
		<div className="space-y-4">
			<Card className="mb-4">
				<CardContent className="pt-6">
					<div className="space-y-3">
						<p className="text-muted-foreground text-sm leading-relaxed">
							Suspense boundaries can be nested for{" "}
							<strong className="text-foreground">granular control</strong>. The
							shell renders immediately, then each section streams in as ready.
						</p>
						<div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
							<p className="font-medium text-primary text-sm">
								🎯 Nested Streaming Flow:
							</p>
							<ol className="mt-2 ml-4 list-decimal space-y-1 text-muted-foreground text-xs">
								<li>Dashboard container renders immediately (static shell)</li>
								<li>Header streams in at ~1s</li>
								<li>Widget 1 streams in at ~2.5s</li>
								<li>Widget 2 streams in at ~4s</li>
								<li>Each section is independently suspenseful</li>
							</ol>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Dashboard Container</CardTitle>
					<CardDescription>
						This static shell renders instantly ⚡
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{/* Nested Suspense for header */}
					<SuspenseProvider fallback={<ComponentSkeleton />}>
						<DashboardHeader />
					</SuspenseProvider>

					{/* Nested SuspenseProvider for widgets */}
					<div className="grid gap-4 md:grid-cols-2">
						<SuspenseProvider fallback={<ComponentSkeleton />}>
							<Widget1 />
						</SuspenseProvider>
						<SuspenseProvider fallback={<ComponentSkeleton />}>
							<Widget2 />
						</SuspenseProvider>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
