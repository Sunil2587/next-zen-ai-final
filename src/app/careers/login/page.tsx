"use client";

import { Header, Footer, Background } from "@/components";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faBriefcase,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  return (
    <>
      <Background />
      <Header />
      <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <Link
              href="/careers"
              className="text-zen text-xs uppercase tracking-widest font-bold hover:underline inline-flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Careers
            </Link>
          </div>

          <div className="card-container p-8 sm:p-10 text-center">
            <div className="w-16 h-16 bg-zen/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faLock} className="text-2xl text-zen" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
              Sign In
            </h1>
            <p className="text-gray-500 mb-8">
              User authentication is coming soon. For now, please send your
              applications via email.
            </p>
            <div className="space-y-4">
              <Link
                href="/careers"
                className="btn-zen w-full flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faBriefcase} />
                View Open Positions
              </Link>
              <a
                href="mailto:hr@nextzenaistrategix.com"
                className="block w-full px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Contact HR
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

