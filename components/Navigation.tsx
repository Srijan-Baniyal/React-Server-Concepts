"use client";

import { ListIcon, MoonIcon, SunIcon, XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/Utils";
import L from "@/public/favicon/apple-touch-icon.png";

export default function Navigation() {
	const { theme, setTheme, resolvedTheme } = useNextTheme();
	const [mounted, setMounted] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<header className="sticky top-0 z-50 w-full">
			<div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
			<nav className="container relative mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-3">
					<Link
						className="flex items-center gap-3 transition-all duration-300 hover:scale-105"
						href="/"
					>
						<div className="flex size-9 items-center justify-center rounded-lg transition-all duration-300">
							<Image
								alt="KG Builder Logo"
								className="transition-transform duration-300 hover:rotate-12"
								src={L}
							/>
						</div>
						<span className="hidden bg-linear-to-r from-foreground to-foreground/70 bg-clip-text font-bold text-lg sm:inline-block">
							KG Builder
						</span>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<NavigationMenu className="hidden md:flex">
					<NavigationMenuList className="gap-1">
						<NavigationMenuItem>
							<NavigationMenuTrigger className="h-10 bg-transparent px-4 font-medium text-sm backdrop-blur-sm transition-all duration-300 hover:bg-accent/50 data-[state=open]:bg-accent/50">
								Features
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div className="grid w-[400px] gap-3 rounded-lg border border-border/50 bg-background/95 p-4 shadow-2xl backdrop-blur-xl">
									<NavigationMenuLink
										className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:translate-x-1 hover:bg-linear-to-r hover:from-accent hover:to-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										href="/features/graph-builder"
									>
										<div className="flex items-center gap-2 font-semibold text-sm leading-none">
											<span className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 group-hover:h-2 group-hover:w-2" />
											Graph Builder
										</div>
										<p className="line-clamp-2 pl-3.5 text-muted-foreground text-sm leading-snug">
											Build knowledge graphs visually
										</p>
									</NavigationMenuLink>
									<Separator className="bg-linear-to-r from-transparent via-border to-transparent" />
									<NavigationMenuLink
										className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:translate-x-1 hover:bg-linear-to-r hover:from-accent hover:to-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										href="/features/schema-designer"
									>
										<div className="flex items-center gap-2 font-semibold text-sm leading-none">
											<span className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 group-hover:h-2 group-hover:w-2" />
											Schema Designer
										</div>
										<p className="line-clamp-2 pl-3.5 text-muted-foreground text-sm leading-snug">
											Design your graph schema
										</p>
									</NavigationMenuLink>
									<Separator className="bg-linear-to-r from-transparent via-border to-transparent" />
									<NavigationMenuLink
										className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:translate-x-1 hover:bg-linear-to-r hover:from-accent hover:to-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										href="/features/query-editor"
									>
										<div className="flex items-center gap-2 font-semibold text-sm leading-none">
											<span className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 group-hover:h-2 group-hover:w-2" />
											Query Editor
										</div>
										<p className="line-clamp-2 pl-3.5 text-muted-foreground text-sm leading-snug">
											Execute queries efficiently
										</p>
									</NavigationMenuLink>
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger className="h-10 bg-transparent px-4 font-medium text-sm backdrop-blur-sm transition-all duration-300 hover:bg-accent/50 data-[state=open]:bg-accent/50">
								Resources
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div className="grid w-[400px] gap-3 rounded-lg border border-border/50 bg-background/95 p-4 shadow-2xl backdrop-blur-xl">
									<NavigationMenuLink
										className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:translate-x-1 hover:bg-linear-to-r hover:from-accent hover:to-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										href="/resources/documentation"
									>
										<div className="flex items-center gap-2 font-semibold text-sm leading-none">
											<span className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 group-hover:h-2 group-hover:w-2" />
											Documentation
										</div>
										<p className="line-clamp-2 pl-3.5 text-muted-foreground text-sm leading-snug">
											Learn how to use KG Builder
										</p>
									</NavigationMenuLink>
									<Separator className="bg-linear-to-r from-transparent via-border to-transparent" />
									<NavigationMenuLink
										className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:translate-x-1 hover:bg-linear-to-r hover:from-accent hover:to-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										href="/resources/tutorials"
									>
										<div className="flex items-center gap-2 font-semibold text-sm leading-none">
											<span className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 group-hover:h-2 group-hover:w-2" />
											Tutorials
										</div>
										<p className="line-clamp-2 pl-3.5 text-muted-foreground text-sm leading-snug">
											Step-by-step guides
										</p>
									</NavigationMenuLink>
									<Separator className="bg-linear-to-r from-transparent via-border to-transparent" />
									<NavigationMenuLink
										className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:translate-x-1 hover:bg-linear-to-r hover:from-accent hover:to-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										href="/resources/api-reference"
									>
										<div className="flex items-center gap-2 font-semibold text-sm leading-none">
											<span className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 group-hover:h-2 group-hover:w-2" />
											API Reference
										</div>
										<p className="line-clamp-2 pl-3.5 text-muted-foreground text-sm leading-snug">
											Complete API documentation
										</p>
									</NavigationMenuLink>
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink
								className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 font-medium text-sm backdrop-blur-sm transition-all duration-300 hover:bg-accent/50"
								href="/about"
							>
								About
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				<div className="flex items-center gap-3">
					{/* Theme Toggle Button */}
					<Button
						aria-label="Toggle theme"
						className="relative h-10 w-10 rounded-lg border border-border/50 bg-accent/20 p-0 transition-all duration-300 hover:scale-105 hover:border-border hover:bg-accent/40"
						onClick={toggleTheme}
						size="icon"
						variant="ghost"
					>
						{mounted ? (
							<div className="relative flex h-full w-full items-center justify-center">
								<SunIcon
									className={cn(
										"absolute h-5 w-5 transition-all duration-500",
										resolvedTheme === "light"
											? "rotate-0 scale-100 opacity-100"
											: "rotate-180 scale-0 opacity-0"
									)}
									weight="duotone"
								/>
								<MoonIcon
									className={cn(
										"absolute h-5 w-5 transition-all duration-500",
										resolvedTheme === "dark"
											? "rotate-0 scale-100 opacity-100"
											: "-rotate-180 scale-0 opacity-0"
									)}
									weight="duotone"
								/>
							</div>
						) : (
							<div className="h-5 w-5" />
						)}
					</Button>

					{/* Separator */}
					<Separator
						className="hidden h-8 bg-linear-to-b from-transparent via-border/60 to-transparent sm:block"
						orientation="vertical"
					/>

					{/* Desktop CTA Button */}
					<Button
						className="relative hidden h-10 overflow-hidden rounded-lg border border-primary/20 bg-linear-to-r from-primary to-primary px-6 font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-primary/30 hover:shadow-xl sm:flex"
						size="default"
					>
						<Link
							className="flex h-full w-full items-center justify-center"
							href="/dashboard"
						>
							<span className="relative text-primary-foreground">
								Get Started
							</span>
						</Link>
					</Button>

					{/* Mobile Menu Toggle */}
					<Button
						aria-label="Toggle menu"
						className="relative h-10 w-10 rounded-lg border border-border/50 bg-accent/20 p-0 transition-all duration-300 hover:scale-105 hover:border-border hover:bg-accent/40 md:hidden"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						size="icon"
						variant="ghost"
					>
						<div className="relative flex h-full w-full items-center justify-center">
							<ListIcon
								className={cn(
									"absolute h-5 w-5 transition-all duration-500",
									mobileMenuOpen
										? "rotate-90 scale-0 opacity-0"
										: "rotate-0 scale-100 opacity-100"
								)}
								weight="bold"
							/>
							<XIcon
								className={cn(
									"absolute h-5 w-5 transition-all duration-500",
									mobileMenuOpen
										? "rotate-0 scale-100 opacity-100"
										: "-rotate-90 scale-0 opacity-0"
								)}
								weight="bold"
							/>
						</div>
					</Button>
				</div>
			</nav>

			{/* Mobile Menu */}
			<div
				className={cn(
					"absolute top-16 right-0 left-0 overflow-hidden border-border/50 border-b transition-all duration-500 ease-in-out md:hidden",
					mobileMenuOpen
						? "max-h-[calc(100vh-4rem)] opacity-100"
						: "max-h-0 border-transparent opacity-0"
				)}
			>
				<div className="relative shadow-2xl">
					<div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />

					<div className="container relative mx-auto space-y-6 px-4 py-6 sm:px-6">
						{/* Features Section */}
						<div className="space-y-3">
							<h3 className="flex items-center gap-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
								<span className="h-px w-6 bg-linear-to-r from-primary to-transparent" />
								Features
							</h3>
							<div className="space-y-2">
								<Link
									className="group block rounded-lg border border-border/40 bg-linear-to-br from-accent/40 to-accent/20 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-linear-to-br hover:from-accent/60 hover:to-accent/30 hover:shadow-lg hover:shadow-primary/5"
									href="/features/graph-builder"
									onClick={() => setMobileMenuOpen(false)}
								>
									<div className="font-semibold text-sm">Graph Builder</div>
									<p className="mt-1 text-muted-foreground text-xs leading-relaxed">
										Build knowledge graphs visually
									</p>
								</Link>
								<Link
									className="group block rounded-lg border border-border/40 bg-linear-to-br from-accent/40 to-accent/20 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-linear-to-br hover:from-accent/60 hover:to-accent/30 hover:shadow-lg hover:shadow-primary/5"
									href="/features/schema-designer"
									onClick={() => setMobileMenuOpen(false)}
								>
									<div className="font-semibold text-sm">Schema Designer</div>
									<p className="mt-1 text-muted-foreground text-xs leading-relaxed">
										Design your graph schema
									</p>
								</Link>
								<Link
									className="group block rounded-lg border border-border/40 bg-linear-to-br from-accent/40 to-accent/20 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-linear-to-br hover:from-accent/60 hover:to-accent/30 hover:shadow-lg hover:shadow-primary/5"
									href="/features/query-editor"
									onClick={() => setMobileMenuOpen(false)}
								>
									<div className="font-semibold text-sm">Query Editor</div>
									<p className="mt-1 text-muted-foreground text-xs leading-relaxed">
										Execute queries efficiently
									</p>
								</Link>
							</div>
						</div>

						<Separator className="bg-linear-to-r from-transparent via-border/50 to-transparent" />

						{/* Resources Section */}
						<div className="space-y-3">
							<h3 className="flex items-center gap-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
								<span className="h-px w-6 bg-linear-to-r from-primary to-transparent" />
								Resources
							</h3>
							<div className="space-y-2">
								<Link
									className="group block rounded-lg border border-border/40 bg-linear-to-br from-accent/40 to-accent/20 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-linear-to-br hover:from-accent/60 hover:to-accent/30 hover:shadow-lg hover:shadow-primary/5"
									href="/resources/documentation"
									onClick={() => setMobileMenuOpen(false)}
								>
									<div className="font-semibold text-sm">Documentation</div>
									<p className="mt-1 text-muted-foreground text-xs leading-relaxed">
										Learn how to use KG Builder
									</p>
								</Link>
								<Link
									className="group block rounded-lg border border-border/40 bg-linear-to-br from-accent/40 to-accent/20 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-linear-to-br hover:from-accent/60 hover:to-accent/30 hover:shadow-lg hover:shadow-primary/5"
									href="/resources/tutorials"
									onClick={() => setMobileMenuOpen(false)}
								>
									<div className="font-semibold text-sm">Tutorials</div>
									<p className="mt-1 text-muted-foreground text-xs leading-relaxed">
										Step-by-step guides
									</p>
								</Link>
								<Link
									className="group block rounded-lg border border-border/40 bg-linear-to-br from-accent/40 to-accent/20 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-linear-to-br hover:from-accent/60 hover:to-accent/30 hover:shadow-lg hover:shadow-primary/5"
									href="/resources/api-reference"
									onClick={() => setMobileMenuOpen(false)}
								>
									<div className="font-semibold text-sm">API Reference</div>
									<p className="mt-1 text-muted-foreground text-xs leading-relaxed">
										Complete API documentation
									</p>
								</Link>
							</div>
						</div>

						<Separator className="bg-linear-to-r from-transparent via-border/50 to-transparent" />

						{/* Other Links */}
						<div className="space-y-2">
							<Link
								className="group flex items-center justify-between rounded-lg border border-border/40 bg-linear-to-br from-accent/40 to-accent/20 p-4 font-semibold text-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-linear-to-br hover:from-accent/60 hover:to-accent/30 hover:shadow-lg hover:shadow-primary/5"
								href="/pricing"
								onClick={() => setMobileMenuOpen(false)}
							>
								Pricing
							</Link>
							<Link
								className="group flex items-center justify-between rounded-lg border border-border/40 bg-linear-to-br from-accent/40 to-accent/20 p-4 font-semibold text-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-linear-to-br hover:from-accent/60 hover:to-accent/30 hover:shadow-lg hover:shadow-primary/5"
								href="/about"
								onClick={() => setMobileMenuOpen(false)}
							>
								About
							</Link>
						</div>

						<Separator className="bg-linear-to-r from-transparent via-border/50 to-transparent" />

						{/* Mobile CTA Button */}
						<Button
							className="relative w-full overflow-hidden rounded-lg border border-primary/20 bg-linear-to-r from-primary to-primary py-6 font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/30 hover:shadow-xl"
							onClick={() => setMobileMenuOpen(false)}
							size="lg"
						>
							<span className="relative text-primary-foreground">
								Get Started
							</span>
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
