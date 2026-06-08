import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { BACKEND_URL } from "@/lib/backend";
import type { UserProfile } from "@/types/auth";

/** Guards every /admin/* route: must be signed in AND have role "admin". */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
  if (profile.role !== "admin") redirect("/app");

  return <>{children}</>;
}
