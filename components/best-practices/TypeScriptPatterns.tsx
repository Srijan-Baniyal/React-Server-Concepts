import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function TypeScriptPatterns() {
	return (
		<section className="space-y-8" id="typescript-patterns">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">TypeScript Patterns 🔷</h2>
				<p className="text-muted-foreground">
					Type-safe RSC apps catch boundary violations, parameter mismatches,
					and data contract breaks at compile time — not at 2 AM in production.
				</p>
			</div>

			{/* Page and layout types */}
			<div className="grid gap-6 lg:grid-cols-2">
				<Card className="border-blue-500/20">
					<CardHeader>
						<CardTitle className="text-base">
							Typing Page and Layout Props
						</CardTitle>
						<CardDescription>
							Next.js provides{" "}
							<code className="rounded bg-muted px-1 text-xs">PageProps</code>{" "}
							and{" "}
							<code className="rounded bg-muted px-1 text-xs">LayoutProps</code>{" "}
							generics
						</CardDescription>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// app/products/[id]/page.tsx

// ✓ Explicit params + searchParams typing
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    sort?: "price" | "rating" | "newest";
    page?: string;
  }>;
};

export default async function ProductPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { sort = "newest", page = "1" } = await searchParams;

  const product = await getProduct(id);
  if (!product) notFound();

  return <ProductView product={product} sort={sort} />;
}

// ✓ Generate static params with correct return type
export async function generateStaticParams(): Promise<
  Array<{ id: string }>
> {
  const products = await getTopProducts();
  return products.map((p) => ({ id: p.id }));
}`}
						</pre>
					</CardContent>
				</Card>

				<Card className="border-green-500/20">
					<CardHeader>
						<CardTitle className="text-base">Typing Server Actions</CardTitle>
						<CardDescription>
							Strongly-typed action state for useActionState() integration
						</CardDescription>
					</CardHeader>
					<CardContent>
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// types/actions.ts — shared action state type
export type ActionResult<T = void> =
  | { success: true; data: T; message?: string }
  | { success: false; errors?: Partial<Record<string, string[]>>;
      message: string };

// actions/post.ts
"use server";

export async function createPost(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult<{ postId: string }>> {
  const parsed = CreatePostSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }
  const post = await db.post.create({ data: parsed.data });
  return { success: true, data: { postId: post.id } };
}

// In Client Component — TypeScript knows the shape:
const [state] = useActionState(createPost, {
  success: false,
  message: "",
});
// state.errors is typed, state.data is typed ✓`}
						</pre>
					</CardContent>
				</Card>
			</div>

			{/* Typed data access layer */}
			<Card>
				<CardHeader>
					<CardTitle className="text-base">Typed Data Access Layer</CardTitle>
					<CardDescription>
						Infer DB types from Prisma/Drizzle and derive component prop types
						from them — single source of truth
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// lib/types.ts — derive types from Prisma
import { Prisma } from "@prisma/client";

// Full model type
export type User = Prisma.UserGetPayload<{}>;

// Subset type — only what the card needs
export type UserCardData = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    avatar: true;
    role: true;
  };
}>;

// With relations
export type PostWithAuthor = Prisma.PostGetPayload<{
  include: { author: { select: { name: true; avatar: true } } };
}>;

// Array variant
export type PostFeed = PostWithAuthor[];

// ✓ If Prisma schema changes, types update automatically.
// No manual type maintenance.`}
					</pre>
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// lib/queries.ts — typed return values
import { cache } from "react";
import type { UserCardData, PostWithAuthor } from "./types";

export const getUserCard = cache(
  async (id: string): Promise<UserCardData | null> =>
    db.user.findUnique({
      where: { id },
      select: { id: true, name: true, avatar: true, role: true },
    })
);

export const getPost = cache(
  async (id: string): Promise<PostWithAuthor | null> =>
    db.post.findUnique({
      where: { id },
      include: {
        author: { select: { name: true, avatar: true } },
      },
    })
);

// Component using the typed query:
async function UserCard({ userId }: { userId: string }) {
  const user = await getUserCard(userId);
  if (!user) notFound();
  // user is UserCardData — TypeScript knows every field ✓
  return <div>{user.name}</div>;
}`}
					</pre>
				</CardContent>
			</Card>

			{/* Type narrowing for optional data */}
			<Card className="border-yellow-500/20">
				<CardHeader>
					<CardTitle className="text-base text-yellow-700 dark:text-yellow-500">
						Always Narrow Nullable Query Results
					</CardTitle>
					<CardDescription>
						Use notFound() for missing resources — don't render null-unsafe
						pages
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<pre className="rounded-md bg-red-500/10 p-3 font-mono text-xs leading-relaxed">
						{`// ✗ Not narrowing — TypeScript can't help you
async function Page({ params }) {
  const product = await getProduct(params.id);

  // ✗ product could be null!
  return (
    <div>
      <h1>{product.name}</h1>  {/* TypeError at runtime ✗ */}
      <p>{product.description}</p>
    </div>
  );
}`}
					</pre>
					<pre className="rounded-md bg-green-500/10 p-3 font-mono text-xs leading-relaxed">
						{`import { notFound } from "next/navigation";

// ✓ Narrow immediately — then TypeScript knows it's non-null
async function Page({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound(); // renders app/not-found.tsx

  // After notFound(), TypeScript narrows product to non-null ✓
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}

// For arrays — safe to skip null check (empty array is fine)
async function ProductList() {
  const products = await getProducts(); // Product[] (never null)
  if (products.length === 0) return <EmptyState />;
  return products.map(p => <ProductCard key={p.id} product={p} />);
}`}
					</pre>
				</CardContent>
			</Card>

			{/* satisfies operator */}
			<Card className="border-purple-500/20">
				<CardHeader>
					<CardTitle className="text-base">
						Use{" "}
						<code className="rounded bg-muted px-1 font-mono text-sm">
							satisfies
						</code>{" "}
						for Config Objects
					</CardTitle>
					<CardDescription>
						Get type checking without widening the inferred type — keeps literal
						types
					</CardDescription>
				</CardHeader>
				<CardContent>
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// ✓ satisfies checks the type but preserves literal inference

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

// satisfies NavItem[] → TypeScript checks shape
// but NAV_ITEMS retains full literal types
const NAV_ITEMS = [
  { label: "Home",     href: "/",        icon: "🏠" },
  { label: "Products", href: "/products",icon: "🛍️" },
  { label: "Blog",     href: "/blog",    icon: "📝" },
] satisfies NavItem[];

// NAV_ITEMS[0].href is "/", not string — autocomplete works ✓

// vs. type annotation which widens:
const NAV: NavItem[] = [...]; // href is "string" — less precise

// Useful for metadata, route config, theme objects, etc.
export const metadata = {
  title: "My App",
  description: "...",
} satisfies Metadata;`}
					</pre>
				</CardContent>
			</Card>
		</section>
	);
}
