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
	title: "React Server Concepts Exploration and Experimentation",
	description: "A deep dive into React Server Actions and Components.",
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
