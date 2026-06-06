"use client";

import QueryProvider from "@/components/QueryProvider";
import Dashboard from "@/components/Dashboard";
import StatusBanner from "@/components/StatusBanner";

export default function ClientApp() {
  return (
    <QueryProvider>
      <StatusBanner />
      <Dashboard />
    </QueryProvider>
  );
}
