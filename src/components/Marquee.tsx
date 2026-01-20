"use client";

import { useEffect, useRef } from "react";

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clone marquee content for infinite scroll effect
    if (containerRef.current) {
      const content = containerRef.current.querySelector(".marquee-content");
      if (content) {
        const clone = content.cloneNode(true);
        containerRef.current.appendChild(clone);
      }
    }
  }, []);

  return (
    <section className="py-5 sm:py-6 md:py-8 bg-gradient-to-r from-zen via-[#9aee76] to-zen overflow-hidden relative">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div
        ref={containerRef}
        className="flex whitespace-nowrap gap-10 sm:gap-16 md:gap-20 animate-scroll-fast relative z-10"
      >
        <div className="flex gap-10 sm:gap-16 md:gap-20 items-center marquee-content">
          <span className="text-[9px] sm:text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-black">
            Innovative & AI-First
          </span>
          <div className="w-2 h-2 rounded-full bg-black"></div>
          <span className="text-[9px] sm:text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-black">
            Fast & Agile Precision
          </span>
          <div className="w-2 h-2 rounded-full bg-black"></div>
          <span className="text-[9px] sm:text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-black">
            Enterprise Grade Security
          </span>
          <div className="w-2 h-2 rounded-full bg-black"></div>
          <span className="text-[9px] sm:text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-black">
            Measurable Business ROI
          </span>
        </div>
      </div>
    </section>
  );
}
