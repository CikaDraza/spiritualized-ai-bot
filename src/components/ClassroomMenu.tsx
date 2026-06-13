"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Headphones,
  ListChecks,
  MessagesSquare,
  Mic,
  Pencil,
  Settings,
  TrendingUp,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

// Two-per-row classroom activities (design §7.7). Items with `href` navigate (relative to the
// space); the rest are placeholders → "coming soon" toast until their screen is built.
type Item = { Icon: LucideIcon; label: string; href?: string };

const ITEMS: Item[] = [
  { Icon: MessagesSquare, label: "Conversation", href: "conversation" },
  { Icon: Mic, label: "Speaking" },
  { Icon: Headphones, label: "Listening" },
  { Icon: BookOpen, label: "Reading" },
  { Icon: Pencil, label: "Writing" },
  { Icon: ListChecks, label: "Quizzes" },
  { Icon: TrendingUp, label: "Progress" },
  { Icon: UserRound, label: "Profile" },
];

const TILE = "flex min-h-[104px] flex-col gap-3.5 rounded-[18px] bg-card p-4 text-left";

function TileInner({ Icon, label }: { Icon: LucideIcon; label: string }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-tile bg-white text-primary shadow-tile">
          <Icon size={23} />
        </div>
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-ink">
          <ArrowUpRight size={16} />
        </div>
      </div>
      <div className="text-[15.5px] font-extrabold">{label}</div>
    </>
  );
}

export default function ClassroomMenu({ spaceId }: { spaceId: number }) {
  const soon = (label: string) => toast(`${label} — coming soon`);

  return (
    <>
      <div className="mt-[18px] grid grid-cols-2 gap-3.5">
        {ITEMS.map(({ Icon, label, href }) =>
          href ? (
            <Link key={label} href={`/app/spaces/${spaceId}/${href}`} className={TILE}>
              <TileInner Icon={Icon} label={label} />
            </Link>
          ) : (
            <button key={label} type="button" onClick={() => soon(label)} className={TILE}>
              <TileInner Icon={Icon} label={label} />
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={() => soon("Settings")}
        className="mt-3.5 flex w-full items-center gap-3 rounded-card bg-card p-4 text-left"
      >
        <div className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-tile bg-white text-primary shadow-tile">
          <Settings size={23} />
        </div>
        <div>
          <div className="text-[15px] font-bold">Settings</div>
          <div className="font-body text-[12.5px] text-muted">Voice, language, notifications</div>
        </div>
        <ChevronRight size={20} className="ml-auto text-muted" />
      </button>
    </>
  );
}
