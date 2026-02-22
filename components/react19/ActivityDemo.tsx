"use client";

import { Activity, useState } from "react";

// Expensive panel that preserves state when hidden via Activity
function ChatPanel({ color }: { color: string }) {
	const [messages, setMessages] = useState<string[]>([
		`Welcome to the ${color} channel!`,
	]);
	const [input, setInput] = useState("");

	function send() {
		if (!input.trim()) {
			return;
		}
		setMessages((prev) => [...prev, input.trim()]);
		setInput("");
	}

	return (
		<div className="space-y-3">
			<div className="h-32 space-y-1 overflow-y-auto rounded-lg bg-muted/40 p-3">
				{messages.map((msg, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: demo list
					<p className="text-foreground text-sm" key={i}>
						💬 {msg}
					</p>
				))}
			</div>
			<div className="flex gap-2">
				<input
					className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && send()}
					placeholder="Type a message…"
					type="text"
					value={input}
				/>
				<button
					className="rounded-lg bg-primary px-3 py-2 font-medium text-primary-foreground text-sm hover:bg-primary/90"
					onClick={send}
					type="button"
				>
					Send
				</button>
			</div>
		</div>
	);
}

const CHANNELS = [
	{ id: "general", label: "#general", color: "blue" },
	{ id: "react", label: "#react", color: "purple" },
	{ id: "random", label: "#random", color: "green" },
] as const;

export function ActivityDemo() {
	const [activeChannel, setActiveChannel] = useState<string>("general");

	return (
		<div className="space-y-5 rounded-xl border border-border bg-card p-6">
			<div className="flex items-center gap-2">
				<span className="text-xl">🫧</span>
				<h3 className="font-semibold text-base">
					<code>{"<Activity>"}</code> — React 19.2
				</h3>
			</div>

			<p className="text-muted-foreground text-sm leading-relaxed">
				Switch between channels. With{" "}
				<code className="text-primary">{"<Activity>"}</code>, each panel's state
				(chat history, input text) is{" "}
				<strong className="text-foreground">preserved</strong> when hidden —
				even though the component is unmounted. Navigate back and everything is
				still there.
			</p>

			{/* Tab bar */}
			<div className="flex gap-1 rounded-lg bg-muted/50 p-1">
				{CHANNELS.map((ch) => (
					<button
						className={`flex-1 rounded-md px-3 py-1.5 font-medium text-sm transition-colors ${
							activeChannel === ch.id
								? "bg-background text-foreground shadow-sm"
								: "text-muted-foreground hover:text-foreground"
						}`}
						key={ch.id}
						onClick={() => setActiveChannel(ch.id)}
						type="button"
					>
						{ch.label}
					</button>
				))}
			</div>

			{/* Activity wraps each panel — state survives mode="hidden" */}
			{CHANNELS.map((ch) => (
				<Activity
					key={ch.id}
					mode={activeChannel === ch.id ? "visible" : "hidden"}
				>
					<div
						className={`rounded-lg border p-4 ${
							activeChannel !== ch.id ? "sr-only" : ""
						}`}
					>
						<p className="mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
							{ch.label} Channel
						</p>
						<ChatPanel color={ch.color} />
					</div>
				</Activity>
			))}

			<div className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-muted-foreground text-xs">
				<strong className="text-foreground">How to test:</strong> Type in a
				channel, switch away, come back — your typed text is still there.
				Without <code className="text-primary">{"<Activity>"}</code>{" "}
				(conditional rendering only), state would be lost.
			</div>
		</div>
	);
}
