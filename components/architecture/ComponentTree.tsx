import { ComponentTreeFlow } from "@/components/flow";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export function ComponentTree() {
	return (
		<section className="space-y-8" id="component-tree">
			<div>
				<h2 className="mb-1 font-semibold text-3xl">
					Component Tree & the Module Boundary 🌳
				</h2>
				<p className="text-muted-foreground">
					<code className="rounded bg-muted px-1">"use client"</code> doesn't
					just mark one component — it carves a{" "}
					<strong>module graph boundary</strong> that all direct imports
					inherit. Understanding this is essential to keeping Server Components
					on the server.
				</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="text-base">Boundary Propagation</CardTitle>
						<CardDescription>
							"use client" infects the entire module subtree
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ComponentTreeFlow />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-base">
							Passing SC as children to CC
						</CardTitle>
						<CardDescription>
							The composition pattern that preserves Server rendering
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						<CodeBlock
							code={`// modal.tsx  ("use client")
"use client";
export function Modal({ children }) {
  const [open, setOpen] = useState(false);
  return open ? <div>{children}</div> : null;
}

// page.tsx  (Server Component)
import { Modal } from "./modal";
import { HeavyServerContent } from "./heavy"; // Server!
import { hl } from "@/lib/Hl";

export default function Page() {
  return (
    <Modal>
      {/* Resolved on the server — never becomes
          client JS even though Modal is Client ✓ */}
      <HeavyServerContent />
    </Modal>
  );
}`}
							variant="muted"
						/>
						<p className="text-muted-foreground text-xs">
							<code className="rounded bg-muted px-1">HeavyServerContent</code>{" "}
							is serialised into the RSC payload before Modal ever runs in the
							browser — it remains server-only code.
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Why the boundary matters */}
			<Card>
				<CardHeader>
					<CardTitle>Why the Boundary Matters — A Concrete Example</CardTitle>
					<CardDescription>
						The same component can accidentally become a Client Component
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<p className="font-medium text-destructive text-sm">
								❌ Anti-pattern: importing SC inside CC
							</p>
							<CodeBlock
								code={`// ClientNav.tsx
"use client";
// ✗ HeavyChart is a Server Component.
// Importing it here "promotes" it to Client,
// pulling the entire chart library into the
// browser bundle!
import { HeavyChart } from "./HeavyChart";

export function ClientNav() {
  return <><HeavyChart /></>;
}`}
								variant="muted"
							/>
						</div>
						<div className="space-y-2">
							<p className="font-medium text-green-600 text-sm">
								✅ Fix: pass as a prop from a Server parent
							</p>
							<CodeBlock
								code={`// page.tsx (Server Component)
import { ClientNav } from "./ClientNav";
import { HeavyChart } from "./HeavyChart";

export default function Page() {
  // HeavyChart is owned by Server scope ✓
  return (
    <ClientNav chart={<HeavyChart />} />
  );
}

// ClientNav.tsx
"use client";
export function ClientNav({ chart }) {
  return <>{chart}</>; // renders the slot
}`}
								variant="muted"
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
