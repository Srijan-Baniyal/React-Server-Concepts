import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function ServerActions() {
	return (
		<section className="space-y-8" id="server-actions">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">Server Actions ⚙️</h2>
				<p className="text-muted-foreground">
					Async functions that run on the server, invoked directly from Client
					Components or HTML forms — no API routes needed.
				</p>
			</div>

			<Card className="border-primary/20 bg-primary/5">
				<CardContent className="pt-6">
					<p className="text-muted-foreground leading-relaxed">
						Server Actions are marked with{" "}
						<code className="rounded bg-muted px-1 text-foreground">
							"use server"
						</code>{" "}
						and can be called like regular async functions from Client
						Components or{" "}
						<code className="rounded bg-muted px-1 text-foreground">
							{"<form action={}>"}
						</code>
						. Under the hood Next.js exposes each action as a secure{" "}
						<strong className="text-foreground">POST endpoint</strong> with a
						cryptographically-signed ID. You never write the API route, CORS
						config, or client fetch — React handles all the plumbing.
					</p>
				</CardContent>
			</Card>

			<div className="grid gap-6 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="text-base">Defining Server Actions</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
								Approach 1 — dedicated "use server" file (recommended)
							</p>
							<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
								{`// actions/cart.ts
"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: string) {
  // Always authenticate in Server Actions!
  const session = await auth();
  if (!session) throw new Error("Unauthorised");

  await db.cart.create({
    data: { userId: session.user.id, productId },
  });

  // Invalidate cached data
  revalidatePath("/cart");
}

export async function removeFromCart(itemId: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorised");
  await db.cartItem.delete({ where: { id: itemId } });
  revalidatePath("/cart");
}`}
							</pre>
						</div>

						<div className="space-y-2">
							<p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
								Approach 2 — inline in Server Component
							</p>
							<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
								{`// app/subscribe/page.tsx  (Server Component)
export default function Page() {
  async function subscribe(formData: FormData) {
    "use server"; // ← inline Server Action
    const email = formData.get("email") as string;
    await db.subscriber.create({ data: { email } });
    redirect("/subscribed");
  }

  return (
    <form action={subscribe}>
      <input name="email" type="email" required />
      <button type="submit">Subscribe</button>
    </form>
  );
}`}
							</pre>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-base">
							Calling from Client Components
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`"use client";
import { addToCart } from "@/actions/cart";
import { useTransition, useOptimistic } from "react";

export function AddToCartButton({ productId, cartCount }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticCount, addOptimistic] = useOptimistic(
    cartCount,
    (current) => current + 1
  );

  return (
    <div>
      <span>Cart: {optimisticCount}</span>
      <button
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            addOptimistic(null); // instant UI update
            await addToCart(productId); // real mutation
          })
        }
      >
        {isPending ? "Adding…" : "Add to Cart"}
      </button>
    </div>
  );
}`}
						</pre>
						<div className="rounded-lg border border-border/50 bg-accent/30 p-3 text-xs">
							<p className="font-medium">Security model</p>
							<p className="mt-1 text-muted-foreground">
								The action function body never reaches the browser. Next.js
								replaces it with a signed opaque ID. Calling the action from the
								client triggers a{" "}
								<code className="rounded bg-muted px-1">POST</code> to that ID —
								the server verifies the signature before executing.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Lifecycle */}
			<Card>
				<CardHeader>
					<CardTitle>Server Action Network Lifecycle</CardTitle>
				</CardHeader>
				<CardContent>
					<pre className="overflow-x-auto rounded-md bg-muted p-4 font-mono text-xs leading-relaxed">
						{`Client Component
  │  user interaction (click / form submit)
  └─► startTransition(() => myAction(args))
              │
              │  POST /_next/action/<signed-id>
              │  Body: serialised args (Flight format)
              ▼
         Next.js Server
           │  verify HMAC signature
           │  deserialise args
           └─► execute myAction()
                     │  direct DB / service calls
                     │  revalidatePath / revalidateTag
                     │    └─► invalidate caches
                     │  redirect() / notFound()
                     │
                     ▼
               Return value (serialised via Flight)
                     │
                     ▼
         Client receives response
           ├─► React updates UI with return value
           ├─► Revalidated paths re-fetch in background
           └─► useOptimistic confirms / reverts`}
					</pre>
				</CardContent>
			</Card>

			{/* SA vs Route Handlers */}
			<Card>
				<CardHeader>
					<CardTitle>Server Actions vs Route Handlers</CardTitle>
					<CardDescription>Choose the right tool for the job</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full text-xs">
							<thead>
								<tr className="border-border/50 border-b">
									<th className="py-2 pr-4 text-left font-semibold">Aspect</th>
									<th className="py-2 pr-4 text-left font-semibold text-green-600">
										Server Actions
									</th>
									<th className="py-2 text-left font-semibold text-blue-600">
										Route Handlers (route.tsx)
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border/30 text-muted-foreground">
								{[
									["HTTP method", "Always POST", "GET, POST, PUT, DELETE, …"],
									[
										"Client invocation",
										"Imported & called directly",
										"fetch() or SWR/React Query",
									],
									[
										"Form support",
										"Native <form action={fn}>",
										"Manual FormData handling",
									],
									[
										"Cache invalidation",
										"Built-in revalidatePath/Tag",
										"Manual, call from action",
									],
									[
										"External consumers",
										"Not accessible externally",
										"Public REST / webhook endpoint",
									],
									[
										"Streaming response",
										"Via useOptimistic / redirect",
										"ReadableStream / Response",
									],
									[
										"Best for",
										"Mutations from React UI",
										"Public APIs, webhooks, file downloads",
									],
								].map(([aspect, sa, rh]) => (
									<tr key={aspect as string}>
										<td className="py-2 pr-4 font-medium text-foreground">
											{aspect}
										</td>
										<td className="py-2 pr-4">{sa}</td>
										<td className="py-2">{rh}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
