"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-[100] bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center group cursor-pointer">
          <div className="h-8 md:h-10 w-auto relative">
            <Image
              src="/logo.png"
              alt="Next Zen AI Strategix"
              width={180}
              height={40}
              className="h-full w-auto object-contain"
              priority
            />
          </div>
        </Link>

        <nav className="hidden lg:flex items-center space-x-8">
          <a
            href="#what-we-do"
            className="nav-link text-gray-400 hover:text-white transition-colors"
          >
            What We Do
          </a>
          <a
            href="#who-we-are"
            className="nav-link text-gray-400 hover:text-white transition-colors"
          >
            Who We Are
          </a>
          <a
            href="#industries"
            className="nav-link text-gray-400 hover:text-white transition-colors"
          >
            Industries
          </a>
          <a
            href="#why-us"
            className="nav-link text-gray-400 hover:text-white transition-colors"
          >
            Why Us
          </a>
          <Link
            href="/insights"
            className="nav-link text-gray-400 hover:text-white transition-colors"
          >
            Insights
          </Link>
          <Link
            href="/careers"
            className="nav-link text-gray-400 hover:text-white transition-colors"
          >
            Careers
          </Link>
          <div className="h-5 w-px bg-gray-700"></div>
          <a href="#contact" className="px-5 py-2.5 bg-zen text-black rounded-md font-bold uppercase tracking-widest text-[10px] hover:brightness-110 transition-all">
            Contact Us
          </a>
        </nav>

        <div className="flex items-center space-x-4 lg:hidden">
          <button
            className="text-white text-2xl p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBarsStaggered} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-gray-800 transition-all duration-300 ease-out ${
          mobileMenuOpen 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col p-6 space-y-1">
          <a
            href="#what-we-do"
            className="text-gray-300 hover:text-white hover:bg-white/5 py-3 px-4 rounded-lg transition-all font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            What We Do
          </a>
          <a
            href="#who-we-are"
            className="text-gray-300 hover:text-white hover:bg-white/5 py-3 px-4 rounded-lg transition-all font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Who We Are
          </a>
          <a
            href="#industries"
            className="text-gray-300 hover:text-white hover:bg-white/5 py-3 px-4 rounded-lg transition-all font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Industries
          </a>
          <a
            href="#why-us"
            className="text-gray-300 hover:text-white hover:bg-white/5 py-3 px-4 rounded-lg transition-all font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Why Us
          </a>
          <Link
            href="/insights"
            className="text-gray-300 hover:text-white hover:bg-white/5 py-3 px-4 rounded-lg transition-all font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Insights
          </Link>
          <Link
            href="/careers"
            className="text-gray-300 hover:text-white hover:bg-white/5 py-3 px-4 rounded-lg transition-all font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Careers
          </Link>
          <div className="pt-4 mt-2 border-t border-gray-800">
            <a
              href="#contact"
              className="block text-center px-5 py-3.5 bg-zen text-black rounded-lg font-bold uppercase tracking-widest text-[11px] hover:brightness-110 transition-all shadow-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </a>
          </div>
        </nav>
      </div>
      </header>
      {/* Gradient fade from navbar to content */}
      <div className="fixed top-16 md:top-20 left-0 right-0 h-8 bg-gradient-to-b from-black/20 to-transparent pointer-events-none z-[99]" />
    </>
  );
}
