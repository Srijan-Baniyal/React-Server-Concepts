import { BlogCard } from "./BlogCard";

interface BlogPost {
	author: string;
	date: string;
	description: string;
	slug: string;
	tags: string[];
	title: string;
}

interface BlogListProps {
	posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
	return (
		<div className="mx-auto max-w-6xl">
			<header
				className="mb-12"
				style={{ viewTransitionName: "blog-list-header" }}
			>
				<h1 className="mb-4 font-bold text-4xl md:text-5xl">Blog Posts</h1>
				<p className="text-gray-600 text-lg dark:text-gray-400">
					Exploring React Server Components, Next.js, and modern web development
				</p>
			</header>

			<div
				className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
				style={{ viewTransitionName: "blog-list-grid" }}
			>
				{posts.map((post) => (
					<BlogCard
						date={post.date}
						description={post.description}
						key={post.slug}
						slug={post.slug}
						tags={post.tags}
						title={post.title}
					/>
				))}
			</div>
		</div>
	);
}
