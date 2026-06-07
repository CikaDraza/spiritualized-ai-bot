import { redirect } from "next/navigation";

// Entry point goes through the auth gate: dashboard redirects to /login when unauthenticated.
export default function Page() {
  redirect("/dashboard");
}
