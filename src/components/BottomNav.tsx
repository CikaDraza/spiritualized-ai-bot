import Link from "next/link";
import { Home, CalendarDays, MessageCircle, User } from "lucide-react";

const items = [
  { icon: Home, href: "/dashboard", label: "Home" },
  { icon: CalendarDays, href: "#", label: "Schedule" },
  { icon: MessageCircle, href: "#", label: "Chat" },
  { icon: User, href: "#", label: "Profile" },
];

/** 4-icon bottom navigation; the active item sits in a gradient circle with a glow. */
export default function BottomNav({ active = 0 }: { active?: number }) {
  return (
    <nav className="mt-auto flex items-center justify-around px-6 pb-6 pt-3">
      {items.map((item, i) => {
        const Icon = item.icon;
        const isActive = i === active;
        return (
          <Link
            key={item.label}
            href={item.href}
            aria-label={item.label}
            className={`grid h-11 w-11 place-items-center rounded-full ${
              isActive
                ? "bg-brand-gradient text-white shadow-soft"
                : "text-muted"
            }`}
          >
            <Icon size={22} />
          </Link>
        );
      })}
    </nav>
  );
}
