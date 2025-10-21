'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { SlArrowRight } from 'react-icons/sl';
import { GrAnnounce } from 'react-icons/gr';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';

// --- Types ---
interface BlogPost {
  id: string;
  title: string;
  summary: string;
  category: string;
  trending?: boolean;
  date: string | { seconds: number };
  image?: string;
  [key: string]: any;
}

interface Promotion {
  id: string;
  url: string;
  image: string;
  name?: string;
}

// --- Utils ---
const formatDate = (date: string | { seconds: number } | undefined): string => {
  if (!date) return '';
  if (typeof date === 'string') {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
  if (typeof date === 'object' && date.seconds) {
    return new Date(date.seconds * 1000).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
  return '';
};

const getDateObj = (date: string | { seconds: number }) => {
  if (typeof date === 'string') return new Date(date);
  if (typeof date === 'object' && date.seconds)
    return new Date(date.seconds * 1000);
  return new Date();
};

const isNew = (date: string | { seconds: number }) => {
  const now = new Date();
  const postDate = getDateObj(date);
  const diffMs = now.getTime() - postDate.getTime();
  return diffMs <= 24 * 60 * 60 * 1000; // 24 hours in ms
};

// Split array into two columns, even distribution, always fill left column first for odd number
const splitTwoColumns = <T,>(arr: T[]): [T[], T[]] => {
  const mid = Math.ceil(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
};

const BlogPosts: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [sideImages, setSideImages] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // --- Data Fetching ---
  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        const blogsSnapshot = await getDocs(
          query(collection(db, 'blogs-testing'), orderBy('date', 'desc'))
        );
        const blogsData: BlogPost[] = [];
        blogsSnapshot.forEach((doc) =>
          blogsData.push({ ...doc.data(), id: doc.id } as BlogPost)
        );
        let promoData: Promotion[] = [];
        try {
          const promoSnapshot = await getDocs(
            query(collection(db, 'promotions'), orderBy('createdAt', 'desc'))
          );
          promoSnapshot.forEach((doc) =>
            promoData.push({ ...doc.data(), id: doc.id } as Promotion)
          );
        } catch (e) {}
        if (!isMounted) return;
        setBlogPosts(blogsData);
        setSideImages(promoData);
      } catch (err) {
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  // --- Filtered Data ---
  const filteredTrending = useMemo(
    () =>
      blogPosts.filter(
        (post) =>
          post.trending &&
          (post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.summary?.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    [blogPosts, searchTerm]
  );

  // --- Group All Posts by Category (including trending) ---
  const filteredOther = useMemo(
    () =>
      blogPosts.filter(
        (post) =>
          post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.summary?.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [blogPosts, searchTerm]
  );

  // --- Split Trending: always fill left column first, rest in right
  const trendingColumns = splitTwoColumns(filteredTrending);

  // --- Group All Posts by Category (trending posts will appear in both trending and their category) ---
  const categoryMap: { [cat: string]: BlogPost[] } = {};
  filteredOther.forEach((post) => {
    if (!categoryMap[post.category]) categoryMap[post.category] = [];
    categoryMap[post.category].push(post);
  });

  // --- Loading Spinner (modern) ---
  if (loading) {
    return (
      <section className="bg-white py-24 px-2 sm:px-4 text-black min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full border-8 border-blue-200 border-t-blue-500 h-20 w-20"></div>
          <span className="text-lg font-bold text-blue-600">
            Loading Blogs...
          </span>
        </div>
      </section>
    );
  }

  return (
    <section
      className="bg-white p-8 md:p-10 sm:px-4 text-black min-h-screen w-full"
      aria-labelledby="blog-posts-heading"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col-reverse lg:flex-row gap-0 lg:gap-12 relative">
        {/* Main Content Centered on md/sm, left on lg */}
        <div className="w-full lg:w-[66%] mx-auto">
          {/* Main Heading */}
          <h2
            id="blog-posts-heading"
            className="text-2xl text-center md:text-left sm:text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700 bg-clip-text text-transparent"
          >
            Trending Voices & Stories!
          </h2>
          <p className="text-center md:text-left text-sm sm:text-base md:text-lg text-gray-600 mb-6">
            Explore the latest trending and curated articles, tips, and
            insights.
          </p>

          {/* Search box */}
          <div className="flex items-center justify-center md:justify-start gap-2 mb-8">
            <div className="relative w-full max-w-md">
              <label htmlFor="blog-search" className="sr-only">
                Search blog posts
              </label>
              <input
                id="blog-search"
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-2 sm:pr-4 py-2 w-full rounded-lg bg-blue-50 border border-blue-200 text-black text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                aria-label="Search blog posts"
                autoComplete="off"
              />
              <span
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
                aria-hidden
              >
                <svg width="18" height="18" fill="none">
                  <path
                    d="M12.5 12.5L17 17M14 8.5A5.5 5.5 0 1 1 3 8.5a5.5 5.5 0 0 1 11 0Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Trending Table */}
          <div className="rounded-md overflow-hidden mb-0 w-full ">
            <div className="bg-blue-600 px-4 py-2 flex items-center">
              <GrAnnounce className="text-white text-lg mr-2" />
              <span
                className="uppercase text-white font-bold tracking-wide text-base sm:text-lg"
                style={{ letterSpacing: '0.06em' }}
              >
                Trending
              </span>
            </div>
            <div className="border-b border-black/70"></div>
            <div className="w-full bg-blue-200">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {trendingColumns.map((col, colIdx) => (
                  <div key={colIdx} className="divide-y divide-blue-100">
                    {col.map((post) => (
                      <Link
                        key={post.id}
                        href={{
                          pathname: `/blogs/${post.id}`,
                          query: { title: post.title },
                        }}
                        className="flex items-start gap-2 text-base sm:text-[1.05rem] group px-1 py-2"
                        style={{ fontWeight: 500, color: '#1e293b' }}
                      >
                        <span className="py-1">
                          <SlArrowRight className="text-blue-400 mt-2 text-base shrink-0 " />
                        </span>
                        <span
                          className="truncate-2-lines group-hover:underline group-hover:text-blue-700 transition"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxHeight: '3.2em',
                            lineHeight: '1.6em',
                            wordBreak: 'break-word',
                          }}
                        >
                          {post.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Black line below trending */}
          <div className="border-b border-black my-5"></div>

          {/* Other Blogs by Category (includes trending posts as well) */}
          <div className="rounded-md overflow-hidden w-full">
            <div className="border-b border-black/70"></div>
            {Object.keys(categoryMap).length === 0 ? (
              <div className="col-span-2 text-center py-10 text-gray-400 text-base">
                No blogs found.
              </div>
            ) : (
              Object.entries(categoryMap).map(([category, posts]) => {
                // Split posts into two columns, first column has Math.ceil(n/2), second column has Math.floor(n/2)
                const [col1, col2] = splitTwoColumns(posts);
                return (
                  <div key={category} className="mb-8">
                    {/* Category Name */}
                    <div className="py-2 px-3 bg-blue-500 border-l-4 text-white font-semibold text-base sm:text-lg mb-2">
                      {category}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                      {[col1, col2].map((col, colIdx) => (
                        <div key={colIdx} className="divide-y divide-blue-100">
                          {col.map((post) => (
                            <Link
                              key={post.id}
                              href={{
                                pathname: `/blogs/${post.id}`,
                                query: { title: post.title },
                              }}
                              className="flex items-start gap-2 text-base sm:text-[1.05rem] px-2 py-3 group"
                              style={{ fontWeight: 500, color: '#1e293b' }}
                            >
                              <SlArrowRight className="text-blue-400 mt-2 text-base shrink-0" />
                              {isNew(post.date) && (
                                <span
                                  className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full mr-2 mt-0.5 shrink-0"
                                  style={{
                                    minWidth: '38px',
                                    textAlign: 'center',
                                  }}
                                >
                                  New
                                </span>
                              )}
                              {/* Title, two lines max, ... if overflow */}
                              <span
                                className="truncate-2-lines group-hover:underline flex-1"
                                style={{
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  maxHeight: '3.2em',
                                  lineHeight: '1.6em',
                                  wordBreak: 'break-word',
                                }}
                              >
                                {post.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Promotions (hidden on md/sm, show only on lg+) */}
        <div className="hidden lg:block lg:w-[34%]">
          <aside
            className="flex flex-col gap-6 h-full sticky top-[106px]"
            aria-label="Promotions"
            style={{ alignSelf: 'flex-start' }}
          >
            {sideImages.map((img) => (
              <a
                href={img.url}
                target="_blank"
                rel="noopener noreferrer"
                key={img.id}
                className="bg-blue-50 rounded-xl overflow-hidden shadow flex flex-col border border-blue-100 hover:shadow-lg transition"
                style={{ textDecoration: 'none' }}
                aria-label={img.name || 'Promotion'}
                tabIndex={0}
              >
                <img
                  src={img.image}
                  alt={img.name || 'Promotion'}
                  className="w-full h-80 object-cover"
                  loading="lazy"
                  width={320}
                  height={160}
                />
              </a>
            ))}
          </aside>
        </div>
      </div>
      {/* Two line clamp utility */}
      <style>{`
        .truncate-2-lines {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          max-height: 3.2em;
          line-height: 1.6em;
          word-break: break-word;
        }
        @media (max-width: 1023px) {
          .mx-auto {
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BlogPosts;
