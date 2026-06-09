"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export type VerificationStatus = "verifying" | "success" | "failed";

const FAIL_MESSAGE = "Verification link expired or invalid.";

/**
 * Drives the /verify page: reads the `token` query param, calls the BFF once, and reports a
 * status the UI renders. Fires a success/failed toast as a side effect, and redirects to /app
 * shortly after success. Must be used inside a <Suspense> boundary (useSearchParams).
 */
export function useEmailVerification(): VerificationStatus {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<VerificationStatus>("verifying");
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return; // guard against React StrictMode double-invoke
    ran.current = true;

    if (!token) {
      setStatus("failed");
      toast.error(FAIL_MESSAGE);
      return;
    }

    (async () => {
      try {
        const res = await fetch(`/api/auth/verify?token=${encodeURIComponent(token)}`);
        if (res.ok) {
          setStatus("success");
          toast.success("Email verified.");
          setTimeout(() => router.replace("/app"), 1500);
          return;
        }
        setStatus("failed");
        toast.error(FAIL_MESSAGE);
      } catch {
        setStatus("failed");
        toast.error(FAIL_MESSAGE);
      }
    })();
  }, [token, router]);

  return status;
}
