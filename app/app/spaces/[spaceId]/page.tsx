import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import DeleteSpaceButton from "@/components/DeleteSpaceButton";
import { BACKEND_URL } from "@/lib/backend";
import type { Space } from "@/types/space";

export default async function SpaceDetailPage({
  params,
}: {
  params: Promise<{ spaceId: string }>;
}) {
  const { spaceId } = await params;
  const cookieHeader = (await cookies()).toString();

  let res: Response | null = null;
  try {
    res = await fetch(`${BACKEND_URL}/spaces/${spaceId}`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });
  } catch {
    res = null;
  }
  // Unauthed requests are already redirected by proxy.ts; here a missing/foreign space -> 404.
  if (!res || !res.ok) notFound();

  const space = (await res.json()) as Space;

  return (
    <main className="flex flex-1 flex-col px-[22px] pt-2">
      <Link href="/app" aria-label="Back" className="pt-2 text-ink">
        <ArrowLeft size={22} />
      </Link>

      <h1 className="mt-4 text-[22px] font-extrabold">{space.title}</h1>
      <p className="mt-2 font-body text-[13.5px] text-muted2">Classroom coming soon.</p>

      <div className="mt-auto pb-6">
        <DeleteSpaceButton spaceId={space.id} />
      </div>
    </main>
  );
}
