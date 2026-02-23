interface BlogContentProps {
	author: string;
	content: string;
	date: string;
	slug: string;
	tags: string[];
	title: string;
}

export function BlogContent({
	slug,
	title,
	date,
	content,
	tags,
	author,
}: BlogContentProps) {
	return (
		<article
			className="mx-auto max-w-4xl"
			style={{
				viewTransitionName: `blog-card-${slug}`,
			}}
		>
			<header className="mb-8 border-gray-200 border-b pb-8 dark:border-gray-800">
				<h1
					className="mb-4 font-bold text-4xl md:text-5xl"
					style={{
						viewTransitionName: `blog-title-${slug}`,
					}}
				>
					{title}
				</h1>

				<div
					className="mb-4 flex items-center gap-4 text-gray-600 dark:text-gray-400"
					style={{ viewTransitionName: `blog-meta-${slug}` }}
				>
					<time className="text-sm" dateTime={date}>
						{new Date(date).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</time>
					<span className="text-sm">•</span>
					<span className="text-sm">By {author}</span>
				</div>

				<div
					className="flex flex-wrap gap-2"
					style={{ viewTransitionName: `blog-tags-${slug}` }}
				>
					{tags.map((tag) => (
						<span
							className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800 text-xs dark:bg-blue-900/30 dark:text-blue-300"
							key={tag}
						>
							{tag}
						</span>
					))}
				</div>
			</header>

			<div
				className="prose prose-lg dark:prose-invert max-w-none"
				dangerouslySetInnerHTML={{ __html: content }}
				style={{ viewTransitionName: "article-body" }}
			/>
		</article>
	);
}
