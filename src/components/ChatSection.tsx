"use client";

import type { RefObject } from "react";
import { Message, AuthProfile } from "@/types/chat";

type ChatSectionProps = {
  messages: Message[];
  input: string;
  loading: boolean;
  error: string | null;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  profile: AuthProfile | null;
  setInput: (value: string) => void;
  sendMessage: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function ChatSection({
  messages,
  input,
  loading,
  error,
  messagesEndRef,
  profile,
  setInput,
  sendMessage,
}: ChatSectionProps) {
  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">Razgovor</h2>
          <p className="text-sm text-slate-400">
            Napiši kratak tekst ili pitanje, a bot će ti vratiti refleksije i
            jezični savet.
          </p>
        </div>
        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
          {profile ? "Personalizovano" : "Anonimno"}
        </span>
      </div>

      <div className="mb-4 max-h-[58vh] space-y-4 overflow-y-auto pr-2 text-sm leading-7 text-slate-300">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`rounded-3xl p-4 shadow-sm ${
              message.role === "user"
                ? "bg-slate-800 text-slate-100 self-end"
                : "bg-slate-900/90 text-slate-200"
            }`}
          >
            <p className="text-[.86rem] font-medium uppercase tracking-[0.2em] text-slate-500">
              {message.role === "user" ? "Ti" : "Spiritualized"}
            </p>
            <p className="mt-2 whitespace-pre-wrap">{message.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="space-y-3">
        <label
          className="block text-sm font-medium text-slate-300"
          htmlFor="chat-input"
        >
          Unesi engleski tekst
        </label>
        <div className="flex gap-3">
          <textarea
            id="chat-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={3}
            className="min-h-[96px] w-full resize-none rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            placeholder="Write something in English..."
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-[56px] items-center justify-center rounded-3xl bg-cyan-400 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Pisanje..." : "Pošalji"}
          </button>
        </div>
        {error ? <p className="text-sm text-rose-400">{error}</p> : null}
      </form>
    </article>
  );
}
