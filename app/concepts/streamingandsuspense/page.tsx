import type { Metadata } from "next";
import StreamingAndSuspense from "@/components/streaming/StreamingAndSuspense";

export const metadata: Metadata = {
	title: "Streaming & Suspense | React Server Concepts",
	description:
		"Progressive rendering in action — how React streams HTML, selective hydration, nested Suspense boundaries, and streaming architecture patterns in Next.js.",
	alternates: {
		canonical: "https://rsc.srijanbaniyal.com/concepts/streamingandsuspense",
	},
	openGraph: {
		title: "Streaming & Suspense | React Server Concepts",
		description:
			"Progressive rendering in action — how React streams HTML, selective hydration, nested Suspense boundaries, and streaming architecture patterns.",
		url: "https://rsc.srijanbaniyal.com/concepts/streamingandsuspense",
		images: [
			{
				url: "https://rsc.srijanbaniyal.com/api/og",
				width: 1200,
				height: 630,
				alt: "Streaming & Suspense",
			},
		],
	},
	twitter: {
		title: "Streaming & Suspense | React Server Concepts",
		description:
			"Progressive rendering in action — how React streams HTML, selective hydration, nested Suspense boundaries, and streaming architecture patterns.",
		images: [
			{
				url: "https://rsc.srijanbaniyal.com/api/og",
				alt: "Streaming & Suspense",
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function StreamingPage() {
	return <StreamingAndSuspense />;
}
