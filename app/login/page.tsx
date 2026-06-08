"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { homeFor, loginSchema, type Role } from "@/types/auth";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      const next: { email?: string; password?: string } = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key === "email" || key === "password") next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.ok) {
        const data = (await res.json().catch(() => ({}))) as { role?: Role };
        toast.success("Welcome back.");
        router.push(homeFor(data.role ?? "client"));
        router.refresh();
        return;
      }
      toast.error(
        res.status === 401
          ? "Invalid email or password."
          : "Something went wrong. Please try again.",
      );
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex flex-1 flex-col px-[22px] pb-6 pt-2">
      <Link href="/" aria-label="Back" className="pt-2 text-ink">
        <ArrowLeft size={22} />
      </Link>
      <h1 className="mt-1.5 text-center text-[30px] font-extrabold">Sign In</h1>

      <form onSubmit={onSubmit} noValidate className="mt-8">
        <div>
          <label htmlFor="email" className="mb-2 block font-body text-[13px] font-semibold">
            Email Address
          </label>
          <div className="flex items-center gap-2.5 rounded-tile bg-card px-4 py-[15px]">
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent font-body text-[14px] text-ink outline-none placeholder:text-muted"
            />
            <Mail size={18} className="text-muted" />
          </div>
          {errors.email && (
            <p className="mt-1.5 font-body text-[12px] text-danger">{errors.email}</p>
          )}
        </div>

        <div className="mt-[18px]">
          <label htmlFor="password" className="mb-2 block font-body text-[13px] font-semibold">
            Password
          </label>
          <div className="flex items-center gap-2.5 rounded-tile bg-card px-4 py-[15px]">
            <input
              id="password"
              type={showPw ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent font-body text-[14px] text-ink outline-none placeholder:text-muted"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? "Hide password" : "Show password"}
              className="text-muted"
            >
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 font-body text-[12px] text-danger">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-[26px] flex w-full items-center justify-center gap-2 rounded-card bg-brand-gradient px-4 py-4 text-[15px] font-bold text-white shadow-soft disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Continue"}
        </button>
      </form>

      <p className="mt-[18px] text-center font-body text-[13px] text-muted2">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-bold text-primary">
          Create Account
        </Link>
      </p>

      {/* social — visual placeholders for now */}
      <div className="mt-6 flex items-center gap-3 font-body text-[13px] text-muted before:h-px before:flex-1 before:bg-line after:h-px after:flex-1 after:bg-line">
        Or
      </div>
      <div className="mt-5 flex justify-center gap-4" aria-hidden>
        {["G", "", "f"].map((s, i) => (
          <span
            key={i}
            className="grid h-[54px] w-[54px] place-items-center rounded-full bg-card font-body font-extrabold text-muted2 opacity-60"
          >
            {s}
          </span>
        ))}
      </div>
    </main>
  );
}
