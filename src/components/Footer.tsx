import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 sm:py-10 md:py-14 lg:py-16 px-4 sm:px-6 border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-10 lg:mb-14">
          {/* Brand - Full width on mobile */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-4 sm:space-y-5">
            <Link href="/" className="flex items-center">
              <div className="h-8 sm:h-9 md:h-10 w-auto relative">
                <Image
                  src="/footer_logo.png"
                  alt="Next Zen AI Strategix"
                  width={160}
                  height={40}
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 max-w-xs leading-relaxed">
              Driving digital transformation with enterprise-grade AI and
              technology solutions across USA and India.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-black flex items-center justify-center text-zen hover:bg-gray-900 transition-all"
              >
                <FontAwesomeIcon icon={faLinkedinIn} className="text-sm" />
              </a>
              <a
                href="#"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-black flex items-center justify-center text-zen hover:bg-gray-900 transition-all"
              >
                <FontAwesomeIcon icon={faGithub} className="text-sm" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-3 sm:space-y-4">
            <h5 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-black">
              Company
            </h5>
            <ul className="text-[11px] sm:text-[12px] md:text-[13px] font-medium space-y-2 sm:space-y-2.5 text-gray-500">
              <li>
                <a
                  href="#who-we-are"
                  className="hover:text-black transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  className="hover:text-black transition-colors"
                >
                  Why Next Zen
                </a>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-black transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-black transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3 sm:space-y-4">
            <h5 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-black">
              Services
            </h5>
            <ul className="text-[11px] sm:text-[12px] md:text-[13px] font-medium space-y-2 sm:space-y-2.5 text-gray-500">
              <li>
                <Link
                  href="/services/ai-strategy"
                  className="hover:text-black transition-colors"
                >
                  AI Strategy
                </Link>
              </li>
              <li>
                <Link
                  href="/services/cloud-infrastructure"
                  className="hover:text-black transition-colors"
                >
                  Cloud Infrastructure
                </Link>
              </li>
              <li>
                <Link
                  href="/services/cybersecurity"
                  className="hover:text-black transition-colors"
                >
                  Cybersecurity
                </Link>
              </li>
              <li>
                <Link
                  href="/services/software-development"
                  className="hover:text-black transition-colors"
                >
                  Custom Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Office Locations */}
          <div className="space-y-3 sm:space-y-4">
            <h5 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-black">
              Offices
            </h5>
            <div className="text-[11px] sm:text-[12px] md:text-[13px] font-medium space-y-4 text-gray-500">
              <div>
                <p className="text-black font-bold mb-1">USA</p>
                <p>97 Newkirk Street, Suite 341</p>
                <p>Jersey City, NJ 07306</p>
              </div>
              <div>
                <p className="text-black font-bold mb-1">India</p>
                <p>4th Floor, Aparna Astute</p>
                <p>Jubilee Hills, Hyderabad 500096</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-gray-200 gap-3 sm:gap-4">
          <p className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center sm:text-left order-2 sm:order-1">
            © 2025 NEXT ZEN AI STRATEGIX. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400 order-1 sm:order-2">
            <Link
              href="/privacy-policy"
              className="hover:text-black transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-black transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

