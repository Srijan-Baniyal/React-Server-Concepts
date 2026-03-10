import type { Metadata } from "next";
import React19Page from "@/components/react19/React19Page";

export const metadata: Metadata = {
	title: "React 19 Features | React Server Concepts",
	description:
		"Live demos for React 19 features — useOptimistic, useFormStatus, useActionState, the React Compiler, Activity API, and View Transitions.",
	alternates: { canonical: "https://rsc.srijanbaniyal.com/concepts/react-19" },
	openGraph: {
		title: "React 19 Features | React Server Concepts",
		description:
			"Live demos for React 19 features — useOptimistic, useFormStatus, useActionState, the React Compiler, Activity API, and View Transitions.",
		url: "https://rsc.srijanbaniyal.com/concepts/react-19",
		images: [
			{
				url: "https://rsc.srijanbaniyal.com/api/og",
				width: 1200,
				height: 630,
				alt: "React 19 Features",
			},
		],
	},
	twitter: {
		title: "React 19 Features | React Server Concepts",
		description:
			"Live demos for React 19 features — useOptimistic, useFormStatus, useActionState, the React Compiler, Activity API, and View Transitions.",
		images: [
			{
				url: "https://rsc.srijanbaniyal.com/api/og",
				alt: "React 19 Features",
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function React19() {
	return <React19Page />;
}
