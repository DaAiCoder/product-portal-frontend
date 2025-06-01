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
  const handleRedd
