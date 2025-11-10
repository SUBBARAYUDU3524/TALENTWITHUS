"use client";
import React from "react";

export default function LoadingSplash({ small }: { small?: boolean }) {
  return (
    <div
      className={`
        flex items-center justify-center
        ${small ? "h-32" : "h-screen"}
        w-full
      `}
    >
      <div className="animate-spin rounded-full border-4 border-blue-600 border-t-transparent 
        h-12 w-12
      " />
    </div>
  );
}
