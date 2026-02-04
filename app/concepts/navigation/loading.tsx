import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function NavigationLoading() {
	return (
		<div className="space-y-6">
			<Card className="overflow-hidden border-border/40 bg-card/50">
				<CardContent className="p-6">
					<div className="grid gap-6 md:grid-cols-2">
						<Skeleton className="aspect-square rounded-2xl" />
						<div className="space-y-4">
							<Skeleton className="h-8 w-32" />
							<Skeleton className="h-6 w-48" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-3/4" />
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
			<Card className="border-purple-500/20 bg-purple-500/5">
				<CardContent className="p-4">
					<div className="flex items-center gap-3">
						<Skeleton className="h-8 w-8 rounded-full" />
						<div className="flex-1 space-y-2">
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-3 w-full" />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
