import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogContent } from "@/components/viewtran/BlogContent";
import { getAllBlogSlugs, getBlogPost } from "@/lib/BlogApi";
import { SuspenseProvider } from "@/providers/SuspenseProvider";

interface PageProps {
	params: Promise<{
		slug: string;
	}>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
	const slugs = await getAllBlogSlugs();
	return slugs.map((slug) => ({
		slug,
	}));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: PageProps) {
	const { slug } = await params;
	const post = await getBlogPost(slug);

	if (!post) {
		return {
			title: "Post Not Found",
		};
	}

	return {
		title: post.title,
		description: post.description,
	};
}

async function BlogPostContent({ slug }: { slug: string }) {
	const post = await getBlogPost(slug);

	if (!post) {
		notFound();
	}

	return (
		<BlogContent
			author={post.author}
			content={post.content}
			date={post.date}
			slug={post.slug}
			tags={post.tags}
			title={post.title}
		/>
	);
}

export default async function BlogPostPage({ params }: PageProps) {
	const { slug } = await params;

	return (
		<div className="container mx-auto px-4 py-8">
			<Link
				className="mb-8 inline-flex items-center gap-2 text-blue-600 transition-all hover:gap-3 hover:underline dark:text-blue-400"
				href="/about"
				style={{ viewTransitionName: "back-btn" }}
			>
				<span className="transition-transform">←</span>
				<span>Back to all posts</span>
			</Link>

			<SuspenseProvider
				fallback={
					<div className="mx-auto max-w-4xl">
						<div className="mb-8 border-gray-200 border-b pb-8 dark:border-gray-800">
							<div className="mb-4 h-12 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
							<div className="h-4 w-1/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
						</div>
					</div>
				}
			>
				<BlogPostContent slug={slug} />
			</SuspenseProvider>
		</div>
	);
}
