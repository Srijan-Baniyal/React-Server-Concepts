"use client";

import {
	AtomIcon,
	BlueprintIcon,
	BookOpenIcon,
	CodeIcon,
	ListIcon,
	WaveSineIcon,
	X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
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
import { cn } from "@/lib/Utils";
import L from "@/public/favicon/apple-touch-icon.png";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { scrollY } = useScroll();
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		return scrollY.on("change", (latest) => {
			setIsScrolled(latest > 20);
		});
	}, [scrollY]);

	return (
		<>
			<motion.header
				animate={{ y: 0, opacity: 1 }}
				className={cn(
					"fixed top-4 right-0 left-0 z-50 mx-auto w-[95%] max-w-7xl rounded-full border border-transparent transition-all duration-300 md:top-6",
					isScrolled
						? "border-border/40 bg-background/80 shadow-primary/5 shadow-xl backdrop-blur-xl supports-backdrop-filter:bg-background/60"
						: "bg-transparent"
				)}
				initial={{ y: -100, opacity: 0 }}
				transition={{
					duration: 0.5,
					type: "spring",
					stiffness: 200,
					damping: 20,
				}}
			>
				<nav className="relative flex h-14 items-center justify-between px-4 sm:px-6 md:h-16">
					<Link className="group flex items-center gap-3" href="/">
						<div className="relative flex size-9 items-center justify-center overflow-hidden rounded-xl transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
							<Image
								alt="RSC Logo"
								className="transition-transform duration-300 group-hover:scale-110"
								height={36}
								src={L}
								width={36}
							/>
						</div>
						<span className="hidden font-bold text-foreground text-lg tracking-tight sm:inline-block">
							<span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
								RSC
							</span>{" "}
							Concepts
						</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:block">
						<NavigationMenu>
							<NavigationMenuList className="gap-2">
								<NavigationMenuItem>
									<NavigationMenuTrigger className="h-9 rounded-full bg-transparent px-4 font-medium text-foreground text-sm transition-colors hover:bg-accent hover:text-accent-foreground">
										Concepts
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
											<li className="row-span-3">
												<Link
													className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
													href="/"
												>
													<div className="mt-4 mb-2 font-medium text-lg">
														React Server Concepts
													</div>
													<p className="text-muted-foreground text-sm leading-tight">
														A deep dive into the architecture of modern React
														applications.
													</p>
												</Link>
											</li>
											<li>
												<Link
													className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
													href="/concepts/server-components"
												>
													<div className="font-medium text-sm leading-none">
														Server Components
													</div>
													<p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
														Zero-bundle server logic directly in your
														components.
													</p>
												</Link>
											</li>
											<li>
												<Link
													className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
													href="/concepts/streamingandsuspense"
												>
													<div className="font-medium text-sm leading-none">
														Streaming & Suspense
													</div>
													<p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
														Progressive rendering for instant loading states.
													</p>
												</Link>
											</li>
											<li>
												<Link
													className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
													href="/concepts/react-19"
												>
													<div className="font-medium text-sm leading-none">
														React 19
													</div>
													<p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
														The latest features powering the next generation of
														web apps.
													</p>
												</Link>
											</li>
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuTrigger className="h-9 rounded-full bg-transparent px-4 font-medium text-foreground text-sm transition-colors hover:bg-accent hover:text-accent-foreground">
										Learning
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
											<li>
												<Link
													className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
													href="/learning/architecture"
												>
													<div className="font-medium text-sm leading-none">
														Architecture
													</div>
													<p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
														Deep dives into system design patterns.
													</p>
												</Link>
											</li>
											<li>
												<Link
													className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
													href="/learning/best-practices"
												>
													<div className="font-medium text-sm leading-none">
														Best Practices
													</div>
													<p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
														Optimization and security guidelines.
													</p>
												</Link>
											</li>
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuLink
										className="h-9 rounded-full bg-transparent px-4 py-2 font-medium text-foreground text-sm transition-colors hover:bg-accent hover:text-accent-foreground data-active:bg-accent/50"
										href="/about"
									>
										About
									</NavigationMenuLink>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					<div className="flex items-center gap-2">
						<ThemeToggle />

						<Button
							className="hidden h-9 rounded-full bg-primary px-5 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-primary/40 sm:flex"
							size="sm"
						>
							<Link href="/demo">Start Demo</Link>
						</Button>

						{/* Mobile Menu Toggle */}
						<Button
							aria-label="Toggle menu"
							className="relative z-50 h-9 w-9 rounded-full border border-input bg-background md:hidden"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							size="icon"
							variant="outline"
						>
							<AnimatePresence mode="wait">
								{mobileMenuOpen ? (
									<motion.div
										animate={{ rotate: 0, opacity: 1 }}
										exit={{ rotate: 90, opacity: 0 }}
										initial={{ rotate: -90, opacity: 0 }}
										key="close"
										transition={{ duration: 0.2 }}
									>
										<X className="size-4" weight="bold" />
									</motion.div>
								) : (
									<motion.div
										animate={{ rotate: 0, opacity: 1 }}
										exit={{ rotate: -90, opacity: 0 }}
										initial={{ rotate: 90, opacity: 0 }}
										key="menu"
										transition={{ duration: 0.2 }}
									>
										<ListIcon className="size-4" weight="bold" />
									</motion.div>
								)}
							</AnimatePresence>
						</Button>
					</div>
				</nav>
			</motion.header>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{mobileMenuOpen && (
					<motion.div
						animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
						className="fixed inset-0 z-40 bg-background/80 md:hidden"
						exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
						initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
						onClick={() => setMobileMenuOpen(false)}
						transition={{ duration: 0.3 }}
					>
						<motion.div
							animate={{ y: 0 }}
							className="absolute inset-x-0 top-0 overflow-hidden border-b bg-background pt-24 pb-8 shadow-2xl"
							exit={{ y: "-100%" }}
							initial={{ y: "-100%" }}
							onClick={(e) => e.stopPropagation()}
							transition={{ type: "spring", stiffness: 300, damping: 30 }}
						>
							<div className="container mx-auto px-6">
								<div className="grid gap-6">
									<div className="space-y-4">
										<h4 className="font-medium text-muted-foreground text-sm uppercase tracking-widest">
											Concepts
										</h4>
										<div className="grid grid-cols-1 gap-2">
											<MobileLink
												href="/concepts/server-components"
												icon={CodeIcon}
												setOpen={setMobileMenuOpen}
											>
												Server Components
											</MobileLink>
											<MobileLink
												href="/concepts/streamingandsuspense"
												icon={WaveSineIcon}
												setOpen={setMobileMenuOpen}
											>
												Streaming & Suspense
											</MobileLink>
											<MobileLink
												href="/concepts/react-19"
												icon={AtomIcon}
												setOpen={setMobileMenuOpen}
											>
												React 19
											</MobileLink>
										</div>
									</div>
									<div className="space-y-4">
										<h4 className="font-medium text-muted-foreground text-sm uppercase tracking-widest">
											Learning
										</h4>
										<div className="grid grid-cols-1 gap-2">
											<MobileLink
												href="/learning/architecture"
												icon={BlueprintIcon}
												setOpen={setMobileMenuOpen}
											>
												Architecture
											</MobileLink>
											<MobileLink
												href="/learning/best-practices"
												icon={BookOpenIcon}
												setOpen={setMobileMenuOpen}
											>
												Best Practices
											</MobileLink>
										</div>
									</div>

									<Button className="w-full rounded-full" size="lg">
										<Link href="/demo" onClick={() => setMobileMenuOpen(false)}>
											Start Demo
										</Link>
									</Button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

function MobileLink({
	href,
	children,
	icon: Icon,
	setOpen,
}: {
	href: string;
	children: React.ReactNode;
	icon: React.ElementType;
	setOpen: (open: boolean) => void;
}) {
	return (
		<Link
			className="group flex items-center gap-3 rounded-lg border border-transparent p-3 transition-colors hover:border-border/50 hover:bg-accent"
			href={href}
			onClick={() => setOpen(false)}
		>
			<div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
				<Icon className="size-4" weight="duotone" />
			</div>
			<div className="font-medium text-foreground/80 text-sm group-hover:text-foreground">
				{children}
			</div>
		</Link>
	);
}
