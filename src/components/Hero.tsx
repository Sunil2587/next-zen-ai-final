"use client";

import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isReversing = false;
    let intervalId: NodeJS.Timeout;

    const handleEnded = () => {
      // Video finished playing forward, start reversing
      isReversing = true;
      video.pause();
      
      intervalId = setInterval(() => {
        if (video.currentTime <= 0.1) {
          // Reached the beginning, play forward again
          clearInterval(intervalId);
          isReversing = false;
          video.currentTime = 0;
          video.play();
        } else {
          video.currentTime -= 0.05;
        }
      }, 30);
    };

    video.addEventListener("ended", handleEnded);

    // Start playing
    video.play().catch(() => {});

    return () => {
      video.removeEventListener("ended", handleEnded);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="max-w-2xl">
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
              Transform Your
              <br />
              <span className="text-zen">Business</span> with AI
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
              Strategic AI solutions that drive growth, efficiency, and innovation for forward-thinking organizations.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 px-6 py-4 bg-zen text-black font-bold text-xs uppercase tracking-wider hover:bg-zen-light transition-all"
              >
                Start a Project
                <FontAwesomeIcon 
                  icon={faArrowRight} 
                  className="group-hover:translate-x-1 transition-transform" 
                />
              </a>
              <a
                href="#what-we-do"
                className="inline-flex items-center justify-center px-6 py-4 border-2 border-white/30 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 hover:border-white/50 transition-all"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

