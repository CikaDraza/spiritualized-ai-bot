"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

/** Temporary logout entry on the dashboard until Settings (7.13) is built. */
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
      className="flex w-full items-center justify-center gap-2 rounded-card bg-card px-4 py-3.5 text-[14px] font-bold text-danger disabled:opacity-60"
    >
      <LogOut size={18} />
      {pending ? "Logging out…" : "Log out"}
    </button>
  );
}
