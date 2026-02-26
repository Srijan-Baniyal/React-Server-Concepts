"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
								alt="RSC Logo"
								className="transition-transform duration-300 hover:rotate-12"
								src={L}
							/>
						</div>
						<span className="hidden bg-linear-to-r from-foreground to-foreground/70 bg-clip-text font-bold text-lg sm:inline-block">
							RSC Project
						</span>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<NavigationMenu className="hidden md:flex">
					<NavigationMenuList className="gap-1">
						<NavigationMenuItem>
							<NavigationMenuTrigger className="h-10 bg-transparent px-4 font-medium text-sm backdrop-blur-sm transition-all duration-300 hover:bg-accent/50 data-[state=open]:bg-accent/50">
								RSC Concepts
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div className="grid w-[400px] gap-3 rounded-lg border border-border/50 bg-background/95 p-4 shadow-2xl backdrop-blur-xl">
									<NavigationMenuLink
										className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:translate-x-1 hover:bg-linear-to-r hover:from-accent hover:to-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										href="/concepts/server-components"
									>
										<div className="flex items-center gap-2 font-semibold text-sm leading-none">
											<span className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 group-hover:h-2 group-hover:w-2" />
											Server Components
										</div>
										<p className="line-clamp-2 pl-3.5 text-muted-foreground text-sm leading-snug">
											Understand RSC architecture
										</p>
									</NavigationMenuLink>
									<Separator className="bg-linear-to-r from-transparent via-border to-transparent" />
									<NavigationMenuLink
										className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:translate-x-1 hover:bg-linear-to-r hover:from-accent hover:to-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										href="/concepts/streamingandsuspense"
									>
										<div className="flex items-center gap-2 font-semibold text-sm leading-none">
											<span className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 group-hover:h-2 group-hover:w-2" />
											Streaming & Suspense
										</div>
										<p className="line-clamp-2 pl-3.5 text-muted-foreground text-sm leading-snug">
											Progressive rendering patterns
										</p>
									</NavigationMenuLink>
									<Separator className="bg-linear-to-r from-transparent via-border to-transparent" />
									<NavigationMenuLink
										className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:translate-x-1 hover:bg-linear-to-r hover:from-accent hover:to-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										href="/concepts/navigation"
									>
										<div className="flex items-center gap-2 font-semibold text-sm leading-none">
											<span className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 group-hover:h-2 group-hover:w-2" />
											Partial Prerendering
										</div>
										<p className="line-clamp-2 pl-3.5 text-muted-foreground text-sm leading-snug">
											Static & dynamic content fusion
										</p>
									</NavigationMenuLink>
									<Separator className="bg-linear-to-r from-transparent via-border to-transparent" />
									<NavigationMenuLink
										className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:translate-x-1 hover:bg-linear-to-r hover:from-accent hover:to-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										href="/concepts/react-19"
									>
										<div className="flex items-center gap-2 font-semibold text-sm leading-none">
											<span className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 group-hover:h-2 group-hover:w-2" />
											React 19 Features
										</div>
										<p className="line-clamp-2 pl-3.5 text-muted-foreground text-sm leading-snug">
											Explore new React capabilities
										</p>
									</NavigationMenuLink>
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger className="h-10 bg-transparent px-4 font-medium text-sm backdrop-blur-sm transition-all duration-300 hover:bg-accent/50 data-[state=open]:bg-accent/50">
								Learning
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div className="grid w-[400px] gap-3 rounded-lg border border-border/50 bg-background/95 p-4 shadow-2xl backdrop-blur-xl">
									<NavigationMenuLink
										className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:translate-x-1 hover:bg-linear-to-r hover:from-accent hover:to-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										href="/learning/architecture"
									>
										<div className="flex items-center gap-2 font-semibold text-sm leading-none">
											<span className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 group-hover:h-2 group-hover:w-2" />
											Architecture Patterns
										</div>
										<p className="line-clamp-2 pl-3.5 text-muted-foreground text-sm leading-snug">
											RSC architecture patterns
										</p>
									</NavigationMenuLink>
									<Separator className="bg-linear-to-r from-transparent via-border to-transparent" />
									<NavigationMenuLink
										className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:translate-x-1 hover:bg-linear-to-r hover:from-accent hover:to-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
										href="/learning/best-practices"
									>
										<div className="flex items-center gap-2 font-semibold text-sm leading-none">
											<span className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 group-hover:h-2 group-hover:w-2" />
											Best Practices
										</div>
										<p className="line-clamp-2 pl-3.5 text-muted-foreground text-sm leading-snug">
											Optimization techniques
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
					<ThemeToggle />
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
							href="/demo"
						>
							<span className="relative text-primary-foreground">
								Explore Demo
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
						{/* RSC Concepts Section */}
						<div className="space-y-3">
							<h3 className="flex items-center gap-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
								<span className="h-px w-6 bg-linear-to-r from-primary to-transparent" />
								RSC Concepts
							</h3>
							<div className="space-y-2">
								<Link
									className="group block rounded-lg border border-border/40 bg-linear-to-br from-accent/40 to-accent/20 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-linear-to-br hover:from-accent/60 hover:to-accent/30 hover:shadow-lg hover:shadow-primary/5"
									href="/concepts/server-components"
									onClick={() => setMobileMenuOpen(false)}
								>
									<div className="font-semibold text-sm">Server Components</div>
									<p className="mt-1 text-muted-foreground text-xs leading-relaxed">
										Understand RSC architecture
									</p>
								</Link>
								<Link
									className="group block rounded-lg border border-border/40 bg-linear-to-br from-accent/40 to-accent/20 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-linear-to-br hover:from-accent/60 hover:to-accent/30 hover:shadow-lg hover:shadow-primary/5"
									href="/concepts/streaming"
									onClick={() => setMobileMenuOpen(false)}
								>
									<div className="font-semibold text-sm">
										Streaming & Suspense
									</div>
									<p className="mt-1 text-muted-foreground text-xs leading-relaxed">
										Progressive rendering patterns
									</p>
								</Link>
								<Link
									className="group block rounded-lg border border-border/40 bg-linear-to-br from-accent/40 to-accent/20 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-linear-to-br hover:from-accent/60 hover:to-accent/30 hover:shadow-lg hover:shadow-primary/5"
									href="/concepts/navigation"
									onClick={() => setMobileMenuOpen(false)}
								>
									<div className="font-semibold text-sm">
										Partial Prerendering
									</div>
									<p className="mt-1 text-muted-foreground text-xs leading-relaxed">
										Static & dynamic content fusion
									</p>
								</Link>
								<Link
									className="group block rounded-lg border border-border/40 bg-linear-to-br from-accent/40 to-accent/20 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-linear-to-br hover:from-accent/60 hover:to-accent/30 hover:shadow-lg hover:shadow-primary/5"
									href="/concepts/react-19"
									onClick={() => setMobileMenuOpen(false)}
								>
									<div className="font-semibold text-sm">React 19 Features</div>
									<p className="mt-1 text-muted-foreground text-xs leading-relaxed">
										Explore new React capabilities
									</p>
								</Link>
							</div>
						</div>

						<Separator className="bg-linear-to-r from-transparent via-border/50 to-transparent" />

						{/* Learning Section */}
						<div className="space-y-3">
							<h3 className="flex items-center gap-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
								<span className="h-px w-6 bg-linear-to-r from-primary to-transparent" />
								Learning
							</h3>
							<div className="space-y-2">
								<Link
									className="group block rounded-lg border border-border/40 bg-linear-to-br from-accent/40 to-accent/20 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-linear-to-br hover:from-accent/60 hover:to-accent/30 hover:shadow-lg hover:shadow-primary/5"
									href="/learning/architecture"
									onClick={() => setMobileMenuOpen(false)}
								>
									<div className="font-semibold text-sm">
										Architecture Patterns
									</div>
									<p className="mt-1 text-muted-foreground text-xs leading-relaxed">
										RSC architecture patterns
									</p>
								</Link>
								<Link
									className="group block rounded-lg border border-border/40 bg-linear-to-br from-accent/40 to-accent/20 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-linear-to-br hover:from-accent/60 hover:to-accent/30 hover:shadow-lg hover:shadow-primary/5"
									href="/learning/examples"
									onClick={() => setMobileMenuOpen(false)}
								>
									<div className="font-semibold text-sm">Code Examples</div>
									<p className="mt-1 text-muted-foreground text-xs leading-relaxed">
										Practical implementations
									</p>
								</Link>
								<Link
									className="group block rounded-lg border border-border/40 bg-linear-to-br from-accent/40 to-accent/20 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-linear-to-br hover:from-accent/60 hover:to-accent/30 hover:shadow-lg hover:shadow-primary/5"
									href="/learning/best-practices"
									onClick={() => setMobileMenuOpen(false)}
								>
									<div className="font-semibold text-sm">Best Practices</div>
									<p className="mt-1 text-muted-foreground text-xs leading-relaxed">
										Optimization techniques
									</p>
								</Link>
							</div>
						</div>

						<Separator className="bg-linear-to-r from-transparent via-border/50 to-transparent" />

						{/* Other Links */}
						<div className="space-y-2">
							<Link
								className="group flex items-center justify-between rounded-lg border border-border/40 bg-linear-to-br from-accent/40 to-accent/20 p-4 font-semibold text-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-linear-to-br hover:from-accent/60 hover:to-accent/30 hover:shadow-lg hover:shadow-primary/5"
								href="/experiments"
								onClick={() => setMobileMenuOpen(false)}
							>
								Experiments
							</Link>
						</div>

						<Separator className="bg-linear-to-r from-transparent via-border/50 to-transparent" />

						{/* Mobile CTA Button */}
						<Link href="/" onClick={() => setMobileMenuOpen(false)}>
							<Button
								className="relative w-full overflow-hidden rounded-lg border border-primary/20 bg-linear-to-r from-primary to-primary py-6 font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/30 hover:shadow-xl"
								size="lg"
							>
								<span className="relative text-primary-foreground">
									Explore Demo
								</span>
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}
