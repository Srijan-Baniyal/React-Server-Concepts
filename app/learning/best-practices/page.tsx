import type { Metadata } from "next";
import { BestPracticesChecklist } from "@/components/best-practices/BestPracticesChecklist";
import { BestPracticesHero } from "@/components/best-practices/BestPracticesHero";
import { CachingStrategy } from "@/components/best-practices/CachingStrategy";
import { ComponentBoundaries } from "@/components/best-practices/ComponentBoundaries";
import { DataFetchingGuidelines } from "@/components/best-practices/DataFetchingGuidelines";
import { ErrorHandlingBP } from "@/components/best-practices/ErrorHandlingBP";
import { PerformanceOptimizations } from "@/components/best-practices/PerformanceOptimizations";
import { SecurityPractices } from "@/components/best-practices/SecurityPractices";
import { ServerActionsBP } from "@/components/best-practices/ServerActionsBP";
import { StreamingPatterns } from "@/components/best-practices/StreamingPatterns";
import { TypeScriptPatterns } from "@/components/best-practices/TypeScriptPatterns";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
	title: "Best Practices | React Server Concepts",
	description:
		"Actionable best practices for building with React Server Components — from component boundaries and data fetching to caching, streaming, security, and performance optimization.",
	alternates: {
		canonical: "https://reactserverthings.vercel.app/learning/best-practices",
	},
	openGraph: {
		title: "Best Practices | React Server Concepts",
		description:
			"Actionable best practices for building with React Server Components — from component boundaries and data fetching to caching, streaming, security, and performance optimization.",
		url: "https://reactserverthings.vercel.app/learning/best-practices",
		images: [
			{
				url: "https://reactserverthings.vercel.app/api/og",
				width: 1200,
				height: 630,
				alt: "Best Practices",
			},
		],
	},
	twitter: {
		title: "Best Practices | React Server Concepts",
		description:
			"Actionable best practices for building with React Server Components — from component boundaries and data fetching to caching, streaming, security, and performance optimization.",
		images: [
			{
				url: "https://reactserverthings.vercel.app/api/og",
				alt: "Best Practices",
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function BestPracticesPage() {
	return (
		<div className="container mx-auto max-w-7xl space-y-16 px-4 pt-24 pb-16 sm:px-6 md:pt-28 lg:px-8">
			<BestPracticesHero />
			<Separator />
			<ComponentBoundaries />
			<Separator />
			<DataFetchingGuidelines />
			<Separator />
			<CachingStrategy />
			<Separator />
			<StreamingPatterns />
			<Separator />
			<ServerActionsBP />
			<Separator />
			<SecurityPractices />
			<Separator />
			<PerformanceOptimizations />
			<Separator />
			<TypeScriptPatterns />
			<Separator />
			<ErrorHandlingBP />
			<Separator />
			<BestPracticesChecklist />
		</div>
	);
}
