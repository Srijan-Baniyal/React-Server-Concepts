import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "../providers/ReactQueryProvider";
import { ThemeProvider } from "../providers/ThemeProvider";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "React Server Concepts | RSC, React 19 & Next.js Deep Dive",
	description:
		"An interactive exploration of React Server Components, RSC architecture, React 19 features, streaming, suspense, and modern Next.js patterns — built by Srijan Baniyal.",
	manifest: "./manifest.json",
	keywords: [
		"React Server Components",
		"RSC",
		"React 19",
		"Next.js",
		"Server Actions",
		"Streaming",
		"Suspense",
		"React Architecture",
		"Srijan Baniyal",
	],
	authors: [{ name: "Srijan Baniyal", url: "https://srijanbaniyal.com" }],
	creator: "Srijan Baniyal",
	publisher: "Srijan Baniyal",
	alternates: {
		canonical: "https://rsc.srijanbaniyal.com",
	},
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" }, // ICO favicon
			{
				url: "/favicons/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png",
			},
			{
				url: "/favicons/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png",
			},
			{
				url: "/favicons/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				url: "/favicons/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
		apple: [
			{
				url: "/favicons/apple-touch-icon.png",
				sizes: "180x180",
				type: "image/png",
			},
		],
	},
	appleWebApp: {
		title: "React Server Concepts",
		statusBarStyle: "black-translucent",
		capable: true,
	},
	applicationName: "React Server Concepts",
	openGraph: {
		title: "React Server Concepts",
		description:
			"An interactive exploration of React Server Components, RSC architecture, React 19 features, streaming, suspense, and modern Next.js patterns.",
		url: "https://rsc.srijanbaniyal.com",
		siteName: "React Server Concepts",
		images: [
			{
				url: "https://rsc.srijanbaniyal.com/api/og",
				width: 1200,
				height: 630,
				alt: "React Server Concepts",
			},
			{
				url: "https://rsc.srijanbaniyal.com/api/og",
				width: 1200,
				height: 630,
				alt: "React Server Concepts",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		creator: "@srijanbaniyal",
		title: "React Server Concepts",
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
	category: "Technology",
	classification: "Portfolio Website",
	metadataBase: new URL("https://rsc.srijanbaniyal.com"),
	other: {
		"article:author": "https://www.x.com/srijanbaniyal",
		"profile:username": "srijanbaniyal",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className={inter.variable} lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider>
					<ReactQueryProvider>
						<Navigation />
						{children}
						<Toaster position={"top-center"} richColors />
					</ReactQueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
