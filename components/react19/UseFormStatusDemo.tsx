"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

// SubmitButton reads the closest form's pending state
// No prop-drilling needed — useFormStatus does it automatically
function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button
			className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
			disabled={pending}
			type="submit"
		>
			{pending ? (
				<>
					<span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
					<span>Subscribing…</span>
				</>
			) : (
				"Subscribe"
			)}
		</button>
	);
}

// Input also reads form status — disabled during submission
function FormInput({
	name,
	label,
	placeholder,
	type = "text",
}: {
	name: string;
	label: string;
	placeholder: string;
	type?: string;
}) {
	const { pending } = useFormStatus();

	return (
		<div className="space-y-1.5">
			<label
				className="block font-medium text-foreground text-sm"
				htmlFor={name}
			>
				{label}
			</label>
			<input
				className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
				disabled={pending}
				id={name}
				name={name}
				placeholder={placeholder}
				type={type}
			/>
		</div>
	);
}

interface SubscribeState {
	message: string;
	status: "idle" | "success" | "error";
}

async function subscribe(
	_prevState: SubscribeState,
	formData: FormData
): Promise<SubscribeState> {
	const email = formData.get("email") as string;
	const name = formData.get("name") as string;

	await new Promise((r) => setTimeout(r, 1600));

	if (!email.includes("@")) {
		return { status: "error", message: "Please enter a valid email address." };
	}

	return {
		status: "success",
		message: `${name || "You"} subscribed to the React 19 newsletter! ✉️`,
	};
}

export function UseFormStatusDemo() {
	const [state, submitAction] = useActionState(subscribe, {
		status: "idle" as const,
		message: "",
	});

	return (
		<div className="space-y-5 rounded-xl border border-border bg-card p-6">
			<div className="flex items-center gap-2">
				<span className="text-xl">📋</span>
				<h3 className="font-semibold text-base">
					<code>useFormStatus</code> — Deep-Nested Fields
				</h3>
			</div>

			<p className="text-muted-foreground text-sm leading-relaxed">
				<code className="text-primary">useFormStatus</code> lets child
				components — even buried deep in a component tree — subscribe to their
				ancestor form's pending state without prop-drilling.
			</p>

			{state.status === "success" ? (
				<div className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-4 text-center text-green-600 text-sm dark:text-green-400">
					{state.message}
				</div>
			) : (
				<form action={submitAction} className="space-y-4">
					{/* FormInput reads useFormStatus internally */}
					<FormInput label="Your Name" name="name" placeholder="Ada Lovelace" />
					<FormInput
						label="Email Address"
						name="email"
						placeholder="ada@example.com"
						type="email"
					/>

					{state.status === "error" && (
						<p className="text-red-500 text-sm">{state.message}</p>
					)}

					{/* SubmitButton also reads useFormStatus internally */}
					<SubmitButton />
				</form>
			)}

			<div className="rounded-lg bg-muted/40 p-3 text-muted-foreground text-xs">
				<p className="mb-1 font-medium text-foreground">Key insight:</p>
				<p>
					Neither <code>FormInput</code> nor <code>SubmitButton</code> receive
					any props about pending state — they call{" "}
					<code className="text-primary">useFormStatus()</code> themselves,
					reading the nearest parent form's state.
				</p>
			</div>
		</div>
	);
}
