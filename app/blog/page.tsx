"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

// Mantine RTE and Tiptap imports
const RichTextEditor = dynamic(
  () => import('@mantine/tiptap').then(mod => mod.RichTextEditor),
  { ssr: false }
);
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// Example initial post data
const initialPosts = [
  {
    title: "How to Prepare for SBI PO 2025",
    slug: "sbi-po-2025-preparation",
    excerpt: "Learn the best strategies and resources to crack SBI PO 2025 exams.",
    content:
      `<h2>Introduction</h2><p>SBI PO is a top banking exam...</p><table><thead><tr><th>Subject</th><th>Time</th></tr></thead><tbody><tr><td>Quant</td><td>40 mins</td></tr><tr><td>English</td><td>30 mins</td></tr></tbody></table><p>Practice daily and follow a routine.</p>`,
  },
];

function BlogPostContent({ content }: { content: string }) {
  return (
    <div
      className="prose lg:prose-lg max-w-none prose-img:rounded-lg prose-table:border prose-th:p-2 prose-td:p-2 prose-td:border"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default function Blog() {
  const [posts, setPosts] = useState(initialPosts);
  const [view, setView] = useState<"list" | "single" | "admin">("list");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  // Form state for admin
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  const selectedPost = posts.find((p) => p.slug === selectedSlug);

  const handleSubmit = () => {
    if (!title || !slug || !editor) return;
    setPosts([
      ...posts,
      { title, slug, excerpt, content: editor.getHTML() },
    ]);
    setTitle("");
    setSlug("");
    setExcerpt("");
    editor.commands.setContent("");
    setView("list");
  };

  if (view === "admin") {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <button className="mb-4 text-blue-600 underline" onClick={() => setView("list")}>← Back to Blog List</button>
        <h1 className="text-2xl font-bold mb-4">Create Blog Post</h1>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 mb-2"
        />
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full border p-2 mb-2"
        />
        <textarea
          placeholder="Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full border p-2 mb-2"
        />
        <div className="mb-4">
          {/* @ts-ignore */}
          <RichTextEditor editor={editor} />
        </div>
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    );
  }

  if (view === "single" && selectedPost) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <button className="mb-5 text-blue-600 underline" onClick={() => setView("list")}>← Back to Blog List</button>
        <h1 className="text-3xl font-bold mb-6">{selectedPost.title}</h1>
        <BlogPostContent content={selectedPost.content} />
      </main>
    );
  }

  // Default: Blog List
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Latest Blog Posts</h1>
        <button
          onClick={() => setView("admin")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + New Post
        </button>
      </div>
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="p-4 border rounded-xl hover:bg-gray-50 transition cursor-pointer"
            onClick={() => {
              setSelectedSlug(post.slug);
              setView("single");
            }}
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-600">{post.excerpt}</p>
          </div>
        ))}
        {posts.length === 0 && (
          <div>No posts yet. Click "+ New Post" to add one.</div>
        )}
      </div>
    </main>
  );
}