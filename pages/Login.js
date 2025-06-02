import React, { useState, useEffect } from "react";
import axios from "axios";

const scenicImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
];

export default function Login() {
  const [backgroundUrl, setBackgroundUrl] = useState(scenicImages[0]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Rotate background every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundUrl((prev) => {
        const nextIdx = (scenicImages.indexOf(prev) + 1) % scenicImages.length;
        return scenicImages[nextIdx];
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleMagicLink = async (e) => {
    e.preventDefault();
    setMessage('Sending magic link...');
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/magic-link`, { email });
      if (res.data && res.data.success) {
        setMessage('Check your email for the login link!');
      } else {
        setMessage('Error: ' + (res.data?.message || 'Could not send link'));
      }
    } catch (err) {
      setMessage('Error sending link.');
    }
  };

  const handleOAuth = (provider) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/${provider}/login`;
  };

  return (
    <div
      className="w-screen h-screen flex flex-row"
      style={{ minHeight: "100vh", minWidth: "100vw", overflow: "hidden" }}
    >
      {/* Left: Login form (white) */}
      <div
        className="w-1/2 h-full flex flex-col justify-center items-center bg-white"
        style={{
          minWidth: "50vw",
          maxWidth: "50vw",
          minHeight: "100vh",
        }}
      >
        <div className="w-full max-w-xs">
          <h2 className="text-3xl font-bold mb-10 text-gray-900 text-left w-full">
            Sign in to Gime
          </h2>
          <form className="w-full flex flex-col gap-6" onSubmit={handleMagicLink} autoComplete="off">
            <input
              type="email"
              placeholder="Email"
              className="text-lg bg-white border-b border-gray-300 focus:border-[#1976f7] outline-none px-0 py-3 mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              style={{ boxShadow: "none" }}
            />
            <button
              type="submit"
              className="text-lg font-semibold text-white bg-[#1976f7] hover:bg-[#155ec0] transition-colors rounded-full py-3 mt-2"
              style={{ boxShadow: "none" }}
            >
              Sign in with Email
            </button>
          </form>
          <div className="my-8 flex items-center w-full">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="mx-3 text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <button
            className="w-full text-lg flex items-center gap-2 justify-center text-black font-semibold py-3 hover:bg-gray-200 transition rounded-full mb-3 bg-white"
            style={{ boxShadow: "none", border: "none" }}
            type="button"
            onClick={() => handleOAuth("google")}
          >
            <img src="/google-icon.svg" alt="" className="w-6 h-6" /> Sign in with Google
          </button>
          <button
            className="w-full text-lg flex items-center gap-2 justify-center bg-black text-white font-semibold py-3 hover:bg-gray-900 transition rounded-full mb-3"
            style={{ boxShadow: "none", border: "none" }}
            type="button"
            onClick={() => handleOAuth("icloud")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M18.95 12.31a5.25 5.25 0 00-5.13-4.31 4.54 4.54 0 00-4.53 4.53v.17A3.43 3.43 0 003 16.11a3.44 3.44 0 003.31 3.43h10.48a3.44 3.44 0 003.31-3.43 3.41 3.41 0 00-2.15-3.23zm-3.94-7.27a2.1 2.1 0 11-2.1-2.09 2.09 2.09 0 012.1 2.09z"></path>
            </svg>
            Sign in with iCloud
          </button>
          <button
            className="w-full text-lg flex items-center gap-2 justify-center bg-orange-500 text-white font-semibold py-3 hover:bg-orange-600 transition rounded-full"
            style={{ boxShadow: "none", border: "none" }}
            type="button"
            onClick={() => handleOAuth("reddit")}
          >
            <img src="/reddit-icon.svg" alt="" className="w-6 h-6" /> Sign in with Reddit
          </button>
          <div className="mt-8 text-xs text-gray-400 text-center w-full">
            By signing in, you agree to Gime’s Terms of Service & Privacy Policy.
            <br />
            {message && <div className="mt-2 text-blue-600">{message}</div>}
          </div>
        </div>
      </div>
      {/* Right: Scenic rotating background */}
      <div
        className="w-1/2 h-full bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          minWidth: "50vw",
          maxWidth: "50vw",
          minHeight: "100vh",
        }}
      />
    </div>
  );
}
