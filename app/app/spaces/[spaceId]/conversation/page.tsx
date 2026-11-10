import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import Conversation from "@/components/Conversation";
import { getBackendUrl } from "@/lib/backend";
import type { Space } from "@/types/space";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ spaceId: string }>;
}) {
  const { spaceId } = await params;
  const cookieHeader = (await cookies()).toString();

  let res: Response | null = null;
  try {
    res = await fetch(`${getBackendUrl()}/spaces/${spaceId}`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });
  } catch {
    res = null;
  }
  // proxy.ts handles auth; a missing/foreign space -> 404.
  if (!res || !res.ok) notFound();

  const space = (await res.json()) as Space;
  return <Conversation space={space} />;
}
