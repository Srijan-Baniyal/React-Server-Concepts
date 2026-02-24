import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function ErrorHandlingBP() {
	return (
		<section className="space-y-8" id="error-handling">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">
					Error Handling Patterns 🚨
				</h2>
				<p className="text-muted-foreground">
					Errors are inevitable — network timeouts, missing records,
					unauthorised access. The App Router provides a layered file-based
					system for handling them gracefully at the right granularity.
				</p>
			</div>

			{/* File-based error handling overview */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{[
					{
						file: "error.tsx",
						desc: 'Catches runtime errors in the route segment. Receives error and reset(). Must be a Client Component ("use client").',
						color: "border-red-500/20",
						badge: "Client Component",
					},
					{
						file: "not-found.tsx",
						desc: "Renders when notFound() is called from within the segment. Use for missing resources — 404 semantics.",
						color: "border-orange-500/20",
						badge: "Server Component",
					},
					{
						file: "global-error.tsx",
						desc: "Catches errors in the root layout. Rare edge case. Must render its own <html>/<body> tags since layout breaks.",
						color: "border-red-700/20",
						badge: "Client Component",
					},
					{
						file: "loading.tsx",
						desc: "Not an error handler but part of the resilience story — shows while the route suspends.",
						color: "border-blue-500/20",
						badge: "Server Component",
					},
				].map((item) => (
					<Card className={item.color} key={item.file}>
						<CardHeader className="pb-2">
							<code className="font-bold font-mono text-sm">{item.file}</code>
							<Badge className="mt-1 w-fit text-xs" variant="secondary">
								{item.badge}
							</Badge>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground text-sm leading-relaxed">
								{item.desc}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			{/* error.tsx */}
			<Card className="border-red-500/20">
				<CardHeader>
					<CardTitle className="text-base">
						error.tsx — Route Segment Error Boundary
					</CardTitle>
					<CardDescription>
						Catch and recover from unexpected runtime errors within a segment
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// app/products/error.tsx
"use client"; // ← Required — must be a Client Component

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void; // retry — re-render the segment
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    // Log to your error tracking service
    console.error(error);
    // reportError(error); // Sentry, Datadog, etc.
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-4 py-16">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-muted-foreground text-sm max-w-md text-center">
        {error.message ?? "An unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
      >
        Try again
      </button>
    </div>
  );
}`}
					</pre>
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// ✓ Granular error boundaries — scope errors to segments

// app/
//   layout.tsx         (error boundary here = root errors)
//   products/
//     layout.tsx
//     error.tsx        ← catches errors in /products/**
//     page.tsx
//     [id]/
//       error.tsx      ← catches errors in /products/[id] only
//       page.tsx

// If /products/[id]/page.tsx throws:
// → /products/[id]/error.tsx handles it
// → /products layout is still rendered ✓
// → Navigation is still visible ✓
// → Only the product detail section shows the error UI

// If you only have /products/error.tsx:
// → It handles both /products and /products/[id] errors
// → Useful for simple apps; too coarse for large UIs`}
					</pre>
				</CardContent>
			</Card>

			{/* not-found.tsx */}
			<Card className="border-orange-500/20">
				<CardHeader>
					<CardTitle className="text-base text-orange-700 dark:text-orange-400">
						not-found.tsx — Missing Resource UI
					</CardTitle>
					<CardDescription>
						Call notFound() anywhere in a Server Component to render the nearest
						not-found.tsx
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// app/products/[id]/page.tsx
import { notFound } from "next/navigation";

async function ProductPage({ params }) {
  const { id } = await params;

  // Validate first (see TypeScript section)
  if (!z.string().uuid().safeParse(id).success) notFound();

  const product = await getProduct(id);

  // Resource doesn't exist → 404
  if (!product) notFound();

  // Access control → redirect to login, not 404
  const session = await auth();
  if (!session) redirect("/login");

  // User doesn't have permission → 403 (or 404 to avoid recon)
  if (product.ownerId !== session.user.id) notFound();

  return <ProductView product={product} />;
}`}
					</pre>
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// app/products/[id]/not-found.tsx
// Context-aware 404 — stays inside the products layout

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center gap-6 py-16">
      <span className="text-6xl">🔍</span>
      <h1 className="text-2xl font-bold">Product not found</h1>
      <p className="text-muted-foreground">
        This product may have been removed or the link is broken.
      </p>
      <div className="flex gap-3">
        <Link
          href="/products"
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          Browse all products
        </Link>
        <Link
          href="/"
          className="rounded-md border px-4 py-2 text-sm"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

// ✓ Navigation + layout still visible
// ✓ Context-aware message
// ✓ Actionable links to recover`}
					</pre>
				</CardContent>
			</Card>

			{/* Typed errors from Server Actions */}
			<Card>
				<CardHeader>
					<CardTitle className="text-base">
						Handle Errors in Server Actions — Never Just Throw
					</CardTitle>
					<CardDescription>
						Return structured errors so Client Components can display
						field-level feedback
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<pre className="rounded-md bg-red-500/10 p-3 font-mono text-xs leading-relaxed">
						{`// ✗ Throwing generic errors — bad UX
"use server";
export async function updateProfile(formData: FormData) {
  const name = formData.get("name") as string;
  if (!name) throw new Error("Name required");
  // This throws, but useActionState doesn't catch it cleanly.
  // The error boundary above the form catches it instead —
  // replacing the entire form with the error UI.
  await db.user.update({ where: { id: ... }, data: { name } });
}`}
					</pre>
					<pre className="rounded-md bg-green-500/10 p-3 font-mono text-xs leading-relaxed">
						{`// ✓ Return structured errors — display inline
"use server";
export async function updateProfile(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = ProfileSchema.safeParse({
    name: formData.get("name"),
    bio: formData.get("bio"),
  });
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }
  try {
    await db.user.update({ data: result.data, where: { ... } });
    return { success: true };
  } catch (err) {
    // Unknown DB/network error — don't leak internals
    console.error(err);
    return {
      success: false,
      message: "Failed to update profile. Please try again.",
    };
  }
}`}
					</pre>
				</CardContent>
			</Card>

			{/* React ErrorBoundary for Client Components */}
			<Card className="border-blue-500/20">
				<CardHeader>
					<CardTitle className="text-base">
						Manual Error Boundaries for Client Component Subtrees
					</CardTitle>
					<CardDescription>
						Use react-error-boundary for fine-grained client-side error
						isolation
					</CardDescription>
				</CardHeader>
				<CardContent>
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// ✓ Wrap risky interactive widgets with an error boundary
"use client";
import { ErrorBoundary } from "react-error-boundary";

function WidgetError({ error, resetErrorBoundary }) {
  return (
    <div className="rounded-md border border-red-500/20 p-4 text-sm">
      <p className="text-red-600">Widget failed to load</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-2 text-xs text-primary underline"
      >
        Retry
      </button>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="grid gap-6">
      {/* Each widget is independently isolated */}
      <ErrorBoundary FallbackComponent={WidgetError}>
        <StockChart symbol="AAPL" />
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={WidgetError}>
        <NewsWidget feed="finance" />
      </ErrorBoundary>
    </div>
  );
}
// If StockChart throws, only that widget shows an error.
// NewsWidget continues to function normally. ✓`}
					</pre>
				</CardContent>
			</Card>
		</section>
	);
}
