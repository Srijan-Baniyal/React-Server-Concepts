"use client";

import { useActionState } from "react";

interface FormState {
	message: string;
	previousUsername?: string;
	status: "idle" | "success" | "error";
}

async function updateUsername(
	prevState: FormState,
	formData: FormData
): Promise<FormState> {
	const username = formData.get("username") as string;

	// Simulate async work
	await new Promise((resolve) => setTimeout(resolve, 1200));

	if (!username || username.trim().length < 3) {
		return {
			status: "error",
			message: "Username must be at least 3 characters.",
			previousUsername: prevState.previousUsername,
		};
	}

	if (username === "admin") {
		return {
			status: "error",
			message: "Username 'admin' is reserved. Try something else.",
			previousUsername: prevState.previousUsername,
		};
	}

	return {
		status: "success",
		message: `Username updated to "${username}" ✓`,
		previousUsername: username,
	};
}

const initialState: FormState = {
	status: "idle",
	message: "",
};

export function UseActionStateDemo() {
	const [state, submitAction, isPending] = useActionState(
		updateUsername,
		initialState
	);

	return (
		<div className="space-y-5 rounded-xl border border-border bg-card p-6">
			<div className="flex items-center gap-2">
				<span className="text-xl">⚡</span>
				<h3 className="font-semibold text-base">
					<code>useActionState</code> — Live Demo
				</h3>
			</div>

			<p className="text-muted-foreground text-sm leading-relaxed">
				This form uses <code className="text-primary">useActionState</code> to
				manage async mutation state. React auto-tracks{" "}
				<code className="text-primary">isPending</code>, the previous state, and
				the latest result — no <code>useState</code> required.
			</p>

			{state.previousUsername && (
				<p className="rounded-lg bg-muted/50 px-3 py-2 text-muted-foreground text-xs">
					Current username:{" "}
					<strong className="text-foreground">{state.previousUsername}</strong>
				</p>
			)}

			<form action={submitAction} className="space-y-4">
				<div className="space-y-2">
					<label
						className="block font-medium text-foreground text-sm"
						htmlFor="username"
					>
						New Username
					</label>
					<input
						className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
						disabled={isPending}
						id="username"
						name="username"
						placeholder="Enter new username..."
						type="text"
					/>
				</div>

				<button
					className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
					disabled={isPending}
					type="submit"
				>
					{isPending ? (
						<>
							<span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
							Updating…
						</>
					) : (
						"Update Username"
					)}
				</button>
			</form>

			{state.status !== "idle" && (
				<div
					className={`rounded-lg px-4 py-3 text-sm ${
						state.status === "success"
							? "border border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400"
							: "border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400"
					}`}
				>
					{state.message}
				</div>
			)}

			<div className="space-y-1 rounded-lg bg-muted/40 p-3 font-mono text-muted-foreground text-xs">
				<p>
					<span className="text-primary">isPending</span>: {String(isPending)}
				</p>
				<p>
					<span className="text-primary">state.status</span>: {state.status}
				</p>
			</div>
		</div>
	);
}
