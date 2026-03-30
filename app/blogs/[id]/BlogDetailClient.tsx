'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Eye, Tag, ArrowLeft, Share2, Check, BookOpen } from 'lucide-react';
import CommentSection from './CommentSection';
import RelatedPosts from './RelatedPosts';

interface Post {
  id: string;
  title: string;
  summary?: string;
  categoryName?: string;
  category?: string;
  contentBlocks?: any[];
  mainImageUrl?: string;
  readTime?: number;
  views?: number;
  publishedAt?: any;
  author?: { name: string; avatar?: string; bio?: string };
  tags?: string[];
  featured?: boolean;
  trending?: boolean;
}

function formatDate(ts: any): string {
  if (!ts) return '';
  const d = ts?.toDate ? ts.toDate() : ts?.seconds ? new Date(ts.seconds * 1000) : new Date(ts);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/* ── Content renderer ── */
function ContentBlock({ block, index }: { block: any; index: number }) {
  switch (block.type) {
    case 'Heading':
      return (
        <h2 id={block.text?.toLowerCase().replace(/\s+/g, '-')}
          className="text-[clamp(20px,3vw,28px)] font-bold mt-10 mb-4 leading-tight"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
          {block.text}
        </h2>
      );
    case 'Subheading':
      return (
        <h3 id={block.text?.toLowerCase().replace(/\s+/g, '-')}
          className="text-[18px] font-semibold mt-8 mb-3"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
          {block.text}
        </h3>
      );
    case 'Paragraph':
      return (
        <p className="text-[15.5px] leading-[1.85] mb-5"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
          {block.text}
        </p>
      );
    case 'List':
      return (
        <ul className="mb-5 space-y-2 pl-1">
          {(block.items || []).filter(Boolean).map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-[15px]"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
              <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: '#6366F1' }} />
              {item}
            </li>
          ))}
        </ul>
      );
    case 'Image':
      return block.url ? (
        <div className="my-8 rounded-[16px] overflow-hidden" style={{ border: '1px solid var(--border-subtle)' }}>
          <img src={block.url} alt={block.alt || ''} className="w-full h-auto" loading="lazy" />
          {block.alt && (
            <p className="text-center text-[12px] py-3 px-4" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)', background: 'var(--bg-card)' }}>
              {block.alt}
            </p>
          )}
        </div>
      ) : null;
    case 'Code':
      return (
        <div className="my-7 rounded-[14px] overflow-hidden" style={{ background: '#0d0d14', border: '1px solid rgba(99,102,241,0.20)' }}>
          <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {['#FF5F57','#FEBC2E','#28C840'].map((c, i) => <span key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
          </div>
          <pre className="p-5 overflow-x-auto text-[13.5px] leading-relaxed" style={{ color: '#a5b4fc', fontFamily: 'monospace' }}>
            <code>{block.code}</code>
          </pre>
        </div>
      );
    case 'Quote':
      return (
        <blockquote className="my-8 pl-6 py-1 relative"
          style={{ borderLeft: '3px solid #6366F1' }}>
          <p className="text-[17px] italic leading-relaxed mb-2"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
            &ldquo;{block.text}&rdquo;
          </p>
          {block.author && (
            <footer className="text-[13px] font-medium" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              — {block.author}
            </footer>
          )}
        </blockquote>
      );
    default:
      return null;
  }
}

/* ── TOC ── */
function TableOfContents({ blocks }: { blocks: any[] }) {
  const headings = blocks.filter(b => b.type === 'Heading' || b.type === 'Subheading');
  if (headings.length < 2) return null;
  return (
    <div className="rounded-[16px] p-5 mb-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
      <h4 className="text-[12px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-jakarta)' }}>
        Contents
      </h4>
      <nav className="space-y-2">
        {headings.map((h, i) => (
          <a key={i} href={`#${h.text?.toLowerCase().replace(/\s+/g, '-')}`}
            className="block text-[13px] transition-colors duration-150"
            style={{ color: 'var(--text-muted)', paddingLeft: h.type === 'Subheading' ? 12 : 0, fontFamily: 'var(--font-inter)' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#818CF8'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}>
            {h.type === 'Subheading' && <span className="mr-1.5 opacity-50">↳</span>}
            {h.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

/* ── Share button ── */
function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <button onClick={copy} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(99,102,241,0.40)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-default)'; }}>
      {copied ? <Check size={14} style={{ color: '#34D399' }} /> : <Share2 size={14} />}
      {copied ? 'Copied!' : 'Share'}
    </button>
  );
}

/* ── Main ── */
export default function BlogDetailClient({ post, relatedPosts }: { post: Post; relatedPosts: Post[] }) {
  const [showComments, setShowComments] = useState(false);
  const blocks = post.contentBlocks || [];
  const readTime = post.readTime || Math.max(1, Math.ceil(
    blocks.reduce((n, b) => n + ((b.text || b.items?.join(' ') || '').split(/\s+/).length), 0) / 200
  ));

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Back + breadcrumb */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 py-4 flex items-center gap-3 text-[13px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
          <Link href="/blogs" className="flex items-center gap-1.5 transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}>
            <ArrowLeft size={14} /> Blog
          </Link>
          <span>/</span>
          {(post.categoryName || post.category) && (
            <>
              <span style={{ color: 'var(--text-muted)' }}>{post.categoryName || post.category}</span>
              <span>/</span>
            </>
          )}
          <span className="truncate max-w-[200px] sm:max-w-none" style={{ color: 'var(--text-secondary)' }}>{post.title}</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 xl:gap-16">

          {/* ── Article ── */}
          <article>
            {/* Header */}
            <motion.header initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="mb-8">
              <div className="flex items-center gap-2 mb-5 flex-wrap">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-semibold"
                  style={{ background: 'rgba(99,102,241,0.12)', color: '#818CF8', fontFamily: 'var(--font-inter)' }}>
                  <Tag size={11} />
                  {post.categoryName || post.category || 'General'}
                </span>
                {post.featured && <span className="px-3 py-1.5 rounded-full text-[12px] font-semibold text-indigo-300" style={{ background: 'rgba(99,102,241,0.12)' }}>Featured</span>}
                {post.trending && <span className="px-3 py-1.5 rounded-full text-[12px] font-semibold text-rose-300" style={{ background: 'rgba(239,68,68,0.10)' }}>Trending</span>}
              </div>

              <h1 className="text-[clamp(26px,4vw,44px)] font-extrabold leading-tight mb-5"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
                {post.title}
              </h1>

              {post.summary && (
                <p className="text-[16px] leading-relaxed mb-6"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                  {post.summary}
                </p>
              )}

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 text-[13px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                {post.author?.name && (
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                      style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)' }}>
                      {post.author.name.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ color: 'var(--text-secondary)' }}>{post.author.name}</span>
                  </div>
                )}
                <span className="flex items-center gap-1.5"><Clock size={13} /> {readTime} min read</span>
                {post.views !== undefined && <span className="flex items-center gap-1.5"><Eye size={13} /> {post.views} views</span>}
                <span>{formatDate(post.publishedAt)}</span>
                <ShareButton title={post.title} />
              </div>
            </motion.header>

            {/* Cover image */}
            {post.mainImageUrl && (
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.7 }}
                className="mb-10 rounded-[20px] overflow-hidden" style={{ border: '1px solid var(--border-subtle)' }}>
                <img src={post.mainImageUrl} alt={post.title} className="w-full h-auto" style={{ maxHeight: 500, objectFit: 'cover', width: '100%' }} />
              </motion.div>
            )}

            {/* TOC mobile */}
            {blocks.length > 0 && (
              <div className="lg:hidden mb-8">
                <TableOfContents blocks={blocks} />
              </div>
            )}

            {/* Content blocks */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="mb-10">
              {blocks.map((block, i) => <ContentBlock key={i} block={block} index={i} />)}
            </motion.div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-8 mb-8" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-[12px] font-medium"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Comments toggle */}
            <div className="mt-4">
              <button onClick={() => setShowComments(v => !v)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-[14px] font-semibold text-white transition-all"
                style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)', boxShadow: showComments ? '0 8px 28px rgba(99,102,241,0.40)' : 'none' }}>
                <BookOpen size={15} />
                {showComments ? 'Hide Comments' : 'View Comments'}
              </button>
              {showComments && (
                <div className="mt-8">
                  <CommentSection postId={post.id} />
                </div>
              )}
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="space-y-6">
            {/* TOC desktop */}
            {blocks.length > 0 && (
              <div className="hidden lg:block sticky top-24">
                <TableOfContents blocks={blocks} />

                {/* Author */}
                {post.author?.name && (
                  <div className="rounded-[16px] p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                    <h4 className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-jakarta)' }}>Author</h4>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-bold text-white flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)' }}>
                        {post.author.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>{post.author.name}</div>
                        {post.author.bio && <div className="text-[12px] mt-0.5 line-clamp-2" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>{post.author.bio}</div>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Related */}
                {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
              </div>
            )}
          </aside>
        </div>

        {/* Related posts on mobile */}
        {relatedPosts.length > 0 && (
          <div className="lg:hidden mt-12 pt-10" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <RelatedPosts posts={relatedPosts} />
          </div>
        )}
      </div>
    </div>
  );
}
