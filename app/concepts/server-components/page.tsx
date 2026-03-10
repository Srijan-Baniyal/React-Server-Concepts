import type { Metadata } from "next";
import ServerComponents from "@/components/server/ServerComponents";

export const metadata: Metadata = {
	title: "Server Components | React Server Concepts",
	description:
		"Explore how the React Server/Client boundary works, why it matters for bundle size and performance, and what actually travels over the wire in RSC.",
	alternates: {
		canonical: "https://rsc.srijanbaniyal.com/concepts/server-components",
	},
	openGraph: {
		title: "Server Components | React Server Concepts",
		description:
			"Explore how the React Server/Client boundary works, why it matters for bundle size and performance, and what actually travels over the wire in RSC.",
		url: "https://rsc.srijanbaniyal.com/concepts/server-components",
		images: [
			{
				url: "https://rsc.srijanbaniyal.com/api/og",
				width: 1200,
				height: 630,
				alt: "Server Components",
			},
		],
	},
	twitter: {
		title: "Server Components | React Server Concepts",
		description:
			"Explore how the React Server/Client boundary works, why it matters for bundle size and performance, and what actually travels over the wire in RSC.",
		images: [
			{
				url: "https://rsc.srijanbaniyal.com/api/og",
				alt: "Server Components",
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function ServerComponentsPage() {
	return <ServerComponents />;
}
