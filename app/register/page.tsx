"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Mail, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { registerSchema } from "@/types/auth";

type FieldErrors = { name?: string; email?: string; password?: string };

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = registerSchema.safeParse({ name, email, password });
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key === "name" || key === "email" || key === "password") {
          next[key] = issue.message;
        }
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const payload: Record<string, string> = {
        email: parsed.data.email,
        password: parsed.data.password,
      };
      if (parsed.data.name?.trim()) payload.full_name = parsed.data.name.trim();

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { detail?: string };
      if (res.ok) {
        toast.success("Account created. Check your email to verify your account.");
        router.push("/dashboard");
        router.refresh();
        return;
      }
      toast.error(
        typeof data.detail === "string"
          ? data.detail
          : "Could not create account. Please try again.",
      );
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex flex-1 flex-col px-[22px] pb-5 pt-2">
      <Link href="/login" aria-label="Back" className="pt-2 text-ink">
        <ArrowLeft size={22} />
      </Link>
      <h1 className="mt-1.5 text-center text-[30px] font-extrabold">Create Account</h1>

      <form onSubmit={onSubmit} noValidate className="mt-7">
        <div>
          <label htmlFor="name" className="mb-2 block font-body text-[13px] font-semibold">
            Full Name <span className="text-muted">(optional)</span>
          </label>
          <div className="flex items-center gap-2.5 rounded-tile bg-card px-4 py-[15px]">
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Alice Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent font-body text-[14px] text-ink outline-none placeholder:text-muted"
            />
            <User size={18} className="text-muted" />
          </div>
          {errors.name && (
            <p className="mt-1.5 font-body text-[12px] text-danger">{errors.name}</p>
          )}
        </div>

        <div className="mt-[18px]">
          <label htmlFor="email" className="mb-2 block font-body text-[13px] font-semibold">
            Email Address
          </label>
          <div className="flex items-center gap-2.5 rounded-tile bg-card px-4 py-[15px]">
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="alice@email.com"
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
              autoComplete="new-password"
              placeholder="At least 8 characters"
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
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-card bg-brand-gradient px-4 py-4 text-[15px] font-bold text-white shadow-soft disabled:opacity-60"
        >
          {submitting ? "Creating…" : "Create Account"}
        </button>
      </form>

      <p className="mt-auto pt-5 text-center font-body text-[13px] text-muted2">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-primary">
          Sign In
        </Link>
      </p>
    </main>
  );
}
