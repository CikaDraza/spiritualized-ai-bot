import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Bell, Plus } from "lucide-react";

import BottomNav from "@/components/BottomNav";
import LogoutButton from "@/components/LogoutButton";
import { BACKEND_URL } from "@/lib/backend";
import type { UserProfile } from "@/types/auth";

const MAX_SPACES = 5;

function initials(name: string | null, email: string): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
}

export default async function LearningSpacesPage() {
  const cookieHeader = (await cookies()).toString();

  let res: Response | null = null;
  try {
    res = await fetch(`${BACKEND_URL}/auth/me`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });
  } catch {
    res = null;
  }
  if (!res || !res.ok) redirect("/login");

  const profile = (await res.json()) as UserProfile;
  const name = profile.full_name?.trim() || profile.email;

  return (
    <>
      <main className="flex flex-1 flex-col px-[22px] pt-3">
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="grid h-[46px] w-[46px] place-items-center rounded-full text-[16px] font-extrabold text-white"
              style={{ backgroundImage: "linear-gradient(135deg, #d9c8ff, #b79bff)" }}
            >
              {initials(profile.full_name, profile.email)}
            </div>
            <div>
              <div className="font-body text-[12px] text-muted2">Hi 👋</div>
              <div className="max-w-[180px] truncate text-[16px] font-extrabold">{name}</div>
            </div>
          </div>
          <button
            type="button"
            aria-label="Notifications"
            className="relative grid h-[46px] w-[46px] place-items-center rounded-full bg-white text-ink shadow-card"
          >
            <Bell size={20} />
            <span className="absolute right-3.5 top-3.5 h-[7px] w-[7px] rounded-full bg-primary" />
          </button>
        </div>

        {/* title */}
        <h1 className="mt-5 text-[26px] font-extrabold leading-tight">My Learning Spaces</h1>
        <p className="mt-1 font-body text-[12.5px] text-muted2">
          0 of {MAX_SPACES} spaces used
        </p>

        {/* empty space cards (create flow wired next) */}
        <div className="mt-[18px] flex flex-col gap-3">
          {Array.from({ length: MAX_SPACES }).map((_, i) => (
            <Link
              key={i}
              href="#"
              className="flex items-center justify-center gap-2 rounded-card border-2 border-dashed border-[#d7d3ec] py-[18px] font-bold text-primary"
            >
              <Plus size={18} />
              Start new space
            </Link>
          ))}
        </div>

        {/* temporary logout until Settings */}
        <div className="mt-6">
          <LogoutButton />
        </div>
      </main>

      <BottomNav active={0} />
    </>
  );
}
