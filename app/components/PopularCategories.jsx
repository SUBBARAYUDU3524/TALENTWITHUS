"use client";
import React from "react";
import Link from "next/link";

const categories = [
  { title: "Fashion", image: "/assets/fashion.jpg", bg: "bg-pink-100" },
  { title: "Food", image: "/assets/fashion.jpg", bg: "bg-green-100" },
  { title: "Coding", image: "/assets/fashion.jpg", bg: "bg-purple-100" },
  { title: "Style", image: "/assets/fashion.jpg", bg: "bg-blue-100" },
  { title: "Travel", image: "/assets/fashion.jpg", bg: "bg-red-100" },
  { title: "Culture", image: "/assets/fashion.jpg", bg: "bg-yellow-100" },
];

const PopularCategories = () => {
  return (
    <div className="py-10 px-6 bg-black text-white">
      <div className="flex justify-between items-center mb-8 flex-wrap">
        <h2 className="text-3xl font-bold text-white text-center w-full mb-4">
          “Dive into Worlds That Inspire – Explore Our Popular Categories”
        </h2>
        <div className="w-full text-center">
          <Link
            href="/blogs"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Explore More →
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`w-40 h-28 rounded-xl ${cat.bg} flex flex-col items-center justify-center shadow-md hover:scale-105 transition-transform duration-300 hover:shadow-xl`}
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-12 h-12 rounded-full object-cover mb-2"
            />
            <span className="text-black font-medium">{cat.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
