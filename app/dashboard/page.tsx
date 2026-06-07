import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LogoutButton from "@/components/LogoutButton";
import { BACKEND_URL } from "@/lib/backend";
import type { UserProfile } from "@/types/auth";

export default async function DashboardPage() {
  const cookieHeader = (await cookies()).toString();
  const res = await fetch(`${BACKEND_URL}/auth/me`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });

  // No / invalid session → bounce to login.
  if (!res.ok) redirect("/login");

  const profile = (await res.json()) as UserProfile;

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 px-4 py-24">
      <h1 className="text-2xl font-semibold text-white">
        Welcome, {profile.email}
      </h1>
      <p className="text-slate-300">You are logged in.</p>
      <LogoutButton />
    </main>
  );
}
