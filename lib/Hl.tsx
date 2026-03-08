import type { ReactNode } from "react";

/**
 * Minimal regex-based TSX syntax highlighter for inline code panels.
 * Colours strings, comments, keywords, JSX components and HTML tags.
 */
export function hl(code: string): ReactNode {
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
