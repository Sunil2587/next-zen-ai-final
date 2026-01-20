"use client";

export default function Spinner() {
  return (
    <div className="fixed inset-0 z-[200] bg-white flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-zen rounded-full animate-spin"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

