'use client';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Clock, Eye, ArrowRight, Tag, BookOpen } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  category: string;
  categoryName?: string;
  isPublished?: boolean;
  trending?: boolean;
  featured?: boolean;
  publishedAt?: any;
  date?: any;
  mainImageUrl?: string;
  image?: string;
  readTime?: number;
  views?: number;
  author?: { name: string; avatar?: string };
  tags?: string[];
  contentBlocks?: any[];
}

const CATEGORIES = ['All', 'Technology', 'AI & ML', 'Web Dev', 'Mobile', 'Cloud', 'Design', 'Business'];

const CATEGORY_GRADIENTS: Record<string, string> = {
  Technology:  'from-indigo-600 to-violet-600',
  'AI & ML':   'from-cyan-500 to-blue-600',
  'Web Dev':   'from-emerald-500 to-teal-600',
  Mobile:      'from-amber-500 to-orange-600',
  Cloud:       'from-sky-500 to-indigo-600',
  Design:      'from-pink-500 to-rose-600',
  Business:    'from-violet-500 to-purple-600',
  default:     'from-indigo-500 to-blue-600',
};

function formatDate(ts: any): string {
  if (!ts) return '';
  const d = ts?.toDate ? ts.toDate() : ts?.seconds ? new Date(ts.seconds * 1000) : new Date(ts);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function getCoverGradient(category: string) {
  return CATEGORY_GRADIENTS[category] ?? CATEGORY_GRADIENTS.default;
}

/* ── Loading skeleton ── */
function SkeletonCard() {
  return (
    <div className="rounded-[20px] overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
      <div className="h-44 shimmer" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-20 rounded-full shimmer" />
        <div className="h-5 rounded shimmer" />
        <div className="h-4 w-3/4 rounded shimmer" />
        <div className="h-3 w-1/2 rounded shimmer" />
      </div>
    </div>
  );
}

/* ── Blog card ── */
function BlogCard({ post, i }: { post: BlogPost; i: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const grad = getCoverGradient(post.categoryName || post.category || '');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/blogs/${post.id}`} className="group block h-full rounded-[20px] overflow-hidden transition-all duration-300"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
        onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 20px 50px rgba(0,0,0,0.18)'; el.style.borderColor = 'rgba(99,102,241,0.30)'; }}
        onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; el.style.borderColor = 'var(--border-subtle)'; }}
      >
        {/* Cover */}
        <div className="relative h-44 overflow-hidden">
          {post.mainImageUrl || post.image ? (
            <img src={post.mainImageUrl || post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center`}>
              <BookOpen size={36} className="text-white/40" />
            </div>
          )}
          {(post.trending || post.featured) && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-white"
                style={{ background: post.featured ? 'rgba(99,102,241,0.85)' : 'rgba(239,68,68,0.85)', backdropFilter: 'blur(4px)' }}>
                {post.featured ? 'Featured' : 'Trending'}
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-5">
          {/* Category */}
          <div className="mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold"
              style={{ background: 'rgba(99,102,241,0.12)', color: '#818CF8', fontFamily: 'var(--font-inter)' }}>
              <Tag size={10} />
              {post.categoryName || post.category || 'General'}
            </span>
          </div>

          <h3 className="text-[15px] font-bold leading-snug mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
            {post.title}
          </h3>
          <p className="text-[12.5px] leading-relaxed mb-4 line-clamp-2"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
            {post.summary}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between text-[11.5px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
            <div className="flex items-center gap-3">
              {post.readTime && (
                <span className="flex items-center gap-1">
                  <Clock size={11} /> {post.readTime} min
                </span>
              )}
              {post.views !== undefined && (
                <span className="flex items-center gap-1">
                  <Eye size={11} /> {post.views}
                </span>
              )}
            </div>
            <span>{formatDate(post.publishedAt || post.date)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Featured (hero) card ── */
function FeaturedCard({ post }: { post: BlogPost }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const grad = getCoverGradient(post.categoryName || post.category || '');

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
      <Link href={`/blogs/${post.id}`}
        className="group relative block rounded-[24px] overflow-hidden mb-8 transition-all duration-300"
        style={{ border: '1px solid var(--border-subtle)', minHeight: 320 }}
        onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = '0 24px 60px rgba(0,0,0,0.22)'; el.style.borderColor = 'rgba(99,102,241,0.30)'; }}
        onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = 'none'; el.style.borderColor = 'var(--border-subtle)'; }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0">
          {post.mainImageUrl || post.image ? (
            <img src={post.mainImageUrl || post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${grad}`} />
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(3,3,8,0.92) 30%, rgba(3,3,8,0.40) 70%, transparent 100%)' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-full p-7 sm:p-10" style={{ minHeight: 320 }}>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-white" style={{ background: 'rgba(99,102,241,0.75)', backdropFilter: 'blur(6px)' }}>
              Featured
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium" style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(6px)' }}>
              {post.categoryName || post.category}
            </span>
          </div>
          <h2 className="text-[clamp(20px,3vw,32px)] font-extrabold text-white leading-tight mb-3 max-w-2xl" style={{ fontFamily: 'var(--font-jakarta)' }}>
            {post.title}
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed mb-5 max-w-xl line-clamp-2" style={{ fontFamily: 'var(--font-inter)' }}>
            {post.summary}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-[12px] text-white/60" style={{ fontFamily: 'var(--font-inter)' }}>
              {post.author?.name && <span>{post.author.name}</span>}
              {post.readTime && <span className="flex items-center gap-1"><Clock size={11} />{post.readTime} min</span>}
              <span>{formatDate(post.publishedAt || post.date)}</span>
            </div>
            <span className="flex items-center gap-1.5 text-[13px] font-semibold text-indigo-300 group-hover:text-white transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>
              Read <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

const STATIC_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI in Software Development',
    summary: 'Exploring how artificial intelligence is transforming the way we write, test, and deploy code in modern development workflows.',
    category: 'AI & ML',
    categoryName: 'AI & ML',
    isPublished: true,
    featured: true,
    trending: true,
    publishedAt: new Date('2024-03-15'),
    mainImageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    readTime: 8,
    views: 2456,
    author: { name: 'Sarah Chen', avatar: '/avatars/sarah.jpg' },
    tags: ['AI', 'Machine Learning', 'Development Tools'],
    contentBlocks: [
      { type: 'heading', content: 'Introduction to AI in Development' },
      { type: 'paragraph', content: 'Artificial Intelligence is no longer just a buzzword in the tech industry. It has become an integral part of modern software development, revolutionizing everything from code generation to automated testing.' },
      { type: 'heading', content: 'Key Applications' },
      { type: 'list', items: ['Code completion and generation', 'Automated testing', 'Bug detection and fixing', 'Performance optimization'] },
      { type: 'paragraph', content: 'Tools like GitHub Copilot, ChatGPT, and various AI-powered IDE extensions are becoming essential companions for developers worldwide.' }
    ]
  },
  {
    id: '2',
    title: 'Building Scalable Microservices with Node.js',
    summary: 'A comprehensive guide to designing and implementing microservices architecture using Node.js and modern cloud technologies.',
    category: 'Web Dev',
    categoryName: 'Web Dev',
    isPublished: true,
    trending: false,
    featured: false,
    publishedAt: new Date('2024-03-10'),
    mainImageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    readTime: 12,
    views: 1823,
    author: { name: 'Michael Rodriguez', avatar: '/avatars/michael.jpg' },
    tags: ['Node.js', 'Microservices', 'Architecture'],
    contentBlocks: [
      { type: 'heading', content: 'Understanding Microservices' },
      { type: 'paragraph', content: 'Microservices architecture has emerged as a dominant pattern for building scalable and maintainable applications. This approach breaks down complex systems into smaller, independent services.' }
    ]
  },
  {
    id: '3',
    title: 'Cloud-Native Development Strategies',
    summary: 'Best practices for building applications that leverage the full power of cloud computing platforms and services.',
    category: 'Cloud',
    categoryName: 'Cloud',
    isPublished: true,
    trending: true,
    featured: false,
    publishedAt: new Date('2024-03-08'),
    mainImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    readTime: 10,
    views: 1567,
    author: { name: 'Emily Watson', avatar: '/avatars/emily.jpg' },
    tags: ['Cloud Computing', 'DevOps', 'AWS'],
    contentBlocks: [
      { type: 'heading', content: 'Cloud-Native Principles' },
      { type: 'paragraph', content: 'Cloud-native development is about building and running applications to take advantage of the distributed computing offered by the cloud delivery model.' }
    ]
  },
  {
    id: '4',
    title: 'Modern React Patterns and Best Practices',
    summary: 'Explore the latest React patterns, hooks, and architectural approaches for building maintainable applications.',
    category: 'Web Dev',
    categoryName: 'Web Dev',
    isPublished: true,
    trending: false,
    featured: false,
    publishedAt: new Date('2024-03-05'),
    mainImageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    readTime: 15,
    views: 2891,
    author: { name: 'David Kim', avatar: '/avatars/david.jpg' },
    tags: ['React', 'JavaScript', 'Frontend'],
    contentBlocks: [
      { type: 'heading', content: 'React Evolution' },
      { type: 'paragraph', content: 'React has evolved significantly over the years, introducing new patterns and best practices that help developers build more efficient and maintainable applications.' }
    ]
  },
  {
    id: '5',
    title: 'Mobile-First Design in 2024',
    summary: 'Why mobile-first design is crucial and how to implement it effectively in modern web development projects.',
    category: 'Design',
    categoryName: 'Design',
    isPublished: true,
    trending: false,
    featured: false,
    publishedAt: new Date('2024-03-01'),
    mainImageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
    readTime: 7,
    views: 1234,
    author: { name: 'Lisa Anderson', avatar: '/avatars/lisa.jpg' },
    tags: ['Design', 'Mobile', 'UX'],
    contentBlocks: [
      { type: 'heading', content: 'Mobile-First Philosophy' },
      { type: 'paragraph', content: 'With over 60% of web traffic coming from mobile devices, adopting a mobile-first approach is no longer optional—it\'s essential.' }
    ]
  },
  {
    id: '6',
    title: 'Cybersecurity Best Practices for Developers',
    summary: 'Essential security measures every developer should implement to protect applications and user data.',
    category: 'Technology',
    categoryName: 'Technology',
    isPublished: true,
    trending: true,
    featured: false,
    publishedAt: new Date('2024-02-28'),
    mainImageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
    readTime: 11,
    views: 3456,
    author: { name: 'James Wilson', avatar: '/avatars/james.jpg' },
    tags: ['Security', 'Best Practices', 'Development'],
    contentBlocks: [
      { type: 'heading', content: 'Security First Approach' },
      { type: 'paragraph', content: 'In today\'s digital landscape, security cannot be an afterthought. Developers must integrate security practices throughout the entire development lifecycle.' }
    ]
  },
  {
    id: '7',
    title: 'The Rise of Edge Computing',
    summary: 'Understanding how edge computing is transforming data processing and reducing latency in modern applications.',
    category: 'Technology',
    categoryName: 'Technology',
    isPublished: true,
    trending: false,
    featured: false,
    publishedAt: new Date('2024-02-25'),
    mainImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbcc31c?w=800&h=400&fit=crop',
    readTime: 9,
    views: 987,
    author: { name: 'Alex Thompson', avatar: '/avatars/alex.jpg' },
    tags: ['Edge Computing', 'Infrastructure', 'Performance'],
    contentBlocks: [
      { type: 'heading', content: 'What is Edge Computing?' },
      { type: 'paragraph', content: 'Edge computing brings computation and data storage closer to the location where it is needed, improving response times and saving bandwidth.' }
    ]
  },
  {
    id: '8',
    title: 'Business Intelligence with Modern Data Stack',
    summary: 'How to build effective BI solutions using modern data tools and cloud platforms for better decision-making.',
    category: 'Business',
    categoryName: 'Business',
    isPublished: true,
    trending: false,
    featured: false,
    publishedAt: new Date('2024-02-20'),
    mainImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    readTime: 13,
    views: 1456,
    author: { name: 'Rachel Green', avatar: '/avatars/rachel.jpg' },
    tags: ['Business Intelligence', 'Data Analytics', 'Strategy'],
    contentBlocks: [
      { type: 'heading', content: 'Modern Data Stack' },
      { type: 'paragraph', content: 'The modern data stack has revolutionized how organizations approach business intelligence, enabling faster insights and more agile decision-making.' }
    ]
  },
  {
    id: '9',
    title: 'Progressive Web Apps: The Future of Web',
    summary: 'Why PWAs are becoming the standard for web applications and how to implement them effectively.',
    category: 'Mobile',
    categoryName: 'Mobile',
    isPublished: true,
    trending: true,
    featured: false,
    publishedAt: new Date('2024-02-15'),
    mainImageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop',
    readTime: 8,
    views: 2234,
    author: { name: 'Tom Harris', avatar: '/avatars/tom.jpg' },
    tags: ['PWA', 'Web Development', 'Mobile'],
    contentBlocks: [
      { type: 'heading', content: 'PWA Revolution' },
      { type: 'paragraph', content: 'Progressive Web Apps combine the best of web and mobile applications, offering offline capabilities, push notifications, and app-like experiences.' }
    ]
  }
];

/* ── Main component ── */
export default function BlogsClient() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const posts = STATIC_BLOGS;

  const filtered = useMemo(() => {
    let result = posts;
    if (activeCategory !== 'All') {
      result = result.filter(p => (p.categoryName || p.category) === activeCategory);
    }
    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(p => p.title?.toLowerCase().includes(s) || p.summary?.toLowerCase().includes(s));
    }
    return result;
  }, [posts, activeCategory, search]);

  const featured = filtered.find(p => p.featured) || filtered[0];
  const rest = filtered.filter(p => p.id !== featured?.id);

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Header */}
      <section className="relative py-[80px] sm:py-[100px] overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
        <div className="absolute inset-0 dot-pattern opacity-25 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px gradient-line" />
        <div className="absolute bottom-0 inset-x-0 h-px gradient-line" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/[0.06] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-6 text-center">
          <motion.div ref={headerRef} initial={{ opacity: 0, y: 28 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="badge badge-indigo mb-5 mx-auto inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse inline-block" />
              Our Blog
            </div>
            <h1 className="text-[clamp(30px,5vw,56px)] font-extrabold mb-5 leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              Insights & <span className="gradient-text">Ideas</span>
            </h1>
            <p className="text-[16px] max-w-[500px] mx-auto leading-relaxed mb-10" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              Tech deep-dives, tutorials, and updates from our engineering and design team.
            </p>

            {/* Search */}
            <div className="relative max-w-[440px] mx-auto">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search articles…"
                className="w-full pl-11 pr-4 py-3 rounded-xl text-[14px] outline-none transition-all"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', fontFamily: 'var(--font-inter)' }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.50)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.10)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.boxShadow = 'none'; }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 py-12">
        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200"
              style={activeCategory === cat
                ? { background: 'linear-gradient(135deg,#6366F1,#4F46E5)', color: '#fff', fontFamily: 'var(--font-inter)' }
                : { background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading removed - using static data */}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(99,102,241,0.12)' }}>
              <BookOpen size={28} style={{ color: '#818CF8' }} />
            </div>
            <h3 className="text-[18px] font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jakarta)' }}>
              No articles found
            </h3>
            <p className="text-[14px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              {search ? 'Try a different search term.' : 'No posts published yet — check back soon.'}
            </p>
          </div>
        )}

        {/* Content */}
        {filtered.length > 0 && (
          <>
            {/* Featured post */}
            {featured && !search && <FeaturedCard post={featured} />}

            {/* Grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(search ? filtered : rest).map((post, i) => (
                  <BlogCard key={post.id} post={post} i={i} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
