"use client";

import Link from "next/link";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

import { useEmailVerification } from "@/hooks/useEmailVerification";

export default function VerifyClient() {
  const status = useEmailVerification();

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-[22px] py-20 text-center">
      {status === "verifying" && (
        <>
          <Loader2 size={44} className="animate-spin text-primary" />
          <h1 className="mt-5 text-[22px] font-extrabold">Verifying your email…</h1>
        </>
      )}

      {status === "success" && (
        <>
          <CheckCircle2 size={44} className="text-success" />
          <h1 className="mt-5 text-[22px] font-extrabold">Email verified.</h1>
          <p className="mt-1.5 font-body text-[13px] text-muted2">
            Redirecting to your learning space…
          </p>
        </>
      )}

      {status === "failed" && (
        <>
          <XCircle size={44} className="text-danger" />
          <h1 className="mt-5 text-[22px] font-extrabold">
            Verification link expired or invalid.
          </h1>
          <Link
            href="/login"
            className="mt-6 rounded-card bg-brand-gradient px-6 py-3 text-[14px] font-bold text-white shadow-soft"
          >
            Back to login
          </Link>
        </>
      )}
    </main>
  );
}
