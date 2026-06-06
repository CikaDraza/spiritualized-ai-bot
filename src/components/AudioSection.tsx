"use client";

type AudioSectionProps = {
  isRecording: boolean;
  transcript: string;
  error: string | null;
  toggleRecording: () => void;
  speakLatestResponse: () => void;
};

export default function AudioSection({
  isRecording,
  transcript,
  error,
  toggleRecording,
  speakLatestResponse,
}: AudioSectionProps) {
  return (
    <aside className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/20">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-300">
        <p className="font-semibold text-white">Audio</p>
        <p className="mt-2 text-slate-400">
          Koristi glasovnu pretragu i reprodukciju da vežbaš engleski izgovor.
        </p>
        <div className="mt-4 flex flex-col gap-3">
          <button
            type="button"
            onClick={toggleRecording}
            className="rounded-3xl bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
          >
            {isRecording ? "Zaustavi snimanje" : "Snimaj govor"}
          </button>
          <button
            type="button"
            onClick={speakLatestResponse}
            className="rounded-3xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Reproduciraj poslednji odgovor
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-400">
          {isRecording
            ? "Slušam... govori sada."
            : transcript || "Transkript će se pojaviti ovde."}
        </p>
        {error ? <p className="mt-3 text-sm text-rose-400">{error}</p> : null}
      </div>
    </aside>
  );
}
