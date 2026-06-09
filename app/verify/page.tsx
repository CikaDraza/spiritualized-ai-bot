import { Suspense } from "react";
import { Loader2 } from "lucide-react";

import VerifyClient from "./VerifyClient";

// Server wrapper: VerifyClient reads useSearchParams(), which must live under a Suspense
// boundary in the App Router so the rest of the route can still be prerendered.
export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 flex-col items-center justify-center px-[22px] py-20 text-center">
          <Loader2 size={44} className="animate-spin text-primary" />
          <h1 className="mt-5 text-[22px] font-extrabold">Verifying your email…</h1>
        </main>
      }
    >
      <VerifyClient />
    </Suspense>
  );
}
