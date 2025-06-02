import React, { useState, useEffect } from "react";

const backgroundImages = [
  "/backgrounds/bg1.jpg",
  "/backgrounds/bg2.jpg",
  "/backgrounds/bg3.jpg",
  "/backgrounds/bg4.jpg",
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  const [message, setMessage] = useState("");

  // Rotating background for right side
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((i) => (i + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handlers (replace with real OAuth later)
  const handleGoogleLogin = () => alert("Google login coming soon!");
  const handleRedditLogin = () => alert("Reddit login coming soon!");
  const handleICloudLogin = () => alert("iCloud login coming soon!");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Sending magic link...");
    try {
      // TODO: connect to backend
      setTimeout(() => setMessage("Check your email for the login link!"), 1500);
    } catch {
      setMessage("Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Logo and tagline */}
      <div className="hidden md:flex w-full md:w-1/2 flex-col justify-center items-center bg-white p-8">
        <img
          src="/gime-logo.jpeg"
          alt="Gime Logo"
          className="w-52 mb-8"
          draggable={false}
        />
        <h1 className="text-4xl font-bold mb-3 text-gray-900">Gime</h1>
        <div className="text-2xl text-gray-700 text-center font-light">
          Your digital world, all in one place
        </div>
      </div>

      {/* Right: Scenic image bg + login form */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${backgroundImages[bgIndex]})`,
          minHeight: "100vh",
        }}
      >
        <div className="bg-white/95 border border-gray-200 rounded-2xl w-full max-w-md p-10 shadow-none flex flex-col items-center">
          <h2 className="text-2xl font-extrabold mb-6 text-gray-900 w-full text-center">
            Sign in to Gime
          </h2>
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-3 border border-gray-300 rounded-lg text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg py-3 text-lg mb-4 transition"
            >
              Sign in with Email
            </button>
          </form>
          <div className="w-full flex items-center my-5">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="mx-3 text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-3 text-lg font-semibold hover:bg-gray-50 mb-3 transition"
          >
            <img src="/google-icon.svg" alt="" className="w-6 h-6" />
            Sign in with Google
          </button>
          <button
            onClick={handleICloudLogin}
            className="w-full flex items-center justify-center gap-2 bg-black text-white rounded-lg py-3 text-lg font-semibold hover:bg-gray-900 mb-3 transition"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M18.95 12.31a5.25 5.25 0 00-5.13-4.31 4.54 4.54 0 00-4.53 4.53v.17A3.43 3.43 0 003 16.11a3.44 3.44 0 003.31 3.43h10.48a3.44 3.44 0 003.31-3.43 3.41 3.41 0 00-2.15-3.23zm-3.94-7.27a2.1 2.1 0 11-2.1-2.09 2.09 2.09 0 012.1 2.09z"></path>
            </svg>
            Sign in with iCloud
          </button>
          <button
            onClick={handleRedditLogin}
            className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white rounded-lg py-3 text-lg font-semibold hover:bg-orange-600 transition"
          >
            <img src="/reddit-icon.svg" alt="" className="w-6 h-6" />
            Sign in with Reddit
          </button>

          {/* Fine print/message */}
          <div className="mt-8 text-xs text-gray-400 text-center w-full">
            By signing in, you agree to Gime’s Terms of Service & Privacy Policy.
            <br />
            {message && <div className="mt-2 text-blue-500">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
