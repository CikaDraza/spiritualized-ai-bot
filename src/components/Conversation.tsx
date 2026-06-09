"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, SendHorizontal } from "lucide-react";
import { toast } from "sonner";

import { personaLabel, scenarioLabel } from "@/lib/scenario";
import type { Space } from "@/types/space";
import type { ChatMsg, TutorTurnResponse } from "@/types/tutor";

export default function Conversation({ space }: { space: Space }) {
  const tutor = personaLabel(space.persona);
  const scn = scenarioLabel(space.scenario_type);

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      content: `Hi! I'm ${tutor}. Let's practice ${scn}. Write me a message in English and I'll reply and help you improve.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);

  const endRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  async function send() {
    const text = input.trim();
    if (!text || sending) return;

    const history = messages; // prior turns as context for the orchestrator
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setSending(true);
    try {
      const res = await fetch("/api/tutor/turn", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message: text,
          history,
          persona: space.persona,
          scenario_id: space.id,
          session_id: sessionId,
        }),
      });
      if (!res.ok) {
        toast.error("Couldn't reach the tutor. Please try again.");
        return;
      }
      const data = (await res.json()) as TutorTurnResponse;
      setSessionId(data.session_id);
      setMessages((m) => [...m, { role: "assistant", content: data.assistant }]);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    void send();
  }

  return (
    <main className="flex flex-1 flex-col px-[22px] pt-2">
      {/* header */}
      <div className="flex items-center gap-3 pt-1">
        <Link href={`/app/spaces/${space.id}`} aria-label="Back" className="text-ink">
          <ArrowLeft size={22} />
        </Link>
        <div
          className="grid h-10 w-10 place-items-center rounded-full text-[15px] font-extrabold text-white"
          style={{ backgroundImage: "linear-gradient(135deg, #d9c8ff, #b79bff)" }}
        >
          {tutor.slice(0, 1)}
        </div>
        <div>
          <div className="text-[14px] font-extrabold">{tutor}</div>
          <div className="font-body text-[11px] text-success">● Online</div>
        </div>
      </div>

      {/* mode toggle — Text is live; Voice is coming soon */}
      <div className="mt-3.5 flex gap-1 rounded-full bg-card p-1">
        <div className="flex-1 rounded-full bg-white py-2 text-center text-[12px] font-bold text-primary shadow-card">
          Text
        </div>
        <button
          type="button"
          onClick={() => toast("Voice mode — coming soon")}
          className="flex-1 rounded-full py-2 text-center text-[12px] font-bold text-muted2"
        >
          Voice
        </button>
      </div>

      {/* messages */}
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto py-3.5">
        {messages.map((m, i) =>
          m.role === "assistant" ? (
            <div
              key={i}
              className="max-w-[78%] self-start rounded-[18px] rounded-bl-[6px] bg-card px-[15px] py-3 font-body text-[13.5px] leading-[1.5] text-ink"
            >
              {m.content}
            </div>
          ) : (
            <div
              key={i}
              className="max-w-[78%] self-end rounded-[18px] rounded-br-[6px] bg-brand-gradient px-[15px] py-3 font-body text-[13.5px] leading-[1.5] text-white"
            >
              {m.content}
            </div>
          ),
        )}
        {sending && (
          <div className="max-w-[78%] self-start rounded-[18px] rounded-bl-[6px] bg-card px-[15px] py-3 font-body text-[13.5px] text-muted2">
            {tutor} is typing…
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* composer */}
      <form onSubmit={onSubmit} className="flex items-center gap-2.5 pb-3 pt-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a message…"
          className="flex-1 rounded-full bg-card px-4 py-3 font-body text-[14px] text-ink outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          aria-label="Send"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-gradient text-white shadow-soft disabled:opacity-50"
        >
          <SendHorizontal size={18} />
        </button>
      </form>
    </main>
  );
}
