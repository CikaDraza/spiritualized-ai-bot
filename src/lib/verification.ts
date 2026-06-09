import { toast } from "sonner";

/**
 * Ask the backend to (re)send the verification email for the signed-in user, then toast the
 * outcome. Used by the create-space 403 toast action and the unverified banner button.
 */
export async function resendVerification(): Promise<void> {
  try {
    const res = await fetch("/api/auth/resend-verification", { method: "POST" });
    const data = (await res.json().catch(() => ({}))) as { status?: string };
    if (res.ok && data.status === "already_verified") {
      toast.success("Your email is already verified.");
      return;
    }
    if (res.ok) {
      toast.success("Check your email for the verification link.");
      return;
    }
    toast.error("Couldn't send the link. Please try again.");
  } catch {
    toast.error("Network error. Please try again.");
  }
}
