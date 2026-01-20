"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (session) {
        // Get the return URL from localStorage or default to careers
        const returnUrl = localStorage.getItem("authReturnUrl") || "/careers";
        localStorage.removeItem("authReturnUrl");
        router.push(returnUrl);
      } else {
        // If no session, redirect to careers
        router.push("/careers");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <FontAwesomeIcon icon={faSpinner} className="text-4xl text-zen animate-spin mb-4" />
        <p className="text-gray-500">Signing you in...</p>
      </div>
    </div>
  );
}

