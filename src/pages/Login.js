import React, { useState, useEffect } from 'react';
import axios from 'axios';

const scenicImages = [
  'https://source.unsplash.com/1600x900/?nature,waterfall',
  'https://source.unsplash.com/1600x900/?forest,scenic',
  'https://source.unsplash.com/1600x900/?mountains,sunset',
  'https://source.unsplash.com/1600x900/?lake,scenic',
  'https://source.unsplash.com/1600x900/?river,green',
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [bgImage, setBgImage] = useState(scenicImages[0]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * scenicImages.length);
      setBgImage(scenicImages[index]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleMagicLink = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/magic-link`, {
        email,
      });
      setMessage(res.data.message || 'Magic link sent! Check your email.');
    } catch (err) {
      setMessage('Failed to send magic link.');
    }
  };

  const handleOAuth = (provider) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/oauth/${provider}`;
  };

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-black bg-opacity-60 p-10 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>

        <form onSubmit={handleMagicLink} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded bg-gray-100 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Send Magic Link
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-green-300">{message}</p>}

        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={() => handleOAuth('google')}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Login with Google
          </button>
          <button
            onClick={() => handleOAuth('reddit')}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded"
          >
            Login with Reddit
          </button>
          <button
            onClick={() => handleOAuth('icloud')}
            className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded"
          >
            Login with iCloud
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
