import { SPAvsRSCFlow, TwoRuntimesFlow } from "@/components/flow";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/Utils";

export function BigPicture() {
	return (
		<section className="space-y-8" id="big-picture">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">The Big Picture 🗺️</h2>
				<p className="text-muted-foreground">
					Before RSC, React was purely client-side. Here is how the two models
					compare and how they physically execute.
				</p>
			</div>

			<SPAvsRSCFlow />

			<Card>
				<CardHeader>
					<CardTitle>The Two Runtimes Visualised</CardTitle>
					<CardDescription>
						Every component lives in exactly one world
					</CardDescription>
				</CardHeader>
				<CardContent>
					<TwoRuntimesFlow />
				</CardContent>
			</Card>

			{/* Mental Model */}
			<Card className="border-primary/20 bg-primary/5">
				<CardHeader>
					<CardTitle className="text-base">The Right Mental Model</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<p className="text-muted-foreground text-sm leading-relaxed">
						Think of Server Components as{" "}
						<strong className="text-foreground">
							templates that run on the server
						</strong>{" "}
						— like PHP or Rails views — but composable with the full React
						component model. They produce a virtual DOM description (the RSC
						payload) rather than raw HTML, which React on the client merges into
						the live tree without destroying existing client state.
					</p>
					<div className="grid gap-3 sm:grid-cols-3">
						{[
							{
								label: "Not like PHP",
								desc: "RSC output is not raw HTML — it's a structured tree description React can diff and merge.",
								color: "border-red-500/20 bg-red-500/5",
							},
							{
								label: "Not like SSR",
								desc: "Traditional SSR sends full HTML once. RSC streams a reusable payload the router can cache and reuse.",
								color: "border-yellow-500/20 bg-yellow-500/5",
							},
							{
								label: "Like a new primitive",
								desc: "Server Components are async components that exist in the React tree but execute in a separate environment.",
								color: "border-green-500/20 bg-green-500/5",
							},
						].map(({ label, desc, color }) => (
							<div className={cn("rounded-lg border p-3", color)} key={label}>
								<p className="mb-1 font-medium text-sm">{label}</p>
								<p className="text-muted-foreground text-xs leading-relaxed">
									{desc}
								</p>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
