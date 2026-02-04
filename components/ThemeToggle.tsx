"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useRef, useState, useTransition } from "react";
import { flushSync } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/Utils";

export default function ThemeToggle() {
	const { theme, setTheme, resolvedTheme } = useNextTheme();
	const [mounted, setMounted] = useState(false);
	const [isPending, startTransition] = useTransition();
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = (_event: React.MouseEvent<HTMLButtonElement>) => {
		const newTheme = theme === "dark" ? "light" : "dark";
		const button = buttonRef.current;
		if (!button) {
			return;
		}
		const rect = button.getBoundingClientRect();
		const x = rect.left + rect.width / 2;
		const y = rect.top + rect.height / 2;
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		if (!document.startViewTransition || prefersReducedMotion) {
			startTransition(() => {
				setTheme(newTheme);
			});
			return;
		}
		const endRadius = Math.hypot(
			Math.max(x, window.innerWidth - x),
			Math.max(y, window.innerHeight - y)
		);
		const transition = document.startViewTransition(() => {
			startTransition(() => {
				flushSync(() => {
					setTheme(newTheme);
				});
			});
		});
		transition.ready.then(() => {
			document.documentElement.animate(
				[
					{
						clipPath: `circle(0px at ${x}px ${y}px)`,
						filter: "blur(20px) brightness(0.85) contrast(0.95)",
						opacity: 0.7,
					},
					{
						clipPath: `circle(${endRadius * 0.3}px at ${x}px ${y}px)`,
						filter: "blur(12px) brightness(0.92) contrast(0.98)",
						opacity: 0.85,
					},
					{
						clipPath: `circle(${endRadius * 0.7}px at ${x}px ${y}px)`,
						filter: "blur(4px) brightness(0.98) contrast(1)",
						opacity: 0.95,
					},
					{
						clipPath: `circle(${endRadius}px at ${x}px ${y}px)`,
						filter: "blur(0px) brightness(1) contrast(1)",
						opacity: 1,
					},
				],
				{
					duration: 900,
					easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
					pseudoElement: "::view-transition-new(root)",
					fill: "forwards",
				}
			);

			// Animate the old view with refined blur and fade
			document.documentElement.animate(
				[
					{
						opacity: 1,
						filter: "blur(0px) brightness(1) contrast(1)",
					},
					{
						opacity: 0.85,
						filter: "blur(4px) brightness(0.98) contrast(0.98)",
					},
					{
						opacity: 0.5,
						filter: "blur(10px) brightness(0.92) contrast(0.95)",
					},
					{
						opacity: 0,
						filter: "blur(16px) brightness(0.85) contrast(0.9)",
					},
				],
				{
					duration: 700,
					easing: "cubic-bezier(0.4, 0, 0.2, 1)",
					pseudoElement: "::view-transition-old(root)",
					fill: "forwards",
				}
			);
		});
	};

	return (
		<Button
			aria-label="Toggle theme"
			className="relative h-10 w-10 rounded-lg border border-border/50 bg-accent/20 p-0 transition-all duration-300 hover:scale-105 hover:border-border hover:bg-accent/40"
			disabled={isPending}
			onClick={toggleTheme}
			ref={buttonRef}
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
	);
}
