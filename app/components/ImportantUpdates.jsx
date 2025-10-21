import React from "react";
import Link from "next/link";

const updateData = {
  Notifications: [
    {
      id: 1,
      title: "SBI Clerk Mains Result 2025, Junior Associates Final Result PDF",
      image: "/assets/fashion.jpg",
      summary: `Artificial Intelligence is changing how we live, work, and play. Discover how AI is embedded in our lives and shaping the future across industries and experiences.`,
      date: "June 1, 2025",
    },
    {
      id: 2,
      title:
        "JCI Result 2025, Jute Corporation of India Merit List and Result PDF",
      image: "/assets/fashion.jpg",
      summary: `Artificial Intelligence is changing how we live, work, and play. Discover how AI is embedded in our lives and shaping the future across industries and experiences.`,
      date: "June 1, 2025",
    },
    {
      id: 3,
      title: "Assam SLET Result 2025, Merit List and Result PDF",
      image: "/assets/fashion.jpg",
      summary: `Artificial Intelligence is changing how we live, work, and play. Discover how AI is embedded in our lives and shaping the future across industries and experiences.`,
      date: "May 30, 2025",
    },
  ],
  "Admit Cards": [
    {
      id: 4,
      title: "MP TET Varg 2 Result 2025, Score Card and Result Link",
      image: "/assets/fashion.jpg",
      summary: `Artificial Intelligence is changing how we live, work, and play. Discover how AI is embedded in our lives and shaping the future across industries and experiences.`,
      date: "May 29, 2025",
    },
    {
      id: 5,
      title:
        "Rajasthan Cooperative Bank Result 2025, Merit List and Result PDF",
      image: "/assets/fashion.jpg",
      summary: `Artificial Intelligence is changing how we live, work, and play. Discover how AI is embedded in our lives and shaping the future across industries and experiences.`,
      date: "May 28, 2025",
    },
  ],
  Results: [
    {
      id: 6,
      title:
        "Bihar Police SI Prohibition Result 2025 Out, Cut Off Marks and Result PDF",
      image: "/assets/fashion.jpg",
      summary: `Artificial Intelligence is changing how we live, work, and play. Discover how AI is embedded in our lives and shaping the future across industries and experiences.`,
      date: "May 27, 2025",
    },
  ],
};

const ImportantUpdates = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#0a183d] via-[#0a0a0a] to-[#1a1a1a] text-white py-12 px-4 sm:px-8 rounded-3xl shadow-2xl ring-1 ring-cyan-900/30 overflow-hidden">
      {/* Decorative Background Elements */}
      <span className="absolute top-0 left-0 w-32 h-32 bg-cyan-700/10 rounded-full blur-2xl z-0"></span>
      <span className="absolute bottom-0 right-0 w-40 h-40 bg-pink-400/10 rounded-full blur-3xl z-0"></span>
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center leading-tight mb-10 bg-gradient-to-r from-cyan-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-cyan">
          Latest Notifications &amp; Important Updates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(updateData).map(([category, items]) => (
            <div
              key={category}
              className="bg-[#232c47] rounded-2xl p-6 shadow-xl border border-cyan-800/30 hover:shadow-cyan-700/30 transition-all duration-200 group "
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-cyan-300 group-hover:text-pink-400 transition-colors">
                <span className="inline-block w-2 h-2 rounded-full bg-pink-400 animate-pulse "></span>
                {category}
              </h3>
              <ul className="space-y-5">
                {items.map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    <div className="flex-1">
                      <Link
                        href={{
                          pathname: `/blogs/${item.id}`,
                          query: { blog: JSON.stringify(item) },
                        }}
                        className="block font-medium text-lg text-cyan-300 group-hover:text-pink-300 transition-colors hover:underline mb-1"
                      >
                        {item.title}
                      </Link>
                      <div className="text-xs text-gray-400 mb-1">
                        {item.date}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImportantUpdates;
