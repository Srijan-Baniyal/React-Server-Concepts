"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const DEMO_ROUTES = [
	{ id: "ditto", name: "Ditto", path: "/concepts/navigation/ditto" },
	{ id: "mew", name: "Mew", path: "/concepts/navigation/mew" },
	{ id: "eevee", name: "Eevee", path: "/concepts/navigation/eevee" },
];

export function NavigationTabs() {
	const pathname = usePathname();

	return (
		<Card className="overflow-hidden border-border/40 bg-card/50">
			<CardContent className="p-4">
				<div className="flex flex-col gap-4">
					<div>
						<h3 className="mb-1 font-semibold text-sm">
							Client Component Navigation
						</h3>
						<p className="text-muted-foreground text-xs">
							This nav stays mounted while content below streams in
						</p>
					</div>
					<div className="flex flex-wrap gap-2">
						{DEMO_ROUTES.map((route) => {
							const isActive = pathname === route.path;
							return (
								<Link href={route.path} key={route.id}>
									<Badge
										className={`cursor-pointer px-4 py-2 text-sm transition-all duration-200 ${
											isActive
												? "border-primary bg-primary text-primary-foreground shadow-sm"
												: "border-border/40 hover:border-border/60 hover:bg-accent"
										}`}
										variant="outline"
									>
										{route.name}
									</Badge>
								</Link>
							);
						})}
					</div>
					{pathname && !DEMO_ROUTES.some((r) => r.path === pathname) && (
						<div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
							<p className="text-muted-foreground text-xs">
								Click a Pokémon above to see partial rendering in action
							</p>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
