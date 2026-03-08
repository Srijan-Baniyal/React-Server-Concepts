import type { ReactNode } from "react";
import { ActivityDemo } from "@/components/react19/ActivityDemo";
import { UseActionStateDemo } from "@/components/react19/UseActionStateDemo";
import { UseEffectEventDemo } from "@/components/react19/UseEffectEventDemo";
import { UseFormStatusDemo } from "@/components/react19/UseFormStatusDemo";
import { UseOptimisticDemo } from "@/components/react19/UseOptimisticDemo";
import { ViewTransitionConceptCard } from "@/components/react19/ViewTransitionConceptCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function hl(code: string): ReactNode {
	const re =
		/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\/\*[\s\S]*?\*\/)|(\/\/[^\n]*)|(\b(?:import|export|default|from|async|function|return|const|let|type|interface|await|new|class|extends|null|undefined|true|false|void)\b)|(<\/?[A-Z][A-Za-z0-9.]*)|(<\/?[a-z][a-z0-9-]*)/g;
	const out: ReactNode[] = [];
	let last = 0;
	for (const m of code.matchAll(re)) {
		const [full, str, blk, cmt, kw, comp, tag] = m;
		const i = m.index ?? 0;
		if (i > last) {
			out.push(code.slice(last, i));
		}
		if (str !== undefined) {
			out.push(
				<span className="text-yellow-400" key={i}>
					{full}
				</span>
			);
		} else if (blk !== undefined || cmt !== undefined) {
			out.push(
				<span className="text-zinc-400 italic" key={i}>
					{full}
				</span>
			);
		} else if (kw !== undefined) {
			out.push(
				<span className="text-blue-400" key={i}>
					{full}
				</span>
			);
		} else if (comp !== undefined) {
			out.push(
				<span className="text-red-400" key={i}>
					{full}
				</span>
			);
		} else if (tag !== undefined) {
			out.push(
				<span className="text-green-400" key={i}>
					{full}
				</span>
			);
		}
		last = i + full.length;
	}
	if (last < code.length) {
		out.push(code.slice(last));
	}
	return <>{out}</>;
}

export default function React19Page() {
	return (
		<div className="container mx-auto max-w-7xl space-y-16 px-4 pt-24 pb-16 sm:px-6 md:pt-28 lg:px-8">
			{/* ─── Hero ──────────────────────────────────────────────────────── */}
			<section className="space-y-6">
				<div className="flex items-start gap-5">
					<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/50 shadow-lg shadow-primary/20">
						<span className="text-3xl">⚛️</span>
					</div>
					<div>
						<h1 className="font-bold text-5xl tracking-tight">React 19</h1>
						<p className="mt-2 text-lg text-muted-foreground">
							The biggest React release in years — Actions, new hooks, and a
							smarter runtime
						</p>
					</div>
				</div>

				<Card className="border-primary/20 bg-primary/5">
					<CardContent className="pt-6">
						<p className="text-lg leading-relaxed">
							<strong className="text-foreground">React 19</strong> (stable
							since December 5, 2024) ships a complete rethinking of how
							mutations and async work is handled. The release introduces{" "}
							<strong className="text-primary">Actions</strong>, four brand-new
							hooks, the{" "}
							<strong className="text-primary">
								<code>use</code>
							</strong>{" "}
							API, fully-stable Server Components, and a raft of ergonomic
							improvements that reduce boilerplate across the board.
						</p>
					</CardContent>
				</Card>

				{/* Feature badges */}
				<div className="flex flex-wrap gap-2">
					{[
						"Actions",
						"useActionState",
						"useFormStatus",
						"useOptimistic",
						"use API",
						"ref as prop",
						"<Context> provider",
						"Document Metadata",
						"Server Actions",
						"Resource Preloading",
					].map((f) => (
						<Badge className="text-sm" key={f} variant="secondary">
							{f}
						</Badge>
					))}
				</div>
			</section>

			<Separator />

			{/* ─── SECTION 1: Actions ────────────────────────────────────────── */}
			<section className="space-y-8" id="actions">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						Actions ⚡
					</h2>
					<p className="mb-6 text-muted-foreground">
						The new primitive for async mutations — pending state, errors, and
						optimistic updates handled automatically.
					</p>

					<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
						<CardContent className="space-y-6 pt-6">
							<p className="text-muted-foreground leading-relaxed">
								Before React 19 you had to wire up{" "}
								<code className="rounded bg-muted px-1">isPending</code>,{" "}
								<code className="rounded bg-muted px-1">error</code>, and
								multiple <code className="rounded bg-muted px-1">useState</code>{" "}
								calls every time you submitted data. React 19 introduces{" "}
								<strong className="text-foreground">Actions</strong>: async
								functions passed to transitions (or to{" "}
								<code className="rounded bg-muted px-1">
									{"<form action={}>"}
								</code>
								) that React manages for you.
							</p>

							{/* Before / After comparison */}
							<div className="grid gap-4 md:grid-cols-2">
								<div className="overflow-hidden rounded-xl border border-destructive/20">
									<div className="border-destructive/20 border-b bg-destructive/5 px-4 py-2.5">
										<p className="font-medium text-destructive text-sm">
											❌ Before — manual plumbing
										</p>
									</div>
									<pre className="bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
										{hl(`function UpdateName() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] =
    useState(false);

  const handleSubmit = async () => {
    setIsPending(true);
    const error = await updateName(name);
    setIsPending(false);
    if (error) {
      setError(error);
      return;
    }
    redirect("/path");
  };

  return (
    <div>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={isPending}
      >
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}`)}
									</pre>
								</div>

								<div className="overflow-hidden rounded-xl border border-green-500/20">
									<div className="border-green-500/20 border-b bg-green-500/5 px-4 py-2.5">
										<p className="font-medium text-green-600 text-sm dark:text-green-400">
											✅ After — useTransition with async Action
										</p>
									</div>
									<pre className="bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
										{hl(`function UpdateName() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, startTransition] =
    useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const error = await updateName(name);
      if (error) {
        setError(error);
        return;
      }
      redirect("/path");
    });
  };

  return (
    <div>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={isPending}
      >
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}`)}
									</pre>
								</div>
							</div>

							{/* What Actions give you */}
							<div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
								<h3 className="mb-3 font-semibold text-foreground text-sm">
									🎁 What Actions give you automatically
								</h3>
								<div className="grid gap-3 sm:grid-cols-2">
									{[
										{
											icon: "⏳",
											title: "Pending state",
											desc: "isPending is true from start to final commit — zero manual setters",
										},
										{
											icon: "✨",
											title: "Optimistic updates",
											desc: "Via useOptimistic — instant UI feedback while the server responds",
										},
										{
											icon: "🚨",
											title: "Error handling",
											desc: "Errors propagate to Error Boundaries and revert optimistic state",
										},
										{
											icon: "📄",
											title: "Form reset",
											desc: "<form action={fn}> resets uncontrolled inputs after success",
										},
									].map((item) => (
										<div
											className="rounded-xl border border-border/40 bg-background/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-md"
											key={item.title}
										>
											<div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-lg">
												{item.icon}
											</div>
											<p className="mb-1 font-semibold text-sm">{item.title}</p>
											<p className="text-muted-foreground text-xs leading-relaxed">
												{item.desc}
											</p>
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<Separator />

			{/* ─── SECTION 2: useActionState ─────────────────────────────────── */}
			<section className="space-y-8" id="use-action-state">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						<code>useActionState</code> 🪝
					</h2>
					<p className="mb-6 text-muted-foreground">
						The one-stop hook that wraps your Action and hands back state, a
						callable Action, and a pending flag.
					</p>

					<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
						<CardContent className="space-y-6 pt-6">
							<p className="text-muted-foreground leading-relaxed">
								<code className="rounded bg-muted px-1">useActionState</code>{" "}
								accepts an async Action function and an initial state. It
								returns{" "}
								<code className="rounded bg-muted px-1">
									[state, dispatchAction, isPending]
								</code>
								. Every time you call{" "}
								<code className="rounded bg-muted px-1">dispatchAction</code>,
								React invokes your function, tracks pending, and stores whatever
								you <code className="rounded bg-muted px-1">return</code> as the
								new state.
							</p>

							<div className="overflow-hidden rounded-xl border border-border/40">
								<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
									<p className="font-medium text-sm">useActionState pattern</p>
								</div>
								<pre className="bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
									{hl(`import { useActionState } from "react";

async function updateNameAction(prevState, formData) {
  const name = formData.get("name");
  const error = await updateName(name);
  if (error) return error;      // stored as state
  redirect("/profile");
  return null;
}

function RenameForm() {
  const [error, submitAction, isPending] =
    useActionState(updateNameAction, null);

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Saving…" : "Save"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}`)}
								</pre>
							</div>

							<div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm">
								<strong>📝 Note:</strong>{" "}
								<code className="rounded bg-muted px-1">useActionState</code>{" "}
								was previously called{" "}
								<code className="rounded bg-muted px-1">
									ReactDOM.useFormState
								</code>{" "}
								in Canary. It has been renamed and{" "}
								<code className="rounded bg-muted px-1">useFormState</code> is
								now deprecated.
							</div>
						</CardContent>
					</Card>

					<UseActionStateDemo />
				</div>
			</section>

			<Separator />

			{/* ─── SECTION 3: useFormStatus ──────────────────────────────────── */}
			<section className="space-y-8" id="use-form-status">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						<code>useFormStatus</code> 📋
					</h2>
					<p className="mb-6 text-muted-foreground">
						Read the parent form&apos;s submission status from any child
						component — no prop drilling needed.
					</p>

					<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
						<CardContent className="space-y-6 pt-6">
							<p className="text-muted-foreground leading-relaxed">
								Design-system components (buttons, spinners, inputs) often need
								to know whether their surrounding form is submitting. With{" "}
								<code className="rounded bg-muted px-1">useFormStatus</code>{" "}
								they can read that state independently, like a Context consumer
								— but without any setup.
							</p>

							<div className="overflow-hidden rounded-xl border border-border/40">
								<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
									<p className="font-medium text-sm">
										useFormStatus in a design-system button
									</p>
								</div>
								<pre className="bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
									{hl(`import { useFormStatus } from "react-dom";

// This component lives deep inside the form
function SubmitButton() {
  const { pending, data, method, action } =
    useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting…" : "Submit"}
    </button>
  );
}

// Usage — SubmitButton reads form status automatically
function CheckoutForm() {
  return (
    <form action={checkoutAction}>
      <input name="card" />
      <SubmitButton />   {/* no props needed */}
    </form>
  );
}`)}
								</pre>
							</div>

							<div className="grid gap-3 sm:grid-cols-3">
								{[
									{
										field: "pending",
										type: "boolean",
										desc: "true while the form action is executing",
									},
									{
										field: "data",
										type: "FormData | null",
										desc: "the form data being submitted",
									},
									{
										field: "method",
										type: '"get" | "post"',
										desc: "HTTP method of the form",
									},
								].map((f) => (
									<div
										className="rounded-xl border border-border/40 bg-background/50 p-3 text-xs backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-md"
										key={f.field}
									>
										<code className="font-bold text-primary">{f.field}</code>
										<span className="ml-1 text-muted-foreground">{f.type}</span>
										<p className="mt-1 text-muted-foreground leading-relaxed">
											{f.desc}
										</p>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					<UseFormStatusDemo />
				</div>
			</section>

			<Separator />

			{/* ─── SECTION 4: useOptimistic ──────────────────────────────────── */}
			<section className="space-y-8" id="use-optimistic">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						<code>useOptimistic</code> 🚀
					</h2>
					<p className="mb-6 text-muted-foreground">
						Instantly reflect a UI change while the server is still processing —
						then reconcile when done.
					</p>

					<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
						<CardContent className="space-y-6 pt-6">
							<p className="text-muted-foreground leading-relaxed">
								<code className="rounded bg-muted px-1">useOptimistic</code>{" "}
								takes a piece of state and returns an <em>optimistic copy</em>{" "}
								of it. You call{" "}
								<code className="rounded bg-muted px-1">addOptimistic</code>{" "}
								inside an Action to immediately show the expected result. React
								automatically rolls back to the real state once the async
								operation settles.
							</p>

							<div className="overflow-hidden rounded-xl border border-border/40">
								<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
									<p className="font-medium text-sm">Optimistic todo list</p>
								</div>
								<pre className="bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
									{hl(`import { useOptimistic } from "react";

function TodoList({ todos, addTodo }) {
  // optimisticTodos mirrors todos PLUS any pending add
  const [optimisticTodos, addOptimistic] =
    useOptimistic(todos);

  const formAction = async (formData) => {
    const text = formData.get("todo");

    // ✅ Paint the new item immediately
    addOptimistic([...optimisticTodos, { text, pending: true }]);

    // Server round-trip (may take 1-2s)
    await addTodo(text);
    // React automatically switches to the real server state
  };

  return (
    <>
      <ul>
        {optimisticTodos.map((todo, i) => (
          <li key={i} style={{ opacity: todo.pending ? 0.5 : 1 }}>
            {todo.text}
          </li>
        ))}
      </ul>
      <form action={formAction}>
        <input name="todo" />
        <button type="submit">Add</button>
      </form>
    </>
  );
}`)}
								</pre>
							</div>

							<div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-sm">
								<strong>✅ Key behaviour:</strong> If the async action succeeds,
								React replaces the optimistic value with the real state. If it{" "}
								<em>fails</em>, React automatically reverts to the value before
								the optimistic update — no manual cleanup needed.
							</div>
						</CardContent>
					</Card>

					<UseOptimisticDemo />
				</div>
			</section>

			<Separator />

			{/* ─── SECTION 5: use API ────────────────────────────────────────── */}
			<section className="space-y-8" id="use-api">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						The <code>use</code> API 🎣
					</h2>
					<p className="mb-6 text-muted-foreground">
						Read a Promise or a Context value at any point during render — even
						inside <code className="rounded bg-muted px-1">if</code> blocks and
						loops.
					</p>

					<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
						<CardContent className="space-y-6 pt-6">
							<p className="text-muted-foreground leading-relaxed">
								<code className="rounded bg-muted px-1">use</code> is a new
								React API (not a hook) that can be called{" "}
								<strong className="text-foreground">conditionally</strong>,
								unlike all existing hooks. When passed a Promise it integrates
								with Suspense — suspending the component until the promise
								resolves. When passed a Context it reads the nearest provider
								value.
							</p>

							<div className="grid gap-4 md:grid-cols-2">
								<div className="overflow-hidden rounded-xl border border-border/40">
									<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
										<p className="font-semibold text-sm">
											📦 Streaming data from Server → Client
										</p>
									</div>
									<pre className="bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
										{hl(`// server component (app/page.tsx)
import { Message } from "./message";

export default function Page() {
  // Promise passed as prop — NOT awaited here
  const msgPromise = fetchMessage();
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <Message messagePromise={msgPromise} />
    </Suspense>
  );
}

// client component (message.tsx)
"use client";
import { use } from "react";

export function Message({ messagePromise }) {
  // 🛑 suspends until resolved
  const msg = use(messagePromise);
  return <p>{msg}</p>;
}`)}
									</pre>
								</div>

								<div className="overflow-hidden rounded-xl border border-border/40">
									<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
										<p className="font-semibold text-sm">
											🎨 Conditional Context reading
										</p>
									</div>
									<pre className="bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
										{hl(`import { use } from "react";
import { ThemeContext } from "./theme";

function Heading({ children }) {
  // ✅ use() can be called after an early return
  if (!children) return null;

  // useContext() would crash here due to hook rules
  const theme = use(ThemeContext);

  return (
    <h1 style={{ color: theme.color }}>
      {children}
    </h1>
  );
}`)}
									</pre>
								</div>
							</div>

							<div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm">
								<strong>⚠️ Gotcha:</strong> Do NOT create a Promise inside a
								Client Component render and pass it straight to{" "}
								<code className="rounded bg-muted px-1">use()</code>. Every
								render creates a new Promise, which causes an infinite loop.
								Always create Promises in Server Components or stable top-level
								caches and pass them down as props.
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<Separator />

			{/* ─── SECTION 6: Server Components & Server Actions ─────────────── */}
			<section className="space-y-8" id="server-components">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						Server Components &amp; Server Actions 🖥️
					</h2>
					<p className="mb-6 text-muted-foreground">
						Stable in React 19 — zero-bundle-size components and secure
						server-side mutations.
					</p>

					<div className="space-y-6">
						<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="text-lg">
									🧩 Server Components (stable)
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-muted-foreground leading-relaxed">
									Server Components render entirely on the server (or at build
									time) and send plain HTML or the RSC payload to the client.
									They can <code className="rounded bg-muted px-1">await</code>{" "}
									any async data source directly — no{" "}
									<code className="rounded bg-muted px-1">useEffect</code>, no
									client-side fetch.
								</p>
								<div className="overflow-hidden rounded-xl border border-border/40">
									<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
										<p className="font-medium text-sm">
											app/products/page.tsx — Server Component by default
										</p>
									</div>
									<pre className="bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
										{hl(`export default async function ProductsPage() {
  // Fetch runs on the server — never ships to the browser
  const products = await db.product.findMany();

  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>{p.name} — {p.price}</li>
      ))}
    </ul>
  );
}`)}
									</pre>
								</div>

								<div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm">
									<strong>⚠️ Common misunderstanding:</strong> There is{" "}
									<em>no</em>{" "}
									<code className="rounded bg-muted px-1">"use server"</code>{" "}
									directive for Server Components. That directive marks{" "}
									<strong>Server Actions</strong> only.
								</div>
							</CardContent>
						</Card>

						<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="text-lg">
									🔁 Server Actions (<code>&quot;use server&quot;</code>)
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-muted-foreground leading-relaxed">
									Server Actions let Client Components call async functions that
									execute exclusively on the server. The framework automatically
									creates a reference, serialises arguments, and routes the RPC
									call.
								</p>
								<div className="overflow-hidden rounded-xl border border-border/40">
									<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
										<p className="font-medium text-sm">
											Server Action + Client Component
										</p>
									</div>
									<pre className="bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
										{hl(`// actions.ts
"use server";

export async function deletePost(id: string) {
  await db.post.delete({ where: { id } });
  revalidatePath("/posts");
}

// PostCard.tsx  — Client Component
"use client";
import { deletePost } from "./actions";

export function PostCard({ post }) {
  return (
    <div>
      <h2>{post.title}</h2>
      {/* Calling deletePost hits the server, never the client bundle */}
      <button onClick={() => deletePost(post.id)}>
        Delete
      </button>
    </div>
  );
}`)}
									</pre>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<Separator />

			{/* ─── SECTION 7: Ergonomic improvements ────────────────────────── */}
			<section className="space-y-8" id="improvements">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						Ergonomic Improvements 🛠️
					</h2>
					<p className="mb-6 text-muted-foreground">
						Quality-of-life upgrades that reduce boilerplate throughout your
						component tree.
					</p>

					<div className="space-y-6">
						{/* ref as prop */}
						<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-lg">
									<Badge variant="outline">forwardRef → gone</Badge>
									<code>ref</code> as a prop
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-muted-foreground leading-relaxed">
									Function components now receive{" "}
									<code className="rounded bg-muted px-1">ref</code> as a plain
									prop. No more wrapping in{" "}
									<code className="rounded bg-muted px-1">forwardRef</code>.
								</p>
								<div className="grid gap-4 md:grid-cols-2">
									<div className="overflow-hidden rounded-xl border border-destructive/20">
										<div className="border-destructive/20 border-b bg-destructive/5 px-4 py-2.5">
											<p className="font-medium text-destructive text-xs">
												❌ React 18
											</p>
										</div>
										<pre className="bg-muted/30 p-3 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
											{hl(`const MyInput = forwardRef(
  function MyInput({ placeholder }, ref) {
    return (
      <input ref={ref} placeholder={placeholder} />
    );
  }
);`)}
										</pre>
									</div>
									<div className="overflow-hidden rounded-xl border border-green-500/20">
										<div className="border-green-500/20 border-b bg-green-500/5 px-4 py-2.5">
											<p className="font-medium text-green-600 text-xs dark:text-green-400">
												✅ React 19
											</p>
										</div>
										<pre className="bg-muted/30 p-3 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
											{hl(`function MyInput({ placeholder, ref }) {
  return (
    <input ref={ref} placeholder={placeholder} />
  );
}`)}
										</pre>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Context as provider */}
						<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-lg">
									<Badge variant="outline">
										{"<Context.Provider>"} → deprecated
									</Badge>
									<code>{"<Context>"}</code> as a provider
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid gap-4 md:grid-cols-2">
									<div className="overflow-hidden rounded-xl border border-destructive/20">
										<div className="border-destructive/20 border-b bg-destructive/5 px-4 py-2.5">
											<p className="font-medium text-destructive text-xs">
												❌ React 18
											</p>
										</div>
										<pre className="bg-muted/30 p-3 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
											{hl(`<ThemeContext.Provider value="dark">
  {children}
</ThemeContext.Provider>`)}
										</pre>
									</div>
									<div className="overflow-hidden rounded-xl border border-green-500/20">
										<div className="border-green-500/20 border-b bg-green-500/5 px-4 py-2.5">
											<p className="font-medium text-green-600 text-xs dark:text-green-400">
												✅ React 19
											</p>
										</div>
										<pre className="bg-muted/30 p-3 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
											{hl(`<ThemeContext value="dark">
  {children}
</ThemeContext>`)}
										</pre>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Ref cleanup */}
						<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="text-lg">
									🧹 Cleanup functions for refs
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-muted-foreground leading-relaxed">
									Ref callbacks can now return a cleanup function. React calls
									it when the element is removed from the DOM — just like an
									effect cleanup.
								</p>
								<div className="overflow-hidden rounded-xl border border-border/40">
									<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
										<p className="font-medium text-sm">
											Ref callback with cleanup
										</p>
									</div>
									<pre className="bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
										{hl(`<input
  ref={(el) => {
    // el is assigned → setup
    const observer = new ResizeObserver(handleResize);
    observer.observe(el);

    // React calls this when the element unmounts
    return () => observer.disconnect();
  }}
/>`)}
									</pre>
								</div>
							</CardContent>
						</Card>

						{/* useDeferredValue initial */}
						<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="text-lg">
									<code>useDeferredValue</code> — initial value
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-muted-foreground leading-relaxed">
									You can now pass a second argument to{" "}
									<code className="rounded bg-muted px-1">
										useDeferredValue
									</code>{" "}
									as the value to use on the very first render, before the
									deferred re-render fires.
								</p>
								<div className="overflow-hidden rounded-xl border border-border/40">
									<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
										<p className="font-medium text-sm">
											Initial value prevents flicker on first render
										</p>
									</div>
									<pre className="bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
										{hl(`function Search({ query }) {
  // First render: value = "" (blank, no flicker)
  // Subsequent: value updates lazily in background
  const deferredQuery = useDeferredValue(query, "");
  return <Results query={deferredQuery} />;
}`)}
									</pre>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<Separator />

			{/* ─── SECTION 8: Document Metadata ─────────────────────────────── */}
			<section className="space-y-8" id="metadata">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						Native Document Metadata 📄
					</h2>
					<p className="mb-6 text-muted-foreground">
						Render <code className="rounded bg-muted px-1">{"<title>"}</code>,{" "}
						<code className="rounded bg-muted px-1">{"<meta>"}</code>, and{" "}
						<code className="rounded bg-muted px-1">{"<link>"}</code> from
						anywhere in the tree — React hoists them to{" "}
						<code className="rounded bg-muted px-1">{"<head>"}</code>{" "}
						automatically.
					</p>

					<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
						<CardContent className="space-y-4 pt-6">
							<p className="text-muted-foreground leading-relaxed">
								Previously you needed{" "}
								<code className="rounded bg-muted px-1">react-helmet</code> or
								framework-specific APIs. In React 19 these tags work natively
								with Client rendering, Streaming SSR, and Server Components.
							</p>
							<div className="overflow-hidden rounded-xl border border-border/40">
								<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
									<p className="font-medium text-sm">
										Metadata co-located with component
									</p>
								</div>
								<pre className="bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
									{hl(`function BlogPost({ post }) {
  return (
    <article>
      {/* React hoists these three into <head> */}
      <title>{post.title}</title>
      <meta name="author" content={post.author} />
      <link rel="canonical" href={post.url} />

      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}`)}
								</pre>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<Separator />

			{/* ─── SECTION 9: Stylesheet & Script support ────────────────────── */}
			<section className="space-y-8" id="stylesheets-scripts">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						Smart Stylesheet &amp; Script Loading 🎨
					</h2>
					<p className="mb-6 text-muted-foreground">
						Co-locate stylesheets and async scripts with the components that
						need them — React deduplicates and orders them automatically.
					</p>

					<div className="space-y-6">
						<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="text-lg">
									📦 Stylesheets with <code>precedence</code>
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-muted-foreground leading-relaxed">
									Pass a{" "}
									<code className="rounded bg-muted px-1">precedence</code> prop
									to a{" "}
									<code className="rounded bg-muted px-1">
										{"<link rel='stylesheet'>"}
									</code>{" "}
									and React handles insertion order, deduplication, and Suspense
									integration (the page won&apos;t reveal until the sheet is
									loaded).
								</p>
								<div className="overflow-hidden rounded-xl border border-border/40">
									<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
										<p className="font-medium text-sm">
											Stylesheet precedence controls load order
										</p>
									</div>
									<pre className="bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
										{hl(`function Dashboard() {
  return (
    <Suspense fallback="Loading…">
      {/* precedence controls insertion order */}
      <link rel="stylesheet" href="/base.css"  precedence="low"  />
      <link rel="stylesheet" href="/theme.css" precedence="high" />
      <main>…</main>
    </Suspense>
  );
}`)}
									</pre>
								</div>
							</CardContent>
						</Card>

						<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="text-lg">
									⚡ Async scripts — deduplication
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-muted-foreground leading-relaxed">
									Render{" "}
									<code className="rounded bg-muted px-1">
										{"<script async src='…' />"}
									</code>{" "}
									anywhere in the tree. React loads each unique{" "}
									<code className="rounded bg-muted px-1">src</code> only once,
									regardless of how many components render it.
								</p>
								<div className="overflow-hidden rounded-xl border border-border/40">
									<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
										<p className="font-medium text-sm">
											Same script, two components — one load
										</p>
									</div>
									<pre className="bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
										{hl(`// Both components render the same widget script,
// but the browser loads it only once.
function MapWidget() {
  return (
    <>
      <script async src="https://example.com/map.js" />
      <div id="map" />
    </>
  );
}

function App() {
  return (
    <>
      <MapWidget />
      <MapWidget /> {/* no duplicate script tag */}
    </>
  );
}`)}
									</pre>
								</div>
							</CardContent>
						</Card>

						<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="text-lg">
									🚀 Resource Preloading APIs
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-muted-foreground leading-relaxed">
									New imperative APIs from{" "}
									<code className="rounded bg-muted px-1">react-dom</code> let
									you hint the browser about upcoming resources early — before
									any component even renders.
								</p>
								<div className="overflow-hidden rounded-xl border border-border/40">
									<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
										<p className="font-medium text-sm">
											Browser resource hints from React
										</p>
									</div>
									<pre className="bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
										{hl(`import {
  prefetchDNS,  // resolve DNS for a host early
  preconnect,   // open a TCP connection early
  preload,      // fetch font / style / script early
  preinit,      // fetch AND execute a script early
} from "react-dom";

function App() {
  prefetchDNS("https://fonts.googleapis.com");
  preconnect("https://cdn.example.com");
  preload("https://cdn.example.com/hero.jpg", { as: "image" });
  preinit("https://cdn.example.com/analytics.js", { as: "script" });
  // …
}`)}
									</pre>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<Separator />

			{/* ─── SECTION 10: Better Error Reporting & Hydration ───────────── */}
			<section className="space-y-8" id="error-reporting">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						Better Error Reporting &amp; Hydration 🔍
					</h2>
					<p className="mb-6 text-muted-foreground">
						Fewer duplicate logs, richer diffs, and new lifecycle callbacks for
						error boundaries.
					</p>

					<div className="space-y-6">
						<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="text-lg">
									💧 Hydration error diffs
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-muted-foreground leading-relaxed">
									React 18 fired multiple overlapping warnings for a single
									hydration mismatch. React 19 collapses them into one
									structured message with a unified diff:
								</p>
								<div className="overflow-hidden rounded-xl border border-border/40">
									<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
										<p className="font-medium text-sm">
											React 19 console output — single structured message
										</p>
									</div>
									<pre className="bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
										{hl(`Uncaught Error: Hydration failed because the server rendered HTML
didn't match the client.

  <App>
    <span>
+     Client        ← client sent this
-     Server        ← server sent this

  at throwOnHydrationMismatch …`)}
									</pre>
								</div>
							</CardContent>
						</Card>

						<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="text-lg">
									🚨 New root-level error callbacks
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-muted-foreground leading-relaxed">
									<code className="rounded bg-muted px-1">createRoot</code> and{" "}
									<code className="rounded bg-muted px-1">hydrateRoot</code> now
									accept three callbacks so you can route errors to an
									error-tracking service with full context.
								</p>
								<div className="overflow-hidden rounded-xl border border-border/40">
									<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
										<p className="font-medium text-sm">
											Three error lifecycle callbacks
										</p>
									</div>
									<pre className="bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
										{hl(`createRoot(document.getElementById("root"), {
  onCaughtError(error, errorInfo) {
    // Error caught by an Error Boundary
    Sentry.captureException(error, errorInfo);
  },
  onUncaughtError(error, errorInfo) {
    // Error NOT caught — app will likely crash
    Sentry.captureException(error, errorInfo);
  },
  onRecoverableError(error, errorInfo) {
    // React self-recovered (hydration mismatch, etc.)
    console.warn("Recoverable:", error);
  },
}).render(<App />);`)}
									</pre>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<Separator />

			{/* ─── SECTION 11: Custom Elements ───────────────────────────────── */}
			<section className="space-y-8" id="custom-elements">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						Custom Elements — Full Support 🌐
					</h2>
					<p className="mb-6 text-muted-foreground">
						React 19 passes all tests on <em>Custom Elements Everywhere</em> —
						properties vs attributes are now handled correctly on both client
						and server.
					</p>

					<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
						<CardContent className="space-y-4 pt-6">
							<div className="grid gap-4 sm:grid-cols-2">
								<div className="rounded-xl border border-border/40 bg-background/50 p-4 text-sm backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-md">
									<p className="mb-2 font-semibold">Client-side rendering</p>
									<p className="text-muted-foreground text-xs leading-relaxed">
										Props matching a property on the Custom Element instance are
										set as <strong>properties</strong>. All others become
										attributes.
									</p>
								</div>
								<div className="rounded-xl border border-border/40 bg-background/50 p-4 text-sm backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-md">
									<p className="mb-2 font-semibold">Server-side rendering</p>
									<p className="text-muted-foreground text-xs leading-relaxed">
										Primitive props (string, number,{" "}
										<code className="rounded bg-muted px-1">true</code>) render
										as <strong>attributes</strong>. Objects, functions, and{" "}
										<code className="rounded bg-muted px-1">false</code> are
										omitted.
									</p>
								</div>
							</div>
							<div className="overflow-hidden rounded-xl border border-border/40">
								<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
									<p className="font-medium text-sm">
										Custom element props in React 19 ✅
									</p>
								</div>
								<pre className="bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
									{hl(`<my-video-player
  src="/video.mp4"       // → attribute (string)
  volume={0.8}           // → property on client, attribute on server
  onPlaybackEnd={fn}     // → property (function, SSR-omitted)
  autoplay               // → attribute (boolean true)
/>`)}
								</pre>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<Separator />

			{/* ─── SECTION 12: React DOM Static APIs ────────────────────────── */}
			<section className="space-y-8" id="static-apis">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						New React DOM Static APIs 📦
					</h2>
					<p className="mb-6 text-muted-foreground">
						<code className="rounded bg-muted px-1">prerender</code> and{" "}
						<code className="rounded bg-muted px-1">prerenderToNodeStream</code>{" "}
						— static-site generation that actually waits for all data.
					</p>

					<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
						<CardContent className="space-y-4 pt-6">
							<p className="text-muted-foreground leading-relaxed">
								The existing{" "}
								<code className="rounded bg-muted px-1">renderToString</code>{" "}
								didn&apos;t wait for suspended data. The new static APIs do —
								making them ideal for SSG build steps.
							</p>
							<div className="overflow-hidden rounded-xl border border-border/40">
								<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
									<p className="font-medium text-sm">
										prerender — waits for ALL suspended data
									</p>
								</div>
								<pre className="bg-muted/30 p-4 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
									{hl(`import { prerender } from "react-dom/static";

export async function GET() {
  // Waits for ALL suspended data before resolving
  const { prelude } = await prerender(<App />, {
    bootstrapScripts: ["/main.js"],
  });

  return new Response(prelude, {
    headers: { "content-type": "text/html" },
  });
}`)}
								</pre>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<Separator />

			{/* ─── SECTION 13: Quick Reference ───────────────────────────────── */}
			<section className="space-y-8" id="quick-reference">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						Quick Reference 📚
					</h2>
					<p className="mb-6 text-muted-foreground">
						Everything new at a glance.
					</p>

					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{[
							{
								icon: "⚡",
								title: "Actions",
								desc: "Async functions in transitions. React manages pending, errors, and form reset.",
								tag: "New concept",
								tagClass: "bg-primary/10 text-primary",
							},
							{
								icon: "🪝",
								title: "useActionState",
								desc: "Wrap an Action and get [state, dispatch, isPending] back.",
								tag: "New hook",
								tagClass: "bg-green-500/10 text-green-600",
							},
							{
								icon: "📋",
								title: "useFormStatus",
								desc: "Read parent <form> pending/data from any child — no prop passing.",
								tag: "New hook",
								tagClass: "bg-green-500/10 text-green-600",
							},
							{
								icon: "🚀",
								title: "useOptimistic",
								desc: "Instantly reflect a mutation in the UI; auto-revert on failure.",
								tag: "New hook",
								tagClass: "bg-green-500/10 text-green-600",
							},
							{
								icon: "🎣",
								title: "use()",
								desc: "Read a Promise or Context conditionally — even after early returns.",
								tag: "New API",
								tagClass: "bg-blue-500/10 text-blue-600",
							},
							{
								icon: "🖥️",
								title: "Server Actions",
								desc: '"use server" functions called from Client Components via RPC.',
								tag: "Stable",
								tagClass: "bg-purple-500/10 text-purple-600",
							},
							{
								icon: "🔗",
								title: "ref as prop",
								desc: "Pass ref directly — forwardRef is no longer needed.",
								tag: "Improvement",
								tagClass: "bg-orange-500/10 text-orange-600",
							},
							{
								icon: "🎨",
								title: "<Context> provider",
								desc: "Use <MyCtx value={…}> instead of <MyCtx.Provider>.",
								tag: "Improvement",
								tagClass: "bg-orange-500/10 text-orange-600",
							},
							{
								icon: "📄",
								title: "Document Metadata",
								desc: "<title>, <meta>, <link> are hoisted to <head> automatically.",
								tag: "Improvement",
								tagClass: "bg-orange-500/10 text-orange-600",
							},
							{
								icon: "🧹",
								title: "Ref cleanup",
								desc: "Ref callbacks can return a cleanup function, like useEffect.",
								tag: "Improvement",
								tagClass: "bg-orange-500/10 text-orange-600",
							},
							{
								icon: "🎭",
								title: "Stylesheet precedence",
								desc: "Manage CSS insertion order and defer renders until loaded.",
								tag: "Improvement",
								tagClass: "bg-orange-500/10 text-orange-600",
							},
							{
								icon: "🌐",
								title: "Custom Elements",
								desc: "Full property/attribute support on client and server.",
								tag: "Improvement",
								tagClass: "bg-orange-500/10 text-orange-600",
							},
						].map((item) => (
							<Card
								className="flex flex-col border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md"
								key={item.title}
							>
								<CardContent className="flex flex-1 flex-col gap-3 pt-5">
									<div className="flex items-center justify-between">
										<span className="text-2xl">{item.icon}</span>
										<span
											className={`rounded-full px-2 py-0.5 font-medium text-xs ${item.tagClass}`}
										>
											{item.tag}
										</span>
									</div>
									<div>
										<p className="font-semibold text-sm">{item.title}</p>
										<p className="mt-1 text-muted-foreground text-xs leading-relaxed">
											{item.desc}
										</p>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			<Separator />

			{/* ─── 2025 TIMELINE ─────────────────────────────────────────────── */}
			<section className="space-y-8" id="react-2025-timeline">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						React in 2025 — What&apos;s New 📅
					</h2>
					<p className="mb-6 text-muted-foreground">
						A running log of every significant release, feature drop, and
						ecosystem event from February 2025 through February 2026.
					</p>

					<div className="space-y-3">
						{[
							{
								date: "Feb 2025",
								title: "Create React App officially deprecated",
								badge: "ecosystem",
								badgeClass:
									"bg-orange-500/10 text-orange-600 dark:text-orange-400",
								desc: "After nearly a decade CRA is deprecated. The React team recommends Next.js, React Router, or Expo for new projects. CRA enters maintenance mode.",
							},
							{
								date: "Mar 2025",
								title: "React 19.1 released",
								badge: "release",
								badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
								desc: "Patch release with stability improvements, updated useId prefix from :r: to «r», and critical bug fixes across the runtime and SSR.",
							},
							{
								date: "Apr 2025",
								title: "React Labs: View Transitions & Activity",
								badge: "experimental",
								badgeClass:
									"bg-amber-500/10 text-amber-600 dark:text-amber-400",
								desc: "Two new experimental features ready to test: <ViewTransition> for declarative page animations and <Activity> for state-preserving visibility control. Also previewed: Performance Tracks, Compiler IDE Extension, Automatic Effect Dependencies.",
							},
							{
								date: "Oct 1, 2025",
								title: "React 19.2 released",
								badge: "release",
								badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
								desc: "Ships stable <Activity>, useEffectEvent, cacheSignal, Partial Pre-rendering, Performance Tracks for Chrome DevTools, SSR batching improvements, Web Streams for Node.js, and eslint-plugin-react-hooks v6.",
							},
							{
								date: "Oct 7, 2025",
								title: "React Compiler v1.0 stable",
								badge: "tooling",
								badgeClass:
									"bg-purple-500/10 text-purple-600 dark:text-purple-400",
								desc: "First stable release of React Compiler with automatic memoization, compiler-powered lint rules, SWC plugin support, and default enablement in new Expo/Vite/Next.js projects.",
							},
							{
								date: "Oct 7, 2025",
								title: "React Foundation announced",
								badge: "governance",
								badgeClass:
									"bg-green-500/10 text-green-600 dark:text-green-400",
								desc: "Independent non-profit to steward React's long-term open source development and community health. Meta contributed the React trademark and brand assets.",
							},
							{
								date: "Oct 16, 2025",
								title: "React Conf 2025",
								badge: "event",
								badgeClass: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
								desc: "Henderson, NV. Keynotes covered React 19.2 features, React Compiler v1.0, React Native 0.82 (New Architecture only), Fragment Refs, Partial Pre-rendering, and Async React patterns.",
							},
							{
								date: "Dec 3, 2025",
								title: "Critical RSC Security Vulnerability — CVE-2025-55182",
								badge: "security",
								badgeClass: "bg-red-500/10 text-red-600 dark:text-red-400",
								desc: "CVSS 10.0 unauthenticated RCE via malicious deserialization of Server Function payloads. Fixed in v19.0.1, v19.1.2, v19.2.1. Update all react-server-dom-* packages immediately.",
							},
							{
								date: "Dec 11, 2025",
								title: "Follow-up RSC vulnerabilities patched",
								badge: "security",
								badgeClass: "bg-red-500/10 text-red-600 dark:text-red-400",
								desc: "Two additional CVEs: Denial of Service (CVE-2025-55184, CVSS 7.5) and Source Code Exposure (CVE-2025-55183, CVSS 5.3). All fixed in the same v19.x.1+ patch releases.",
							},
							{
								date: "Jan 2026",
								title: "CVE-2026-23864 — DoS follow-up",
								badge: "security",
								badgeClass: "bg-red-500/10 text-red-600 dark:text-red-400",
								desc: "Additional Denial of Service vulnerability (CVSS 7.5) patched in January 2026. Keep react-server-dom-* packages on latest.",
							},
						].map((item) => (
							<div
								className="flex gap-4 rounded-xl border border-border/40 bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-md"
								key={item.title}
							>
								<div className="w-20 shrink-0 pt-0.5 font-medium text-muted-foreground text-xs">
									{item.date}
								</div>
								<div className="flex-1 space-y-1">
									<div className="flex flex-wrap items-center gap-2">
										<p className="font-semibold text-foreground text-sm">
											{item.title}
										</p>
										<span
											className={`rounded-full px-2 py-0.5 font-medium text-xs ${item.badgeClass}`}
										>
											{item.badge}
										</span>
									</div>
									<p className="text-muted-foreground text-xs leading-relaxed">
										{item.desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<Separator />

			{/* ─── CRA SUNSET ────────────────────────────────────────────────── */}
			<section className="space-y-8" id="cra-sunset">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						Sunsetting Create React App 🌇
					</h2>
					<p className="mb-6 text-muted-foreground">
						February 14, 2025 — React team officially deprecates the tool that
						bootstrapped an entire generation of apps.
					</p>

					<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
						<CardContent className="space-y-6 pt-6">
							<p className="text-muted-foreground leading-relaxed">
								After nearly a decade, Create React App (CRA) is deprecated as
								of February 2025. The React team cited{" "}
								<strong className="text-foreground">
									no active maintainers
								</strong>{" "}
								and the fact that modern production apps require routing, code
								splitting, data-fetching coordination, and SSR — all solved more
								elegantly by frameworks.
							</p>

							<div className="grid gap-4 sm:grid-cols-3">
								{[
									{
										emoji: "🚀",
										label: "New apps",
										rec: "Use Next.js, React Router (framework mode), or Expo",
										href: "https://nextjs.org/",
									},
									{
										emoji: "🔧",
										label: "Custom setups",
										rec: "Roll your own with Vite, Parcel, or Rsbuild",
										href: "https://vite.dev/",
									},
									{
										emoji: "📦",
										label: "Migration guides",
										rec: "Vite, Next.js, React Router, and Expo migration docs published",
										href: "https://react.dev/learn/creating-a-react-app",
									},
								].map((item) => (
									<div
										className="space-y-2 rounded-xl border border-border/40 bg-background/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-md"
										key={item.label}
									>
										<span className="text-2xl">{item.emoji}</span>
										<p className="font-semibold text-sm">{item.label}</p>
										<p className="text-muted-foreground text-xs leading-relaxed">
											{item.rec}
										</p>
									</div>
								))}
							</div>

							<div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 text-sm">
								<strong>📝 CRA in maintenance mode:</strong> Existing CRA apps
								continue to work and a final version was published for React 19
								compatibility. No new features will be added. A deprecation
								warning now appears on{" "}
								<code className="rounded bg-muted px-1">
									npx create-react-app
								</code>
								.
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<Separator />

			{/* ─── REACT 19.1 ────────────────────────────────────────────────── */}
			<section className="space-y-8" id="react-191">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						React 19.1{" "}
						<Badge className="align-middle text-sm" variant="secondary">
							March 2025
						</Badge>
					</h2>
					<p className="mb-6 text-muted-foreground">
						The first patch release in the React 19 series — improved stability
						and a useId hash update.
					</p>

					<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
						<CardContent className="space-y-5 pt-6">
							<p className="text-muted-foreground leading-relaxed">
								React 19.1 focused on hardening the 19.0 features and fixing
								regressions reported in the wild. The most visible change is a{" "}
								<strong className="text-foreground">new default prefix</strong>{" "}
								for <code className="rounded bg-muted px-1">useId</code>
								-generated IDs, paving the way for View Transition
								compatibility.
							</p>

							<div className="grid gap-3 sm:grid-cols-2">
								{[
									{
										icon: "🆔",
										title: "useId prefix updated",
										desc: "Default prefix changed from :r: (19.0) to «r» (19.1) to avoid conflicts with View Transition name requirements.",
									},
									{
										icon: "🐛",
										title: "Bug-fix release",
										desc: "Dozens of fixes across the runtime, SSR streaming, and hydration edge cases reported after the 19.0 stable launch.",
									},
									{
										icon: "🔒",
										title: "Security patch baseline",
										desc: "v19.1.0 and v19.1.1 were later found to contain the RSC RCE vulnerability; v19.1.2 is the safe version.",
									},
									{
										icon: "📦",
										title: "Upgrade path",
										desc: "Drop-in upgrade: npm install react@19.1 react-dom@19.1 — no API changes required.",
									},
								].map((item) => (
									<div
										className="rounded-xl border border-border/40 bg-background/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-md"
										key={item.title}
									>
										<div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-lg">
											{item.icon}
										</div>
										<p className="mb-1 font-semibold text-sm">{item.title}</p>
										<p className="text-muted-foreground text-xs leading-relaxed">
											{item.desc}
										</p>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<Separator />

			{/* ─── VIEW TRANSITIONS & ACTIVITY ───────────────────────────────── */}
			<section className="space-y-8" id="view-transitions">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						View Transitions &amp; Activity{" "}
						<Badge className="bg-amber-500/10 align-middle text-amber-600 text-sm dark:text-amber-400">
							Experimental / Canary
						</Badge>
					</h2>
					<p className="mb-6 text-muted-foreground">
						April 23, 2025 Labs post — two features ready to try today.
					</p>

					<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
						<CardContent className="space-y-6 pt-6">
							<div className="grid gap-6 md:grid-cols-2">
								{/* ViewTransition */}
								<div className="space-y-3">
									<div className="flex items-center gap-2">
										<span className="text-2xl">✨</span>
										<h3 className="font-semibold text-base">
											<code>{"<ViewTransition>"}</code>
										</h3>
									</div>
									<p className="text-muted-foreground text-sm leading-relaxed">
										A new component that wraps elements you want animated. Three
										primitives control everything:
									</p>
									<ul className="space-y-1 text-muted-foreground text-sm">
										<li>
											<strong className="text-foreground">What</strong> —{" "}
											<code className="text-primary">{"<ViewTransition>"}</code>{" "}
											wraps the element
										</li>
										<li>
											<strong className="text-foreground">When</strong> —{" "}
											<code className="text-primary">startTransition</code>,{" "}
											<code className="text-primary">useDeferredValue</code>, or{" "}
											<code className="text-primary">{"<Suspense>"}</code>
										</li>
										<li>
											<strong className="text-foreground">How</strong> — CSS{" "}
											<code className="text-primary">::view-transition-*</code>{" "}
											pseudo-elements
										</li>
									</ul>
									<div className="overflow-hidden rounded-xl border border-border/40">
										<div className="border-border/40 border-b bg-muted/40 px-3 py-2">
											<p className="font-medium text-xs">
												ViewTransition usage
											</p>
										</div>
										<pre className="bg-muted/30 p-3 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
											{hl(`import { ViewTransition } from 'react';

// Navigate → cross-fade automatically
<ViewTransition key={url}>
  {url === '/' ? <Home /> : <Details />}
</ViewTransition>

// Shared element between pages
<ViewTransition name={\`video-\${id}\`}>
  <Thumbnail />
</ViewTransition>`)}
										</pre>
									</div>
								</div>

								{/* Activity */}
								<div className="space-y-3">
									<div className="flex items-center gap-2">
										<span className="text-2xl">🫧</span>
										<h3 className="font-semibold text-base">
											<code>{"<Activity>"}</code>
										</h3>
									</div>
									<p className="text-muted-foreground text-sm leading-relaxed">
										Hide and show parts of the UI while{" "}
										<strong className="text-foreground">
											preserving state
										</strong>
										. Available stable in React 19.2.
									</p>
									<ul className="space-y-1 text-muted-foreground text-sm">
										<li>
											<code className="text-primary">mode="visible"</code> —
											renders normally, effects mount
										</li>
										<li>
											<code className="text-primary">mode="hidden"</code> —
											unmounts effects, defers updates, saves state
										</li>
									</ul>
									<div className="overflow-hidden rounded-xl border border-border/40">
										<div className="border-border/40 border-b bg-muted/40 px-3 py-2">
											<p className="font-medium text-xs">Activity usage</p>
										</div>
										<pre className="bg-muted/30 p-3 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
											{hl(`import { Activity } from 'react';

// Before: state lost on unmount
{isVisible && <Page />}

// After: state preserved when hidden
<Activity mode={isVisible ? 'visible' : 'hidden'}>
  <Page />
</Activity>

// Pre-render likely next route in background
<Activity mode={url === '/about' ? 'visible' : 'hidden'}>
  <About />
</Activity>`)}
										</pre>
									</div>
								</div>
							</div>

							{/* Also in development */}
							<div className="rounded-xl border border-border/40 bg-muted/30 p-4">
								<p className="mb-3 font-semibold text-sm">
									Also in development (from the same Labs post)
								</p>
								<div className="grid gap-2 text-muted-foreground text-xs sm:grid-cols-3">
									{[
										{
											label: "React Performance Tracks",
											desc: "Custom Chrome DevTools lanes — shipped in 19.2",
										},
										{
											label: "Compiler IDE Extension",
											desc: "LSP-powered hints, CodeLens for effect deps",
										},
										{
											label: "Automatic Effect Dependencies",
											desc: "Compiler infers & inserts deps — no array typing",
										},
										{
											label: "Fragment Refs",
											desc: "ref on <> pointing to multiple DOM nodes",
										},
										{
											label: "Gesture Animations",
											desc: "Swipe / continuous gesture view transitions",
										},
										{
											label: "Concurrent Stores",
											desc: "use(store) replacing useSyncExternalStore",
										},
									].map((f) => (
										<div
											className="space-y-0.5 rounded-xl border border-border/40 bg-background/50 p-2.5 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-md"
											key={f.label}
										>
											<p className="font-medium text-foreground">{f.label}</p>
											<p>{f.desc}</p>
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>

					<ViewTransitionConceptCard />
				</div>
			</section>

			<Separator />

			{/* ─── REACT 19.2 ────────────────────────────────────────────────── */}
			<section className="space-y-8" id="react-192">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						React 19.2{" "}
						<Badge className="align-middle text-sm" variant="secondary">
							October 1, 2025
						</Badge>
					</h2>
					<p className="mb-6 text-muted-foreground">
						The headline release of 2025: stable Activity, useEffectEvent,
						Performance Tracks, Partial Pre-rendering, and more.
					</p>

					<div className="space-y-6">
						{/* New React Features */}
						<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="text-lg">New React Features</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								{/* useEffectEvent */}
								<div className="space-y-3">
									<h3 className="flex items-center gap-2 font-semibold text-base">
										<span>🎯</span>
										<code>useEffectEvent</code>
									</h3>
									<p className="text-muted-foreground text-sm leading-relaxed">
										Separates "event-like" logic from synchronization logic
										inside Effects. An Effect Event always sees the latest props
										and state{" "}
										<strong className="text-foreground">
											without being listed as a dependency
										</strong>{" "}
										— preventing unwanted Effect re-runs.
									</p>
									<div className="overflow-hidden rounded-xl border border-border/40">
										<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
											<p className="font-medium text-sm">
												useEffectEvent — stable dep array without stale values
											</p>
										</div>
										<pre className="bg-muted/30 p-3 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
											{hl(`import { useEffect, useEffectEvent } from 'react';

function ChatRoom({ roomId, theme }) {
  // ✅ onConnected always sees latest theme
  //    but does NOT go in the dependency array
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on('connected', () => onConnected());
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ← only roomId, NOT theme
}`)}
										</pre>
									</div>
								</div>

								<Separator />

								{/* Activity stable */}
								<div className="space-y-3">
									<h3 className="flex items-center gap-2 font-semibold text-base">
										<span>🫧</span>
										<code>{"<Activity>"}</code> — now stable
									</h3>
									<p className="text-muted-foreground text-sm leading-relaxed">
										Officially stable in React 19.2 with two modes:{" "}
										<code className="rounded bg-muted px-1">
											mode=&quot;visible&quot;
										</code>{" "}
										(normal render, effects mount) and{" "}
										<code className="rounded bg-muted px-1">
											mode=&quot;hidden&quot;
										</code>{" "}
										(effects unmounted, updates deferred, state preserved). SSR
										optimization: hidden Activity is excluded from the initial
										HTML response and rendered client-side at low priority.
									</p>
								</div>

								<Separator />

								{/* cacheSignal */}
								<div className="space-y-3">
									<h3 className="flex items-center gap-2 font-semibold text-base">
										<span>🔔</span>
										<code>cacheSignal</code>{" "}
										<span className="font-normal text-muted-foreground text-xs">
											(Server Components only)
										</span>
									</h3>
									<p className="text-muted-foreground text-sm leading-relaxed">
										Lets you know when a{" "}
										<code className="rounded bg-muted px-1">cache()</code> entry
										lifetime is over so you can abort in-flight requests. Useful
										for passing to{" "}
										<code className="rounded bg-muted px-1">
											fetch(url, {"{ signal: cacheSignal() }"} )
										</code>{" "}
										inside cached Server Component functions.
									</p>
									<div className="overflow-hidden rounded-xl border border-border/40">
										<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
											<p className="font-medium text-sm">
												cacheSignal — abort stale cache requests
											</p>
										</div>
										<pre className="bg-muted/30 p-3 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
											{hl(`import { cache, cacheSignal } from 'react';

const fetchUser = cache(async (id) => {
  // Abort the request if the cache result is no longer used
  return fetch(\`/api/users/\${id}\`, { signal: cacheSignal() });
});`)}
										</pre>
									</div>
								</div>

								<Separator />

								{/* Performance Tracks */}
								<div className="space-y-3">
									<h3 className="flex items-center gap-2 font-semibold text-base">
										<span>📊</span>
										React Performance Tracks
									</h3>
									<p className="text-muted-foreground text-sm leading-relaxed">
										React 19.2 adds custom tracks to{" "}
										<strong className="text-foreground">
											Chrome DevTools Performance profiles
										</strong>
										. Two tracks are exposed:
									</p>
									<div className="grid gap-3 sm:grid-cols-2">
										{[
											{
												icon: "⚛",
												label: "Scheduler track",
												desc: "Shows work priorities (blocking, transition), events that triggered updates, and when renders happened. Visualizes how React splits work across priorities.",
											},
											{
												icon: "⚛",
												label: "Components track",
												desc: "Shows the component tree being rendered or running effects. Labels include Mount, Blocked, and Update to reveal time spent on each component.",
											},
										].map((t) => (
											<div
												className="space-y-1 rounded-xl border border-border/40 bg-background/50 p-3 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-md"
												key={t.label}
											>
												<p className="font-semibold text-sm">
													{t.icon} {t.label}
												</p>
												<p className="text-muted-foreground text-xs leading-relaxed">
													{t.desc}
												</p>
											</div>
										))}
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Interactive demos */}
						<UseEffectEventDemo />
						<ActivityDemo />

						{/* New DOM Features */}
						<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="text-lg">
									New React DOM Features
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-5">
								<div className="space-y-3">
									<h3 className="flex items-center gap-2 font-semibold text-base">
										<span>⚡</span>
										Partial Pre-rendering (PPR)
									</h3>
									<p className="text-muted-foreground text-sm leading-relaxed">
										Pre-render the static shell of an app ahead of time (serve
										from CDN), then{" "}
										<strong className="text-foreground">resume</strong>{" "}
										rendering dynamic content into it later. Uses a two-step
										API:
										<code className="mx-1 rounded bg-muted px-1">
											prerender()
										</code>{" "}
										with an AbortController, then{" "}
										<code className="rounded bg-muted px-1">resume()</code> /{" "}
										<code className="ml-1 rounded bg-muted px-1">
											resumeAndPrerender()
										</code>
										.
									</p>
									<div className="overflow-hidden rounded-xl border border-border/40">
										<div className="border-border/40 border-b bg-muted/40 px-4 py-2.5">
											<p className="font-medium text-sm">
												PPR — static shell + dynamic resume
											</p>
										</div>
										<pre className="bg-muted/30 p-3 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
											{hl(`// Step 1 — Pre-render static shell
const { prelude, postponed } = await prerender(<App />, {
  signal: controller.signal,
});
await savePostponedState(postponed);

// Step 2 — Resume with dynamic data (server-side)
const stream = await resume(<App />, await getPostponedState(req));

// Or for SSG: resume back to static HTML
const { prelude } = await resumeAndPrerender(<App />, postponedState);`)}
										</pre>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Notable Changes */}
						<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="text-lg">
									Notable Changes in 19.2
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid gap-3 sm:grid-cols-2">
									{[
										{
											icon: "🔄",
											title: "Batching SSR Suspense reveals",
											desc: "Suspense boundaries now batch content reveals during streaming SSR for a short time, aligning with client-render behavior and enabling smoother ViewTransition animations.",
										},
										{
											icon: "🌊",
											title: "Web Streams for Node.js",
											desc: "renderToReadableStream and prerender now available for Node.js. New resume / resumeAndPrerender APIs for Web Streams. (Still recommend Node Streams for performance.)",
										},
										{
											icon: "🔧",
											title: "eslint-plugin-react-hooks v6",
											desc: "Flat config by default in the recommended preset. Opt-in compiler-powered rules. Legacy config users: switch to recommended-legacy.",
										},
										{
											icon: "🆔",
											title: "useId prefix updated to _r_",
											desc: "Changed from «r» (19.1) to _r_ so generated IDs are valid for view-transition-name and XML 1.0 names.",
										},
									].map((item) => (
										<div
											className="rounded-xl border border-border/40 bg-background/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-md"
											key={item.title}
										>
											<div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-lg">
												{item.icon}
											</div>
											<p className="mb-1 font-semibold text-sm">{item.title}</p>
											<p className="text-muted-foreground text-xs leading-relaxed">
												{item.desc}
											</p>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<Separator />

			{/* ─── REACT COMPILER v1.0 ───────────────────────────────────────── */}
			<section className="space-y-8" id="react-compiler">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						React Compiler v1.0 🤖{" "}
						<Badge className="align-middle text-sm" variant="secondary">
							October 7, 2025
						</Badge>
					</h2>
					<p className="mb-6 text-muted-foreground">
						A build-time tool that automatically memoizes your React components
						and hooks — already installed in this project.
					</p>

					<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
						<CardContent className="space-y-6 pt-6">
							<div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-sm">
								<strong className="text-foreground">
									✅ Already active here:{" "}
								</strong>
								<code className="rounded bg-muted px-1">
									babel-plugin-react-compiler@^1.0.0
								</code>{" "}
								is installed in this project (see{" "}
								<code className="rounded bg-muted px-1">package.json</code>).
								Every component and hook in this app is already automatically
								memoized.
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								<div className="overflow-hidden rounded-xl border border-destructive/20">
									<div className="border-destructive/20 border-b bg-destructive/5 px-4 py-2.5">
										<p className="font-medium text-destructive text-sm">
											❌ Before — manual memoization
										</p>
									</div>
									<pre className="bg-muted/30 p-3 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
										{hl(`// You had to remember to memoize
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

const MemoChild = React.memo(({ data }) => (
  <div>{data}</div>
));`)}
									</pre>
								</div>

								<div className="overflow-hidden rounded-xl border border-green-500/20">
									<div className="border-green-500/20 border-b bg-green-500/5 px-4 py-2.5">
										<p className="font-medium text-green-600 text-sm dark:text-green-400">
											✅ After — compiler handles it
										</p>
									</div>
									<pre className="bg-muted/30 p-3 font-mono text-xs leading-relaxed dark:bg-zinc-900/40">
										{hl(`// Write plain code. Compiler memoizes
// exactly what needs memoizing — and
// can memoize after early returns which
// useMemo/useCallback cannot do.

const expensiveValue = computeExpensiveValue(a, b);

const handleClick = () => {
  doSomething(a, b);
};

// No React.memo wrapper needed
function Child({ data }) {
  return <div>{data}</div>;
}`)}
									</pre>
								</div>
							</div>

							<div className="grid gap-4 sm:grid-cols-3">
								{[
									{
										icon: "⚡",
										title: "12% faster loads",
										desc: "Meta Quest Store saw up to 12% improvement in initial load and cross-page navigations, and 2.5× faster interactions.",
									},
									{
										icon: "🔍",
										title: "Compiler-powered linting",
										desc: "New lint rules in eslint-plugin-react-hooks ship with the compiler: set-state-in-render, set-state-in-effect, refs safety checks.",
									},
									{
										icon: "🔄",
										title: "Backwards compatible",
										desc: "Works with React 17+. Add react-compiler-runtime as a dependency and set a target in compiler config for pre-19 projects.",
									},
									{
										icon: "🏗️",
										title: "Default in new projects",
										desc: "Partnered with Expo (SDK 54+), Vite, and Next.js — enabled by default in create-expo-app, create-vite, create-next-app.",
									},
									{
										icon: "⚙️",
										title: "SWC support (experimental)",
										desc: "Experimental SWC plugin dramatically speeds up Next.js builds when React Compiler is enabled. Requires Next.js 15.3.1+.",
									},
									{
										icon: "🔒",
										title: "Pin exact version",
										desc: "If test coverage is limited, pin babel-plugin-react-compiler to an exact version (1.0.0) rather than a semver range to avoid unexpected memoization changes.",
									},
								].map((item) => (
									<div
										className="space-y-1 rounded-xl border border-border/40 bg-background/50 p-3 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-md"
										key={item.title}
									>
										<p className="font-semibold text-sm">
											{item.icon} {item.title}
										</p>
										<p className="text-muted-foreground text-xs leading-relaxed">
											{item.desc}
										</p>
									</div>
								))}
							</div>

							<div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm">
								<strong>
									📝 What to do with existing useMemo/useCallback?
								</strong>
								<ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
									<li>
										Leave existing memoization in place for now — removing it
										can change compilation output.
									</li>
									<li>
										For new code, omit manual memoization and let the compiler
										handle it.
									</li>
									<li>
										Continue using{" "}
										<code className="rounded bg-muted px-1">useMemo</code> /{" "}
										<code className="ml-1 rounded bg-muted px-1">
											useCallback
										</code>{" "}
										as an escape hatch when you need precise control (e.g., as
										effect dependencies).
									</li>
								</ul>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<Separator />

			{/* ─── REACT FOUNDATION ──────────────────────────────────────────── */}
			<section className="space-y-8" id="react-foundation">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						The React Foundation 🏛️{" "}
						<Badge className="align-middle text-sm" variant="secondary">
							October 7, 2025
						</Badge>
					</h2>
					<p className="mb-6 text-muted-foreground">
						An independent non-profit to steward React&apos;s long-term open
						source development beyond Meta.
					</p>

					<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
						<CardContent className="space-y-5 pt-6">
							<p className="text-muted-foreground leading-relaxed">
								Announced during React Conf 2025, the{" "}
								<strong className="text-foreground">React Foundation</strong> is
								a new governance structure that separates React&apos;s open
								source stewardship from Meta. Meta contributed the React
								trademark and brand assets to the Foundation.
							</p>

							<div className="grid gap-3 sm:grid-cols-3">
								{[
									{
										icon: "🔓",
										title: "Open source stewardship",
										desc: "Independent governance ensures React's development continues to serve the wider community, not just Meta's internal needs.",
									},
									{
										icon: "🤝",
										title: "Trademark & brand",
										desc: "Meta has contributed the React trademark and brand assets to the Foundation, formalizing community ownership.",
									},
									{
										icon: "🌍",
										title: "Community health",
										desc: "The Foundation's mission includes long-term community sustainability, contributor support, and ecosystem coordination.",
									},
								].map((item) => (
									<div
										className="space-y-1 rounded-xl border border-border/40 bg-background/50 p-3 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-md"
										key={item.title}
									>
										<span className="text-2xl">{item.icon}</span>
										<p className="mt-1 font-semibold text-sm">{item.title}</p>
										<p className="text-muted-foreground text-xs leading-relaxed">
											{item.desc}
										</p>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<Separator />

			{/* ─── SECURITY ADVISORIES ───────────────────────────────────────── */}
			<section className="space-y-8" id="security">
				<div>
					<h2 className="mb-2 font-semibold text-3xl tracking-tight">
						Security Advisories 🔒{" "}
						<Badge className="bg-red-500/10 align-middle text-red-600 text-sm dark:text-red-400">
							Dec 2025 – Jan 2026
						</Badge>
					</h2>
					<p className="mb-6 text-muted-foreground">
						A series of vulnerabilities were disclosed and patched in
						react-server-dom-* packages. If you use RSC, update now.
					</p>

					<div className="space-y-4">
						{/* Critical CVE */}
						<div className="space-y-4 rounded-xl border border-red-500/30 bg-red-500/5 p-6">
							<div className="flex items-start gap-3">
								<span className="text-2xl">🚨</span>
								<div>
									<p className="font-bold text-lg text-red-600 dark:text-red-400">
										CVE-2025-55182 — CVSS 10.0 (Critical)
									</p>
									<p className="mt-1 text-muted-foreground text-sm">
										Unauthenticated Remote Code Execution via React Server
										Functions. Disclosed December 3, 2025.
									</p>
								</div>
							</div>

							<p className="text-muted-foreground text-sm leading-relaxed">
								An unauthenticated attacker could craft a malicious HTTP request
								to any Server Function endpoint. When deserialized by React, it
								achieves{" "}
								<strong className="text-foreground">
									remote code execution
								</strong>{" "}
								on the server. Apps that use React Server Components or Server
								Functions are affected, even if they don&apos;t define explicit
								endpoints. Reported by Lachlan Davidson via Meta Bug Bounty.
							</p>

							<div className="grid gap-3 text-sm sm:grid-cols-3">
								{[
									{
										label: "Affected packages",
										value:
											"react-server-dom-webpack, react-server-dom-parcel, react-server-dom-turbopack",
									},
									{
										label: "Affected versions",
										value: "19.0.0, 19.1.0, 19.1.1, 19.2.0",
									},
									{
										label: "Fixed in",
										value: "v19.0.1, v19.1.2, v19.2.1+",
									},
								].map((row) => (
									<div
										className="rounded-xl border border-red-500/20 bg-background/60 p-3"
										key={row.label}
									>
										<p className="mb-1 font-semibold text-red-600 text-xs dark:text-red-400">
											{row.label}
										</p>
										<p className="text-muted-foreground text-xs">{row.value}</p>
									</div>
								))}
							</div>
						</div>

						{/* Follow-up CVEs */}
						<div className="grid gap-3 sm:grid-cols-3">
							{[
								{
									id: "CVE-2025-55184",
									severity: "High (CVSS 7.5)",
									type: "Denial of Service",
									date: "Dec 11, 2025",
									fix: "Same v19.x.1+ patch releases",
								},
								{
									id: "CVE-2025-55183",
									severity: "Medium (CVSS 5.3)",
									type: "Source Code Exposure",
									date: "Dec 11, 2025",
									fix: "Same v19.x.1+ patch releases",
								},
								{
									id: "CVE-2026-23864",
									severity: "High (CVSS 7.5)",
									type: "Denial of Service",
									date: "Jan 26, 2026",
									fix: "Latest react-server-dom-* packages",
								},
							].map((cve) => (
								<div
									className="space-y-2 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 transition-all duration-300 hover:border-orange-500/40 hover:shadow-md"
									key={cve.id}
								>
									<p className="font-semibold text-sm">{cve.id}</p>
									<p className="text-orange-600 text-xs dark:text-orange-400">
										{cve.severity}
									</p>
									<p className="text-muted-foreground text-xs">{cve.type}</p>
									<p className="text-muted-foreground text-xs">{cve.date}</p>
									<p className="font-medium text-foreground text-xs">
										Fix: {cve.fix}
									</p>
								</div>
							))}
						</div>

						{/* Affected frameworks */}
						<Card className="border-border/40 bg-card/50 backdrop-blur-sm">
							<CardContent className="space-y-4 pt-5">
								<p className="font-semibold text-sm">
									Affected frameworks — update commands
								</p>
								<div className="grid gap-3 sm:grid-cols-2">
									{[
										{
											name: "Next.js",
											cmd: "npm install next@latest",
											note: "See nextjs.org/blog for your release line",
										},
										{
											name: "React Router (RSC)",
											cmd: "npm install react@latest react-dom@latest react-server-dom-webpack@latest",
											note: "Only if using unstable RSC APIs",
										},
										{
											name: "Waku",
											cmd: "npm install waku@latest react@latest react-dom@latest react-server-dom-webpack@latest",
											note: "",
										},
										{
											name: "Expo",
											cmd: "See expo.dev/changelog",
											note: "Mitigation guide published",
										},
									].map((fw) => (
										<div
											className="space-y-1 rounded-xl border border-border/40 bg-background/50 p-3 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-md"
											key={fw.name}
										>
											<p className="font-semibold text-sm">{fw.name}</p>
											<pre className="whitespace-pre-wrap font-mono text-muted-foreground text-xs">
												{fw.cmd}
											</pre>
											{fw.note && (
												<p className="text-muted-foreground text-xs">
													{fw.note}
												</p>
											)}
										</div>
									))}
								</div>

								<div className="rounded-xl border border-border/40 bg-muted/30 p-3 text-muted-foreground text-xs">
									<strong className="text-foreground">
										Not using RSC / Server Functions?
									</strong>{" "}
									Apps that do not use React Server Components, Server
									Functions, or any of the affected server-dom-* packages are{" "}
									<strong className="text-foreground">not affected</strong>.
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* ─── FOOTER ────────────────────────────────────────────────────── */}
			<div className="space-y-4 rounded-xl border border-primary/20 bg-primary/5 p-6">
				<div className="space-y-2 text-center">
					<p className="font-bold text-xl">React 19.2 — Latest stable</p>
					<p className="text-muted-foreground text-sm">
						Released October 1, 2025 ·{" "}
						<strong className="text-foreground">
							React Compiler v1.0 is installed in this project
						</strong>
					</p>
				</div>

				<div className="grid gap-3 text-center text-sm sm:grid-cols-3">
					{[
						{
							label: "Install latest",
							code: "npm install react@latest react-dom@latest",
						},
						{
							label: "Add Compiler",
							code: "npm install -D --save-exact babel-plugin-react-compiler@latest",
						},
						{
							label: "Try canary",
							code: "npm install react@canary react-dom@canary",
						},
					].map((item) => (
						<div
							className="rounded-xl border border-border/40 bg-background/60 p-3 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-md"
							key={item.label}
						>
							<p className="mb-1 font-semibold text-foreground">{item.label}</p>
							<code className="rounded bg-muted px-2 py-0.5 text-muted-foreground text-xs">
								{item.code}
							</code>
						</div>
					))}
				</div>

				<p className="text-center text-muted-foreground text-xs">
					See the{" "}
					<a
						className="text-primary underline-offset-4 hover:underline"
						href="https://react.dev/blog/2024/04/25/react-19-upgrade-guide"
						rel="noopener noreferrer"
						target="_blank"
					>
						Upgrade Guide
					</a>{" "}
					·{" "}
					<a
						className="text-primary underline-offset-4 hover:underline"
						href="https://react.dev/blog/2025/10/01/react-19-2"
						rel="noopener noreferrer"
						target="_blank"
					>
						React 19.2 Blog Post
					</a>{" "}
					·{" "}
					<a
						className="text-primary underline-offset-4 hover:underline"
						href="https://react.dev/learn/react-compiler"
						rel="noopener noreferrer"
						target="_blank"
					>
						React Compiler Docs
					</a>
				</p>
			</div>
		</div>
	);
}
