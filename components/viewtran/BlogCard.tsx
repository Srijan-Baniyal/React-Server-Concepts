import Link from "next/link";

interface BlogCardProps {
	date: string;
	description: string;
	slug: string;
	tags: string[];
	title: string;
}

export function BlogCard({
	slug,
	title,
	description,
	date,
	tags,
}: BlogCardProps) {
	return (
		<Link
			className="group block"
			href={`/about/${slug}`}
			style={{
				viewTransitionName: `blog-card-${slug}`,
			}}
		>
			<article className="rounded-lg border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl dark:border-gray-800 dark:hover:border-gray-700">
				<div
					className="mb-2 flex items-center gap-2 text-gray-500 text-sm dark:text-gray-400"
					style={{ viewTransitionName: `blog-meta-${slug}` }}
				>
					<time dateTime={date}>
						{new Date(date).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</time>
				</div>

				<h2
					className="mb-3 font-bold text-2xl transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400"
					style={{
						viewTransitionName: `blog-title-${slug}`,
					}}
				>
					{title}
				</h2>

				<p
					className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-300"
					style={{ viewTransitionName: `blog-description-${slug}` }}
				>
					{description}
				</p>

				<div
					className="flex flex-wrap gap-2"
					style={{ viewTransitionName: `blog-tags-${slug}` }}
				>
					{tags.map((tag) => (
						<span
							className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800 text-xs transition-transform hover:scale-110 dark:bg-blue-900/30 dark:text-blue-300"
							key={tag}
						>
							{tag}
						</span>
					))}
				</div>
			</article>
		</Link>
	);
}
