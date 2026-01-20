"use client";

import { useState, useEffect } from "react";
import { Header, Footer, Background, FadeInUp } from "@/components";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClock, faSpinner } from "@fortawesome/free-solid-svg-icons";
import {
  faBrain,
  faCloud,
  faShieldHalved,
  faRobot,
  faDatabase,
  faChartLine,
  faCode,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { getArticles, getArticleCategories, Article } from "@/lib/supabase";

// Icon mapping for dynamic icons
const iconMap: Record<string, typeof faBrain> = {
  faBrain,
  faCloud,
  faShieldHalved,
  faRobot,
  faDatabase,
  faChartLine,
  faCode,
  faLightbulb,
};

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [articlesRes, categoriesRes] = await Promise.all([
        getArticles(),
        getArticleCategories(),
      ]);

      if (articlesRes.data) {
        setArticles(articlesRes.data);
      }
      if (categoriesRes.categories) {
        setCategories(categoriesRes.categories);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  const featuredInsights = filteredArticles.filter((i) => i.featured);
  const regularInsights = filteredArticles.filter((i) => !i.featured);

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || faBrain;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Background />
      <Header />
      <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <Link
              href="/"
              className="text-gray-500 text-xs uppercase tracking-widest font-bold hover:text-black transition-colors"
            >
              ← Back to Home
            </Link>
          </div>

          {/* Hero Section */}
          <FadeInUp>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block bg-black text-white font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[9px] sm:text-[10px] mb-4 px-4 py-2 rounded-full">
                Insights & Research
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-black mb-4 sm:mb-6 tracking-tight">
                Thought Leadership
              </h1>
              <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto px-4">
                Expert perspectives on AI, cloud infrastructure, cybersecurity,
                and digital transformation from Next Zen AI Strategix.
              </p>
            </div>
          </FadeInUp>

          {/* Categories */}
          <FadeInUp>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16 px-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 sm:px-4 py-2 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
                    activeCategory === category
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-black border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </FadeInUp>

          {loading ? (
            <div className="text-center py-20">
              <FontAwesomeIcon icon={faSpinner} className="text-4xl text-zen animate-spin" />
              <p className="text-gray-500 mt-4">Loading articles...</p>
            </div>
          ) : (
            <>
              {/* Featured Insights */}
              {featuredInsights.length > 0 && (
                <FadeInUp>
                  <section className="mb-12 sm:mb-16">
                    <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400 mb-6 sm:mb-8">
                      Featured Articles
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      {featuredInsights.map((insight) => (
                        <Link href={`/insights/${insight.slug}`} key={insight.id}>
                          <article className="bg-gray-50 border border-gray-200 rounded-lg p-5 sm:p-8 group cursor-pointer h-full hover:border-zen hover:shadow-md transition-all">
                            <div className="flex flex-wrap items-start gap-3 sm:gap-5 mb-4 sm:mb-6">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zen rounded-lg flex items-center justify-center text-black shrink-0 group-hover:bg-black group-hover:text-zen transition-all">
                                <FontAwesomeIcon
                                  icon={getIcon(insight.icon)}
                                  className="text-lg sm:text-xl"
                                />
                              </div>
                              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-black bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                                {insight.category}
                              </span>
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2 sm:mb-3 group-hover:text-gray-700 transition-colors">
                              {insight.title}
                            </h3>
                            <p className="text-gray-500 text-sm mb-4 sm:mb-6 leading-relaxed line-clamp-3">
                              {insight.excerpt}
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-400">
                                <span>{formatDate(insight.published_date)}</span>
                                <span className="flex items-center gap-1">
                                  <FontAwesomeIcon icon={faClock} />
                                  {insight.read_time}
                                </span>
                              </div>
                              <span className="text-black text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                                Read More
                                <FontAwesomeIcon icon={faArrowRight} className="text-zen" />
                              </span>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </section>
                </FadeInUp>
              )}

              {/* Regular Insights */}
              {regularInsights.length > 0 && (
                <FadeInUp>
                  <section>
                    <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400 mb-6 sm:mb-8">
                      Latest Articles
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {regularInsights.map((insight) => (
                        <Link href={`/insights/${insight.slug}`} key={insight.id}>
                          <article className="bg-gray-50 border border-gray-200 rounded-lg p-5 sm:p-6 group cursor-pointer h-full hover:border-zen hover:shadow-md transition-all">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-black rounded-md flex items-center justify-center text-zen group-hover:bg-zen group-hover:text-black transition-all">
                                <FontAwesomeIcon icon={getIcon(insight.icon)} />
                              </div>
                              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-gray-500">
                                {insight.category}
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-black mb-2 group-hover:text-gray-700 transition-colors line-clamp-2">
                              {insight.title}
                            </h3>
                            <p className="text-gray-500 text-xs mb-4 leading-relaxed line-clamp-3">
                              {insight.excerpt}
                            </p>
                            <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] text-gray-400">
                              <span>{formatDate(insight.published_date)}</span>
                              <span>•</span>
                              <span>{insight.read_time}</span>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </section>
                </FadeInUp>
              )}

              {/* No Results */}
              {filteredArticles.length === 0 && (
                <FadeInUp>
                  <div className="text-center py-16 sm:py-20">
                    <p className="text-gray-500 text-lg">
                      No articles found in this category.
                    </p>
                  </div>
                </FadeInUp>
              )}
            </>
          )}

          {/* Newsletter CTA */}
          <FadeInUp>
            <section className="mt-16 sm:mt-24">
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-zen/15 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-zen/10 rounded-full blur-3xl" />
                <div className="relative z-10 p-8 sm:p-10 md:p-16 text-center">
                  <span className="inline-block bg-zen text-black font-bold uppercase tracking-[0.2em] text-[10px] mb-4 px-4 py-2 rounded-full">
                    Newsletter
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4">
                    Stay Ahead of the Curve
                  </h2>
                  <p className="text-gray-500 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">
                    Subscribe to our newsletter for the latest insights on AI,
                    cloud, and enterprise technology delivered to your inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-black placeholder:text-gray-400 focus:outline-none focus:border-zen focus:ring-2 focus:ring-zen/20 transition-all"
                    />
                    <button className="px-6 py-3 bg-black text-white rounded-full font-bold uppercase tracking-widest text-[10px] sm:text-[11px] hover:bg-gray-800 transition-all shadow-md hover:shadow-lg whitespace-nowrap">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </FadeInUp>
        </div>
      </main>
      <Footer />
    </>
  );
}
