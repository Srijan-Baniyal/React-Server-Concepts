import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function ServerActionsBP() {
	return (
		<section className="space-y-8" id="server-actions-bp">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">
					Server Actions Best Practices ⚙️
				</h2>
				<p className="text-muted-foreground">
					Server Actions are powerful — but they're POST endpoints. Treat them
					with the same security discipline you'd apply to any API route.
				</p>
			</div>

			{/* Core rules */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{[
					{
						icon: "🔒",
						title: "Always Authenticate",
						desc: "Every action must verify the caller's session. Never trust that only authorised users will call an action.",
						color: "border-red-500/20",
					},
					{
						icon: "✅",
						title: "Validate All Inputs",
						desc: "Use Zod or a similar schema library to validate FormData or object arguments before touching the database.",
						color: "border-yellow-500/20",
					},
					{
						icon: "🔄",
						title: "Revalidate After Mutations",
						desc: "Call revalidatePath() or revalidateTag() to bust stale caches so the UI reflects the new state.",
						color: "border-green-500/20",
					},
					{
						icon: "🚨",
						title: "Return Typed Errors",
						desc: "Return structured error objects instead of throwing so useActionState() can display field-level feedback.",
						color: "border-blue-500/20",
					},
					{
						icon: "📁",
						title: "Co-locate in actions/ Files",
						desc: "Put related actions in a dedicated 'use server' file — never inline 'use server' in a Client Component.",
						color: "border-purple-500/20",
					},
					{
						icon: "🔑",
						title: "Authorise Resources",
						desc: "After authenticating the user, verify they have permission to access the specific resource being mutated.",
						color: "border-orange-500/20",
					},
				].map((rule) => (
					<Card className={rule.color} key={rule.title}>
						<CardHeader className="pb-2">
							<CardTitle className="flex items-center gap-2 text-base">
								<span>{rule.icon}</span>
								{rule.title}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground text-sm leading-relaxed">
								{rule.desc}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Full action example */}
			<Card>
				<CardHeader>
					<CardTitle className="text-base">
						Production-Ready Server Action
					</CardTitle>
					<CardDescription>
						Authentication + authorisation + validation + error handling + cache
						revalidation
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`// actions/post.ts
"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";

// Zod schema — validates inputs before touching DB
const CreatePostSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10),
  categoryId: z.string().uuid(),
});

type ActionState = {
  errors?: { title?: string[]; content?: string[] };
  message?: string;
  success?: boolean;
};

export async function createPost(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // 1. Authenticate
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Unauthorised" };
  }

  // 2. Validate
  const parsed = CreatePostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    categoryId: formData.get("categoryId"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  // 3. Authorise resource (verify category exists & is accessible)
  const category = await db.category.findUnique({
    where: { id: parsed.data.categoryId },
  });
  if (!category) return { message: "Category not found" };

  // 4. Mutate
  await db.post.create({
    data: {
      ...parsed.data,
      authorId: session.user.id,
    },
  });

  // 5. Revalidate caches
  revalidateTag("posts");
  revalidatePath("/blog");

  return { success: true, message: "Post created!" };
}`}
					</pre>
					<div className="space-y-4">
						<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
							{`// components/CreatePostForm.tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createPost } from "@/actions/post";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create Post"}
    </button>
  );
}

export function CreatePostForm() {
  const [state, action] = useActionState(
    createPost,
    { errors: {} },
  );

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" />
        {state.errors?.title && (
          <p className="text-sm text-red-500">
            {state.errors.title[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" />
        {state.errors?.content && (
          <p className="text-sm text-red-500">
            {state.errors.content[0]}
          </p>
        )}
      </div>

      {state.message && !state.success && (
        <p className="text-red-500">{state.message}</p>
      )}
      {state.success && (
        <p className="text-green-600">{state.message}</p>
      )}

      <SubmitButton />
    </form>
  );
}`}
						</pre>
					</div>
				</CardContent>
			</Card>

			{/* Optimistic updates */}
			<Card className="border-green-500/20">
				<CardHeader>
					<CardTitle className="text-base text-green-600">
						Optimistic Updates with useOptimistic()
					</CardTitle>
					<CardDescription>
						Update the UI immediately — roll back automatically on failure
					</CardDescription>
				</CardHeader>
				<CardContent>
					<pre className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
						{`"use client";
import { useOptimistic, useTransition } from "react";
import { toggleLike } from "@/actions/post";

function LikeButton({ postId, initialLikes, initialLiked }) {
  const [isPending, startTransition] = useTransition();

  const [optimisticState, updateOptimistic] = useOptimistic(
    { likes: initialLikes, liked: initialLiked },
    (current, optimisticValue) => ({
      ...current,
      ...optimisticValue,
    }),
  );

  function handleToggle() {
    // Immediately update UI
    updateOptimistic({
      liked: !optimisticState.liked,
      likes: optimisticState.likes + (optimisticState.liked ? -1 : 1),
    });

    startTransition(async () => {
      // Server action runs in background
      await toggleLike(postId);
      // If action fails, React reverts optimistic state automatically
    });
  }

  return (
    <button onClick={handleToggle} disabled={isPending}>
      {optimisticState.liked ? "❤️" : "🤍"} {optimisticState.likes}
    </button>
  );
}`}
					</pre>
				</CardContent>
			</Card>

			{/* Anti-patterns */}
			<Card className="border-red-500/20">
				<CardHeader>
					<CardTitle className="text-base text-red-600">
						Server Action Anti-patterns to Avoid
					</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<pre className="rounded-md bg-red-500/10 p-3 font-mono text-xs leading-relaxed">
						{`// ✗ No authentication — any user can call this
"use server";
export async function deletePost(postId: string) {
  // No session check!
  await db.post.delete({ where: { id: postId } });
  revalidatePath("/blog");
}

// ✗ No authorisation — user A can delete user B's post
export async function deletePost(postId: string) {
  const session = await auth(); // authenticated
  if (!session) throw new Error("Unauthorised");

  // But no check that session.user owns this post!
  await db.post.delete({ where: { id: postId } });
}`}
					</pre>
					<pre className="rounded-md bg-green-500/10 p-3 font-mono text-xs leading-relaxed">
						{`// ✓ Authentication AND authorisation
"use server";
export async function deletePost(postId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorised");

  // Verify ownership — only the author can delete
  const post = await db.post.findUnique({
    where: { id: postId },
    select: { authorId: true },
  });

  if (!post) throw new Error("Post not found");
  if (post.authorId !== session.user.id)
    throw new Error("Forbidden"); // can't delete others' posts

  await db.post.delete({ where: { id: postId } });
  revalidatePath("/blog");
}`}
					</pre>
				</CardContent>
			</Card>
		</section>
	);
}
