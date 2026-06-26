import { useMutation } from "@tanstack/react-query";

import { fetcher } from "@/lib/fetcher";
import {
  sessionSummarySchema,
  type SessionCompleteInput,
  type SessionSummary,
} from "@/types/session";

// Posts the finished session to the BFF and Zod-validates the returned summary before it reaches
// the UI (single source of truth = the parsed SessionSummary).
export function useSessionComplete() {
  return useMutation<SessionSummary, Error, SessionCompleteInput>({
    mutationFn: async (input) => {
      const data = await fetcher<unknown>("/api/tutor/session/complete", {
        method: "POST",
        body: JSON.stringify(input),
      });
      return sessionSummarySchema.parse(data);
    },
  });
}
