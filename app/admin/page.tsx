import type { LucideIcon } from "lucide-react";
import {
  Shield,
  Users,
  LayoutGrid,
  GraduationCap,
  Bot,
  ListChecks,
  BarChart3,
  Settings,
  ChevronRight,
} from "lucide-react";

import BottomNav from "@/components/BottomNav";
import LogoutButton from "@/components/LogoutButton";

type Section = { icon: LucideIcon; title: string; meta: string };

// Management sections (wired one-by-one later).
const sections: Section[] = [
  { icon: Users, title: "Users", meta: "Students & roles" },
  { icon: LayoutGrid, title: "Scenarios", meta: "Business, Travel, Shopping…" },
  { icon: GraduationCap, title: "Lessons", meta: "Reading, Listening, Speaking…" },
  { icon: Bot, title: "Tutor Personas", meta: "Mila, Viktor, Nora, Maria" },
  { icon: ListChecks, title: "Quizzes", meta: "A1–C1 question banks" },
  { icon: BarChart3, title: "System usage", meta: "Progress & activity" },
  { icon: Settings, title: "Settings", meta: "Difficulty & prompt rules" },
];

export default function AdminDashboardPage() {
  return (
    <>
      <main className="flex flex-1 flex-col px-[22px] pt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[19px] font-extrabold">Manage</h1>
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-ink px-3 py-1.5 font-body text-[11px] font-bold text-white">
            <Shield size={13} />
            Admin
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-2.5">
          {sections.map(({ icon: Icon, title, meta }) => (
            <div
              key={title}
              className="flex items-center gap-3.5 rounded-tile bg-card px-3.5 py-3.5"
            >
              <div className="grid h-10 w-10 place-items-center rounded-[11px] bg-white text-primary shadow-tile">
                <Icon size={19} />
              </div>
              <div className="min-w-0">
                <div className="text-[14px] font-bold">{title}</div>
                <div className="truncate font-body text-[11.5px] text-muted">{meta}</div>
              </div>
              <ChevronRight size={20} className="ml-auto text-muted" />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <LogoutButton />
        </div>
      </main>

      <BottomNav active={0} />
    </>
  );
}
