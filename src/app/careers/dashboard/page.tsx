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

export default function Dashboard() {
  return (
    <>
      <Background />
      <Header />
      <main className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <Link
              href="/careers"
              className="text-zen text-xs uppercase tracking-widest font-bold hover:underline inline-flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Careers
            </Link>
          </div>

          <div className="card-container p-8 sm:p-12 text-center">
            <div className="w-16 h-16 bg-zen/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faLock} className="text-2xl text-zen" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
              Applicant Dashboard
            </h1>
            <p className="text-gray-500 mb-8">
              The applicant dashboard is coming soon. You&apos;ll be able to track
              your applications and manage your profile here.
            </p>
            <Link
              href="/careers"
              className="btn-zen inline-flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faBriefcase} />
              View Open Positions
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

