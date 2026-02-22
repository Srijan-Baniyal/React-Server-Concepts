"use client";

import { useActionState, useOptimistic, useRef } from "react";

interface Message {
	id: number;
	status: "confirmed" | "pending";
	text: string;
}

let nextId = 4;

async function sendMessage(
	messages: Message[],
	formData: FormData
): Promise<Message[]> {
	const text = formData.get("message") as string;
	if (!text.trim()) {
		return messages;
	}

	// Simulate network delay
	await new Promise((r) => setTimeout(r, 1500));

	return [
		...messages.filter((m) => m.status === "confirmed"),
		{ id: nextId++, text: text.trim(), status: "confirmed" },
	];
}

const initialMessages: Message[] = [
	{ id: 1, text: "Hey everyone! 👋", status: "confirmed" },
	{ id: 2, text: "What's new in React 19?", status: "confirmed" },
	{ id: 3, text: "useOptimistic is amazing!", status: "confirmed" },
];

export function UseOptimisticDemo() {
	const formRef = useRef<HTMLFormElement>(null);

	const [messages, submitAction, isPending] = useActionState(
		sendMessage,
		initialMessages
	);

	const [optimisticMessages, addOptimisticMessage] = useOptimistic(
		messages,
		(currentMessages: Message[], newText: string) => [
			...currentMessages,
			{
				id: Date.now(),
				text: newText,
				status: "pending" as const,
			},
		]
	);

	async function handleSubmit(formData: FormData) {
		const text = formData.get("message") as string;
		if (!text.trim()) {
			return;
		}
		formRef.current?.reset();
		addOptimisticMessage(text.trim());
		await submitAction(formData);
	}

	return (
		<div className="space-y-5 rounded-xl border border-border bg-card p-6">
			<div className="flex items-center gap-2">
				<span className="text-xl">⚡</span>
				<h3 className="font-semibold text-base">
					<code>useOptimistic</code> — Live Demo
				</h3>
			</div>

			<p className="text-muted-foreground text-sm leading-relaxed">
				Messages appear <strong className="text-foreground">instantly</strong>{" "}
				in a "pending" state while the server roundtrip completes. On failure,
				React auto-reverts to the last confirmed state.
			</p>

			{/* Message list */}
			<div className="max-h-52 space-y-2 overflow-y-auto">
				{optimisticMessages.map((msg) => (
					<div
						className={`flex items-start gap-2 rounded-lg px-3 py-2 text-sm transition-opacity ${
							msg.status === "pending"
								? "border border-primary/20 bg-primary/5 opacity-60"
								: "bg-muted/40"
						}`}
						key={msg.id}
					>
						<span className="mt-0.5 text-muted-foreground text-xs">
							{msg.status === "pending" ? "⏳" : "✅"}
						</span>
						<span className={msg.status === "pending" ? "italic" : ""}>
							{msg.text}
						</span>
						{msg.status === "pending" && (
							<span className="ml-auto shrink-0 text-muted-foreground text-xs">
								sending…
							</span>
						)}
					</div>
				))}
			</div>

			{/* Input form */}
			<form action={handleSubmit} className="flex gap-2" ref={formRef}>
				<input
					className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
					disabled={isPending}
					name="message"
					placeholder="Type a message…"
					type="text"
				/>
				<button
					className="rounded-lg bg-primary px-3 py-2 font-medium text-primary-foreground text-sm hover:bg-primary/90 disabled:opacity-50"
					disabled={isPending}
					type="submit"
				>
					Send
				</button>
			</form>

			<p className="text-muted-foreground text-xs">
				Each message simulates a 1.5s network delay. Notice the instant
				optimistic paint, then the "confirmed" swap.
			</p>
		</div>
	);
}
