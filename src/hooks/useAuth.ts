"use client";

import { FormEvent, useEffect, useState } from "react";
import { fetcher } from "@/lib/fetcher";
import { AuthMode, AuthProfile } from "@/types/chat";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000";
const TOKEN_STORAGE_KEY = "spiritualized_access_token";

export type UseAuth = {
  authMode: AuthMode;
  authEmail: string;
  authPassword: string;
  authName: string;
  accessToken: string | null;
  profile: AuthProfile | null;
  authError: string | null;
  setAuthMode: (mode: AuthMode) => void;
  setAuthEmail: (value: string) => void;
  setAuthPassword: (value: string) => void;
  setAuthName: (value: string) => void;
  handleAuthSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  logout: () => void;
};

function getAuthError(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

export function useAuth(): UseAuth {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      setAccessToken(token);
      void fetchProfile(token);
    }
  }, []);

  async function fetchProfile(token: string) {
    try {
      const profileData = await fetcher<AuthProfile>(`${BACKEND_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(profileData);
      setAuthError(null);
    } catch (error) {
      setProfile(null);
      setAccessToken(null);
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
      setAuthError("Neuspešna autorizacija. Uloguj se ponovo.");
    }
  }

  function saveToken(token: string) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
    setAccessToken(token);
  }

  async function handleAuthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError(null);

    if (!authEmail || !authPassword || (authMode === "register" && !authName)) {
      setAuthError("Popuni sve potrebne podatke.");
      return;
    }

    const endpoint = authMode === "register" ? "register" : "login";
    const body: Record<string, string> = {
      email: authEmail,
      password: authPassword,
    };

    if (authMode === "register") {
      body.full_name = authName;
    }

    try {
      const data = await fetcher<{ access_token: string }>(
        `${BACKEND_URL}/auth/${endpoint}`,
        {
          method: "POST",
          body: JSON.stringify(body),
        },
      );

      saveToken(data.access_token);
      await fetchProfile(data.access_token);
      setAuthEmail("");
      setAuthPassword("");
      setAuthName("");
      setAuthError(null);
    } catch (error) {
      setAuthError(getAuthError(error));
    }
  }

  function logout() {
    setAccessToken(null);
    setProfile(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }

  return {
    authMode,
    authEmail,
    authPassword,
    authName,
    accessToken,
    profile,
    authError,
    setAuthMode,
    setAuthEmail,
    setAuthPassword,
    setAuthName,
    handleAuthSubmit,
    logout,
  };
}
