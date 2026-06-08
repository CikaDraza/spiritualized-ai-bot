import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  meta?: string;
};

/** Lesson/skill card: icon tile top-left, arrow top-right, title + meta below. */
export default function LessonCard({ icon: Icon, title, meta }: Props) {
  return (
    <div className="flex min-h-[128px] flex-col gap-3.5 rounded-[18px] bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="grid h-[46px] w-[46px] place-items-center rounded-tile bg-white text-primary shadow-tile">
          <Icon size={23} />
        </div>
        <div className="grid h-8 w-8 place-items-center rounded-full bg-white text-ink">
          <ArrowUpRight size={16} />
        </div>
      </div>
      <div>
        <div className="text-[15.5px] font-extrabold leading-tight">{title}</div>
        {meta && <div className="mt-0.5 font-body text-[12px] text-muted">{meta}</div>}
      </div>
    </div>
  );
}
