"use client";

import { useState } from "react";

import { resendVerification } from "@/lib/verification";

export default function ResendVerificationButton() {
  const [pending, setPending] = useState(false);

  async function onClick() {
    setPending(true);
    try {
      await resendVerification();
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className="mt-2 font-body text-[12.5px] font-bold text-primary underline disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send verification link"}
    </button>
  );
}
