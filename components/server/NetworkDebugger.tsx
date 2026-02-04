"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface RequestLog {
	id: string;
	type: "server" | "client";
	method: string;
	url: string;
	timestamp: Date;
	status?: number;
}

export function NetworkDebugger() {
	const [logs, setLogs] = useState<RequestLog[]>([]);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Intercept console logs to capture our custom request logs
		const originalLog = console.log;
		let requestCounter = 0;

		console.log = (...args) => {
			const message = args.join(" ");

			if (
				message.includes("[SERVER REQUEST]") ||
				message.includes("[CLIENT REQUEST]")
			) {
				const isServer = message.includes("[SERVER REQUEST]");
				const parts = message.split(" ");

				setLogs((prev) => [
					{
						id: `${Date.now()}-${requestCounter++}-${Math.random().toString(36).slice(2, 11)}`,
						type: isServer ? "server" : "client",
						method: parts[2] || "GET",
						url: parts.slice(3).join(" "),
						timestamp: new Date(),
					},
					...prev.slice(0, 19), // Keep last 20 logs
				]);
			}

			originalLog(...args);
		};

		return () => {
			console.log = originalLog;
		};
	}, []);

	if (!isVisible) {
		return (
			<div className="fixed right-6 bottom-6 z-50">
				<Button
					className="rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
					onClick={() => setIsVisible(true)}
					size="sm"
					variant="outline"
				>
					<span className="mr-2">📡</span> Network ({logs.length})
				</Button>
			</div>
		);
	}

	return (
		<div className="fixed right-6 bottom-6 z-50 w-96">
			<Card className="overflow-hidden border-border/40 bg-card/95 shadow-2xl backdrop-blur-xl">
				<CardHeader className="border-border/40 border-b pb-4">
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="text-base">Network Monitor</CardTitle>
							<CardDescription className="text-xs">
								Tracking {logs.length} request{logs.length !== 1 ? "s" : ""}
							</CardDescription>
						</div>
						<Button
							className="h-8 w-8 rounded-full p-0 transition-colors"
							onClick={() => setIsVisible(false)}
							size="sm"
							variant="ghost"
						>
							✕
						</Button>
					</div>
					<div className="mt-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-2.5">
						<p className="text-[10px] text-muted-foreground leading-relaxed">
							<span className="font-semibold text-yellow-600 dark:text-yellow-500">
								Note:
							</span>{" "}
							Server Component requests cannot be tracked here because they
							execute on the server (Node.js) before the page is sent to your
							browser. Only client-side requests are visible in this monitor.
						</p>
					</div>
				</CardHeader>
				<CardContent className="max-h-96 space-y-2 overflow-y-auto p-4">
					{logs.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-12 text-center">
							<div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted/50">
								<span className="text-2xl">📡</span>
							</div>
							<p className="text-muted-foreground text-sm">No requests yet</p>
						</div>
					) : (
						logs.map((log) => (
							<div
								className="space-y-2 rounded-xl border border-border/40 bg-background/50 p-3 backdrop-blur-sm transition-all duration-200 hover:border-border/60"
								key={log.id}
							>
								<div className="flex items-center justify-between">
									<Badge
										className={`rounded-full font-normal ${
											log.type === "server"
												? "bg-green-500/10 text-green-600 dark:text-green-400"
												: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
										}`}
										variant="secondary"
									>
										{log.type === "server" ? "Server" : "Client"}
									</Badge>
									<span className="text-[10px] text-muted-foreground">
										{log.timestamp.toLocaleTimeString()}
									</span>
								</div>
								<div className="font-mono text-[11px] leading-relaxed">
									<span className="font-semibold">{log.method}</span>{" "}
									<span className="text-muted-foreground">{log.url}</span>
								</div>
							</div>
						))
					)}
				</CardContent>
			</Card>
		</div>
	);
}
