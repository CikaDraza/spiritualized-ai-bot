import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Bell, BookOpen, Headphones, Mic, MessagesSquare } from "lucide-react";

import BottomNav from "@/components/BottomNav";
import LessonCard from "@/components/LessonCard";
import LogoutButton from "@/components/LogoutButton";
import { BACKEND_URL } from "@/lib/backend";
import type { UserProfile } from "@/types/auth";

function initials(name: string | null, email: string): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
}

const filters = ["All", "Speaking", "Reading", "Grammar"];

export default async function DashboardPage() {
  const cookieHeader = (await cookies()).toString();

  let res: Response | null = null;
  try {
    res = await fetch(`${BACKEND_URL}/auth/me`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });
  } catch {
    // Backend unreachable — treat as unauthenticated instead of crashing the page.
    res = null;
  }

  // No session / backend down / invalid → bounce to login.
  // (redirect() must stay OUTSIDE the try/catch: it works by throwing, and a catch would swallow it.)
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

        {/* headline */}
        <h1 className="mt-5 text-[30px] font-extrabold leading-[1.08]">
          Your Smart AI
          <br />
          Language Coach
        </h1>

        {/* filter pills (visual for now) */}
        <div className="mt-[18px] flex gap-2 overflow-x-auto">
          {filters.map((f, i) => (
            <span
              key={f}
              className={`whitespace-nowrap rounded-pill px-4 py-2.5 text-[13px] font-semibold ${
                i === 0 ? "bg-primary text-white" : "bg-card text-muted2"
              }`}
            >
              {f}
            </span>
          ))}
        </div>

        {/* lesson grid (placeholder content until wired) */}
        <div className="mt-[18px] grid grid-cols-2 gap-3.5">
          <LessonCard icon={BookOpen} title="Reading" meta="50% completed" />
          <LessonCard icon={Headphones} title="Listening" meta="40% completed" />
          <LessonCard icon={Mic} title="Speaking" meta="70% completed" />
          <LessonCard icon={MessagesSquare} title="Conversation" meta="80% completed" />
        </div>

        {/* temporary logout until Settings (7.13) exists */}
        <div className="mt-6">
          <LogoutButton />
        </div>
      </main>

      <BottomNav active={0} />
    </>
  );
}
