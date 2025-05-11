// File: src/pages/Home.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // if you want non-authenticated users to see a landing page, guard this
    navigate('/dashboard');
  }, [navigate]);

  return null; // or a loader/spinner while redirecting
}
