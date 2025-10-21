// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
// import { db } from "@/FirebaseConfig";

// const RecentPosts = () => {
//   const [blogPosts, setBlogPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         // Fetch the latest 4 blogs
//         const q = query(
//           collection(db, "blogs"),
//           orderBy("date", "desc"),
//           limit(4)
//         );
//         const querySnapshot = await getDocs(q);
//         const blogs = [];
//         querySnapshot.forEach((doc) => {
//           const data = doc.data();
//           blogs.push({
//             id: doc.id,
//             title: data.title,
//             image: data.image,
//             summary: data.summary,
//             description: data.description, // <-- ensure this is included!
//             category: data.category,
//             trending: data.trending,
//             date:
//               data.date && data.date.toDate
//                 ? data.date.toDate().toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "short",
//                     day: "numeric",
//                   })
//                 : "",
//             slug: data.slug || doc.id,
//           });
//         });
//         setBlogPosts(blogs);
//       } catch (error) {
//         // Optionally handle error
//         setBlogPosts([]);
//       }
//       setLoading(false);
//     };
//     fetchBlogs();
//   }, []);

//   return (
//     <section className="bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] py-20 px-4 sm:px-6 text-white">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400">
//           🔥 Recent Blog Posts
//         </h2>

//         {loading ? (
//           <div className="text-center text-cyan-300 py-16 text-xl">
//             Loading...
//           </div>
//         ) : blogPosts.length === 0 ? (
//           <div className="text-center text-gray-300 py-16 text-lg">
//             No posts found.
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {blogPosts.map((post) => (
//               <article
//                 key={post.id}
//                 className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-2 group"
//               >
//                 <div className="h-48 w-full overflow-hidden">
//                   <img
//                     src={post.image}
//                     alt={post.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                 </div>
//                 <div className="p-6 space-y-4">
//                   <span className="text-xs font-medium text-cyan-400">
//                     {post.date}
//                   </span>
//                   <h3 className="text-xl font-bold text-white line-clamp-2">
//                     {post.title}
//                   </h3>
//                   <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
//                     {post.summary}
//                   </p>
//                   <Link
//                     key={post.id}
//                     href={{
//                       pathname: `/blogs/${post.id}`,
//                       query: { blog: encodeURIComponent(JSON.stringify(post)) },
//                     }}
//                     className="inline-flex items-center text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
//                   >
//                     Read more
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 ml-1"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M14 5l7 7m0 0l-7 7m7-7H3"
//                       />
//                     </svg>
//                   </Link>
//                 </div>
//               </article>
//             ))}
//           </div>
//         )}

//         <div className="text-center mt-16">
//           <Link
//             href="/blogs"
//             className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-600 hover:to-cyan-600 shadow-lg transition-all duration-300 hover:shadow-xl"
//           >
//             View All Posts
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RecentPosts;
import React from 'react'

const RecentPosts = () => {
  return (
    <div>RecentPosts</div>
  )
}

export default RecentPosts