import Link from "next/link";
import { PlayCircle, LayoutGrid, Users, ArrowRight } from "lucide-react";
import RobotMascot from "@/components/RobotMascot";

const trio = [PlayCircle, LayoutGrid, Users];

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col px-[22px] pb-6 pt-4">
      {/* mini header */}
      <div className="flex items-center justify-between px-0.5 pt-1">
        <div className="leading-none">
          <div className="text-[18px] font-extrabold">Spiritualized</div>
          <div className="font-body text-[11px] font-semibold text-primary">
            Language Tutor
          </div>
        </div>
        <span className="rounded-pill bg-card px-3 py-1.5 font-body text-[12px] font-semibold text-muted2">
          EN · SR
        </span>
      </div>

      {/* robot mascot */}
      <div className="relative robot-stage flex-1">
        <div className="blob-bg" />
        <div className="blob-bg2" />
        <RobotMascot />
      </div>

      {/* three circular icon buttons */}
      <div className="flex justify-center gap-[18px]">
        {trio.map((Icon, i) => (
          <button
            key={i}
            type="button"
            className="grid h-[60px] w-[60px] place-items-center rounded-full bg-white text-primary shadow-card"
            aria-label="Explore"
          >
            <Icon size={24} />
          </button>
        ))}
      </div>

      {/* headline */}
      <div className="mt-6 flex flex-col items-center gap-2.5 text-center">
        <h1 className="text-[30px] font-extrabold leading-[1.08] -tracking-[0.01em]">
          Smart Bot Powers
          <br />
          Your Lessons
        </h1>
        <p className="max-w-[260px] font-body text-[13.5px] leading-[1.55] text-muted2">
          AI tutor te vodi, personalizuje lekcije i prati napredak — voice ili
          text.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-6 flex items-center gap-3">
        <Link
          href="/login"
          className="flex flex-1 items-center justify-center rounded-card bg-white px-4 py-4 text-[15px] font-extrabold text-primary shadow-card"
        >
          Start Learning
        </Link>
        <Link
          href="/login"
          aria-label="Start Learning"
          className="grid h-[54px] w-[54px] flex-none place-items-center rounded-full bg-brand-gradient text-white shadow-soft"
        >
          <ArrowRight size={22} />
        </Link>
      </div>
    </main>
  );
}
