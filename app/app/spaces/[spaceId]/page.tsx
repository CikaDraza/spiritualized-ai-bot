import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ClassroomMenu from "@/components/ClassroomMenu";
import { BACKEND_URL } from "@/lib/backend";
import { classroomTitle } from "@/lib/scenario";
import type { Space } from "@/types/space";

export default async function ClassroomPage({
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
    <main className="flex flex-1 flex-col px-[22px] pb-8 pt-2">
      <div className="flex items-center gap-3 pt-1">
        <Link href="/app" aria-label="Back" className="text-ink">
          <ArrowLeft size={22} />
        </Link>
        <div>
          <div className="text-[19px] font-extrabold tracking-[-0.01em]">Classroom</div>
          <h2 className="font-body text-[16px] text-muted2">{classroomTitle(space)}</h2>
        </div>
      </div>

      <ClassroomMenu spaceId={space.id} />
    </main>
  );
}
