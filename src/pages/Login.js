// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const backgroundImages = [
  '/backgrounds/bg1.jpg',
  '/backgrounds/bg2.jpg',
  '/backgrounds/bg3.jpg',
  '/backgrounds/bg4.jpg',
];

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [bgIndex, setBgIndex] = useState(0);
  const [message, setMessage] = useState('');

  // Rotating background
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((i) => (i + 1) % backgroundImages.length);
    }, 5000); // change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Sending magic link...');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/send-magic-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Magic link failed.');
      setMessage('Check your email for the login link!');
    } catch (err) {
      console.error(err);
      setMessage('Login failed. Try again.');
    }
  };

  // Dummy handlers for OAuth buttons
  const handleGoogleLogin = () => alert('Google login coming soon!');
  const handleRedditLogin = () => alert('Reddit login coming soon!');
  const handleICloudLogin = () => alert('iCloud login coming soon!');

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Gime logo and tagline */}
      <div className="hidden md:flex w-full md:w-1/2 bg-white flex-col justify-center items-center p-8">
        <img src="/gime-logo.jpeg" alt="Gime Logo" className="w-48 mb-6" />
        <h1 className="text-3xl text-gray-800 text-center font-bold">
          Your digital world, all in one place
        </h1>
      </div>

      {/* Right: Scenic image + login form overlay */}
      <div
        className="w-full md:w-1/2 bg-cover bg-center relative flex items-center justify-center transition-all duration-700"
        style={{
          backgroundImage: `url(${backgroundImages[bgIndex]})`,
          minHeight: '100vh',
        }}
      >
        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl w-full max-w-md mx-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition font-semibold"
            >
              Login with Email
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>

          <div className="mt-6 border-t pt-4 text-sm text-gray-500 text-center">
            Or continue with
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={handleGoogleLogin}
              className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-semibold"
            >
              Google
            </button>
            <button
              onClick={handleRedditLogin}
              className="p-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition font-semibold"
            >
              Reddit
            </button>
            <button
              onClick={handleICloudLogin}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition font-semibold"
            >
              iCloud
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
