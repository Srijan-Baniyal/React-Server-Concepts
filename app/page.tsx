import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
	title: "React Server Concepts | RSC, React 19 & Next.js Deep Dive",
	description:
		"An interactive exploration of React Server Components, RSC architecture, React 19 features, streaming, suspense, and modern Next.js patterns — built by Srijan Baniyal.",
	alternates: { canonical: "https://rsc.srijanbaniyal.com" },
	openGraph: {
		title: "React Server Concepts | RSC, React 19 & Next.js Deep Dive",
		description:
			"An interactive exploration of React Server Components, RSC architecture, React 19 features, streaming, suspense, and modern Next.js patterns.",
		url: "https://rsc.srijanbaniyal.com",
		images: [
			{
				url: "https://rsc.srijanbaniyal.com/api/og",
				width: 1200,
				height: 630,
				alt: "React Server Concepts",
			},
		],
	},
	twitter: {
		title: "React Server Concepts | RSC, React 19 & Next.js Deep Dive",
		description:
			"An interactive exploration of React Server Components, RSC architecture, React 19 features, streaming, suspense, and modern Next.js patterns.",
		images: [
			{
				url: "https://rsc.srijanbaniyal.com/api/og",
				alt: "React Server Concepts",
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function Page() {
	return <HeroSection />;
}
