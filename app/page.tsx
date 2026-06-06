import ClientApp from "@/components/ClientApp";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-xl shadow-slate-950/20">
          <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
                  Spiritualized
                </p>
                <h1 className="text-3xl font-semibold text-white">
                  Budi svoj produhovljeni jezički mentor
                </h1>
                <p className="mt-3 max-w-2xl text-slate-400">
                  Ovaj bot vodi razgovor na engleskom, objašnjava greške na
                  srpskom i pomaže ti da učiš kroz metafore, idiome i stil.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-4 text-sm text-slate-300 shadow-inner shadow-slate-950/10">
                <p className="font-semibold text-white">Status</p>
                <p className="mt-3 text-slate-400">
                  Uloguj se ili nastavi kao gost kako bi uživo testirao AI
                  mentora.
                </p>
              </div>
            </div>

            <div className="grid gap-4 rounded-3xl bg-slate-950 p-6 text-slate-300 shadow-inner shadow-slate-950/40 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-white">Fokus:</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-400">
                  <li>• napredna semantika i izbor reči</li>
                  <li>• kompleksna engleska sintaksa</li>
                  <li>• idiomi, frazalni glagoli, stvaran stil</li>
                  <li>• srpska objašnjenja za greške i mnemotehnike</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white">Kako koristiti:</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Unesi svoje pitanje, rečenicu ili kratki govor na engleskom.
                  Bot će ti dati pravila, korekciju i duhovni kontekst.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ClientApp />
      </main>
    </div>
  );
}
