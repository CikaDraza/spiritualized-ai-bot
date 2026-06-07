"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onLogout() {
    setPending(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("You have been logged out.");
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Could not log out. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onLogout}
      disabled={pending}
      className="w-fit rounded-lg border border-slate-700 px-4 py-2 text-slate-200 transition-colors hover:bg-slate-800 disabled:opacity-60"
    >
      {pending ? "Logging out…" : "Logout"}
    </button>
  );
}
