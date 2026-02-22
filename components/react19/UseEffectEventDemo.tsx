"use client";

import {
	type ChangeEvent,
	useEffect,
	useEffectEvent,
	useRef,
	useState,
} from "react";
import { Label } from "../ui/label";

interface LogEntry {
	color: string;
	id: number;
	text: string;
}

// Simulated chat connection
function createConnection(room: string) {
	console.debug("connection created for", room);
	return {
		connect: (onConnected: (theme: string) => void, currentTheme: string) => {
			onConnected(currentTheme);
		},
		// biome-ignore lint/suspicious/noEmptyBlockStatements: intentional stub
		disconnect: () => {},
	};
}

function showNotification(msg: string, theme: string): LogEntry {
	return {
		id: Date.now() + Math.random(),
		text: msg,
		color: theme === "dark" ? "text-yellow-400" : "text-blue-500",
	};
}

export function UseEffectEventDemo() {
	const [room, setRoom] = useState("general");
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const [log, setLog] = useState<LogEntry[]>([]);
	const [connected, setConnected] = useState(false);
	const logRef = useRef<HTMLDivElement>(null);

	// ✅ useEffectEvent: "onConnected" sees the LATEST theme without
	// being listed as a dependency — so changing theme does NOT
	// reconnect to the room (no wasted re-connections).
	const onConnected = useEffectEvent((currentTheme: string) => {
		setConnected(true);
		setLog((prev) => [
			...prev,
			showNotification(
				`Connected to #${room} [theme: ${currentTheme}]`,
				currentTheme
			),
		]);
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: theme is intentionally excluded — accessed via useEffectEvent
	useEffect(() => {
		setConnected(false);
		const connection = createConnection(room);
		const timer = setTimeout(() => {
			connection.connect(onConnected, theme);
		}, 600);
		return () => {
			clearTimeout(timer);
			setConnected(false);
			setLog((prev) => [
				...prev,
				{
					id: Date.now(),
					text: `Disconnected from #${room}`,
					color: "text-muted-foreground",
				},
			]);
		};
	}, [room]); // ← only `room`, NOT `theme` — thanks to useEffectEvent

	// biome-ignore lint/correctness/useExhaustiveDependencies: scroll on log change
	useEffect(() => {
		if (logRef.current) {
			logRef.current.scrollTop = logRef.current.scrollHeight;
		}
	}, [log]);

	return (
		<div className="space-y-5 rounded-xl border border-border bg-card p-6">
			<div className="flex items-center gap-2">
				<span className="text-xl">🎯</span>
				<h3 className="font-semibold text-base">
					<code>useEffectEvent</code> — React 19.2
				</h3>
			</div>

			<p className="text-muted-foreground text-sm leading-relaxed">
				<code className="text-primary">useEffectEvent</code> separates
				"event-like" code from synchronization code. The notification always
				shows the <strong>current theme</strong>, yet changing the theme does{" "}
				<strong>not</strong> reconnect to the room.
			</p>

			{/* Controls */}
			<div className="grid grid-cols-2 gap-3">
				<div className="space-y-1.5">
					<label
						className="block font-medium text-muted-foreground text-xs"
						htmlFor="room-select"
					>
						Room (changes reconnect)
					</label>
					<select
						className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
						id="room-select"
						onChange={(e) => setRoom(e.target.value)}
						value={room}
					>
						<option value="general">#general</option>
						<option value="react">#react</option>
						<option value="random">#random</option>
					</select>
				</div>
				<div className="space-y-1.5">
					<Label
						className="block font-medium text-muted-foreground text-xs"
						htmlFor="theme-select"
					>
						Theme (no reconnect!)
					</Label>
					<select
						aria-label="Theme"
						className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
						id="theme-select"
						onChange={(e: ChangeEvent<HTMLSelectElement>) =>
							setTheme(e.target.value as "light" | "dark")
						}
						value={theme}
					>
						<option value="light">☀️ Light</option>
						<option value="dark">🌙 Dark</option>
					</select>
				</div>
			</div>

			{/* Status */}
			<div className="flex items-center gap-2">
				<span
					className={`inline-block h-2.5 w-2.5 rounded-full ${connected ? "animate-pulse bg-green-500" : "bg-orange-400"}`}
				/>
				<span className="text-muted-foreground text-sm">
					{connected ? `Connected to #${room}` : `Connecting to #${room}…`}
				</span>
			</div>

			{/* Log */}
			<div
				className="h-32 space-y-1 overflow-y-auto rounded-lg bg-muted/40 p-3 font-mono text-xs"
				ref={logRef}
			>
				{log.length === 0 && (
					<p className="text-muted-foreground">No events yet…</p>
				)}
				{log.map((entry) => (
					<p className={entry.color} key={entry.id}>
						{entry.text}
					</p>
				))}
			</div>

			<div className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-amber-600 text-xs dark:text-amber-400">
				<strong>Try it:</strong> Switching the theme updates the next connection
				message — but look at the log, it doesn't reconnect. Only changing the
				room causes a reconnect.
			</div>
		</div>
	);
}
