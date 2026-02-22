"use client";

import { useState } from "react";

type Demo = "navigation" | "shared" | "list";

const DEMO_CODE: Record<Demo, { label: string; code: string; desc: string }> = {
	navigation: {
		label: "Page Navigation",
		desc: "Wrap route content in <ViewTransition> to get a default cross-fade on navigation.",
		code: `import { ViewTransition } from 'react';

// Wrap the page that changes on navigation
export default function App() {
  const { url } = useRouter();

  return (
    // "WHAT" to animate
    <ViewTransition key={url}>
      {url === '/' ? <Home /> : <Details />}
    </ViewTransition>
    // "WHEN": startTransition triggers the animation
  );
}`,
	},
	shared: {
		label: "Shared Element",
		desc: "Give two elements the same name and React animates the transition between them automatically.",
		code: `import { ViewTransition } from 'react';

// On the list page
function Thumbnail({ video }) {
  return (
    <ViewTransition name={\`video-\${video.id}\`}>
      <img src={video.thumbnail} />
    </ViewTransition>
  );
}

// On the detail page — same name = shared element transition
function DetailHero({ video }) {
  return (
    <ViewTransition name={\`video-\${video.id}\`}>
      <img src={video.thumbnail} className="hero" />
    </ViewTransition>
  );
}`,
	},
	list: {
		label: "Animated List",
		desc: "Wrap list items with <ViewTransition> and trigger via useDeferredValue to animate reordering.",
		code: `import { ViewTransition, useDeferredValue, useState } from 'react';

function SearchList({ items }) {
  const [query, setQuery] = useState('');
  // "WHEN": useDeferredValue triggers View Transition
  const deferred = useDeferredValue(query);
  const filtered = items.filter(i => i.includes(deferred));

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {filtered.map(item => (
        // "WHAT": each item animates on reorder
        <ViewTransition key={item}>
          <div>{item}</div>
        </ViewTransition>
      ))}
    </div>
  );
}`,
	},
};

export function ViewTransitionConceptCard() {
	const [active, setActive] = useState<Demo>("navigation");
	const demo = DEMO_CODE[active];

	return (
		<div className="space-y-5 rounded-xl border border-border bg-card p-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="text-xl">✨</span>
					<h3 className="font-semibold text-base">
						<code>{"<ViewTransition>"}</code> Patterns
					</h3>
				</div>
				<span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-medium text-amber-600 text-xs dark:text-amber-400">
					canary
				</span>
			</div>

			<p className="text-muted-foreground text-sm leading-relaxed">
				Three concepts control View Transitions:{" "}
				<strong className="text-foreground">"what"</strong> (wrap with{" "}
				<code className="text-primary">{"<ViewTransition>"}</code>),{" "}
				<strong className="text-foreground">"when"</strong> (
				<code>startTransition</code>, <code>useDeferredValue</code>, or{" "}
				<code>{"<Suspense>"}</code>), and{" "}
				<strong className="text-foreground">"how"</strong> (CSS{" "}
				<code>::view-transition-*</code> pseudo-selectors).
			</p>

			{/* Demo tabs */}
			<div className="flex gap-1 rounded-lg bg-muted/50 p-1">
				{(Object.keys(DEMO_CODE) as Demo[]).map((key) => (
					<button
						className={`flex-1 rounded-md px-2 py-1.5 font-medium text-xs transition-colors ${
							active === key
								? "bg-background text-foreground shadow-sm"
								: "text-muted-foreground hover:text-foreground"
						}`}
						key={key}
						onClick={() => setActive(key)}
						type="button"
					>
						{DEMO_CODE[key].label}
					</button>
				))}
			</div>

			{/* Description */}
			<p className="text-muted-foreground text-sm">{demo.desc}</p>

			{/* Code block */}
			<div className="overflow-x-auto rounded-lg bg-muted/50 p-4">
				<pre className="whitespace-pre font-mono text-foreground text-xs leading-relaxed">
					{demo.code}
				</pre>
			</div>

			{/* Triggers reference */}
			<div className="grid grid-cols-3 gap-2 text-xs">
				{[
					{ trigger: "startTransition", desc: "Navigation, state toggle" },
					{ trigger: "useDeferredValue", desc: "Live search, list filter" },
					{ trigger: "<Suspense>", desc: "Fallback → content swap" },
				].map((t) => (
					<div
						className="space-y-1 rounded-lg border border-border/50 bg-muted/30 p-2.5"
						key={t.trigger}
					>
						<code className="font-mono text-primary">{t.trigger}</code>
						<p className="text-muted-foreground">{t.desc}</p>
					</div>
				))}
			</div>

			<p className="text-muted-foreground text-xs">
				Available in <code>react@canary</code>. Next.js 16 Canary supports
				ViewTransition via{" "}
				<code className="text-primary">@vitejs/plugin-rsc</code> or the canary
				channel.
			</p>
		</div>
	);
}
