import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
	title: "Navigation & Partial Updates | React Server Concepts",
	description:
		"See how Next.js layouts persist while content streams in — an interactive demo of navigation, partial rendering, and layout persistence with Pokémon data.",
	alternates: {
		canonical: "https://reactserverthings.vercel.app/concepts/navigation",
	},
	openGraph: {
		title: "Navigation & Partial Updates | React Server Concepts",
		description:
			"See how Next.js layouts persist while content streams in — an interactive demo of navigation, partial rendering, and layout persistence.",
		url: "https://reactserverthings.vercel.app/concepts/navigation",
		images: [
			{
				url: "https://reactserverthings.vercel.app/api/og",
				width: 1200,
				height: 630,
				alt: "Navigation & Partial Updates",
			},
		],
	},
	twitter: {
		title: "Navigation & Partial Updates | React Server Concepts",
		description:
			"See how Next.js layouts persist while content streams in — an interactive demo of navigation, partial rendering, and layout persistence.",
		images: [
			{
				url: "https://reactserverthings.vercel.app/api/og",
				alt: "Navigation & Partial Updates",
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function NavigationIndexPage() {
	return (
		<Card className="border-border/40 bg-card/50">
			<CardContent className="flex flex-col items-center justify-center py-20 text-center">
				<div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted/50">
					<span className="text-4xl">🧭</span>
				</div>
				<h2 className="mb-2 font-semibold text-2xl">
					Select a Pokémon to Begin
				</h2>
				<p className="text-muted-foreground">
					Click a tab above to see how the content area updates while the layout
					persists
				</p>
			</CardContent>
		</Card>
	);
}
