import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// This callback page works for both Magic Link and OAuth
export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState("Processing...");

  useEffect(() => {
    if (!router.isReady) return;
    // Support both token (magic link) and code (OAuth)
    const { token, code, provider } = router.query;

    // Helper: Validate magic link
    const handleMagicLink = async () => {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/validate-magic-link`,
          { token },
          { withCredentials: true }
        );
        setStatus("Logged in! Redirecting...");
        router.replace("/dashboard");
      } catch (err) {
        setStatus("Invalid or expired link.");
        setTimeout(() => router.replace("/login?error=invalid_link"), 1500);
      }
    };

    // Helper: Exchange OAuth code
    const handleOAuth = async () => {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/oauth-callback`,
          { code, provider },
          { withCredentials: true }
        );
        setStatus("OAuth login success! Redirecting...");
        router.replace("/dashboard");
      } catch (err) {
        setStatus("OAuth login failed.");
        setTimeout(() => router.replace("/login?error=oauth_failed"), 1500);
      }
    };

    // Decide which flow
    if (token) handleMagicLink();
    else if (code && provider) handleOAuth();
    else setStatus("No valid token or code found.");
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        color: "#1976f7",
        fontWeight: 600,
        background: "#f8fafc"
      }}
    >
      {status}
    </div>
  );
}
