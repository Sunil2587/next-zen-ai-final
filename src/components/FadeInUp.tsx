"use client";

import { useEffect, useRef, ReactNode } from "react";

interface FadeInUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function FadeInUp({ children, className = "", delay = 0 }: FadeInUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => {
                entry.target.classList.add("visible");
              }, delay);
            } else {
              entry.target.classList.add("visible");
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div ref={ref} className={`fade-in-up ${className}`}>
      {children}
    </div>
  );
}

