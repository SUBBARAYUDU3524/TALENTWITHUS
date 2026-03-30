'use client';
import React from 'react';
import Link from 'next/link';
import { Clock, BookOpen } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  categoryName?: string;
  category?: string;
  mainImageUrl?: string;
  readTime?: number;
  publishedAt?: any;
}

function formatDate(ts: any): string {
  if (!ts) return '';
  const d = ts?.toDate ? ts.toDate() : ts?.seconds ? new Date(ts.seconds * 1000) : new Date(ts);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function RelatedPosts({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  return (
    <div className="rounded-[16px] p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
      <h4 className="text-[11px] font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-jakarta)' }}>
        Related Posts
      </h4>
      <div className="space-y-4">
        {posts.map(post => (
          <Link key={post.id} href={`/blogs/${post.id}`} className="flex gap-3 group">
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0" style={{ background: 'rgba(99,102,241,0.12)' }}>
              {post.mainImageUrl ? (
                <img src={post.mainImageUrl} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen size={20} style={{ color: '#818CF8' }} />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold leading-snug line-clamp-2 mb-1 group-hover:text-indigo-400 transition-colors"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
                {post.title}
              </p>
              <div className="flex items-center gap-2 text-[11px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                {post.readTime && <span className="flex items-center gap-1"><Clock size={10} />{post.readTime}m</span>}
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}