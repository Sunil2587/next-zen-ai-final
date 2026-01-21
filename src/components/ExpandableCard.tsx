"use client";

import { useState, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface ExpandableCardProps {
  title: string;
  icon?: ReactNode;
  preview?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export default function ExpandableCard({
  title,
  icon,
  preview,
  children,
  defaultOpen = false,
  className = "",
}: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen ? "shadow-lg border-zen" : "hover:border-gray-300"
      } ${className}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {icon && (
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zen rounded-lg flex items-center justify-center text-black shrink-0">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-zen transition-colors truncate">
              {title}
            </h3>
            {preview && !isOpen && (
              <p className="text-xs text-gray-500 mt-1 truncate">{preview}</p>
            )}
          </div>
        </div>
        <div
          className={`w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 ml-3 transition-all duration-300 ${
            isOpen ? "rotate-180 bg-zen" : "group-hover:bg-gray-200"
          }`}
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`text-xs transition-colors ${isOpen ? "text-black" : "text-gray-500"}`}
          />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">{children}</div>
      </div>
    </div>
  );
}
