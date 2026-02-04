"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Error caught by boundary:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<Card className="border-destructive/20 bg-destructive/5 backdrop-blur-sm">
					<CardContent className="p-6">
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
									<span className="text-lg">⚠️</span>
								</div>
								<div className="flex-1 space-y-1">
									<p className="font-medium text-destructive">
										Something went wrong
									</p>
									<p className="text-muted-foreground text-sm">
										An error occurred while rendering this component
									</p>
								</div>
							</div>
							<div className="rounded-xl border border-destructive/20 bg-destructive/3 p-4">
								<p className="font-mono text-destructive text-sm">
									{this.state.error?.message || "Unknown error"}
								</p>
							</div>
							<Button
								className="w-full"
								onClick={() => this.setState({ hasError: false, error: null })}
								variant="outline"
							>
								Try Again
							</Button>
						</div>
					</CardContent>
				</Card>
			);
		}

		return this.props.children;
	}
}
