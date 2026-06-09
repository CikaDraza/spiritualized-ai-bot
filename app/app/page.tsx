import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Bell } from "lucide-react";

import BottomNav from "@/components/BottomNav";
import LogoutButton from "@/components/LogoutButton";
import ResendVerificationButton from "@/components/ResendVerificationButton";
import SpacesView from "@/components/SpacesView";
import { BACKEND_URL } from "@/lib/backend";
import type { UserProfile } from "@/types/auth";
import { MAX_SPACES, type Space } from "@/types/space";

function initials(name: string | null, email: string): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
}

export default async function LearningSpacesPage() {
  const cookieHeader = (await cookies()).toString();

  let meRes: Response | null = null;
  try {
    meRes = await fetch(`${BACKEND_URL}/auth/me`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });
  } catch {
    meRes = null;
  }
  if (!meRes || !meRes.ok) redirect("/login");
  const profile = (await meRes.json()) as UserProfile;

  // Spaces require a verified email on the backend (403 otherwise) — treat as empty.
  let spaces: Space[] = [];
  try {
    const r = await fetch(`${BACKEND_URL}/spaces`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });
    if (r.ok) spaces = (await r.json()) as Space[];
  } catch {
    spaces = [];
  }

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

        <h1 className="mt-5 text-[26px] font-extrabold leading-tight">My Learning Spaces</h1>
        <p className="mt-1 font-body text-[12.5px] text-muted2">
          {spaces.length} of {MAX_SPACES} spaces used
        </p>

        {!profile.is_verified && (
          <div className="mt-3 rounded-tile bg-primary-50 px-4 py-3 font-body text-[12.5px] text-primary-deep">
            Verify your email to start creating learning spaces.
            <div>
              <ResendVerificationButton />
            </div>
          </div>
        )}

        <SpacesView spaces={spaces} />

        <div className="mt-6">
          <LogoutButton />
        </div>
      </main>

      <BottomNav active={0} />
    </>
  );
}
