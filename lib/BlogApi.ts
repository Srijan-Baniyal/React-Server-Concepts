import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

export interface BlogPost {
	author: string;
	content: string;
	date: string;
	description: string;
	slug: string;
	tags: string[];
	title: string;
}

export interface BlogMetadata {
	author: string;
	date: string;
	description: string;
	slug: string;
	tags: string[];
	title: string;
}

const BLOG_CONTENT_DIR = join(process.cwd(), "content/blog");

const FRONTMATTER_REGEX = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
const QUOTE_REGEX = /^["']|["']$/g;
const MD_EXTENSION_REGEX = /\.md$/;

function parseFrontMatter(fileContent: string): {
	metadata: Record<string, string | string[]>;
	content: string;
} {
	const match = fileContent.match(FRONTMATTER_REGEX);

	if (!match) {
		return { metadata: {}, content: fileContent };
	}

	const [, frontmatter, content] = match;
	const metadata: Record<string, string | string[]> = {};

	// Parse YAML-like frontmatter
	for (const line of frontmatter.split("\n")) {
		const colonIndex = line.indexOf(":");
		if (colonIndex > 0) {
			const key = line.slice(0, colonIndex).trim();
			let value: string | string[] = line.slice(colonIndex + 1).trim();
			value = value.replace(QUOTE_REGEX, "");
			if (value.startsWith("[") && value.endsWith("]")) {
				value = value
					.slice(1, -1)
					.split(",")
					.map((item) => item.trim().replace(QUOTE_REGEX, ""));
			}

			metadata[key] = value;
		}
	}

	return { metadata, content };
}

function markdownToHtml(markdown: string): string {
	let html = markdown;

	// Headers
	html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
	html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
	html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");

	// Bold
	html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

	// Italic
	html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

	// Code blocks
	html = html.replace(
		/```(\w+)?\n([\s\S]*?)```/g,
		(_, lang, code) =>
			`<pre><code class="language-${lang || "plaintext"}">${code.trim()}</code></pre>`
	);

	// Inline code
	html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

	// Links
	html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

	// Lists (unordered)
	html = html.replace(/^- (.*$)/gm, "<li>$1</li>");
	html = html.replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>");

	// Lists (ordered)
	html = html.replace(/^\d+\. (.*$)/gm, "<li>$1</li>");

	// Paragraphs
	html = html.replace(/\n\n/g, "</p><p>");
	html = `<p>${html}</p>`;

	// Clean up
	html = html.replace(/<p><h/g, "<h");
	html = html.replace(/<\/h(\d)><\/p>/g, "</h$1>");
	html = html.replace(/<p><pre>/g, "<pre>");
	html = html.replace(/<\/pre><\/p>/g, "</pre>");
	html = html.replace(/<p><ul>/g, "<ul>");
	html = html.replace(/<\/ul><\/p>/g, "</ul>");
	html = html.replace(/<p><\/p>/g, "");

	return html;
}

export async function getAllBlogPosts(): Promise<BlogMetadata[]> {
	try {
		const allFiles = await readdir(BLOG_CONTENT_DIR);
		const files = allFiles.filter((f) => f.endsWith(".md"));

		const posts = await Promise.all(
			files.map(async (filename) => {
				const slug = filename.replace(MD_EXTENSION_REGEX, "");
				const fullPath = join(BLOG_CONTENT_DIR, filename);
				const fileContent = await readFile(fullPath, "utf-8");
				const { metadata } = parseFrontMatter(fileContent);

				return {
					slug,
					title: (metadata.title as string) || "Untitled",
					date: (metadata.date as string) || new Date().toISOString(),
					description: (metadata.description as string) || "",
					author: (metadata.author as string) || "Anonymous",
					tags: Array.isArray(metadata.tags) ? metadata.tags : [],
				};
			})
		);

		// Sort by date (newest first)
		return posts.sort(
			(a: BlogMetadata, b: BlogMetadata) =>
				new Date(b.date).getTime() - new Date(a.date).getTime()
		);
	} catch (error) {
		console.error("Error reading blog posts:", error);
		return [];
	}
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
	try {
		const filePath = join(BLOG_CONTENT_DIR, `${slug}.md`);
		const fileContent = await readFile(filePath, "utf-8");
		const { metadata, content } = parseFrontMatter(fileContent);
		const htmlContent = markdownToHtml(content);

		return {
			slug,
			title: (metadata.title as string) || "Untitled",
			date: (metadata.date as string) || new Date().toISOString(),
			description: (metadata.description as string) || "",
			author: (metadata.author as string) || "Anonymous",
			tags: Array.isArray(metadata.tags) ? metadata.tags : [],
			content: htmlContent,
		};
	} catch (error) {
		console.error(`Error reading blog post ${slug}:`, error);
		return null;
	}
}

/**
 * Get all blog post slugs for static generation
 */
export async function getAllBlogSlugs(): Promise<string[]> {
	try {
		const allFiles = await readdir(BLOG_CONTENT_DIR);
		return allFiles
			.filter((f) => f.endsWith(".md"))
			.map((f) => f.replace(MD_EXTENSION_REGEX, ""));
	} catch (error) {
		console.error("Error reading blog slugs:", error);
		return [];
	}
}
