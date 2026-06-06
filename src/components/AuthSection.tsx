"use client";

import type { FormEvent } from "react";
import { AuthMode, AuthProfile } from "@/types/chat";

type AuthSectionProps = {
  authMode: AuthMode;
  authEmail: string;
  authPassword: string;
  authName: string;
  profile: AuthProfile | null;
  authError: string | null;
  setAuthMode: (mode: AuthMode) => void;
  setAuthEmail: (value: string) => void;
  setAuthPassword: (value: string) => void;
  setAuthName: (value: string) => void;
  handleAuthSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  logout: () => void;
};

export default function AuthSection({
  authMode,
  authEmail,
  authPassword,
  authName,
  profile,
  authError,
  setAuthMode,
  setAuthEmail,
  setAuthPassword,
  setAuthName,
  handleAuthSubmit,
  logout,
}: AuthSectionProps) {
  return (
    <aside className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Autentifikacija
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Registruj se ili uloguj da bi čuvao razgovore i koristio
                personalizovani mentor.
              </p>
            </div>
            <div className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              {authMode === "login" ? "Prijava" : "Registracija"}
            </div>
          </div>
        </div>

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <div className="grid gap-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className={`flex-1 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                  authMode === "login"
                    ? "bg-cyan-400 text-slate-950"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                Prijava
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("register")}
                className={`flex-1 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                  authMode === "register"
                    ? "bg-cyan-400 text-slate-950"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                Registracija
              </button>
            </div>

            {authMode === "register" ? (
              <input
                value={authName}
                onChange={(event) => setAuthName(event.target.value)}
                placeholder="Puno ime"
                className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                required
              />
            ) : null}

            <input
              type="email"
              value={authEmail}
              onChange={(event) => setAuthEmail(event.target.value)}
              placeholder="Email"
              className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              required
            />
            <input
              type="password"
              value={authPassword}
              onChange={(event) => setAuthPassword(event.target.value)}
              placeholder="Šifra"
              className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-3xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            {authMode === "login" ? "Prijavi se" : "Napravi nalog"}
          </button>
          {authError ? (
            <p className="text-sm text-rose-400">{authError}</p>
          ) : null}
        </form>

        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-4 text-sm text-slate-300 shadow-inner shadow-slate-950/10">
          <p className="font-semibold text-white">Status</p>
          {profile ? (
            <div className="mt-3 space-y-1">
              <p>
                Ulogovan kao{" "}
                <span className="font-medium text-cyan-300">
                  {profile.email}
                </span>
              </p>
              {profile.full_name ? <p>Ime: {profile.full_name}</p> : null}
              <button
                type="button"
                onClick={logout}
                className="mt-3 inline-flex rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Odjavi se
              </button>
            </div>
          ) : (
            <p className="mt-3 text-slate-400">
              Niste prijavljeni. Registruj se ili uloguj za personalizovano
              iskustvo.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
