"use client";

import { FadeInUp } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClock } from "@fortawesome/free-solid-svg-icons";
import { articles } from "@/data/articles";
import Link from "next/link";

export default function WhatWeThink() {
  // Get latest 3 articles
  const latestArticles = articles.slice(0, 3);

  return (
    <section id="insights" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <FadeInUp>
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="inline-block bg-black text-white font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-[11px] mb-4 px-4 py-2 rounded-full">
              What We Think
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight mb-4 sm:mb-6">
              Insights & Thought Leadership
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-3xl mx-auto">
              Stay updated with the latest perspectives on AI, cloud infrastructure,
              cybersecurity, and digital transformation from our team of strategists.
            </p>
          </div>
        </FadeInUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {latestArticles.map((article, index) => (
            <FadeInUp key={index}>
              <Link href={`/insights/${article.slug}`} className="block h-full">
                <article className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 h-full flex flex-col hover:border-zen hover:shadow-md transition-all group cursor-pointer">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 bg-zen rounded-lg flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                      <FontAwesomeIcon icon={article.icon} className="text-xl" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-gray-100 px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-black mb-3 group-hover:text-gray-700 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-5 flex-grow line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>{article.date}</span>
                      <span className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faClock} />
                        {article.readTime}
                      </span>
                    </div>
                    <span className="text-black font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read
                      <FontAwesomeIcon icon={faArrowRight} className="text-zen" />
                    </span>
                  </div>
                </article>
              </Link>
            </FadeInUp>
          ))}
        </div>

        <FadeInUp>
          <div className="text-center mt-12 sm:mt-16">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md font-bold uppercase tracking-widest text-[10px] sm:text-[11px] hover:bg-gray-900 transition-all"
            >
              View All Insights
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

