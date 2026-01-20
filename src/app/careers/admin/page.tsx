"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to careers page - auth not implemented yet
    router.push("/careers");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Spinner />
    </div>
  );
}

