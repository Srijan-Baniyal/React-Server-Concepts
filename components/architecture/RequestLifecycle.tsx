import {
	ConcurrentRenderFlow,
	NavigationFlows,
	RequestLifecycleFlow,
} from "@/components/flow";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function RequestLifecycle() {
	return (
		<section className="space-y-8" id="request-lifecycle">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">Request Lifecycle 🔁</h2>
				<p className="text-muted-foreground">
					What Next.js does, step by step, when a request arrives — from
					middleware all the way to hydration.
				</p>
			</div>

			<Card>
				<CardContent className="pt-6">
					<RequestLifecycleFlow />
				</CardContent>
			</Card>

			{/* Navigation types */}
			<NavigationFlows />

			{/* Concurrency model */}
			<Card>
				<CardHeader>
					<CardTitle>
						React's Concurrent Rendering Model on the Server
					</CardTitle>
					<CardDescription>
						How RSC and Suspense cooperate to stream work progressively
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					<ConcurrentRenderFlow />
					<div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs">
						<p className="font-medium">Key insight</p>
						<p className="mt-1 text-muted-foreground">
							The server doesn't wait for the slowest component. Each node
							resolves independently and flushes into the stream as soon as it's
							ready. The browser renders each incoming chunk incrementally —
							users see real content progressively, not a spinner blocking
							everything.
						</p>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
