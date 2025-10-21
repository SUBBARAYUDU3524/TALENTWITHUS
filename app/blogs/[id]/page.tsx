"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "../../../FirebaseConfig";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  limit,
} from "firebase/firestore";
import { SlArrowRight } from "react-icons/sl";

// --- Utility: Format Firestore Timestamp or string to readable date
function formatDate(dateInput: any) {
  if (!dateInput) return "";
  if (typeof dateInput === "string") return dateInput;
  if (typeof dateInput === "object" && typeof dateInput.seconds === "number") {
    const date = new Date(dateInput.seconds * 1000);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  }
  if (dateInput instanceof Date) {
    return dateInput.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  }
  return String(dateInput);
}

// --- Ads Component (Dummy placeholder, replace with actual ad script for prod)
function AdComponent({
  dataAdFormat,
  dataFullWidthResponsive,
  className = "",
}: {
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full h-32 bg-gradient-to-r from-cyan-800 to-cyan-500 rounded-xl flex items-center justify-center shadow border border-gray-200 ${className}`}
      style={{
        minHeight: "8rem",
        overflow: "hidden",
      }}
    >
      <span className="text-white font-bold text-lg">Sponsored Ad</span>
    </div>
  );
}

// --- Comment Type
type Comment = {
  id: string;
  name: string;
  avatar: string;
  date: string;
  comment: string;
};

type User = {
  name: string;
  avatar: string;
};

type Promotion = {
  id: string;
  title?: string;
  image: string;
  url?: string;
  description?: string;
};

// --- Replace this with your actual authentication logic (NextAuth, Firebase Auth, etc.)
function useCurrentUser(): User | null {
  return null; // <--- Fix: implement your actual auth state here!
}

// --- Render a single content block
function renderBlock(block: any, idx: number) {
  switch (block.type) {
    case "Heading":
      return (
        <h2
          key={idx}
          className="text-xl sm:text-2xl font-bold my-6 text-black lg:text-3xl"
        >
          {block.text}
        </h2>
      );
    case "Subheading":
      return (
        <h3
          key={idx}
          className="text-xl sm:text-xl font-semibold my-4 text-black"
        >
          {block.text}
        </h3>
      );
    case "Paragraph":
      return (
        <p
          key={idx}
          className="text-base sm:text-lg text-gray-800 my-3 leading-relaxed"
        >
          {block.text}
        </p>
      );
    case "List":
      return (
        <ul
          key={idx}
          className="list-disc pl-6 my-3 text-base text-gray-900"
        >
          {block.items?.filter(Boolean).map((item: string, i: number) => (
            <li key={i} className="mb-2">
              {item}
            </li>
          ))}
        </ul>
      );
    case "Table":
      return (
        <table
          key={idx}
          className="border-collapse w-full my-6 bg-white"
        >
          <thead>
            <tr>
              {(block.headers || []).map((header: string, h: number) => (
                <th
                  key={h}
                  className="p-2 border border-blue-300 bg-blue-200 text-black font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(block.rows || []).map((row: any, r: number) => (
              <tr key={r}>
                {(block.headers || []).map((header: string, c: number) => (
                  <td
                    key={c}
                    className="p-2 border border-blue-200 text-black"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "Image":
      return block.url ? (
        <img
          key={idx}
          src={block.url}
          alt={block.alt}
          className="max-w-full rounded-xl shadow-lg my-6"
        />
      ) : null;
    case "Link":
      return (
        <a
          key={idx}
          href={block.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline font-medium text-base inline-block my-2"
        >
          {block.text}
        </a>
      );
    default:
      return null;
  }
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogParam = searchParams.get("blog");
  const user = useCurrentUser();

  const [post, setPost] = useState<any>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [recentLoading, setRecentLoading] = useState(true);

  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [promoLoading, setPromoLoading] = useState(true);

  const [trendingPosts, setTrendingPosts] = useState<any[]>([]);
  const [trendingLoading, setTrendingLoading] = useState(true);

  // --- Fetch blog post data from Firestore ---
  useEffect(() => {
    let unsub: (() => void) | null = null;
    async function fetchPost() {
      setLoading(true);
      try {
        const docRef = doc(db, "blogs-testing", params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ ...docSnap.data(), id: params.id });
        } else if (blogParam) {
          let parsedPost = null;
          try {
            parsedPost = blogParam && JSON.parse(decodeURIComponent(blogParam));
          } catch {
            parsedPost = null;
          }
          setPost(parsedPost);
        } else {
          setPost(null);
        }
      } catch (e) {
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
    return () => {
      unsub?.();
    };
  }, [params.id, blogParam]);

  // --- Fetch recent posts (exclude current) ---
  useEffect(() => {
    setRecentLoading(true);
    async function fetchRecent() {
      try {
        const q = query(
          collection(db, "blogs-testing"),
          orderBy("date", "desc"),
          limit(6)
        );
        const snap = await getDocs(q);
        const data = snap.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((p) => p.id !== params.id)
          .slice(0, 5);
        setRecentPosts(data);
      } catch {
        setRecentPosts([]);
      } finally {
        setRecentLoading(false);
      }
    }
    fetchRecent();
  }, [params.id]);

  // --- Fetch promotions ---
  useEffect(() => {
    setPromoLoading(true);
    async function fetchPromotions() {
      try {
        const promoSnapshot = await getDocs(
          query(collection(db, "promotions"), orderBy("createdAt", "desc"))
        );
        let promoData: Promotion[] = [];
        promoSnapshot.forEach((doc) =>
          promoData.push({ ...doc.data(), id: doc.id } as Promotion)
        );
        setPromotions(promoData);
      } catch (e) {
        setPromotions([]);
      } finally {
        setPromoLoading(false);
      }
    }
    fetchPromotions();
  }, []);

  // --- Fetch trending posts (where trending: true) ---
  useEffect(() => {
    setTrendingLoading(true);
    async function fetchTrending() {
      try {
        const blogsSnapshot = await getDocs(
          query(collection(db, "blogs-testing"), orderBy("date", "desc"))
        );
        const trendingData = blogsSnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((p) => p.trending === true);
        setTrendingPosts(trendingData);
      } catch {
        setTrendingPosts([]);
      } finally {
        setTrendingLoading(false);
      }
    }
    fetchTrending();
  }, []);

  // --- Fetch comments for this post from Firestore ---
  useEffect(() => {
    if (!post?.id) {
      setComments([]);
      setCommentsLoading(false);
      return;
    }
    setCommentsLoading(true);
    async function fetchComments() {
      try {
        const q = query(
          collection(db, "blogs-testing", post.id, "comments"),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        const data: Comment[] = snap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Comment[];
        setComments(data);
      } catch {
        setComments([]);
      } finally {
        setCommentsLoading(false);
      }
    }
    fetchComments();
  }, [post?.id]);

  // --- Comment submission handler (require login) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to comment.");
      return;
    }
    if (!newComment.trim() || !post?.id) return;
    const newCommentObj = {
      name: user.name,
      avatar: user.avatar || `https://randomuser.me/api/portraits/men/1.jpg`,
      date: "Just now",
      comment: newComment,
      createdAt: serverTimestamp(),
    };
    // Add to firestore
    const ref = await addDoc(
      collection(db, "blogs-testing", post.id, "comments"),
      newCommentObj
    );
    setComments([
      { ...newCommentObj, id: ref.id, date: "Just now" },
      ...comments,
    ]);
    setNewComment("");
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen text-black py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Loading post...</h1>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-white min-h-screen text-black py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blogs" className="text-blue-600 hover:text-blue-700">
            ← Back to all posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-black py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Main Content */}
        <div className="w-full lg:w-2/3">
          {/* Back button */}
          <div className="mb-7">
            <Link
              href="/blogs"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to all posts
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-extrabold mb-2 lg:text-4xl text-black">{post.title}</h1>
          {/* Summary */}
         {post.summary && (
  <p
    className="text-lg text-gray-700 mb-4 font-medium break-words"
    style={{ wordWrap: "break-word", overflowWrap: "break-word", maxWidth: "100%" }}
  >
    {post.summary}
  </p>
)}
          {/* Blog Image */}
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-auto object-cover rounded-xl shadow mb-8"
              style={{ display: "block" }}
              loading="eager"
            />
          )}
        

          {/* Render blog content blocks */}
          <div className="mb-12">
            {(post.content || []).map(renderBlock)}
          </div>

          {/* Comments and Ads section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-200">
              Comments ({comments.length})
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left: comments form and list */}
              <div className="lg:col-span-2">
                {/* Comment Form */}
                <form
                  onSubmit={handleSubmit}
                  className="bg-blue-50 rounded-xl p-6 mb-8 w-full max-w-xl border border-blue-100"
                >
                  <h3 className="text-lg font-medium mb-4 text-blue-700">Leave a comment</h3>
                  {!user && (
                    <div className="mb-4 text-red-500 font-semibold">
                      Please login to comment.
                    </div>
                  )}
                  <textarea
                    id="comment"
                    rows={2}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment here..."
                    className="w-full px-4 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-black mb-4"
                    required
                    disabled={!user}
                  ></textarea>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    disabled={!user || !newComment.trim()}
                  >
                    Post Comment
                  </button>
                </form>
                {/* Comments List */}
                <div className="space-y-6 w-full max-w-xl">
                  {commentsLoading ? (
                    <div className="text-gray-400 text-center">Loading comments...</div>
                  ) : comments.length === 0 ? (
                    <div className="text-gray-400 text-center">No comments yet.</div>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="flex gap-4 transition">
                        <img
                          src={comment.avatar}
                          alt={comment.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-blue-400 transition"
                        />
                        <div className="flex-1 bg-blue-50 rounded-2xl p-5 shadow-md border border-blue-100">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-black transition">
                              {comment.name}
                            </h4>
                            <span className="text-xs text-gray-500 italic">
                              {comment.date}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              {/* Right: Ads Section */}
              <div className="flex flex-col gap-8">
                <AdComponent
                  dataAdFormat="auto"
                  dataFullWidthResponsive={true}
                  className="mb-6"
                />
                <AdComponent
                  dataAdFormat="auto"
                  dataFullWidthResponsive={true}
                  className="mb-6 h-60"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Right Sidebar: Promotions, Recent Posts, Trending Posts */}
        <div className="w-full lg:w-1/3 flex flex-col gap-10 ">
          {/* Promotions section */}
          <div className="bg-white shadow-lg mb-6 border border-blue-100 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-blue-50">
              {promoLoading ? (
                <div className="text-black">Loading promotions...</div>
              ) : promotions.length === 0 ? (
                <div className="text-black">No promotions found.</div>
              ) : (
                promotions.map((promo) => (
                  <a
                    key={promo.id}
                    href={promo.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-2 py-2 group "
                  >
                    <img
                      src={promo.image}
                      alt={promo.title || "Promotion"}
                      width={340}
                      height={180}
                      className="w-full h-44 object-cover rounded-lg border border-blue-200"
                      style={{ maxHeight: "180px", minHeight: "120px", background: "#e2e8f0" }}
                      loading="lazy"
                    />
                    <span className="font-semibold text-blue-700 text-base">
                      {promo.title}
                    </span>
                    {promo.description && (
                      <span className="text-sm text-gray-600">{promo.description}</span>
                    )}
                  </a>
                ))
              )}
            </div>
          </div>
          {/* Recent Posts section */}
          <div className="bg-blue-600  shadow-lg mb-8 border border-blue-200">
            <h2 className="text-white text-lg font-bold px-6 py-3 border-b border-blue-400">
              Recent Posts
            </h2>
            <div className="px-4 py-3 bg-blue-50 text-black">
              {recentLoading ? (
                <div className="text-black">Loading...</div>
              ) : recentPosts.length === 0 ? (
                <div className="text-black">No recent posts found.</div>
              ) : (
                recentPosts.map((rp) => (
                  <Link
                    key={rp.id}
                    href={{
                      pathname: `/blogs/${rp.id}`,
                      query: { blog: encodeURIComponent(JSON.stringify(rp)) },
                    }}
                    className="flex items-center gap-2 py-2 group text-gray-900 hover:text-gray-950"
                  >
                    <SlArrowRight className="text-black  text-base shrink-0" />
                    <span className="truncate-2-lines group-hover:underline flex-1"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "3.2em",
                        lineHeight: "1.6em",
                        wordBreak: "break-word",
                      }}
                    >
                      {rp.title}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
          {/* Trending Posts section */}
          <div className="bg-blue-600  shadow-lg mb-8 border border-blue-200">
            <h2 className="text-white text-lg font-bold px-6 py-3 border-b border-blue-400">
              Trending Posts
            </h2>
            <div className="px-4 py-3 bg-blue-50 text-black">
              {trendingLoading ? (
                <div className="text-black">Loading...</div>
              ) : trendingPosts.length === 0 ? (
                <div className="text-black">No Trending posts found.</div>
              ) : (
                trendingPosts.map((tp) => (
                  <Link
                    key={tp.id}
                    href={{
                      pathname: `/blogs/${tp.id}`,
                      query: { blog: encodeURIComponent(JSON.stringify(tp)) },
                    }}
                    className="flex items-center gap-2 py-2 group text-gray-900 hover:text-gray-950"
                  >
                    <SlArrowRight className="text-black  text-base shrink-0" />
                    <span className="truncate-2-lines group-hover:underline flex-1"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "3.2em",
                        lineHeight: "1.6em",
                        wordBreak: "break-word",
                      }}
                    >
                      {tp.title}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Two line clamp utility for recent post titles */}
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
      `}</style>
    </div>
  );
}