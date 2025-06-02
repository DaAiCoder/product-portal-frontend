// /pages/Login.js

import React, { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Magic link sent (mock)!");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left: logo/tagline */}
      <div className="md:w-1/2 w-full flex flex-col items-center justify-center py-20 md:py-0 px-6 bg-white">
        <img
          src="/gime-logo.jpeg"
          alt="Gime Logo"
          className="w-40 mb-8"
          draggable={false}
          style={{ userSelect: "none" }}
        />
        <h1 className="text-5xl font-extrabold mb-2 text-[#1976f7]">Gime</h1>
        <p className="text-2xl text-gray-700 font-light text-center">
          Your digital world, all in one place
        </p>
      </div>
      {/* Right: login form, plain text */}
      <div className="md:w-1/2 w-full flex items-center justify-center py-24 px-8 bg-gray-50">
        <div className="w-full max-w-md flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-900 text-left w-full">Sign in to Gime</h2>
          <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit} autoComplete="off">
            <input
              type="email"
              placeholder="Email"
              className="text-xl bg-transparent border-b border-gray-300 focus:border-[#1976f7] outline-none px-0 py-2 mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              style={{ boxShadow: "none" }}
            />
            <button
              type="submit"
              className="text-lg font-semibold text-white bg-[#1976f7] hover:bg-[#1564c8] transition-colors rounded-full py-3 mt-2"
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
            onClick={() => alert("Google login coming soon!")}
          >
            <img src="/google-icon.svg" alt="" className="w-6 h-6" /> Sign in with Google
          </button>
          <button
            className="w-full text-lg flex items-center gap-2 justify-center bg-black text-white font-semibold py-3 hover:bg-gray-900 transition rounded-full mb-3"
            style={{ boxShadow: "none", border: "none" }}
            type="button"
            onClick={() => alert("iCloud login coming soon!")}
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
            onClick={() => alert("Reddit login coming soon!")}
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
    </div>
  );
};

export default Login;

