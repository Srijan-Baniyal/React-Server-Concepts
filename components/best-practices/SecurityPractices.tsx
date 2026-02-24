import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function SecurityPractices() {
	return (
		<section className="space-y-8" id="security-practices">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">Security Practices 🔐</h2>
				<p className="text-muted-foreground">
					RSC gives you powerful server-side access — secrets, databases, file
					systems. With that power comes the responsibility to never let
					server-only logic slip across the boundary.
				</p>
			</div>

			{/* server-only package */}
			<Card className="border-red-500/20">
				<CardHeader>
					<CardTitle className="text-base">
						Use{" "}
						<code className="rounded bg-muted px-1 font-mono text-sm">
							server-only
						</code>{" "}
						to Guard Sensitive Modules
					</CardTitle>
					<CardDescription>
						Guarantee a module never ends up in the client bundle — throws a
						build-time error if you accidentally import it from a Client
						Component
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// lib/db.ts — database client with env secrets
import "server-only"; // ← add this import

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as typeof global & {
  prisma?: PrismaClient;
};

export const db =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = db;

// If any Client Component imports this file, Next.js
// throws a build-time error:
// "This module cannot be imported from a Client Component"
// ↑ Protects DATABASE_URL and other secrets ✓`}
					</pre>
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// lib/auth.ts — session management
import "server-only";

import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export async function auth() {
  return getServerSession(authOptions);
}

export async function requireAuth() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthenticated");
  }
  return session;
}

// lib/analytics.ts — internal analytics with API key
import "server-only";

export async function trackEvent(event: string) {
  await fetch("https://analytics.internal/track", {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${process.env.ANALYTICS_KEY}\`,
    },
    body: JSON.stringify({ event }),
  });
}`}
					</pre>
				</CardContent>
			</Card>

			{/* Environment variables */}
			<Card className="border-yellow-500/20">
				<CardHeader>
					<CardTitle className="text-base text-yellow-700 dark:text-yellow-500">
						Environment Variable Rules
					</CardTitle>
					<CardDescription>
						Know exactly which env vars are exposed to the browser — and which
						aren't
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<div className="space-y-3">
						<Badge className="border-red-500/40 text-red-600" variant="outline">
							Server-Only (never sent to browser)
						</Badge>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`# .env.local

# ✓ No NEXT_PUBLIC_ prefix → server only
DATABASE_URL="postgres://..."
STRIPE_SECRET_KEY="sk_live_..."
JWT_SECRET="super-secret-value"
SENDGRID_API_KEY="SG...."
OPENAI_API_KEY="sk-..."
ANALYTICS_KEY="internal-key"

# These are NEVER included in the client bundle.
# Safe to use in Server Components and Server Actions.`}
						</pre>
					</div>
					<div className="space-y-3">
						<Badge
							className="border-blue-500/40 text-blue-600"
							variant="outline"
						>
							Public (sent to browser in bundle)
						</Badge>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`# .env.local

# ⚠ NEXT_PUBLIC_ prefix → included in client bundle
# Visible to anyone who inspects the JS
NEXT_PUBLIC_APP_URL="https://myapp.com"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_MAPBOX_TOKEN="pk.eyJ1..."

# Only put keys here that are DESIGNED to be public.
# Publishable/public-facing API keys only.
# NEVER put secrets with NEXT_PUBLIC_.`}
						</pre>
					</div>
				</CardContent>
			</Card>

			{/* Never pass secrets as props */}
			<Card className="border-red-500/20">
				<CardHeader>
					<CardTitle className="text-base text-red-600">
						Never Pass Secrets as Props to Client Components
					</CardTitle>
					<CardDescription>
						Props crossing the serialization boundary are embedded in the RSC
						payload — visible in the browser
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<pre className="rounded-md bg-red-500/10 p-3 font-mono text-xs leading-relaxed">
						{`// ✗ SECRET LEAKED — apiKey goes to the browser
async function Page() {
  const apiKey = process.env.INTERNAL_API_KEY;
  const user = await fetchUser(apiKey);

  // user object — ok to pass
  // apiKey — ✗ NEVER pass secrets as props!
  return (
    <UserCard
      user={user}
      apiKey={apiKey}   {/* ← visible in RSC payload ✗ */}
    />
  );
}

// Even if UserCard is a Server Component today,
// if it ever becomes a Client Component, the key
// becomes part of the browser-visible payload.`}
					</pre>
					<pre className="rounded-md bg-green-500/10 p-3 font-mono text-xs leading-relaxed">
						{`// ✓ Use the secret server-side; pass only the result

async function Page() {
  // Use secret on the server — never prop-drill it
  const user = await fetchUser(
    process.env.INTERNAL_API_KEY  // used server-side ✓
  );

  // Pass only the data the client component needs
  return (
    <UserCard
      name={user.name}
      avatar={user.avatar}
      // apiKey omitted ✓
    />
  );
}

// Or for complex derived data:
async function Page() {
  const enrichedUser = await getEnrichedUser(); // SC work
  // Pass the enriched result — not the key used to get it
  return <Profile user={enrichedUser} />;
}`}
					</pre>
				</CardContent>
			</Card>

			{/* Input sanitisation */}
			<Card className="border-orange-500/20">
				<CardHeader>
					<CardTitle className="text-base text-orange-700 dark:text-orange-400">
						Sanitise & Validate All External Input
					</CardTitle>
					<CardDescription>
						Treat route params, searchParams, form data, and headers as
						untrusted — always validate with a schema
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<pre className="rounded-md bg-red-500/10 p-3 font-mono text-xs leading-relaxed">
						{`// ✗ Trusting params directly — SQL injection / chaos
async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // ✗ What if id = "1; DROP TABLE products;--"?
  const product = await db.product.findUnique({
    where: { id: params.id }, // UUID assumed, not enforced
  });
  return <ProductCard product={product} />;
}

// ✗ Trusting searchParams directly
async function SearchPage({ searchParams }) {
  const q = searchParams.q; // could be anything
  const results = await search(\`%\${q}%\`); // SQL injection!
}`}
					</pre>
					<pre className="rounded-md bg-green-500/10 p-3 font-mono text-xs leading-relaxed">
						{`import { z } from "zod";
import { notFound } from "next/navigation";

// ✓ Validate params at the top of every page/layout
const ParamsSchema = z.object({
  id: z.string().uuid("Invalid product ID"),
});

async function ProductPage({ params }) {
  const result = ParamsSchema.safeParse(params);
  if (!result.success) notFound();

  const product = await db.product.findUnique({
    where: { id: result.data.id }, // validated UUID ✓
  });
  if (!product) notFound();
  return <ProductCard product={product} />;
}

// ✓ Validate and sanitise searchParams too
const SearchSchema = z.object({
  q: z.string().max(200).default(""),
  page: z.coerce.number().int().positive().default(1),
});
async function SearchPage({ searchParams }) {
  const { q, page } = SearchSchema.parse(searchParams);
  // q is trimmed to 200 chars, page is a valid integer
  const results = await search(q, page);
}`}
					</pre>
				</CardContent>
			</Card>

			{/* Taint API */}
			<Card className="border-purple-500/20">
				<CardHeader>
					<CardTitle className="text-base">
						React Taint APIs — Prevent Accidental Secret Exposure
					</CardTitle>
					<CardDescription>
						Experimental: mark values as tainted so React throws if they're
						passed to a Client Component
					</CardDescription>
				</CardHeader>
				<CardContent>
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// Opt-in in next.config.ts
// experimental: { taint: true }

import {
  experimental_taintObjectReference,
  experimental_taintUniqueValue,
} from "react";

// lib/user.ts
export async function getUser(id: string) {
  const user = await db.user.findUnique({ where: { id } });

  // Taint the entire object — can't be passed to CC
  experimental_taintObjectReference(
    "User data must not be passed to client components",
    user,
  );

  // Taint a specific sensitive value
  experimental_taintUniqueValue(
    "Password hash must never reach the client",
    user,
    user.passwordHash,
  );

  return user;
}

// Now if any Server Component tries to pass user or
// user.passwordHash as a prop to a Client Component,
// React throws a runtime error — even in development.`}
					</pre>
				</CardContent>
			</Card>
		</section>
	);
}
