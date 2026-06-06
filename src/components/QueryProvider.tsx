"use client";

import { ReactNode, useState } from "react";
import {
  HydrationBoundary,
  QueryClientProvider,
  type DehydratedState,
} from "@tanstack/react-query";
import { createQueryClient } from "@/lib/react-query";

export default function QueryProvider({
  children,
  dehydratedState,
}: {
  children: ReactNode;
  dehydratedState?: DehydratedState | null;
}) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
