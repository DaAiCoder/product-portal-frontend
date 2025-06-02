// /pages/Login.js

import React, { useState, useEffect } from "react";

const backgrounds = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80"
];

export default function Login() {
  const [bg, setBg] = useState(backgrounds[0]);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setBg(b => {
        const i = backgrounds.indexOf(b);
        return backgrounds[(i + 1) % backgrounds.length];
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleMagicLink = e => {
    e.preventDefault();
    setMsg("Magic link sent! (demo)");
  };

  // Prevent stacking on mobile: force horizontal scroll
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
        minWidth: 320
      }}
    >
      {/* Left: Login form */}
      <div
        style={{
          width: "50vw",
          minWidth: 320,
          height: "100vh",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <form
          style={{ width: "100%", maxWidth: 330, margin: "0 auto" }}
          onSubmit={handleMagicLink}
        >
          <h2 style={{ fontWeight: 700, fontSize: 30, marginBottom: 32, color: "#1976f7" }}>
            Sign in to Gime
          </h2>
          <input
            type="email"
            placeholder="Email"
            style={{
              width: "100%",
              fontSize: 18,
              padding: "12px 0",
              border: "none",
              borderBottom: "2px solid #d1d5db",
              background: "#fff",
              marginBottom: 30,
              outline: "none"
            }}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#1976f7",
              color: "#fff",
              fontWeight: 600,
              fontSize: 18,
              border: "none",
              borderRadius: 24,
              padding: "13px 0",
              marginBottom: 18,
              cursor: "pointer"
            }}
          >
            Sign in with Email
          </button>
        </form>
        <div style={{ width: 330, margin: "14px auto 0", textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "22px 0 18px 0"
            }}
          >
            <div style={{ flex: 1, borderTop: "1px solid #eee" }} />
            <span style={{ margin: "0 12px", color: "#bbb" }}>OR</span>
            <div style={{ flex: 1, borderTop: "1px solid #eee" }} />
          </div>
          <button
            type="button"
            onClick={() => setMsg("Google login coming soon!")}
            style={{
              width: "100%",
              background: "#fff",
              color: "#333",
              fontWeight: 500,
              fontSize: 17,
              border: "1px solid #d1d5db",
              borderRadius: 24,
              padding: "12px 0",
              marginBottom: 10,
              cursor: "pointer"
            }}
          >
            Sign in with Google
          </button>
          <button
            type="button"
            onClick={() => setMsg("iCloud login coming soon!")}
            style={{
              width: "100%",
              background: "#111",
              color: "#fff",
              fontWeight: 500,
              fontSize: 17,
              border: "none",
              borderRadius: 24,
              padding: "12px 0",
              marginBottom: 10,
              cursor: "pointer"
            }}
          >
            Sign in with iCloud
          </button>
          <button
            type="button"
            onClick={() => setMsg("Reddit login coming soon!")}
            style={{
              width: "100%",
              background: "#ff5700",
              color: "#fff",
              fontWeight: 500,
              fontSize: 17,
              border: "none",
              borderRadius: 24,
              padding: "12px 0",
              marginBottom: 10,
              cursor: "pointer"
            }}
          >
            Sign in with Reddit
          </button>
          <div style={{ margin: "18px 0 0 0", fontSize: 13, color: "#888" }}>
            By signing in, you agree to Gime’s Terms of Service & Privacy Policy.
            <div style={{ margin: "7px 0 0 0", color: "#1976f7", fontSize: 14 }}>
              {msg}
            </div>
          </div>
        </div>
      </div>
      {/* Right: Scenic background */}
      <div
        style={{
          width: "50vw",
          minWidth: 320,
          height: "100vh",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1s",
          flexShrink: 0
        }}
      />
    </div>
  );
}
